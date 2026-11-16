import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { QuickAnswer } from "@/components/quick-answer";
import { Citations, type Citation } from "@/components/citations";
import {
  FileAudio,
  Mic,
  Gauge,
  Check,
  Volume2,
  Languages,
} from "lucide-react";

const sources: Citation[] = [
  {
    title: "MP3 — Wikipedia",
    url: "https://en.wikipedia.org/wiki/MP3",
    publisher: "Wikipedia",
    note: "Documents the MP3 format and the lower bitrates (64-128 kbps mono) recommended for transcription input.",
  },
  {
    title: "Psychoacoustics — Wikipedia",
    url: "https://en.wikipedia.org/wiki/Psychoacoustics",
    publisher: "Wikipedia",
    note: "Explains the psychoacoustic model behind MP3, supporting the choice of speech-friendly encoding settings for transcription.",
  },
  {
    title: "FFmpeg — Wikipedia",
    url: "https://en.wikipedia.org/wiki/FFmpeg",
    publisher: "Wikipedia",
    note: "Background on FFmpeg, which performs the in-browser demux and re-encode to produce the transcription-ready MP3.",
  },
  {
    title: "MPEG-4 — Wikipedia",
    url: "https://en.wikipedia.org/wiki/MPEG-4",
    publisher: "Wikipedia",
    note: "Defines the MP4 container that interview and lecture videos typically arrive in before transcription prep.",
  },
];

