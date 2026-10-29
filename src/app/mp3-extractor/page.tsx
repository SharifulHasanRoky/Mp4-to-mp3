import type { Metadata } from "next";
import { LandingPage } from "@/components/landing-page";

export const metadata: Metadata = {
  title: "MP3 Extractor Online – Free Audio Extractor from Video",
  description:
    "Free online MP3 extractor. Pull the audio track out of any video file and save it as a high-quality MP3. FFmpeg-powered, private, no sign-up, no watermark.",
  keywords: [
    "mp3 extractor",
    "mp3 extractor online",
    "extract mp3 from video",
    "online mp3 extractor",
    "free mp3 extractor",
  ],
  alternates: { canonical: "/mp3-extractor" },
};

export default function Page() {
  return (
    <LandingPage
      currentPath="/mp3-extractor"
      h1="MP3 Extractor"
      keyword="MP3 extractor"
      subtitle="Pull the audio track out of any video file and save it as a clean, high-quality MP3. Free online MP3 extractor — powered by FFmpeg, processed privately, no sign-up required."
      uploadTitle="Drop your video file here"
      uploadHint="or click to browse — MP4, MOV, WebM, MKV, AVI, MP3, WAV & more"
      buttonLabel="Extract MP3"
      highlights={[
        "Extract MP3 from MP4, MOV, WebM, MKV, AVI, M4V and more",
        "libmp3lame VBR ~190 kbps for studio-grade output",
        "Up to 100 MB per file — no queue, no waiting",
        "Files deleted automatically after extraction",
        "No watermark, no sign-up, no installation, completely free",
      ]}
      internalLinks={[
        { text: "MP4 to MP3", href: "/" },
        { text: "Video to Audio Converter", href: "/video-to-audio-converter" },
        { text: "Extract Audio from Video", href: "/extract-audio-from-video" },
        { text: "Video to MP3 Converter", href: "/video-to-mp3-converter" },
      ]}
      contentBlocks={[
        {
          heading: "What is an MP3 extractor?",
          paragraphs: [
            "An MP3 extractor is a tool that takes a video file (or any other multimedia container) and pulls out just the audio stream, re-encoding it as a standard MP3 file that you can play on any device. The word 'extract' is important — it implies that the audio already exists inside the file and we are simply isolating it, rather than synthesizing or transforming it. That is exactly what MP4 to MP3 does, using FFmpeg under the hood.",
            "MP3 remains the most universal audio format in the world. Every phone, every browser, every music app, every video editor, every podcast platform supports MP3 playback. By extracting your audio as MP3, you guarantee that the file will be playable everywhere — now and decades from now. Other formats like AAC, Opus, or FLAC are technically superior in some ways, but none has the universal compatibility of MP3.",
            "MP4 to MP3 is built as a privacy-first MP3 extractor. Your video is uploaded to a temporary directory, processed by FFmpeg, and deleted immediately. We never persist, log, share, or distribute your media. This makes the tool safe to use even for sensitive content like confidential interviews, personal voice memos, or unreleased music demos.",
          ],
        },
        {
          heading: "Why use an online MP3 extractor?",
          paragraphs: [
            "The alternative to an online extractor is installing desktop software like Audacity, VLC, HandBrake, or Adobe Media Encoder. These are powerful tools, but they require installation, take up disk space, and have a learning curve. For most one-off audio extraction tasks — pulling a voice memo out of a phone recording, exporting a podcast interview from a Zoom video, grabbing a scratch vocal take from a phone video — an online tool is faster and simpler.",
            "MP4 to MP3 runs entirely in your browser. There is nothing to download, nothing to install, nothing to update. You drag your file in, click one button, and the MP3 is delivered back to you in seconds. This makes it ideal for quick tasks on phones, tablets, shared computers, or workstations where you don't have admin privileges.",
            "The trade-off is the 100 MB file size limit, which exists to keep the service fast and free for everyone. If you regularly need to extract MP3s from multi-gigabyte video files, you may want to install a local tool like FFmpeg directly or use HandBrake. For 95% of personal audio extraction tasks, however, the online tool is the right choice.",
          ],
        },
        {
          heading: "Quality settings explained",
          paragraphs: [
            "Our MP3 extractor uses FFmpeg's libmp3lame encoder at VBR quality 2 (Variable Bit Rate). This setting targets approximately 190 kbps, which is widely considered the sweet spot between file size and audio quality. The output is 'near-transparent' — meaning even trained audio engineers on high-end equipment struggle to distinguish it from the original source.",
            "Why VBR instead of CBR (Constant Bit Rate)? VBR allocates more bits to complex sections (like orchestral swells or layered vocals) and fewer bits to simple sections (silence, single tones). The result is a smaller file with better perceived quality than the equivalent CBR encode. Most modern streaming platforms and podcast hosts also recommend VBR for this reason.",
            "If you need a different quality setting — for example, a smaller file size for a voice memo, or a higher bitrate for music production — let us know. We are considering adding quality presets in a future update.",
          ],
        },
      ]}
      faqItems={[
        {
          q: "Is this MP3 extractor really free?",
          a: "Yes, completely free with no sign-up, no watermark, and no daily limits. You can extract as many MP3s as you like, up to 100 MB per file. The service is supported by unobtrusive ads in a privacy-respecting way.",
        },
        {
          q: "What audio format does the extractor output?",
          a: "MP3 only, encoded with libmp3lame at VBR quality 2 (~190 kbps). MP3 is the most universally compatible audio format in the world — it plays on every modern device, browser, and audio app, and will continue to play for decades.",
        },
        {
          q: "What video formats are supported as input?",
          a: "MP4, MOV, WebM, MKV, AVI, M4V, FLV, and 3GP. We also accept direct audio files (MP3, M4A, AAC, WAV, OGG, Opus, FLAC) if you want to convert them to standard MP3.",
        },
        {
          q: "Why does my extracted MP3 sound quieter than the original?",
          a: "We do not apply any loudness normalization. If your source video had a quiet audio mix, the extracted MP3 will be just as quiet. You can boost the volume in any audio editor afterward (Audacity is free) without quality loss, as long as you avoid clipping.",
        },
        {
          q: "Can I extract MP3 audio from a copyrighted song in someone else's video?",
          a: "No. MP4 to MP3 only processes files you upload yourself. It does not connect to or fetch content from Instagram, TikTok, YouTube, or any other platform. Extracting copyrighted audio without permission is illegal and against our Terms of Service.",
        },
        {
          q: "Do you store the videos I upload?",
          a: "No. Files are written to a temporary directory, processed by FFmpeg, and deleted immediately after the MP3 is delivered to your browser. We never persist, share, or distribute your media.",
        },
      ]}
    />
  );
}
