# SEO Content Plan — 30 Days × 3 Pages = 90 Pages

This file drives the daily SEO cron job. Each day, the cron agent reads
this file, finds the next uncompleted batch, creates those 3 pages,
then updates the tracking file.

## How to use this file

1. The cron agent reads `scripts/seo-batch-state.json` to find the
   next batch number.
2. It looks up that batch in this file.
3. It creates the 3 pages listed under that batch.
4. After all 3 are created, it updates the tracking file with the
   completed batch number and the URLs created.
5. It updates sitemap.ts, llms.txt, and the HTML sitemap page.
6. It commits, pushes, and pings IndexNow.

## Page creation rules

Each page MUST follow these rules:
- Use `PageShell` component for layout
- Use `QuickAnswer` component for voice-search/AEO optimization
- Add `export const metadata` with unique title, description, canonical
- Add JSON-LD schema (Article for info pages, HowTo for guide pages)
- Include internal links to related pages using `[[Page Name|/path]]` syntax
- 800-1500 words of unique, genuinely useful content
- No keyword stuffing — natural language
- Include a CTA linking back to the homepage converter

## URL slug convention
- Lowercase, hyphens between words
- No trailing slashes
- Example: `/how-to-convert-mp4-to-mp3-on-iphone`

---

## Batch 1 — PRIMARY KEYWORDS (user's original list — highest priority)
1. `/video-to-audio-converter` — Video to Audio Converter (already exists — skip)
2. `/convert-video-to-audio` — Convert Video to Audio File (already exists — skip)
3. `/video-to-mp3-converter` — Video to MP3 Converter (already exists — skip)

NOTE: The above 3 pages already exist from initial build. Cron agent should
check for existence and SKIP them. Move directly to Batch 1's REAL new pages:

## Batch 1 (real) — PRIMARY KEYWORDS (user's original list — new pages)
1. `/mp4-to-mp3-converter-online-free` — MP4 to MP3 Converter Online Free (targeting: mp4 to mp3 converter online free, mp4 to mp3 online free, mp4 to mp3 converter online)
2. `/best-mp4-to-mp3-converter` — Best MP4 to MP3 Converter (targeting: best mp4 to mp3 converter, best free mp4 to mp3 converter)
3. `/mp4-to-mp3-online` — MP4 to MP3 Online (targeting: mp4 to mp3 online, mp4 to mp3 online free, convert mp4 to mp3 online)

## Batch 2 — PRIMARY KEYWORDS (continued)
4. `/change-video-to-audio` — Change Video to Audio (targeting: change video to audio, change video to mp3)
5. `/video-into-audio` — Video Into Audio (targeting: video into audio, video into audio file, convert video into audio)
6. `/mp4-mp3` — MP4 MP3 (targeting: mp4 mp3, mp4 to mp3, convert mp4 mp3)

## Batch 3 — PRIMARY KEYWORDS (continued)
7. `/video-to-audio-converter-online` — Video to Audio Converter Online (targeting: video to audio converter online, video to audio converter online free)
8. `/video-to-audio-converter-for-pc` — Video to Audio Converter for PC (targeting: video to audio converter for pc, video to audio converter for windows)
9. `/mp4-to-mp3-software` — MP4 to MP3 Software (targeting: mp4 to mp3 software, best mp4 to mp3 software, mp4 to mp3 converter software)

## Batch 4 — PRIMARY KEYWORDS (continued)
10. `/video-into-audio-file` — Video Into Audio File (targeting: video into audio file, convert video into audio file)
11. `/video-to-audio-file-converter` — Video to Audio File Converter (targeting: video to audio file converter, video to audio converter)
12. `/video-to-audio-converter-online-free` — Video to Audio Converter Online Free (targeting: video to audio converter online free, free video to audio converter online)

## Batch 5 — FORMAT CONVERSION (user's original keywords)
13. `/convert-mov-to-mp3` — Convert MOV to MP3 (targeting: convert mov to mp3, mov to mp3 converter)
14. `/mov-to-mp3-converter` — MOV to MP3 Converter (already exists at /mov-to-mp3 — skip or merge)
15. `/convert-wav-to-mp4` — Convert WAV to MP4 (targeting: convert wav to mp4, wav to mp4 converter)

## Batch 6 — FORMAT CONVERSION (continued)
16. `/convert-m4a-to-mp4` — Convert M4A to MP4 (targeting: convert m4a to mp4, m4a to mp4 converter)
17. `/change-video-to-mp3` — Change Video to MP3 (targeting: change video to mp3, convert video to mp3)
18. `/mp4-to-wav-converter` — MP4 to WAV Converter (targeting: mp4 to wav, mp4 to wav converter, convert mp4 to wav)

