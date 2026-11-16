import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { QuickAnswer } from "@/components/quick-answer";
import { Citations, type Citation } from "@/components/citations";
import {
  FileAudio,
  Layers,
  Gauge,
  ShieldCheck,
  Smartphone,
  Globe,
  SlidersHorizontal,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Turn Video Into Audio — Extract MP3 From Any Video",
  description:
    "Turn video into audio instantly. Extract MP3 from MP4, MOV, MKV, AVI, WebM in your browser — no upload, no install, no sign-up. Free and private on any device.",
  alternates: { canonical: "/video-into-audio" },
  openGraph: {
    title: "Turn Video Into Audio — Extract MP3 From Any Video",
    description:
      "Turn video into audio in your browser. Supports MP4, MOV, MKV, AVI, WebM. No upload, no install, no sign-up.",
    url: "https://www.mp4tomp3.online/video-into-audio",
    type: "article",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Turn Video Into Audio — Extract MP3 From Any Video",
    description:
      "A guide to turning video files into audio using a browser-based converter. Supports MP4, MOV, MKV, AVI, WebM. No upload, no install.",
    author: { "@type": "Organization", name: "MP4toMP3.online" },
    publisher: { "@type": "Organization", name: "MP4toMP3.online" },
    mainEntityOfPage: "https://www.mp4tomp3.online/video-into-audio",
    datePublished: "2026-11-16",
    dateModified: "2026-11-16",
    citation: [
      "https://en.wikipedia.org/wiki/FFmpeg",
      "https://en.wikipedia.org/wiki/Advanced_Audio_Coding",
      "https://en.wikipedia.org/wiki/MP3",
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell
        title="Turn Video Into Audio"
        subtitle="Extract MP3 from MP4, MOV, MKV, AVI, and WebM in your browser — no upload, no install, no sign-up. Free and private on any device."
      >
        {/* Voice-search quick answer — read aloud by Google Assistant
            when users ask "How do I turn a video into an audio file?" */}
        <QuickAnswer>
          To turn a video into an audio file, open MP4toMP3.online, drop your
          video onto the extractor, pick MP3 as the output, and click convert.
          The audio is pulled out in your browser using WebAssembly FFmpeg,
          so nothing is uploaded and the MP3 is ready to download in seconds.
        </QuickAnswer>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            What turning video into audio actually does
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Every video file is a container holding a video stream and an audio
            stream side by side. Turning video into audio means splitting those
            streams apart, keeping the audio, and discarding the video frames.
            The result is a standalone audio file — usually MP3 — that sounds
            exactly like the soundtrack of your original video but is a
            fraction of the size and plays on any device or editor.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Because the audio is already inside the file, no re-recording is
            involved. The converter demuxes the container, decodes the audio
            stream into raw samples, and re-encodes those samples as MP3 using
            libmp3lame — the same encoder Audacity, HandBrake, and VLC rely on.
            That is why a 200 MB video can become a 6 MB MP3 with no audible
            loss on consumer equipment.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Supported video formats
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The converter is built on FFmpeg, so it accepts any container
            FFmpeg can read. In practice that covers everything most people
            encounter:
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Layers className="h-5 w-5" />
                <h3 className="text-base font-semibold">MP4 and MOV</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                The default formats from phones, cameras, and screen recorders.
                MP4 is the most common container on the web; MOV is what
                QuickTime and iPhones produce. Both carry AAC audio.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Layers className="h-5 w-5" />
                <h3 className="text-base font-semibold">MKV and WebM</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                MKV is popular for high-quality rips and multi-track files;
                WebM is the open format used by browsers and recording tools.
                Their audio is often Opus or Vorbis, both handled cleanly.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Layers className="h-5 w-5" />
                <h3 className="text-base font-semibold">AVI</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                An older container still produced by some capture cards and
                legacy software. Audio inside is usually MP3 already, so
                extraction is nearly lossless.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Layers className="h-5 w-5" />
                <h3 className="text-base font-semibold">And more</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                FLV, 3GP, TS, M4V, and the long tail of obscure containers all
                work the same way. If FFmpeg reads it, the converter handles it.
              </p>
            </div>
          </div>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            If you want a more general tool that does not assume a specific
            input format, the{" "}
            <Link
              href="/video-to-audio-converter"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              video to audio converter
            </Link>{" "}
            page explains the same pipeline for arbitrary containers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            The audio extraction process
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Extraction is a three-stage pipeline that runs entirely inside your
            browser. First, the container is demuxed to separate the audio
            stream from the video frames. Second, the compressed audio (AAC,
            Opus, Vorbis, or whatever the source uses) is decoded into raw PCM
            samples. Third, those samples are re-encoded as MP3 at your chosen
            bitrate and written to a downloadable file.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The video stream is dropped at the demux stage and never decoded at
            all, which is why a 4K source and a 720p source of the same length
            take similar time to convert — the heavy lifting in 4K is decoding
            the video, and that work is skipped. Only the audio path runs end
            to end.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Quality settings</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-primary">
                <SlidersHorizontal className="h-5 w-5" />
                <h3 className="text-base font-semibold">128 kbps</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Best for speech — lectures, interviews, voice memos. Roughly 1
                MB per minute. Audibly transparent for talking, slightly soft
                on music.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Gauge className="h-5 w-5" />
                <h3 className="text-base font-semibold">192 kbps</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                The sensible default for music. Transparent to most listeners
                on most equipment, with file sizes around 1.5 MB per minute.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Gauge className="h-5 w-5" />
                <h3 className="text-base font-semibold">320 kbps</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                The MP3 ceiling. Use when you want to preserve as much detail
                as the format allows. About 2.4 MB per minute, indistinguishable
                from the source to nearly everyone.
              </p>
            </div>
          </div>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Because the source audio in your video is already lossy, picking a
            higher bitrate than the source cannot recover detail that is not
            there. 192 kbps is enough to transparently carry whatever an AAC or
            Opus stream contained.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Batch processing</h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Browser-based conversion handles one file at a time by default,
            which is fine for the common case of pulling audio from a single
            recording. If you have dozens of clips — say a folder of lecture
            recordings or a series of interview segments — the practical
            approach is to convert them back to back in the same tab. The
            FFmpeg engine is cached after the first conversion, so each
            subsequent file starts immediately with no setup cost.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            For very large batches of long files, a desktop tool like FFmpeg
            itself or HandBrake will be faster, because it can use multiple
            threads and does not have the overhead of running inside a browser
            sandbox. The trade-off is convenience: a desktop pipeline needs an
            install, a script, and usually some command-line knowledge, while
            the browser path is drag, convert, done. For up to a few dozen
            short-to-medium files, the browser is the easier choice.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Why browser-based tools are safer
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            When you upload a video to a server-side converter, that file lands
            on someone else&apos;s hardware. Even sites that promise automatic
            deletion have been caught leaving files at predictable URLs long
            enough for search engines to index them. Interviews still under
            embargo, internal company recordings, and personal voice memos all
            end up on a stranger&apos;s disk, even if briefly.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Browser-based conversion removes that exposure structurally. The
            video is read from your disk into browser memory, processed by
            WebAssembly FFmpeg, and written back as an MP3 — all locally. No
            network request carries the file contents. You can verify this
            yourself in the browser developer tools: during conversion the
            Network tab should show only the initial page load and a one-time
            fetch of the FFmpeg engine from a CDN.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-primary">
                <ShieldCheck className="h-5 w-5" />
                <h3 className="text-base font-semibold">Nothing uploaded</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                The file is read, processed, and written back locally. The
                privacy model is identical to a desktop app, without the
                install.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Smartphone className="h-5 w-5" />
                <h3 className="text-base font-semibold">Works everywhere</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                iPhone, Android, Mac, Windows, Linux, Chromebook — any device
                with a modern browser gets the same experience and the same
                privacy guarantee.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Related tools</h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            If you know your input is specifically an MP4, the dedicated{" "}
            <Link
              href="/mp4-to-mp3-online"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              MP4 to MP3 online
            </Link>{" "}
            page covers the same pipeline with format-specific detail. If you do
            not want to think about output format at all and just want the
            audio out, the thinner{" "}
            <Link
              href="/mp3-extractor"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              MP3 extractor
            </Link>{" "}
            interface is the fastest path. And if you are comparing this
            approach against the alternatives before deciding,{" "}
            <Globe className="inline h-4 w-4 text-primary" /> the{" "}
            <Link
              href="/mp4-to-mp3-converter-online-free"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              free online converter
            </Link>{" "}
            roundup weighs the options against each other.
          </p>
        </section>

        <Citations
          sources={[
            { title: "FFmpeg \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/FFmpeg", publisher: "Wikipedia", note: "The framework that turns video into audio by demuxing streams." },
            { title: "Advanced Audio Coding \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Advanced_Audio_Coding", publisher: "Wikipedia", note: "AAC, the typical source audio codec inside the video." },
            { title: "MP3 \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/MP3", publisher: "Wikipedia", note: "The MP3 output format when turning video into audio." },
          ]}
        />

        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
          <h2 className="text-xl font-bold">Turn your video into audio now</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Free, browser-based, no sign-up, no upload. Your file never leaves
            your device.
          </p>
          <Link
            href="/#extractor"
            className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90"
          >
            <FileAudio className="h-4 w-4" /> Extract Audio From Video
          </Link>
        </section>
      </PageShell>
    </>
  );
}
