import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { Citations, type Citation } from "@/components/citations";
import { FileAudio, Film, Download, Check } from "lucide-react";
import Link from "next/link";

const sources: Citation[] = [
  {
    title: "MP3 — Wikipedia",
    url: "https://en.wikipedia.org/wiki/MP3",
    publisher: "Wikipedia",
    note: "Confirms MP3 as the universally compatible output format produced by the extraction step.",
  },
  {
    title: "MPEG-4 — Wikipedia",
    url: "https://en.wikipedia.org/wiki/MPEG-4",
    publisher: "Wikipedia",
    note: "Defines the MP4 container that the source video arrives in and how its audio/video streams are multiplexed.",
  },
  {
    title: "FFmpeg — Wikipedia",
    url: "https://en.wikipedia.org/wiki/FFmpeg",
    publisher: "Wikipedia",
    note: "Documents the open-source FFmpeg framework that demuxes the container and re-encodes the audio as MP3.",
  },
  {
    title: "LAME — Wikipedia",
    url: "https://en.wikipedia.org/wiki/LAME",
    publisher: "Wikipedia",
    note: "Describes libmp3lame, the encoder invoked at VBR ~190 kbps during the extraction.",
  },
  {
    title: "Fair use — Wikipedia",
    url: "https://en.wikipedia.org/wiki/Fair_use",
    publisher: "Wikipedia",
    note: "Underpins the guidance on only extracting audio from files you own or have explicit permission to process.",
  },
];

export const metadata: Metadata = {
  title: "How to Use – MP4 to MP3 Guide",
  description:
    "Step-by-step guide to extract audio from your own video files using MP4 to MP3. Upload a video, extract the audio, download the MP3 — all in under a minute.",
  alternates: { canonical: "/how-to-use" },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Use – MP4 to MP3 Guide",
    description:
      "Step-by-step guide to extract audio from your own video files using MP4 to MP3. Upload a video, extract the audio, download the MP3 — all in under a minute.",
    author: { "@type": "Organization", name: "MP4toMP3.online" },
    publisher: { "@type": "Organization", name: "MP4toMP3.online" },
    mainEntityOfPage: "https://www.mp4tomp3.online/how-to-use",
    datePublished: "2026-11-16",
    dateModified: "2026-11-16",
    citation: [
      "https://en.wikipedia.org/wiki/MP3",
      "https://en.wikipedia.org/wiki/MPEG-4",
      "https://en.wikipedia.org/wiki/FFmpeg",
      "https://en.wikipedia.org/wiki/LAME",
      "https://en.wikipedia.org/wiki/Fair_use",
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell
        title="How to use MP4 to MP3"
        subtitle="A complete step-by-step guide to extract audio from your own video files in under a minute."
      >
      <p className="text-base leading-relaxed text-muted-foreground">
        MP4 to MP3 is designed to be self-explanatory — drag, drop,
        extract, download. But if you are new to audio extraction or want to
        make sure you are getting the best results, here is a detailed walk-through
        of every step.
      </p>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">The 3-step process</h2>
        <ol className="mt-4 space-y-5">
          <li className="flex gap-4">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Film className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-lg font-semibold">1. Upload your video</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Drag and drop a video file into the upload area, or click{" "}
                <em>Choose File</em> to browse your device. We accept MP4, MOV,
                WebM, MKV, AVI, M4V, FLV, and 3GP — up to 100 MB per file. Only
                upload videos you own or have explicit permission to process.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FileAudio className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-lg font-semibold">2. Extract the audio</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Click the <em>Extract Audio</em> button. Your file is uploaded
                to our server and passed to FFmpeg, which demuxes the container,
                isolates the audio stream, discards the video, and re-encodes
                the audio as MP3 using libmp3lame at VBR ~190 kbps. Most videos
                under 100 MB finish in 5 to 30 seconds.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Download className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-lg font-semibold">3. Download your MP3</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                When extraction is complete, click <em>Download MP3</em>. The
                file is saved to your device&apos;s default download folder with
                the same base name as your uploaded video, but with a{" "}
                <code>.mp3</code> extension. The original video and the
                temporary MP3 are both deleted from our server immediately.
              </p>
            </div>
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Best practices</h2>
        <ul className="mt-3 space-y-2 text-base leading-relaxed text-muted-foreground">
          <li className="flex items-start gap-2">
            <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
            <span>
              Use a stable internet connection — large files can take a while
              to upload over slow networks.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
            <span>
              If your file is larger than 100 MB, trim it locally first using
              your phone&apos;s Photos app or a free tool like HandBrake.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
            <span>
              Keep the original video on your device until you have verified
              the MP3 plays correctly.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
            <span>
              If you hear no audio in the extracted MP3, your source video may
              not have an audio track — we will show you a clear error message
              in that case.
            </span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">
          What you cannot do with this tool
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          MP4 to MP3 is a personal audio-extraction utility. It is not a
          downloader, it is not a scraper, and it does not connect to any
          third-party platform. Specifically, you cannot use this tool to:
        </p>
        <ul className="mt-3 space-y-2 text-base leading-relaxed text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-destructive" />
            <span>Download or convert audio from YouTube, TikTok, Instagram, Facebook, or any other streaming/social platform</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-destructive" />
            <span>Convert copyrighted music from any video you don&apos;t own</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-destructive" />
            <span>Rip audio from movies, TV shows, or streaming services</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-destructive" />
            <span>
              Extract audio from any content you do not own or have
              permission to use
            </span>
          </li>
        </ul>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Doing so would violate copyright law and our{" "}
          <Link
            href="/terms"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Terms of Service
          </Link>
          .
        </p>
      </section>

      <Citations sources={sources} />

      <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
        <h2 className="text-xl font-bold">Ready to try it?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Head back to the homepage and extract your first MP3 — it takes less
          than a minute.
        </p>
        <Link
          href="/#extractor"
          className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90"
        >
          <FileAudio className="h-4 w-4" /> Extract audio now
        </Link>
      </section>
    </PageShell>
    </>
  );
}
