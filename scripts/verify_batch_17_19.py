#!/usr/bin/env python3
"""Verify the 9 new SEO pages against the spec:
   - title 50-60 chars, description 120-160 chars
   - canonical present
   - JSON-LD datePublished / dateModified = 2026-11-16
   - MP4toMP3.online mentioned at least once
   - 2+ internal links
   - body word count 800-1500
"""
import re
from pathlib import Path

PAGES = [
    "mp4-to-mp3-no-software",
    "mp4-to-mp3-no-signup",
    "mp4-to-mp3-no-watermark",
    "mp4-to-mp3-batch",
    "mp4-to-mp3-multiple-files",
    "mp4-to-mp3-quickly",
    "mp4-to-mp3-from-google-drive",
    "mp4-to-mp3-from-dropbox",
    "mp4-to-mp3-from-url",
]

BASE = Path("/home/z/my-project/src/app")

# Code tokens to drop from word count (className values, JSX tag names, etc.)
CODE_TOKENS = {
    "PageShell","JsonLd","QuickAnswer","FileAudio","Link","Metadata","React","Component",
    "true","false","null","undefined",
    "className","href","title","subtitle","label",
    # lucide-react icon names
    "Check","Zap","ShieldCheck","Globe","Clock","Smartphone","Wifi","HardDrive","CloudOff",
    "Cpu","Layers","ListChecks","Repeat","AlertTriangle","MonitorSmartphone","AppWindow",
    "KeyRound","Lock","Mail","UserX","Volume2","Scissors","Music","Eye","Terminal","Scale",
    "Files","FolderOpen","Download","MousePointerClick","Gauge","Rocket","Cloud","Link2",
    "ExternalLink","XCircle",
    # tailwind tokens
    "rounded","border","bg","text","primary","muted","foreground","secondary","accent",
    "shadow","transition","hover","opacity","flex","items","justify","gap","px","py","mt",
    "mb","ml","mr","pt","pb","pl","pr","h","w","sm","lg","xl","md","inline","block","font",
    "bold","semibold","extrabold","tracking","tight","leading","relaxed","base","center",
    "left","right","start","end","self","full","circle","md","grid","cols","space","y","x",
    "uppercase","lowercase","capitalize","normal","case","underline","offset","hover",
    "dark","border","primary","secondary","muted","accent","destructive","input","ring",
    "card","popover","max","min","w","h","overflow","hidden","visible","scroll","auto",
    "relative","absolute","fixed","sticky","top","bottom","left","right","z","index",
}

def strip_jsx(text: str) -> str:
    text = re.sub(r'\{/\*.*?\*/\}', ' ', text, flags=re.DOTALL)
    text = re.sub(r'<[^>]+>', ' ', text)
    text = re.sub(r'\{[^{}]*\}', ' ', text)
    text = (text.replace('&quot;', '"')
                .replace('&apos;', "'")
                .replace('&amp;', '&')
                .replace('&lt;', '<')
                .replace('&gt;', '>'))
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def count_visible_words(text: str) -> int:
    # sequences of letters/digits with apostrophes/hyphens
    raw = re.findall(r"[A-Za-z][A-Za-z0-9'\-]*", text)
    visible = [w for w in raw if w not in CODE_TOKENS and not w.isdigit()]
    return len(visible)

def extract_metadata_block(src: str) -> str:
    m = re.search(r'export\s+const\s+metadata[^=]*=\s*\{(.*?)\};', src, flags=re.DOTALL)
    return m.group(1) if m else ""

def extract_title(meta: str) -> str:
    m = re.search(r'title:\s*"([^"]+)"', meta)
    return m.group(1) if m else ""

def extract_description(meta: str) -> str:
    # description may be a multi-line concatenation of string literals
    m = re.search(r'description:\s*((?:\s*"[^"]*"\s*)+)', meta, flags=re.DOTALL)
    if not m:
        return ""
    parts = re.findall(r'"([^"]*)"', m.group(1))
    return "".join(parts)

def extract_canonical(meta: str) -> str:
    m = re.search(r'canonical:\s*"([^"]+)"', meta)
    return m.group(1) if m else ""

def find_jsonld_dates(src: str):
    pub = re.search(r'datePublished:\s*"([^"]+)"', src)
    mod = re.search(r'dateModified:\s*"([^"]+)"', src)
    return (pub.group(1) if pub else "", mod.group(1) if mod else "")

def find_brand_mentions(src: str) -> int:
    return src.count("MP4toMP3.online")

def find_internal_links(src: str):
    return sorted(set(re.findall(r'href="(/[^"#]*)(?:#[^"]*)?"', src)))

def find_quickanswer(src: str) -> str:
    m = re.search(r'<QuickAnswer>(.*?)</QuickAnswer>', src, flags=re.DOTALL)
    return strip_jsx(m.group(1)) if m else ""

print(f"{'SLUG':<32} {'ttl':>4} {'desc':>4} {'words':>5} {'brand':>5} {'links':>5}  dates")
print("-" * 110)
all_ok = True
for slug in PAGES:
    path = BASE / slug / "page.tsx"
    src = path.read_text()
    meta = extract_metadata_block(src)
    title = extract_title(meta)
    desc = extract_description(meta)
    canon = extract_canonical(meta)
    body = strip_jsx(src)
    words = count_visible_words(body)
    brand = find_brand_mentions(src)
    links = find_internal_links(src)
    pub, mod = find_jsonld_dates(src)
    print(f"{slug:<32} {len(title):>4} {len(desc):>4} {words:>5} {brand:>5} {len(links):>5}  {pub}/{mod}")
    print(f"  title: {title}")
    print(f"  desc:  {desc}")
    print(f"  canon: {canon}   links: {links}")
    issues = []
    if not (50 <= len(title) <= 60): issues.append(f"title {len(title)}")
    if not (120 <= len(desc) <= 160): issues.append(f"desc {len(desc)}")
    if not (800 <= words <= 1500): issues.append(f"words {words}")
    if brand < 1: issues.append("no brand mention")
    if len(links) < 2: issues.append(f"only {len(links)} links")
    if pub != "2026-11-16" or mod != "2026-11-16": issues.append(f"dates {pub}/{mod}")
    if issues:
        print(f"  ISSUES: {issues}")
        all_ok = False
    print()

print("=" * 110)
print("ALL CHECKS PASSED" if all_ok else "SOME CHECKS FAILED — see ISSUES above")
