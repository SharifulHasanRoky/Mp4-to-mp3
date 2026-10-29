import type { Metadata } from "next";
import { LandingPage } from "@/components/landing-page";

export const metadata: Metadata = {
  title: "Video to Audio Converter – Free Online Tool (No Sign-up)",
  description:
    "Free online video to audio converter. Convert MP4, MOV, WebM, MKV, AVI to MP3 in seconds. Works on PC, Mac, iPhone, Android. No sign-up, no watermark, FFmpeg-powered.",
  keywords: [
    "video to audio converter",
    "video to audio converter online free",
    "video to audio converter online",
    "video to audio converter for pc",
    "video to audio file converter",
    "online video to audio converter",
  ],
  alternates: { canonical: "/video-to-audio-converter" },
};

export default function Page() {
  return (
    <LandingPage
      currentPath="/video-to-audio-converter"
      h1="Video to Audio Converter"
      keyword="video to audio converter"
      subtitle="Convert any video file to a high-quality MP3 audio track in seconds. Free, private, and powered by FFmpeg — no software to install, no sign-up. Works on PC, Mac, iPhone, and Android."
      uploadTitle="Drop your video file here"
      uploadHint="or click to browse — MP4, MOV, WebM, MKV, AVI, MP3, WAV & more"
      buttonLabel="Convert to Audio"
      highlights={[
        "Convert MP4, MOV, WebM, MKV, AVI, M4V, FLV and 3GP to MP3",
        "FFmpeg-powered processing for studio-grade output quality",
        "Files deleted automatically — nothing is stored on our servers",
        "Works on PC, Mac, iPhone, Android, Linux without installing software",
        "100% free, no watermark, no account, no email required",
      ]}
      internalLinks={[
        { text: "MP4 to MP3", href: "/" },
        { text: "Convert Video to Audio", href: "/convert-video-to-audio" },
        { text: "Extract Audio from Video", href: "/extract-audio-from-video" },
        { text: "Video to MP3 Converter", href: "/video-to-mp3-converter" },
        { text: "MP3 Extractor", href: "/mp3-extractor" },
      ]}
      contentBlocks={[
        {
          heading: "Free online video to audio converter",
          paragraphs: [
            "MP4 to MP3 is a free video-to-audio converter that runs entirely in your browser. Drop an MP4, MOV, WebM, MKV, AVI, or M4V file into the tool above, click Extract Audio, and within seconds you'll have a clean MP3 ready to download. There is no software to install, no plug-in to enable, and no account to create — the conversion happens on our server using FFmpeg, the same open-source framework trusted by YouTube, OBS, and almost every major media pipeline.",
            "What makes this converter different from the dozens of other online tools is its privacy model. Your uploaded video is written to a temporary directory, processed immediately by FFmpeg, and deleted the moment the MP3 is returned to your browser. We never persist, log, share, or distribute your media. If you are a creator, journalist, podcaster, or student handling sensitive footage, this matters: nothing of yours remains on our infrastructure after the conversion is complete.",
            "This tool is designed for your own content — videos you recorded, exported from your editing software, or have explicit permission to process. It is not a downloader. It does not scrape Instagram, TikTok, YouTube, or any other platform. If you arrived here looking for a way to pull audio from someone else's Reel, please use the official share features on those platforms instead.",
          ],
        },
        {
          heading: "How the video-to-audio conversion works",
          paragraphs: [
            "When you upload a video, our backend immediately passes it to FFmpeg with the libmp3lame audio encoder. FFmpeg demuxes the video container, isolates the audio stream, discards the video track, and re-encodes the audio as a Variable Bit Rate MP3 at quality 2 (approximately 190 kbps). That bitrate sits in the sweet spot between file size and perceived quality — it is transparent enough for podcasts, voice memos, music production, and personal listening, while remaining small enough to email or upload.",
            "The whole process typically takes 5 to 30 seconds depending on the length of your video and the load on the server. There is no queue, no captcha, no waiting for an email link. As soon as FFmpeg finishes, your MP3 is streamed directly back to your browser as a downloadable blob.",
          ],
          list: [
            "Step 1 — Drag and drop or browse for a video file (up to 100 MB)",
            "Step 2 — Click Extract Audio and wait for FFmpeg to process",
            "Step 3 — Click Download MP3 to save the file to your device",
          ],
        },
        {
          heading: "Common use cases for converting video to audio",
          paragraphs: [
            "There are dozens of legitimate reasons to convert a video into an audio file. Podcasters often record video interviews on Zoom or Riverside and need just the audio for their editor. Musicians record scratch takes on their phone and want a portable MP3 for the studio. Students record lectures and want to listen on the commute. Translators and transcriptionists work faster from audio than video. Whatever your reason, MP4 to MP3 handles the conversion without imposing any branding, watermarks, or sign-up friction.",
            "Because the output is a standard MP3, the resulting file will play on every modern device, browser, and audio app — from iOS Music and Android's default player to VLC, Audacity, Premiere Pro, GarageBand, and Discord uploads. There is no DRM, no special codec, and no container to worry about.",
          ],
        },
      ]}
      faqItems={[
        {
          q: "What video formats can I convert to audio?",
          a: "We support MP4, MOV, WebM, MKV, AVI, M4V, FLV, and 3GP. If your file is in a different container, try renaming the extension to .mp4 or convert it locally first — most modern video files use one of these containers internally.",
        },
        {
          q: "What is the maximum file size?",
          a: "100 MB per upload. This keeps the service fast and free for everyone. If you need to process longer files, consider trimming your video first or splitting it into shorter segments.",
        },
        {
          q: "What audio quality does the output MP3 have?",
          a: "We encode with libmp3lame at VBR quality 2, which produces approximately 190 kbps audio. This is widely regarded as 'near-transparent' — indistinguishable from the original for almost all listeners, including on high-end headphones.",
        },
        {
          q: "Can I use this to convert YouTube videos to MP3?",
          a: "No. MP4 to MP3 is built for your own video files only. It does not download or fetch content from YouTube, Instagram, TikTok, or any third-party platform. Doing so would violate copyright law and our Terms of Service.",
        },
        {
          q: "Do you keep a copy of my video?",
          a: "No. Your video is written to a temporary directory, processed by FFmpeg, and immediately deleted. We do not store, share, or analyze your media. The MP3 is delivered to your browser as a downloadable blob and is not persisted on our server either.",
        },
        {
          q: "Is this tool really free?",
          a: "Yes, 100% free with no sign-up, no watermark, and no hidden upsell. The service is supported by ads in a privacy-respecting way, which is why it can stay free for everyone.",
        },
      ]}
    />
  );
}
