import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { QuickAnswer } from "@/components/quick-answer";
import { Citations, type Citation } from "@/components/citations";
import {
  FileAudio,
  Music,
  AlertTriangle,
  Check,
  Volume2,
  Layers,
  Mic,
} from "lucide-react";

const sources: Citation[] = [
  {
    title: "MPEG-4 — Wikipedia",
    url: "https://en.wikipedia.org/wiki/MPEG-4",
    publisher: "Wikipedia",
    note: "Documents the MP4 container and how its mixed audio stream (voice plus music) is extracted as a single track.",
  },
  {
    title: "MP3 — Wikipedia",
    url: "https://en.wikipedia.org/wiki/MP3",
    publisher: "Wikipedia",
    note: "Confirms MP3 as the output format for the full mixed-audio extraction described in the article.",
  },
  {
    title: "FFmpeg — Wikipedia",
    url: "https://en.wikipedia.org/wiki/FFmpeg",
    publisher: "Wikipedia",
    note: "Background on FFmpeg, which performs the demux step that pulls the mixed audio out of the MP4.",
  },
  {
    title: "Audio codecs — MDN Web Docs",
    url: "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs",
    publisher: "Mozilla MDN",
    note: "Lists audio codecs found inside MP4 containers, supporting the explanation of mixed-audio extraction.",
  },
  {
    title: "Fair use — Wikipedia",
    url: "https://en.wikipedia.org/wiki/Fair_use",
    publisher: "Wikipedia",
    note: "Underpins the guidance on only extracting background music from videos you own or have permission to process.",
  },
];

