import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { QuickAnswer } from "@/components/quick-answer";
import { Citations, type Citation } from "@/components/citations";
import {
  FileAudio,
  Headphones,
  Languages,
  Repeat,
  Gauge,
  Check,
} from "lucide-react";

const sources: Citation[] = [
  {
    title: "MP3 — Wikipedia",
    url: "https://en.wikipedia.org/wiki/MP3",
    publisher: "Wikipedia",
    note: "Documents the MP3 format and why it is the universal target for language-learning listening material.",
  },
  {
    title: "Psychoacoustics — Wikipedia",
    url: "https://en.wikipedia.org/wiki/Psychoacoustics",
    publisher: "Wikipedia",
    note: "Explains the psychoacoustic model used by MP3, supporting speech-friendly encoding settings for language study.",
  },
  {
    title: "FFmpeg — Wikipedia",
    url: "https://en.wikipedia.org/wiki/FFmpeg",
    publisher: "Wikipedia",
    note: "Background on FFmpeg, which performs the in-browser demux and re-encode to produce the listening-ready MP3.",
  },
  {
    title: "MPEG-4 — Wikipedia",
    url: "https://en.wikipedia.org/wiki/MPEG-4",
    publisher: "Wikipedia",
    note: "Defines the MP4 container that language-lesson videos typically arrive in before extraction.",
  },
];

