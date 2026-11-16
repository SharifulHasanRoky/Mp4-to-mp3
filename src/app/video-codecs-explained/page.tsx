import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { QuickAnswer } from "@/components/quick-answer";
import {
  FileAudio,
  Film,
  Cpu,
  Layers,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Video Codecs Explained: H.264, H.265, VP9 Compared (2026)",
  description:
    "What is a video codec? A clear explainer of H.264 (AVC), H.265 (HEVC), and VP9 — how they compress video, their efficiency, and where each one fits in the MP4 pipeline.",
  alternates: { canonical: "/video-codecs-explained" },
  openGraph: {
    title: "Video Codecs Explained: H.264, H.265, VP9 Compared (2026)",
    description:
      "What is a video codec? Explainer of H.264, H.265, and VP9 — compression, efficiency, and where each fits in the MP4 pipeline.",
    url: "https://www.mp4tomp3.online/video-codecs-explained",
    type: "article",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Video Codecs Explained: H.264, H.265, VP9",
    description:
      "An explainer of video codecs — H.264, H.265, and VP9 — covering how they compress video, their efficiency, and where each fits.",
    author: { "@type": "Organization", name: "MP4toMP3.online" },
    publisher: { "@type": "Organization", name: "MP4toMP3.online" },
    mainEntityOfPage: "https://www.mp4tomp3.online/video-codecs-explained",
    datePublished: "2026-11-16",
    dateModified: "2026-11-16",
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell
        title="Video Codecs Explained: H.264, H.265, VP9"
        subtitle="A video codec is the algorithm that compresses moving images into a manageable number of bits. Almost every video you have ever watched was encoded with one of three codecs. Here is what they do, how they compare, and why most of them do not matter when you only want the audio."
      >
        {/* Voice-search quick answer for "What is a video codec?" */}
        <QuickAnswer>
          A video codec is a software algorithm that compresses video frames
          into a small file and decompresses them for playback. The name
          comes from coder-decoder. The most common video codecs today are
          H.264 (AVC), H.265 (HEVC), and VP9. Each new codec roughly
          halves the bitrate needed for the same quality.
        </QuickAnswer>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            The codec does the heavy lifting
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Raw uncompressed video is enormous. A single 1080p frame at 24
            bits per pixel is roughly 6 MB; at 30 frames per second that is
            180 MB per second, or roughly 32 GB for a three-minute clip. No
            storage medium or network could handle that volume. The video
            codec is the algorithm that shrinks those 32 GB down to 30 MB —
            a thousand-to-one reduction — while keeping the picture looking
            almost identical to the original.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The codec achieves this through a combination of techniques.
            <strong> Intra-frame compression</strong> uses still-image
            techniques on individual frames. <strong>Inter-frame
            compression</strong> exploits the fact that consecutive frames
            are mostly the same — only the parts that change need to be
            stored. <strong>Motion compensation</strong> tracks how blocks
            of pixels move from frame to frame, so a moving car does not
            need to be re-encoded each time, just the motion vector that
            describes where it went. The codec decides, frame by frame, how
            much to spend on each technique.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            The three you will meet
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Film className="h-5 w-5" />
                <h3 className="text-base font-semibold">H.264 (AVC)</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Advanced Video Coding, standardised 2003. The universal
                default. Every phone, browser, and TV decodes it. The
                inside of nearly every MP4 you have ever seen.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Cpu className="h-5 w-5" />
                <h3 className="text-base font-semibold">H.265 (HEVC)</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                High Efficiency Video Coding, standardised 2013. Roughly
                50% more efficient than H.264 — same quality at half the
                bitrate. Used by 4K streaming and modern phones. Slower to
                encode and decode.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Layers className="h-5 w-5" />
                <h3 className="text-base font-semibold">VP9</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Google&apos;s open-source competitor to HEVC, released 2013.
                Similar efficiency to H.265 but royalty-free. The default
                codec for YouTube above 1080p and for WebM files.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Zap className="h-5 w-5" />
                <h3 className="text-base font-semibold">AV1 (honourable mention)</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Released 2018 by the Alliance for Open Media. Another
                30–40% more efficient than HEVC. Netflix and YouTube are
                rolling it out. The future, but slow to encode today.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            H.264 versus H.265: the practical comparison
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            H.265 (HEVC) was designed as H.264&apos;s successor, and at the
            algorithmic level it clearly is. For the same visual quality,
            HEVC needs roughly half the bitrate of H.264. A 1080p movie that
            fills 4 GB as H.264 fits in about 2 GB as HEVC. For 4K content,
            the savings are even more dramatic, which is why Netflix and
            Apple TV stream 4K in HEVC rather than H.264.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The catch is cost and complexity. HEVC encoding and decoding
            are roughly 3–5× more CPU-intensive than H.264. More
            importantly, HEVC is covered by a tangle of patents held by
            multiple pools — MPEG LA, HEVC Advance, and others — which has
            discouraged adoption. Safari and modern phones support it, but
            Chrome and Firefox historically did not, which is why YouTube
            picked the royalty-free VP9 instead. H.264 remains the safe
            default when you need a video to play everywhere.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            VP9: the open alternative
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            VP9 was Google&apos;s answer to the HEVC patent mess. Released
            in 2013, it matches HEVC on efficiency while being completely
            royalty-free. YouTube uses VP9 for everything above 1080p, and
            every Android phone and Chrome browser supports it natively.
            The WebM container format was built specifically to hold VP9
            video and Opus audio.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            VP9 never displaced H.264 in MP4 files because MP4 was designed
            around the MPEG family of codecs. A .mp4 file almost never
            contains VP9 video; if you find VP9, the container is usually
            .webm. This matters for converters: a tool that handles only
            the MP4 demuxer will refuse a .webm file even though the codecs
            inside are no more exotic than what is in an MP4.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Efficiency, in numbers
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="py-2 pr-4 font-semibold">Codec</th>
                  <th className="py-2 pr-4 font-semibold">Year</th>
                  <th className="py-2 pr-4 font-semibold">1080p @ 30fps</th>
                  <th className="py-2 pr-4 font-semibold">Royalty</th>
                  <th className="py-2 font-semibold">Where</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/60">
                  <td className="py-2 pr-4">H.264 (AVC)</td>
                  <td className="py-2 pr-4">2003</td>
                  <td className="py-2 pr-4">~4 Mbps</td>
                  <td className="py-2 pr-4">Paid</td>
                  <td className="py-2">Most MP4s</td>
                </tr>
                <tr className="border-b border-border/60">
                  <td className="py-2 pr-4">H.265 (HEVC)</td>
                  <td className="py-2 pr-4">2013</td>
                  <td className="py-2 pr-4">~2 Mbps</td>
                  <td className="py-2 pr-4">Paid (complex)</td>
                  <td className="py-2">4K streaming</td>
                </tr>
                <tr className="border-b border-border/60">
                  <td className="py-2 pr-4">VP9</td>
                  <td className="py-2 pr-4">2013</td>
                  <td className="py-2 pr-4">~2 Mbps</td>
                  <td className="py-2 pr-4">Free</td>
                  <td className="py-2">YouTube, WebM</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">AV1</td>
                  <td className="py-2 pr-4">2018</td>
                  <td className="py-2 pr-4">~1.3 Mbps</td>
                  <td className="py-2 pr-4">Free</td>
                  <td className="py-2">Newer streaming</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The bitrate column shows roughly how many megabits per second
            each codec needs to deliver visually transparent 1080p at 30
            fps. Lower is better. Notice that each generation roughly
            halves the previous generation&apos;s bitrate — but encoding
            time roughly doubles, which is why older codecs refuse to die.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Why none of this matters when you only want the audio
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Here is the part that saves everyone time. When you convert an
            MP4 to an MP3, the video codec is discarded before it is ever
            decoded. FFmpeg opens the container, finds the audio stream,
            decodes only that stream, and writes the MP3. The video
            codec — whether H.264, H.265, VP9, or AV1 — is ignored
            completely. A 4K HEVC file and a 720p H.264 file produce
            identical MP3s at the same bitrate, because the audio inside
            them is encoded the same way.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            What does affect you is the demux step. Newer codecs like AV1
            and HEVC sometimes use container features that older demuxers
            handle slowly, which is why a 4K file can take longer to open
            than a 1080p file of the same length — even though only the
            audio is being extracted. The encode itself, which is the heavy
            part, runs at the same speed regardless. For more on the audio
            side of the picture, see the{" "}
            <Link
              href="/audio-codecs-explained"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              audio codecs guide
            </Link>
            , and for the container that holds both, the{" "}
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
            A short note on the patents
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            H.264 and H.265 are covered by patents administered by MPEG LA
            and other pools. For end users this is invisible — the licence
            fee is paid by the maker of your phone, browser, or operating
            system. For developers building converters, it is a real cost,
            which is why open-source projects like FFmpeg ship with
            optional codec support that distributors must enable
            deliberately. The royalty-free codecs — VP9, AV1, Opus — exist
            precisely because the patent situation around H.264 and HEVC
            was too unpredictable for the open web. For end users, the
            practical effect is that a file with an unusual codec may play
            in some apps but not others.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            What this means for you
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            When you use MP4toMP3.online, the video codec of your source
            file affects only how long the demux step takes, not the
            quality of your output MP3. The browser-based FFmpeg engine
            understands H.264, H.265, VP9, AV1, and dozens of older codecs,
            so the file you drop in will almost always work. For the
            practical steps, see the{" "}
            <Link
              href="/how-to-convert-mp4-to-mp3"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              how-to guide
            </Link>
            , and for the wider MP4-versus-MP3 picture, the{" "}
            <Link
              href="/mp4-vs-mp3"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              MP4 vs MP3
            </Link>{" "}
            article is the right place to start.
          </p>
        </section>

        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
          <h2 className="text-xl font-bold">Extract audio from any MP4 now</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            MP4toMP3.online discards the video codec and keeps only the
            audio — H.264, H.265, VP9, AV1 all welcome. No upload.
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
