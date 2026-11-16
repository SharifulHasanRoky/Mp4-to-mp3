import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { QuickAnswer } from "@/components/quick-answer";
import { Citations, type Citation } from "@/components/citations";
import {
  FileAudio,
  Gauge,
} from "lucide-react";

export const metadata: Metadata = {
  title: "What Is MP3? Audio Format Explained Simply (2026)",
  description:
    "MP3 is a lossy audio compression format that shrinks CD-quality sound by 90% with barely audible loss. Learn its bitrate, history (Fraunhofer), and why it is universal.",
  alternates: { canonical: "/what-is-mp3" },
  openGraph: {
    title: "What Is MP3? Audio Format Explained Simply (2026)",
    description:
      "MP3 is a lossy audio compression format that shrinks CD-quality sound by 90%. Learn bitrate, Fraunhofer history, and universality.",
    url: "https://www.mp4tomp3.online/what-is-mp3",
    type: "article",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What Is MP3? Audio Format Explained Simply",
    description:
      "An explainer of the MP3 audio format: lossy compression, bitrate, the Fraunhofer history, and why MP3 became the universal audio format.",
    author: { "@type": "Organization", name: "MP4toMP3.online" },
    publisher: { "@type": "Organization", name: "MP4toMP3.online" },
    mainEntityOfPage: "https://www.mp4tomp3.online/what-is-mp3",
    datePublished: "2026-11-16",
    dateModified: "2026-11-16",
    citation: [
      "https://en.wikipedia.org/wiki/MP3",
      "https://www.iso.org/standard/22413.html",
      "https://en.wikipedia.org/wiki/ID3",
      "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs",
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell
        title="What Is MP3? Audio Format Explained Simply"
        subtitle="MP3 is the format that put a thousand songs in your pocket. It is a lossy audio codec that shrinks CD-quality sound to about a tenth of its size while keeping almost all of what you can actually hear. Here is how it works."
      >
        {/* Voice-search quick answer for "What is an MP3 file?" */}
        <QuickAnswer>
          An MP3 file is a compressed audio file that uses lossy compression
          to shrink sound to roughly a tenth of its uncompressed size while
          keeping nearly all audible detail. MP3 stands for MPEG-1 Audio
          Layer III, developed by the Fraunhofer Institute and released in
          1993. The extension is .mp3.
        </QuickAnswer>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            MP3 is a codec, not a container
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Unlike MP4, MP3 is a single-purpose format: it stores one audio
            stream and nothing else. There is no video, no subtitles, no
            alternate language tracks. What makes MP3 interesting is the
            compression algorithm itself, which is one of the most
            successful pieces of engineering in consumer technology. A
            three-minute song saved as uncompressed CD-quality WAV is about
            30 MB. The same song as an MP3 at 192 kbps is about 4 MB — a
            90% reduction — and almost nobody can hear the difference on
            consumer equipment.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            That ratio is what made the digital music revolution possible.
            Before MP3, storing a music collection on a computer meant a
            shelf of hard drives. After MP3, it meant a folder. The format
            is technically a codec — a coder-decoder — rather than a
            container, but in everyday usage the term &quot;MP3&quot;
            covers both the algorithm and the file format it produces.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            How lossy compression actually works
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            MP3 compression rests on a psychological insight: human hearing
            is selective. When two sounds play at the same time, the louder
            one masks the quieter one, and the brain simply does not
            register the masked sound. MP3 encoding exploits this{" "}
            <strong>auditory masking</strong> by analysing the audio in
            short frames, identifying frequencies that are inaudible because
            they are masked by louder neighbours, and discarding those
            frequencies entirely. The bits that would have represented
            them are simply not written to the file.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            This is what makes MP3 <em>lossy</em>: information is permanently
            thrown away. The discarded data cannot be recovered, which is
            why re-encoding an MP3 to another MP3 degrades quality each
            time, like a photocopy of a photocopy. But because the discarded
            data was inaudible in the first place, a single encode at a
            reasonable bitrate is essentially indistinguishable from the
            original to almost all listeners on almost all equipment.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Bitrate: the dial that sets quality and size
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Gauge className="h-5 w-5" />
                <h3 className="text-base font-semibold">96–128 kbps</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Speech, podcasts, voice memos. Transparent for a single
                voice. File sizes roughly 1 MB per minute.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Gauge className="h-5 w-5" />
                <h3 className="text-base font-semibold">160–192 kbps</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                General music. Transparent to most listeners on most
                equipment. The sweet spot for MP4 audio extraction.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Gauge className="h-5 w-5" />
                <h3 className="text-base font-semibold">256–320 kbps</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Audiophile range. Marginal audible benefit, larger files.
                Useful when the source is high quality.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Gauge className="h-5 w-5" />
                <h3 className="text-base font-semibold">VBR vs CBR</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Variable bitrate (VBR) spends bits where they are needed;
                constant (CBR) keeps the rate fixed. VBR gives better
                quality per byte.
              </p>
            </div>
          </div>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The choice of bitrate is the most consequential decision when
            converting any audio to MP3. The trade-offs between VBR and CBR
            specifically are covered in the{" "}
            <Link
              href="/mp4-to-mp3-vbr-vs-cbr"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              VBR vs CBR guide
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            A brief history of MP3
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            MP3 was developed at the Fraunhofer Institute for Integrated
            Circuits in Erlangen, Germany, under the leadership of Karlheinz
            Brandenburg. The work began in the late 1980s as part of the
            MPEG-1 audio standardisation effort, and the Layer III
            specification was finalised in 1993. Fraunhofer patented the
            encoding technology and for years collected royalties from
            encoder software, which is why open-source MP3 encoders were
            legally complicated until the patents began expiring in the
            late 2010s.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The format stayed obscure until 1997, when a developer named
            Tomislav Uzelac built the first standalone MP3 player software,
            AMP, which was then adapted into the wildly popular Winamp.
            Within a year, college students were ripping CDs to MP3s and
            trading them over the early internet. Napster, launched in
            1999, made MP3 synonymous with digital music. By the time Apple
            shipped the iPod in 2001, MP3 was the de facto standard, and it
            has remained so even though newer codecs like AAC and Opus are
            technically superior.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Why MP3 is still universal
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Several newer codecs beat MP3 on quality-per-bit. AAC at 128 kbps
            is roughly equivalent to MP3 at 160 kbps. Opus at 96 kbps beats
            MP3 at 128 kbps. And yet MP3 remains the one audio format that
            virtually every device on earth can play — every car stereo,
            every phone, every operating system, every web browser. That
            universality is a network effect that no newer codec has been
            able to dislodge.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The reason is path dependence. Hardware manufacturers in the
            2000s built MP3 decoders into billions of devices. Those
            devices lasted ten or twenty years. Software platforms —
            operating systems, browsers, music players — kept MP3 support
            because removing it would break files people already owned. By
            the time the patents expired and MP3 became genuinely
            royalty-free in 2017, the format was too entrenched to displace.
            When you convert audio to MP3 today, you are choosing
            compatibility over efficiency — and for most use cases, that is
            the right call.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            MP3 versus the alternatives
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            For a direct comparison with the video container MP4, see the{" "}
            <Link
              href="/mp4-vs-mp3"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              MP4 vs MP3
            </Link>{" "}
            guide. For a deeper comparison of MP3 against the other audio
            codecs used inside MP4 files — AAC, Opus, FLAC — the{" "}
            <Link
              href="/audio-codecs-explained"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              audio codecs guide
            </Link>{" "}
            walks through the trade-offs in detail. The short version: if
            you want maximum compatibility, MP3. If you want maximum
            quality-per-bit, AAC or Opus. If you want no loss at all, FLAC.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            What this means for converting MP4 to MP3
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            When MP4toMP3.online converts a video file to MP3, it is
            re-encoding the audio stream from its source codec (usually
            AAC) into MP3 using the libmp3lame encoder. The output is a
            standalone .mp3 file that any device can play. Because MP3 is a
            codec and not a container, the file contains nothing but the
            audio — no video, no metadata beyond what fits in the ID3 tag.
            That simplicity is the feature.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The conversion adds one generation of lossy compression. For
            spoken-word content, this is imperceptible. For music at high
            listening volumes on studio monitors, careful listeners may
            notice a slight softening of high frequencies at lower
            bitrates. Choosing 192 kbps VBR is the practical answer for
            almost everyone.
          </p>
        </section>

        <Citations
          sources={[
            { title: "MP3 \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/MP3", publisher: "Wikipedia", note: "MPEG-1 Audio Layer III format history and psychoacoustic compression model." },
            { title: "MPEG-1 Audio Layer III \u2014 ISO", url: "https://www.iso.org/standard/22413.html", publisher: "ISO", note: "Official ISO/IEC 11172-3:1993 specification for MPEG-1 audio, including Layer III." },
            { title: "ID3 metadata tags \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/ID3", publisher: "Wikipedia", note: "The ID3 tag standard used to embed title, artist and album in MP3 files." },
            { title: "Audio codecs \u2014 MDN", url: "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs", publisher: "Mozilla MDN", note: "Browser support and codec characteristics for MP3 and related audio formats." },
          ]}
        />

        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
          <h2 className="text-xl font-bold">Extract audio as MP3 now</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            MP4toMP3.online encodes any video&apos;s audio to MP3 in your
            browser using libmp3lame — universal output, no upload.
          </p>
          <Link
            href="/#extractor"
            className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90"
          >
            <FileAudio className="h-4 w-4" /> Convert to MP3
          </Link>
        </section>
      </PageShell>
    </>
  );
}