export const metadata: Metadata = {
  title: "MP4 to MP3 for Transcription — Free Speech Settings",
  description:
    "Convert MP4 to MP3 for transcription (Whisper, Otter, Rev): 16kHz mono 64kbps speech-optimized settings. Free, no sign-up, no upload.",
  alternates: { canonical: "/mp4-to-mp3-for-transcription" },
  openGraph: {
    title: "MP4 to MP3 for Transcription: Speech-Optimized Settings",
    description:
      "Pick the right sample rate, channel layout, and bitrate when converting MP4 to MP3 for transcription with Whisper, Otter.ai, or Rev.",
    url: "https://www.mp4tomp3.online/mp4-to-mp3-for-transcription",
    type: "article",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "MP4 to MP3 for Transcription: Speech-Optimized Settings",
    description:
      "A practical guide to converting MP4 to MP3 for speech-to-text services, covering the sample rate, channel layout, and bitrate that work best with Whisper, Otter.ai, and other transcription tools.",
    author: { "@type": "Organization", name: "MP4toMP3.online" },
    publisher: { "@type": "Organization", name: "MP4toMP3.online" },
    mainEntityOfPage:
      "https://www.mp4tomp3.online/mp4-to-mp3-for-transcription",
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
        title="Convert MP4 to MP3 for Transcription"
        subtitle="Speech-to-text engines do not need CD-quality audio. Here are the exact settings that cut file size in half without hurting transcription accuracy."
      >
        <QuickAnswer>
          To convert MP4 to MP3 for transcription, down-mix to mono, set the
          sample rate to 16 kHz, and use a 64 kbps bitrate. These settings
          match what speech models like Whisper expect and produce files
          around 8 MB per hour. MP4toMP3.online lets you choose all three
          before converting.
        </QuickAnswer>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Why transcription wants different audio
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Music files are mastered for human ears, but transcription engines
            are machines that read spectrograms. A model like OpenAI&apos;s
            Whisper samples audio at 16 kHz internally, downsampling anything
            higher before it ever touches the neural network. Feeding it a
            44.1 kHz stereo MP3 wastes bandwidth, storage, and CPU on
            frequencies the model will throw away. The right move is to give
            the engine exactly what it wants, in the smallest container that
            preserves speech intelligibility.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            This is true across the board. Cloud services like Otter.ai, Rev,
            Trint, and Sonix, and self-hosted engines like Whisper, Vosk, and
            DeepSpeech, all resample incoming audio to 16 kHz mono before
            inference. The 128 kbps stereo MP3 most converters produce by
            default is roughly four times larger than necessary and carries
            no useful information the engine will use. A purpose-built
            transcription MP3 is one quarter the size and converts just as
            fast.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            The three settings that matter
          </h2>
          <ol className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                1
              </span>
              <span>
                <strong>Sample rate: 16 kHz.</strong> Human speech carries
                almost no useful energy above 8 kHz, so a 16 kHz sample rate
                (Nyquist at 8 kHz) captures everything a transcription model
                needs. Higher rates add bytes without adding accuracy.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                2
              </span>
              <span>
                <strong>Channels: mono.</strong> Two channels of the same
                speaker waste half the file. Mono also avoids the stereo
                phase issues that occasionally confuse diarization models
                when speakers are panned hard to one side.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                3
              </span>
              <span>
                <strong>Bitrate: 64 kbps CBR.</strong> Speech is acoustically
                simple compared to music, so 64 kbps is transparent for the
                human ear and well above the threshold where a model can still
                recover every phoneme. Going lower saves almost nothing and
                risks garbling sibilants.
              </span>
            </li>
          </ol>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Together these produce roughly 8 MB of audio per hour of recording.
            A two-hour interview fits comfortably on a phone, and a hundred
            hours of lecture back-catalogue fits on a single DVD. For a
            deeper look at why sample rate dominates the size equation, the{" "}
            <Link
              href="/mp4-to-mp3-sample-rate"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              MP4 to MP3 sample rate
            </Link>{" "}
            page walks through the maths in detail.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            What to expect from popular services
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Mic className="h-5 w-5" />
                <h3 className="text-base font-semibold">Whisper</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                OpenAI&apos;s Whisper resamples everything to 16 kHz mono on
                load. Feed it a 64 kbps mono MP3 and accuracy is identical to
                feeding it a 320 kbps stereo original, but inference is faster
                because the file decodes in a fraction of the time.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Languages className="h-5 w-5" />
                <h3 className="text-base font-semibold">Otter.ai and Rev</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Both have soft upload limits (a few hundred MB on free tiers).
                A 16 kHz mono 64 kbps MP3 keeps you under the limit on long
                recordings where the default stereo MP3 would trip it.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Volume2 className="h-5 w-5" />
                <h3 className="text-base font-semibold">Sonix and Trint</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                These services normalize loudness on intake, so the bitrate
                you pick has no effect on accuracy. What does matter is upload
                time: a quarter-size file uploads in a quarter of the time,
                which matters on hotel Wi-Fi.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Gauge className="h-5 w-5" />
                <h3 className="text-base font-semibold">Self-hosted Vosk</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Vosk ships models at 8 kHz and 16 kHz. A 16 kHz MP3 lets you
                skip the resample step and use the higher-accuracy model
                directly, shaving milliseconds off every inference call.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            When not to downsample
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            There is exactly one case where you should keep the original
            sample rate and bitrate: when the audio is a music lesson, a
            choral rehearsal, or any recording where the transcription must
            capture pitch and timbre, not just words. Standard speech-to-text
            engines handle these badly anyway, but a music-focused model
            like Spotify&apos;s research pipelines or a polyphonic
            transcription tool will want the full bandwidth.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            For everything else — interviews, lectures, podcasts, court
            depositions, voice memos, focus groups, conference calls — the
            16 kHz mono 64 kbps recipe is the right answer. The first time
            you transcribe a 90-minute file at this setting and watch it
            finish in the time it took to upload a stereo version, you
            will not go back. For a broader comparison of where this fits
            in the MP3 quality spectrum, the{" "}
            <Link
              href="/mp4-to-mp3-vbr-vs-cbr"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              VBR vs CBR
            </Link>{" "}
            breakdown explains the bitrate axis in more depth.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Privacy and confidentiality matter here
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Transcription work is unusually sensitive. Legal depositions,
            medical dictation, HR interviews, and confidential research
            interviews all involve content that should not sit on a random
            converter&apos;s server. The same is true for the converted MP3
            itself: once you have it, you should not need to send it to a
            third party just to feed your transcription engine.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            That is the reason to convert in the browser rather than upload
            to a server-side tool. MP4toMP3.online reads your MP4 from disk,
            encodes the MP3 locally, and writes it back. Nothing is uploaded,
            nothing is logged, and the file disappears the moment you close
            the tab. You then feed the MP3 directly to Whisper running on
            your own machine, or to whichever cloud service you trust.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            A checklist before you hit convert
          </h2>
          <ul className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-3">
              <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Confirm the source is speech.</strong> Music or
                high-frequency content should stay at 44.1 kHz stereo.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Set 16 kHz, mono, 64 kbps CBR.</strong> These are
                the defaults most speech models expect, and the size
                savings compound across long recordings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Listen before you transcribe.</strong> A 30-second
                spot-check confirms the conversion worked and the audio is
                intelligible, which catches most source-file problems
                cheaply.
              </span>
            </li>
          </ul>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            If you also need to extract audio from other containers like MOV
            or MKV before feeding a transcription pipeline, the{" "}
            <Link
              href="/extract-audio-from-mp4"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              extract audio from MP4
            </Link>{" "}
            guide covers the broader workflow.
          </p>
        </section>

        <Citations sources={sources} />

        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
          <h2 className="text-xl font-bold">
            Convert MP4 to MP3 for transcription
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            16 kHz mono 64 kbps by default. Browser-based, no upload, no
            sign-up, no install. Your recordings never leave your device.
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
