#!/usr/bin/env python3
"""
Add authoritative Citations to ~38 SEO content pages on MP4toMP3.online.

For each PageShell + Article page:
  1. Insert `import { Citations, type Citation } from "@/components/citations";`
     after the QuickAnswer import.
  2. Insert a `<Citations sources={[...]} />` block immediately before the
     bottom CTA `<section className="rounded-2xl border border-primary/30 ...">`.
  3. Add a `citation: [...]` array of URLs to the page's Article JSON-LD
     (right after the `dateModified: ...` line).

For LandingPage-based pages (no Article JSON-LD), wrap the return in a
fragment, append `<Citations />` after `<LandingPage />`, and inject a
supplementary Article JSON-LD block with a `citation` field.

Only VERIFIED canonical URLs from the task brief are used.
"""

import json
import re
import sys
from pathlib import Path

APP = Path("/home/z/my-project/src/app")

# ---------------------------------------------------------------------------
# Citation sources. Each entry: (title, url, publisher, note).
# Only URLs from the task brief's verified canonical list are used.
# ---------------------------------------------------------------------------
CITATIONS = {
    # --- Tool / converter pages (2-3 citations each) ---
    "mp4-to-mp3-online": [
        ("MP3 — Wikipedia", "https://en.wikipedia.org/wiki/MP3", "Wikipedia",
         "MPEG-1 Audio Layer III format spec and history underpinning the output."),
        ("FFmpeg — Wikipedia", "https://en.wikipedia.org/wiki/FFmpeg", "Wikipedia",
         "The open-source multimedia framework that powers the conversion pipeline."),
        ("ffmpeg.wasm — GitHub", "https://github.com/ffmpegwasm/ffmpeg.wasm", "GitHub",
         "The WebAssembly port of FFmpeg that runs the conversion in the browser."),
    ],
    "mp4-to-mp3-converter-online-free": [
        ("FFmpeg documentation", "https://ffmpeg.org/ffmpeg.html", "FFmpeg",
         "Official FFmpeg manual for the demux/decode/encode pipeline used here."),
        ("LAME — Wikipedia", "https://en.wikipedia.org/wiki/LAME", "Wikipedia",
         "The libmp3lame encoder used to write the MP3 output stream."),
        ("WebAssembly — Wikipedia", "https://en.wikipedia.org/wiki/WebAssembly",
         "Wikipedia", "How the browser-based converter runs FFmpeg without install."),
    ],
    "best-mp4-to-mp3-converter": [
        ("FFmpeg — Wikipedia", "https://en.wikipedia.org/wiki/FFmpeg", "Wikipedia",
         "The engine that powers the best-in-class browser-based converter."),
        ("FFmpeg Wiki: Encode/MP3", "https://trac.ffmpeg.org/wiki/Encode/MP3",
         "FFmpeg Wiki", "Practical guidance on MP3 encoding quality settings."),
        ("MP3 — Wikipedia", "https://en.wikipedia.org/wiki/MP3", "Wikipedia",
         "The MP3 format the converter targets at VBR ~190 kbps."),
    ],
    "best-mp4-to-mp3-converter-2026": [
        ("FFmpeg — Wikipedia", "https://en.wikipedia.org/wiki/FFmpeg", "Wikipedia",
         "The engine behind the 2026 browser-based converter recommendation."),
        ("WebAssembly — Wikipedia", "https://en.wikipedia.org/wiki/WebAssembly",
         "Wikipedia", "The runtime that makes install-free conversion possible."),
        ("FFmpeg Wiki: Encode/MP3", "https://trac.ffmpeg.org/wiki/Encode/MP3",
         "FFmpeg Wiki", "Current best-practice MP3 encoding settings."),
    ],
    "change-video-to-audio": [
        ("FFmpeg — Wikipedia", "https://en.wikipedia.org/wiki/FFmpeg", "Wikipedia",
         "The framework that demuxes video and re-encodes its audio stream."),
        ("Advanced Audio Coding — Wikipedia",
         "https://en.wikipedia.org/wiki/Advanced_Audio_Coding", "Wikipedia",
         "AAC, the typical source audio codec inside MP4 video files."),
        ("MP3 — Wikipedia", "https://en.wikipedia.org/wiki/MP3", "Wikipedia",
         "The output audio format produced by changing video to audio."),
    ],
    "change-video-to-mp3": [
        ("FFmpeg documentation", "https://ffmpeg.org/ffmpeg.html", "FFmpeg",
         "Official manual for the video-to-MP3 conversion pipeline."),
        ("LAME — Wikipedia", "https://en.wikipedia.org/wiki/LAME", "Wikipedia",
         "The libmp3lame encoder used to write the MP3 output."),
        ("MP3 — Wikipedia", "https://en.wikipedia.org/wiki/MP3", "Wikipedia",
         "The MP3 format produced by changing video to MP3."),
    ],
    "convert-mov-to-mp3": [
        ("Comparison of video container formats — Wikipedia",
         "https://en.wikipedia.org/wiki/Comparison_of_video_container_formats",
         "Wikipedia", "How MOV and MP4 containers relate to each other."),
        ("Advanced Audio Coding — Wikipedia",
         "https://en.wikipedia.org/wiki/Advanced_Audio_Coding", "Wikipedia",
         "AAC, the usual audio codec inside QuickTime MOV files."),
        ("MP3 — Wikipedia", "https://en.wikipedia.org/wiki/MP3", "Wikipedia",
         "The MP3 output format for converted MOV audio."),
    ],
    "convert-wav-to-mp4": [
        ("FLAC — Wikipedia", "https://en.wikipedia.org/wiki/FLAC", "Wikipedia",
         "Lossless audio context relevant to wrapping WAV into MP4."),
        ("MPEG-4 — Wikipedia", "https://en.wikipedia.org/wiki/MPEG-4", "Wikipedia",
         "The MP4 container that wraps the WAV audio into a video file."),
        ("Media container formats — MDN",
         "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Containers",
         "Mozilla MDN", "How the MP4 container bundles audio and video streams."),
    ],
    "convert-video-to-audio": [
        ("FFmpeg — Wikipedia", "https://en.wikipedia.org/wiki/FFmpeg", "Wikipedia",
         "The engine that demuxes video and extracts its audio stream."),
        ("Advanced Audio Coding — Wikipedia",
         "https://en.wikipedia.org/wiki/Advanced_Audio_Coding", "Wikipedia",
         "AAC, the typical source audio codec inside uploaded video."),
        ("MP3 — Wikipedia", "https://en.wikipedia.org/wiki/MP3", "Wikipedia",
         "The MP3 output format produced for converted audio."),
    ],
    "video-to-audio-converter": [
        ("FFmpeg documentation", "https://ffmpeg.org/ffmpeg.html", "FFmpeg",
         "Official FFmpeg manual for the video-to-audio extraction pipeline."),
        ("LAME — Wikipedia", "https://en.wikipedia.org/wiki/LAME", "Wikipedia",
         "The libmp3lame encoder used for the MP3 output."),
        ("Web audio codec guide — MDN",
         "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs",
         "Mozilla MDN", "Codec characteristics for MP3 and related audio output."),
    ],
    "video-to-audio-converter-online": [
        ("FFmpeg — Wikipedia", "https://en.wikipedia.org/wiki/FFmpeg", "Wikipedia",
         "The engine behind the online video-to-audio conversion."),
        ("MP3 — Wikipedia", "https://en.wikipedia.org/wiki/MP3", "Wikipedia",
         "The MP3 output format delivered by the converter."),
        ("WebAssembly — Wikipedia", "https://en.wikipedia.org/wiki/WebAssembly",
         "Wikipedia", "The runtime enabling install-free online conversion."),
    ],
    "video-to-audio-converter-for-pc": [
        ("FFmpeg — Wikipedia", "https://en.wikipedia.org/wiki/FFmpeg", "Wikipedia",
         "The FFmpeg engine used by desktop and PC converters alike."),
        ("FFmpeg", "https://ffmpeg.org/", "FFmpeg.org",
         "Official FFmpeg project home for PC-side conversion tooling."),
        ("LAME — Wikipedia", "https://en.wikipedia.org/wiki/LAME", "Wikipedia",
         "The libmp3lame encoder shared by PC and browser converters."),
    ],
    "video-to-audio-converter-online-free": [
        ("FFmpeg documentation", "https://ffmpeg.org/ffmpeg.html", "FFmpeg",
         "Official FFmpeg manual for the free online conversion pipeline."),
        ("LAME — Wikipedia", "https://en.wikipedia.org/wiki/LAME", "Wikipedia",
         "The libmp3lame encoder used to write the free MP3 output."),
        ("MP3 — Wikipedia", "https://en.wikipedia.org/wiki/MP3", "Wikipedia",
         "The MP3 output format produced for free."),
    ],
    "video-into-audio": [
        ("FFmpeg — Wikipedia", "https://en.wikipedia.org/wiki/FFmpeg", "Wikipedia",
         "The framework that turns video into audio by demuxing streams."),
        ("Advanced Audio Coding — Wikipedia",
         "https://en.wikipedia.org/wiki/Advanced_Audio_Coding", "Wikipedia",
         "AAC, the typical source audio codec inside the video."),
        ("MP3 — Wikipedia", "https://en.wikipedia.org/wiki/MP3", "Wikipedia",
         "The MP3 output format when turning video into audio."),
    ],
    "video-into-audio-file": [
        ("Comparison of video container formats — Wikipedia",
         "https://en.wikipedia.org/wiki/Comparison_of_video_container_formats",
         "Wikipedia", "Container formats that carry the source video audio."),
        ("Advanced Audio Coding — Wikipedia",
         "https://en.wikipedia.org/wiki/Advanced_Audio_Coding", "Wikipedia",
         "AAC, the usual audio codec inside common video files."),
        ("Web audio codec guide — MDN",
         "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs",
         "Mozilla MDN", "Codec options for the output audio file."),
    ],
    "mp4-to-wav": [
        ("FLAC — Wikipedia", "https://en.wikipedia.org/wiki/FLAC", "Wikipedia",
         "Lossless audio context for the WAV output of an MP4 file."),
        ("Advanced Audio Coding — Wikipedia",
         "https://en.wikipedia.org/wiki/Advanced_Audio_Coding", "Wikipedia",
         "AAC, the typical source audio codec inside the MP4 input."),
        ("Web audio codec guide — MDN",
         "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs",
         "Mozilla MDN", "Lossless PCM/WAV versus lossy AAC codec comparison."),
    ],
    "mp4-to-wav-converter": [
        ("FLAC — Wikipedia", "https://en.wikipedia.org/wiki/FLAC", "Wikipedia",
         "Lossless audio reference relevant to MP4-to-WAV extraction."),
        ("Advanced Audio Coding — Wikipedia",
         "https://en.wikipedia.org/wiki/Advanced_Audio_Coding", "Wikipedia",
         "AAC source codec that the WAV converter decodes."),
        ("FFmpeg documentation", "https://ffmpeg.org/ffmpeg.html", "FFmpeg",
         "Official manual for the MP4-to-WAV decode pipeline."),
    ],
    "mp4-to-mp3-software": [
        ("FFmpeg — Wikipedia", "https://en.wikipedia.org/wiki/FFmpeg", "Wikipedia",
         "The engine both desktop software and browser converters share."),
        ("LAME — Wikipedia", "https://en.wikipedia.org/wiki/LAME", "Wikipedia",
         "The libmp3lame encoder bundled into most MP4-to-MP3 software."),
        ("Advanced Audio Coding — Wikipedia",
         "https://en.wikipedia.org/wiki/Advanced_Audio_Coding", "Wikipedia",
         "AAC source codec the software decodes before re-encoding to MP3."),
    ],
    "mp4-mp3": [
        ("MPEG-4 — Wikipedia", "https://en.wikipedia.org/wiki/MPEG-4", "Wikipedia",
         "The MP4 container format that holds the input video and audio."),
        ("MP3 — Wikipedia", "https://en.wikipedia.org/wiki/MP3", "Wikipedia",
         "The MP3 audio format produced by the conversion."),
        ("FFmpeg — Wikipedia", "https://en.wikipedia.org/wiki/FFmpeg", "Wikipedia",
         "The engine that converts the MP4 container into an MP3 stream."),
    ],
    "mov-to-mp3": [
        ("Comparison of video container formats — Wikipedia",
         "https://en.wikipedia.org/wiki/Comparison_of_video_container_formats",
         "Wikipedia", "How the MOV (QuickTime) container relates to MP4."),
        ("Advanced Audio Coding — Wikipedia",
         "https://en.wikipedia.org/wiki/Advanced_Audio_Coding", "Wikipedia",
         "AAC, the usual audio codec inside iPhone MOV files."),
        ("MP3 — Wikipedia", "https://en.wikipedia.org/wiki/MP3", "Wikipedia",
         "The MP3 output format for converted MOV audio."),
    ],
    "mkv-to-mp3": [
        ("Comparison of video container formats — Wikipedia",
         "https://en.wikipedia.org/wiki/Comparison_of_video_container_formats",
         "Wikipedia", "How the MKV (Matroska) container differs from MP4."),
        ("FFmpeg — Wikipedia", "https://en.wikipedia.org/wiki/FFmpeg", "Wikipedia",
         "The engine that demuxes MKV and re-encodes its audio to MP3."),
        ("MP3 — Wikipedia", "https://en.wikipedia.org/wiki/MP3", "Wikipedia",
         "The MP3 output format for converted MKV audio."),
    ],
    "m4a-to-mp4": [
        ("Advanced Audio Coding — Wikipedia",
         "https://en.wikipedia.org/wiki/Advanced_Audio_Coding", "Wikipedia",
         "AAC, the audio codec typically inside an .m4a file."),
        ("MPEG-4 — Wikipedia", "https://en.wikipedia.org/wiki/MPEG-4", "Wikipedia",
         "The MP4 container that wraps the M4A audio into a video file."),
        ("Media container formats — MDN",
         "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Containers",
         "Mozilla MDN", "How the MP4 container bundles audio and video streams."),
    ],
    "mp4-to-mp3-no-install": [
        ("WebAssembly — Wikipedia", "https://en.wikipedia.org/wiki/WebAssembly",
         "Wikipedia", "The runtime that makes install-free conversion possible."),
        ("ffmpeg.wasm — GitHub", "https://github.com/ffmpegwasm/ffmpeg.wasm",
         "GitHub", "The WebAssembly FFmpeg port used for no-install conversion."),
        ("FFmpeg — Wikipedia", "https://en.wikipedia.org/wiki/FFmpeg", "Wikipedia",
         "The engine compiled to WebAssembly for in-browser use."),
    ],
    "mp4-to-mp3-in-browser": [
        ("WebAssembly — Wikipedia", "https://en.wikipedia.org/wiki/WebAssembly",
         "Wikipedia", "The runtime that lets FFmpeg run inside the browser."),
        ("ffmpeg.wasm — GitHub", "https://github.com/ffmpegwasm/ffmpeg.wasm",
         "GitHub", "The WebAssembly FFmpeg port enabling in-browser conversion."),
        ("FFmpeg — Wikipedia", "https://en.wikipedia.org/wiki/FFmpeg", "Wikipedia",
         "The engine that runs entirely client-side when compiled to WASM."),
    ],
    "mp4-to-mp3-no-software": [
        ("WebAssembly — Wikipedia", "https://en.wikipedia.org/wiki/WebAssembly",
         "Wikipedia", "The runtime that removes the need for installed software."),
        ("ffmpeg.wasm — GitHub", "https://github.com/ffmpegwasm/ffmpeg.wasm",
         "GitHub", "The WebAssembly FFmpeg port used with no software install."),
        ("MP3 — Wikipedia", "https://en.wikipedia.org/wiki/MP3", "Wikipedia",
         "The MP3 output format produced without any installed software."),
    ],
    "mp4-to-mp3-no-signup": [
        ("FFmpeg — Wikipedia", "https://en.wikipedia.org/wiki/FFmpeg", "Wikipedia",
         "The engine that needs no account to convert MP4 to MP3."),
        ("LAME — Wikipedia", "https://en.wikipedia.org/wiki/LAME", "Wikipedia",
         "The libmp3lame encoder used with no sign-up required."),
        ("MP3 — Wikipedia", "https://en.wikipedia.org/wiki/MP3", "Wikipedia",
         "The MP3 output format produced without sign-up."),
    ],
    "mp4-to-mp3-no-watermark": [
        ("FFmpeg documentation", "https://ffmpeg.org/ffmpeg.html", "FFmpeg",
         "Official FFmpeg manual for the clean, watermark-free output pipeline."),
        ("LAME — Wikipedia", "https://en.wikipedia.org/wiki/LAME", "Wikipedia",
         "The libmp3lame encoder that writes unmodified MP3 audio."),
        ("MP3 — Wikipedia", "https://en.wikipedia.org/wiki/MP3", "Wikipedia",
         "The MP3 output format delivered without any watermark."),
    ],
    # mp4-to-mp3-no-upload already edited — skipped.

    # --- Comparison / advanced pages (4-5 citations each) ---
    "online-vs-offline-mp4-to-mp3": [
        ("WebAssembly — Wikipedia", "https://en.wikipedia.org/wiki/WebAssembly",
         "Wikipedia", "The runtime enabling online, no-upload conversion."),
        ("ffmpeg.wasm — GitHub", "https://github.com/ffmpegwasm/ffmpeg.wasm",
         "GitHub", "The WASM FFmpeg port behind the online converter."),
        ("FFmpeg — Wikipedia", "https://en.wikipedia.org/wiki/FFmpeg", "Wikipedia",
         "The engine shared by both online and offline converters."),
        ("General Data Protection Regulation — Wikipedia",
         "https://en.wikipedia.org/wiki/General_Data_Protection_Regulation",
         "Wikipedia", "Why online, no-upload conversion reduces privacy risk."),
        ("GDPR.eu", "https://gdpr.eu/", "gdpr.eu",
         "Plain-language reference for the EU privacy regime relevant to uploads."),
    ],
    "free-vs-paid-mp4-to-mp3": [
        ("FFmpeg — Wikipedia", "https://en.wikipedia.org/wiki/FFmpeg", "Wikipedia",
         "The open-source engine that lets free converters match paid ones."),
        ("LAME — Wikipedia", "https://en.wikipedia.org/wiki/LAME", "Wikipedia",
         "The free MP3 encoder used by both free and paid tools."),
        ("Fair use — Wikipedia", "https://en.wikipedia.org/wiki/Fair_use", "Wikipedia",
         "Fair-use boundaries for free conversion of personal media."),
        ("U.S. Copyright Office", "https://www.copyright.gov/", "U.S. Copyright Office",
         "Official authority on what free and paid converters may legally process."),
    ],
    "browser-vs-app-mp4-to-mp3": [
        ("WebAssembly — Wikipedia", "https://en.wikipedia.org/wiki/WebAssembly",
         "Wikipedia", "The runtime that lets browser converters rival desktop apps."),
        ("ffmpeg.wasm — GitHub", "https://github.com/ffmpegwasm/ffmpeg.wasm",
         "GitHub", "The WASM FFmpeg port powering the browser-based path."),
        ("FFmpeg — Wikipedia", "https://en.wikipedia.org/wiki/FFmpeg", "Wikipedia",
         "The engine shared by both browser and desktop-app converters."),
        ("WebAssembly — MDN", "https://developer.mozilla.org/en-US/docs/WebAssembly",
         "Mozilla MDN", "MDN reference for in-browser FFmpeg execution."),
        ("General Data Protection Regulation — Wikipedia",
         "https://en.wikipedia.org/wiki/General_Data_Protection_Regulation",
         "Wikipedia", "Privacy advantage of browser-based over installed apps."),
    ],
    "mp4-to-mp3-normalize-volume": [
        ("MP3 — Wikipedia", "https://en.wikipedia.org/wiki/MP3", "Wikipedia",
         "How MP3 stores loudness and why normalization is needed."),
        ("LAME — Wikipedia", "https://en.wikipedia.org/wiki/LAME", "Wikipedia",
         "The libmp3lame encoder flags relevant to volume normalization."),
        ("Hydrogenaudio — MP3", "https://wiki.hydrogenaud.io/index.php?title=MP3",
         "Hydrogenaudio", "Community reference on MP3 volume and replay gain."),
        ("Hydrogenaudio — LAME", "https://wiki.hydrogenaud.io/index.php?title=LAME",
         "Hydrogenaudio", "Recommended LAME settings touching output loudness."),
        ("FFmpeg documentation", "https://ffmpeg.org/ffmpeg.html", "FFmpeg",
         "FFmpeg audio filter reference used for loudness normalization."),
    ],
    "mp4-to-mp3-trim-audio": [
        ("FFmpeg — Wikipedia", "https://en.wikipedia.org/wiki/FFmpeg", "Wikipedia",
         "The engine whose -ss/-t flags trim audio during conversion."),
        ("FFmpeg documentation", "https://ffmpeg.org/ffmpeg.html", "FFmpeg",
         "Official manual for the seek and duration flags used to trim."),
        ("MP3 — Wikipedia", "https://en.wikipedia.org/wiki/MP3", "Wikipedia",
         "The MP3 output format produced after trimming."),
        ("ID3 — Wikipedia", "https://en.wikipedia.org/wiki/ID3", "Wikipedia",
         "Metadata handling preserved across a trimmed MP3."),
    ],
    "mp4-to-mp3-metadata": [
        ("ID3 — Wikipedia", "https://en.wikipedia.org/wiki/ID3", "Wikipedia",
         "The ID3 metadata container embedded in MP3 files."),
        ("MP3 — Wikipedia", "https://en.wikipedia.org/wiki/MP3", "Wikipedia",
         "How MP3 carries metadata alongside the audio stream."),
        ("FFmpeg documentation", "https://ffmpeg.org/ffmpeg.html", "FFmpeg",
         "FFmpeg options for preserving and writing metadata fields."),
        ("LAME — Wikipedia", "https://en.wikipedia.org/wiki/LAME", "Wikipedia",
         "The libmp3lame encoder that writes ID3 tags during output."),
    ],
    "mp4-to-mp3-id3-tags": [
        ("ID3 — Wikipedia", "https://en.wikipedia.org/wiki/ID3", "Wikipedia",
         "The ID3 tag standard for title, artist, album and artwork."),
        ("MP3 — Wikipedia", "https://en.wikipedia.org/wiki/MP3", "Wikipedia",
         "How MP3 files embed ID3 metadata inside the stream."),
        ("FFmpeg documentation", "https://ffmpeg.org/ffmpeg.html", "FFmpeg",
         "FFmpeg flags for reading and writing ID3 tags."),
        ("Hydrogenaudio — MP3", "https://wiki.hydrogenaud.io/index.php?title=MP3",
         "Hydrogenaudio", "Community reference on ID3 tag best practices."),
        ("LAME — Wikipedia", "https://en.wikipedia.org/wiki/LAME", "Wikipedia",
         "The libmp3lame encoder that writes ID3 tags on output."),
    ],
    "mp4-to-mp3-album-art": [
        ("ID3 — Wikipedia", "https://en.wikipedia.org/wiki/ID3", "Wikipedia",
         "The ID3 APIC frame that embeds album art inside an MP3."),
        ("MP3 — Wikipedia", "https://en.wikipedia.org/wiki/MP3", "Wikipedia",
         "How MP3 carries embedded cover art via ID3 frames."),
        ("FFmpeg documentation", "https://ffmpeg.org/ffmpeg.html", "FFmpeg",
         "FFmpeg options for attaching album art to MP3 output."),
        ("LAME — Wikipedia", "https://en.wikipedia.org/wiki/LAME", "Wikipedia",
         "The libmp3lame encoder that writes APIC artwork frames."),
    ],
    "mp4-to-mp3-quickly": [
        ("WebAssembly — Wikipedia", "https://en.wikipedia.org/wiki/WebAssembly",
         "Wikipedia", "The runtime that makes fast, install-free conversion possible."),
        ("ffmpeg.wasm — GitHub", "https://github.com/ffmpegwasm/ffmpeg.wasm",
         "GitHub", "The WASM FFmpeg port enabling the fastest online path."),
        ("FFmpeg — Wikipedia", "https://en.wikipedia.org/wiki/FFmpeg", "Wikipedia",
         "The engine whose pipeline speed the browser converter inherits."),
        ("LAME — Wikipedia", "https://en.wikipedia.org/wiki/LAME", "Wikipedia",
         "The libmp3lame encoder tuned for fast MP3 output."),
    ],
    "mp4-to-mp3-alternatives": [
        ("FFmpeg — Wikipedia", "https://en.wikipedia.org/wiki/FFmpeg", "Wikipedia",
         "The shared engine behind most MP4-to-MP3 alternatives."),
        ("LAME — Wikipedia", "https://en.wikipedia.org/wiki/LAME", "Wikipedia",
         "The encoder used across MP3-producing alternatives."),
        ("Advanced Audio Coding — Wikipedia",
         "https://en.wikipedia.org/wiki/Advanced_Audio_Coding", "Wikipedia",
         "AAC, a common alternative audio output format."),
        ("FLAC — Wikipedia", "https://en.wikipedia.org/wiki/FLAC", "Wikipedia",
         "FLAC, the lossless alternative to MP3 output."),
        ("Opus (audio format) — Wikipedia",
         "https://en.wikipedia.org/wiki/Opus_(audio_format)", "Wikipedia",
         "Opus, a modern low-latency alternative to MP3."),
    ],
    "mp4-to-mp3-complete-guide": [
        ("MPEG-4 — Wikipedia", "https://en.wikipedia.org/wiki/MPEG-4", "Wikipedia",
         "The MP4 container format at the start of the conversion pipeline."),
        ("MP3 — Wikipedia", "https://en.wikipedia.org/wiki/MP3", "Wikipedia",
         "The MP3 output format produced by the complete guide workflow."),
        ("FFmpeg — Wikipedia", "https://en.wikipedia.org/wiki/FFmpeg", "Wikipedia",
         "The engine that powers every step of the complete conversion guide."),
        ("LAME — Wikipedia", "https://en.wikipedia.org/wiki/LAME", "Wikipedia",
         "The libmp3lame encoder that writes the final MP3 stream."),
        ("Advanced Audio Coding — Wikipedia",
         "https://en.wikipedia.org/wiki/Advanced_Audio_Coding", "Wikipedia",
         "AAC, the typical source audio codec decoded during conversion."),
    ],
}

