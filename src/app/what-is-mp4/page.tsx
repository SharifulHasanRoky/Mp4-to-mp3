import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { QuickAnswer } from "@/components/quick-answer";
import {
  FileAudio,
  Film,
  Layers,
  Boxes,
  FileVideo,
} from "lucide-react";

export const metadata: Metadata = {
  title: "What Is MP4? Video Container Format Explained Simply",
  description:
    "MP4 is a digital multimedia container that holds video, audio, subtitles, and metadata in one file. Learn its structure, codecs, history, and how it differs from MP3.",
  alternates: { canonical: "/what-is-mp4" },
  openGraph: {
    title: "What Is MP4? Video Container Format Explained Simply",
    description:
      "MP4 is a digital multimedia container holding video, audio, subtitles and metadata. Learn structure, codecs, and history.",
    url: "https://www.mp4tomp3.online/what-is-mp4",
    type: "article",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What Is MP4? Video Container Format Explained",
    description:
      "An explainer of the MP4 container format: its structure, the codecs inside, the file extension, and its history.",
    author: { "@type": "Organization", name: "MP4toMP3.online" },
    publisher: { "@type": "Organization", name: "MP4toMP3.online" },
    mainEntityOfPage: "https://www.mp4tomp3.online/what-is-mp4",
    datePublished: "2026-11-16",
    dateModified: "2026-11-16",
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell
        title="What Is MP4? Video Container Format Explained"
        subtitle="MP4 is the most common video file format on earth. It is not a single thing — it is a container that holds a video stream, an audio stream, subtitles, and metadata, all packaged into one file. Here is what is actually inside."
      >
        {/* Voice-search quick answer for "What is an MP4 file?" */}
        <QuickAnswer>
          An MP4 file is a digital multimedia container that holds compressed
          video, audio, subtitles, and metadata in a single file. MP4 is
          not a codec — it is a box that stores streams encoded with
          separate codecs, usually H.264 video and AAC audio. The extension
          is .mp4.
        </QuickAnswer>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            MP4 is a container, not a codec
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The single most important thing to understand about MP4 is that
            it is a <em>container format</em>, not a compression algorithm.
            Think of an MP4 file as a shipping box. Inside that box are
            several separate packages: a video stream, one or more audio
            streams, optional subtitles, and metadata such as the title and
            duration. The box itself does not care how each package was
            compressed — it just holds them and tracks where each one starts
            and ends.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            This is why two MP4 files of the same length can look and sound
            very different, and why a file labelled simply &quot;.mp4&quot;
            tells you almost nothing about the quality. The video inside
            could be encoded with the older H.264 codec or the newer H.265
            codec; the audio could be AAC, MP3, or even lossless ALAC. The
            container does not define the contents, only how they are
            packed. To go deeper on this distinction, see the{" "}
            <Link
              href="/container-formats-explained"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              container formats guide
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            What is inside an MP4
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Open any MP4 in a metadata viewer and you will see a tree of
            &quot;boxes&quot; (also called &quot;atoms&quot;). Each box has
            a four-letter type and a length, and may contain other boxes.
            The structure is hierarchical and extensible — that is how MP4
            has survived three decades of format evolution without breaking
            old players.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Film className="h-5 w-5" />
                <h3 className="text-base font-semibold">Video track</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Almost always H.264 (AVC) or H.265 (HEVC). The codec stores
                resolution, frame rate, colour space, and the compressed
                frames themselves.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <FileAudio className="h-5 w-5" />
                <h3 className="text-base font-semibold">Audio track</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Usually AAC, occasionally MP3 or ALAC. MP4 can hold multiple
                language tracks for the same video.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Layers className="h-5 w-5" />
                <h3 className="text-base font-semibold">Subtitles</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Stored as tx3g or MPEG-4 Timed Text, sometimes as SRT. Allows
                multiple subtitle languages in one file.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Boxes className="h-5 w-5" />
                <h3 className="text-base font-semibold">Metadata</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Title, artist, year, cover art, chapter markers. Lives in
                the moov box and is editable without re-encoding.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            The file extension and its cousins
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The .mp4 extension is the everyday face of the format, but the
            same container has several specialised siblings. <strong>.m4a</strong>{" "}
            is an MP4 that contains only audio — Apple popularised it for
            songs sold on the iTunes Store. <strong>.m4v</strong> is
            Apple&apos;s variant for video, with optional DRM. <strong>.m4r</strong>{" "}
            is an iPhone ringtone, which is just an M4A capped at 30 seconds
            and renamed. <strong>.m4p</strong> was the protected
            DRM-locked format Apple retired in 2009. All of them are
            structurally MP4 files.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            This matters when you convert. A browser-based extractor that
            reads MP4 will also read M4A, M4V, and M4R files — the demuxer
            is the same. The container family is what counts, not the
            extension.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            A brief history of MP4
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            MP4 traces back to the QuickTime File Format, which Apple
            developed in the early 1990s for the QuickTime player. The
            International Organization for Standardization (ISO) and the
            Moving Picture Experts Group (MPEG) adopted QuickTime&apos;s
            box-based structure as the basis for the MPEG-4 Part 14
            specification, finalised in 2001. The earlier MPEG-4 Part 1
            specification had defined a more general container; Part 14
            refined it into the MP4 we use today.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Adoption was slow at first because the format arrived alongside
            a wave of competing formats — RealVideo, Windows Media Video,
            DivX. MP4 pulled ahead in the late 2000s once H.264 became the
            default video codec for both web (HTML5 video) and disc (Blu-ray)
            and once Apple shipped every iPhone video as MP4. Today MP4 is
            the closest thing the internet has to a universal video format,
            and the basic structure has not needed to change in twenty years.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Why MP4 won
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Three properties explain MP4&apos;s dominance. First, it is{" "}
            <strong>streamable</strong>: the metadata (the moov box) can sit
            at the start of the file, so a player can begin playback before
            the file finishes downloading. Second, it is{" "}
            <strong>extensible</strong>: new codecs can be added without
            breaking old players, because players simply skip boxes they do
            not recognise. Third, it is <strong>royalty-capped</strong>:
            while the codecs inside MP4 (notably H.264 and HEVC) carry
            licensing costs, the container itself is open and
            royalty-free, which has kept the format attractive for tooling.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The combination of those properties — plus the network effect of
            every phone, browser, and editor supporting it — means MP4 is
            the default output of virtually every camera, screen recorder,
            and editing app. Which is why, if you want the audio from a
            video, MP4 is almost always what you start with. For a
            side-by-side of MP4 against the audio-only MP3, the{" "}
            <Link
              href="/mp4-vs-mp3"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              MP4 vs MP3
            </Link>{" "}
            guide walks through the differences.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            What this means for converting MP4 to MP3
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Because MP4 is a container, converting it to MP3 is not a
            transcode of the whole file — it is an extraction of one
            specific stream. The converter opens the MP4 box, finds the
            audio track (usually AAC), decodes it to raw PCM, and re-encodes
            the PCM as MP3. The video track is discarded untouched. The
            subtitles and metadata are discarded too. The result is an
            audio-only file that contains exactly the same audio you would
            hear if you played the original video.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            This is why MP4 to MP3 conversion is fast and lossless-within-a-
            generation: the heavy lifting of compressing the video was done
            once at recording time, and the audio extraction only has to
            touch one stream. For the practical side of doing this in a
            browser, the{" "}
            <Link
              href="/how-to-convert-mp4-to-mp3"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              how-to guide
            </Link>{" "}
            walks through the steps.
          </p>
        </section>

        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
          <h2 className="text-xl font-bold">Extract audio from an MP4 now</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            MP4toMP3.online opens the container, pulls the audio stream, and
            re-encodes it as MP3 — all in your browser, no upload.
          </p>
          <Link
            href="/#extractor"
            className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90"
          >
            <FileVideo className="h-4 w-4" /> Extract audio from MP4
          </Link>
        </section>
      </PageShell>
    </>
  );
}
