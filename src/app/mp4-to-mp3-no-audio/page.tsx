import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { QuickAnswer } from "@/components/quick-answer";
import { Citations, type Citation } from "@/components/citations";
import {
  FileAudio,
  VolumeX,
  AlertTriangle,
  Ear,
  Check,
  Settings2,
} from "lucide-react";

const sources: Citation[] = [
  {
    title: "MPEG-4 — Wikipedia",
    url: "https://en.wikipedia.org/wiki/MPEG-4",
    publisher: "Wikipedia",
    note: "Explains how MP4 stores multiple audio and video streams, which is why the wrong stream can be selected during conversion.",
  },
  {
    title: "FFmpeg — Wikipedia",
    url: "https://en.wikipedia.org/wiki/FFmpeg",
    publisher: "Wikipedia",
    note: "Documents the FFmpeg behavior — including -map and ffprobe — used to detect missing audio tracks and select the correct stream.",
  },
  {
    title: "MP3 — Wikipedia",
    url: "https://en.wikipedia.org/wiki/MP3",
    publisher: "Wikipedia",
    note: "Describes the MP3 output format, confirming that a silent MP3 indicates the encode ran but the source stream was empty.",
  },
  {
    title: "Audio codeсs — MDN Web Docs",
    url: "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs",
    publisher: "Mozilla MDN",
    note: "Lists the audio codecs browsers can decode, which is the basis for diagnosing unsupported-codec failures in MP4 sources.",
  },
];