# Pages that use the LandingPage component (no Article JSON-LD).
LANDING_PAGE_SLUGS = {
    "convert-video-to-audio",
    "video-to-audio-converter",
    "mov-to-mp3",
    "mkv-to-mp3",
    "m4a-to-mp4",
    "mp4-to-wav",
}


def build_import_line() -> str:
    return 'import { Citations, type Citation } from "@/components/citations";'


def build_citations_block(slug: str) -> str:
    sources = CITATIONS[slug]
    lines = []
    lines.append("        <Citations")
    lines.append("          sources={[")
    for (title, url, publisher, note) in sources:
        title_js = json.dumps(title)
        url_js = json.dumps(url)
        publisher_js = json.dumps(publisher)
        note_js = json.dumps(note)
        lines.append(
            f"            {{ title: {title_js}, url: {url_js}, "
            f"publisher: {publisher_js}, note: {note_js} }},"
        )
    lines.append("          ]}")
    lines.append("        />")
    return "\n".join(lines)


def build_landing_citations_block(slug: str) -> str:
    """Citations block with 6-space indentation for the LandingPage fragment."""
    sources = CITATIONS[slug]
    lines = []
    lines.append("      <Citations")
    lines.append("        sources={[")
    for (title, url, publisher, note) in sources:
        title_js = json.dumps(title)
        url_js = json.dumps(url)
        publisher_js = json.dumps(publisher)
        note_js = json.dumps(note)
        lines.append(
            f"          {{ title: {title_js}, url: {url_js}, "
            f"publisher: {publisher_js}, note: {note_js} }},"
        )
    lines.append("        ]}")
    lines.append("      />")
    return "\n".join(lines)