export const metadata: Metadata = {
  title: "MP4 to MP3 for Language Learning: Best Bitrate & Tips",
  description:
    "Convert MP4 to MP3 for repeat listening and shadowing practice. 128 to 192 kbps balances quality and size for daily commute use. Free, browser-based.",
  alternates: { canonical: "/mp4-to-mp3-for-language-learning" },
  openGraph: {
    title: "MP4 to MP3 for Language Learning: Best Bitrate & Tips",
    description:
      "Settings and workflow for converting MP4 to MP3 for language study — shadowing, repeat listening, and slow-down without artifacts.",
    url: "https://www.mp4tomp3.online/mp4-to-mp3-for-language-learning",
    type: "article",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "MP4 to MP3 for Language Learning: Best Bitrate & Tips",
    description:
      "A practical guide to converting MP4 to MP3 for language study, covering the bitrate, sample rate, and channel layout that suit shadowing, repeat listening, and slow playback.",
    author: { "@type": "Organization", name: "MP4toMP3.online" },
    publisher: { "@type": "Organization", name: "MP4toMP3.online" },
    mainEntityOfPage:
      "https://www.mp4tomp3.online/mp4-to-mp3-for-language-learning",
    datePublished: "2026-11-16",
    dateModified: "2026-11-16",
    citation: [
      "https://en.wikipedia.org/wiki/MP3",
      "https://en.wikipedia.org/wiki/Psychoacoustics",
      "https://en.wikipedia.org/wiki/FFmpeg",
      "https://en.wikipedia.org/wiki/MPEG-4",
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell
        title="Convert MP4 to MP3 for Language Learning"
        subtitle="Podcasts, video lessons, and tutor recordings all become far more useful as MP3s you can scrub, slow down, and replay. Here are the settings and workflow that work."
      >
        <QuickAnswer>
          To convert MP4 to MP3 for language learning, use 44.1 kHz stereo at
          128 to 192 kbps. That preserves the consonants and intonation you
          need for shadowing, keeps the file small enough to fit hours of
          audio on a phone, and stays clean when you slow playback to 0.75x.
          MP4toMP3.online exposes all three settings before conversion.
        </QuickAnswer>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Why language learners want MP3, not MP4
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Language learning is a repetition game. A single two-minute
            dialogue might get replayed twenty times — once at full speed,
            once at 0.75x to catch a tricky liaison, once at 0.5x to nail a
            difficult sound, then on loop during a commute. MP4 files are
            awkward for this. They are five to ten times larger than the
            audio inside them, every player insists on showing the video
            frame, and the screen stays lit, draining battery. Converting
            to MP3 strips the video, lets the screen sleep, and turns a
            file you have to actively watch into one you can listen to
            anywhere.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The other reason is player control. A dedicated audio player
            (Apple Podcasts, VLC, Anytune, Audipo) gives you A-B looping,
            fine-grained speed control, and a scrubbing interface designed
            for sound, not video. Video players offer at best 0.5x and 1.5x
            presets and a single seek bar. For shadowing — repeating aloud
            a fraction of a second after the speaker — the audio-player
            workflow is genuinely better.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            The 128 to 192 kbps sweet spot
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Language audio sits between music and speech. It is not as
            acoustically complex as a full mix, but it carries more
            information than pure speech because the learner needs to hear
            subtle consonants, breath, and intonation cues. Go too low
            (below 96 kbps) and sibilants blur into a hiss; go too high
            (above 256 kbps) and you waste space on detail the ear cannot
            use.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The practical range is 128 to 192 kbps. At 128 kbps, an hour of
            audio is roughly 57 MB — small enough that a semester of
            lessons fits on a phone with room to spare. At 192 kbps, an
            hour is about 86 MB and the quality is transparent on even
            high-end earbuds. Pick 128 if you are converting dozens of
            lessons for storage on a small device; pick 192 if you have
            the space and want to be sure no consonant is smudged.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            For the broader bitrate landscape, the{" "}
            <Link
              href="/mp4-to-mp3-vbr-vs-cbr"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              VBR vs CBR
            </Link>{" "}
            guide walks through what each setting sounds like and how big
            the resulting file gets.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Stereo and sample rate: keep them at the source
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Some tutorials tell language learners to down-mix to mono and
            resample to 16 kHz, the same recipe used for transcription.
            That advice is wrong for learning. Mono is fine for speech
            intelligibility but it strips the spatial cues that help your
            ear separate two speakers in a dialogue, and 16 kHz cuts the
            frequencies that distinguish fricatives like /s/ and /sh/. For
            transcription you want raw text. For learning you want to hear
            the language clearly, which means keeping the original 44.1 kHz
            sample rate and the original stereo image.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The exception is mono source material. If the source is already
            mono (a single-speaker tutor recording, a podcast recorded on a
            single mic), keep it mono — converting mono to stereo just
            doubles the file size for no benefit. The{" "}
            <Link
              href="/mp4-to-mp3-sample-rate"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              MP4 to MP3 sample rate
            </Link>{" "}
            page explains the math behind this in more detail.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Slowdown and pitch preservation
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Gauge className="h-5 w-5" />
                <h3 className="text-base font-semibold">Use pitch-locked slowdown</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Most modern players (VLC, Audipo, Anytune) slow down audio
                without lowering pitch. This is the right mode for language
                work because pitch is itself a phoneme in tonal languages
                like Mandarin, Vietnamese, and Thai.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Repeat className="h-5 w-5" />
                <h3 className="text-base font-semibold">A-B loop the hard bits</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Set an A-B loop around a phrase you cannot catch and let it
                play at 0.75x for a minute. The repetition builds pattern
                recognition faster than re-listening to the whole file.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Headphones className="h-5 w-5" />
                <h3 className="text-base font-semibold">Shadow at full speed</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Once you can hear a phrase clearly at 0.75x, try shadowing
                it at full speed. The point is muscle memory for normal
                cadence, which slowdown hides.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Languages className="h-5 w-5" />
                <h3 className="text-base font-semibold">Convert dialogue, not just lessons</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Native-speaker dialogue from TV or film is gold for
                learning, but you can only watch it so many times.
                Converting it to MP3 lets you re-listen while walking or
                cooking.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Slowing down without artifacts
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Time-stretching algorithms work by overlapping short windows
            of audio and crossfading them. On heavily compressed audio,
            those windows can land on encoder frame boundaries and produce
            a faint warbling. The cleaner your source MP3, the less likely
            you are to hear it. This is the main reason to use 192 kbps
            rather than 128 kbps for content you plan to slow down a lot —
            the extra bitrate gives the time-stretcher more to work with.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            If you only ever slow down to 0.85x or 0.75x, 128 kbps is
            perfectly fine. If you routinely go to 0.5x for close listening
            of difficult material, bump to 192. Anything above 192 is
            wasted on language learning — the limit is your player&apos;s
            time-stretch quality, not the source.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            A workflow that scales
          </h2>
          <ul className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-3">
              <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Convert in batches.</strong> Convert a week&apos;s
                worth of lessons in one sitting so you always have new
                material queued up and ready on your phone.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Name files by level and topic.</strong>{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-sm">
                  jp-n4-grammar-01.mp3
                </code>{" "}
                sorts correctly and makes the file findable months later.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Keep the MP4 too.</strong> Storage is cheap and
                you may want the video later for a scene you can no longer
                picture from context.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Sync to a player that supports speed and looping.</strong>{" "}
                The MP3 is only half the workflow; the player is the other
                half.
              </span>
            </li>
          </ul>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            If you are working from lessons that came as a longer MP4 and
            need to extract individual clips, the workflow in the{" "}
            <Link
              href="/extract-audio-from-mp4"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              extract audio from MP4
            </Link>{" "}
            guide covers the upstream steps.
          </p>
        </section>

        <Citations sources={sources} />

        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
          <h2 className="text-xl font-bold">
            Convert MP4 to MP3 for language study
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            44.1 kHz stereo at 128 to 192 kbps. Browser-based, no upload,
            no sign-up, no install.
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
