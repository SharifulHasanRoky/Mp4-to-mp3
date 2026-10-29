import type { Metadata } from "next";
import { LandingPage } from "@/components/landing-page";

export const metadata: Metadata = {
  title: "MP4 to WAV Converter – Free Online Lossless Audio Extractor",
  description:
    "Convert MP4 video files to WAV audio (lossless, uncompressed) online for free. Perfect for editing, mixing, and professional audio workflows. FFmpeg-powered, no sign-up.",
  keywords: [
    "mp4 to wav",
    "convert mp4 to wav",
    "mp4 to wav converter",
    "mp4 to wav online",
    "extract wav from mp4",
  ],
  alternates: { canonical: "/mp4-to-wav" },
};

export default function Page() {
  return (
    <LandingPage
      currentPath="/mp4-to-wav"
      h1="MP4 to WAV Converter"
      keyword="MP4 to WAV"
      subtitle="Convert MP4 video files to WAV audio (lossless, uncompressed PCM) online for free. Perfect for audio editing, mixing, and professional workflows. FFmpeg-powered, no sign-up."
      uploadTitle="Drop your MP4 file here"
      uploadHint="or click to browse — MP4, MOV, WebM, MKV, AVI, MP3, WAV & more"
      buttonLabel="Convert MP4 to WAV"
      outputFormat="wav"
      highlights={[
        "Lossless PCM WAV output — no quality loss from re-encoding",
        "Ideal for Audacity, Premiere Pro, Logic Pro, Ableton, Pro Tools",
        "FFmpeg-powered, processes any video container that has audio",
        "Files deleted automatically — private by design",
        "100% free, no watermark, no sign-up, no installation",
      ]}
      internalLinks={[
        { text: "MP4 to MP3", href: "/" },
        { text: "WAV to MP4", href: "/wav-to-mp4" },
        { text: "Video to Audio Converter", href: "/video-to-audio-converter" },
        { text: "MP3 Extractor", href: "/mp3-extractor" },
      ]}
      contentBlocks={[
        {
          heading: "Convert MP4 to WAV — lossless audio extraction",
          paragraphs: [
            "MP4 to MP3 is a free MP4 to WAV converter that takes any MP4 video file you upload and extracts the audio track as a lossless, uncompressed WAV file. Unlike MP3 (which is a lossy format), WAV preserves the audio exactly as it exists inside the MP4 — no re-encoding artifacts, no quality loss. This makes WAV the right choice for professional audio editing, mixing, mastering, and any workflow where bit-perfect audio matters.",
            "Because we use FFmpeg, the extraction is identical to what you'd get from a desktop audio editor. Your MP4 file is uploaded over HTTPS, the audio stream is demuxed and decoded to PCM (raw uncompressed audio), and re-wrapped as a standard WAV file. The original MP4 and the temporary WAV are both deleted automatically after the conversion completes.",
            "This tool is built for your own content only. It does not connect to Instagram, TikTok, YouTube, or any other platform. Converting copyrighted music or video that you do not own is illegal and against our Terms of Service.",
          ],
        },
        {
          heading: "When to choose WAV over MP3",
          paragraphs: [
            "WAV is uncompressed PCM audio. MP3 is compressed lossy audio. Each format has its place — here's when to choose WAV:",
            "Choose WAV when: you'll be editing or mixing the audio in Audacity, Logic Pro, Ableton, Pro Tools, or Premiere Pro; you need the highest possible quality for archiving; you're submitting audio for professional mixing/mastering; or you want to avoid any quality loss when converting between formats.",
            "Choose MP3 when: you want a smaller file for personal listening, podcast distribution, or mobile playback; you need universal compatibility across all devices; or you're sharing via email, Discord, or messaging apps where file size matters.",
            "Need MP3 instead? Use our [[MP4 to MP3]] converter. Need to convert audio back into a video container? Try our [[WAV to MP4]] converter.",
          ],
          list: [
            "Professional audio editing in Audacity, Logic Pro, Ableton, or Pro Tools",
            "Video editing in Premiere Pro, DaVinci Resolve, or Final Cut Pro",
            "Archiving audio at maximum possible quality",
            "Submitting stems for professional mixing or mastering",
            "Any workflow where bit-perfect, lossless audio is required",
          ],
        },
        {
          heading: "How MP4 to WAV conversion works",
          paragraphs: [
            "When you upload an MP4 file, our backend passes it to FFmpeg. FFmpeg demuxes the MP4 container, decodes the audio stream (usually AAC) to raw PCM samples, and wraps those samples in a standard WAV container (16-bit, 44.1 kHz, stereo by default — matching the source). The video portion is discarded entirely.",
            "The whole conversion typically takes 5 to 30 seconds for files under 100 MB. Because WAV is uncompressed, the output file will be much larger than the source MP4 — roughly 10 MB per minute of audio at CD quality. If your source is 5 minutes long, expect a WAV file around 50 MB.",
          ],
        },
        {
          heading: "Why MP4 to WAV instead of MP4 to MP3?",
          paragraphs: [
            "MP3 is compressed lossy audio — great for storage and universal playback, but every re-encode loses quality. WAV is uncompressed lossless audio — much larger files, but no quality loss at all. For editing, mixing, and mastering workflows, you want WAV so you're working with the cleanest possible source. For distribution and personal listening, MP3 is the right choice.",
            "If you're not sure which you need, start with our [[MP4 to MP3]] converter (smaller files, universal compatibility) and only switch to WAV if you specifically need lossless audio for editing or archival.",
          ],
        },
      ]}
      faqItems={[
        {
          q: "Will converting MP4 to WAV improve audio quality?",
          a: "No. WAV is lossless, but the source MP4 usually contains lossy AAC audio. Converting lossy AAC to lossless WAV preserves the audio exactly as it is — it doesn't add back information that was lost during the original AAC encoding. However, it does prevent any further quality loss during editing.",
        },
        {
          q: "How big will the WAV file be?",
          a: "Roughly 10 MB per minute of audio at CD quality (16-bit, 44.1 kHz, stereo). A 5-minute MP4 will produce a WAV around 50 MB. A 10-minute file will be around 100 MB — which is our upload limit, so very long files may not fit.",
        },
        {
          q: "What sample rate and bit depth does the WAV use?",
          a: "By default we preserve the source audio's sample rate and bit depth — usually 44.1 kHz, 16-bit stereo. If you need a specific format (e.g., 48 kHz for video, 24-bit for mastering), use a desktop audio editor like Audacity after extraction.",
        },
        {
          q: "Is WAV better than MP3?",
          a: "It depends. WAV is higher quality (lossless) but creates much larger files. MP3 is compressed (lossy) but creates small files that play everywhere. For editing and archival, choose WAV. For distribution and personal listening, choose MP3.",
        },
        {
          q: "Can I convert copyrighted music from MP4 to WAV?",
          a: "No. MP4 to MP3 only processes files you own or have explicit permission to use. Converting copyrighted music or video is illegal and against our Terms of Service.",
        },
        {
          q: "How long does the MP4 to WAV conversion take?",
          a: "Most MP4 files under 100 MB convert in 5 to 30 seconds. WAV extraction is faster than MP3 because no re-encoding is needed — only demuxing and re-wrapping.",
        },
        {
          q: "Do you store my uploaded MP4 files?",
          a: "No. Files are written to a temporary directory, processed by FFmpeg, and immediately deleted after the WAV is delivered to your browser. We never persist, share, or distribute your media.",
        },
      ]}
    />
  );
}
