import type { Metadata } from "next";
import { LandingPage } from "@/components/landing-page";

export const metadata: Metadata = {
  title: "M4A to MP4 Converter – Free Online Audio to Video Tool",
  description:
    "Convert M4A audio files (Apple voice memos, AAC audio) to MP4 video format online for free. Perfect for uploading M4A audio to YouTube and other video platforms. No sign-up.",
  keywords: [
    "m4a to mp4",
    "convert m4a to mp4",
    "m4a to mp4 converter",
    "m4a to mp4 online",
    "voice memo to mp4",
  ],
  alternates: { canonical: "/m4a-to-mp4" },
};

export default function Page() {
  return (
    <LandingPage
      currentPath="/m4a-to-mp4"
      h1="M4A to MP4 Converter"
      keyword="M4A to MP4"
      subtitle="Convert M4A audio files (Apple voice memos, AAC audio, iPhone recordings) to MP4 video format online for free. Perfect for uploading M4A audio to YouTube, Instagram, and TikTok. No sign-up."
      uploadTitle="Drop your M4A file here"
      uploadHint="or click to browse — M4A, MP3, WAV, AAC, OGG, MP4, MOV & more"
      buttonLabel="Convert M4A to MP4"
      outputFormat="mp4"
      highlights={[
        "Convert iPhone voice memos, M4A, and AAC audio to MP4 video",
        "Upload M4A audio to YouTube, Instagram, TikTok, and Facebook",
        "FFmpeg-powered — handles any audio format",
        "Files deleted automatically — private by design",
        "100% free, no watermark, no sign-up, no installation",
      ]}
      internalLinks={[
        { text: "WAV to MP4", href: "/wav-to-mp4" },
        { text: "MP4 to MP3", href: "/" },
        { text: "MOV to MP3", href: "/mov-to-mp3" },
        { text: "Video to Audio Converter", href: "/video-to-audio-converter" },
      ]}
      contentBlocks={[
        {
          heading: "Free online M4A to MP4 converter",
          paragraphs: [
            "ReelAudio Studio is a free M4A to MP4 converter that takes any M4A audio file you upload and wraps it in an MP4 video container with a static visual background. This is useful when you have an iPhone voice memo, an AAC audio file, or an M4A song that you want to upload to a video-only platform like YouTube, Instagram, TikTok, or Facebook — most of which don't accept raw audio uploads.",
            "M4A is the default audio format for Apple's Voice Memos app, iTunes purchases, and many AAC-encoded audio files. iPhone users accumulate dozens of M4A voice memos — interviews, lectures, song ideas, meetings — and often want to share them on social media as audiograms or video posts. Converting M4A to MP4 makes this possible without needing a desktop video editor.",
            "Because we use FFmpeg under the hood, the conversion is identical to what you'd get from a desktop tool. Your M4A file is uploaded over HTTPS, paired with a static black image as the video track, and encoded as a standard MP4 with H.264 video and AAC audio. The original M4A and the temporary MP4 are both deleted automatically after the conversion completes.",
            "This tool is built for your own content only. It does not connect to streaming platforms, music services, or any other platform. Converting copyrighted music or audio that you do not own is illegal and against our Terms of Service.",
          ],
        },
        {
          heading: "Why convert M4A to MP4?",
          paragraphs: [
            "M4A is an audio-only format. Many popular platforms — YouTube, Instagram, TikTok, Facebook, Twitter/X — only accept video uploads. If you want to share an iPhone voice memo, an AAC song, or an iTunes purchase on those platforms, you need to wrap your audio in a video container first.",
            "Converting M4A to MP4 solves this by adding a static visual (usually a black background or album-art image) alongside your audio. The resulting MP4 file can be uploaded to any video platform, where it will play as an audio track with a static image visible to viewers.",
            "Need to do the reverse — extract audio from MP4? Use our [[MP4 to MP3]] converter. Have a different audio format like WAV? Try our [[WAV to MP4]] converter.",
          ],
          list: [
            "Upload iPhone voice memos to YouTube as audio-only videos",
            "Share M4A songs or demos on Instagram, TikTok, or Facebook",
            "Publish interview or lecture recordings on video platforms",
            "Convert iTunes-purchased M4A tracks into uploadable MP4 files",
            "Distribute voice memos or audiograms without a video editor",
          ],
        },
        {
          heading: "How the M4A to MP4 conversion works",
          paragraphs: [
            "When you upload an M4A file, our backend passes it to FFmpeg. FFmpeg re-wraps the AAC audio stream into an MP4 container (M4A and MP4 share the same underlying codec, so usually no re-encoding is needed — just remuxing), generates a static black image as the video track (H.264, 1920×1080 by default), and produces a standard MP4 file.",
            "Because M4A and MP4 share the same audio codec (AAC), the conversion is often nearly instant — just remuxing without re-encoding. The resulting MP4 file plays in any video player, browser, or social media platform.",
          ],
        },
        {
          heading: "M4A vs MP3 vs WAV — what's the difference?",
          paragraphs: [
            "M4A, MP3, and WAV are all audio formats, but they're encoded differently:",
            "M4A uses AAC compression — better quality than MP3 at the same bitrate, but not as universally supported. M4A is the default for iPhone, iTunes, and Apple devices. MP3 uses older lossy compression — universally supported but slightly lower quality than M4A at the same bitrate. WAV is uncompressed lossless — highest quality, but much larger files.",
            "If you have a video file and want M4A-style audio, use our [[MP4 to MP3]] converter (which produces MP3) or [[MOV to MP3]] (for QuickTime files). If you want to upload M4A audio to a video platform, you're in the right place.",
          ],
        },
      ]}
      faqItems={[
        {
          q: "Will converting M4A to MP4 reduce audio quality?",
          a: "Usually no. M4A and MP4 share the same audio codec (AAC), so we can often remux without re-encoding — preserving bit-perfect audio quality. Even if re-encoding is needed, AAC at high bitrate is essentially indistinguishable from the source.",
        },
        {
          q: "Can I convert iPhone voice memos to MP4?",
          a: "Yes. iPhone Voice Memos app saves recordings as .m4a files. Upload the file from your Voice Memos app (Share > Save to Files), and our tool will wrap it in an MP4 video container you can upload to YouTube, Instagram, TikTok, or Facebook.",
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
          q: "How long does the M4A to MP4 conversion take?",
          a: "Usually 5 to 30 seconds. Because M4A and MP4 share the same codec, conversion is often just remuxing — much faster than re-encoding. Processing time depends mainly on the audio length.",
        },
        {
          q: "Can I convert copyrighted M4A music (e.g., iTunes purchases) to MP4?",
          a: "No. ReelAudio Studio only processes files you own or have explicit permission to use. iTunes purchases are DRM-protected in some cases and even without DRM, redistributing copyrighted music is illegal and against our Terms of Service.",
        },
        {
          q: "Do you store my uploaded M4A files?",
          a: "No. Files are written to a temporary directory, processed by FFmpeg, and immediately deleted after the MP4 is delivered to your browser. We never persist, share, or distribute your media.",
        },
      ]}
    />
  );
}
