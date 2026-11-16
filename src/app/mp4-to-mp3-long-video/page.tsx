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
  Clock,
  Scissors,
  Gauge,
  MemoryStick,
} from "lucide-react";

const sources: Citation[] = [
  {
    title: "WebAssembly — Wikipedia",
    url: "https://en.wikipedia.org/wiki/WebAssembly",
    publisher: "Wikipedia",
    note: "Explains the WebAssembly memory model that determines whether hour-long MP4s can be converted without decoder memory spikes.",
  },
  {
    title: "FFmpeg — Wikipedia",
    url: "https://en.wikipedia.org/wiki/FFmpeg",
    publisher: "Wikipedia",
    note: "Background on the FFmpeg streaming pipeline that walks through long audio streams sample by sample.",
  },
  {
    title: "MP3 — Wikipedia",
    url: "https://en.wikipedia.org/wiki/MP3",
    publisher: "Wikipedia",
    note: "Documents the MP3 format and the bitrate choices (128/192 kbps) recommended for long-form content.",
  },
  {
    title: "Bit rate — Wikipedia",
    url: "https://en.wikipedia.org/wiki/Bit_rate",
    publisher: "Wikipedia",
    note: "Supports the relationship between duration, bit rate and output file size discussed for long videos.",
  },
];

export const metadata: Metadata = {
  title: "Convert Long MP4 Videos to MP3 — Free 1+ Hour",
  description:
    "Convert long MP4 videos (1+ hour) to MP3 in your browser. Tips for memory limits and best bitrate. Free, no sign-up, no upload.",
  alternates: { canonical: "/mp4-to-mp3-long-video" },
  openGraph: {
    title: "Convert Long MP4 Videos (1+ Hour) to MP3 — Full Guide",
    description:
      "Convert 1-hour+ MP4 videos to MP3 in the browser. Bitrate for long content, segmentation, and decoder memory tips.",
    url: "https://www.mp4tomp3.online/mp4-to-mp3-long-video",
    type: "article",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Convert Long MP4 Videos (1+ Hour) to MP3",
    description:
      "A guide to converting hour-long MP4 videos (lectures, podcasts, concerts) to MP3, covering bitrate choice, segmentation, and decoder memory.",
    author: { "@type": "Organization", name: "MP4toMP3.online" },
    publisher: { "@type": "Organization", name: "MP4toMP3.online" },
    mainEntityOfPage: "https://www.mp4tomp3.online/mp4-to-mp3-long-video",
    datePublished: "2026-11-16",
    dateModified: "2026-11-16",
    citation: [
      "https://en.wikipedia.org/wiki/WebAssembly",
      "https://en.wikipedia.org/wiki/FFmpeg",
      "https://en.wikipedia.org/wiki/MP3",
      "https://en.wikipedia.org/wiki/Bit_rate",
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell
        title="Convert Long MP4 Videos (1+ Hour) to MP3"
        subtitle="A 90-minute lecture, a two-hour podcast, a full concert set — long videos are a different problem from large files. Duration drives decoder memory, not disk size. Here is how to get long audio out cleanly."
      >
        {/* Voice-search quick answer for
            "How do I convert a 1-hour MP4 video to MP3?" */}
        <QuickAnswer>
          To convert a 1-hour MP4 video to MP3, open MP4toMP3.online, drop the
          file in, pick 128 kbps for speech or 192 kbps for music, and let the
          browser-based FFmpeg stream through it. A one-hour file finishes in
          roughly 45–70 seconds on a modern laptop. Avoid loading the whole
          file into memory.
        </QuickAnswer>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Duration is the real cost, not megabytes
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            A common mistake is to look at the file size of a long video and
            assume a small file means an easy conversion. A one-hour podcast
            recorded at 64 kbps AAC may be only 30 MB on disk, but when the
            audio is decoded to raw PCM it expands to roughly 650 MB of memory
            — stereo, 48 kHz, no compression. A two-hour concert filmed at
            1080p can be 1.5 GB on disk and balloon past 3 GB as PCM. The
            encoder has to walk through every one of those samples.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            What this means in practice: a long but small file is just as
            likely to crash a naive browser converter as a large but short
            one. The fix is the same in both cases — streaming. The
            WebAssembly FFmpeg engine that MP4toMP3.online uses exposes the
            file as a virtual filesystem with chunked reads, so only the
            working window of PCM sits in memory at any instant. The
            encoder produces MP3 frames as it goes, instead of accumulating
            one giant PCM buffer.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Pick a bitrate that matches the content
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Long-form content rewards careful bitrate choice, because every
            kilobit is multiplied by hours. The wrong setting turns a
            90-minute lecture into either a 600 MB file nobody wants or a
            crackling mess that is painful to listen to.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="py-2 pr-4 font-semibold">Content</th>
                  <th className="py-2 pr-4 font-semibold">Bitrate</th>
                  <th className="py-2 pr-4 font-semibold">1-hour size</th>
                  <th className="py-2 font-semibold">Why</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/60">
                  <td className="py-2 pr-4">Speech, voice memo</td>
                  <td className="py-2 pr-4">96 kbps CBR</td>
                  <td className="py-2 pr-4">~43 MB</td>
                  <td className="py-2">Voice fits in a narrow band.</td>
                </tr>
                <tr className="border-b border-border/60">
                  <td className="py-2 pr-4">Lecture, interview</td>
                  <td className="py-2 pr-4">128 kbps CBR</td>
                  <td className="py-2 pr-4">~58 MB</td>
                  <td className="py-2">Headroom for laughter, music cues.</td>
                </tr>
                <tr className="border-b border-border/60">
                  <td className="py-2 pr-4">Podcast with music</td>
                  <td className="py-2 pr-4">160 kbps VBR</td>
                  <td className="py-2 pr-4">~72 MB</td>
                  <td className="py-2">Music segments need more bits.</td>
                </tr>
                <tr className="border-b border-border/60">
                  <td className="py-2 pr-4">Live concert</td>
                  <td className="py-2 pr-4">192 kbps VBR</td>
                  <td className="py-2 pr-4">~86 MB</td>
                  <td className="py-2">Wide dynamics, crowd noise.</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Studio recording</td>
                  <td className="py-2 pr-4">320 kbps CBR</td>
                  <td className="py-2 pr-4">~144 MB</td>
                  <td className="py-2">Only if the source is high quality.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Notice that 320 kbps only makes sense when the source itself is
            high quality. Re-encoding a 64 kbps AAC podcast at 320 kbps
            produces a file five times larger that sounds identical to a
            96 kbps version. The bit depth of the output can never exceed
            the bit depth of the input. For the trade-offs in more detail,
            see the{" "}
            <Link
              href="/mp4-to-mp3-128kbps"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              128 kbps
            </Link>{" "}
            and{" "}
            <Link
              href="/mp4-to-mp3-192kbps"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              192 kbps
            </Link>{" "}
            pages.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Segmentation: the trick for very long files
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            For files longer than two hours, even streaming can struggle on
            lower-end hardware. The reliable workaround is segmentation:
            split the source MP4 into 30-minute chunks, convert each chunk
            separately, and concatenate the resulting MP3 files. MP3 is one
            of the few audio formats where concatenation of independently
            encoded files is perfectly transparent — there is no header
            state that crosses the boundary, so a listener hears a single
            continuous track.
          </p>
          <ol className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                1
              </span>
              <span>
                <strong>Split</strong> the MP4 into segments. Most editors
                do this with a trim tool. If you need to do it in the
                browser, the segment boundaries should fall on keyframes to
                avoid decode errors.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                2
              </span>
              <span>
                <strong>Convert</strong> each segment to MP3 with identical
                settings — same bitrate, same sample rate, same channel
                count. Mismatched settings produce audible clicks at the
                joins.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                3
              </span>
              <span>
                <strong>Concatenate</strong> the MP3 segments. A simple
                binary concat works for files with the same encoder; for
                safety, use a tool that rewrites the combined Xing/LAME
                header so duration metadata stays correct.
              </span>
            </li>
          </ol>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The deeper dive on splitting, segment conversion, and rejoining
            is in the{" "}
            <Link
              href="/mp4-to-mp3-file-too-large"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              file-too-large guide
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Why long videos sometimes stall at 100%
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            A common frustration: the progress bar reaches 100% and then
            sits there for ten seconds before the download appears. This is
            not a crash. It is the finalization step — the encoder flushing
            its last MP3 frames, writing the ID3 metadata header, and
            generating the download blob from the in-memory output. The
            longer the source, the larger this output blob, and the longer
            the browser takes to convert it into something the file system
            can write. Two-hour files can spend 20–30 seconds at 100% on
            slower laptops.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            If the file is genuinely stuck — progress frozen, fan off, no
            disk activity — the most likely cause is an out-of-memory
            condition the browser did not surface. Switching to Chrome and
            closing other tabs usually resolves it. See the{" "}
            <Link
              href="/mp4-to-mp3-conversion-failed"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              conversion failed
            </Link>{" "}
            guide for a fuller diagnosis.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Tips for getting through a long file cleanly
          </h2>
          <ul className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-3">
              <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Expect 1× to 1.5× real-time.</strong> A one-hour file
                takes 45–70 seconds to encode on a modern laptop, longer on
                mobile. Plan for it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Drop the sample rate for speech.</strong> 44.1 kHz is
                overkill for a lecture; 22.05 kHz halves PCM memory and is
                transparent for voice. See the{" "}
                <Link
                  href="/mp4-to-mp3-sample-rate"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  sample rate guide
                </Link>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MemoryStick className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Convert to mono for solo speakers.</strong> A
                single-voice podcast gains nothing from stereo and doubles
                the PCM footprint during encoding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scissors className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Trim silence first if you can.</strong> Long pauses
                at the start and end of recordings encode at full bitrate
                for nothing. Trimming ten minutes of silence saves real
                time.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Long content, short tool
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The same engine that handles a 30-second clip handles a
            three-hour concert — only the working window differs. For more
            on the overall approach, see the{" "}
            <Link
              href="/mp4-to-mp3-online"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              MP4 to MP3 online
            </Link>{" "}
            overview. If your real problem is disk size rather than
            duration, the{" "}
            <Link
              href="/mp4-to-mp3-large-file"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              large-file guide
            </Link>{" "}
            is the right starting point.
          </p>
        </section>

        <Citations sources={sources} />

        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
          <h2 className="text-xl font-bold">Convert your long MP4 to MP3 now</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Streams through WebAssembly FFmpeg — no upload, no queue, no
            sign-up. Handles hour-long files in Chrome.
          </p>
          <Link
            href="/#extractor"
            className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90"
          >
            <FileAudio className="h-4 w-4" /> Convert long MP4 to MP3
          </Link>
        </section>
      </PageShell>
    </>
  );
}
