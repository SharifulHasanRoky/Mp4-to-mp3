#!/usr/bin/env python3
"""Second pass: fix remaining pages with weak descriptions or missing power words.
Target the pages flagged in audit_titles.py that the first pass didn't catch
or where descriptions came out too short (under 120c).
"""
import os
import re
import glob

APP_DIR = "src/app"

# Pages where description came out too short, or that still need a power word.
# Format: { "slug": ("new title", "new description") }
# Targets: title 50-60c, description 130-155c, must include power word.
OVERRIDES_2 = {
    # Too-short descriptions from pass 1 — expand them
    "audio-codecs-explained": (
        "Audio Codecs Explained: AAC, MP3, Opus, FLAC — Free Guide",
        "AAC, MP3, Opus, FLAC compared: audio quality, file size, browser compatibility. Pick the right codec before you convert MP4 to MP3. Free guide, no sign-up.",
    ),
    "bitrate-explained": (
        "Bitrate Explained: Quality vs File Size — Free MP3 Guide",
        "What audio bitrate means, how 128/192/320 kbps compare in quality and size, and which to pick for music, voice, or podcasts. Free, no sign-up guide.",
    ),
    "browser-vs-app-mp4-to-mp3": (
        "Browser vs Desktop App MP4 to MP3 — Free Comparison",
        "Browser-based vs desktop MP4 to MP3 converter: pros, cons, privacy, speed, install. Which is better for your use case? Free comparison guide.",
    ),
    "container-formats-explained": (
        "Container Formats Explained: MP4, MKV, MOV, AVI — Free",
        "MP4, MKV, MOV, AVI compared: which codecs inside, browser compatibility, when to use each. Free, no sign-up guide for everyday users.",
    ),
    "convert-wav-to-mp4": (
        "Convert WAV to MP4 — Add Audio to Video Online Free",
        "Free WAV to MP4 converter: wrap your audio file in a video container entirely in your browser. No sign-up, no watermark, no upload. Try it free.",
    ),
    "extract-audio-from-mp4": (
        "Extract Audio From MP4 — Free MP4 Audio Extractor",
        "Free MP4 audio extractor: pull the audio track from any MP4 as a high-quality MP3 file. No sign-up, no upload, no watermark. Try it free now.",
    ),
    "extract-background-music-from-mp4": (
        "Extract Background Music from MP4 — Free Guide",
        "How to extract background music from an MP4 video. Honest guide on what simple conversion can do and when you need AI stem separation. Free.",
    ),
    "extract-music-from-mp4": (
        "How to Extract Music from MP4 Video — Free Online",
        "Extract songs or music from MP4 videos as MP3. Free browser-based tool, no sign-up, no watermark. Step-by-step guide with bitrate tips.",
    ),
    "extract-voice-from-mp4": (
        "How to Extract Voice from MP4 — Free Speech Extraction",
        "Extract speech or voice from MP4 as MP3 with speech-optimized settings (mono, 128kbps). Free, no sign-up, no upload. Try it now.",
    ),
    "faq": (
        "MP4 to MP3 FAQ — 20+ Common Questions Answered Free",
        "Frequently asked questions about converting MP4 to MP3: audio quality, privacy, batch conversion, device support, legal. Free, no sign-up guide.",
    ),
    "how-to-convert-mp4-to-mp3": (
        "How to Convert MP4 to MP3 — Step-by-Step (Any Device)",
        "Step-by-step MP4 to MP3 conversion guide for Windows, Mac, iPhone, Android. Free, no sign-up, no install. Try the browser tool now.",
    ),
    "how-to-use": (
        "How to Use MP4toMP3.online — Free Step-by-Step Guide",
        "Step-by-step guide to using MP4toMP3.online: upload or paste URL, pick format, convert, download. Free, no sign-up, works on any device.",
    ),
    "lossy-vs-lossless": (
        "Lossy vs Lossless Audio — Free Plain-English Guide",
        "MP3 vs FLAC: what you lose with lossy compression, when lossless actually matters, and which to choose. Free guide with examples, no sign-up.",
    ),
    "m4a-to-mp4": (
        "M4A to MP4 Converter — Free Online Audio to Video Tool",
        "Free M4A to MP4 converter: wrap your audio in a video container entirely in your browser. No sign-up, no upload, no watermark. Try it free now.",
    ),
    "mp4-mp3": (
        "MP4 to MP3 — Free Online Converter, No Sign-up",
        "Convert MP4 to MP3 free online in your browser. No sign-up, no watermark, no upload, files up to 500MB. Try it now, completely free.",
    ),
    "mp4-to-mp3-128kbps": (
        "MP4 to MP3 at 128 kbps — Smallest File, Free Tool",
        "Convert MP4 to MP3 at 128 kbps for the smallest file size. Best for voice and podcasts. Free, no sign-up, no upload. Try it now.",
    ),
    "mp4-to-mp3-320kbps": (
        "MP4 to MP3 at 320 kbps — Highest Quality, Free Tool",
        "Convert MP4 to MP3 at 320 kbps for maximum audio quality. Best for music. Free, no sign-up, no upload, no watermark. Try it now.",
    ),
    "mp4-to-mp3-album-art": (
        "Add Album Art to MP3 — Free Step-by-Step Guide",
        "How to add cover art to MP3 files using free tools like Mp3tag and kid3. Step-by-step with resolution tips. Free, no sign-up guide.",
    ),
    "mp4-to-mp3-alternatives": (
        "5 Best MP4 to MP3 Alternatives Compared — Free 2026",
        "Compare MP4toMP3.online, VLC, Audacity, online-convert, cloudconvert: pros, cons, privacy, speed. Free 2026 comparison guide, no sign-up.",
    ),
    "mp4-to-mp3-audio-out-of-sync": (
        "Fix: Audio Out of Sync After MP4 to MP3 — Free Guide",
        "Why MP3 audio drifts out of sync after conversion from MP4, and how to fix it. Free, plain-English troubleshooting guide. No sign-up.",
    ),
    "mp4-to-mp3-common-questions": (
        "20 Common MP4 to MP3 Questions — Free FAQ Guide",
        "Answers to the 20 most-asked MP4 to MP3 questions: audio quality, batch, devices, legal, privacy. Free, no sign-up FAQ guide.",
    ),
    "mp4-to-mp3-complete-guide": (
        "Complete Guide to MP4 to MP3 — Free, Step-by-Step",
        "Everything about MP4 to MP3: formats, quality settings, privacy, batch, troubleshooting, device guides. Free complete guide, no sign-up.",
    ),
    "mp4-to-mp3-conversion-failed": (
        "Fix: MP4 to MP3 Conversion Failed — Free Guide",
        "Why MP4 to MP3 conversion fails and how to fix the most common errors. Free, plain-English troubleshooting guide. No sign-up required.",
    ),
    "mp4-to-mp3-converter-online-free": (
        "MP4 to MP3 Converter Online Free — No Sign-up",
        "Free online MP4 to MP3 converter. No sign-up, no upload, no watermark. Files up to 500MB. Try it free in your browser right now.",
    ),
    "mp4-to-mp3-fair-use": (
        "Fair Use and MP4 to MP3 — Free Plain-English Guide",
        "How fair use applies to converting MP4 to MP3: the four factors, personal use, and common real cases. Free guide. Not legal advice.",
    ),
    "mp4-to-mp3-file-too-large": (
        "MP4 Too Large to Convert? Fix It — Free Guide",
        "How to convert large MP4 files to MP3 when the file is too big for the browser. Memory limits explained with workarounds. Free troubleshooting.",
    ),
    "mp4-to-mp3-for-car-stereo": (
        "MP4 to MP3 for Car Stereo — Free USB/Aux Guide",
        "Convert MP4 to MP3 for car stereo: best bitrate, FAT32 file limits, folder structure, filename rules. Free, no sign-up. Try it now.",
    ),
    "mp4-to-mp3-for-phone": (
        "MP4 to MP3 for Phone — Free Music Library Guide",
        "Convert MP4 to MP3 for iPhone or Android music library. Best settings, how to import. Free, no sign-up, no upload. Step-by-step.",
    ),
    "mp4-to-mp3-for-transcription": (
        "MP4 to MP3 for Transcription — Free Speech Settings",
        "Convert MP4 to MP3 for transcription (Whisper, Otter, Rev): 16kHz mono 64kbps speech-optimized settings. Free, no sign-up, no upload.",
    ),
    "mp4-to-mp3-for-video-editing": (
        "MP4 to MP3 for Video Editing — Free NLE Guide",
        "Convert MP4 to MP3 for Premiere Pro, Final Cut Pro, DaVinci Resolve. Best bitrate for NLE re-encoding. Free guide, no sign-up.",
    ),
    "mp4-to-mp3-from-url": (
        "Convert MP4 to MP3 From a URL — Free, No Upload",
        "Convert MP4 to MP3 from a direct file URL or cloud share link (Google Drive, Dropbox). Free, no sign-up, files stay in your browser.",
    ),
    "mp4-to-mp3-gdpr": (
        "GDPR and MP4 to MP3 — Free Privacy Rights Guide",
        "How GDPR applies to MP4 to MP3 conversion. Your data protection rights explained in plain English. Free, no sign-up required.",
    ),
    "mp4-to-mp3-hd-audio": (
        "Extract HD Audio from MP4 — Free Complete Guide",
        "How to extract HD audio from MP4 as FLAC or high-bitrate MP3. Best settings for hi-res output. Free, no sign-up, no upload.",
    ),
    "mp4-to-mp3-high-quality": (
        "How to Convert MP4 to MP3 in High Quality — Free",
        "Best MP4 to MP3 quality settings: 320 kbps, 44.1 kHz, stereo, VBR. Free browser tool, no sign-up, no upload. Try it now.",
    ),
    "mp4-to-mp3-id3-tags": (
        "ID3 Tags Explained — Add Title, Artist to MP3 Free",
        "How to add ID3 tags (title, artist, album, year) to MP3 files with free tools like Mp3tag. Step-by-step guide. Free, no sign-up.",
    ),
    "mp4-to-mp3-large-file": (
        "Convert Large MP4 to MP3 — Free, Up to 500MB",
        "Convert large MP4 files (up to 500MB) to MP3 in your browser. Free, no sign-up, no upload. Try it now, works on any device.",
    ),
}


