#!/usr/bin/env python3
"""
Add Citations component + Article JSON-LD `citation` field to 30 SEO pages.

For each slug:
  1. Insert `import { Citations, type Citation } from "@/components/citations";`
     after the QuickAnswer import.
  2. Insert a `<Citations sources={[...]} />` block immediately before the
     bottom CTA `<section className="rounded-2xl border border-primary/30 ...">`.
  3. Add a `citation: [...]` array of URLs to the page's Article JSON-LD
     (right after `dateModified: "2026-11-16",` or, for mp4-vs-mp3 which
     lacks it, after `mainEntityOfPage: ...`).
"""
import json
import re
import sys
from pathlib import Path

APP = Path("/home/z/my-project/src/app")

# Citation sources per slug. Each entry: (title, url, publisher, note).
# All URLs are from the verified canonical list in the task spec.
CITATIONS = {
    "what-is-mp4": [
        ("MP4 — Wikipedia", "https://en.wikipedia.org/wiki/MPEG-4", "Wikipedia",
         "History and structure of the MPEG-4 Part 14 container."),
        ("MPEG-4 Part 14 file format — ISO", "https://www.iso.org/standard/53943.html",
         "ISO", "Official ISO/IEC 14496-14:2003 specification for the MP4 file format."),
        ("Container formats — MDN", "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Containers",
         "Mozilla MDN", "How containers like MP4 bundle video, audio, subtitles and metadata."),
        ("H.264/MPEG-4 AVC — Wikipedia", "https://en.wikipedia.org/wiki/H.264/MPEG-4_AVC",
         "Wikipedia", "The default video codec carried inside most MP4 files."),
    ],
    "what-is-mp3": [
        ("MP3 — Wikipedia", "https://en.wikipedia.org/wiki/MP3", "Wikipedia",
         "MPEG-1 Audio Layer III format history and psychoacoustic compression model."),
        ("MPEG-1 Audio Layer III — ISO", "https://www.iso.org/standard/22413.html",
         "ISO", "Official ISO/IEC 11172-3:1993 specification for MPEG-1 audio, including Layer III."),
        ("ID3 metadata tags — Wikipedia", "https://en.wikipedia.org/wiki/ID3",
         "Wikipedia", "The ID3 tag standard used to embed title, artist and album in MP3 files."),
        ("Audio codecs — MDN", "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs",
         "Mozilla MDN", "Browser support and codec characteristics for MP3 and related audio formats."),
    ],
    "what-is-ffmpeg": [
        ("FFmpeg — Wikipedia", "https://en.wikipedia.org/wiki/FFmpeg", "Wikipedia",
         "Overview of the FFmpeg project and its role in media processing."),
        ("FFmpeg documentation", "https://ffmpeg.org/ffmpeg.html", "FFmpeg",
         "Official FFmpeg command-line reference, including audio extraction and encoding."),
        ("FFmpeg codecs documentation", "https://ffmpeg.org/ffmpeg-codecs.html", "FFmpeg",
         "Reference for the libmp3lame encoder and supported audio codecs."),
        ("ffmpeg.wasm — GitHub", "https://github.com/ffmpegwasm/ffmpeg.wasm",
         "GitHub", "WebAssembly port of FFmpeg used by browser-based converters."),
    ],
    "audio-codecs-explained": [
        ("Audio codecs — MDN", "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs",
         "Mozilla MDN", "Browser support, bitrate ranges and codec characteristics for MP3, AAC, Opus and Vorbis."),
        ("Advanced Audio Coding — Wikipedia", "https://en.wikipedia.org/wiki/Advanced_Audio_Coding",
         "Wikipedia", "AAC codec spec, the default audio codec inside MP4 containers."),
        ("Opus audio format — Wikipedia", "https://en.wikipedia.org/wiki/Opus_(audio_format)",
         "Wikipedia", "Modern open royalty-free audio codec for comparison."),
        ("Vorbis — Wikipedia", "https://en.wikipedia.org/wiki/Vorbis", "Wikipedia",
         "Open lossy audio codec used in OGG containers, for comparison with MP3/AAC."),
        ("LAME MP3 encoder — Wikipedia", "https://en.wikipedia.org/wiki/LAME",
         "Wikipedia", "The reference open-source MP3 encoder used by FFmpeg."),
    ],
    "video-codecs-explained": [
        ("Video codecs — MDN", "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Video_codecs",
         "Mozilla MDN", "Browser support and characteristics for H.264, H.265, VP9 and AV1."),
        ("H.264/MPEG-4 AVC — Wikipedia", "https://en.wikipedia.org/wiki/H.264/MPEG-4_AVC",
         "Wikipedia", "The dominant video codec inside MP4 files."),
        ("H.265/HEVC — Wikipedia", "https://en.wikipedia.org/wiki/H.265", "Wikipedia",
         "Newer High Efficiency Video Coding standard, the successor to H.264."),
        ("FFmpeg codecs documentation", "https://ffmpeg.org/ffmpeg-codecs.html", "FFmpeg",
         "Reference for video decoders and encoders supported by FFmpeg."),
    ],
    "container-formats-explained": [
        ("Container formats — MDN", "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Containers",
         "Mozilla MDN", "How MP4, WebM, MKV and other containers bundle media streams."),
        ("Comparison of video container formats — Wikipedia",
         "https://en.wikipedia.org/wiki/Comparison_of_video_container_formats", "Wikipedia",
         "Side-by-side comparison of container features and supported codecs."),
        ("Container format (digital) — Wikipedia",
         "https://en.wikipedia.org/wiki/Container_format_(digital)", "Wikipedia",
         "General definition and history of multimedia container formats."),
        ("MPEG-4 Part 14 file format — ISO", "https://www.iso.org/standard/53943.html",
         "ISO", "Official ISO/IEC 14496-14:2003 specification for the MP4 container."),
    ],
    "lossy-vs-lossless": [
        ("Lossy compression — Wikipedia", "https://en.wikipedia.org/wiki/Lossy_compression",
         "Wikipedia", "How lossy codecs like MP3 and AAC discard data to reduce file size."),
        ("Lossless compression — Wikipedia", "https://en.wikipedia.org/wiki/Lossless_compression",
         "Wikipedia", "How lossless codecs like FLAC preserve every sample exactly."),
        ("FLAC — Wikipedia", "https://en.wikipedia.org/wiki/FLAC", "Wikipedia",
         "Free Lossless Audio Codec, the reference lossless format."),
        ("Audio codecs — MDN", "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs",
         "Mozilla MDN", "Browser support and trade-offs across lossy and lossless audio codecs."),
    ],
    "audio-compression-explained": [
        ("Psychoacoustics — Wikipedia", "https://en.wikipedia.org/wiki/Psychoacoustics",
         "Wikipedia", "The perceptual model that lets MP3 and AAC discard inaudible sound."),
        ("Lossy compression — Wikipedia", "https://en.wikipedia.org/wiki/Lossy_compression",
         "Wikipedia", "Transform coding and quantisation as used by modern audio codecs."),
        ("MP3 — Wikipedia", "https://en.wikipedia.org/wiki/MP3", "Wikipedia",
         "MPEG-1 Audio Layer III as the canonical example of psychoacoustic compression."),
        ("LAME MP3 encoder — Wikipedia", "https://en.wikipedia.org/wiki/LAME",
         "Wikipedia", "The reference encoder implementation of the MP3 psychoacoustic model."),
    ],
    "bitrate-explained": [
        ("Bit rate — Wikipedia", "https://en.wikipedia.org/wiki/Bit_rate", "Wikipedia",
         "Definition of bit rate and how it relates to audio file size and quality."),
        ("MP3 — Wikipedia", "https://en.wikipedia.org/wiki/MP3", "Wikipedia",
         "Common MP3 bitrate tiers (128, 192, 320 kbps) and their quality implications."),
        ("LAME recommended settings — Hydrogenaudio",
         "https://wiki.hydrogenaud.io/index.php?title=LAME", "Hydrogenaudio Wiki",
         "Community-verified recommended LAME bitrate and VBR settings."),
        ("Audio codecs — MDN", "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs",
         "Mozilla MDN", "Typical bitrate ranges for MP3 and other web audio codecs."),
    ],
    "mp4-to-mp3-vbr-vs-cbr": [
        ("LAME recommended settings — Hydrogenaudio",
         "https://wiki.hydrogenaud.io/index.php?title=LAME", "Hydrogenaudio Wiki",
         "Reference comparison of VBR and CBR modes for the LAME MP3 encoder."),
        ("MP3 — Wikipedia", "https://en.wikipedia.org/wiki/MP3", "Wikipedia",
         "Variable and constant bitrate modes in the MP3 specification."),
        ("FFmpeg codecs documentation", "https://ffmpeg.org/ffmpeg-codecs.html", "FFmpeg",
         "libmp3lame VBR and CBR flags (-qscale, -b:a) used during conversion."),
    ],
    "mp4-to-mp3-sample-rate": [
        ("Audio codecs — MDN", "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs",
         "Mozilla MDN", "Common sample rates (44.1 kHz, 48 kHz) and their use in web audio."),
        ("MP3 — Wikipedia", "https://en.wikipedia.org/wiki/MP3", "Wikipedia",
         "MPEG-1 Layer III sample-rate tables and the Nyquist limit on MP3 audio."),
        ("FFmpeg codecs documentation", "https://ffmpeg.org/ffmpeg-codecs.html", "FFmpeg",
         "The -ar flag for setting output sample rate in libmp3lame."),
    ],
    "mp4-to-mp3-stereo-vs-mono": [
        ("MP3 — Wikipedia", "https://en.wikipedia.org/wiki/MP3", "Wikipedia",
         "Joint stereo mode and how MP3 encodes mono versus stereo channels."),
        ("Audio codecs — MDN", "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs",
         "Mozilla MDN", "Channel layout handling for MP3 and other web audio codecs."),
        ("LAME recommended settings — Hydrogenaudio",
         "https://wiki.hydrogenaud.io/index.php?title=LAME", "Hydrogenaudio Wiki",
         "Recommended joint-stereo and mono settings for the LAME encoder."),
    ],
    "mp4-vs-mp3": [
        ("MP4 — Wikipedia", "https://en.wikipedia.org/wiki/MPEG-4", "Wikipedia",
         "Definition of the MP4 multimedia container that holds video and audio."),
        ("MP3 — Wikipedia", "https://en.wikipedia.org/wiki/MP3", "Wikipedia",
         "Definition of the MP3 audio-only format produced by extraction."),
        ("Container formats — MDN", "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Containers",
         "Mozilla MDN", "Why MP4 is a container while MP3 is an audio stream codec."),
    ],
    "mp4-to-mp3-320kbps": [
        ("MP3 — Wikipedia", "https://en.wikipedia.org/wiki/MP3", "Wikipedia",
         "The 320 kbps ceiling of the MP3 format and its transparency threshold."),
        ("LAME recommended settings — Hydrogenaudio",
         "https://wiki.hydrogenaud.io/index.php?title=LAME", "Hydrogenaudio Wiki",
         "Community-verified guidance on when 320 kbps CBR is justified."),
        ("FFmpeg codecs documentation", "https://ffmpeg.org/ffmpeg-codecs.html", "FFmpeg",
         "Setting -b:a 320k with the libmp3lame encoder."),
    ],
    "mp4-to-mp3-192kbps": [
        ("MP3 — Wikipedia", "https://en.wikipedia.org/wiki/MP3", "Wikipedia",
         "Typical MP3 bitrate tiers, including the 192 kbps middle ground."),
        ("LAME recommended settings — Hydrogenaudio",
         "https://wiki.hydrogenaud.io/index.php?title=LAME", "Hydrogenaudio Wiki",
         "Recommended VBR/CRB settings around the 190 kbps transparency point."),
        ("FFmpeg codecs documentation", "https://ffmpeg.org/ffmpeg-codecs.html", "FFmpeg",
         "Setting -b:a 192k with the libmp3lame encoder."),
    ],
    "mp4-to-mp3-128kbps": [
        ("MP3 — Wikipedia", "https://en.wikipedia.org/wiki/MP3", "Wikipedia",
         "The 128 kbps bitrate commonly used for spoken-word and streaming MP3."),
        ("Audio codecs — MDN", "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs",
         "Mozilla MDN", "Bitrate guidelines for speech versus music across web codecs."),
        ("FFmpeg codecs documentation", "https://ffmpeg.org/ffmpeg-codecs.html", "FFmpeg",
         "Setting -b:a 128k with the libmp3lame encoder."),
    ],
    "mp4-to-mp3-without-quality-loss": [
        ("Lossy compression — Wikipedia", "https://en.wikipedia.org/wiki/Lossy_compression",
         "Wikipedia", "Why MP3 conversion is inherently lossy compared to the source."),
        ("FLAC — Wikipedia", "https://en.wikipedia.org/wiki/FLAC", "Wikipedia",
         "The lossless alternative when true zero-loss audio extraction is required."),
        ("FFmpeg codecs documentation", "https://ffmpeg.org/ffmpeg-codecs.html", "FFmpeg",
         "Codec options that minimise generational loss during MP4 audio extraction."),
    ],
    "mp4-to-mp3-high-quality": [
        ("MP3 — Wikipedia", "https://en.wikipedia.org/wiki/MP3", "Wikipedia",
         "High-quality MP3 bitrate recommendations and the transparency threshold."),
        ("LAME recommended settings — Hydrogenaudio",
         "https://wiki.hydrogenaud.io/index.php?title=LAME", "Hydrogenaudio Wiki",
         "Community-verified high-quality LAME settings (V0/V2 and 320 kbps CBR)."),
        ("FFmpeg codecs documentation", "https://ffmpeg.org/ffmpeg-codecs.html", "FFmpeg",
         "libmp3lame flags for high-quality MP3 encoding."),
    ],
    "mp4-to-mp3-best-quality": [
        ("MP3 — Wikipedia", "https://en.wikipedia.org/wiki/MP3", "Wikipedia",
         "The 320 kbps maximum bitrate and when it represents best quality for MP3."),
        ("LAME recommended settings — Hydrogenaudio",
         "https://wiki.hydrogenaud.io/index.php?title=LAME", "Hydrogenaudio Wiki",
         "Best-quality LAME presets (insane and extreme) verified by listening tests."),
        ("Psychoacoustics — Wikipedia", "https://en.wikipedia.org/wiki/Psychoacoustics",
         "Wikipedia", "Why above 320 kbps MP3 offers no further audible improvement."),
    ],
    "mp4-to-mp3-hd-audio": [
        ("Advanced Audio Coding — Wikipedia", "https://en.wikipedia.org/wiki/Advanced_Audio_Coding",
         "Wikipedia", "AAC as the typical high-definition audio source inside MP4 files."),
        ("FLAC — Wikipedia", "https://en.wikipedia.org/wiki/FLAC", "Wikipedia",
         "FLAC as the lossless HD audio reference, beyond what MP3 can represent."),
        ("Audio codecs — MDN", "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs",
         "Mozilla MDN", "Sample rates and bit depths across HD-capable audio codecs."),
    ],
    "is-mp4-to-mp3-conversion-legal": [
        ("U.S. Copyright Office", "https://www.copyright.gov/", "U.S. Copyright Office",
         "Official U.S. government authority on copyright law and personal copying."),
        ("Fair use — Wikipedia", "https://en.wikipedia.org/wiki/Fair_use", "Wikipedia",
         "The four-factor fair use test applied to format conversion."),
        ("Fair use index — U.S. Copyright Office", "https://www.copyright.gov/fair-use/",
         "U.S. Copyright Office", "Official fair-use guidance from the U.S. Copyright Office."),
    ],
    "mp4-to-mp3-fair-use": [
        ("Fair use — Wikipedia", "https://en.wikipedia.org/wiki/Fair_use", "Wikipedia",
         "The four fair-use factors: purpose, nature, amount and market effect."),
        ("Fair use index — U.S. Copyright Office", "https://www.copyright.gov/fair-use/",
         "U.S. Copyright Office", "Official guidance on fair use from the U.S. Copyright Office."),
        ("U.S. Copyright Office", "https://www.copyright.gov/", "U.S. Copyright Office",
         "Primary U.S. authority for personal-copying and format-shifting rules."),
    ],
    "mp4-to-mp3-personal-use": [
        ("U.S. Copyright Office", "https://www.copyright.gov/", "U.S. Copyright Office",
         "Official authority on personal copying of lawfully acquired media."),
        ("Fair use — Wikipedia", "https://en.wikipedia.org/wiki/Fair_use", "Wikipedia",
         "How personal, non-commercial use interacts with the fair-use doctrine."),
        ("Fair use index — U.S. Copyright Office", "https://www.copyright.gov/fair-use/",
         "U.S. Copyright Office", "Official fair-use guidance relevant to personal format-shifting."),
    ],
    "mp4-to-mp3-private": [
        ("FFmpeg — Wikipedia", "https://en.wikipedia.org/wiki/FFmpeg", "Wikipedia",
         "The open-source engine used for private, local media processing."),
        ("ffmpeg.wasm — GitHub", "https://github.com/ffmpegwasm/ffmpeg.wasm",
         "GitHub", "The WebAssembly port that lets FFmpeg run privately in the browser."),
        ("WebAssembly — Wikipedia", "https://en.wikipedia.org/wiki/WebAssembly",
         "Wikipedia", "The sandboxed execution model that keeps conversion off the server."),
    ],
    "mp4-to-mp3-no-upload": [
        ("WebAssembly — MDN", "https://developer.mozilla.org/en-US/docs/WebAssembly",
         "Mozilla MDN", "How WebAssembly runs native code, like FFmpeg, inside the browser sandbox."),
        ("ffmpeg.wasm — GitHub", "https://github.com/ffmpegwasm/ffmpeg.wasm",
         "GitHub", "The WebAssembly FFmpeg port that enables no-upload media conversion."),
        ("FFmpeg documentation", "https://ffmpeg.org/ffmpeg.html", "FFmpeg",
         "The FFmpeg pipeline that runs entirely client-side when compiled to WASM."),
    ],
    "mp4-to-mp3-gdpr": [
        ("General Data Protection Regulation (official text)",
         "https://eur-lex.europa.eu/eli/reg/2016/679/oj", "EUR-Lex",
         "The official consolidated text of Regulation (EU) 2016/679 (GDPR)."),
        ("GDPR.eu", "https://gdpr.eu/", "gdpr.eu",
         "Plain-language overview of GDPR rights and obligations for controllers and processors."),
        ("WebAssembly — Wikipedia", "https://en.wikipedia.org/wiki/WebAssembly",
         "Wikipedia", "The sandboxed runtime that keeps personal data on the user's device."),
    ],
    "mp4-to-mp3-vs-audacity": [
        ("Audacity / FFmpeg — Wikipedia", "https://en.wikipedia.org/wiki/FFmpeg",
         "Wikipedia", "FFmpeg, the codec library both Audacity and browser converters rely on."),
        ("LAME MP3 encoder — Wikipedia", "https://en.wikipedia.org/wiki/LAME",
         "Wikipedia", "The LAME library used by Audacity to export MP3."),
        ("FFmpeg codecs documentation", "https://ffmpeg.org/ffmpeg-codecs.html", "FFmpeg",
         "The libmp3lame encoder shared by both workflows."),
    ],
    "mp4-to-mp3-vs-vlc": [
        ("FFmpeg — Wikipedia", "https://en.wikipedia.org/wiki/FFmpeg", "Wikipedia",
         "FFmpeg, the media engine that powers VLC's playback and conversion."),
        ("FFmpeg documentation", "https://ffmpeg.org/ffmpeg.html", "FFmpeg",
         "The FFmpeg pipeline both VLC and browser converters are built on."),
        ("Container formats — MDN", "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Containers",
         "Mozilla MDN", "Container handling common to VLC and WebAssembly-based converters."),
    ],
    "mp4-to-mp3-vs-handbrake": [
        ("FFmpeg — Wikipedia", "https://en.wikipedia.org/wiki/FFmpeg", "Wikipedia",
         "FFmpeg, the engine HandBrake uses for transcoding alongside libavcodec."),
        ("H.264/MPEG-4 AVC — Wikipedia", "https://en.wikipedia.org/wiki/H.264/MPEG-4_AVC",
         "Wikipedia", "The video codec HandBrake targets, compared with MP3 audio output."),
        ("FFmpeg codecs documentation", "https://ffmpeg.org/ffmpeg-codecs.html", "FFmpeg",
         "The codec reference shared by HandBrake's and FFmpeg-based converters."),
    ],
    "mp4-to-mp3-common-questions": [
        ("MP3 — Wikipedia", "https://en.wikipedia.org/wiki/MP3", "Wikipedia",
         "Foundational MP3 facts referenced across the FAQ answers."),
        ("FFmpeg documentation", "https://ffmpeg.org/ffmpeg.html", "FFmpeg",
         "The FFmpeg pipeline that powers browser-based MP4 to MP3 conversion."),
        ("WebAssembly — MDN", "https://developer.mozilla.org/en-US/docs/WebAssembly",
         "Mozilla MDN", "How WebAssembly lets FFmpeg run inside the browser without uploads."),
    ],
}


