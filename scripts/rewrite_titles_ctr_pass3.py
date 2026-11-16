#!/usr/bin/env python3
"""Final pass: every page's title 50-60c and description 125-155c, with
power words. Target the pages that the previous passes left under 50c or
that still have no power word.
"""
import os
import re
import glob

APP_DIR = "src/app"

OVERRIDES_3 = {
    # Short titles — extend them with a power word suffix
    "extract-audio-from-mp4": (
        "Extract Audio From MP4 — Free MP4 Audio Extractor",
        "Free MP4 audio extractor: pull the audio track from any MP4 as a high-quality MP3 file. No sign-up, no upload, no watermark. Try it free now.",
    ),
    "extract-background-music-from-mp4": (
        "Extract Background Music from MP4 — Free Online Guide",
        "How to extract background music from an MP4 video. Honest guide on what simple conversion can do and when AI stem separation is needed. Free.",
    ),
    "extract-music-from-mp4": (
        "How to Extract Music from MP4 Video — Free Online",
        "Extract songs or music from MP4 videos as MP3. Free browser-based tool, no sign-up, no watermark. Step-by-step guide with bitrate tips.",
    ),
    "mp4-mp3": (
        "MP4 to MP3 — Free Online Converter, No Sign-up Needed",
        "Convert MP4 to MP3 free online in your browser. No sign-up, no watermark, no upload, files up to 500MB. Try it now, completely free.",
    ),
    "mp4-to-mp3-128kbps": (
        "MP4 to MP3 at 128 kbps — Smallest File Size, Free Tool",
        "Convert MP4 to MP3 at 128 kbps for the smallest file size. Best for voice and podcasts. Free, no sign-up, no upload. Try it now.",
    ),
    "mp4-to-mp3-album-art": (
        "Add Album Art to MP3 — Free Step-by-Step Guide",
        "How to add cover art to MP3 files using free tools like Mp3tag and kid3. Step-by-step with resolution tips. Free, no sign-up guide.",
    ),
    "mp4-to-mp3-common-questions": (
        "20 Common MP4 to MP3 Questions — Free FAQ Guide",
        "Answers to the 20 most-asked MP4 to MP3 questions: audio quality, batch, devices, legal, privacy. Free, no sign-up FAQ guide.",
    ),
    "mp4-to-mp3-complete-guide": (
        "Complete Guide to MP4 to MP3 — Free Step-by-Step",
        "Everything about MP4 to MP3: formats, quality settings, privacy, batch, troubleshooting, device guides. Free complete guide, no sign-up.",
    ),
    "mp4-to-mp3-conversion-failed": (
        "Fix: MP4 to MP3 Conversion Failed — Free Guide",
        "Why MP4 to MP3 conversion fails and how to fix the most common errors step by step. Free, plain-English troubleshooting guide. No sign-up.",
    ),
    "mp4-to-mp3-converter-online-free": (
        "MP4 to MP3 Converter Online Free — No Sign-up Needed",
        "Free online MP4 to MP3 converter. No sign-up, no upload, no watermark. Files up to 500MB. Try it free in your browser right now.",
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
    "mp4-to-mp3-large-file": (
        "Convert Large MP4 to MP3 — Free, Up to 500MB",
        "Convert large MP4 files (up to 500MB) to MP3 in your browser. Free, no sign-up, no upload. Try it now, works on any device.",
    ),

    # Pages still missing power words (from audit summary)
    "mp4-to-mp3-320kbps": (
        "MP4 to MP3 at 320 kbps — Highest Quality, Free Tool",
        "Convert MP4 to MP3 at 320 kbps for maximum audio quality. Best for music. Free, no sign-up, no upload, no watermark. Try it now.",
    ),
    "mp4-to-mp3-no-audio": (
        "MP4 Has No Audio? Fix It Before Converting — Free",
        "Why some MP4 files have no audio track and how to check before converting to MP3. Free troubleshooting guide. No sign-up required.",
    ),
    "mp4-to-mp3-vs-audacity": (
        "MP4toMP3.online vs Audacity — Which Is Better? Free",
        "MP4toMP3.online vs Audacity for MP4 to MP3: speed, privacy, install, editing. Honest comparison. Free, no sign-up tool included.",
    ),
    "mp4-to-mp3-vs-vlc": (
        "MP4toMP3.online vs VLC — Which Is Better? Free",
        "MP4toMP3.online vs VLC for MP4 to MP3: speed, privacy, install, batch. Honest comparison for everyday users. Free, no sign-up.",
    ),
    "mp4-to-mp3-vs-handbrake": (
        "MP4toMP3.online vs HandBrake — Free Comparison",
        "MP4toMP3.online vs HandBrake for MP4 to MP3: speed, privacy, install, use case. Honest comparison. Free, no sign-up.",
    ),
    "mp4-to-mp3-best-quality": (
        "Best MP4 to MP3 Quality Settings — Free Guide",
        "Best MP4 to MP3 quality settings: 320 kbps, 44.1 kHz, stereo, VBR. Free browser tool, no sign-up, no upload. Try it now.",
    ),
    "mp4-to-mp3-metadata": (
        "MP4 to MP3 Metadata — Preserve or Add Tags Free",
        "How to preserve or add metadata (title, artist, album) when converting MP4 to MP3. Free tools and workflow. No sign-up guide.",
    ),
    "mp4-to-mp3-normalize-volume": (
        "Normalize Volume When Converting MP4 to MP3 — Free",
        "How to normalize audio volume when converting MP4 to MP3. Free tools and workflow. No sign-up, plain-English guide.",
    ),
    "mp4-to-mp3-private": (
        "How MP4toMP3.online Protects Your Privacy — Free",
        "How MP4toMP3.online keeps your files private: browser-based processing, no upload, no server storage. Free, no sign-up.",
    ),
    "mp4-to-mp3-trim-audio": (
        "How to Trim Audio When Converting MP4 to MP3 — Free",
        "Why conversion is the wrong place to trim and how to losslessly cut MP3 with mp3DirectCut. Free, no sign-up, honest guide.",
    ),
    "mp4-to-mp3-vbr-vs-cbr": (
        "MP3 VBR vs CBR — Which to Choose? Free Guide",
        "Variable vs constant bitrate for MP3: quality, size, compatibility compared. Free plain-English guide. No sign-up required.",
    ),
    "mp4-to-mp3-sample-rate": (
        "MP3 Sample Rate Explained — Free Guide 44.1/48",
        "What sample rate means for MP3 (44.1 vs 48 kHz) and which to choose for music, voice, video. Free, no sign-up guide.",
    ),
    "mp4-to-mp3-stereo-vs-mono": (
        "MP3 Stereo vs Mono — Which to Choose? Free Guide",
        "Stereo vs mono MP3: when each is better, file size, voice vs music. Free plain-English guide. No sign-up required.",
    ),
    "mp4-vs-mp3": (
        "MP4 vs MP3 — What's the Difference? Free Guide",
        "MP4 (video container) vs MP3 (audio format): what each is, when to convert, quality and size tradeoffs. Free, no sign-up guide.",
    ),
    "online-vs-offline-mp4-to-mp3": (
        "Online vs Offline MP4 to MP3 — Free Comparison",
        "Online vs offline MP4 to MP3 converter: privacy, speed, install, file size limits. Which is better for you? Free guide.",
    ),
    "free-vs-paid-mp4-to-mp3": (
        "Free vs Paid MP4 to MP3 — Do You Need to Pay? Free",
        "Free vs paid MP4 to MP3 converters: what paid tools offer, when free is enough. Honest comparison. Free, no sign-up.",
    ),
    "mp4-to-mp3-personal-use": (
        "MP4 to MP3 for Personal Use — Free Guide",
        "Personal use exceptions for converting MP4 to MP3: what's allowed, what's not. Free plain-English guide. Not legal advice.",
    ),
    "mp4-to-mp3-no-upload": (
        "Why Files Never Leave Your Device — Free Privacy",
        "Why MP4toMP3.online never uploads your files: browser-based FFmpeg.wasm processing explained. Free, no sign-up, private.",
    ),
    "mp4-to-mp3-batch": (
        "How to Batch Convert MP4 to MP3 — Free Guide",
        "How to batch convert multiple MP4 files to MP3 efficiently in your browser. Free, no sign-up, no upload. Try it now.",
    ),
    "mp4-to-mp3-multiple-files": (
        "Convert Multiple MP4 to MP3 at Once — Free Tool",
        "Convert multiple MP4 files to MP3 at once in your browser. Free, no sign-up, no upload. Sequential fast processing.",
    ),
    "mp4-to-mp3-quickly": (
        "The Fastest Way to Convert MP4 to MP3 — Free",
        "The fastest way to convert MP4 to MP3 online: browser-based, no upload, instant processing. Free, no sign-up. Try now.",
    ),
    "mp4-to-mp3-from-google-drive": (
        "Convert MP4 to MP3 From Google Drive — Free Tool",
        "Convert MP4 to MP3 directly from a Google Drive share link. Free, no sign-up, files stay in your browser. Try it now.",
    ),
    "mp4-to-mp3-from-dropbox": (
        "Convert MP4 to MP3 From Dropbox — Free Tool",
        "Convert MP4 to MP3 directly from a Dropbox share link. Free, no sign-up, no upload. Try it now in your browser.",
    ),
    "mp4-to-mp3-long-video": (
        "Convert Long MP4 Videos to MP3 — Free 1+ Hour",
        "Convert long MP4 videos (1+ hour) to MP3 in your browser. Tips for memory limits and best bitrate. Free, no sign-up, no upload.",
    ),
    "mp4-to-mp3-short-clip": (
        "Convert Short MP4 Clips to MP3 — Free Fast Tool",
        "Convert short MP4 clips to MP3 quickly in your browser. Best for ringtones, sound bites, samples. Free, no sign-up, no upload.",
    ),
    "mp4-to-mp3-no-install": (
        "MP4 to MP3 No Install — Free Browser Converter",
        "MP4 to MP3 converter that needs no installation. Runs entirely in your browser. Free, no sign-up, no upload, no watermark.",
    ),
    "mp4-to-mp3-in-browser": (
        "Convert MP4 to MP3 Entirely in Browser — Free, Private",
        "Convert MP4 to MP3 entirely in your browser with no upload. FFmpeg.wasm runs locally. Free, no sign-up, fully private.",
    ),
    "mp4-to-mp3-no-software": (
        "Convert MP4 to MP3 Without Software — Free Tool",
        "Convert MP4 to MP3 without installing any software. Browser-based, free, no sign-up, no upload. Try it now.",
    ),
    "mp4-to-mp3-no-signup": (
        "MP4 to MP3 with No Sign-up — Free Online Tool",
        "MP4 to MP3 converter with no sign-up required. Free, no account, no watermark, no upload. Try it now in your browser.",
    ),
    "mp4-to-mp3-no-watermark": (
        "MP4 to MP3 with No Watermark — Free Online Tool",
        "MP4 to MP3 converter with no watermark in the output. Free, no sign-up, no upload. Clean MP3 files. Try it now.",
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
    issues = []
    for slug, (title, desc) in OVERRIDES_3.items():
        path = os.path.join(APP_DIR, slug, "page.tsx")
        if not os.path.exists(path):
            continue
        if not (50 <= len(title) <= 60):
            issues.append(f"  TITLE {slug}: {len(title)}c: {title}")
        if not (120 <= len(desc) <= 160):
            issues.append(f"  DESC  {slug}: {len(desc)}c")
        if rewrite_page(path, title, desc):
            changed += 1
    if issues:
        print("WARNINGS:")
        for i in issues:
            print(i)
    print(f"\n=== Done: {changed} pages rewritten ===")


if __name__ == "__main__":
    main()
