# Local Video Library Tool

Two local tools for a flat movies folder + matching key-art images:

- **Matcher** (Part 1): fuzzy-matches each video to its poster image and
  lets you review/confirm the pairings, writing `mapping.json`.
- **Gallery** (Part 2): a local web gallery that reads `mapping.json` and
  launches videos in SMPlayer.

Everything is referenced **in place by absolute path** — nothing is
uploaded or copied (except generated thumbnails/fallback poster frames).

## Folder layout expected

```
<movies_dir>/
  Movie.One.2020.1080p.mp4
  Movie.Two.2019.avi
  ...
  img/
    Movie One Poster.jpg
    Movie Two Key Art.png
    ...
    _generated/        <- created automatically for fallback frames
```

## Setup

1. Install Python 3.9+ and the dependencies:

   ```
   pip install -r requirements.txt
   ```

2. Install [ffmpeg](https://ffmpeg.org/) (provides `ffmpeg` and `ffprobe`)
   and make sure both are on your `PATH` — only needed for the "no match"
   fallback poster-frame extraction in Part 1.

3. Install [SMPlayer](https://www.smplayer.info/) for Windows.

4. Edit **`config.json`** in this folder:

   | Key | Description |
   | --- | --- |
   | `movies_dir` | **Set this** to the flat folder containing all your video files, e.g. `"D:\\Movies"`. It must contain an `img` subfolder with the poster images. |
   | `img_subfolder` | Name of the poster-image subfolder inside `movies_dir` (default `"img"`). |
   | `smplayer_path` | **Set this** to the full path of `smplayer.exe`, e.g. `"C:\\Program Files\\SMPlayer\\smplayer.exe"`. |
   | `smplayer_single_instance` | `true`/`false` — see "SMPlayer single-instance behavior" below. |
   | `ffmpeg_path` / `ffprobe_path` | Path to the ffmpeg/ffprobe executables (default assumes they're on `PATH`). |
   | `default_confidence_threshold` | Default value pre-filled in the bulk-accept box (0-100). |
   | `gallery_thumb_width` / `review_thumb_width` | Thumbnail widths (px) for the gallery grid and review UI. |
   | `gallery_port` / `matcher_port` | Local ports for each server. |

   `mapping.json` and the `thumb_cache/` directory are created next to
   `config.json` automatically.

## Part 1 — Matching tool

Run:

```
python matcher/app.py
```

Then open the printed URL (default `http://127.0.0.1:8766`).

- All videos in `movies_dir` are matched against posters in `movies_dir/img`
  using `rapidfuzz` on normalized names (extension stripped, lowercased,
  `.`/`_`/`-` turned into spaces, resolution/year/release-tag junk removed).
- The review list is sorted by confidence, **highest first**.
- Each row shows the video name, the best-guess poster, and up to 3
  alternates.
- **Bulk accept**: set the threshold and click "Accept all above threshold"
  to accept every pending video whose best match is at or above that score.
- **Per-item review**: click a thumbnail to accept it, or press `1`-`3` to
  pick a candidate for the topmost pending item. Click/press `F` for
  "No match" — this runs `ffmpeg` to grab a frame at ~40% of the video's
  duration and saves it to `movies_dir/img/_generated/<video name>.jpg` as
  the poster.
- A progress counter (`reviewed / total`) is shown at the top, and
  `mapping.json` (absolute paths) is rewritten after every decision.

Re-running the matcher later picks up where you left off — anything
already marked `accepted` in `mapping.json` won't be re-shown.

## Part 2 — Gallery

Run:

```
python gallery/app.py
```

Then open the printed URL (default `http://127.0.0.1:8765`).

- Reads `mapping.json` and shows a searchable grid of poster art.
- Posters are lazy-loaded as you scroll, using small generated thumbnails
  (not the full-resolution images), so it stays smooth with ~2000 items.
- Type in the search box to filter by video file name.
- Click a poster to launch the bound video with
  `smplayer.exe "<path>"`.

### SMPlayer single-instance behavior

`smplayer_single_instance` in `config.json` controls how the gallery
launches videos:

- `true` (default): before launching a new video, the gallery terminates
  the SMPlayer process it previously launched (if it's still running), so
  only one SMPlayer window is ever open at a time.
- `false`: every click spawns an independent SMPlayer process, so multiple
  videos/windows can be open simultaneously.

## Paths you need to set

- `movies_dir` in `config.json` — your flat movies folder (containing the
  `img` subfolder).
- `smplayer_path` in `config.json` — full path to `smplayer.exe`.
