import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { QuickAnswer } from "@/components/quick-answer";
import { Citations, type Citation } from "@/components/citations";
import {
  FileAudio,
  Zap,
  ShieldCheck,
  Globe,
  HardDrive,
  Clock,
  Music,
  Waves,
  Archive,
  PenTool,
} from "lucide-react";

export const metadata: Metadata = {
  title: "MP4 to WAV Converter — Extract Uncompressed Audio Online",
  description:
    "Convert MP4 to WAV online free. Extract uncompressed, lossless PCM audio in your browser — no install, no upload, no sign-up. Built for editing and archiving.",
  alternates: { canonical: "/mp4-to-wav-converter" },
  openGraph: {
    title: "MP4 to WAV Converter — Extract Uncompressed Audio Online",
    description:
      "Convert MP4 to WAV in your browser. Lossless PCM output, no upload, no sign-up. Perfect for editing, mixing, and archiving.",
    url: "https://www.mp4tomp3.online/mp4-to-wav-converter",
    type: "article",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "MP4 to WAV Converter — Extract Uncompressed Audio Online",
    description:
      "A guide to converting MP4 to WAV using a browser-based converter. Lossless, uncompressed PCM output for editing, archiving, and professional audio.",
    author: { "@type": "Organization", name: "MP4toMP3.online" },
    publisher: { "@type": "Organization", name: "MP4toMP3.online" },
    mainEntityOfPage: "https://www.mp4tomp3.online/mp4-to-wav-converter",
    datePublished: "2026-11-16",
    dateModified: "2026-11-16",
    citation: [
      "https://en.wikipedia.org/wiki/FLAC",
      "https://en.wikipedia.org/wiki/Advanced_Audio_Coding",
      "https://ffmpeg.org/ffmpeg.html",
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell
        title="MP4 to WAV Converter"
        subtitle="Extract uncompressed, lossless PCM audio from MP4 in your browser — no install, no upload, no sign-up. Free and built for editing, archiving, and pro audio."
      >
        {/* Voice-search quick answer — read aloud by Google Assistant
            when users ask "How do I convert MP4 to WAV?" */}
        <QuickAnswer>
          To convert MP4 to WAV, open MP4toMP3.online, drop your MP4 onto the
          converter, choose WAV as the output format, and click convert. The
          audio is extracted losslessly as uncompressed PCM in your browser
          using WebAssembly FFmpeg, with no upload and no quality loss.
        </QuickAnswer>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            What an MP4 to WAV converter does
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            WAV is an uncompressed audio container. It holds raw PCM samples
            — the actual numeric values that represent the sound wave — with
            no compression at all. An MP4 to WAV converter does three things:
            it demuxes the MP4 container to pull out the audio stream (usually
            AAC), decodes that stream into raw PCM samples, and wraps the
            samples in a standard WAV header. The video stream is discarded.
            Because there is no lossy re-encoding step, the WAV file contains
            exactly the same audio the MP4 did, just in a different wrapper.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            That last point matters and is widely misunderstood. Converting a
            lossy source to a lossless format does not add back detail that
            was already thrown away. If your MP4 contains 128 kbps AAC audio,
            the resulting WAV will sound exactly like that 128 kbps AAC audio
            — no better, no worse. What you gain is not quality, but the
            ability to edit, process, and re-export the audio without
            accumulating another generation of lossy artefacts.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            WAV versus MP3: which to choose
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            WAV and MP3 sit at opposite ends of the audio format spectrum.
            WAV is lossless and uncompressed: maximum fidelity, large files.
            MP3 is lossy and compressed: smaller files, universal
            compatibility. Neither is better in absolute terms — the right
            choice depends on what you plan to do with the file.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Waves className="h-5 w-5" />
                <h3 className="text-base font-semibold">Choose WAV when</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                You will be editing, mixing, or mastering the audio in a DAW
                like Audacity, Logic Pro, Ableton, or Pro Tools. You are
                archiving audio at maximum fidelity. You need a clean source
                for further processing without generation loss. File size is
                not a concern.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Music className="h-5 w-5" />
                <h3 className="text-base font-semibold">Choose MP3 when</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                You want a file small enough to email, share, or load onto a
                phone. You are distributing a podcast, song, or voice memo
                for playback. You need a format that opens on every device
                without conversion. Smaller storage matters more than
                bit-perfect fidelity.
              </p>
            </div>
          </div>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            A useful rule of thumb: WAV for working, MP3 for shipping. Extract
            to WAV when you still have editing ahead of you; export to MP3
            once the file is finished and ready to share. For more on how the
            two formats compare, the{" "}
            <Link
              href="/mp4-vs-mp3"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              MP4 vs MP3
            </Link>{" "}
            breakdown covers the container and codec trade-offs in detail.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            When WAV is the right choice
          </h2>
          <ul className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-3">
              <PenTool className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Editing in a DAW.</strong> Audacity, Logic Pro,
                Ableton, Pro Tools, Reaper, and Premiere Pro all prefer WAV
                as the working format. Lossy sources degrade every time you
                re-export; WAV keeps the source clean through every edit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Archive className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Archiving.</strong> If you are keeping a recording for
                the long term, store it as WAV. Compression formats go in and
                out of favour; raw PCM is forever readable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Music className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Submitting for mixing or mastering.</strong> Engineers
                want uncompressed stems. Sending an MP3 to a mastering
                engineer is the audio equivalent of sending a screenshot of
                a document for edit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Waves className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Avoiding generation loss.</strong> Every lossy
                re-encode chips away at fidelity. Starting from WAV means
                downstream processing — normalisation, fades, format
                conversion — does not stack losses on top of losses.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Step by step: convert MP4 to WAV
          </h2>
          <ol className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                1
              </span>
              <span>
                <strong>Open the converter.</strong> Scroll to the extractor
                at the bottom of this page or open the homepage in any modern
                browser. No account, no install.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                2
              </span>
              <span>
                <strong>Add your MP4.</strong> Drag and drop the file onto the
                upload area, or pick it from your file manager. On mobile,
                pull directly from Photos, Files, or Google Photos.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                3
              </span>
              <span>
                <strong>Choose WAV.</strong> Pick WAV as the output format.
                The converter preserves the source sample rate and bit depth
                — usually 44.1 kHz, 16-bit stereo.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                4
              </span>
              <span>
                <strong>Convert and download.</strong> Click convert. The
                audio is extracted as uncompressed PCM in your browser and
                the WAV downloads the moment it is ready.
              </span>
            </li>
          </ol>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            WAV extraction is faster than MP3 encoding because no lossy
            compression step is involved — the audio is demuxed and
            re-wrapped, not re-encoded. A five-minute MP4 typically produces
            a WAV in well under ten seconds on a modern laptop.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            File size tradeoffs you should expect
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Uncompressed audio is large. A CD-quality WAV — 16-bit, 44.1 kHz,
            stereo — runs roughly 10 MB per minute of audio. A five-minute MP4
            will produce a WAV around 50 MB; a ten-minute file around 100 MB.
            That is the price of lossless storage, and it is the main reason
            most people reach for MP3 instead for everyday listening.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The original MP4 is almost always much smaller than the WAV that
            comes out of it, because the MP4&apos;s audio was already
            compressed. You are effectively expanding the audio back to its
            raw form. Plan accordingly: a half-hour lecture will produce a
            WAV of around 300 MB, which is awkward to email but fine for
            local editing. If you only need a small playable file rather than
            an editable one, you want MP3, not WAV.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Why browser-based conversion
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <ShieldCheck className="h-5 w-5" />
                <h3 className="text-base font-semibold">No upload, ever</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Your MP4 is read from your disk, processed in memory, and
                written back as a WAV — all locally. No network request
                carries the file. The privacy model matches a desktop app.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Zap className="h-5 w-5" />
                <h3 className="text-base font-semibold">No install, ever</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                No installer, no disk permissions, no updates. The converter
                loads as a web page and runs the same WebAssembly FFmpeg
                engine desktop tools use, without the packaging.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Clock className="h-5 w-5" />
                <h3 className="text-base font-semibold">No queue</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Server-side converters queue jobs during peak hours. A
                browser-based converter uses your own CPU, so the only wait is
                the extraction itself.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <HardDrive className="h-5 w-5" />
                <h3 className="text-base font-semibold">Nothing stored</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Because there is no upload, there is nothing to delete. The
                file exists in browser memory during conversion and is gone
                the moment you close the tab.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Related tools
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The browser-based{" "}
            <Link
              href="/mp4-to-wav"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              MP4 to WAV converter
            </Link>{" "}
            is the same engine with a different default output format, useful
            when you want WAV with the highlights and FAQ presented inline.
            If you decide you actually want MP3 instead — for sharing,
            smaller files, or universal playback — the{" "}
            <Link
              href="/mp4-to-mp3-online"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              MP4 to MP3 online
            </Link>{" "}
            page covers the lossy workflow end to end. For working on the
            road,{" "}
            <Link
              href="/"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              the homepage converter
            </Link>{" "}
            handles every format on any device with a modern browser.
          </p>
        </section>

        <Citations
          sources={[
            { title: "FLAC \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/FLAC", publisher: "Wikipedia", note: "Lossless audio reference relevant to MP4-to-WAV extraction." },
            { title: "Advanced Audio Coding \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Advanced_Audio_Coding", publisher: "Wikipedia", note: "AAC source codec that the WAV converter decodes." },
            { title: "FFmpeg documentation", url: "https://ffmpeg.org/ffmpeg.html", publisher: "FFmpeg", note: "Official manual for the MP4-to-WAV decode pipeline." },
          ]}
        />

        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
          <h2 className="text-xl font-bold">Convert MP4 to WAV now</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Free, browser-based, no sign-up, no upload. Lossless PCM output,
            your file never leaves your device.
          </p>
          <Link
            href="/#extractor"
            className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90"
          >
            <FileAudio className="h-4 w-4" /> Convert MP4 to WAV
          </Link>
        </section>
      </PageShell>
    </>
  );
}
