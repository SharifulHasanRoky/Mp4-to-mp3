import type { Metadata } from "next";
import { LandingPage } from "@/components/landing-page";

export const metadata: Metadata = {
  title: "WAV to MP4 Converter – Free Online Audio to Video Tool",
  description:
    "Convert WAV audio files to MP4 video format online for free. Perfect for uploading audio to video-only platforms. FFmpeg-powered, private, no sign-up required.",
  keywords: [
    "wav to mp4",
    "convert wav to mp4",
    "wav to mp4 converter",
    "wav to mp4 online",
    "audio to video converter",
  ],
  alternates: { canonical: "/wav-to-mp4" },
};

export default function Page() {
  return (
    <LandingPage
      currentPath="/wav-to-mp4"
      h1="WAV to MP4 Converter"
      keyword="WAV to MP4"
      subtitle="Convert WAV audio files to MP4 video format online for free. Perfect for uploading audio to video-only platforms like YouTube, Instagram, and TikTok. FFmpeg-powered, private, no sign-up."
      uploadTitle="Drop your WAV file here"
      uploadHint="or click to browse — WAV, MP3, M4A, AAC, OGG, MP4, MOV & more"
      buttonLabel="Convert WAV to MP4"
      outputFormat="mp4"
      highlights={[
        "Convert WAV audio to MP4 video with a static image background",
        "Upload audio to YouTube, Instagram, TikTok, and other video platforms",
        "FFmpeg-powered — handles any audio format",
        "Files deleted automatically — private by design",
        "100% free, no watermark, no sign-up, no installation",
      ]}
      internalLinks={[
        { text: "MP4 to MP3", href: "/" },
        { text: "MP4 to WAV", href: "/mp4-to-wav" },
        { text: "M4A to MP4", href: "/m4a-to-mp4" },
        { text: "Video to Audio Converter", href: "/video-to-audio-converter" },
      ]}
      contentBlocks={[
        {
          heading: "Free online WAV to MP4 converter",
          paragraphs: [
            "MP4 to MP3 is a free WAV to MP4 converter that takes any WAV audio file you upload and wraps it in an MP4 video container with a static visual background. This is useful when you have audio (a podcast, song, voice memo, lecture, or interview) that you want to upload to a video-only platform like YouTube, Instagram, TikTok, or Facebook — most of which don't accept raw audio uploads.",
            "Because we use FFmpeg under the hood, the conversion is identical to what you'd get from a desktop video editor. Your WAV file is uploaded over HTTPS, paired with a static image (a black background by default), and encoded as a standard MP4 file with H.264 video and AAC audio. The original WAV and the temporary MP4 are both deleted automatically after the conversion completes.",
            "This tool is built for your own content only. It does not connect to streaming platforms, music services, or any other platform. Converting copyrighted music or audio that you do not own is illegal and against our Terms of Service.",
          ],
        },
        {
          heading: "Why convert WAV to MP4?",
          paragraphs: [
            "WAV is an audio-only format. Many popular platforms — YouTube, Instagram, TikTok, Facebook, Twitter/X — only accept video uploads. If you want to share a podcast episode, a song, a lecture, or an interview on those platforms, you need to wrap your audio in a video container first.",
            "Converting WAV to MP4 solves this by adding a static visual (usually a black background or album-art image) alongside your audio. The resulting MP4 file can be uploaded to any video platform, where it will play as an audio track with a static image visible to viewers.",
            "If you need to do the reverse — extract audio from an MP4 video — use our [[MP4 to MP3]] or [[MP4 to WAV]] converter. To convert a different audio format like M4A, try our [[M4A to MP4]] converter.",
          ],
          list: [
            "Upload podcast episodes to YouTube as audio-only videos",
            "Share songs or demos on Instagram, TikTok, or Facebook",
            "Publish lecture or interview audio on video platforms",
            "Distribute voice memos or audiograms without a video editor",
            "Convert any audio file into a format video platforms accept",
          ],
        },
        {
          heading: "How the WAV to MP4 conversion works",
          paragraphs: [
            "When you upload a WAV file, our backend passes it to FFmpeg. FFmpeg re-encodes the WAV audio as AAC (the standard audio codec for MP4), generates a static black image as the video track (H.264, 1920×1080 by default), and muxes both into a standard MP4 container. The audio quality is preserved as closely as possible — AAC at a high bitrate is essentially indistinguishable from WAV for most listeners.",
            "The whole conversion typically takes 10 to 60 seconds depending on the length of your audio. The output file is a standard MP4 that will play in any video player, browser, or social media platform.",
          ],
        },
        {
          heading: "WAV to MP4 vs MP4 to WAV — what's the difference?",
          paragraphs: [
            "These are opposite conversions. WAV to MP4 takes audio and wraps it in a video container (useful for uploading audio to video platforms). MP4 to WAV takes a video file and extracts just the audio as a lossless WAV file (useful for editing and archival).",
            "If you have a video file and want the audio, use [[MP4 to WAV]] or [[MP4 to MP3]]. If you have audio and want a video, you're in the right place — upload your WAV above.",
          ],
        },
      ]}
      faqItems={[
        {
          q: "Will converting WAV to MP4 reduce audio quality?",
          a: "Slightly. We re-encode the WAV (lossless) to AAC (lossy) inside the MP4 container. At a high bitrate, AAC is essentially indistinguishable from WAV for almost all listeners. If you need bit-perfect lossless audio, keep the WAV file instead.",
        },
        {
          q: "What does the video look like?",
          a: "By default, the video track is a static black image (1920×1080). This is the standard format for audio-only uploads to YouTube and other platforms. We do not currently support custom background images, but you can overlay your own image in any video editor afterward.",
        },
        {
          q: "Can I upload the resulting MP4 to YouTube?",
          a: "Yes. The output is a standard MP4 with H.264 video and AAC audio — exactly the format YouTube, Instagram, TikTok, and Facebook expect. Upload it like any other video file.",
        },
        {
          q: "How long does the WAV to MP4 conversion take?",
          a: "Most WAV files under 100 MB convert in 10 to 60 seconds. The audio is re-encoded to AAC, which takes longer than simple extraction. Processing time depends mainly on the audio length.",
        },
        {
          q: "What audio formats can I convert to MP4?",
          a: "WAV, MP3, M4A, AAC, OGG, Opus, FLAC — basically any audio format FFmpeg can decode. The output is always a standard MP4 with AAC audio and a static image video track.",
        },
        {
          q: "Can I convert copyrighted music from a WAV file to MP4?",
          a: "No. MP4 to MP3 only processes files you own or have explicit permission to use. Converting copyrighted music is illegal and against our Terms of Service.",
        },
        {
          q: "Do you store my uploaded WAV files?",
          a: "No. Files are written to a temporary directory, processed by FFmpeg, and immediately deleted after the MP4 is delivered to your browser. We never persist, share, or distribute your media.",
        },
      ]}
    />
  );
}
