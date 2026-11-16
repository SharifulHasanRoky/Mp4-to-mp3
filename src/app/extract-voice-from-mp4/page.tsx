import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { QuickAnswer } from "@/components/quick-answer";
import { Citations, type Citation } from "@/components/citations";
import {
  FileAudio,
  Mic,
  Check,
  Volume2,
  Gauge,
  HardDrive,
  Headphones,
} from "lucide-react";

const sources: Citation[] = [
  {
    title: "MP3 — Wikipedia",
    url: "https://en.wikipedia.org/wiki/MP3",
    publisher: "Wikipedia",
    note: "Documents the MP3 format and the lower bitrates (e.g. 128 kbps mono) recommended for speech extraction.",
  },
  {
    title: "Psychoacoustics — Wikipedia",
    url: "https://en.wikipedia.org/wiki/Psychoacoustics",
    publisher: "Wikipedia",
    note: "Explains the psychoacoustic model used by MP3, which is the basis for speech-friendly encoding settings.",
  },
  {
    title: "Advanced Audio Coding — Wikipedia",
    url: "https://en.wikipedia.org/wiki/Advanced_Audio_Coding",
    publisher: "Wikipedia",
    note: "Notes AAC as the typical audio codec inside MP4 interview and lecture recordings, which is re-encoded to MP3.",
  },
  {
    title: "FFmpeg — Wikipedia",
    url: "https://en.wikipedia.org/wiki/FFmpeg",
    publisher: "Wikipedia",
    note: "Background on the FFmpeg framework that performs the in-browser demux and re-encode for voice extraction.",
  },
];