def build_jsonld_citation_field(slug: str) -> str:
    urls = [s[1] for s in CITATIONS[slug]]
    url_lines = "\n".join(f"      {json.dumps(u)}," for u in urls)
    return "    citation: [\n" + url_lines + "\n    ],"


def process_pageshell_page(slug: str) -> str:
    page_path = APP / slug / "page.tsx"
    text = page_path.read_text(encoding="utf-8")
    original = text

    # 1. Add the import after the QuickAnswer import line.
    import_anchor = 'import { QuickAnswer } from "@/components/quick-answer";'
    if import_anchor not in text:
        return f"  ERROR: import anchor not found in {slug}"
    if 'from "@/components/citations"' not in text:
        text = text.replace(
            import_anchor,
            import_anchor + "\n" + build_import_line(),
            1,
        )

    # 2. Insert the <Citations ... /> block immediately before the CTA section.
    cta_anchor = (
        '        <section className="rounded-2xl border border-primary/30 '
        'bg-primary/5 p-6 text-center">'
    )
    if cta_anchor not in text:
        return f"  ERROR: CTA anchor not found in {slug}"
    if "<Citations" not in text:
        block = build_citations_block(slug) + "\n\n" + cta_anchor
        text = text.replace(cta_anchor, block, 1)

    # 3. Add citation array to Article JSON-LD after dateModified line.
    if "citation:" not in text:
        citation_field = build_jsonld_citation_field(slug)
        pattern = re.compile(r'(    dateModified: "2026-[^"]+",\n)')
        text, n = pattern.subn(
            lambda m: m.group(1) + citation_field + "\n", text, count=1
        )
        if n == 0:
            return f"  ERROR: dateModified sub failed for {slug}"

    if text != original:
        page_path.write_text(text, encoding="utf-8")
        return f"  OK: {slug} ({len(CITATIONS[slug])} citations)"
    return f"  NO-CHANGE: {slug}"


