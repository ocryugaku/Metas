import hashlib
import os

from PIL import Image


def get_thumbnail(src_path, cache_dir, width):
    """Return path to a cached thumbnail of src_path, generating it if needed."""
    os.makedirs(cache_dir, exist_ok=True)

    key = hashlib.sha1(f"{src_path}:{width}".encode("utf-8")).hexdigest()
    ext = os.path.splitext(src_path)[1].lower()
    if ext not in (".jpg", ".jpeg", ".png"):
        ext = ".jpg"
    out_path = os.path.join(cache_dir, key + ext)

    if os.path.exists(out_path) and os.path.getmtime(out_path) >= os.path.getmtime(src_path):
        return out_path

    img = Image.open(src_path)
    if ext in (".jpg", ".jpeg") and img.mode != "RGB":
        img = img.convert("RGB")
    elif img.mode not in ("RGB", "RGBA"):
        img = img.convert("RGB")

    ratio = width / float(img.width)
    height = max(1, int(img.height * ratio))
    img = img.resize((width, height), Image.LANCZOS)
    img.save(out_path)
    return out_path
