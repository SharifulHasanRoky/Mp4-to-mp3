import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { QuickAnswer } from "@/components/quick-answer";
import { Citations, type Citation } from "@/components/citations";
import {
  FileAudio,
  Music,
  Film,
  Download,
  Smartphone,
  Monitor,
} from "lucide-react";

const sources: Citation[] = [
  {
    title: "MPEG-4 — Wikipedia",
    url: "https://en.wikipedia.org/wiki/MPEG-4",
    publisher: "Wikipedia",
    note: "Explains the MP4 container, where audio and video streams are multiplexed and can be separated without re-encoding the audio.",
  },
  {
    title: "MP3 — Wikipedia",
    url: "https://en.wikipedia.org/wiki/MP3",
    publisher: "Wikipedia",
    note: "Confirms MP3 as the universal output format produced once the audio stream is isolated from the MP4.",
  },
  {
    title: "FFmpeg — Wikipedia",
    url: "https://en.wikipedia.org/wiki/FFmpeg",
    publisher: "Wikipedia",
    note: "Documents the FFmpeg -vn flag and libmp3lame encoder used to discard the video and re-encode only the audio.",
  },
  {
    title: "Container formats — MDN Web Docs",
    url: "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Containers",
    publisher: "Mozilla MDN",
    note: "Lists common multimedia containers including MP4, explaining how audio and video tracks coexist within a single file.",
  },
];

