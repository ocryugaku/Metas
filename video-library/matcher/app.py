import json
import os
import sys
import threading
from urllib.parse import quote

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from flask import Flask, abort, jsonify, render_template, request, send_file

from common.config import load_config
from common.thumbnails import get_thumbnail
from matching import build_candidates
from poster_extract import extract_fallback_frame

CFG = load_config()
app = Flask(__name__)

STATE_LOCK = threading.Lock()
ITEMS = []  # populated by load_state()


def load_state():
    global ITEMS

    candidates = build_candidates(CFG["movies_dir"], CFG["img_dir"])

    previous = {}
    if os.path.exists(CFG["mapping_path"]):
        with open(CFG["mapping_path"], "r", encoding="utf-8") as f:
            data = json.load(f)
        for entry in data.get("items", []):
            previous[entry["video_path"]] = entry

    items = []
    for c in candidates:
        item = {
            "video_path": c["video_path"],
            "video_name": c["video_name"],
            "candidates": c["candidates"],
            "status": "pending",
            "poster_path": None,
            "confidence": None,
            "source": None,
        }
        existing = previous.get(c["video_path"])
        if existing and existing.get("status") == "accepted":
            item.update({
                "status": "accepted",
                "poster_path": existing.get("poster_path"),
                "confidence": existing.get("confidence"),
                "source": existing.get("source"),
            })
        items.append(item)

    ITEMS = items


def save_mapping():
    items_out = [{
        "video_path": item["video_path"],
        "video_name": item["video_name"],
        "poster_path": item["poster_path"],
        "confidence": item["confidence"],
        "status": item["status"],
        "source": item["source"],
    } for item in ITEMS]

    accepted = sum(1 for i in ITEMS if i["status"] == "accepted")
    data = {
        "items": items_out,
        "total": len(ITEMS),
        "accepted": accepted,
        "pending": len(ITEMS) - accepted,
    }

    tmp_path = CFG["mapping_path"] + ".tmp"
    with open(tmp_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    os.replace(tmp_path, CFG["mapping_path"])

    return accepted, len(ITEMS)


def find_item(video_path):
    for item in ITEMS:
        if item["video_path"] == video_path:
            return item
    return None


@app.route("/")
def index():
    pending = [i for i in ITEMS if i["status"] == "pending"]
    pending.sort(
        key=lambda i: i["candidates"][0]["confidence"] if i["candidates"] else 0,
        reverse=True,
    )

    # Add thumbnail URLs for rendering.
    view_items = []
    for item in pending:
        candidates = [{
            "poster_path": c["poster_path"],
            "confidence": c["confidence"],
            "thumb_url": "/thumb?path=" + quote(c["poster_path"]),
        } for c in item["candidates"]]
        view_items.append({**item, "candidates": candidates})

    accepted = len(ITEMS) - len(pending)
    return render_template(
        "review.html",
        items=view_items,
        accepted=accepted,
        total=len(ITEMS),
        threshold=CFG["default_confidence_threshold"],
    )


@app.route("/thumb")
def thumb():
    path = request.args.get("path", "")
    img_dir_real = os.path.realpath(CFG["img_dir"])
    real = os.path.realpath(path)
    if real != img_dir_real and not real.startswith(img_dir_real + os.sep):
        abort(403)
    if not os.path.exists(real):
        abort(404)

    thumb_path = get_thumbnail(
        real, os.path.join(CFG["thumb_cache_path"], "review"), CFG["review_thumb_width"]
    )
    return send_file(thumb_path)


@app.route("/api/accept", methods=["POST"])
def api_accept():
    data = request.get_json()
    with STATE_LOCK:
        item = find_item(data["video_path"])
        if not item:
            return jsonify({"error": "not found"}), 404
        item["status"] = "accepted"
        item["poster_path"] = data["poster_path"]
        item["confidence"] = data.get("confidence", 0)
        item["source"] = data.get("source", "manual")
        accepted, total = save_mapping()
    return jsonify({"accepted": accepted, "total": total})


@app.route("/api/bulk_accept", methods=["POST"])
def api_bulk_accept():
    data = request.get_json()
    threshold = float(data.get("threshold", 0))

    accepted_paths = []
    with STATE_LOCK:
        for item in ITEMS:
            if item["status"] == "pending" and item["candidates"]:
                best = item["candidates"][0]
                if best["confidence"] >= threshold:
                    item["status"] = "accepted"
                    item["poster_path"] = best["poster_path"]
                    item["confidence"] = best["confidence"]
                    item["source"] = "fuzzy"
                    accepted_paths.append(item["video_path"])
        accepted, total = save_mapping()

    return jsonify({"accepted": accepted, "total": total, "accepted_paths": accepted_paths})


@app.route("/api/fallback", methods=["POST"])
def api_fallback():
    data = request.get_json()
    with STATE_LOCK:
        item = find_item(data["video_path"])
        if not item:
            return jsonify({"error": "not found"}), 404
        video_path = item["video_path"]

    out_dir = CFG["fallback_poster_dir"]
    os.makedirs(out_dir, exist_ok=True)
    base = os.path.splitext(os.path.basename(video_path))[0]
    out_path = os.path.join(out_dir, base + ".jpg")

    try:
        extract_fallback_frame(video_path, out_path, CFG["ffmpeg_path"], CFG["ffprobe_path"])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    with STATE_LOCK:
        item["status"] = "accepted"
        item["poster_path"] = out_path
        item["confidence"] = 0
        item["source"] = "fallback_frame"
        accepted, total = save_mapping()

    return jsonify({"accepted": accepted, "total": total, "poster_path": out_path})


if __name__ == "__main__":
    load_state()
    print(f"Movies dir: {CFG['movies_dir']}")
    print(f"Image dir:  {CFG['img_dir']}")
    print(f"{len(ITEMS)} videos found, "
          f"{sum(1 for i in ITEMS if i['status'] == 'accepted')} already accepted")
    print(f"Open http://127.0.0.1:{CFG['matcher_port']} to start reviewing")
    app.run(host="127.0.0.1", port=CFG["matcher_port"], debug=False)
