import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { QuickAnswer } from "@/components/quick-answer";

export const metadata: Metadata = {
  title: "FAQ – Frequently Asked Questions",
  description:
    "Answers to the most common questions about MP4 to MP3: supported formats, file size limits, audio quality, privacy, and what you can legally extract.",
  alternates: { canonical: "/faq" },
};

const faqItems = [
  // Voice-search-friendly questions first — these are the ones people
  // actually speak to Google Assistant, Alexa, and Siri. They're written
  // in conversational English and the answers start directly with the
  // answer (no "Yes," no "Sure," no fluff) so the first ~40-60 words can
  // be read aloud by voice assistants.

  {
    q: "How do I convert MP4 to MP3?",
    a: "Upload your MP4 file to MP4toMP3.online, click Convert to MP3, and download the resulting MP3 audio file. The conversion runs entirely in your browser using FFmpeg.wasm — your video never leaves your device. The whole process takes about 30 seconds for a typical short video.",
  },
  {
    q: "Can I convert MP4 to MP3 online for free?",
    a: "Yes. MP4toMP3.online is 100% free with no sign-up, no watermark, and no software install. You can convert as many videos as you want, up to 500 MB per file. There are no hidden fees or premium tiers — every feature is available to every user.",
  },
  {
    q: "Do I need software to convert MP4 to MP3?",
    a: "No. MP4toMP3.online runs entirely in your browser — no software install required. Just open the website in Chrome, Firefox, Safari, or Edge, upload your MP4 file, and click Convert. The conversion happens on your device using FFmpeg compiled to WebAssembly, so nothing is uploaded to a server.",
  },
  {
    q: "How do I convert MP4 to MP3 on iPhone?",
    a: "Open MP4toMP3.online in Safari on your iPhone, tap Choose File, select Photo Library, pick your video, and tap Convert to MP3. The MP3 file will be saved to your Files app. The whole process takes about 30 seconds and works on any iPhone running iOS 13 or later.",
  },
  {
    q: "How do I convert MP4 to MP3 on Android?",
    a: "Open MP4toMP3.online in Chrome on your Android phone, tap Choose File, select Files or Photo Library, pick your video, and tap Convert to MP3. The MP3 will save to your Downloads folder. No app install is needed — it works entirely in the browser.",
  },
  {
    q: "How do I convert MP4 to MP3 on Mac?",
    a: "Open MP4toMP3.online in Safari, Chrome, or Firefox on your Mac, drag and drop your MP4 file onto the upload area, click Convert to MP3, and the MP3 will download to your Downloads folder. No software install, no QuickTime, no iTunes required.",
  },
  {
    q: "How do I convert MP4 to MP3 on Windows?",
    a: "Open MP4toMP3.online in Chrome, Edge, or Firefox on your Windows PC, drag and drop your MP4 file onto the upload area, click Convert to MP3, and the MP3 will save to your Downloads folder. No software install required — works on Windows 10 and Windows 11.",
  },
  {
    q: "What is the difference between MP4 and MP3?",
    a: "MP4 is a video container that holds both video and audio. MP3 is an audio-only format with no video. Converting MP4 to MP3 simply means taking the audio track out of a video file and saving it as a standalone audio file. The video portion is discarded.",
  },
  {
    q: "Does converting MP4 to MP3 reduce quality?",
    a: "Slightly. MP4 to MP3 conversion re-encodes the audio using lossy compression. However, MP4toMP3.online uses the libmp3lame encoder at VBR quality 2 (approximately 190 kbps), which produces near-transparent audio — indistinguishable from the source for almost all listeners, even on high-end equipment.",
  },
  {
    q: "Is it safe to use an online MP4 to MP3 converter?",
    a: "Yes, MP4toMP3.online is safe. All conversion happens in your browser using FFmpeg.wasm — your video file never leaves your device and is never uploaded to a server. There is no account, no tracking of file contents, and no storage of your media. Your privacy is fully protected.",
  },
  {
    q: "How long does MP4 to MP3 conversion take?",
    a: "Most videos under 100 MB convert in 10 to 60 seconds. Conversion speed depends on the length of your video, the speed of your device, and your internet connection (the FFmpeg engine downloads once, about 30 MB, then is cached for future conversions).",
  },
  {
    q: "Can I convert MP4 to MP3 without internet?",
    a: "Not with MP4toMP3.online — the FFmpeg.wasm engine downloads from a CDN the first time you convert. After that, your browser may cache it, but you still need internet to load the page. For offline conversion, install a desktop tool like Audacity, VLC, or FFmpeg directly.",
  },
  {
    q: "Can I convert a Google Drive video to MP3?",
    a: "Yes. Switch to the From URL mode in MP4toMP3.online, paste your Google Drive share link (the file must be shared as Anyone with the link), and click Convert. We automatically convert the share link to a direct download URL and extract the audio.",
  },
  {
    q: "Can I convert YouTube videos to MP3?",
    a: "No. MP4toMP3.online cannot convert YouTube videos. YouTube serves video through its own player, not as a direct video file, and downloading from YouTube violates their Terms of Service and copyright law. You can only convert video files you own or have explicit permission to use.",
  },
  {
    q: "What audio quality does the MP3 output have?",
    a: "MP4toMP3.online uses the libmp3lame encoder at Variable Bit Rate quality 2, which produces approximately 190 kbps audio. This is widely considered near-transparent — indistinguishable from the source for almost all listeners, suitable for podcasts, music production, video editing, and personal listening.",
  },
  {
    q: "What file formats can be converted to MP3?",
    a: "MP4toMP3.online supports MP4, MOV, WebM, MKV, AVI, M4V, FLV, and 3GP as video input formats. It also accepts direct audio formats like MP3, M4A, AAC, WAV, OGG, Opus, and FLAC if you want to standardize them on MP3. Output is always a standard MP3 file.",
  },
  {
    q: "Is there a file size limit for MP4 to MP3 conversion?",
    a: "Yes, the maximum file size is 500 MB per file. Since conversion happens entirely in your browser, the limit is based on browser memory and processing time, not server upload. Larger files may take a few minutes to convert on slower devices.",
  },
  {
    q: "Are online MP4 to MP3 converters legal?",
    a: "Yes, converting MP4 to MP3 is legal when you own the video or have explicit permission to use it — for example, your own recordings, your own Zoom meetings, your own podcast interviews. Converting copyrighted content (movies, songs, TV shows) without permission is illegal and against our Terms of Service.",
  },
  {
    q: "Do you store my uploaded files?",
    a: "No. MP4toMP3.online processes all files entirely in your browser using FFmpeg.wasm. Your video never leaves your device, is never uploaded to a server, and is never stored. There is no server-side storage of any media.",
  },
  {
    q: "Can I extract audio from a Zoom recording?",
    a: "Yes. Upload the MP4 file from Zoom to MP4toMP3.online and click Convert to MP3. The audio track will be extracted as a high-quality MP3, perfect for podcast editors. As long as you were the host or participant with permission to record, this is fully legal.",
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
        subtitle="Everything you need to know about converting MP4 to MP3 — answers written for both voice search and quick reading."
      >
        {/* Voice-search-friendly quick answer — read aloud by Google
            Assistant / Alexa / Siri when users ask "What is MP4 to MP3?" */}
        <QuickAnswer label="What is MP4toMP3.online?">
          MP4toMP3.online is a free online tool that converts MP4 video files
          to MP3 audio files. Upload your video, click Convert to MP3, and
          download the audio. Everything runs in your browser — no software
          install, no sign-up, no upload to a server. Free, private, and
          takes about 30 seconds.
        </QuickAnswer>

        <div className="mt-2">
          <Faq items={faqItems} title="" />
        </div>
      </PageShell>
    </>
  );
}
