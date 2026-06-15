import json
import os

CONFIG_PATH = os.path.join(os.path.dirname(__file__), "..", "config.json")

DEFAULTS = {
    "movies_dir": "D:\\Movies",
    "img_subfolder": "img",
    "smplayer_path": "C:\\Program Files\\SMPlayer\\smplayer.exe",
    "smplayer_single_instance": True,
    "ffmpeg_path": "ffmpeg",
    "ffprobe_path": "ffprobe",
    "mapping_file": "mapping.json",
    "thumb_cache_dir": "thumb_cache",
    "default_confidence_threshold": 85,
    "gallery_thumb_width": 220,
    "review_thumb_width": 180,
    "gallery_port": 8765,
    "matcher_port": 8766,
}


def load_config():
    cfg = dict(DEFAULTS)
    if os.path.exists(CONFIG_PATH):
        with open(CONFIG_PATH, "r", encoding="utf-8") as f:
            cfg.update(json.load(f))

    root = os.path.dirname(CONFIG_PATH)
    cfg["img_dir"] = os.path.join(cfg["movies_dir"], cfg["img_subfolder"])
    cfg["fallback_poster_dir"] = os.path.join(cfg["img_dir"], "_generated")
    cfg["mapping_path"] = os.path.join(root, cfg["mapping_file"])
    cfg["thumb_cache_path"] = os.path.join(root, cfg["thumb_cache_dir"])
    return cfg
