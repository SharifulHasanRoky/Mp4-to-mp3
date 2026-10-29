import type { Metadata } from "next";
import { LandingPage } from "@/components/landing-page";

export const metadata: Metadata = {
  title: "Extract Audio from Video – Free Online Audio Extractor",
  description:
    "Get audio from video free. Extract audio from any video file (MP4, MOV, WebM, MKV, AVI) and save as MP3. Fast, private, FFmpeg-powered. No sign-up, no watermark.",
  keywords: [
    "extract audio from video",
    "get audio from video",
    "extracting audio from video",
    "extract audio from mp4",
    "pull audio from video",
    "rip audio from video",
  ],
  alternates: { canonical: "/extract-audio-from-video" },
};

export default function Page() {
  return (
    <LandingPage
      currentPath="/extract-audio-from-video"
      h1="Extract Audio from Video"
      keyword="extract audio from video"
      subtitle="Get audio from any video file you own — MP4, MOV, WebM, MKV, AVI — and save it as a clean MP3. Powered by FFmpeg, processed privately, deleted automatically. No sign-up required."
      uploadTitle="Drop your video file here"
      uploadHint="or click to browse — MP4, MOV, WebM, MKV, AVI, MP3, WAV & more"
      buttonLabel="Extract Audio"
      highlights={[
        "Works with MP4, MOV, WebM, MKV, AVI, M4V, FLV and 3GP",
        "Output is a standard, universally-playable MP3 file",
        "FFmpeg libmp3lame encoder at VBR ~190 kbps",
        "No watermark, no sign-up, no email, no installation",
        "Files deleted right after extraction — privacy-first",
      ]}
      internalLinks={[
        { text: "MP4 to MP3", href: "/" },
        { text: "Video to Audio Converter", href: "/video-to-audio-converter" },
        { text: "MP3 Extractor", href: "/mp3-extractor" },
        { text: "Convert Video to Audio", href: "/convert-video-to-audio" },
      ]}
      contentBlocks={[
        {
          heading: "How to extract audio from a video file",
          paragraphs: [
            "Extracting audio from a video means separating the audio track from the visual track and saving it as a standalone audio file. ReelAudio Studio does this with FFmpeg, the open-source media framework trusted by virtually every professional video pipeline. When you upload a video, FFmpeg demuxes the container, isolates the audio stream, re-encodes it as MP3 using the libmp3lame encoder, and discards the video entirely — leaving you with a clean, portable audio file.",
            "The whole extraction takes just a few seconds for typical videos under 100 MB. There is no queue, no email verification, no waiting for a download link to arrive in your inbox. Click Extract Audio, wait for the spinner to finish, and your MP3 is delivered straight to your browser as a downloadable file.",
            "This tool is built for your own videos — files you recorded, exported from your editor, or have explicit permission to process. It does not fetch, scrape, or download content from Instagram, TikTok, YouTube, Facebook, or any other third-party platform. If you are looking for a way to download audio from someone else's Reel or video, please use the official share features on those platforms instead — scraping copyrighted content is illegal and against our Terms of Service.",
          ],
        },
        {
          heading: "Why extract the audio track separately?",
          paragraphs: [
            "There are many legitimate reasons to separate audio from video. Podcasters often record interviews on Zoom or Riverside and need just the audio for their editor. Voiceover artists record scratch takes on their phone and want a portable MP3 for the studio. Students record lectures and prefer to listen on the commute. Translators and transcriptionists work faster from audio than video. Whatever your reason, isolating the audio gives you a smaller, more portable, more editable file.",
            "Because the output is a standard MP3, the resulting file plays on every modern device and audio app — from iOS Music, Android players, and VLC to Audacity, Premiere Pro, GarageBand, and Discord uploads. There is no DRM, no special codec requirement, and no container to worry about. The MP3 will still play perfectly in 20 years.",
          ],
        },
        {
          heading: "Technical details of the extraction process",
          paragraphs: [
            "We use FFmpeg with the following command structure: ffmpeg -i input -vn -map a -acodec libmp3lame -q:a 2 output.mp3. The -vn flag tells FFmpeg to ignore the video stream, -map a selects only audio streams, libmp3lame is the MP3 encoder, and -q:a 2 sets Variable Bit Rate quality 2 (approximately 190 kbps).",
            "VBR quality 2 is widely considered 'near-transparent' — meaning even trained listeners on high-end equipment struggle to distinguish it from the original source. It's the quality setting used by most professional podcast and music distribution workflows. The resulting MP3 file is small enough to email, upload to Discord, or store on a phone, but high enough quality for any consumer playback scenario.",
          ],
        },
      ]}
      faqItems={[
        {
          q: "What does 'extract audio from video' actually mean?",
          a: "It means separating the audio track from the visual track inside a video container (like MP4 or MOV) and saving that audio as a standalone audio file (like MP3). The video portion is discarded, leaving you with just the sound.",
        },
        {
          q: "Will extracting audio reduce the quality?",
          a: "Slightly, because we re-encode the audio to MP3. However, at VBR quality 2 (~190 kbps), the loss is essentially inaudible to humans. If your source already uses a lossy codec like AAC (which most MP4 files do), there will be one generation of re-encoding — usually imperceptible.",
        },
        {
          q: "What happens if my video has no audio track?",
          a: "We use ffprobe to check for an audio stream before running the extraction. If no audio is detected, you'll see a clear error message and no MP3 will be generated.",
        },
        {
          q: "Can I extract audio from a video I found on Instagram or TikTok?",
          a: "No. This tool only accepts files you upload yourself. It does not connect to Instagram, TikTok, YouTube, or any other platform. Downloading copyrighted audio from those platforms is illegal and against our Terms of Service.",
        },
        {
          q: "How fast is the extraction?",
          a: "Most videos under 100 MB are processed in 5 to 30 seconds. FFmpeg is incredibly efficient — extraction time depends mostly on the length of the video, not the file size, so a short 4K clip will extract faster than a long 720p clip.",
        },
        {
          q: "Is my video kept on your servers?",
          a: "No. Your video is written to a temporary directory, processed by FFmpeg, and immediately deleted. The MP3 output is delivered to your browser as a downloadable blob and is not persisted on our server either.",
        },
      ]}
    />
  );
}
