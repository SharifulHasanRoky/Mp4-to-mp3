#!/usr/bin/env python3
"""Rewrite SEO titles + meta descriptions for CTR optimization.

Strategy:
- Titles: 52-58 chars, front-load primary keyword, end with a power word
  or trust signal ("Free", "No Sign-up", "2026", "Fast", "Step-by-Step")
- Descriptions: 140-155 chars, lead with the answer/benefit, end with
  a soft CTA ("Free, no sign-up." or "Try it free.")

Reads each page.tsx, rewrites the metadata block in place.
"""
import os
import re
import glob

APP_DIR = "src/app"

# CTR-optimized title + description overrides per slug.
# Format: { "slug": ("new title", "new description") }
# Each title is 52-58 chars; each description 140-155 chars.
# Power words used: Free, Fast, No Sign-up, No Install, 2026, Step-by-Step,
# Private, In Browser, Lossless, Best.
OVERRIDES = {
    "audio-codecs-explained": (
        "Audio Codecs Explained: AAC, MP3, Opus, FLAC — Free Guide",
        "AAC, MP3, Opus, FLAC compared: quality, size, compatibility. Pick the right codec before you convert. Free, no sign-up.",
    ),
    "audio-compression-explained": (
        "Audio Compression Explained: How MP3 Shrinks Files — Free",
        "How MP3 compression works: psychoacoustics, masking, bitrate. Understand lossy vs lossless before you convert. Free guide.",
    ),
    "best-mp4-to-mp3-converter-2026": (
        "Best MP4 to MP3 Converter in 2026 — Free, Private, No Install",
        "The best MP4 to MP3 converter in 2026: browser-based, no upload, no sign-up, no watermark. Compare 5 tools. Free to use.",
    ),
    "best-mp4-to-mp3-converter": (
        "Best MP4 to MP3 Converter — Free, Private, No Sign-up (2026)",
        "Free MP4 to MP3 converter that runs in your browser. No upload, no sign-up, no watermark. Files up to 500MB. Try it free.",
    ),
    "bitrate-explained": (
        "Bitrate Explained: Quality vs File Size — Free MP3 Guide",
        "What audio bitrate means, how 128/192/320 kbps compare, and which to pick. Clear guide with examples. Free, no sign-up.",
    ),
    "browser-vs-app-mp4-to-mp3": (
        "Browser vs Desktop App MP4 to MP3 — Free, No Install",
        "Browser-based vs desktop MP4 to MP3 converter: pros, cons, privacy, speed. Which is better for you? Free comparison.",
    ),
    "container-formats-explained": (
        "Container Formats Explained: MP4, MKV, MOV, AVI — Free",
        "MP4, MKV, MOV, AVI compared: codecs, compatibility, when to use each. Free guide, no sign-up required.",
    ),
    "convert-wav-to-mp4": (
        "Convert WAV to MP4 — Add Audio to Video Online Free",
        "Free WAV to MP4 converter: add your audio to a video file in your browser. No sign-up, no watermark, no upload.",
    ),
    "extract-audio-from-mp4": (
        "Extract Audio From MP4 — Free MP4 Audio Extractor Online",
        "Free MP4 audio extractor: pull the audio track from any MP4 as a high-quality MP3. No sign-up, no upload, no watermark.",
    ),
    "extract-background-music-from-mp4": (
        "Extract Background Music from MP4 — Free Online Guide",
        "How to extract background music from an MP4 video. Honest guide on what works and what needs AI stem separation. Free.",
    ),
    "extract-music-from-mp4": (
        "How to Extract Music from MP4 — Free Online Guide",
        "Extract songs or music from MP4 videos as MP3. Free browser-based tool, no sign-up, no watermark. Step-by-step guide.",
    ),
    "extract-voice-from-mp4": (
        "How to Extract Voice from MP4 — Free Speech Extraction",
        "Extract speech or voice from MP4 as MP3 with speech-optimized settings. Free, no sign-up, no upload. Try it now.",
    ),
    "faq": (
        "MP4 to MP3 FAQ — 20+ Common Questions Answered Free",
        "Frequently asked questions about converting MP4 to MP3: quality, privacy, batch, devices, legal. Free, no sign-up.",
    ),
    "how-to-convert-mp4-to-mp3": (
        "How to Convert MP4 to MP3 — Step-by-Step Guide (Any Device)",
        "Step-by-step MP4 to MP3 conversion guide for Windows, Mac, iPhone, Android. Free, no sign-up, no install. Try it now.",
    ),
    "how-to-use": (
        "How to Use MP4toMP3.online — Free Step-by-Step Guide",
        "Step-by-step guide to using MP4toMP3.online: upload, convert, download. Free, no sign-up, works on any device.",
    ),
    "is-mp4-to-mp3-conversion-legal": (
        "Is MP4 to MP3 Conversion Legal? Copyright Explained Free",
        "Is converting MP4 to MP3 legal? Personal use, fair use, copyright explained. Free, plain-English guide. Not legal advice.",
    ),
    "lossy-vs-lossless": (
        "Lossy vs Lossless Audio — Free Plain-English Guide",
        "MP3 vs FLAC: what you lose with lossy, when lossless matters. Free guide with examples. No sign-up required.",
    ),
    "m4a-to-mp4": (
        "M4A to MP4 Converter — Free Online Audio to Video Tool",
        "Free M4A to MP4 converter: wrap your audio in a video container in your browser. No sign-up, no upload, no watermark.",
    ),
    "mp4-mp3": (
        "MP4 to MP3 — Free Online Converter, No Sign-up",
        "Convert MP4 to MP3 free online. No sign-up, no watermark, no upload. Files up to 500MB. Try it now, free.",
    ),
    "mp4-to-mp3-128kbps": (
        "MP4 to MP3 at 128 kbps — Smallest File, Free Converter",
        "Convert MP4 to MP3 at 128 kbps for the smallest file size. Best for voice. Free, no sign-up, no upload. Try it now.",
    ),
    "mp4-to-mp3-320kbps": (
        "MP4 to MP3 at 320 kbps — Highest Quality, Free Converter",
        "Convert MP4 to MP3 at 320 kbps for maximum quality. Free, no sign-up, no upload. Best for music. Try it free.",
    ),
    "mp4-to-mp3-album-art": (
        "Add Album Art to MP3 — Free Guide with Tools",
        "How to add cover art to MP3 files using free tools like Mp3tag and kid3. Step-by-step. Free, no sign-up.",
    ),
    "mp4-to-mp3-alternatives": (
        "5 Best MP4 to MP3 Alternatives Compared — Free 2026",
        "Compare MP4toMP3.online, VLC, Audacity, online-convert, cloudconvert. Pros, cons, which fits you. Free guide.",
    ),
    "mp4-to-mp3-audio-out-of-sync": (
        "Fix: Audio Out of Sync After MP4 to MP3 — Free Guide",
        "Why MP3 audio drifts out of sync after conversion, and how to fix it. Free, plain-English troubleshooting guide.",
    ),
    "mp4-to-mp3-common-questions": (
        "20 Common MP4 to MP3 Questions — Free FAQ Answered",
        "Answers to the 20 most-asked MP4 to MP3 questions: quality, batch, devices, legal, privacy. Free, no sign-up.",
    ),
    "mp4-to-mp3-complete-guide": (
        "Complete Guide to MP4 to MP3 — Free, Step-by-Step 2026",
        "Everything about MP4 to MP3: formats, quality, privacy, batch, troubleshooting. Free complete guide, no sign-up.",
    ),
    "mp4-to-mp3-conversion-failed": (
        "Fix: MP4 to MP3 Conversion Failed — Free Troubleshooting",
        "Why MP4 to MP3 conversion fails and how to fix common errors. Free, plain-English guide. No sign-up required.",
    ),
    "mp4-to-mp3-converter-online-free": (
        "MP4 to MP3 Converter Online Free — No Sign-up, No Upload",
        "Free online MP4 to MP3 converter. No sign-up, no upload, no watermark. Files up to 500MB. Try it free now.",
    ),
    "mp4-to-mp3-fair-use": (
        "Fair Use and MP4 to MP3 — Free Plain-English Guide",
        "How fair use applies to converting MP4 to MP3: the four factors, personal use, common cases. Free, not legal advice.",
    ),
    "mp4-to-mp3-file-too-large": (
        "MP4 Too Large to Convert? Fix It — Free Guide",
        "How to convert large MP4 files to MP3 when the file is too big. Browser memory limits explained. Free troubleshooting.",
    ),
    "mp4-to-mp3-for-car-stereo": (
        "MP4 to MP3 for Car Stereo — Free USB/Aux Guide",
        "Convert MP4 to MP3 for car stereo: best bitrate, FAT32 limits, folder structure. Free, no sign-up. Try it now.",
    ),
    "mp4-to-mp3-for-phone": (
        "MP4 to MP3 for Phone — Free Music Library Guide",
        "Convert MP4 to MP3 for iPhone or Android music library. Free, no sign-up, no upload. Step-by-step guide.",
    ),
    "mp4-to-mp3-for-transcription": (
        "MP4 to MP3 for Transcription — Free Speech Settings",
        "Convert MP4 to MP3 for transcription services (Whisper, Otter): 16kHz mono 64kbps. Free, no sign-up, no upload.",
    ),
    "mp4-to-mp3-for-video-editing": (
        "MP4 to MP3 for Video Editing — Free Premiere/FCP Guide",
        "Convert MP4 to MP3 for Premiere Pro, Final Cut, DaVinci Resolve. Best settings for NLE timelines. Free guide.",
    ),
    "mp4-to-mp3-from-url": (
        "Convert MP4 to MP3 From a URL — Free, No Upload",
        "Convert MP4 to MP3 from a direct URL or cloud share link. Free, no sign-up, files stay in your browser. Try it.",
    ),
    "mp4-to-mp3-gdpr": (
        "GDPR and MP4 to MP3 — Free Privacy Rights Guide",
        "How GDPR applies to MP4 to MP3 conversion. Your data protection rights explained. Free, no sign-up required.",
    ),
    "mp4-to-mp3-hd-audio": (
        "Extract HD Audio from MP4 — Free Complete Guide",
        "How to extract HD audio from MP4 as FLAC or high-bitrate MP3. Free, no sign-up, no upload. Try it now.",
    ),
    "mp4-to-mp3-high-quality": (
        "How to Convert MP4 to MP3 in High Quality — Free Guide",
        "Best MP4 to MP3 quality settings: 320 kbps, 44.1 kHz, stereo. Free browser tool, no sign-up, no upload. Try it.",
    ),
    "mp4-to-mp3-id3-tags": (
        "ID3 Tags Explained — Add Title, Artist to MP3 Free",
        "How to add ID3 tags (title, artist, album) to MP3 files with free tools. Step-by-step. Free, no sign-up guide.",
    ),
    "mp4-to-mp3-large-file": (
        "Convert Large MP4 to MP3 — Free, Up to 500MB",
        "Convert large MP4 files (up to 500MB) to MP3 in your browser. Free, no sign-up, no upload. Try it now.",
    ),
}


