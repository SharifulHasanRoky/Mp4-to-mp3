import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { QuickAnswer } from "@/components/quick-answer";
import { Citations, type Citation } from "@/components/citations";
import {
  FileAudio,
  Check,
  Zap,
  Layers,
  ListChecks,
  Clock,
  Cpu,
  Repeat,
  AlertTriangle,
} from "lucide-react";

const sources: Citation[] = [
  {
    title: "FFmpeg — Wikipedia",
    url: "https://en.wikipedia.org/wiki/FFmpeg",
    publisher: "Wikipedia",
    note: "Background on the FFmpeg framework whose sequential invocation drives the browser-based batch workflow.",
  },
  {
    title: "MP3 — Wikipedia",
    url: "https://en.wikipedia.org/wiki/MP3",
    publisher: "Wikipedia",
    note: "Documents the MP3 output format produced by each item in the batch queue.",
  },
  {
    title: "WebAssembly — Wikipedia",
    url: "https://en.wikipedia.org/wiki/WebAssembly",
    publisher: "Wikipedia",
    note: "Explains the WebAssembly runtime whose per-tab memory limits cap how many files a browser batch can process.",
  },
  {
    title: "MPEG-4 — Wikipedia",
    url: "https://en.wikipedia.org/wiki/MPEG-4",
    publisher: "Wikipedia",
    note: "Defines the MP4 container that each input file in the batch arrives in.",
  },
];