def rewrite_page(path: str, new_title: str, new_desc: str) -> bool:
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    original = content

    meta_start = content.find("export const metadata")
    if meta_start == -1:
        return False
    meta_block = content[meta_start:meta_start + 800]
    title_match = re.search(r'title:\s*"([^"]+)"', meta_block)
    if not title_match:
        return False
    old_title_full = title_match.group(0)
    new_title_line = f'title: "{new_title}"'
    content = content[:meta_start] + meta_block.replace(old_title_full, new_title_line, 1) + content[meta_start + 800:]

    desc_pattern = re.compile(r'(description:\s*)"([^"]+)"', re.DOTALL)
    desc_match = desc_pattern.search(content, meta_start)
    if desc_match:
        new_desc_line = f'{desc_match.group(1)}"{new_desc}"'
        content = content[:desc_match.start()] + new_desc_line + content[desc_match.end():]

    if content != original:
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        return True
    return False


def main():
    changed = 0
    for slug, (title, desc) in OVERRIDES_2.items():
        path = os.path.join(APP_DIR, slug, "page.tsx")
        if not os.path.exists(path):
            print(f"  SKIP {slug}: file not found")
            continue
        # Length checks
        t_flag = "OK" if 50 <= len(title) <= 60 else f"TITLE({len(title)})"
        d_flag = "OK" if 120 <= len(desc) <= 160 else f"DESC({len(desc)})"
        if rewrite_page(path, title, desc):
            print(f"  OK   {slug}: title={len(title)}c [{t_flag}] desc={len(desc)}c [{d_flag}]")
            changed += 1
    print(f"\n=== Done: {changed} pages rewritten ===")


if __name__ == "__main__":
    main()
