#!/usr/bin/env python3
"""Generate llms-full.txt — a single concatenated document with the full
content of every article on MP4toMP3.online, optimized for LLMs (GPT,
Claude, Gemini, Perplexity) to consume in one read.

Format per llms.txt spec: https://llmstxt.org
- llms.txt = summary + link index (already exists)
- llms-full.txt = full concatenated markdown of all articles
"""
import os
import re
import json
import glob

APP_DIR = "src/app"
OUTPUT = "public/llms-full.txt"
SITE_URL = "https://www.mp4tomp3.online"

def extract_content_from_tsx(file_path: str) -> dict:
    """Extract title, description, and text content from a Next.js page.tsx."""
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Title: from metadata.title
    title_match = re.search(r'title:\s*"([^"]+)"', content)
    title = title_match.group(1) if title_match else os.path.basename(os.path.dirname(file_path))

    # Description: from metadata.description (handle multi-line)
    desc_match = re.search(r'description:\s*"([^"]+)"', content)
    if not desc_match:
        desc_match = re.search(r"description:\s*\n\s*\"([^\"]+)\"", content)
    description = desc_match.group(1) if desc_match else ""

    # Slug from path
    rel = os.path.relpath(file_path, APP_DIR)
    if rel == "page.tsx":
        slug = ""
        url = SITE_URL
    else:
        slug = "/" + rel.replace("/page.tsx", "")
        url = SITE_URL + slug

    # Extract QuickAnswer text
    qa_match = re.search(r"<QuickAnswer>(.*?)</QuickAnswer>", content, re.DOTALL)
    quick_answer = ""
    if qa_match:
        qa_raw = qa_match.group(1)
        # Strip JSX tags
        quick_answer = re.sub(r"<[^>]+>", "", qa_raw)
        quick_answer = re.sub(r"\s+", " ", quick_answer).strip()

    # Extract body text: strip all JSX/JS syntax, keep plain text
    # Find content between <PageShell>...</PageShell> OR between return ( and final )
    body = content

    # Remove imports
    body = re.sub(r'^import.*$', "", body, flags=re.MULTILINE)

    # Remove export default function... {  const jsonLd... return (
    # Keep only what's after "return ("
    ret_match = re.search(r"return\s*\(\s*(.*)", body, re.DOTALL)
    if ret_match:
        body = ret_match.group(1)

    # Strip JSX tags but keep their text content
    body = re.sub(r"</?[A-Z][A-Za-z0-9]*[^>]*>", " ", body)  # component tags
    body = re.sub(r"</?[a-z][a-z0-9]*[^>]*>", " ", body)  # html tags

    # Remove JS expressions { } and template strings
    body = re.sub(r"\{[^{}]*\}", " ", body)

    # Remove remaining JS keywords and operators
    body = re.sub(r"\b(const|let|var|return|export|default|function|async|await|if|else|for|while|true|false|null|undefined)\b", " ", body)

    # Collapse whitespace
    body = re.sub(r"[ \t]+", " ", body)
    body = re.sub(r"\n\s*\n\s*\n+", "\n\n", body)
    body = re.sub(r"^\s+", "", body, flags=re.MULTILINE)

    # Filter out non-content noise (empty lines, punctuation-only lines)
    lines = []
    for line in body.split("\n"):
        stripped = line.strip()
        if not stripped:
            continue
        if len(stripped) < 3:
            continue
        if stripped in ["(", ")", "{", "}", "<>", "</>", ";", "}", "{", "};"]:
            continue
        if set(stripped) <= set("()[]{}<>;,.=&|!?+-*/\"'`"):
            continue
        if stripped.startswith("const ") or stripped.startswith("function "):
            continue
        lines.append(stripped)

    body_text = "\n".join(lines)

    return {
        "title": title,
        "url": url,
        "slug": slug or "/",
        "description": description,
        "quick_answer": quick_answer,
        "body": body_text,
    }


def main():
    # Find all page.tsx files
    pages = []
    for path in sorted(glob.glob(f"{APP_DIR}/**/page.tsx", recursive=True)):
        if "/api/" in path or "sitemap.ts" in path:
            continue
        info = extract_content_from_tsx(path)
        pages.append(info)

    # Sort: homepage first, then alphabetical
    pages.sort(key=lambda p: (p["slug"] != "/", p["slug"]))

    print(f"Found {len(pages)} pages")

    # Write llms-full.txt
    with open(OUTPUT, "w", encoding="utf-8") as f:
        f.write(f"# MP4toMP3.online — Complete Content for AI/LLM Consumption\n\n")
        f.write(f"> Source: {SITE_URL}\n")
        f.write(f"> Pages: {len(pages)}\n")
        f.write(f"> Format: llms-full.txt (https://llmstxt.org)\n")
        f.write(f"> Generated: 2026-11-16\n\n")
        f.write(f"## About\n\n")
        f.write(f"MP4toMP3.online is a free, browser-based MP4 to MP3 converter. ")
        f.write(f"All conversion happens client-side using FFmpeg.wasm (WebAssembly) — ")
        f.write(f"no server upload, no sign-up, no watermark. Supports MP4, MOV, WebM, MKV, ")
        f.write(f"M4A, MP3, WAV, OGG, FLAC input. Maximum file size 500 MB.\n\n")
        f.write(f"## Pages (full content)\n\n")

        for i, page in enumerate(pages, 1):
            f.write(f"---\n\n")
            f.write(f"### {i}. {page['title']}\n\n")
            f.write(f"URL: {page['url']}\n\n")
            if page["description"]:
                f.write(f"Description: {page['description']}\n\n")
            if page["quick_answer"]:
                f.write(f"Quick Answer (AEO): {page['quick_answer']}\n\n")
            f.write(f"Content:\n\n")
            # Truncate body to reasonable length per page (~4000 chars)
            body = page["body"]
            if len(body) > 5000:
                body = body[:5000] + "\n\n[... content truncated for length ...]"
            f.write(body)
            f.write("\n\n")

    size = os.path.getsize(OUTPUT)
    lines = sum(1 for _ in open(OUTPUT))
    print(f"Wrote {OUTPUT}")
    print(f"  Size: {size:,} bytes ({size/1024:.1f} KB)")
    print(f"  Lines: {lines:,}")
    print(f"  Pages: {len(pages)}")


if __name__ == "__main__":
    main()