def process_landing_page(slug: str) -> str:
    """Wrap a LandingPage return in a fragment and append <Citations />."""
    page_path = APP / slug / "page.tsx"
    text = page_path.read_text(encoding="utf-8")
    original = text

    if "<Citations" in text:
        return f"  NO-CHANGE (already edited): {slug}"

    # 1. Add imports for Citations and JsonLd if missing.
    if 'from "@/components/citations"' not in text:
        text = text.replace(
            'import { LandingPage } from "@/components/landing-page";',
            'import { LandingPage } from "@/components/landing-page";\n'
            + build_import_line()
            + '\nimport { JsonLd } from "@/components/json-ld";',
            1,
        )
    elif 'import { JsonLd } from "@/components/json-ld";' not in text:
        text = text.replace(
            build_import_line(),
            build_import_line() + '\nimport { JsonLd } from "@/components/json-ld";',
            1,
        )

    # 2. Build a supplementary Article JSON-LD with citation field.
    urls = [s[1] for s in CITATIONS[slug]]
    url_lines = "\n".join(f"      {json.dumps(u)}," for u in urls)
    h1_match = re.search(r'h1="([^"]+)"', text)
    subtitle_match = re.search(r'subtitle="([^"]+)"', text)
    h1 = h1_match.group(1) if h1_match else slug
    subtitle = subtitle_match.group(1) if subtitle_match else h1
    citation_jsonld = (
        "  const citationJsonLd = {\n"
        '    "@context": "https://schema.org",\n'
        '    "@type": "Article",\n'
        f"    headline: {json.dumps(h1)},\n"
        f"    description: {json.dumps(subtitle)},\n"
        '    author: { "@type": "Organization", name: "MP4toMP3.online" },\n'
        '    publisher: { "@type": "Organization", name: "MP4toMP3.online" },\n'
        f'    mainEntityOfPage: "https://www.mp4tomp3.online/{slug}",\n'
        '    datePublished: "2026-11-16",\n'
        '    dateModified: "2026-11-16",\n'
        "    citation: [\n"
        f"{url_lines}\n"
        "    ],\n"
        "  };\n"
    )

    # Insert citationJsonLd after the metadata block, before export default.
    meta_pattern = re.compile(
        r'(export const metadata: Metadata = \{.*?\n\};\n)', re.DOTALL
    )
    m = meta_pattern.search(text)
    if not m:
        return f"  ERROR: metadata block not found in {slug}"
    text = text[:m.end()] + "\n" + citation_jsonld + text[m.end():]

    # 3. Wrap the return in a fragment and render <JsonLd> + <Citations>.
    open_pattern = re.compile(
        r'(export default function Page\(\) \{\n  return \(\n)(    <LandingPage)'
    )
    m = open_pattern.search(text)
    if not m:
        return f"  ERROR: return/LandingPage open not found in {slug}"
    text = (
        text[:m.end(1)]
        + "    <>\n"
        + "      <JsonLd data={citationJsonLd} />\n"
        + text[m.start(2):]
    )

    # Find the closing "    />\n  );" of the LandingPage call.
    close_pattern = re.compile(r'(    />\n)(  \);\n)')
    m2 = close_pattern.search(text)
    if not m2:
        return f"  ERROR: LandingPage close not found in {slug}"
    citations_block = build_landing_citations_block(slug)
    text = (
        text[:m2.end(1)]
        + "\n"
        + citations_block
        + "\n    </>\n"
        + text[m2.start(2):]
    )

    if text != original:
        page_path.write_text(text, encoding="utf-8")
        return f"  OK (LandingPage): {slug} ({len(CITATIONS[slug])} citations)"
    return f"  NO-CHANGE: {slug}"


def main():
    results = []
    for slug in CITATIONS:
        page_path = APP / slug / "page.tsx"
        if not page_path.exists():
            results.append(f"  MISSING: {slug}")
            continue
        if slug in LANDING_PAGE_SLUGS:
            results.append(process_landing_page(slug))
        else:
            results.append(process_pageshell_page(slug))
    print("\n".join(results))


if __name__ == "__main__":
    main()
