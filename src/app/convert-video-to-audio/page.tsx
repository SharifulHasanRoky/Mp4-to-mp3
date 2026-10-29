import type { Metadata } from "next";
import { LandingPage } from "@/components/landing-page";

export const metadata: Metadata = {
  title: "Convert Video to Audio File – Free Online Video to MP3 Tool",
  description:
    "Convert video to audio file online for free. Change any video into an MP3 audio track in seconds — fast, private, FFmpeg-powered, no sign-up required.",
  keywords: [
    "convert video to audio file",
    "change video to audio",
    "video into audio",
    "video into audio file",
    "video to audio file converter",
  ],
  alternates: { canonical: "/convert-video-to-audio" },
};

export default function Page() {
  return (
    <LandingPage
      currentPath="/convert-video-to-audio"
      h1="Convert Video to Audio File"
      keyword="convert video to audio file"
      subtitle="Change any video into an audio file (MP3) online for free. Upload a video you own, click Convert, and download your MP3 in seconds. FFmpeg-powered, private, no sign-up required."
      uploadTitle="Drop your video file here"
      uploadHint="or click to browse — MP4, MOV, WebM, MKV, AVI, MP3, WAV & more"
      buttonLabel="Convert to Audio"
      highlights={[
        "Change video into audio in seconds — no software install",
        "Supports MP4, MOV, WebM, MKV, AVI, M4V, FLV, 3GP",
        "FFmpeg libmp3lame encoder at VBR ~190 kbps",
        "Files deleted automatically — private by design",
        "100% free, no watermark, no sign-up, no email required",
      ]}
      internalLinks={[
        { text: "MP4 to MP3", href: "/" },
        { text: "Video to Audio Converter", href: "/video-to-audio-converter" },
        { text: "Extract Audio from Video", href: "/extract-audio-from-video" },
        { text: "Video to MP3 Converter", href: "/video-to-mp3-converter" },
        { text: "MP3 Extractor", href: "/mp3-extractor" },
      ]}
      contentBlocks={[
        {
          heading: "Convert video to audio file — the simple way",
          paragraphs: [
            "MP4 to MP3 is a free online tool that lets you convert video to audio file in seconds. Whether you have an MP4 from your phone, a MOV from QuickTime, a WebM from a screen recorder, or an MKV from a download, our tool takes any video file you upload and changes it into a clean, portable MP3 audio track. No software to install, no sign-up, no email verification — just drag, drop, and convert.",
            "Because we use FFmpeg under the hood, the conversion is identical to what you'd get from a desktop audio editor. Your video file is uploaded over HTTPS, the audio stream is extracted and re-encoded as MP3 using the libmp3lame encoder at VBR quality 2 (~190 kbps), and the resulting MP3 is delivered straight to your browser. The original video and the temporary MP3 are both deleted automatically once the conversion completes.",
            "This tool is built for your own content only. It does not connect to Instagram, TikTok, YouTube, or any other platform. Converting copyrighted music or video that you do not own is illegal and against our Terms of Service.",
          ],
        },
        {
          heading: "How to convert video into audio",
          paragraphs: [
            "Converting video into audio is simple: drag and drop your video file into the upload area above (or click Choose File to browse), then click the Convert to Audio button. FFmpeg extracts the audio track from your video and encodes it as a high-quality MP3 file in seconds. Click Download MP3 to save it to your device.",
            "The whole process typically takes 5 to 30 seconds depending on the length of your video. There is no queue, no captcha, no waiting for an email link. As soon as FFmpeg finishes, your MP3 is streamed directly back to your browser as a downloadable file.",
            "If you have a specific video format, try one of our dedicated converters: [[MP4 to MP3]] for MP4 files, [[Video to Audio Converter]] for general use, or [[Extract Audio from Video]] if you want to emphasize the extraction aspect.",
          ],
          list: [
            "Step 1 — Drag and drop or browse for a video file (up to 100 MB)",
            "Step 2 — Click Convert to Audio and wait for FFmpeg to process",
            "Step 3 — Click Download MP3 to save the file to your device",
          ],
        },
        {
          heading: "Why change video to audio?",
          paragraphs: [
            "There are many legitimate reasons to change video into audio. Podcasters often record interviews on Zoom or Riverside and need just the audio for their editor. Voiceover artists record scratch takes on their phone and want a portable MP3 for the studio. Students record lectures and prefer to listen on the commute. Translators and transcriptionists work faster from audio than video. Musicians capture vocal ideas on their phone and want a clean file for the studio.",
            "Whatever your reason, isolating the audio gives you a smaller, more portable, more editable file. The resulting MP3 plays on every modern device and audio app — from iOS Music, Android players, and VLC to Audacity, Premiere Pro, GarageBand, and Discord uploads.",
            "For more specific use cases, see our [[Video to MP3 Converter]] page or the dedicated [[MP3 Extractor]] tool.",
          ],
        },
        {
          heading: "What video formats can I change to audio?",
          paragraphs: [
            "We support all major video containers — MP4, MOV, WebM, MKV, AVI, M4V, FLV, and 3GP. We also accept direct audio formats like MP3, M4A, AAC, WAV, OGG, Opus, and FLAC if you want to convert them to a standard MP3 for universal compatibility.",
            "For format-specific pages with tailored SEO content, try our [[MP4 to MP3]] converter (the most popular), [[Video to Audio Converter]] (general), or [[Video to MP3 Converter]] (action-focused).",
          ],
        },
      ]}
      faqItems={[
        {
          q: "How do I convert a video into an audio file?",
          a: "Drag and drop your video into the upload area above, then click Convert to Audio. FFmpeg extracts the audio track and encodes it as MP3 in seconds. Click Download MP3 to save the file to your device.",
        },
        {
          q: "What video formats can I convert to audio?",
          a: "We support MP4, MOV, WebM, MKV, AVI, M4V, FLV, and 3GP. We also accept direct audio files (MP3, M4A, AAC, WAV, OGG, Opus, FLAC) if you want to standardize them on MP3.",
        },
        {
          q: "How long does it take to change video to audio?",
          a: "Most videos under 100 MB convert in 5 to 30 seconds. FFmpeg is incredibly efficient — extraction time depends mostly on video length, not file size, so a short 4K clip will convert faster than a long 720p clip.",
        },
        {
          q: "What audio format does the output use?",
          a: "MP3, encoded with libmp3lame at VBR quality 2 (~190 kbps). MP3 is the most universally compatible audio format — it plays on every device, browser, music app, podcast platform, and video editor.",
        },
        {
          q: "Is there a file size limit?",
          a: "Yes — 100 MB per upload. This keeps the service fast and free for everyone. If you regularly need to convert larger files, consider trimming your video first or using a local tool like HandBrake.",
        },
        {
          q: "Can I convert copyrighted video to audio?",
          a: "No. MP4 to MP3 only processes files you own or have explicit permission to use. Converting copyrighted music or video is illegal and against our Terms of Service.",
        },
        {
          q: "Do you store my uploaded videos?",
          a: "No. Files are written to a temporary directory, processed by FFmpeg, and immediately deleted after the MP3 is delivered to your browser. We never persist, share, or distribute your media.",
        },
      ]}
    />
  );
}
