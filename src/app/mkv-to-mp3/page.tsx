import type { Metadata } from "next";
import { LandingPage } from "@/components/landing-page";

export const metadata: Metadata = {
  title: "MKV to MP3 Converter – Free Online Matroska to MP3 Tool",
  description:
    "Convert MKV (Matroska) video files to MP3 audio online for free. Fast, private, FFmpeg-powered, no sign-up required. Works on Windows, Mac, Linux.",
  keywords: [
    "mkv to mp3",
    "convert mkv to mp3",
    "mkv to mp3 converter",
    "matroska to mp3",
    "mkv to mp3 online",
  ],
  alternates: { canonical: "/mkv-to-mp3" },
};

export default function Page() {
  return (
    <LandingPage
      currentPath="/mkv-to-mp3"
      h1="MKV to MP3 Converter"
      keyword="MKV to MP3"
      subtitle="Convert MKV (Matroska) video files to high-quality MP3 audio online for free. FFmpeg-powered, private, no sign-up required. Works on Windows, Mac, Linux."
      uploadTitle="Drop your MKV file here"
      uploadHint="or click to browse — MKV, MP4, MOV, WebM, AVI, MP3, WAV & more"
      buttonLabel="Convert MKV to MP3"
      highlights={[
        "Convert MKV, Matroska, and other open-source video containers to MP3",
        "FFmpeg libmp3lame encoder at VBR ~190 kbps",
        "Files deleted automatically — nothing is stored on our servers",
        "Works in any modern browser on Windows, Mac, Linux, and mobile",
        "100% free, no watermark, no sign-up, no installation",
      ]}
      internalLinks={[
        { text: "MP4 to MP3", href: "/" },
        { text: "MOV to MP3", href: "/mov-to-mp3" },
        { text: "MP3 Extractor", href: "/mp3-extractor" },
        { text: "Video to Audio Converter", href: "/video-to-audio-converter" },
      ]}
      contentBlocks={[
        {
          heading: "Free online MKV to MP3 converter",
          paragraphs: [
            "MP4 to MP3 is a free MKV to MP3 converter that takes any Matroska .mkv file you upload and turns it into a clean, portable MP3 audio track. MKV (Matroska Video) is a popular open-source container format often used for high-definition anime, movies, and downloaded video — it can hold multiple audio tracks, subtitles, and chapters in a single file. If you have an MKV with a soundtrack, dialogue, or commentary track that you want to listen to as audio only, this tool extracts it in seconds.",
            "Because MKV is an open format, FFmpeg handles it natively and reliably. Your MKV file is uploaded over HTTPS, demuxed, and the audio stream is re-encoded as MP3 using the libmp3lame encoder at Variable Bit Rate quality 2 (~190 kbps). The original MKV and the temporary MP3 are both deleted automatically after the conversion completes. We do not store, share, or distribute your media.",
            "This tool is built for your own content only. It does not connect to streaming services, torrent sites, or any other platform. Converting copyrighted movies, music, or commentary tracks that you do not own is illegal and against our Terms of Service.",
          ],
        },
        {
          heading: "How the MKV to MP3 conversion works",
          paragraphs: [
            "When you upload an MKV file, our backend passes it to FFmpeg. MKV files often contain multiple audio streams (different languages, commentary tracks, etc.). FFmpeg picks the first audio stream by default and re-encodes it as MP3 using the libmp3lame encoder. The video portion is discarded entirely, leaving you with just the audio in a universally playable MP3 file.",
            "The whole conversion typically takes 10 to 60 seconds depending on the length of your video and how many audio streams it contains. Because MKV often contains lossless or high-bitrate audio (FLAC, DTS, AC3), re-encoding to MP3 will result in some quality reduction — but at VBR quality 2, the loss is essentially imperceptible to human listeners on consumer equipment.",
          ],
        },
        {
          heading: "Why convert MKV to MP3?",
          paragraphs: [
            "MKV files are commonly used for high-quality video downloads, anime, movies, and TV shows. Common reasons to convert MKV to MP3 include: extracting a soundtrack or score for personal listening, pulling dialogue for transcription, isolating a commentary track, or making a video file small enough to upload as audio to a podcast host.",
            "MP3 is the most universally compatible audio format in the world. It plays on every phone, every browser, every music app, every podcast platform, and every video editor. Converting your MKV to MP3 gives you a smaller, more portable, more editable file that you can share, upload, archive, or import into any audio workflow.",
          ],
          list: [
            "Extract a movie soundtrack or score for personal listening on your phone",
            "Pull dialogue from an MKV video for transcription or subtitling work",
            "Isolate a director's commentary track from a movie file",
            "Convert a downloaded concert video into a portable audio file",
            "Make an MKV file small enough to upload as audio to a podcast host",
          ],
        },
        {
          heading: "MKV vs MP4 vs MOV — which to use?",
          paragraphs: [
            "All three are container formats that hold video and audio together. MKV (Matroska) is the most flexible — it can hold unlimited audio tracks, subtitles, and chapters, which is why it's popular for movies and anime. MP4 is the international standard, universally supported by phones and browsers. MOV is Apple's format for QuickTime.",
            "If you have an MP4 file instead of MKV, use our [[MP4 to MP3]] converter. If you have a MOV file from an iPhone, use [[MOV to MP3]]. For any other format, our [[Video to Audio Converter]] handles them all.",
          ],
        },
      ]}
      faqItems={[
        {
          q: "Can I convert MKV files with multiple audio tracks?",
          a: "Yes, but our tool picks the first audio stream by default. If you need a specific track (e.g., the second language or commentary), you'll need to use a desktop FFmpeg frontend like HandBrake to select it manually.",
        },
        {
          q: "Will the conversion reduce audio quality?",
          a: "Slightly. We re-encode to MP3 at VBR quality 2 (~190 kbps), which produces near-transparent audio. If your MKV contains lossless FLAC or DTS audio, there will be some quality reduction — but it's essentially imperceptible on consumer equipment.",
        },
        {
          q: "How long does the MKV to MP3 conversion take?",
          a: "Most MKV files under 100 MB convert in 10 to 60 seconds. Extraction time depends mainly on video length and the codec used in the audio stream (lossless audio takes longer to decode than AAC).",
        },
        {
          q: "What's the maximum file size?",
          a: "100 MB per upload. MKV files are often larger than MP4 because they contain higher-bitrate audio and video. If your MKV is bigger than 100 MB, trim it locally with HandBrake first, or use a desktop FFmpeg tool.",
        },
        {
          q: "Can I convert copyrighted movies or shows from MKV files?",
          a: "No. MP4 to MP3 only processes files you own or have explicit permission to use. Converting copyrighted movies, music, or commentary tracks is illegal and against our Terms of Service.",
        },
        {
          q: "Do you store my uploaded MKV files?",
          a: "No. Files are written to a temporary directory, processed by FFmpeg, and immediately deleted after the MP3 is delivered to your browser. We never persist, share, or distribute your media.",
        },
        {
          q: "Will subtitles from the MKV be included?",
          a: "No. MP3 is an audio-only format and cannot contain subtitles. If you need subtitles, keep the original MKV file or use a tool like Subtitle Edit to extract them separately.",
        },
      ]}
    />
  );
}
