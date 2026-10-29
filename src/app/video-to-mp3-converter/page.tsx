import type { Metadata } from "next";
import { LandingPage } from "@/components/landing-page";

export const metadata: Metadata = {
  title: "Video to MP3 Converter – Free Online Tool (No Sign-up)",
  description:
    "Convert video to MP3 online for free. Change any video (MP4, MOV, WebM, MKV, AVI) to MP3 in seconds. FFmpeg-powered, private, no sign-up, no watermark.",
  keywords: [
    "video to mp3",
    "convert video to mp3",
    "video to mp3 converter",
    "change video to mp3",
    "video to mp3 online",
    "free video to mp3 converter",
  ],
  alternates: { canonical: "/video-to-mp3-converter" },
};

export default function Page() {
  return (
    <LandingPage
      currentPath="/video-to-mp3-converter"
      h1="Video to MP3 Converter"
      keyword="video to MP3 converter"
      subtitle="Convert any video file you own into a high-quality MP3 audio track in seconds. Free online video-to-MP3 converter powered by FFmpeg — no sign-up, no watermark, files deleted automatically."
      uploadTitle="Drop your video file here"
      uploadHint="or click to browse — MP4, MOV, WebM, MKV, AVI, MP3, WAV & more"
      buttonLabel="Convert to MP3"
      highlights={[
        "Convert MP4, MOV, WebM, MKV, AVI, M4V, FLV, 3GP to MP3",
        "FFmpeg libmp3lame encoder at VBR ~190 kbps",
        "Fast — most videos convert in under 30 seconds",
        "100% private — no permanent storage, no tracking",
        "No watermark, no sign-up, completely free",
      ]}
      internalLinks={[
        { text: "MP4 to MP3", href: "/" },
        { text: "Video to Audio Converter", href: "/video-to-audio-converter" },
        { text: "Convert Video to Audio", href: "/convert-video-to-audio" },
        { text: "MP3 Extractor", href: "/mp3-extractor" },
      ]}
      contentBlocks={[
        {
          heading: "Convert video to MP3 — the fast, free way",
          paragraphs: [
            "ReelAudio Studio is a free online video-to-MP3 converter that takes any video file you upload and turns it into a clean, portable MP3 audio file. Whether you recorded a podcast on Zoom, exported a video from your editing software, captured a voice memo on your phone, or pulled a clip from your own camera, this tool extracts just the audio and saves it as a universally playable MP3.",
            "Conversion is powered by FFmpeg, the same open-source media framework used by YouTube, Vimeo, OBS Studio, and almost every major media pipeline. We use the libmp3lame encoder at Variable Bit Rate quality 2 (~190 kbps), which is widely regarded as the sweet spot between file size and audio quality. The output is 'near-transparent' — indistinguishable from the source for almost all listeners, including on high-end equipment.",
            "This tool is built for your own content only. It does not connect to, scrape, or download videos from Instagram, TikTok, YouTube, Facebook, or any other platform. Converting copyrighted music or video that you don't own is illegal and against our Terms of Service. If you arrived here looking to download audio from someone else's content, please use the official share features on those platforms instead.",
          ],
        },
        {
          heading: "Why convert video to MP3?",
          paragraphs: [
            "MP3 is the most universally compatible audio format in the world. It plays on every phone, every browser, every music app, every podcast platform, and every video editor — and it will continue to play for decades. Converting your video to MP3 gives you a smaller, more portable, more editable file that you can share, upload, archive, or import into any audio workflow.",
            "Common reasons to convert video to MP3 include: pulling the audio from a Zoom recording for a podcast editor, exporting a scratch vocal take from a phone video for the studio, archiving old home videos as audio files, extracting lecture audio for offline listening, preparing a voiceover sample for a portfolio, or just saving a favorite personal moment as an audio file.",
            "Whatever your reason, ReelAudio Studio handles the conversion cleanly. There is no watermark, no branding, no intro or outro, and no metadata pollution. The MP3 you download is exactly what FFmpeg produces — nothing more, nothing less.",
          ],
        },
        {
          heading: "Supported input formats and quality",
          paragraphs: [
            "We accept MP4, MOV, WebM, MKV, AVI, M4V, FLV, and 3GP as video inputs. We also accept direct audio files (MP3, M4A, AAC, WAV, OGG, Opus, FLAC) if you want to convert them to standard MP3 for compatibility. The maximum file size is 100 MB per upload, which covers the vast majority of personal audio extraction tasks.",
            "Output is always MP3, encoded with libmp3lame at VBR quality 2 (~190 kbps). This setting is recommended by the LAME developers themselves as the sweet spot for high-quality encoding, and it is the same setting used by most professional podcast and music distribution workflows. The output is compatible with iOS Music, Android's default player, VLC, Audacity, Premiere Pro, GarageBand, Discord, YouTube upload, podcast hosts, and every other modern audio consumer.",
            "We chose VBR (Variable Bit Rate) over CBR (Constant Bit Rate) because VBR allocates more bits to complex sections and fewer bits to simple sections, producing a smaller file with better perceived quality. For voice content, this means smaller files; for music content, this means richer detail in dense passages.",
          ],
        },
      ]}
      faqItems={[
        {
          q: "What video formats can I convert to MP3?",
          a: "MP4, MOV, WebM, MKV, AVI, M4V, FLV, and 3GP. We also accept direct audio files (MP3, M4A, AAC, WAV, OGG, Opus, FLAC) if you want to standardize them on MP3.",
        },
        {
          q: "What MP3 quality does the converter output?",
          a: "We use libmp3lame at VBR quality 2 (~190 kbps). This is widely regarded as 'near-transparent' — indistinguishable from the source for almost all listeners, even on high-end equipment.",
        },
        {
          q: "How long does the conversion take?",
          a: "Most videos under 100 MB convert in 5 to 30 seconds. Extraction time depends mainly on video length, not file size — a short 4K clip will convert faster than a long 720p clip.",
        },
        {
          q: "Is there a file size limit?",
          a: "Yes — 100 MB per upload. This keeps the service fast and free for everyone. If you need to convert larger files regularly, consider installing FFmpeg locally or using a desktop tool like HandBrake.",
        },
        {
          q: "Can I convert YouTube or Instagram videos to MP3?",
          a: "No. ReelAudio Studio only processes files you upload yourself. It does not fetch, scrape, or download videos from any third-party platform. Converting copyrighted audio is illegal and against our Terms of Service.",
        },
        {
          q: "Are my uploaded videos stored on your server?",
          a: "No. Your video is written to a temporary directory, processed by FFmpeg, and immediately deleted. The MP3 is delivered to your browser as a downloadable blob and is not persisted on our server either. We do not store, share, or distribute your media.",
        },
      ]}
    />
  );
}
