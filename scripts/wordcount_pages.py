#!/usr/bin/env python3
"""Count visible words in each created SEO page."""
import re
from pathlib import Path

PAGES = [
    "mp4-to-mp3-for-transcription",
    "mp4-to-mp3-for-video-editing",
    "mp4-to-mp3-for-language-learning",
    "mp4-to-mp3-normalize-volume",
    "mp4-to-mp3-trim-audio",
    "mp4-to-mp3-metadata",
    "mp4-to-mp3-stereo-vs-mono",
    "mp4-to-mp3-id3-tags",
    "mp4-to-mp3-album-art",
]

BASE = Path("/home/z/my-project/src/app")


def extract_text(source: str) -> str:
    # Cut off everything before the return statement of the component,
    # leaving only JSX. Then strip JSX tags and braces.
    idx = source.find("return (")
    if idx != -1:
        source = source[idx:]
    # Remove JS comments
    source = re.sub(r"/\*.*?\*/", " ", source, flags=re.DOTALL)
    source = re.sub(r"//[^\n]*", " ", source)
    # Remove JSX-style code blocks and template literals
    source = re.sub(r"\{[^{}]*\}", " ", source)  # plain braces
    # Remove HTML/JSX tags
    source = re.sub(r"<[^>]+>", " ", source)
    # Decode common HTML entities
    entities = {
        "&quot;": '"',
        "&apos;": "'",
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&nbsp;": " ",
        "&copy;": "(c)",
    }
    for k, v in entities.items():
        source = source.replace(k, v)
    # Collapse whitespace
    source = re.sub(r"\s+", " ", source).strip()
    return source


def count_words(text: str) -> int:
    words = re.findall(r"[A-Za-z0-9][A-Za-z0-9'/\-]*", text)
    return len(words)


def brand_mentions(text: str) -> int:
    return text.count("MP4toMP3.online")


def internal_links(source: str) -> int:
    # Count internal Link href occurrences
    return len(re.findall(r'href="/[a-zA-Z0-9\-/#]*"', source))


def unique_internal_links(source: str) -> int:
    matches = re.findall(r'href="(/[a-zA-Z0-9\-/#]*)"', source)
    # normalize /#extractor
    uniq = set()
    for m in matches:
        # ignore external-looking (none here)
        uniq.add(m)
    return len(uniq - {"/#extractor"})


print(f"{'Page':<42} {'Words':>6} {'Brand':>6} {'Links':>6} {'UniqLinks':>10}")
print("-" * 80)
for slug in PAGES:
    path = BASE / slug / "page.tsx"
    source = path.read_text(encoding="utf-8")
    text = extract_text(source)
    wc = count_words(text)
    bm = brand_mentions(text)
    links = internal_links(source)
    uniq = unique_internal_links(source)
    print(f"{slug:<42} {wc:>6} {bm:>6} {links:>6} {uniq:>10}")
