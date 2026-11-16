import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { QuickAnswer } from "@/components/quick-answer";
import { Citations, type Citation } from "@/components/citations";
import {
  FileAudio,
  ShieldCheck,
  Zap,
  Clock,
  HardDrive,
  Gauge,
} from "lucide-react";

export const metadata: Metadata = {
  title: "MP4 to MP3 — Convert MP4 to MP3 Free Online",
  description:
    "Convert MP4 to MP3 free online. Browser-based, no upload, no install. Choose 128, 192, or 320 kbps. Your file never leaves your device. Fast and private.",
  alternates: { canonical: "/mp4-mp3" },
  openGraph: {
    title: "MP4 to MP3 — Convert MP4 to MP3 Free Online",
    description:
      "Convert MP4 to MP3 in your browser. Choose 128, 192, or 320 kbps. No upload, no install, no sign-up.",
    url: "https://www.mp4tomp3.online/mp4-mp3",
    type: "article",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "MP4 to MP3 — Convert MP4 to MP3 Free Online",
    description:
      "A guide to converting MP4 to MP3 using a browser-based tool. Covers what MP4 and MP3 are, quality options, privacy, and how it compares to other tools.",
    author: { "@type": "Organization", name: "MP4toMP3.online" },
    publisher: { "@type": "Organization", name: "MP4toMP3.online" },
    mainEntityOfPage: "https://www.mp4tomp3.online/mp4-mp3",
    datePublished: "2026-11-16",
    dateModified: "2026-11-16",
    citation: [
      "https://en.wikipedia.org/wiki/MPEG-4",
      "https://en.wikipedia.org/wiki/MP3",
      "https://en.wikipedia.org/wiki/FFmpeg",
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell
        title="MP4 to MP3"
        subtitle="Convert MP4 to MP3 in your browser — no upload, no install, no sign-up. Choose your bitrate and download the audio in seconds."
      >
        {/* Voice-search quick answer — read aloud by Google Assistant
            when users ask "How do I convert MP4 to MP3?" */}
        <QuickAnswer>
          To convert MP4 to MP3, open MP4toMP3.online, drop your MP4 file onto
          the extractor, pick a bitrate, and click convert. The conversion
          runs locally in your browser using WebAssembly FFmpeg, so the file is
          never uploaded and the MP3 downloads in seconds.
        </QuickAnswer>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            What MP4 and MP3 actually are
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            MP4 and MP3 are easy to confuse because the names are one letter
            apart, but they solve very different problems. MP4 is a container
            format — a box that holds a video stream, an audio stream, and
            sometimes subtitles, chapters, and metadata, all interleaved so a
            player can decode them together. The audio inside an MP4 is almost
            always AAC, a modern codec designed to sound good at low bitrates.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            MP3 is an audio-only format. It carries a single compressed audio
            stream and nothing else — no video, no subtitles, no metadata
            beyond what the ID3 tags bolt on. MP3 is older than MP4, but it is
            still the most universally compatible audio format in existence:
            every phone, every car stereo, every media player made in the last
            twenty years can play it. Converting MP4 to MP3 is really about
            trading compatibility for size — you give up the video and keep the
            sound in a format nothing will refuse to play.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Why convert MP4 to MP3
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The most common reason is simple: you want the sound, not the
            pictures. A music video, a concert recording, a lecture capture, or
            an interview stored as video is awkward to consume when all you
            really need is the audio. MP3 files are a fraction of the size, play
            with the screen off, load onto any player, and drop cleanly into an
            editor or a podcast host.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The other reason is compatibility. AAC inside an MP4 is widely
            supported, but not universally — some older car stereos, dedicated
            MP3 players, and niche software only handle MP3. Converting up
            front means you never hit a &quot;format not supported&quot; wall
            later. For a deeper look at the two formats side by side, the{" "}
            <Link
              href="/mp4-vs-mp3"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              MP4 vs MP3
            </Link>{" "}
            comparison lays out the trade-offs in detail.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Step by step: convert MP4 to MP3
          </h2>
          <ol className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                1
              </span>
              <span>
                <strong>Open the converter.</strong> Head to the homepage and
                scroll to the extractor, or use the button at the bottom of
                this page. No account is needed.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                2
              </span>
              <span>
                <strong>Add your MP4.</strong> Drag and drop the file onto the
                upload area, or pick it from your file manager. On mobile you
                can pull directly from Photos or Files.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                3
              </span>
              <span>
                <strong>Pick a bitrate.</strong> 192 kbps for music, 128 kbps
                for speech, 320 kbps if you want the maximum MP3 can hold.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                4
              </span>
              <span>
                <strong>Convert and download.</strong> Click convert. The MP3 is
                generated in your browser and downloads automatically when
                ready.
              </span>
            </li>
          </ol>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            A five-minute MP4 typically converts in eight to fifteen seconds on
            a modern laptop, and twenty to thirty seconds on a mid-range phone.
            There is no upload step and no queue, so the only wait is the
            encoding itself.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Quality options</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Gauge className="h-5 w-5" />
                <h3 className="text-base font-semibold">128 kbps</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Roughly 1 MB per minute. Best for speech — lectures, interviews,
                voice memos. Audibly transparent for talking, slightly soft on
                music at high volume.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Gauge className="h-5 w-5" />
                <h3 className="text-base font-semibold">192 kbps</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Roughly 1.5 MB per minute. The sensible default for music.
                Transparent to most listeners on most equipment.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Gauge className="h-5 w-5" />
                <h3 className="text-base font-semibold">320 kbps</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Roughly 2.4 MB per minute. The MP3 ceiling. Preserves as much
                detail as the format allows; indistinguishable from source to
                nearly everyone.
              </p>
            </div>
          </div>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Because the AAC audio inside an MP4 is already lossy, picking a
            bitrate higher than the source cannot recover detail that is not
            there. 192 kbps is enough to transparently carry whatever an AAC
            stream contained, which is why it is the default.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Privacy: why browser-based matters
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            When you upload an MP4 to a server-side converter, that file sits on
            someone else&apos;s hardware. Even sites that promise automatic
            deletion have been caught leaving files at predictable URLs long
            enough for search engines to index them. Sensitive interviews,
            internal company recordings, and personal voice memos all end up on
            a stranger&apos;s disk, even if briefly.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Browser-based conversion removes that exposure structurally rather
            than as a promise. The MP4 is read from your disk into browser
            memory, processed by WebAssembly FFmpeg, and written back as an MP3
            — all locally. No network request carries the file contents. You
            can verify this yourself in the browser developer tools: during
            conversion the Network tab should show only the initial page load
            and a one-time fetch of the FFmpeg engine from a CDN. For a fuller
            look at how the online model works and why it stays private, the{" "}
            <Link
              href="/mp4-to-mp3-online"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              MP4 to MP3 online
            </Link>{" "}
            guide covers it end to end.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            How it compares to other tools
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Zap className="h-5 w-5" />
                <h3 className="text-base font-semibold">vs server-side converters</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Server tools upload your file, queue it, and store it. Browser
                conversion skips the upload entirely, so a 30-second clip can
                finish in 5 seconds instead of 30, and nothing is stored to
                delete afterward.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-primary">
                <HardDrive className="h-5 w-5" />
                <h3 className="text-base font-semibold">vs desktop software</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Desktop converters use the same FFmpeg engine but require an
                install, disk permissions, and updates. The browser uses the
                same encoder with no install and the same privacy model, at the
                cost of one-time engine download.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-primary">
                <ShieldCheck className="h-5 w-5" />
                <h3 className="text-base font-semibold">vs command-line FFmpeg</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                FFmpeg itself is the most powerful option but needs a script and
                CLI knowledge. For a single file the browser path is faster to
                use; for batch jobs of hundreds of files the CLI wins on
                throughput.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Clock className="h-5 w-5" />
                <h3 className="text-base font-semibold">vs mobile apps</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Mobile converter apps often bundle ads and trackers and ask for
                broad storage permissions. A browser page asks for one file at a
                time and cannot read anything you do not hand it.
              </p>
            </div>
          </div>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            For a step-by-step walkthrough including screenshots for each
            platform, the{" "}
            <Link
              href="/how-to-convert-mp4-to-mp3"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              how to convert MP4 to MP3
            </Link>{" "}
            guide covers it, and the{" "}
            <Link
              href="/best-mp4-to-mp3-converter"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              best MP4 to MP3 converter
            </Link>{" "}
            roundup weighs the alternatives against each other.
          </p>
        </section>

        <Citations
          sources={[
            { title: "MPEG-4 \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/MPEG-4", publisher: "Wikipedia", note: "The MP4 container format that holds the input video and audio." },
            { title: "MP3 \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/MP3", publisher: "Wikipedia", note: "The MP3 audio format produced by the conversion." },
            { title: "FFmpeg \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/FFmpeg", publisher: "Wikipedia", note: "The engine that converts the MP4 container into an MP3 stream." },
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
