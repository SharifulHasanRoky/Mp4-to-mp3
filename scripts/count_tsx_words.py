#!/usr/bin/env python3
"""Count visible words in the JSX text of a .tsx page (strips tags,
JSX expressions in braces that are objects/calls, attributes, comments)."""
import re
import sys
from pathlib import Path


def visible_text(src: str) -> str:
    # strip line comments
    src = re.sub(r"//.*", "", src)
    # strip block comments
    src = re.sub(r"/\*.*?\*/", "", src, flags=re.S)
    # strip everything from the first <JsonLd .../> through the closing
    # of jsonLd object literal is messy; instead just extract text between
    # the PageShell opening tag and its closing.
    # Easier: operate on the return block only.
    m = re.search(r"return\s*\(\s*(.*?)\s*\);\s*\}\s*$", src, flags=re.S)
    block = m.group(1) if m else src
    # strip <...> tags (including self-closing and with attributes)
    block = re.sub(r"<[^>]*>", " ", block)
    # strip { ... } JSX expressions (non-greedy, including nested simple)
    # We iterate a few times to handle nesting.
    for _ in range(5):
        block = re.sub(r"\{[^{}]*\}", " ", block)
    # collapse whitespace
    block = re.sub(r"\s+", " ", block).strip()
    return block


def main() -> None:
    files = sys.argv[1:]
    total = 0
    for f in files:
        p = Path(f)
        src = p.read_text()
        text = visible_text(src)
        wc = len(text.split())
        total += wc
        print(f"{f}: {wc} words")
    if len(files) > 1:
        print(f"TOTAL: {total} words")


if __name__ == "__main__":
    main()