def build_import_line() -> str:
    return 'import { Citations, type Citation } from "@/components/citations";'


def build_citations_block(slug: str) -> str:
    sources = CITATIONS[slug]
    lines = []
    lines.append("        <Citations")
    lines.append("          sources={[")
    for (title, url, publisher, note) in sources:
        # Use JSON to safely escape quotes/backslashes.
        title_js = json.dumps(title)
        url_js = json.dumps(url)
        publisher_js = json.dumps(publisher)
        note_js = json.dumps(note)
        lines.append(
            f"            {{ title: {title_js}, url: {url_js}, publisher: {publisher_js}, note: {note_js} }},"
        )
    lines.append("          ]}")
    lines.append("        />")
    return "\n".join(lines)


def build_jsonld_citation_field(slug: str) -> str:
    urls = [s[1] for s in CITATIONS[slug]]
    url_lines = "\n".join(f"      {json.dumps(u)}," for u in urls)
    return "    citation: [\n" + url_lines + "\n    ],"


def process_page(slug: str) -> str:
    page_path = APP / slug / "page.tsx"
    text = page_path.read_text(encoding="utf-8")
    original = text

    # 1. Add the import after the QuickAnswer import line.
    import_anchor = 'import { QuickAnswer } from "@/components/quick-answer";'
    if import_anchor not in text:
        return f"  ERROR: import anchor not found in {slug}"
    if "from \"@/components/citations\"" not in text:
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

    # 3. Add citation array to JSON-LD.
    #    Normal case: after `dateModified: "2026-11-16",` line.
    #    mp4-vs-mp3 special case: after `mainEntityOfPage: "..."` line (no date).
    citation_field = build_jsonld_citation_field(slug)
    if "citation:" not in text:
        if "dateModified: \"2026-11-16\"," in text:
            # Insert right after the dateModified line.
            pattern = re.compile(r'(    dateModified: "2026-11-16",\n)')
            text, n = pattern.subn(
                lambda m: m.group(1) + citation_field + "\n", text, count=1
            )
            if n == 0:
                return f"  ERROR: dateModified sub failed for {slug}"
        else:
            # mp4-vs-mp3 fallback: no dateModified, but has mainEntityOfPage.
            # FAQ page (mp4-to-mp3-common-questions): faqJsonLd has neither.
            if 'mainEntityOfPage: "https://www.mp4tomp3.online/' in text:
                pattern = re.compile(
                    r'(    mainEntityOfPage: "https://www\.mp4tomp3\.online/[^"]+",\n)'
                )
                text, n = pattern.subn(
                    lambda m: m.group(1) + citation_field + "\n", text, count=1
                )
                if n == 0:
                    return f"  ERROR: mainEntityOfPage fallback failed for {slug}"
            else:
                # FAQ page: insert after the mainEntity closing `})),` line.
                pattern = re.compile(r'(    mainEntity: faqItems\.map\(\(item\) => \(\{\n      "@type": "Question",\n      name: item\.q,\n      acceptedAnswer: \{ "@type": "Answer", text: item\.a \},\n    \}\)\),\n)')
                text, n = pattern.subn(
                    lambda m: m.group(1) + citation_field + "\n", text, count=1
                )
                if n == 0:
                    return f"  ERROR: faqJsonLd fallback failed for {slug}"

    if text != original:
        page_path.write_text(text, encoding="utf-8")
        return f"  OK: {slug} ({len(CITATIONS[slug])} citations)"
    return f"  NO-CHANGE: {slug}"


def main():
    expected = 30
    slugs = list(CITATIONS.keys())
    if len(slugs) != expected:
        print(f"WARNING: expected {expected} slugs, got {len(slugs)}", file=sys.stderr)
    results = []
    for slug in slugs:
        results.append(process_page(slug))
    print("\n".join(results))


if __name__ == "__main__":
    main()
