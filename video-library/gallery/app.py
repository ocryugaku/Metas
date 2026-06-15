import json
import os
import subprocess
import sys
from urllib.parse import quote

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from flask import Flask, abort, jsonify, render_template, request, send_file

from common.config import load_config
from common.thumbnails import get_thumbnail

CFG = load_config()
app = Flask(__name__)

# Tracks the most recently launched SMPlayer process, used to implement
# our own "single instance" behavior (see /api/play).
_smplayer_proc = None


def load_items():
    if not os.path.exists(CFG["mapping_path"]):
        return []

    with open(CFG["mapping_path"], "r", encoding="utf-8") as f:
        data = json.load(f)

    items = []
    for entry in data.get("items", []):
        if entry.get("poster_path") and entry.get("video_path"):
            items.append(entry)
    return items


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/items")
def api_items():
    items = load_items()
    out = [{
        "id": i,
        "video_name": item["video_name"],
        "video_path": item["video_path"],
        "thumb_url": "/thumb?path=" + quote(item["poster_path"]),
    } for i, item in enumerate(items)]
    return jsonify(out)


@app.route("/thumb")
def thumb():
    path = request.args.get("path", "")
    movies_dir_real = os.path.realpath(CFG["movies_dir"])
    real = os.path.realpath(path)
    if real != movies_dir_real and not real.startswith(movies_dir_real + os.sep):
        abort(403)
    if not os.path.exists(real):
        abort(404)

    thumb_path = get_thumbnail(
        real, os.path.join(CFG["thumb_cache_path"], "gallery"), CFG["gallery_thumb_width"]
    )
    return send_file(thumb_path)


@app.route("/api/play", methods=["POST"])
def api_play():
    global _smplayer_proc

    data = request.get_json()
    video_path = data.get("video_path", "")
    if not video_path or not os.path.exists(video_path):
        return jsonify({"error": "video file not found"}), 404

    if CFG["smplayer_single_instance"] and _smplayer_proc is not None:
        if _smplayer_proc.poll() is None:
            try:
                _smplayer_proc.terminate()
            except OSError:
                pass

    try:
        _smplayer_proc = subprocess.Popen([CFG["smplayer_path"], video_path])
    except OSError as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({"ok": True})


if __name__ == "__main__":
    print(f"Mapping file: {CFG['mapping_path']}")
    print(f"SMPlayer:     {CFG['smplayer_path']} "
          f"(single instance: {CFG['smplayer_single_instance']})")
    print(f"Open http://127.0.0.1:{CFG['gallery_port']}")
    app.run(host="127.0.0.1", port=CFG["gallery_port"], debug=False)