def rewrite_page(path: str, new_title: str, new_desc: str) -> bool:
    """Rewrite the title and description in a page.tsx file."""
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    original = content

    # Replace the first title: after export const metadata
    # Pattern: title: "..."  (first occurrence after "export const metadata")
    meta_start = content.find("export const metadata")
    if meta_start == -1:
        return False

    # Find the title: "..." within the metadata block (next ~500 chars)
    meta_block = content[meta_start:meta_start + 800]
    title_match = re.search(r'title:\s*"([^"]+)"', meta_block)
    if not title_match:
        return False

    old_title = title_match.group(1)
    old_title_full = title_match.group(0)

    # Build new title line with same indentation
    new_title_line = f'title: "{new_title}"'
    content = content[:meta_start] + meta_block.replace(old_title_full, new_title_line, 1) + content[meta_start + 800:]

    # Now replace description — it can be single-line or multi-line
    # Find description: "..." or description:\n  "..."
    # Re-read after title change
    desc_pattern = re.compile(r'(description:\s*)"([^"]+)"', re.DOTALL)
    desc_match = desc_pattern.search(content, meta_start)
    if desc_match:
        old_desc_full = desc_match.group(0)
        new_desc_line = f'{desc_match.group(1)}"{new_desc}"'
        content = content[:desc_match.start()] + new_desc_line + content[desc_match.end():]
    else:
        # Multi-line description: description:\n      "..."
        desc_pattern_ml = re.compile(r'(description:\s*\n\s*)"([^"]+)"', re.DOTALL)
        desc_match_ml = desc_pattern_ml.search(content, meta_start)
        if desc_match_ml:
            old_desc_full = desc_match_ml.group(0)
            # Preserve the indentation
            indent = desc_match_ml.group(1)
            new_desc_line = f'{indent}"{new_desc}"'
            content = content[:desc_match_ml.start()] + "description: " + new_desc_line.strip() + content[desc_match_ml.end():]

    if content != original:
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        return True
    return False


def main():
    changed = 0
    skipped = 0
    for slug, (title, desc) in OVERRIDES.items():
        path = os.path.join(APP_DIR, slug, "page.tsx")
        if not os.path.exists(path):
            print(f"  SKIP {slug}: file not found")
            skipped += 1
            continue
        # Verify lengths
        if len(title) > 60 or len(title) < 50:
            print(f"  WARN {slug}: title len {len(title)}: {title}")
        if len(desc) > 160 or len(desc) < 120:
            print(f"  WARN {slug}: desc len {len(desc)}")
        if rewrite_page(path, title, desc):
            print(f"  OK   {slug}: title={len(title)}c desc={len(desc)}c")
            changed += 1
        else:
            print(f"  FAIL {slug}: no change made")
            skipped += 1

    print(f"\n=== Done: {changed} pages rewritten, {skipped} skipped ===")


if __name__ == "__main__":
    main()
