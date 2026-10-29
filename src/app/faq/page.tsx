import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "FAQ – Frequently Asked Questions",
  description:
    "Answers to the most common questions about ReelAudio Studio: supported formats, file size limits, audio quality, privacy, and what you can legally extract.",
  alternates: { canonical: "/faq" },
};

const faqItems = [
  {
    q: "Is ReelAudio Studio free to use?",
    a: "Yes. ReelAudio Studio is 100% free for personal use. There are no hidden fees, no sign-up requirement, and no watermark on your output. You can extract audio from as many videos as you like, up to 100 MB per file.",
  },
  {
    q: "What file formats are supported?",
    a: "We support all major video containers — MP4, MOV, WebM, MKV, AVI, M4V, FLV, and 3GP. We also accept direct audio formats like MP3, M4A, AAC, WAV, OGG, Opus, and FLAC if you want to convert them to a standard MP3.",
  },
  {
    q: "How long does audio extraction take?",
    a: "Most videos under 100 MB are processed in 5 to 30 seconds. Our backend uses FFmpeg, the industry standard for media processing, so extraction is fast and reliable.",
  },
  {
    q: "Do you store my uploaded videos?",
    a: "No. Uploaded files are written to a temporary directory, processed immediately by FFmpeg, and deleted right after the MP3 is returned to you. We never persist, share, or distribute your media.",
  },
  {
    q: "Can I extract audio from any video on the internet?",
    a: "No. ReelAudio Studio is designed for your own content — videos you recorded, edited, or have explicit permission to use. You cannot use this tool to download audio from copyrighted material on Instagram, TikTok, YouTube, or any other platform. Doing so would violate copyright law and our Terms of Service.",
  },
  {
    q: "What audio quality does the MP3 output have?",
    a: "We use FFmpeg with the libmp3lame encoder at VBR quality 2 (~190 kbps), which delivers near-transparent audio quality suitable for podcasts, music production, video editing, and personal listening.",
  },
  {
    q: "Is there a file size limit?",
    a: "Yes, the maximum upload size is 100 MB per file. This limit helps keep the service fast and free for everyone. If you regularly need to process larger files, consider trimming your video first or using a local tool like HandBrake.",
  },
  {
    q: "Does this work on iPhone and Android?",
    a: "Yes. The website is fully responsive and works in modern mobile browsers including Safari on iOS and Chrome on Android. You can upload videos directly from your phone's camera roll or file manager.",
  },
  {
    q: "Why MP3 instead of AAC, Opus, or FLAC?",
    a: "MP3 is the most universally compatible audio format in the world. It plays on every device, browser, music app, podcast platform, and video editor — and will continue to play for decades. AAC, Opus, and FLAC are technically superior in some ways but lack universal support.",
  },
  {
    q: "Can I extract audio from a Zoom recording?",
    a: "Yes, as long as you were a participant or host of the meeting and have permission to use the recording. Just upload the MP4 file from Zoom and we'll extract the audio as MP3 — perfect for podcast editors.",
  },
  {
    q: "Can I extract audio from a video someone sent me on WhatsApp?",
    a: "Only if you have permission from the original creator. If the video contains copyrighted music, you should not extract and redistribute the audio. For personal listening only, it is generally fine in many jurisdictions, but always check local copyright law.",
  },
  {
    q: "What happens if my video has no audio track?",
    a: "We use ffprobe to verify that your video contains an audio stream before running the extraction. If no audio is detected, we return a clear error message — no MP3 is generated, and the file is deleted immediately.",
  },
  {
    q: "Do you add any watermark or intro to the MP3?",
    a: "No. The MP3 you download is exactly what FFmpeg produces — no watermark, no branding, no metadata pollution, no intro or outro. Your audio is yours.",
  },
  {
    q: "Is ReelAudio Studio affiliated with Instagram, TikTok, or YouTube?",
    a: "No. ReelAudio Studio is an independent audio-extraction utility. We are not affiliated with, endorsed by, or sponsored by any social media platform. The 'Reel' in our name refers to short video content in general — it does not imply any affiliation with Instagram Reels specifically.",
  },
  {
    q: "How can I contact you?",
    a: "You can reach us through our contact page. We typically respond within 1–2 business days for general inquiries and within 24 hours for DMCA / copyright takedown requests.",
  },
];

export default function Page() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <PageShell
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about extracting audio from video files with ReelAudio Studio."
      >
        <div className="mt-2">
          <Faq items={faqItems} title="" />
        </div>
      </PageShell>
    </>
  );
}
