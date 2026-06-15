import re

RESOLUTION_RE = re.compile(r"\b(480p|576p|720p|1080p|1440p|2160p|4k|8k)\b")
YEAR_RE = re.compile(r"\b(19\d{2}|20\d{2})\b")
BRACKETS_RE = re.compile(r"[\[\(\{][^\]\)\}]*[\]\)\}]")
NON_ALNUM_RE = re.compile(r"[^a-z0-9 ]")
MULTI_SPACE_RE = re.compile(r"\s+")
EXT_RE = re.compile(r"\.[A-Za-z0-9]{2,4}$")

# Words/phrases to strip once the name has been lowercased and all
# `.` `_` `-` separators have been collapsed to spaces.
JUNK_WORDS = [
    "bluray", "blu ray", "brrip", "bdrip", "webrip", "web dl", "webdl", "web",
    "hdtv", "dvdrip", "dvdscr", "hdrip", "remux", "proper", "repack",
    "extended", "unrated", "directors cut", "theatrical",
    "x264", "x265", "h264", "h265", "hevc", "avc",
    "aac", "ac3", "dts", "dd5 1", "10bit", "8bit", "hdr", "imax",
    "multi", "dual audio",
    "yify", "rarbg", "eztv", "ettv", "fgt", "ntb", "sparks", "amzn", "nf",
    "hulu", "dsnp",
]
JUNK_RE = re.compile(r"\b(" + "|".join(re.escape(w) for w in JUNK_WORDS) + r")\b")


def normalize_name(filename):
    """Normalize a video or poster filename for fuzzy matching."""
    name = EXT_RE.sub("", filename)
    name = name.lower()
    name = BRACKETS_RE.sub(" ", name)
    name = name.replace(".", " ").replace("_", " ").replace("-", " ")
    name = RESOLUTION_RE.sub(" ", name)
    name = YEAR_RE.sub(" ", name)
    name = JUNK_RE.sub(" ", name)
    name = NON_ALNUM_RE.sub(" ", name)
    name = MULTI_SPACE_RE.sub(" ", name).strip()
    return name
