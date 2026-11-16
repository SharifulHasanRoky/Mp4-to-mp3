import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { QuickAnswer } from "@/components/quick-answer";
import {
  FileAudio,
  Volume2,
  Layers,
  Music,
  AudioWaveform,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Audio Codecs Explained: AAC, MP3, Opus, FLAC Compared",
  description:
    "What is an audio codec? A clear explainer of AAC, MP3, Opus, and FLAC — how they compress sound, their bitrates, and which one to choose for MP4 to MP3 conversion.",
  alternates: { canonical: "/audio-codecs-explained" },
  openGraph: {
    title: "Audio Codecs Explained: AAC, MP3, Opus, FLAC Compared",
    description:
      "What is an audio codec? Explainer of AAC, MP3, Opus, and FLAC — compression, bitrate, and which to choose for MP4 to MP3.",
    url: "https://www.mp4tomp3.online/audio-codecs-explained",
    type: "article",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Audio Codecs Explained: AAC, MP3, Opus, FLAC",
    description:
      "An explainer of audio codecs — AAC, MP3, Opus, and FLAC — covering how they compress sound, their bitrates, and which to choose.",
    author: { "@type": "Organization", name: "MP4toMP3.online" },
    publisher: { "@type": "Organization", name: "MP4toMP3.online" },
    mainEntityOfPage: "https://www.mp4tomp3.online/audio-codecs-explained",
    datePublished: "2026-11-16",
    dateModified: "2026-11-16",
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell
        title="Audio Codecs Explained: AAC, MP3, Opus, FLAC"
        subtitle="An audio codec is the algorithm that turns sound into bits and back again. The codec you start with and the one you end with determine the quality, size, and compatibility of every audio file. Here is how the four most common ones actually compare."
      >
        {/* Voice-search quick answer for "What is an audio codec?" */}
        <QuickAnswer>
          An audio codec is a software algorithm that compresses sound into a
          small file and decompresses it for playback. &quot;Codec&quot;
          comes from coder-decoder. Common audio codecs include MP3, AAC,
          Opus, and FLAC. The first three are lossy; FLAC is lossless.
          Codecs are distinct from containers like MP4.
        </QuickAnswer>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Codec versus container, once more
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            A codec is the compression algorithm. A container is the file
            format that holds the compressed streams. An MP4 file is a
            container; the audio inside it is encoded with a codec — usually
            AAC, but sometimes MP3, ALAC, or Opus. A file extension tells
            you the container; the codec is a property of the stream inside.
            This distinction is the single most confused concept in
            multimedia, and getting it straight answers most of the
            &quot;why won&apos;t this file play&quot; questions you will
            ever have. See the{" "}
            <Link
              href="/container-formats-explained"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              container formats guide
            </Link>{" "}
            for the container side of the picture.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Lossy versus lossless
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Every audio codec falls into one of two camps.{" "}
            <strong>Lossy</strong> codecs — MP3, AAC, Opus, Vorbis — throw
            away audio information that humans are unlikely to hear, in
            exchange for dramatic file size reductions. The discarded data
            cannot be recovered; re-encoding a lossy file degrades quality
            each generation. <strong>Lossless</strong> codecs — FLAC, ALAC,
            WavPack — compress the audio using reversible mathematical
            transforms, like zipping a file. The decoded output is
            byte-for-byte identical to the input. The trade-off is file
            size: a lossless file is typically five to ten times larger than
            a transparent lossy encoding of the same audio.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            For most consumer use — music on a phone, voice memos, podcasts
            — lossy is the right answer. Lossless is the right answer when
            you are editing, archiving, or working with masters that may be
            re-encoded many times. MP3 is always lossy. There is no lossless
            MP3.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            The four you will meet
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Music className="h-5 w-5" />
                <h3 className="text-base font-semibold">MP3</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                The original lossy codec, released 1993. Universal
                compatibility is its main strength. At 192 kbps VBR, it is
                transparent to nearly all listeners. Maximum bitrate 320
                kbps. Patents expired 2017.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Volume2 className="h-5 w-5" />
                <h3 className="text-base font-semibold">AAC</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Advanced Audio Coding, released 1997. The default audio
                codec inside MP4 files and the iTunes Store. Roughly 30%
                more efficient than MP3 — 128 kbps AAC sounds like 160 kbps
                MP3. The codec your MP4 probably already contains.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <AudioWaveform className="h-5 w-5" />
                <h3 className="text-base font-semibold">Opus</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Released 2012 by the Xiph.Org Foundation. The most efficient
                lossy codec in widespread use — 96 kbps Opus rivals 160 kbps
                MP3. Used by WebRTC, Discord, YouTube. Variable bitrate by
                design. Open and royalty-free.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Layers className="h-5 w-5" />
                <h3 className="text-base font-semibold">FLAC</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Free Lossless Audio Codec, released 2001. Compresses audio
                by 50–60% with zero loss. A CD-quality FLAC is roughly 35
                MB for a three-minute song; the same song as 320 kbps MP3
                is 7 MB. The format of choice for archival.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            AAC versus MP3: the practical comparison
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            AAC is technically superior to MP3 at every bitrate. It was
            designed as MP3&apos;s successor by the same MPEG group, with a
            decade of psychoacoustic research behind it. At 128 kbps, AAC
            is transparent for most music; MP3 at the same rate shows
            audible artifacts on difficult material like castanets or
            applause. At 192 kbps and above, the gap narrows and most
            listeners cannot tell them apart.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            So why does anyone still convert to MP3? Compatibility. MP3
            plays on every device ever manufactured with a speaker; AAC
            plays on most modern devices but not all. Old car stereos,
            budget MP3 players, and some set-top boxes do not support AAC.
            If you are unsure where your file will end up, MP3 is the safe
            choice. If you know your target supports AAC and you want
            better quality per byte, keep AAC.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            For a deeper explanation of MP3 specifically, see the{" "}
            <Link
              href="/what-is-mp3"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              what is MP3
            </Link>{" "}
            guide.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Opus: the codec you have probably never heard of
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Opus is the modern champion of lossy audio. Designed by the
            Xiph.Org Foundation (the same group behind FLAC) and standardised
            in 2012, it handles both speech and music in a single codec, and
            it does both better than the dedicated alternatives. At 64 kbps,
            Opus speech is clearer than a phone call. At 96 kbps, Opus music
            is on par with 160 kbps MP3. At 128 kbps, it rivals CD quality
            for most listeners.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Opus is the codec behind Discord voice, WhatsApp voice messages,
            YouTube&apos;s default audio, and every WebRTC video call. The
            reason most consumers have not heard of it is that it lives
            almost entirely inside containers — WebM, Ogg, MP4 — rather than
            as standalone files. If you have ever made a video call, you
            have used Opus.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Bitrate and quality, in plain numbers
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="py-2 pr-4 font-semibold">Bitrate</th>
                  <th className="py-2 pr-4 font-semibold">MP3</th>
                  <th className="py-2 pr-4 font-semibold">AAC</th>
                  <th className="py-2 pr-4 font-semibold">Opus</th>
                  <th className="py-2 font-semibold">FLAC</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/60">
                  <td className="py-2 pr-4">64 kbps</td>
                  <td className="py-2 pr-4">Noticeable artifacts</td>
                  <td className="py-2 pr-4">Acceptable for speech</td>
                  <td className="py-2 pr-4">Good for music</td>
                  <td className="py-2">N/A</td>
                </tr>
                <tr className="border-b border-border/60">
                  <td className="py-2 pr-4">96 kbps</td>
                  <td className="py-2 pr-4">Speech only</td>
                  <td className="py-2 pr-4">OK for music</td>
                  <td className="py-2 pr-4">Transparent for most</td>
                  <td className="py-2">N/A</td>
                </tr>
                <tr className="border-b border-border/60">
                  <td className="py-2 pr-4">128 kbps</td>
                  <td className="py-2 pr-4">Passable</td>
                  <td className="py-2 pr-4">Transparent to most</td>
                  <td className="py-2 pr-4">Excellent</td>
                  <td className="py-2">N/A</td>
                </tr>
                <tr className="border-b border-border/60">
                  <td className="py-2 pr-4">192 kbps</td>
                  <td className="py-2 pr-4">Transparent to most</td>
                  <td className="py-2 pr-4">Excellent</td>
                  <td className="py-2 pr-4">Excellent</td>
                  <td className="py-2">N/A</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">~800 kbps</td>
                  <td className="py-2 pr-4">N/A</td>
                  <td className="py-2 pr-4">N/A</td>
                  <td className="py-2 pr-4">N/A</td>
                  <td className="py-2">Lossless CD quality</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            &quot;Transparent&quot; here means listeners cannot reliably
            distinguish the encoded file from the original in blind tests.
            The numbers move with the listener and the equipment, but the
            ranking is stable: Opus is most efficient, AAC second, MP3
            third, and FLAC sits in its own category.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            What this means for MP4 to MP3 conversion
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            When MP4toMP3.online converts an MP4 to an MP3, it is taking AAC
            audio (the codec inside almost every MP4) and re-encoding it as
            MP3. Because both are lossy, this introduces one generation of
            additional compression. At reasonable bitrates — 192 kbps VBR for
            music, 128 kbps for speech — the added loss is inaudible to
            nearly everyone. The output is a universally playable file at a
            fraction of the original size.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            If your goal is to keep AAC rather than convert to MP3, you do
            not actually need a converter — you need a demuxer. The{" "}
            <Link
              href="/mp4-to-mp3-without-quality-loss"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              without-quality-loss guide
            </Link>{" "}
            explains when extraction without re-encoding is possible and
            when it is not. For the broader question of which converter to
            use, the{" "}
            <Link
              href="/best-mp4-to-mp3-converter"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              best converter overview
            </Link>{" "}
            lays out the trade-offs.
          </p>
        </section>

        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
          <h2 className="text-xl font-bold">Convert your MP4 audio to MP3 now</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            MP4toMP3.online uses libmp3lame to re-encode your video&apos;s
            audio stream to MP3 — locally, no upload.
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