export const metadata: Metadata = {
  title: "MP4 Has No Audio? Fix It Before Converting — Free",
  description:
    "Why some MP4 files have no audio track and how to check before converting to MP3. Free troubleshooting guide. No sign-up required.",
  alternates: { canonical: "/mp4-to-mp3-no-audio" },
  openGraph: {
    title: "Fix: MP4 to MP3 Conversion Has No Audio — Causes & Fixes",
    description:
      "Silent MP3 after converting MP4? Diagnose no audio track, wrong stream, codec issues and conversion errors, and fix each one.",
    url: "https://www.mp4tomp3.online/mp4-to-mp3-no-audio",
    type: "article",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Fix: MP4 to MP3 Conversion Has No Audio — Causes & Fixes",
    description:
      "A troubleshooting guide for MP4 to MP3 conversions that produce a silent MP3, covering four common causes and their fixes.",
    author: { "@type": "Organization", name: "MP4toMP3.online" },
    publisher: { "@type": "Organization", name: "MP4toMP3.online" },
    mainEntityOfPage: "https://www.mp4tomp3.online/mp4-to-mp3-no-audio",
    datePublished: "2026-11-16",
    dateModified: "2026-11-16",
    citation: [
      "https://en.wikipedia.org/wiki/MPEG-4",
      "https://en.wikipedia.org/wiki/FFmpeg",
      "https://en.wikipedia.org/wiki/MP3",
      "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs",
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell
        title="Fix: MP4 to MP3 Conversion Has No Audio"
        subtitle="Converted an MP4 to MP3 and got a silent file? Walk through the four real causes — and the fix for each — in under five minutes."
      >
        {/* Voice-search quick answer for "Why does my MP3 have no audio
            after converting from MP4?" */}
        <QuickAnswer>
          Your MP3 is silent after converting from MP4 for one of four
          reasons: the source MP4 has no audio track, the wrong audio
          stream was selected, the audio codec is unsupported, or the
          encoder crashed silently. Play the source MP4 to confirm it has
          sound, then inspect its streams with MediaInfo before retrying.
        </QuickAnswer>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Why a converted MP3 ends up silent
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            A silent MP3 is the single most common MP4 to MP3 support
            complaint, and it almost always points to one of four root causes
            rather than a broken converter. Before blaming the tool, work
            through this list in order — most users find the problem in the
            first two steps, and none of the fixes take more than a couple of
            minutes.
          </p>
        </section>

        <section>
          <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
            <VolumeX className="h-6 w-6 text-primary" /> Cause 1: the source
            MP4 has no audio track
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The most common cause is the simplest one: the MP4 file you
            converted contains only a video stream and no audio at all. This
            happens frequently with screen recordings that captured a muted
            microphone, with stock footage downloaded from free libraries,
            and with proxy files exported by video editors that strip audio
            by default. A converter cannot invent sound that was never
            recorded — it can only transcode what is already inside the
            container.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            To check, play the source MP4 in any media player with the
            volume turned all the way up. If you hear nothing, the file itself
            is silent and no conversion setting will help. For a definitive
            answer, open the file in <em>MediaInfo</em> or VLC&apos;s{" "}
            <em>Codec Information</em> dialog and confirm that an audio stream
            is actually listed. If there is no audio stream, you need to
            re-export the file from its original source with audio enabled —
            the converter is doing its job correctly on an audio-less input.
          </p>
        </section>

        <section>
          <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
            <Settings2 className="h-6 w-6 text-primary" /> Cause 2: the wrong
            audio stream was selected
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            An MP4 can hold several audio streams at once — for example a
            feature film with English, Spanish, and a director&apos;s
            commentary track. Some converters pick the first stream by
            default, which may be a silent or near-silent commentary track
            rather than the main mix you actually wanted. The resulting MP3
            is technically valid and plays without error, which is exactly
            why this cause is so confusing: nothing looks broken.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The fix is to select a different audio track before converting. A
            track selector appears under the file preview once a multi-track
            file is loaded; pick the stream whose language or label matches
            the audio you want. If the converter exposes no track selector
            and you only have a single source file, you can demux the desired
            stream manually with FFmpeg:{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-sm">
              ffmpeg -i input.mp4 -map 0:a:1 -c:a libmp3lame output.mp3
            </code>{" "}
            extracts the second audio track (index 1) and re-encodes it as
            MP3.
          </p>
        </section>

        <section>
          <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
            <AlertTriangle className="h-6 w-6 text-primary" /> Cause 3: the
            audio codec is not supported
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            MP4 is a container, not a codec, and it can wrap many different
            audio formats. Most MP4s use AAC, which every converter handles.
            But an MP4 can also hold E-AC-3 (Dolby Digital Plus), ALAC, FLAC,
            Opus, or — increasingly on downloaded video — DTS. Some
            converters, especially older desktop ones and a few online tools,
            only know how to demux AAC and silently produce an empty MP3 when
            they hit anything else. The file finishes, looks normal, and
            plays as silence.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Check the codec in MediaInfo under the Audio section. If it is
            anything other than AAC or MP3, use a converter built on a full
            FFmpeg build — FFmpeg decodes every common audio codec. A
            browser-based converter that ships the complete FFmpeg
            WebAssembly build handles E-AC-3, ALAC, FLAC, and Opus without
            you needing to know which one your file uses. For background on
            why MP4 wraps so many codecs in the first place, our{" "}
            <Link
              href="/mp4-vs-mp3"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              MP4 vs MP3 explainer
            </Link>{" "}
            breaks down the container-versus-codec distinction.
          </p>
        </section>

        <section>
          <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
            <AlertTriangle className="h-6 w-6 text-primary" /> Cause 4: the
            encoder crashed silently
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The rarest cause is a real conversion failure that the tool
            swallowed: the FFmpeg process crashed partway through and wrote a
            valid MP3 header but no audio frames. The output file looks
            normal — same name, same extension, a few kilobytes in size — but
            plays as silence. This usually points to an out-of-memory
            condition or a slightly corrupted source file rather than a codec
            issue.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Diagnose it by checking the output file size. A real MP3 of a
            3-minute clip at roughly 190 kbps should be about 4 MB. If your
            output is a tenth of that or smaller, the encoder failed
            mid-write. Retry the conversion, and if it fails again on the
            same file, the source is likely truncated — re-download or
            re-export it. Our companion guide to{" "}
            <Link
              href="/mp4-to-mp3-conversion-failed"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              MP4 to MP3 conversion failures
            </Link>{" "}
            covers the encoder-crash case in more depth, including which
            browsers handle long files best.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            A 60-second diagnostic checklist
          </h2>
          <ul className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-3">
              <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Play the source MP4.</strong> If it is silent, the
                problem is upstream — re-export with audio enabled.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Ear className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Open it in MediaInfo.</strong> Confirm an audio
                stream exists and note the codec.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings2 className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>If multi-track, pick the right stream.</strong> Use
                the track selector in the converter or demux with FFmpeg.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Check the output file size.</strong> Anything far
                below 1 MB per minute of audio means the encoder failed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Retry on a second browser.</strong> If the file is
                fine and the codec is common, a browser extension or memory
                pressure may be at fault.
              </span>
            </li>
          </ul>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            If you want a fuller walkthrough of the whole pipeline —
            including which bitrate to pick once audio is working — the{" "}
            <Link
              href="/how-to-convert-mp4-to-mp3"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              how to convert MP4 to MP3
            </Link>{" "}
            guide covers each step with screenshots.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            How the browser-based approach avoids silent output
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            A surprising amount of silent-MP3 reports come from server-side
            converters that hit a memory or timeout limit mid-job and return
            a partial file rather than an error. Browser-based conversion
            changes that equation. Because the file never leaves your device,
            there is no upload timeout to trip, no shared server memory to
            exhaust, and no queue position to lose. If the encoder fails, you
            see it immediately — the conversion either completes with a
            playable MP3 or surfaces a clear error message instead of a
            half-written file.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            MP4toMP3.online runs the full FFmpeg WebAssembly build, which
            means it handles every audio codec you are realistically going
            to find inside an MP4, exposes a track selector for multi-stream
            files, and reports encoder errors instead of swallowing them.
            For most users that combination eliminates three of the four
            causes above without any manual diagnosis — and the fourth
            (silent source) becomes obvious the moment you play the input
            file.
          </p>
        </section>

        <Citations sources={sources} />

        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
          <h2 className="text-xl font-bold">Convert MP4 to MP3 now</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Browser-based, no upload, no sign-up. Full FFmpeg build,
            multi-track support, clear errors.
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