export const metadata: Metadata = {
  title: "How to Extract Just the Audio From an MP4 Video File",
  description:
    "Extract only the audio from an MP4 in seconds. Browser-based, no install, no upload. Works on iPhone, Android, Mac and Windows.",
  alternates: { canonical: "/mp4-to-mp3-no-video-just-audio" },
  openGraph: {
    title: "How to Extract Just the Audio From an MP4 Video File",
    description:
      "Extract only the audio from an MP4 in your browser — no install, no upload, no sign-up. Works on iPhone, Android, Mac and Windows.",
    url: "https://www.mp4tomp3.online/mp4-to-mp3-no-video-just-audio",
    type: "article",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Extract Just the Audio From an MP4 Video File",
    description:
      "A practical guide to extracting only the audio stream from an MP4 container and saving it as an MP3, using a browser-based tool with no install and no upload.",
    author: { "@type": "Organization", name: "MP4toMP3.online" },
    publisher: { "@type": "Organization", name: "MP4toMP3.online" },
    mainEntityOfPage:
      "https://www.mp4tomp3.online/mp4-to-mp3-no-video-just-audio",
    datePublished: "2026-11-16",
    dateModified: "2026-11-16",
    citation: [
      "https://en.wikipedia.org/wiki/MPEG-4",
      "https://en.wikipedia.org/wiki/MP3",
      "https://en.wikipedia.org/wiki/FFmpeg",
      "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Containers",
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell
        title="Extract Just the Audio From an MP4"
        subtitle="Keep the soundtrack, the voice memo, the lecture audio. Drop the video. Here is how to do it in seconds, on any device, with no install and no upload."
      >
        {/* Voice-search quick answer for "How do I get only audio from an
            MP4 file?" */}
        <QuickAnswer>
          To get only the audio from an MP4, open MP4toMP3.online in your
          browser, drop the MP4 onto the upload area, choose MP3, and
          click Convert. The tool reads the audio stream inside the MP4,
          re-encodes it to MP3, and discards the video — all locally in
          your browser, so the file is never uploaded anywhere.
        </QuickAnswer>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            What &quot;extract the audio&quot; really means
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            An MP4 is a container, not a format. Inside the container are
            at least two streams: a video stream (usually H.264 or HEVC)
            and an audio stream (usually AAC). When you &quot;extract the
            audio&quot; you are asking the converter to open the container,
            take the audio stream out, re-encode it as MP3, and throw the
            video stream away. The result is a single audio file that
            sounds exactly like the original.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            This is different from screen recording or capturing audio
            while the video plays. Direct extraction reads the encoded
            samples from the file, so there is no quality loss beyond the
            single re-encode from AAC to MP3. It is also far faster than
            real-time recording: a 10-minute clip extracts in a few
            seconds, not 10 minutes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Step by step in the browser
          </h2>
          <ol className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                1
              </span>
              <span>
                <strong>Open the converter.</strong> Load the page in any
                modern browser — Chrome, Firefox, Safari, Edge. Nothing to
                install.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                2
              </span>
              <span>
                <strong>Drop your MP4.</strong> Drag the file onto the
                upload area, or click to pick it from your file picker.
                The file is read into browser memory, never uploaded.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                3
              </span>
              <span>
                <strong>Choose MP3 and convert.</strong> The default
                bitrate (VBR around 190 kbps) is transparent for spoken
                word and good enough for music. Click Convert and wait a
                few seconds.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                4
              </span>
              <span>
                <strong>Download the MP3.</strong> The audio file is
                written to your device. On phones it lands in Downloads or
                Files; on desktop it goes to your default download
                folder.
              </span>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Why this is faster and safer than the alternatives
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Music className="h-5 w-5" />
                <h3 className="text-base font-semibold">Faster than recording</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Recording the audio while the video plays back takes as
                long as the clip itself. Direct extraction runs as fast
                as your CPU can decode, so a 10-minute lecture is done in
                5 seconds, not 10 minutes.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Film className="h-5 w-5" />
                <h3 className="text-base font-semibold">No quality loss</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Recording re-digitises an analogue signal. Extraction
                reads the digital samples straight from the file, so the
                only loss is the single AAC-to-MP3 re-encode, which is
                imperceptible for most content.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Download className="h-5 w-5" />
                <h3 className="text-base font-semibold">No upload</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Browser-based extraction runs FFmpeg in WebAssembly inside
                the page. The file never leaves your device, so there is
                no server copy, no access log, no privacy exposure.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Monitor className="h-5 w-5" />
                <h3 className="text-base font-semibold">No install</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Desktop tools require download, install and updates. A
                browser tool loads instantly and stays up to date on its
                own, which matters most on a work laptop you cannot
                install software on.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Common reasons to extract audio
          </h2>
          <ul className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-3">
              <Smartphone className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Voice memos and interviews.</strong> Pull the audio
                off a recorded video to send as an MP3 in a message or
                email, where video would be too large.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Smartphone className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Lectures and talks.</strong> Listen on a phone or
                music player without burning data on the video stream.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Music className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Music from your own recordings.</strong> Extract a
                live performance you recorded so you can add it to a
                playlist or edit it further.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Film className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Podcast prep.</strong> Pull the audio track off a
                recorded video call so you can edit and publish it as a
                podcast episode.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Quality, bitrate and what to pick
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            For spoken word — interviews, lectures, voice memos, podcasts
            — a bitrate of 128 kbps is more than enough and keeps file
            size small, roughly 1 MB per minute. For music, 192 kbps VBR
            is the sweet spot: transparent to most listeners, around 1.4 MB
            per minute. If you need archival quality, 320 kbps CBR matches
            the top of what MP3 can express, at about 2.4 MB per minute.
            The default in most converters, including this one, lands at
            VBR around 190 kbps, which is a good general-purpose choice.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            One thing to keep in mind: the MP3 format caps the audio at
            48 kHz sample rate, so a 96 kHz source is downsampled during
            extraction. This is rarely audible, but if you are working
            with high-resolution audio and want to preserve it, you
            should extract to a lossless format instead. For most users,
            MP3 is exactly the right choice. For a deeper comparison of
            the formats and containers involved, see our{" "}
            <Link
              href="/mp4-vs-mp3"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              MP4 vs MP3 explainer
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            What if the MP4 has no audio?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Occasionally you will drop a file in, the conversion runs, and
            the resulting MP3 is silent. That almost always means the
            source MP4 has no audio stream at all — for example, a screen
            recording captured with system audio muted, or a video that
            was exported with the audio track disabled. The converter is
            doing its job correctly; there is simply nothing to extract.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            To confirm, play the original MP4 and check whether you hear
            anything. If you do not, the source has no audio and no
            converter can produce audio that was not recorded. Our guide
            to{" "}
            <Link
              href="/mp4-to-mp3-no-audio"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              MP4 files with no audio
            </Link>{" "}
            walks through the diagnosis. For a full walkthrough that
            covers extraction, bitrate choice and every common edge case
            in one place, the{" "}
            <Link
              href="/how-to-convert-mp4-to-mp3"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              how-to-convert-mp4-to-mp3 guide
            </Link>{" "}
            is the right place to start.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            A note on copyright
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Extraction is a tool, not a licence. Only extract audio from
            files you created yourself or have explicit permission to use.
            Pulling audio from someone else&apos;s YouTube video, a film,
            or a streaming platform without permission is illegal in most
            jurisdictions and against our Terms of Service. This tool does
            not connect to streaming platforms and rejects URLs that point
            to them.
          </p>
        </section>

        <Citations sources={sources} />

        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
          <h2 className="text-xl font-bold">Extract the audio now</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Browser-based, no install, no upload. Keep the audio, drop the
            video, in seconds.
          </p>
          <Link
            href="/#extractor"
            className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90"
          >
            <FileAudio className="h-4 w-4" /> Extract Audio From MP4
          </Link>
        </section>
      </PageShell>
    </>
  );
}
