#!/usr/bin/env python3
"""Count words and verify metadata constraints for the 3 new SEO pages."""
import re

PAGES = [
    ("/home/z/my-project/src/app/change-video-to-audio/page.tsx",
     "Change Video to Audio — Free Online Converter (No Install)",
     "Change video to audio free online. Convert MP4, MOV, MKV to MP3 in your browser — no install, no upload, no sign-up. Works on iPhone, Android, Mac, Windows."),
    ("/home/z/my-project/src/app/video-into-audio/page.tsx",
     "Turn Video Into Audio — Extract MP3 From Any Video",
     "Turn video into audio instantly. Extract MP3 from MP4, MOV, MKV, AVI, WebM in your browser — no upload, no install, no sign-up. Free and private on any device."),
    ("/home/z/my-project/src/app/mp4-mp3/page.tsx",
     "MP4 to MP3 — Convert MP4 to MP3 Free Online",
     "Convert MP4 to MP3 free online. Browser-based, no upload, no install. Choose 128, 192, or 320 kbps. Your file never leaves your device. Fast and private."),
]

def strip_jsx_markup(s):
    """Remove JSX tags and HTML entities to count only rendered text words."""
    # remove JSX tags
    s = re.sub(r"<[^>]+>", " ", s)
    # decode common HTML entities
    s = (s.replace("&quot;", '"')
           .replace("&apos;", "'")
           .replace("&amp;", "&")
           .replace("&lt;", "<")
           .replace("&gt;", ">")
           .replace("&nbsp;", " "))
    return s

def extract_body_content(src):
    """Grab text inside <PageShell> ... </PageShell> (the visible article body)."""
    m = re.search(r"<PageShell\b.*?>(.*?)</PageShell>", src, re.DOTALL)
    if not m:
        return ""
    body = m.group(1)
    # drop the CTA section's button text duplication is fine; just strip markup
    text = strip_jsx_markup(body)
    # collapse whitespace
    text = re.sub(r"\s+", " ", text).strip()
    return text

print(f"{'PAGE':<45} {'TITLE':>6} {'DESC':>5} {'WORDS':>6}  BRAND")
print("-" * 80)
for path, title, desc in PAGES:
    with open(path, encoding="utf-8") as f:
        src = f.read()
    body = extract_body_content(src)
    words = body.split()
    wc = len(words)
    # count brand mentions in full source (visible text)
    visible = strip_jsx_markup(src)
    visible = re.sub(r"\s+", " ", visible)
    brand = len(re.findall(r"MP4toMP3\.online", visible))
    # count internal links
    links = re.findall(r'href="/([^"#][^"]*)"', src)
    # canonical
    canon = re.search(r'canonical:\s*"([^"]+)"', src)
    print(f"{path.split('/')[-2]:<45} {len(title):>6} {len(desc):>5} {wc:>6}  brand={brand} links={len(set(links))} canon={canon.group(1) if canon else None}")
    assert 800 <= wc <= 1500, f"WORD COUNT OUT OF RANGE for {path}: {wc}"
    assert brand >= 1, f"NO BRAND MENTION in {path}"
    assert 2 <= len(set(links)) <= 5, f"LINK COUNT OFF in {path}: {len(set(links))}"
print("\nAll assertions passed: 800-1500 words, brand mentioned, links present.")
