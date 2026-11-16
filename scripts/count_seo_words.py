"""Count words in the body content of the three new SEO pages.

Strips JSX tags, code, and metadata to estimate the actual readable content
word count (the 800-1500 word requirement applies to the article body).
"""
import re
from pathlib import Path

PAGES = [
    "/home/z/my-project/src/app/video-into-audio-file/page.tsx",
    "/home/z/my-project/src/app/video-to-audio-file-converter/page.tsx",
    "/home/z/my-project/src/app/video-to-audio-converter-online-free/page.tsx",
]

# Brand mention check
BRAND = "MP4toMP3.online"


def extract_text(src: str) -> str:
    # Drop the import block and the metadata export (keep QuickAnswer + body)
    # Remove the `export const metadata = {...};` block (balanced braces)
    src_no_meta = re.sub(
        r"export const metadata.*?^\};",
        "",
        src,
        count=1,
        flags=re.DOTALL | re.MULTILINE,
    )
    # Drop the jsonLd object literal (balanced braces) — `const jsonLd = {...};`
    src_no_meta = re.sub(
        r"const jsonLd\s*=\s*\{.*?\n\s*\};",
        "",
        src_no_meta,
        count=1,
        flags=re.DOTALL,
    )
    # Remove import statements
    src_no_meta = re.sub(r"^import .*?;$", "", src_no_meta, flags=re.MULTILINE)
    # Remove JS string expressions {"..."} -> keep the inner text
    src_no_meta = re.sub(r'\{"([^"]*)"\}', r" \1 ", src_no_meta)
    # Remove JSX attributes (className="...") entirely
    src_no_meta = re.sub(r'\s+className="[^"]*"', "", src_no_meta)
    # Remove all remaining HTML/JSX tags
    src_no_meta = re.sub(r"<[^>]+>", " ", src_no_meta)
    # Decode common HTML entities we used
    entities = {
        "&quot;": '"',
        "&apos;": "'",
        "&amp;": "&",
        "&mdash;": "—",
        "&ndash;": "–",
    }
    for ent, ch in entities.items():
        src_no_meta = src_no_meta.replace(ent, ch)
    # Collapse whitespace
    return re.sub(r"\s+", " ", src_no_meta).strip()


for path in PAGES:
    src = Path(path).read_text()
    text = extract_text(src)
    words = text.split()
    wc = len(words)
    brand_count = src.count(BRAND)
    print(f"{path}")
    print(f"  word count: {wc}")
    print(f"  brand mentions ({BRAND}): {brand_count}")
    # Verify required structural elements
    checks = {
        'import type { Metadata }': 'import type { Metadata } from "next"' in src,
        'import Link': 'import Link from "next/link"' in src,
        'PageShell import': 'import { PageShell }' in src,
        'JsonLd import': 'import { JsonLd }' in src,
        'QuickAnswer import': 'import { QuickAnswer }' in src,
        'lucide-react import': 'from "lucide-react"' in src,
        'export const metadata': 'export const metadata' in src,
        'alternates.canonical': 'alternates: { canonical:' in src,
        'openGraph': 'openGraph:' in src,
        'JsonLd Article': '"@type": "Article"' in src,
        'datePublished 2026-11-16': 'datePublished: "2026-11-16"' in src,
        'dateModified 2026-11-16': 'dateModified: "2026-11-16"' in src,
        'author Organization': '"@type": "Organization", name: "MP4toMP3.online"' in src,
        'QuickAnswer block': '<QuickAnswer>' in src,
        'PageShell': '<PageShell' in src,
        'CTA /#extractor': 'href="/#extractor"' in src,
    }
    missing = [k for k, v in checks.items() if not v]
    print(f"  structural checks missing: {missing if missing else 'none'}")
    # Title length check
    m = re.search(r'title:\s*"([^"]+)"', src)
    if m:
        print(f"  metadata title ({len(m.group(1))} chars): {m.group(1)}")
    md = re.search(r'description:\s*\n?\s*"([^"]+)"', src)
    if md:
        print(f"  metadata description ({len(md.group(1))} chars): {md.group(1)[:80]}...")
    # Internal link count
    links = re.findall(r'href="(/[a-z0-9-]*)"', src)
    print(f"  internal links ({len(links)}): {links}")
    print()
