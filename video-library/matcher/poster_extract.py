import json
import subprocess

FALLBACK_PERCENT = 0.4


def get_duration(video_path, ffprobe_path="ffprobe"):
    cmd = [
        ffprobe_path, "-v", "error",
        "-show_entries", "format=duration",
        "-of", "json", video_path,
    ]
    out = subprocess.check_output(cmd, stderr=subprocess.DEVNULL)
    data = json.loads(out)
    return float(data["format"]["duration"])


def extract_fallback_frame(video_path, output_path, ffmpeg_path="ffmpeg",
                            ffprobe_path="ffprobe", percent=FALLBACK_PERCENT):
    """Grab a single frame at ~`percent` of the video's duration as a poster fallback."""
    duration = get_duration(video_path, ffprobe_path)
    timestamp = max(0.0, duration * percent)

    cmd = [
        ffmpeg_path, "-y",
        "-ss", str(timestamp),
        "-i", video_path,
        "-frames:v", "1",
        "-q:v", "2",
        output_path,
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return output_path