export const metadata: Metadata = {
  title: "How to Extract Background Music from MP4 Video Files",
  description:
    "Want just the background music from an MP4? Simple conversion extracts the full mixed audio. Separating music from voice needs AI stem separation — here is what is and is not possible.",
  alternates: { canonical: "/extract-background-music-from-mp4" },
  openGraph: {
    title: "How to Extract Background Music from MP4 Video Files",
    description:
      "What is and is not possible when extracting background music from MP4: simple conversion gives you the full mix, separating music from voice needs AI stem separation.",
    url: "https://www.mp4tomp3.online/extract-background-music-from-mp4",
    type: "article",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Extract Background Music from MP4 Video Files",
    description:
      "An honest guide to extracting background music from MP4 videos: what simple conversion does, why separating music from voice requires AI stem separation, and what tools actually do that job.",
    author: { "@type": "Organization", name: "MP4toMP3.online" },
    publisher: { "@type": "Organization", name: "MP4toMP3.online" },
    mainEntityOfPage: "https://www.mp4tomp3.online/extract-background-music-from-mp4",
    datePublished: "2026-11-16",
    dateModified: "2026-11-16",
    citation: [
      "https://en.wikipedia.org/wiki/MPEG-4",
      "https://en.wikipedia.org/wiki/MP3",
      "https://en.wikipedia.org/wiki/FFmpeg",
      "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs",
      "https://en.wikipedia.org/wiki/Fair_use",
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell
        title="Extract Background Music from MP4"
        subtitle="The honest answer about pulling background music out of an MP4: simple conversion gives you the full mixed audio, and separating the music from the voice on top of it is a different, harder problem."
      >
        <QuickAnswer>
          Simple MP4 to MP3 conversion extracts the entire audio track, voice
          and background music mixed together. It cannot isolate just the
          background music. Separating music from voice requires AI stem
          separation (tools like Spleeter, Demucs, or LALAL.AI), which
          MP4toMP3.online does not provide. If the MP4 contains only music, the
          conversion gives you that music cleanly. If it has voice over music,
          you get the full mix.
        </QuickAnswer>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            The honest distinction first
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            <AlertTriangle className="mr-1 inline h-4 w-4 text-primary" />
            Most articles that promise to &quot;extract background music from
            MP4&quot; are lying by omission. They describe a standard MP4 to
            MP3 conversion and let you assume the result is just the music. It
            is not. A standard conversion pulls out the entire audio stream —
            voice, music, sound effects, room tone, all of it mixed down to a
            single track exactly as it plays in the video. If your MP4 is a vlog
            with someone talking over background music, the resulting MP3 has
            the talking and the music together.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Separating the background music from the voice on top of it is a
            fundamentally different problem. The mixed audio does not carry
            labels saying &quot;this is voice&quot; and &quot;this is
            music.&quot; Recovering the two components requires guessing, based
            on what voice and music typically sound like, which is a job for
            machine-learning models — not for an FFmpeg conversion pipeline.
            MP4toMP3.online does the conversion, not the separation, and we
            would rather say so plainly than imply otherwise.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            What simple conversion does give you
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            <Check className="mr-1 inline h-4 w-4 text-primary" />
            For three common scenarios, simple conversion is exactly what you
            want and no stem separation is needed:
          </p>
          <ul className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-3">
              <Music className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Instrumental MP4s.</strong> If the MP4 is a music
                video, a lyric video, or a static-image upload of an
                instrumental track, the audio is already just music. Conversion
                produces a clean MP3 of that music with no further processing
                needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Volume2 className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Loops and ambient beds.</strong> Many video templates
                ship with a pre-mixed music bed and no narration. The full mix
                is the music; conversion gives you that music as a standalone
                MP3.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Music-only sections.</strong> If the music plays only
                during a specific part of the video — say, the intro or outro
                — you can trim the source MP4 to that section first, then
                convert just that clip to get the music.
              </span>
            </li>
          </ul>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            In all of these cases, the conversion is the right tool and stem
            separation would be a needless extra step. For the actual mechanics
            of the conversion, the{" "}
            <Link
              href="/extract-audio-from-mp4"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              extract audio from MP4
            </Link>{" "}
            tutorial walks through format, bitrate, and sample-rate choices.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            When you actually need stem separation
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            <Mic className="mr-1 inline h-4 w-4 text-primary" />
            The case where conversion is not enough is the case most people
            asking this question actually have: an MP4 with voice over music,
            and they want just the music underneath. A documentary clip with a
            narrator over a score, a vlog intro with talking over a beat, a
            wedding video with speeches over a soundtrack. Conversion gives you
            the mixed audio faithfully, which is to say it gives you the voice
            along with the music.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            To separate the two, you need a stem-separation model. The
            open-source options are Demucs (Meta&apos;s HTDemucs model, generally
            the current state of the art for music) and Spleeter (Deezer&apos;s
            older model, faster but lower quality). Both run locally with Python
            and a modest GPU or even a modern CPU. Commercial services like
            LALAL.AI, Moises, and BandLab offer the same models behind a web
            interface for users who do not want to install anything. None of
            them is perfect — the separated stems carry faint artifacts of the
            other component, and very dense mixes do not separate cleanly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            A practical workflow for the hard case
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            If you have a voice-over-music MP4 and want just the music, the
            realistic workflow has two stages, and only the first happens on
            this site:
          </p>
          <ol className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                1
              </span>
              <span>
                <strong>Convert the MP4 to MP3 or WAV</strong> here, on this
                site, in your browser. WAV is the better intermediate if you
                plan further processing because it avoids stacking lossy
                generations.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                2
              </span>
              <span>
                <strong>Run the extracted audio through a stem separator.</strong>
                Demucs, Spleeter, or a commercial service will produce two
                stems — vocals and accompaniment. The accompaniment stem is the
                background music you wanted, with the voice removed.
              </span>
            </li>
          </ol>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Step one on this site is free, private, and instant. Step two is
            outside the scope of what MP4toMP3.online does. We do the first
            part well and honestly point you at the second part rather than
            pretending one tool handles both.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            If your MP4 is just music: the easy path
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            If your MP4 has no voice — a music video, an instrumental upload, a
            loop, a soundtrack — none of the above complexity applies. You
            convert and you are done. For music, 192 kbps stereo is the sensible
            default; the{" "}
            <Link
              href="/mp4-to-mp3-192kbps"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              192 kbps guide
            </Link>{" "}
            covers what that setting buys you, and the{" "}
            <Link
              href="/extract-music-from-mp4"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              music extraction tutorial
            </Link>{" "}
            has the full step-by-step for songs.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            One subtle point worth knowing: the loudness of background music in
            a mixed video is usually 10 to 20 dB below the voice. If you do run
            the mixed file through a stem separator and listen to the
            accompaniment stem, expect the music to sound quieter than it did
            in the original video — that is the music&apos;s true level before
            it was ducked under the voice, and you can normalize it back up in
            any audio editor afterwards.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            The short version
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Simple conversion gives you the full mixed audio faithfully and
            privately. If your MP4 already contains only music, that is your
            answer. If it has voice over music and you need them apart, plan on
            a second step with a dedicated stem-separation tool — there is no
            shortcut around it, and any tool that implies otherwise is not
            being straight with you.
          </p>
        </section>

        <Citations sources={sources} />

        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
          <h2 className="text-xl font-bold">
            Extract the full audio from your MP4
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Browser-based, no upload, no sign-up. The first step in any
            extraction workflow, music or mixed.
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
