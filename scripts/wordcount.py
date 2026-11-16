import re
from pathlib import Path

pages = [
    "lossy-vs-lossless",
    "audio-compression-explained",
    "bitrate-explained",
    "extract-music-from-mp4",
    "extract-voice-from-mp4",
    "extract-background-music-from-mp4",
    "mp4-to-mp3-for-car-stereo",
    "mp4-to-mp3-for-phone",
    "mp4-to-mp3-for-mp3-player",
]

base = Path("/home/z/my-project/src/app")

for slug in pages:
    src = (base / slug / "page.tsx").read_text()
    body = src.split("return (", 1)[-1]
    body = re.sub(r"\{/\*.*?\*/\}", " ", body, flags=re.S)
    body = re.sub(r"<[^>]+>", " ", body)
    body = body.replace("&quot;", " ").replace("&apos;", " ").replace("&amp;", " ").replace("&lt;", " ").replace("&gt;", " ").replace("&nbsp;", " ")
    body = re.sub(r"className=|href=", " ", body)
    words = re.findall(r"[A-Za-z][A-Za-z'\-]*", body)
    code_tokens = {
        "PageShell","JsonLd","QuickAnswer","FileAudio","Link","Metadata","className","href","return",
        "true","false","null","undefined","const","default","export","import","type","from","self",
    }
    visible = [w for w in words if w not in code_tokens and not w.isdigit()]
    print(f"{slug:42s} {len(visible):5d} words")