export const metadata: Metadata = {
  title: "How to Batch Convert Multiple MP4 Files to MP3 Online",
  description:
    "Batch convert MP4 files to MP3 in your browser. MP4toMP3.online processes files one at a time at native FFmpeg speed — honest limits and the right workflow.",
  alternates: { canonical: "/mp4-to-mp3-batch" },
  openGraph: {
    title: "How to Batch Convert Multiple MP4 Files to MP3 Online",
    description:
      "Batch MP4 to MP3 conversion in the browser. Sequential processing at native FFmpeg speed, no upload, no queue, no sign-up.",
    url: "https://www.mp4tomp3.online/mp4-to-mp3-batch",
    type: "article",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Batch Convert Multiple MP4 Files to MP3 Online",
    description:
      "An honest guide to batch converting MP4 files to MP3 in a browser, including the real limits of browser-based processing and the workflow that keeps throughput high.",
    author: { "@type": "Organization", name: "MP4toMP3.online" },
    publisher: { "@type": "Organization", name: "MP4toMP3.online" },
    mainEntityOfPage: "https://www.mp4tomp3.online/mp4-to-mp3-batch",
    datePublished: "2026-11-16",
    dateModified: "2026-11-16",
    citation: [
      "https://en.wikipedia.org/wiki/FFmpeg",
      "https://en.wikipedia.org/wiki/MP3",
      "https://en.wikipedia.org/wiki/WebAssembly",
      "https://en.wikipedia.org/wiki/MPEG-4",
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell
        title="Batch Convert MP4 Files to MP3"
        subtitle="A browser-based batch workflow that processes files sequentially at native FFmpeg speed — no upload, no queue, no sign-up."
      >
        {/* Voice-search quick answer — read aloud when users ask
            "Can I batch convert multiple MP4 files to MP3?" */}
        <QuickAnswer>
          Yes, with a caveat: MP4toMP3.online processes files one at a time
          rather than in parallel, because the browser shares a single CPU
          with the page. Each file is fast — typically 8–15 seconds for a
          5-minute clip — so a batch of a dozen files clears in a few
          minutes by converting them in sequence.
        </QuickAnswer>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            What &quot;batch&quot; really means for a browser converter
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            In a desktop tool, batch conversion usually means dropping a
            folder of files onto the app and walking away while parallel
            worker threads chew through them. That model assumes the
            converter owns the machine and can pin every core. A browser
            tab does not have that luxury: the browser process shares the
            CPU with the rest of the system, and a single tab that hammers
            every core will make the whole machine feel frozen.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Browser-based converters therefore process files sequentially —
            one file at a time, on a single thread, with the engine cycling
            back to the next file in the queue as each one finishes. The
            upside is that each individual conversion runs at essentially
            the same speed as a desktop FFmpeg build, because WebAssembly
            compiles to native code. The honest trade-off is that you do
            not get the multi-core speedup a desktop batch tool would give
            you.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            The realistic throughput you can expect
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            On a modern laptop with a mid-range CPU, a 5-minute 720p MP4
            converts to MP3 in roughly 8–15 seconds. That puts a batch of
            10 such files at 2–3 minutes of total processing time, with no
            upload wait because the file never leaves the device. A batch
            of 50 short voice memos at 1 minute each might finish in under
            10 minutes. The actual numbers depend on CPU, file length, and
            source codec, but the per-file cost is small enough that most
            real-world batches clear faster than they would on a server-side
            converter that also charges you the upload time.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The first conversion in any session pays a one-time cost: the
            browser downloads the WebAssembly FFmpeg engine (about 30 MB)
            from a CDN and caches it. Every subsequent file in the batch
            skips that download. If your batch is large, this amortizes to
            almost nothing per file.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            The recommended batch workflow
          </h2>
          <ol className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                1
              </span>
              <span>
                Put all the MP4 files you want to convert in a single folder
                so you can drag them in groups without hunting.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                2
              </span>
              <span>
                Open the converter in a dedicated tab — not one you also use
                for email or Slack. Conversion holds the tab&apos;s main
                thread, so heavy work in the same tab slows the encode.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                3
              </span>
              <span>
                Drag in the first file (or select multiple in the file
                picker — the queue accepts several at once). The engine will
                encode them one after another.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                4
              </span>
              <span>
                Download each MP3 as it finishes, or save them all at the
                end. Keep the tab focused — most browsers throttle background
                tabs, which slows encoding.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                5
              </span>
              <span>
                For batches larger than about 20 files, open two browser
                windows side by side and split the queue. Each window gets
                its own thread, doubling effective throughput without
                freezing the machine.
              </span>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Real limits you will hit, and how to handle them
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Cpu className="h-5 w-5" />
                <h3 className="text-base font-semibold">Single-thread encoding</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                The WebAssembly FFmpeg build encodes one stream at a time. You
                cannot parallelize within a single tab. Splitting across
                windows is the practical workaround for large batches.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Layers className="h-5 w-5" />
                <h3 className="text-base font-semibold">Browser memory cap</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                A 64-bit browser typically gives a tab around 2 GB of usable
                memory before the encode aborts. A single 4K feature-length
                MP4 can hit that ceiling; batches of short clips will not.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Clock className="h-5 w-5" />
                <h3 className="text-base font-semibold">Background tab throttling</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Chrome, Firefox, and Safari throttle background tabs after a
                few minutes. Keep the converter tab visible, or batch in
                smaller chunks you can babysit.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Repeat className="h-5 w-5" />
                <h3 className="text-base font-semibold">No saved queue state</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Closing the tab loses the queue. For a long batch, finish or
                note your progress before you navigate away — there is no
                server to remember where you stopped.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Batch vs. multiple files: a useful distinction
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            People use &quot;batch&quot; and &quot;multiple files&quot;
            interchangeably, but they point at different intents. Batch
            conversion implies a deliberate queue — a folder of related
            files you want processed with the same settings, usually
            unattended. Multiple-file conversion is more casual: a few
            clips you want to flip quickly, often one at a time as you go.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            For the deliberate, unattended queue — say, exporting MP3s from
            every video in a course module — the workflow above with a
            focused tab and a split window for large batches is the right
            approach. For the casual case of three or four clips you want
            to flip while you do something else, the lighter workflow on
            the{" "}
            <Link
              href="/mp4-to-mp3-multiple-files"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              convert multiple MP4 files
            </Link>{" "}
            page is simpler and just as fast.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            When a desktop batch tool genuinely wins
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Browser-based batch conversion is the right default for most
            people, but a desktop FFmpeg script wins in two specific
            situations. First, when you are converting hundreds of files at
            once every week — a script with <code className="text-sm">find
            . -name &apos;*.mp4&apos; -exec ffmpeg -n -i {} -vn -c:a libmp3lame
            {"{.mp3}"} \;</code> parallelized across all your cores will
            outpace any browser tab. Second, when your files are too large
            for browser memory — a 4 GB concert recording is past the
            practical limit of a browser encode.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            For everything else — the one-off folder of clips, the weekly
            archive of meeting recordings, the occasional archive extract —
            the browser is faster end-to-end because there is no install
            and no upload. The{" "}
            <Link
              href="/mp4-to-mp3-software"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              MP4 to MP3 software
            </Link>{" "}
            comparison breaks down exactly when each approach pays off.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Keeping quality consistent across a batch
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            One subtle point about batch conversion: if your source files
            have wildly different audio characteristics — some AAC at 256
            kbps, some at 96 kbps, some 48 kHz, some 44.1 kHz — a single
            fixed output setting can produce inconsistent results. The
            converter does not resample unless you ask it to, so a file
            whose source is 48 kHz will land at 48 kHz MP3 by default,
            while a 44.1 kHz source lands at 44.1 kHz. If you need a
            uniform output, set the sample rate explicitly. The{" "}
            <Link
              href="/mp4-to-mp3-sample-rate"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              MP4 to MP3 sample rate
            </Link>{" "}
            guide walks through the trade-offs in detail.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            For most batches of related content — a course module recorded
            on the same device, a podcast back-catalog, a folder of voice
            memos from the same app — the source settings are uniform and
            you do not need to think about this. The default VBR ~190 kbps
            output is a safe choice that produces consistent file sizes
            across the batch.
          </p>
        </section>

        <Citations sources={sources} />

        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
          <h2 className="text-xl font-bold">Batch convert MP4 to MP3 now</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Drag in a folder of files, let the queue run, download the MP3s.
            No upload, no sign-up, no install.
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