export const metadata: Metadata = {
  title: "How to Extract Voice from MP4 — Free Speech Extraction",
  description:
    "Extract speech or voice from MP4 as MP3 with speech-optimized settings (mono, 128kbps). Free, no sign-up, no upload. Try it now.",
  alternates: { canonical: "/extract-voice-from-mp4" },
  openGraph: {
    title: "How to Extract Voice or Speech from MP4 Video Files",
    description:
      "Turn speeches, interviews, lectures, and podcasts inside MP4 videos into clean MP3 files. Mono 128 kbps is the speech-optimized sweet spot.",
    url: "https://www.mp4tomp3.online/extract-voice-from-mp4",
    type: "article",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Extract Voice or Speech from MP4 Video Files",
    description:
      "A tutorial on extracting voice and speech — interviews, lectures, speeches, podcasts — from MP4 videos, with speech-optimized MP3 settings and accessibility uses.",
    author: { "@type": "Organization", name: "MP4toMP3.online" },
    publisher: { "@type": "Organization", name: "MP4toMP3.online" },
    mainEntityOfPage: "https://www.mp4tomp3.online/extract-voice-from-mp4",
    datePublished: "2026-11-16",
    dateModified: "2026-11-16",
    citation: [
      "https://en.wikipedia.org/wiki/MP3",
      "https://en.wikipedia.org/wiki/Psychoacoustics",
      "https://en.wikipedia.org/wiki/Advanced_Audio_Coding",
      "https://en.wikipedia.org/wiki/FFmpeg",
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell
        title="Extract Voice from MP4 Videos"
        subtitle="Turn interviews, lectures, speeches, and podcasts trapped inside MP4 videos into clean, small MP3 files you can listen to anywhere. Speech-optimized settings make all the difference."
      >
        <QuickAnswer>
          To extract voice from an MP4 video, open MP4toMP3.online, drop in
          your file, choose MP3 at 128 kbps in mono, and click Convert. Mono
          is important for speech because both channels usually carry the same
          voice, and 128 kbps is plenty for intelligible, natural-sounding
          voice while keeping files small enough to email or store hundreds of
          on a phone.
        </QuickAnswer>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Why voice is different from music
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            <Mic className="mr-1 inline h-4 w-4 text-primary" />
            Voice and music occupy very different parts of the spectrum and
            behave very differently under compression. Speech lives mostly
            between 80 Hz and 8 kHz, with the intelligibility-critical consonant
            bursts crammed into the 2 to 4 kHz range. Music spans the full 20 Hz
            to 20 kHz range and is far more demanding of the encoder. The
            implication is simple: the bitrate that is transparent for music is
            overkill for speech, and you can shrink voice files dramatically
            without anyone noticing.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            A two-hour lecture encoded as 320 kbps stereo MP3 is roughly 280
            MB. The same lecture at 128 kbps mono is about 115 MB, and at 64 kbps
            mono it is around 57 MB — still perfectly intelligible. For
            long-form speech content, the size savings compound fast.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Step-by-step: pulling speech out of an MP4
          </h2>
          <ol className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                1
              </span>
              <span>
                <strong>Open MP4toMP3.online</strong> in any modern browser.
                There is no sign-up and no install; the tool runs entirely
                client-side.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                2
              </span>
              <span>
                <strong>Drop in your MP4.</strong> The file is read from disk
                into browser memory and never uploaded.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                3
              </span>
              <span>
                <strong>Set MP3, 128 kbps, mono.</strong> Downmixing to mono
                is the single most important setting for voice — stereo doubles
                the file size for zero perceptual gain when the source is a
                single speaker.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                4
              </span>
              <span>
                <strong>Click Convert.</strong> A one-hour lecture typically
                finishes in 1 to 3 minutes on a modern laptop, faster on a
                desktop.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                5
              </span>
              <span>
                <strong>Download the MP3</strong> and drop it into your podcast
                app, notes folder, or wherever you keep audio you want to
                revisit.
              </span>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Speech-optimized settings explained
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Gauge className="h-5 w-5" />
                <h3 className="text-base font-semibold">Mono</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Most voice recordings are effectively mono — a single mic
                captured into two identical channels. Encoding as stereo
                wastes half the bitrate on a duplicate. Downmix to mono and
                every bit goes toward the actual voice.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Volume2 className="h-5 w-5" />
                <h3 className="text-base font-semibold">128 kbps</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                The sweet spot for clean speech. Indistinguishable from the
                source for almost all listeners. About 1 MB per minute, so a
                60-minute lecture is around 57 MB.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Gauge className="h-5 w-5" />
                <h3 className="text-base font-semibold">64 to 96 kbps</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Acceptable for archival of long lectures where storage is the
                priority. Slight high-frequency softening, but speech stays
                perfectly intelligible.
              </p>
            </div>
          </div>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            For more on why these numbers do what they do, our{" "}
            <Link
              href="/bitrate-explained"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              bitrate explainer
            </Link>{" "}
            covers the tradeoff curve and the high-frequency cutoff at each
            tier. The 128 kbps mono recommendation is a direct application of
            that curve to speech content.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            What kinds of voice this works for
          </h2>
          <ul className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-3">
              <Mic className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Interviews and Q&amp;A</strong> captured as video,
                where you want the audio for transcription or later listening
                without the visuals.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Headphones className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Lectures and conference talks</strong> recorded for
                later review. A 90-minute lecture at 128 kbps mono fits easily
                on a phone alongside hundreds of others.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Volume2 className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Speeches and keynote addresses</strong> you want to
                re-listen to or share as audio-only.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HardDrive className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Podcast source material</strong> — long-form interviews
                recorded over video calls that you want as MP3 for your podcast
                library or for transcription.
              </span>
            </li>
          </ul>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            What this is not: a way to clean up bad audio. If the source MP4
            has heavy background noise, the conversion preserves it. Noise
            reduction is a separate processing step that needs a dedicated audio
            editor like Audacity. The conversion here is faithful — it gives
            you the audio exactly as it sits in the MP4, just in MP3 form.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Accessibility: a real use case
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            <Check className="mr-1 inline h-4 w-4 text-primary" />
            Extracting voice from MP4 is also an accessibility workflow. A
            lecture video that is hard to follow visually becomes a listenable
            MP3 you can absorb while walking or commuting. A recorded meeting
            turns into audio you can scan at 1.5x speed in any podcast player.
            For users who rely on screen readers or who process audio more
            easily than video, having the speech as a standalone file is not a
            convenience — it is the difference between accessible and not.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Mono 128 kbps MP3 is also the format most speech-to-text services
            and transcription tools ingest cleanly. If your goal is to feed the
            audio into Whisper or another transcriber, that combination is a
            safe, broadly compatible choice.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            A note on separating voice from music
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            If your MP4 has both a voice and background music — say, a vlog or
            a documentary clip — this conversion extracts both together as a
            single mixed audio track. Separating the voice from the music
            underneath is a much harder problem called stem separation, which
            requires AI models like Spleeter or Demucs. MP4toMP3.online does
            not do stem separation; it gives you the full mixed audio cleanly
            and faithfully. For background-music scenarios specifically, the{" "}
            <Link
              href="/extract-background-music-from-mp4"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              background music extraction guide
            </Link>{" "}
            is honest about what is and is not possible.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            For the broader mechanics of pulling any audio out of an MP4 —
            format choices, sample rate, where the file lands — the{" "}
            <Link
              href="/extract-audio-from-mp4"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              extract audio from MP4
            </Link>{" "}
            tutorial is the general reference this one specializes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            What to do with the extracted voice
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Once you have the MP3, the practical uses open up quickly. Drop it
            into a podcast app that supports local files — most do, including
            Apple Podcasts via a sync, and open-source players like VLC,
            Musicolet, and Pocket Casts — and you get playback-speed control,
            a sleep timer, and bookmarking, all of which are painful to manage
            inside a video player. The same file feeds cleanly into a
            transcription service if you need a written record; mono 128 kbps
            MP3 is a format Whisper, Otter, and similar tools ingest without
            conversion.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            For long-form content, the smaller file size of voice-optimized
            settings compounds: a semester of one-hour lectures at 128 kbps
            mono is around 4 GB, compared with 11 GB at 320 kbps stereo — and
            the second number gains you nothing audible. The right settings
            are not just a stylistic preference; they are what make a phone
            library of speech content actually fit and stay usable.
          </p>
        </section>

        <Citations sources={sources} />

        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
          <h2 className="text-xl font-bold">
            Extract voice from your MP4 now
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Browser-based, no upload, no sign-up. Your file never leaves your
            device.
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
