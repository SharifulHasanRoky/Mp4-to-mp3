/**
 * Central registry of all tool pages on the site.
 * Used by: header nav, footer, sitemap, interlinking, related-tools blocks.
 *
 * Keeping this in one place means we never have orphaned pages or broken
 * cross-links. Add a new page here once, and it shows up everywhere.
 */

export interface ToolPage {
  /** URL path, must start with / */
  path: string;
  /** Display label in nav / footer */
  label: string;
  /** Short one-line description used in cards */
  description: string;
  /** Grouping for the footer + homepage grid */
  group: "mp4-mp3" | "video-to-audio" | "format-converters";
  /** Which nav level this appears in */
  nav: "primary" | "secondary" | "footer-only";
  /** Primary SEO keyword for this page */
  primaryKeyword: string;
  /** Format hint shown in the upload area */
  uploadTitle: string;
  uploadHint: string;
  /** Button label */
  buttonLabel: string;
}

export const TOOL_PAGES: ToolPage[] = [
  // === MP4 & MP3 group ===
  {
    path: "/",
    label: "MP4 to MP3",
    description:
      "Convert MP4 to MP3 audio online for free. Fast, private, FFmpeg-powered, no sign-up.",
    group: "mp4-mp3",
    nav: "primary",
    primaryKeyword: "mp4 to mp3",
    uploadTitle: "Drop your MP4 file here",
    uploadHint: "or click to browse — MP4, MOV, WebM, MKV, AVI, MP3, WAV & more",
    buttonLabel: "Convert to MP3",
  },
  {
    path: "/mp3-extractor",
    label: "MP3 Extractor",
    description:
      "Free online MP3 extractor. Pull the audio track out of any video file.",
    group: "mp4-mp3",
    nav: "primary",
    primaryKeyword: "mp3 extractor",
    uploadTitle: "Drop your video file here",
    uploadHint: "or click to browse — MP4, MOV, WebM, MKV, AVI, MP3, WAV & more",
    buttonLabel: "Extract MP3",
  },

  // === Video to audio group ===
  {
    path: "/video-to-audio-converter",
    label: "Video to Audio Converter",
    description:
      "Free online video to audio converter. Convert any video to a clean MP3.",
    group: "video-to-audio",
    nav: "primary",
    primaryKeyword: "video to audio converter",
    uploadTitle: "Drop your video file here",
    uploadHint: "or click to browse — MP4, MOV, WebM, MKV, AVI, MP3, WAV & more",
    buttonLabel: "Convert to Audio",
  },
  {
    path: "/convert-video-to-audio",
    label: "Convert Video to Audio",
    description:
      "Convert video to audio file online. Quick, free, no installation.",
    group: "video-to-audio",
    nav: "footer-only",
    primaryKeyword: "convert video to audio file",
    uploadTitle: "Drop your video file here",
    uploadHint: "or click to browse — MP4, MOV, WebM, MKV, AVI, MP3, WAV & more",
    buttonLabel: "Convert to Audio",
  },
  {
    path: "/extract-audio-from-video",
    label: "Extract Audio from Video",
    description:
      "Extract the audio track from any video file and save it as MP3.",
    group: "video-to-audio",
    nav: "primary",
    primaryKeyword: "extract audio from video",
    uploadTitle: "Drop your video file here",
    uploadHint: "or click to browse — MP4, MOV, WebM, MKV, AVI, MP3, WAV & more",
    buttonLabel: "Extract Audio",
  },
  {
    path: "/video-to-mp3-converter",
    label: "Video to MP3 Converter",
    description: "Convert any video file to a high-quality MP3 in seconds.",
    group: "video-to-audio",
    nav: "primary",
    primaryKeyword: "video to mp3 converter",
    uploadTitle: "Drop your video file here",
    uploadHint: "or click to browse — MP4, MOV, WebM, MKV, AVI, MP3, WAV & more",
    buttonLabel: "Convert to MP3",
  },

  // === Format-specific converters ===
  {
    path: "/mov-to-mp3",
    label: "MOV to MP3",
    description: "Convert MOV (QuickTime) video files to MP3 audio online.",
    group: "format-converters",
    nav: "footer-only",
    primaryKeyword: "mov to mp3",
    uploadTitle: "Drop your MOV file here",
    uploadHint: "or click to browse — MOV, MP4, WebM, MKV, AVI, MP3, WAV & more",
    buttonLabel: "Convert MOV to MP3",
  },
  {
    path: "/mkv-to-mp3",
    label: "MKV to MP3",
    description: "Convert MKV (Matroska) video files to MP3 audio online.",
    group: "format-converters",
    nav: "footer-only",
    primaryKeyword: "mkv to mp3",
    uploadTitle: "Drop your MKV file here",
    uploadHint: "or click to browse — MKV, MP4, MOV, WebM, AVI, MP3, WAV & more",
    buttonLabel: "Convert MKV to MP3",
  },
  {
    path: "/mp4-to-wav",
    label: "MP4 to WAV",
    description: "Convert MP4 video files to WAV audio (uncompressed, lossless).",
    group: "format-converters",
    nav: "footer-only",
    primaryKeyword: "mp4 to wav",
    uploadTitle: "Drop your MP4 file here",
    uploadHint: "or click to browse — MP4, MOV, WebM, MKV, AVI, MP3, WAV & more",
    buttonLabel: "Convert MP4 to WAV",
  },
  {
    path: "/wav-to-mp4",
    label: "WAV to MP4",
    description: "Convert WAV audio files to MP4 video format online.",
    group: "format-converters",
    nav: "footer-only",
    primaryKeyword: "wav to mp4",
    uploadTitle: "Drop your WAV file here",
    uploadHint: "or click to browse — WAV, MP3, M4A, AAC, OGG, MP4, MOV & more",
    buttonLabel: "Convert WAV to MP4",
  },
  {
    path: "/m4a-to-mp4",
    label: "M4A to MP4",
    description: "Convert M4A audio files to MP4 video format online.",
    group: "format-converters",
    nav: "footer-only",
    primaryKeyword: "m4a to mp4",
    uploadTitle: "Drop your M4A file here",
    uploadHint: "or click to browse — M4A, MP3, WAV, AAC, MP4, MOV & more",
    buttonLabel: "Convert M4A to MP4",
  },
];

/** Returns the page entry for a given path, or undefined. */
export function findPage(path: string): ToolPage | undefined {
  return TOOL_PAGES.find((p) => p.path === path);
}

/** Returns pages in the same group, excluding the given path. */
export function relatedPages(currentPath: string, limit = 6): ToolPage[] {
  const current = findPage(currentPath);
  if (!current) return TOOL_PAGES.slice(0, limit);
  // Same group first, then fill with other groups
  const sameGroup = TOOL_PAGES.filter(
    (p) => p.group === current.group && p.path !== currentPath
  );
  const others = TOOL_PAGES.filter(
    (p) => p.group !== current.group && p.path !== currentPath
  );
  return [...sameGroup, ...others].slice(0, limit);
}
