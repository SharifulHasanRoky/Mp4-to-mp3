import type { Metadata } from "next";
import { LandingPage } from "@/components/landing-page";

export const metadata: Metadata = {
  title: "MOV to MP3 Converter – Free Online QuickTime to MP3 Tool",
  description:
    "Convert MOV (QuickTime) video files to MP3 audio online for free. Fast, private, FFmpeg-powered, no sign-up required. Works on iPhone, Mac, Windows.",
  keywords: [
    "mov to mp3",
    "convert mov to mp3",
    "mov to mp3 converter",
    "quicktime to mp3",
    "mov to mp3 online",
  ],
  alternates: { canonical: "/mov-to-mp3" },
};

export default function Page() {
  return (
    <LandingPage
      currentPath="/mov-to-mp3"
      h1="MOV to MP3 Converter"
      keyword="MOV to MP3"
      subtitle="Convert MOV (QuickTime) video files to high-quality MP3 audio online for free. FFmpeg-powered, private, no sign-up. Works on iPhone, Mac, Windows and Android."
      uploadTitle="Drop your MOV file here"
      uploadHint="or click to browse — MOV, MP4, WebM, MKV, AVI, MP3, WAV & more"
      buttonLabel="Convert MOV to MP3"
      highlights={[
        "Convert MOV, QuickTime, and iPhone video files to MP3",
        "FFmpeg libmp3lame encoder at VBR ~190 kbps",
        "Files deleted automatically — nothing is stored on our servers",
        "Works on iPhone, Mac, Windows, Android without installing software",
        "100% free, no watermark, no sign-up, no email required",
      ]}
      internalLinks={[
        { text: "MP4 to MP3", href: "/" },
        { text: "Video to Audio Converter", href: "/video-to-audio-converter" },
        { text: "MP3 Extractor", href: "/mp3-extractor" },
        { text: "MKV to MP3", href: "/mkv-to-mp3" },
        { text: "MP4 to WAV", href: "/mp4-to-wav" },
      ]}
      contentBlocks={[
        {
          heading: "Free online MOV to MP3 converter",
          paragraphs: [
            "MP4 to MP3 is a free MOV to MP3 converter that takes any QuickTime .mov file you upload and turns it into a clean, portable MP3 audio track. MOV is Apple's native video container — every iPhone records video as .mov by default, every QuickTime screen recording is .mov, and most macOS video tools export as .mov. If you have a voice memo, an interview, or a song recorded on an iPhone that you want to listen to as audio only, this tool extracts the audio in seconds without installing any software.",
            "Because we use FFmpeg under the hood, the conversion is exactly the same as you would get with a desktop app like HandBrake or VLC — but without the download. Your MOV file is uploaded over HTTPS, processed by FFmpeg on our server, and the resulting MP3 is delivered straight to your browser. The original MOV and the temporary MP3 are both deleted automatically once the conversion is complete. We do not store, share, or distribute your media.",
            "This tool is built for your own content only. It does not connect to Instagram, TikTok, YouTube, or any other platform. Converting copyrighted music or video that you do not own is illegal and against our Terms of Service.",
          ],
        },
        {
          heading: "How the MOV to MP3 conversion works",
          paragraphs: [
            "When you upload a MOV file, our backend passes it to FFmpeg with the libmp3lame audio encoder. FFmpeg demuxes the QuickTime container, isolates the audio stream (usually AAC inside MOV), discards the video track entirely, and re-encodes the audio as a Variable Bit Rate MP3 at quality 2 (~190 kbps). The output is a standard, universally playable MP3 file.",
            "The whole conversion typically takes 5 to 30 seconds depending on the length of your video. Because MOV often contains AAC audio (which is already lossy), there will be one generation of re-encoding to MP3 — usually imperceptible to human listeners on any consumer equipment. If you need bit-perfect lossless audio from a MOV file, consider our [[MP4 to WAV]] converter instead.",
          ],
        },
        {
          heading: "Why convert MOV to MP3?",
          paragraphs: [
            "There are many legitimate reasons to convert MOV files to MP3. iPhone users often record voice memos, interviews, or lecture snippets as video and want a portable audio file for podcast editing, transcription, or personal listening. macOS users regularly export QuickTime screen recordings and need just the audio portion. Musicians record scratch takes on iPhone and want a portable file for the studio.",
            "MP3 is the most universally compatible audio format in the world. It plays on every phone, every browser, every music app, every podcast platform, and every video editor — and it will continue to play for decades. Converting your MOV to MP3 gives you a smaller, more portable, more editable file that you can share, upload, archive, or import into any audio workflow.",
          ],
          list: [
            "Pull the audio from an iPhone-recorded video interview for a podcast editor",
            "Convert a QuickTime screen recording into an audio file for transcription",
            "Export a scratch vocal take from your iPhone for the recording studio",
            "Archive old home videos recorded on iPhone as smaller audio files",
            "Extract lecture audio from a professor's recorded video for offline listening",
          ],
        },
        {
          heading: "MOV vs MP4 — what's the difference?",
          paragraphs: [
            "Both MOV and MP4 are container formats — they wrap video and audio streams together. MOV was developed by Apple for QuickTime, while MP4 is the international standard (ISO/IEC 14496-12) based on the same underlying technology. The two formats are so similar that most files can be re-named from .mov to .mp4 (or vice versa) and still play correctly.",
            "If you have an MP4 file instead of MOV, use our [[MP4 to MP3]] converter — the audio extraction process is identical. For broader use, the [[Video to Audio Converter]] and [[MP3 Extractor]] handle any video container you throw at them.",
          ],
        },
      ]}
      faqItems={[
        {
          q: "Can I convert MOV files from my iPhone to MP3?",
          a: "Yes. iPhone records video as .mov by default. Upload the file from your camera roll or Files app, and our tool will extract the audio as MP3 in seconds. No app installation required.",
        },
        {
          q: "Will the conversion reduce audio quality?",
          a: "Slightly, because we re-encode to MP3. We use FFmpeg with libmp3lame at VBR quality 2 (~190 kbps), which produces near-transparent audio — indistinguishable from the source for almost all listeners, even on high-end equipment.",
        },
        {
          q: "What's the difference between MOV and MP4?",
          a: "Both are container formats based on the same underlying technology. MOV was created by Apple for QuickTime; MP4 is the international standard. They are so similar that files can often be re-named between extensions. For audio extraction, both formats work identically in our tool.",
        },
        {
          q: "How long does the MOV to MP3 conversion take?",
          a: "Most MOV files under 100 MB convert in 5 to 30 seconds. Extraction time depends mainly on video length, not file size — a short 4K clip will convert faster than a long 720p clip.",
        },
        {
          q: "Can I convert MOV files from QuickTime screen recordings?",
          a: "Yes. QuickTime screen recordings are saved as .mov files with an audio track (if you recorded with microphone). Upload the file and we will extract the audio as MP3 — perfect for transcription or podcast editing.",
        },
        {
          q: "Do you store my uploaded MOV files?",
          a: "No. Files are written to a temporary directory, processed by FFmpeg, and immediately deleted after the MP3 is delivered to your browser. We never persist, share, or distribute your media.",
        },
        {
          q: "Can I convert copyrighted music from someone else's MOV file?",
          a: "No. MP4 to MP3 only processes files you own or have explicit permission to use. Converting copyrighted audio without permission is illegal and against our Terms of Service.",
        },
      ]}
    />
  );
}