## Batch 7 — EXTRACT KEYWORDS (user's original)
19. `/get-audio-from-video` — Get Audio from Video (targeting: get audio from video, extract audio from video, get audio from mp4)
20. `/extracting-audio-from-video` — Extracting Audio from Video (targeting: extracting audio from video, extract audio from video)
21. `/extract-audio-from-mp4` — Extract Audio from MP4 (targeting: extract audio from mp4, get audio from mp4, extract mp3 from mp4)

## Batch 8 — Quality guides (bitrate + encoding)
22. `/mp4-to-mp3-320kbps` — How to Convert MP4 to MP3 at 320 kbps (High Quality)
23. `/mp4-to-mp3-192kbps` — MP4 to MP3 at 192 kbps: Best Quality/Size Balance
24. `/mp4-to-mp3-128kbps` — MP4 to MP3 at 128 kbps: Smallest File Size

## Batch 9 — Quality guides (lossless + technical)
25. `/mp4-to-mp3-without-quality-loss` — How to Minimize Quality Loss When Converting MP4 to MP3
26. `/mp4-to-mp3-vbr-vs-cbr` — VBR vs CBR: Which MP3 Encoding Mode Is Better?
27. `/mp4-to-mp3-sample-rate` — MP3 Sample Rate Explained: 44.1 kHz vs 48 kHz

## Batch 10 — Troubleshooting
28. `/mp4-to-mp3-no-audio` — Fix: MP4 to MP3 Conversion Has No Audio
29. `/mp4-to-mp3-conversion-failed` — Fix: MP4 to MP3 Conversion Failed (Common Errors)
30. `/mp4-to-mp3-file-too-large` — How to Convert Large MP4 Files (Over 100MB) to MP3

## Batch 11 — Troubleshooting (advanced)
31. `/mp4-to-mp3-slow-conversion` — Why Is MP4 to MP3 Conversion Slow? How to Speed It Up
32. `/mp4-to-mp3-audio-out-of-sync` — Fix: Audio Out of Sync After MP4 to MP3 Conversion
33. `/mp4-to-mp3-no-video-just-audio` — How to Extract Just the Audio from an MP4 (No Video)

## Batch 12 — Method comparisons
34. `/online-vs-offline-mp4-to-mp3` — Online vs Offline MP4 to MP3 Converter: Which Is Better?
35. `/free-vs-paid-mp4-to-mp3` — Free vs Paid MP4 to MP3 Converters: Do You Need to Pay?
36. `/browser-vs-app-mp4-to-mp3` — Browser-Based vs Desktop App MP4 to MP3: Pros and Cons

## Batch 13 — Tool comparisons
37. `/mp4-to-mp3-vs-audacity` — MP4toMP3.online vs Audacity: Which Is Better for You?
38. `/mp4-to-mp3-vs-vlc` — MP4toMP3.online vs VLC: Online vs Desktop Conversion
39. `/mp4-to-mp3-vs-handbrake` — MP4toMP3.online vs HandBrake: Quick Audio vs Full Video Tool

## Batch 14 — Legal + safety
40. `/is-mp4-to-mp3-conversion-legal` — Is Converting MP4 to MP3 Legal? Copyright Explained
41. `/mp4-to-mp3-fair-use` — Fair Use and MP4 to MP3 Conversion: What You Need to Know
42. `/mp4-to-mp3-personal-use` — Personal Use Exceptions for MP4 to MP3 Conversion

## Batch 15 — Privacy + security
43. `/mp4-to-mp3-private` — How MP4toMP3.online Protects Your Privacy (Browser-Based)
44. `/mp4-to-mp3-no-upload` — Why Your Files Never Leave Your Device with Our Tool
45. `/mp4-to-mp3-gdpr` — GDPR and MP4 to MP3: Your Data Protection Rights

## Batch 16 — Long-tail keywords (quality modifiers)
46. `/mp4-to-mp3-high-quality` — How to Convert MP4 to MP3 in High Quality
47. `/mp4-to-mp3-best-quality` — Best MP4 to MP3 Converter Settings for Maximum Quality
48. `/mp4-to-mp3-hd-audio` — Extract HD Audio from MP4: Complete Guide

## Batch 17 — Long-tail keywords (convenience modifiers)
49. `/mp4-to-mp3-no-software` — Convert MP4 to MP3 Without Installing Any Software
50. `/mp4-to-mp3-no-signup` — MP4 to MP3 Converter with No Sign-Up Required
51. `/mp4-to-mp3-no-watermark` — MP4 to MP3 Converter with No Watermark

## Batch 18 — Long-tail keywords (batch + workflow)
52. `/mp4-to-mp3-batch` — How to Batch Convert Multiple MP4 Files to MP3
53. `/mp4-to-mp3-multiple-files` — Convert Multiple MP4 Files to MP3 at Once
54. `/mp4-to-mp3-quickly` — The Fastest Way to Convert MP4 to MP3 Online

## Batch 19 — Long-tail keywords (source-specific)
55. `/mp4-to-mp3-from-google-drive` — How to Convert MP4 to MP3 from Google Drive
56. `/mp4-to-mp3-from-dropbox` — How to Convert MP4 to MP3 from Dropbox
57. `/mp4-to-mp3-from-url` — Convert MP4 to MP3 from a URL (Direct Link)

