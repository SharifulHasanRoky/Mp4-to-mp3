import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { QuickAnswer } from "@/components/quick-answer";
import { Citations, type Citation } from "@/components/citations";
import {
  FileAudio,
  Gauge,
  Mic,
  BookOpen,
  Wifi,
  HardDrive,
  AlertTriangle,
  SlidersHorizontal,
} from "lucide-react";

export const metadata: Metadata = {
  title: "MP4 to MP3 at 128 kbps — Smallest File Size Conversion",
  description:
    "Convert MP4 to MP3 at 128 kbps for the smallest file size. Learn when 128 kbps is enough for voice, speech, audiobooks, low bandwidth, and when to avoid it.",
  alternates: { canonical: "/mp4-to-mp3-128kbps" },
  openGraph: {
    title: "MP4 to MP3 at 128 kbps — Smallest File Size Conversion",
    description:
      "When 128 kbps is enough for voice and speech, how much you save, and when it is the wrong choice.",
    url: "https://www.mp4tomp3.online/mp4-to-mp3-128kbps",
    type: "article",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "MP4 to MP3 at 128 kbps — Smallest File Size Conversion",
    description:
      "A guide to converting MP4 to MP3 at 128 kbps for the smallest practical file size. Covers when 128 kbps is enough, the size savings, the quality tradeoffs, how to select 128 kbps, and when to avoid it.",
    author: { "@type": "Organization", name: "MP4toMP3.online" },
    publisher: { "@type": "Organization", name: "MP4toMP3.online" },
    mainEntityOfPage: "https://www.mp4tomp3.online/mp4-to-mp3-128kbps",
    datePublished: "2026-11-16",
    dateModified: "2026-11-16",
    citation: [
      "https://en.wikipedia.org/wiki/MP3",
      "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs",
      "https://ffmpeg.org/ffmpeg-codecs.html",
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell
        title="MP4 to MP3 at 128 kbps"
        subtitle="The smallest practical MP3 size — perfect for speech, voice memos, and low-bandwidth sharing, and a bad idea for music."
      >
        {/* Voice-search quick answer — read aloud by Google Assistant
            when users ask "How do I make the smallest MP3 from an MP4?" */}
        <QuickAnswer>
          To make the smallest MP3 from an MP4, open MP4toMP3.online, upload
          your file, pick MP3, and select 128 kbps from the bitrate dropdown.
          A 128 kbps MP3 is roughly 1 MB per minute of audio, small enough
          for email attachments and slow connections while staying clear for
          speech.
        </QuickAnswer>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            What you get at 128 kbps
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            128 kbps is the bitrate most people reach for when file size
            matters more than fidelity. At 128 kilobits per second, an MP3
            uses about 1 MB of storage per minute of audio. A four-minute
            song lands at roughly 3.8 MB, a one-hour lecture at about 60 MB,
            a ten-minute voice memo under 10 MB. For comparison, the same
            material at 320 kbps would be 2.5 times larger.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            On a metered mobile connection or a shared inbox with a 25 MB
            attachment cap, that size difference is the difference between a
            file that sends and one that bounces. 128 kbps is also the
            format of the original Napster-era MP3, which is a useful
            reminder: at this bitrate, music is recognizable but degraded,
            while speech is essentially unaffected.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            When 128 kbps is genuinely enough
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Mic className="h-5 w-5" />
                <h3 className="text-base font-semibold">
                  Voice memos and interviews
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Speech has a narrow frequency range — roughly 100 Hz to 8 kHz
                — and very little stereo information. 128 kbps carries all
                of it cleanly, with no audible artifacts on any normal
                playback equipment.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <BookOpen className="h-5 w-5" />
                <h3 className="text-base font-semibold">Audiobooks</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Most commercial audiobook platforms deliver at 64 kbps mono
                or 128 kbps stereo. 128 kbps is the upper bound of what an
                audiobook ever needs, and well above what spoken content
                requires.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Wifi className="h-5 w-5" />
                <h3 className="text-base font-semibold">
                  Low-bandwidth sharing
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Sending a clip over a slow connection, posting to a forum
                with size limits, or fitting a podcast onto a cheap player
                — 128 kbps keeps files small enough to move without
                friction.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <HardDrive className="h-5 w-5" />
                <h3 className="text-base font-semibold">Bulk archives</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                If you are storing hundreds of hours of lectures, sermons,
                or meeting recordings, 128 kbps is a sensible cap. The
                alternative is burning through storage for detail nobody
                will ever perceive.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            The size savings, in numbers
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Bitrate scales linearly with file size, so the savings at 128
            kbps are predictable. Compared to{" "}
            <Link
              href="/mp4-to-mp3-320kbps"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              320 kbps
            </Link>
            , a 128 kbps file is 40% of the size — a 60% reduction. Compared
            to{" "}
            <Link
              href="/mp4-to-mp3-192kbps"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              192 kbps
            </Link>
            , it is 67% of the size — a 33% reduction.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Concretely, a one-hour lecture goes from about 144 MB at 320
            kbps to roughly 86 MB at 192 kbps to about 58 MB at 128 kbps.
            Across a semester of forty lectures that is the difference
            between 5.8 GB, 3.4 GB, and 2.3 GB of storage. On a phone, that
            is the difference between &quot;I have room for the whole
            course&quot; and &quot;I will delete three apps first.&quot;
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            The quality tradeoffs, honestly
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            For speech, 128 kbps is essentially lossless in practice. The
            human voice does not contain the high-frequency transients and
            dense harmonic content that MP3 struggles with. You will not
            hear artifacts on a podcast, an interview, a lecture, or a voice
            memo at 128 kbps, and you would have to listen very carefully
            on very good equipment to find them.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            For music, the picture changes. At 128 kbps the MP3 encoder has
            to throw away enough data that artifacts become audible: cymbals
            sound metallic and smeared, the stereo image narrows, reverb
            tails blur into a wash, and quiet passages after loud ones can
            suffer from pre-echo. None of this makes the music unlistenable
            — most streaming radio still uses 128 kbps — but it is clearly
            not the source. The step up to 192 kbps fixes the majority of
            these issues; the step from 192 to 320 fixes almost nothing
            audible.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            How to select 128 kbps in MP4toMP3.online
          </h2>
          <ol className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                1
              </span>
              <span>
                Open the homepage and drag your MP4 file onto the upload
                area.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                2
              </span>
              <span>
                Set the output format to <strong>MP3</strong>.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                3
              </span>
              <span>
                <SlidersHorizontal className="inline h-4 w-4 text-primary" />{" "}
                Open the bitrate dropdown and pick{" "}
                <strong>128 kbps</strong>.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                4
              </span>
              <span>
                Click <strong>Convert</strong>. Encoding runs entirely in
                your browser via WebAssembly FFmpeg, so the file never
                leaves your device.
              </span>
            </li>
          </ol>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            For speech content you can go even smaller. Many spoken-word
            files sound fine at 64 kbps mono, which halves the size again.
            The 128 kbps option is the safer default because it preserves
            stereo and leaves headroom for unexpected music beds. For a
            full walkthrough of every option, see the{" "}
            <Link
              href="/how-to-convert-mp4-to-mp3"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              how-to-convert-MP4-to-MP3 guide
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            When you should NOT use 128 kbps
          </h2>
          <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-500">
              <AlertTriangle className="h-5 w-5" />
              <h3 className="text-base font-semibold">
                Avoid 128 kbps for these cases
              </h3>
            </div>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
              <li className="flex items-start gap-2">
                <Gauge className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600 dark:text-amber-400" />
                <span>
                  <strong>Music archiving.</strong> If the file is meant to
                  be kept and re-listened to for years, the artifacts at 128
                  kbps will grate. Use 320 kbps for archival music.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Gauge className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600 dark:text-amber-400" />
                <span>
                  <strong>DJ and remix material.</strong> Stems and loops
                  get stretched, pitched, and re-encoded downstream. Starting
                  at 128 kbps compounds the loss across generations.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Gauge className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600 dark:text-amber-400" />
                <span>
                  <strong>Critical listening on good gear.</strong> Studio
                  monitors and reference headphones will expose 128 kbps
                  artifacts immediately, even on speech-heavy material.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Gauge className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600 dark:text-amber-400" />
                <span>
                  <strong>Anything that will be re-encoded.</strong> Every
                  lossy re-encode adds artifacts. A 128 kbps source fed
                  into another lossy encoder degrades fast.
                </span>
              </li>
            </ul>
          </div>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            If any of those apply, the right move is to step up. The{" "}
            <Link
              href="/best-mp4-to-mp3-converter"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              best MP4 to MP3 converter overview
            </Link>{" "}
            walks through how to choose between 192 and 320 for music, and
            the{" "}
            <Link
              href="/mp4-vs-mp3"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              MP4 vs MP3 comparison
            </Link>{" "}
            explains why re-encoding an already-lossy source at a low
            bitrate is the worst of both worlds.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            A note on mono versus stereo
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Speech is almost always mono in its meaningful content — the
            human mouth is a single point source. Encoding a mono source as
            stereo MP3 at 128 kbps splits the bitrate across two channels,
            giving each channel only 64 kbps of effective bandwidth. For
            voice content, switching the encoder to mono at 128 kbps gives
            you the same file size but noticeably cleaner speech, because
            the full 128 kbps is available to a single channel.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            MP4toMP3.online exposes a mono/stereo toggle next to the bitrate
            selector. For interviews, lectures, and voice memos, mono is
            usually the better choice and costs nothing in file size.
          </p>
        </section>

        <Citations
          sources={[
            { title: "MP3 \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/MP3", publisher: "Wikipedia", note: "The 128 kbps bitrate commonly used for spoken-word and streaming MP3." },
            { title: "Audio codecs \u2014 MDN", url: "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs", publisher: "Mozilla MDN", note: "Bitrate guidelines for speech versus music across web codecs." },
            { title: "FFmpeg codecs documentation", url: "https://ffmpeg.org/ffmpeg-codecs.html", publisher: "FFmpeg", note: "Setting -b:a 128k with the libmp3lame encoder." },
          ]}
        />

        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
          <h2 className="text-xl font-bold">
            Convert MP4 to MP3 at 128 kbps now
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Free, browser-based, no sign-up, no upload. Smallest practical
            MP3, straight from your device.
          </p>
          <Link
            href="/#extractor"
            className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90"
          >
            <FileAudio className="h-4 w-4" /> Convert at 128 kbps
          </Link>
        </section>
      </PageShell>
    </>
  );
}
