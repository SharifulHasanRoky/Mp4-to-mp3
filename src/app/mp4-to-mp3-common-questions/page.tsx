import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { QuickAnswer } from "@/components/quick-answer";
import { Citations, type Citation } from "@/components/citations";
import { FileAudio } from "lucide-react";

export const metadata: Metadata = {
  title: "20 Common Questions About MP4 to MP3 Conversion",
  description:
    "Answers to 20 common questions about converting MP4 to MP3: quality, speed, privacy, legality, file size, mobile devices, and more. Honest, practical answers.",
  alternates: { canonical: "/mp4-to-mp3-common-questions" },
  openGraph: {
    title: "20 Common Questions About MP4 to MP3 Conversion",
    description:
      "Practical answers to the 20 most common MP4 to MP3 questions: quality, speed, privacy, legality, file size, iPhone, Android, Mac, Windows.",
    url: "https://www.mp4tomp3.online/mp4-to-mp3-common-questions",
    type: "article",
  },
};

const faqItems = [
  {
    q: "Does converting MP4 to MP3 reduce quality?",
    a: "Slightly. Re-encoding from MP4 (usually AAC audio) to MP3 adds one generation of lossy compression. At a modern VBR setting around 190 kbps, the result is transparent to almost all listeners on consumer equipment. Spoken-word content is effectively indistinguishable; only careful listeners on studio monitors may notice a slight high-frequency softening.",
  },
  {
    q: "How long does MP4 to MP3 conversion take?",
    a: "Most files under 100 MB convert in 10 to 60 seconds on a modern device. Browser-based conversion is typically faster than server-side because there is no upload step — the only wait is the encoding itself, which runs on your CPU. The first conversion also includes a one-time 30 MB engine download that is then cached.",
  },
  {
    q: "Is it safe to convert MP4 to MP3 online?",
    a: "Yes, if the converter is genuinely browser-based. MP4toMP3.online runs FFmpeg as WebAssembly inside your browser tab, so your video is never uploaded to a server. There is no account, no log of file contents, and no temporary server storage. Server-side converters that upload your file carry real privacy exposure.",
  },
  {
    q: "Do I need to install software to convert MP4 to MP3?",
    a: "No. A browser-based converter like MP4toMP3.online runs entirely in your browser using WebAssembly FFmpeg. Open the page, drop in your file, and download the MP3 — no installer, no admin rights, no leftover files on disk. This works on locked-down work laptops, Chromebooks, and phones.",
  },
  {
    q: "Can I convert MP4 to MP3 on iPhone?",
    a: "Yes. Open the converter in Safari on your iPhone, tap the file picker, choose Photo Library or Files, select your video, and tap Convert to MP3. The MP3 saves to your Files app. No App Store install is needed — Safari supports the WebAssembly engine directly.",
  },
  {
    q: "Can I convert MP4 to MP3 on Android?",
    a: "Yes. Open the converter in Chrome on your Android phone, tap the file picker, choose Files or Google Photos, pick your video, and tap Convert to MP3. The MP3 lands in your Downloads folder. No app install required — Chrome handles the WebAssembly engine natively.",
  },
  {
    q: "What is the difference between MP4 and MP3?",
    a: "MP4 is a video container that holds both video and audio streams. MP3 is an audio-only format with no video. Converting MP4 to MP3 means extracting the audio track and discarding the video — that is why a 30 MB MP4 can become a 3 MB MP3 without losing the audible content.",
  },
  {
    q: "Is there a file size limit for MP4 to MP3 conversion?",
    a: "Browser-based conversion is limited by your device's RAM rather than a server cap. In practice, files up to about 500 MB convert comfortably on a modern laptop, and up to around 200 MB on a phone. Very large files beyond 2 GB may run the browser out of memory before finishing.",
  },
  {
    q: "Is it legal to convert MP4 to MP3?",
    a: "Yes, when you own the video or have explicit permission — your own recordings, your own Zoom meetings, your own podcast interviews, or content licensed for reuse. Converting copyrighted content like commercial movies, songs, or TV shows without permission is illegal in most jurisdictions and against most converters' terms of service.",
  },
  {
    q: "Can I convert a YouTube video to MP3?",
    a: "No. YouTube serves video through its own player, not as a direct file, and downloading from YouTube violates their Terms of Service and copyright law. Browser-based converters like MP4toMP3.online reject URLs that point to streaming platforms. You can only convert video files you own or have explicit permission to use.",
  },
  {
    q: "What audio quality should I choose for MP3?",
    a: "For most uses, VBR around 190 kbps is the sweet spot — transparent to virtually all listeners on consumer equipment. For spoken-word content like podcasts or lectures, 128 kbps is plenty. For music you plan to listen to on high-end gear, 320 kbps CBR gives you headroom at the cost of larger files.",
  },
  {
    q: "Does the converter store my files?",
    a: "No. Browser-based converters process files entirely in your browser memory. Your video is read from disk, decoded, re-encoded as MP3, and written back to disk — it is never uploaded to a server and never stored. Closing the tab clears everything.",
  },
  {
    q: "Can I convert MP4 to MP3 without internet?",
    a: "Not with a browser-based tool — the FFmpeg engine downloads from a CDN the first time you convert, and the page itself needs to load. After the first conversion, the engine is cached, but you still need internet to open the page. For fully offline conversion, install a desktop tool like Audacity, VLC, or FFmpeg directly.",
  },
  {
    q: "Why is my converted MP3 out of sync with the video?",
    a: "MP3 is audio-only, so sync with video is not relevant — but if your extracted audio sounds delayed, choppy, or has gaps, the source MP4 may have variable frame rate or a non-standard timebase. Re-exporting the source at a constant frame rate before converting usually fixes it. Browser-based FFmpeg handles constant-frame-rate sources cleanly.",
  },
  {
    q: "Can I convert multiple MP4 files at once?",
    a: "Browser-based converters typically handle one file at a time, but you can queue as many sequential conversions as you like. For batch processing dozens of files with parallel workers, a desktop FFmpeg script or a tool like Audacity is more efficient. The browser approach wins for one-off and small-batch conversions.",
  },
  {
    q: "What formats can be converted to MP3?",
    a: "Most converters built on FFmpeg accept MP4, MOV, WebM, MKV, AVI, M4V, FLV, and 3GP as video input, plus direct audio formats like M4A, AAC, WAV, OGG, Opus, and FLAC. Output is always a standard MP3 file. The conversion pipeline is the same three steps — demux, decode, re-encode — regardless of input container.",
  },
  {
    q: "Will the MP3 have a watermark?",
    a: "Genuine browser-based converters like MP4toMP3.online do not watermark output. The MP3 is a clean audio file identical to what a desktop tool would produce at the same bitrate. Watermarks are a feature of freemium server-side converters that push you toward a paid tier to remove them.",
  },
  {
    q: "Can I convert MP4 to MP3 on a Chromebook?",
    a: "Yes. ChromeOS is built around the browser, so a browser-based converter is the native experience — no Linux container or Android app needed. Open the converter in Chrome, drop in your file, and download the MP3 to your Downloads folder.",
  },
  {
    q: "What bitrate is best for podcast audio?",
    a: "For spoken-word podcasts, 128 kbps mono or 96 kbps stereo is more than enough — speech is highly compressible and listeners rarely notice the difference above 96 kbps. For music-heavy podcasts, 192 kbps stereo is a safe choice. Higher bitrates waste bandwidth without audible benefit for speech content.",
  },
  {
    q: "How do I verify a converter really doesn't upload my file?",
    a: "Open your browser's developer tools (F12), switch to the Network tab, and drop a test file into the converter. If you see a large outgoing POST request carrying the file, the converter is server-side. If the only network activity is the initial page load and a one-time FFmpeg fetch from a CDN, the conversion is genuinely running in your browser.",
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
    citation: [
      "https://en.wikipedia.org/wiki/MP3",
      "https://ffmpeg.org/ffmpeg.html",
      "https://developer.mozilla.org/en-US/docs/WebAssembly",
    ],
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <PageShell
        title="20 Common Questions About MP4 to MP3 Conversion"
        subtitle="Practical, honest answers to the questions people actually ask about converting MP4 to MP3 — quality, speed, privacy, legality, and which device to use."
      >
        {/* Voice-search quick answer — read aloud when users ask
            "What are the most common MP4 to MP3 questions?" */}
        <QuickAnswer>
          The most common MP4 to MP3 questions cover quality loss, conversion
          speed, online safety, file size limits, mobile conversion, and
          legality. MP4toMP3.online answers all of them by running FFmpeg in
          your browser via WebAssembly — no install, no upload, no sign-up,
          with output quality matching desktop tools at the same bitrate.
        </QuickAnswer>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Why these questions matter
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Most MP4 to MP3 questions fall into a handful of recurring themes:
            will the output sound worse, is it safe to use a web tool, will it
            work on my phone, and is it legal. The answers below are the
            practical versions of those answers, written for someone who needs
            to make a decision in the next two minutes rather than read a
            technical deep-dive.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Where a question deserves more depth, the linked guides go further.
            The point of this page is to give you a fast, honest answer to each
            of the twenty questions people ask most often, and to point you at
            the right resource when you need to go deeper.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            The 20 most common questions, answered
          </h2>
          <div className="mt-4 space-y-6">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-border bg-secondary/20 p-5"
              >
                <h3 className="text-base font-semibold text-foreground">
                  {idx + 1}. {item.q}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Where to go next
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            If your question was not in this list, the{" "}
            <Link
              href="/faq"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              full FAQ page
            </Link>{" "}
            covers more. For a step-by-step walkthrough of the conversion
            itself, the{" "}
            <Link
              href="/how-to-convert-mp4-to-mp3"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              how to convert MP4 to MP3
            </Link>{" "}
            guide has screenshots for each platform, and the{" "}
            <Link
              href="/mp4-to-mp3-online"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              MP4 to MP3 online
            </Link>{" "}
            guide explains the browser-based model in depth.
          </p>
        </section>

        <Citations
          sources={[
            { title: "MP3 \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/MP3", publisher: "Wikipedia", note: "Foundational MP3 facts referenced across the FAQ answers." },
            { title: "FFmpeg documentation", url: "https://ffmpeg.org/ffmpeg.html", publisher: "FFmpeg", note: "The FFmpeg pipeline that powers browser-based MP4 to MP3 conversion." },
            { title: "WebAssembly \u2014 MDN", url: "https://developer.mozilla.org/en-US/docs/WebAssembly", publisher: "Mozilla MDN", note: "How WebAssembly lets FFmpeg run inside the browser without uploads." },
          ]}
        />

        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
          <h2 className="text-xl font-bold">Convert MP4 to MP3 now</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Free, browser-based, no sign-up, no upload. Your file never leaves
            your device.
          </p>
          <Link
            href="/#extractor"
            className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90"
          >
            <FileAudio className="h-4 w-4" /> Convert MP4 to MP3
          </Link>
        </section>
      </PageShell>
    </>
  );
}
