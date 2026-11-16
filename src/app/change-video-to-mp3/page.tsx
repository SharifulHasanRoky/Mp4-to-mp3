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
  ShieldCheck,
  Globe,
  Clock,
  HardDrive,
  Music,
  Mic,
  GraduationCap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Change Video to MP3 — Free Online Video to MP3 Converter",
  description:
    "Change a video to MP3 free online. Convert MP4, MOV, MKV to MP3 in your browser — no install, no upload, no sign-up. Private, fast, and works on any device.",
  alternates: { canonical: "/change-video-to-mp3" },
  openGraph: {
    title: "Change Video to MP3 — Free Online Video to MP3 Converter",
    description:
      "Change a video to MP3 in your browser. No upload, no install, no sign-up. Works on iPhone, Android, Mac, Windows.",
    url: "https://www.mp4tomp3.online/change-video-to-mp3",
    type: "article",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Change Video to MP3 — Free Online Video to MP3 Converter",
    description:
      "A guide to changing video files (MP4, MOV, MKV) into MP3 using a browser-based converter. No install, no upload, no sign-up.",
    author: { "@type": "Organization", name: "MP4toMP3.online" },
    publisher: { "@type": "Organization", name: "MP4toMP3.online" },
    mainEntityOfPage: "https://www.mp4tomp3.online/change-video-to-mp3",
    datePublished: "2026-11-16",
    dateModified: "2026-11-16",
    citation: [
      "https://ffmpeg.org/ffmpeg.html",
      "https://en.wikipedia.org/wiki/LAME",
      "https://en.wikipedia.org/wiki/MP3",
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell
        title="Change Video to MP3"
        subtitle="Turn any video file into an MP3 in your browser — no install, no upload, no sign-up. Free, private, and works on every device."
      >
        {/* Voice-search quick answer — read aloud by Google Assistant
            when users ask "How do I change a video file to MP3?" */}
        <QuickAnswer>
          To change a video file to MP3, open MP4toMP3.online, drag your video
          onto the upload area, choose MP3 as the output format, and click
          convert. The conversion runs entirely in your browser using
          WebAssembly FFmpeg, so nothing is uploaded, nothing is installed, and
          the MP3 downloads in seconds.
        </QuickAnswer>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            What it means to change a video to MP3
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            A video file is a container holding two streams side by side: a
            sequence of pictures (the video) and a soundtrack (the audio).
            When you change a video to MP3, the converter separates the audio
            stream from the video stream, decodes it into raw samples, and
            re-encodes those samples as MP3 — the most widely supported audio
            format on the planet. The pictures are thrown away; the sound is
            kept. The result is a file roughly a tenth of the original size
            that plays on every phone, laptop, car stereo, and portable player
            made in the last twenty years.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            People reach for the phrase &quot;change video to MP3&quot;
            because MP3 is the answer to a specific question: which format will
            definitely play wherever I send it? Other formats — WAV, M4A, FLAC,
            OGG — each have their strengths, but none have MP3&apos;s universal
            compatibility. If you need a single audio file that will open on a
            stranger&apos;s phone, attach to an email, or load onto an old
            MP3 player, MP3 is the safe choice. This page is specifically
            about producing that MP3.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Supported input formats
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The converter is built on FFmpeg, the same engine behind Audacity
            and HandBrake, so it reads any container FFmpeg understands. In
            practice that covers essentially every video file you will
            encounter:
          </p>
          <ul className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-3">
              <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>MP4 and M4V</strong> — the default from iPhones,
                Android, modern cameras, and most editing software. Audio is
                usually AAC.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>MOV</strong> — QuickTime files from older iPhones and
                Macs. Same AAC audio, different container.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>MKV and WebM</strong> — common for screen recordings,
                downloaded video, and web output. Audio is usually Opus or AAC.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>AVI, FLV, 3GP</strong> — older formats that still turn
                up in email attachments and legacy exports. The converter
                handles them too.
              </span>
            </li>
          </ul>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The output is always MP3. Whatever you feed in, you get an MP3
            back.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Step by step: change a video to MP3
          </h2>
          <ol className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                1
              </span>
              <span>
                <strong>Open the converter.</strong> Scroll to the extractor
                at the bottom of this page or head to the homepage. No account
                is required and no software is installed.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                2
              </span>
              <span>
                <strong>Add your video.</strong> Drag and drop the file onto
                the upload area, or pick it from your file manager. On mobile,
                you can pull straight from Photos, Files, or Google Photos.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                3
              </span>
              <span>
                <strong>Choose MP3 and a bitrate.</strong> 192 kbps is the
                sensible default for music, 128 kbps is plenty for speech, and
                320 kbps preserves the most detail at the cost of larger files.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                4
              </span>
              <span>
                <strong>Convert and download.</strong> Click convert. The audio
                is extracted in your browser and the MP3 downloads the moment
                it is ready.
              </span>
            </li>
          </ol>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            A five-minute clip typically finishes in eight to fifteen seconds
            on a modern laptop, and twenty to thirty seconds on a mid-range
            phone. There is no queue and no upload step — the work happens on
            your own CPU, which is also why nothing leaves your device.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Choosing a bitrate: quality versus file size
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            MP3 bitrate is the single biggest lever over output size and
            quality. Bitrate is measured in kilobits per second (kbps): more
            bits means more detail preserved and a larger file. Because MP3 is
            a lossy format, every bitrate throws away some information — the
            question is how much, and whether you can hear it. The converter
            uses the same libmp3lame encoder as Audacity, so the output at a
            given bitrate is identical to what a desktop tool would produce.
          </p>
          <ul className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-3">
              <Music className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>128 kbps</strong> — roughly 1 MB per minute. Ideal for
                speech, podcasts, lectures, and voice memos where the spoken
                word is the only content that matters.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Music className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>192 kbps</strong> — roughly 1.5 MB per minute. The
                default sweet spot for music. Transparent on consumer
                headphones, speakers, and earbuds.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Music className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>320 kbps</strong> — roughly 2.4 MB per minute. The MP3
                ceiling. Use when you want to squeeze maximum detail out of a
                clip and do not mind the larger file.
              </span>
            </li>
          </ul>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            If you are unsure, start at 192 kbps. For a deeper look at where
            MP3 fits relative to its container counterpart, the{" "}
            <Link
              href="/mp4-vs-mp3"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              MP4 vs MP3
            </Link>{" "}
            comparison walks through the trade-offs in detail.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Why browser-based beats installed software
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <ShieldCheck className="h-5 w-5" />
                <h3 className="text-base font-semibold">No upload, ever</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Server-side converters and desktop installers both move your
                file somewhere else. A browser-based tool reads the video from
                your disk, processes it in memory, and writes the MP3 back
                locally. Nothing leaves the device.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Zap className="h-5 w-5" />
                <h3 className="text-base font-semibold">No install, ever</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                No installer to download, no disk permissions to grant, no
                updates to chase. The converter loads as a web page and runs
                the same WebAssembly FFmpeg engine desktop tools use, without
                the packaging.
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
                the encoding itself — no waiting on other users&apos; jobs.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <HardDrive className="h-5 w-5" />
                <h3 className="text-base font-semibold">Nothing stored</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Installed converters leave binaries, caches, and config files
                scattered across your system. A browser tab leaves nothing —
                close it and the file is gone from memory.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            How this differs from changing video to audio
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            &quot;Change video to audio&quot; is the broader phrase — it
            covers any audio output, including WAV, M4A, FLAC, and OGG. This
            page is specifically about producing an MP3. The distinction
            matters because MP3 is the format you reach for when compatibility
            is the priority: it plays everywhere, attaches to any email, and
            loads onto any player. The other formats each trade that
            universality for something else — WAV for lossless quality, FLAC
            for compressed lossless, M4A for slightly better compression at
            the same bitrate.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            If you are not sure which audio format you need, the broader{" "}
            <Link
              href="/change-video-to-audio"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              change video to audio
            </Link>{" "}
            guide walks through the options. If you already know you want MP3
            and want the full browser-based workflow, the{" "}
            <Link
              href="/mp4-to-mp3-online"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              MP4 to MP3 online
            </Link>{" "}
            page covers the underlying engine and privacy model in depth.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Common reasons to change a video to MP3
          </h2>
          <ul className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-3">
              <Music className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Pull music out of a video.</strong> Concert recordings,
                music videos, and rehearsal tapes are easier to listen to on
                the go as an MP3 than as a video you have to keep your screen
                on for.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Mic className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Edit podcast tracks.</strong> Podcasters often record
                video calls as backup. Extracting the audio as MP3 lets you
                drop it straight into a DAW or ship it to a host without
                re-rendering video.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Turn lectures into listenable audio.</strong> A
                two-hour lecture is easier to review on a commute as audio.
                Once it is an MP3 you can speed it up, scrub through it, and
                load it onto any player.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Globe className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Share across any platform.</strong> Email, messaging
                apps, and old hardware all choke on exotic formats. MP3 is the
                one format you can send without checking compatibility first.
              </span>
            </li>
          </ul>
        </section>

        <Citations
          sources={[
            { title: "FFmpeg documentation", url: "https://ffmpeg.org/ffmpeg.html", publisher: "FFmpeg", note: "Official manual for the video-to-MP3 conversion pipeline." },
            { title: "LAME \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/LAME", publisher: "Wikipedia", note: "The libmp3lame encoder used to write the MP3 output." },
            { title: "MP3 \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/MP3", publisher: "Wikipedia", note: "The MP3 format produced by changing video to MP3." },
          ]}
        />

        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
          <h2 className="text-xl font-bold">Change your video to MP3 now</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Free, browser-based, no sign-up, no upload. Your file never leaves
            your device.
          </p>
          <Link
            href="/#extractor"
            className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90"
          >
            <FileAudio className="h-4 w-4" /> Change Video to MP3
          </Link>
        </section>
      </PageShell>
    </>
  );
}