## Batch 20 — Long-tail keywords (file-size modifiers)
58. `/mp4-to-mp3-large-file` — How to Convert Large MP4 Files to MP3 (Up to 500MB)
59. `/mp4-to-mp3-long-video` — Convert Long MP4 Videos (1+ Hour) to MP3
60. `/mp4-to-mp3-short-clip` — Convert Short MP4 Clips to MP3 Quickly

## Batch 21 — Educational (format basics)
61. `/what-is-mp4` — What Is MP4? Video Container Format Explained
62. `/what-is-mp3` — What Is MP3? Audio Format Explained Simply
63. `/what-is-ffmpeg` — What Is FFmpeg? The Engine Behind MP4 to MP3 Conversion

## Batch 22 — Educational (technical concepts)
64. `/audio-codecs-explained` — Audio Codecs Explained: AAC, MP3, Opus, FLAC
65. `/video-codecs-explained` — Video Codecs Explained: H.264, H.265, VP9
66. `/container-formats-explained` — Container Formats: MP4, MKV, MOV, AVI

## Batch 23 — Educational (compression)
67. `/lossy-vs-lossless` — Lossy vs Lossless Audio: What's the Difference?
68. `/audio-compression-explained` — Audio Compression Explained: How MP3 Makes Files Smaller
69. `/bitrate-explained` — Bitrate Explained: How It Affects Audio Quality and File Size

## Batch 24 — Tutorials (specific extraction)
70. `/extract-music-from-mp4` — How to Extract Music/Songs from MP4 Videos
71. `/extract-voice-from-mp4` — How to Extract Voice/Speech from MP4 Videos
72. `/extract-background-music-from-mp4` — How to Extract Background Music from MP4

## Batch 25 — Tutorials (device-specific destinations)
73. `/mp4-to-mp3-for-car-stereo` — Convert MP4 to MP3 for Car Stereo (USB/Aux)
74. `/mp4-to-mp3-for-phone` — Convert MP4 to MP3 for Phone Music Library
75. `/mp4-to-mp3-for-mp3-player` — Convert MP4 to MP3 for Dedicated MP3 Players

## Batch 26 — Tutorials (purpose-specific)
76. `/mp4-to-mp3-for-transcription` — Convert MP4 to MP3 for Transcription Services
77. `/mp4-to-mp3-for-video-editing` — Convert MP4 to MP3 for Video Editing Software
78. `/mp4-to-mp3-for-language-learning` — Convert MP4 to MP3 for Language Learning Practice

## Batch 27 — Advanced topics
79. `/mp4-to-mp3-normalize-volume` — How to Normalize Volume When Converting MP4 to MP3
80. `/mp4-to-mp3-trim-audio` — How to Trim/Cut Audio During MP4 to MP3 Conversion
81. `/mp4-to-mp3-metadata` — How to Preserve/Add Metadata When Converting MP4 to MP3

## Batch 28 — Advanced topics (continued)
82. `/mp4-to-mp3-stereo-vs-mono` — Stereo vs Mono: Which to Choose for MP3 Output
83. `/mp4-to-mp3-id3-tags` — ID3 Tags Explained: How to Add Title/Artist/Album to MP3
84. `/mp4-to-mp3-album-art` — How to Add Album Art/Cover Image to MP3 Files

## Batch 29 — Year/feature-specific
85. `/best-mp4-to-mp3-converter-2026` — Best MP4 to MP3 Converter in 2026 (Updated)
86. `/mp4-to-mp3-no-install` — MP4 to MP3 Converter That Requires No Installation
87. `/mp4-to-mp3-in-browser` — Convert MP4 to MP3 Entirely in Your Browser (No Upload)

## Batch 30 — Wrap-up + FAQ
88. `/mp4-to-mp3-alternatives` — 5 Best MP4 to MP3 Alternatives Compared
89. `/mp4-to-mp3-common-questions` — 20 Common Questions About MP4 to MP3 Conversion
90. `/mp4-to-mp3-complete-guide` — The Complete Guide to MP4 to MP3 Conversion (Everything You Need to Know)

---

## Notes for the cron agent

- Always check `src/app/` for existing pages before creating — avoid duplicates
- Use the `LandingPage` component pattern for tool-style pages, `PageShell` for article-style pages
- Each page should have a `QuickAnswer` block near the top (for AEO/voice search)
- Include 2-3 internal links per page (to other pages on the site)
- The `page` prop in `AudioExtractor` should match the page's path
- After creating all 3 pages, ALWAYS: update sitemap.ts, update llms.txt, commit, push, ping IndexNow
- The IndexNow endpoint is: POST /api/indexnow with body `{ "urlList": ["url1", "url2", "url3"] }`
- All URLs must start with `https://www.mp4tomp3.online`
