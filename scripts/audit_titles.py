#!/usr/bin/env python3
"""Audit SEO titles and meta descriptions for CTR optimization.
Reports pages with titles outside 50-60 char range or descriptions
outside 120-160 char range — these are the CTR killers in SERPs.
"""
import os
import re
import glob

APP_DIR = "src/app"
results = []

for path in sorted(glob.glob(f"{APP_DIR}/**/page.tsx", recursive=True)):
    if "/api/" in path or "sitemap.ts" in path:
        continue
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    slug = os.path.relpath(os.path.dirname(path), APP_DIR)
    if slug == ".":
        slug = "(homepage)"

    # Real metadata.title — the first title: after "export const metadata"
    meta_match = re.search(r'export const metadata[^{]*\{[^}]*title:\s*"([^"]+)"', content, re.DOTALL)
    if not meta_match:
        # try single-line
        meta_match = re.search(r'export const metadata[^{]*\{[^}]*title:\s*"([^"]+)"', content)
    title = meta_match.group(1) if meta_match else ""

    # Real metadata.description
    desc_match = re.search(r'description:\s*"([^"]+)"', content)
    if not desc_match:
        desc_match = re.search(r'description:\s*\n\s*"([^"]+)"', content)
    description = desc_match.group(1) if desc_match else ""

    # Check for power words / CTR boosters in title
    power_words = ["best", "free", "fast", "easy", "how to", "guide", "2026", "complete", "ultimate", "without", "no "]
    has_power = any(pw in title.lower() for pw in power_words)

    # Check if title has the primary keyword pattern (mp4 to mp3)
    has_keyword = "mp4 to mp3" in title.lower() or "mp3" in title.lower() or "audio" in title.lower()

    title_len = len(title)
    desc_len = len(description)

    issues = []
    if title_len > 60:
        issues.append(f"TITLE_TOO_LONG({title_len})")
    elif title_len < 50 and slug not in ["contact", "privacy", "terms", "copyright", "about"]:
        issues.append(f"TITLE_TOO_SHORT({title_len})")
    if desc_len > 160:
        issues.append(f"DESC_TOO_LONG({desc_len})")
    elif desc_len < 120 and slug not in ["contact", "privacy", "terms", "copyright", "about"]:
        issues.append(f"DESC_TOO_SHORT({desc_len})")
    if not has_keyword and slug not in ["contact", "privacy", "terms", "copyright", "about"]:
        issues.append("NO_KEYWORD_IN_TITLE")
    if not has_power and slug not in ["contact", "privacy", "terms", "copyright", "about"]:
        issues.append("NO_POWER_WORD")

    results.append({
        "slug": slug,
        "title": title,
        "title_len": title_len,
        "desc_len": desc_len,
        "issues": issues,
        "has_keyword": has_keyword,
        "has_power": has_power,
    })

# Report
problem_pages = [r for r in results if r["issues"]]
print(f"=== TOTAL PAGES: {len(results)} ===")
print(f"=== PAGES WITH ISSUES: {len(problem_pages)} ===\n")

if problem_pages:
    print("--- Pages needing CTR fixes ---\n")
    for r in problem_pages[:40]:
        print(f"[{r['slug']}]")
        print(f"  Title ({r['title_len']}c): {r['title']}")
        print(f"  Desc:   ({r['desc_len']}c)")
        print(f"  Issues: {', '.join(r['issues'])}")
        print()

# Summary stats
too_long = sum(1 for r in results if any("TOO_LONG" in i for i in r["issues"]))
too_short = sum(1 for r in results if any("TOO_SHORT" in i for i in r["issues"]))
no_kw = sum(1 for r in results if "NO_KEYWORD_IN_TITLE" in r["issues"])
no_power = sum(1 for r in results if "NO_POWER_WORD" in r["issues"])
print("--- Summary ---")
print(f"Title too long (>60c): {too_long}")
print(f"Title too short (<50c): {too_short}")
print(f"No keyword in title: {no_kw}")
print(f"No power word: {no_power}")
