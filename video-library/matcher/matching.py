import os

from rapidfuzz import fuzz, process

from common.naming import normalize_name

VIDEO_EXTS = {".mp4", ".avi"}
IMAGE_EXTS = {".jpg", ".jpeg", ".png"}

TOP_N_CANDIDATES = 4


def scan_videos(movies_dir):
    videos = []
    for entry in os.scandir(movies_dir):
        if entry.is_file() and os.path.splitext(entry.name)[1].lower() in VIDEO_EXTS:
            videos.append(entry.path)
    return sorted(videos)


def scan_posters(img_dir):
    posters = []
    if not os.path.isdir(img_dir):
        return posters
    for entry in os.scandir(img_dir):
        if entry.is_file() and os.path.splitext(entry.name)[1].lower() in IMAGE_EXTS:
            posters.append(entry.path)
    return sorted(posters)


def build_candidates(movies_dir, img_dir, top_n=TOP_N_CANDIDATES):
    """For every video, return its top-N best matching posters by fuzzy name score."""
    videos = scan_videos(movies_dir)
    posters = scan_posters(img_dir)

    poster_paths = posters
    poster_norms = [normalize_name(os.path.basename(p)) for p in posters]

    results = []
    for video_path in videos:
        video_norm = normalize_name(os.path.basename(video_path))

        candidates = []
        if poster_norms:
            matches = process.extract(
                video_norm, poster_norms, scorer=fuzz.WRatio, limit=top_n
            )
            for _norm, score, idx in matches:
                candidates.append({
                    "poster_path": poster_paths[idx],
                    "confidence": round(float(score), 2),
                })

        results.append({
            "video_path": video_path,
            "video_name": os.path.basename(video_path),
            "candidates": candidates,
        })

    return results
