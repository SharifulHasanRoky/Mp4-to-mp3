import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { QuickAnswer } from "@/components/quick-answer";
import { FileAudio, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Extract Audio From MP4 — Free MP4 Audio Extractor",
  description:
    "Extract audio from any MP4 for free in your browser. Demux the MP4 container, pull out the AAC or MP3 stream, save as MP3 — no upload, no install.",
  alternates: { canonical: "/extract-audio-from-mp4" },
  openGraph: {
    title: "Extract Audio From MP4 — Free MP4 Audio Extractor",
    description:
      "Extract audio from MP4 in your browser. No upload, no install. Demuxes the MP4 container and saves the audio as MP3 on any device.",
    url: "https://www.mp4tomp3.online/extract-audio-from-mp4",
    type: "article",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Extract Audio From MP4 — Free MP4 Audio Extractor",
    description:
      "A guide to extracting audio from MP4 files using a browser-based tool. Covers MP4 container structure, audio codecs, output formats, and quality preservation.",
    author: { "@type": "Organization", name: "MP4toMP3.online" },
    publisher: { "@type": "Organization", name: "MP4toMP3.online" },
    mainEntityOfPage: "https://www.mp4tomp3.online/extract-audio-from-mp4",
    datePublished: "2026-11-16",
    dateModified: "2026-11-16",
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell
        title="Extract Audio From MP4"
        subtitle="Pull the audio stream out of any MP4 file — in your browser, no upload, no install. Free, private, and tuned specifically for the MP4 container."
      >
        {/* Voice-search quick answer — read aloud by assistants when
            users ask "How do I extract audio from an MP4 file?" */}
        <QuickAnswer>
          To extract audio from an MP4 file, open MP4toMP3.online, drop in
          your MP4, and click Convert. The tool demuxes the MP4 container,
          reads the audio stream (usually AAC), and re-encodes it as MP3 —
          all in your browser, with no upload and no software to install.
        </QuickAnswer>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            What is inside an MP4 file
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            MP4 — formally ISO/IEC 14496-12, the MPEG-4 Part 14 container —
            is a box-structured format. The outermost box is{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-sm">
              ftyp
            </code>{" "}
            (file type declaration), followed by{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-sm">
              moov
            </code>{" "}
            (metadata: which codecs, durations, the track list) and{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-sm">
              mdat
            </code>{" "}
            (the actual media data, interleaved audio and video packets).
            When you extract audio from an MP4, the demuxer reads the{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-sm">
              moov
            </code>{" "}
            box to find the audio track&apos;s offsets into{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-sm">
              mdat
            </code>
            , then copies or decodes just those packets.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            MP4 is by far the most common video container on the web.
            YouTube serves MP4, iPhones record MP4, most cameras write MP4,
            and most video editors export MP4. So &quot;extract audio from
            MP4&quot; is the single most common audio-extraction query —
            and the one this tool is tuned for.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            The audio streams you will find inside an MP4
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            An MP4 can carry several audio codecs, but in practice you will
            encounter four:
          </p>
          <ul className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-3">
              <FileAudio className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>AAC (Advanced Audio Coding).</strong> The default
                for roughly 95% of MP4 files. Used by YouTube, iPhone, and
                most cameras. Excellent quality at low bitrates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileAudio className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>MP3.</strong> Sometimes used inside MP4, especially
                in older files. If present, it can be extracted losslessly
                with no re-encoding at all.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileAudio className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>AC3 (Dolby Digital).</strong> Common in ripped DVDs
                and some camera footage. Capable of 5.1 surround sound.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileAudio className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>ALAC (Apple Lossless).</strong> Lossless codec used
                in high-quality iTunes rips. Large files, audiophile
                quality.
              </span>
            </li>
          </ul>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The extractor detects which codec is present automatically. If
            the source is AAC, it decodes and re-encodes to MP3. If the
            source is already MP3, it can copy the stream without
            re-encoding (lossless). AC3 and ALAC are always decoded and
            re-encoded, because the MP3 format cannot represent either
            natively.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Extracting to MP3 versus other formats
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            MP3 is the universal default — every player, every operating
            system, every car stereo supports it. For MP4 audio extraction,
            MP3 is the right choice roughly 90% of the time. When to choose
            something else:
          </p>
          <ul className="mt-3 space-y-2 text-base leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              <span>
                <strong>AAC</strong> — when the source MP4 already uses AAC
                and you want zero quality loss (copy, don&apos;t re-encode).
                Smaller than MP3 at the same quality, but slightly less
                compatible on old hardware.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              <span>
                <strong>WAV</strong> — when you will edit the audio further
                (normalize, mix, audition). Uncompressed and large, but
                lossless.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              <span>
                <strong>M4A</strong> — the Apple-native AAC container. Best
                if you live entirely inside the Apple ecosystem and want the
                smallest files.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              <span>
                <strong>FLAC</strong> — for lossless archival of ALAC
                sources. Smaller than WAV with identical quality.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Step-by-step: extract audio from an MP4
          </h2>
          <ol className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                1
              </span>
              <span>Open the extractor in any modern browser.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                2
              </span>
              <span>
                Drag your MP4 onto the upload area, or click to browse.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                3
              </span>
              <span>Click Convert to MP3.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                4
              </span>
              <span>Save the resulting MP3 to your device.</span>
            </li>
          </ol>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Total time for a 5-minute MP4: about 10 seconds on a laptop, 25
            on a phone. The MP4 stays on your device throughout — nothing is
            uploaded.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Preserving quality
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The biggest quality decision is the output bitrate. The default
            190 kbps VBR is transparent for spoken word and
            indistinguishable from the source for music on consumer gear.
            For archival of music you care about, bump to 320 kbps CBR. For
            voice memos and lectures, 128 kbps is more than enough and cuts
            file size by roughly a third.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The second decision is whether to re-encode at all. If your
            MP4&apos;s audio is already MP3, choosing a copy (lossless)
            path avoids a second lossy generation. The browser tool detects
            this automatically — you do not need to know the source codec
            in advance. The result is mathematically identical to the audio
            that was muxed into the MP4 at encode time.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Why a browser tool suits MP4 specifically
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            MP4 files are often large — phone recordings routinely hit 100
            MB per minute of 4K footage. Uploading that to a server-side
            converter is slow and exposes your video to a
            stranger&apos;s storage. Browser-based extraction processes the
            MP4 locally, so a 500 MB recording is no slower to convert than
            a 50 MB one (encoding time depends on duration, not file size)
            and never leaves your device.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The trade-off is browser memory limits. Most browsers cap a
            single page at 2–4 GB of RAM, which translates to roughly 1–2
            hours of 4K MP4. For longer files — a 3-hour concert recording,
            say — a desktop tool like FFmpeg is more appropriate, because
            it can stream the file off disk without holding it all in
            memory at once.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Related tools</h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            For a broader guide that covers every video container — not
            just MP4 — the{" "}
            <Link
              href="/extract-audio-from-video"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              extract audio from video
            </Link>{" "}
            page is the place to start. The{" "}
            <Link
              href="/mp3-extractor"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              MP3 extractor
            </Link>{" "}
            accepts any container and is a good choice when you do not want
            to think about formats. And for the full MP4-to-MP3 conversion
            walkthrough, the{" "}
            <Link
              href="/mp4-to-mp3-online"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              MP4 to MP3 online
            </Link>{" "}
            guide goes deeper on the conversion pipeline.
          </p>
        </section>

        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
          <h2 className="text-xl font-bold">Extract audio from your MP4</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Free, browser-based, no sign-up, no upload. Your MP4 never
            leaves your device.
          </p>
          <Link
            href="/#extractor"
            className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90"
          >
            <Download className="h-4 w-4" /> Extract audio now
          </Link>
        </section>
      </PageShell>
    </>
  );
}
