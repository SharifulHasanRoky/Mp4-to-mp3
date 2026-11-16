#!/usr/bin/env python3
"""Verify the 3 new SEO pages: title/description char counts and body word counts."""
import re
from pathlib import Path

PAGES = [
    ("/home/z/my-project/src/app/get-audio-from-video/page.tsx",
     "Get Audio From Video — Free Online Audio Extractor",
     "get-audio-from-video"),
    ("/home/z/my-project/src/app/extracting-audio-from-video/page.tsx",
     "Extracting Audio From Video — Complete Guide (2026)",
     "extracting-audio-from-video"),
    ("/home/z/my-project/src/app/extract-audio-from-mp4/page.tsx",
     "Extract Audio From MP4 — Free MP4 Audio Extractor",
     "extract-audio-from-mp4"),
]

def strip_jsx(text: str) -> str:
    """Crude JSX -> plain text: remove tags, decode common entities, collapse whitespace."""
    # remove comments
    text = re.sub(r'\{/\*.*?\*/\}', ' ', text, flags=re.DOTALL)
    # remove JSX tags
    text = re.sub(r'<[^>]+>', ' ', text)
    # remove code-in-jsx expressions like {", "}
    text = re.sub(r'\{[^{}]*\}', ' ', text)
    # decode entities
    text = (text.replace('&quot;', '"')
                .replace('&apos;', "'")
                .replace('&amp;', '&')
                .replace('&lt;', '<')
                .replace('&gt;', '>')
                .replace('&mdash;', '—')
                .replace('&ndash;', '–'))
    # collapse whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def extract_metadata(src: str):
    title = re.search(r'title:\s*"([^"]+)"', src)
    desc_match = re.search(r'description:\s*\n?\s*"((?:[^"\\]|\\.)*)"', src, flags=re.DOTALL)
    # description in metadata is on one line in these files
    desc = re.search(r'description:\s*"([^"]+)"', src)
    canon = re.search(r'canonical:\s*"([^"]+)"', src)
    return (title.group(1) if title else None,
            desc.group(1) if desc else None,
            canon.group(1) if canon else None)

def count_words_in_body(text: str) -> int:
    return len(text.split())

def find_internal_links(src: str):
    return re.findall(r'href="(/[^"#]*|/)"', src)

print(f"{'PAGE':<35} {'TITLE len':<10} {'DESC len':<10} {'WORDS':<7} {'BRAND':<6} LINKS")
print("-" * 90)
for path, expected_title, slug in PAGES:
    src = Path(path).read_text()
    title, desc, canon = extract_metadata(src)
    # body word count: strip everything between PageShell open and the CTA, roughly full text
    body = strip_jsx(src)
    words = count_words_in_body(body)
    brand_count = body.count("MP4toMP3.online")
    links = sorted(set(find_internal_links(src)))
    # exclude /#extractor (the CTA) from the link list display but keep note
    title_len = len(title) if title else 0
    desc_len = len(desc) if desc else 0
    print(f"{slug:<35} {title_len:<10} {desc_len:<10} {words:<7} {brand_count:<6} {links}")
    print(f"  title:    {title}")
    print(f"  desc:     {desc}")
    print(f"  canon:    {canon}")
    print(f"  QA words: ", end="")
    qa = re.search(r'<QuickAnswer>(.*?)</QuickAnswer>', src, flags=re.DOTALL)
    if qa:
        qa_text = strip_jsx(qa.group(1))
        print(len(qa_text.split()), "->", qa_text[:120] + "...")
    print()
