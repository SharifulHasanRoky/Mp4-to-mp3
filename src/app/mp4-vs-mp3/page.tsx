import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { FileAudio, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "MP4 vs MP3: What's the Difference? (Simple Guide)",
  description:
    "MP4 is a video container; MP3 is an audio-only format. Learn the key differences, when to use each, and how to convert MP4 to MP3 in seconds.",
  alternates: { canonical: "/mp4-vs-mp3" },
  openGraph: {
    title: "MP4 vs MP3: What's the Difference? (Simple Guide)",
    description:
      "MP4 is a video container; MP3 is an audio-only format. Learn the key differences, when to use each, and how to convert MP4 to MP3.",
    url: "https://www.mp4tomp3.online/mp4-vs-mp3",
    type: "article",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "MP4 vs MP3: What's the Difference?",
    description:
      "MP4 is a video container; MP3 is an audio-only format. Learn the key differences and when to use each.",
    author: { "@type": "Organization", name: "MP4toMP3.online" },
    publisher: { "@type": "Organization", name: "MP4toMP3.online" },
    mainEntityOfPage: "https://www.mp4tomp3.online/mp4-vs-mp3",
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell
        title="MP4 vs MP3: What's the Difference?"
        subtitle="A simple, practical guide to understanding when to use MP4, when to use MP3, and how to convert between them."
      >
        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            The short answer
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            <strong>MP4</strong> is a <em>video</em> format — it contains both
            video and audio tracks inside a single file. <strong>MP3</strong>{" "}
            is an <em>audio-only</em> format — it has no video at all. MP4 is
            what your phone records when you shoot a video. MP3 is what you
            listen to when you play a song or podcast.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Converting <strong>MP4 to MP3</strong> simply means taking the
            audio track out of a video file and saving it as a standalone audio
            file. The video portion is discarded.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            What is MP4?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            MP4 (MPEG-4 Part 14) is a digital <strong>container format</strong>{" "}
            — think of it as a box that can hold video, audio, subtitles,
            chapters, and still images all in one file. When you record a video
            on iPhone, Android, Zoom, or OBS, you almost always get an MP4
            file. The video inside is usually H.264 or H.265 (HEVC), and the
            audio inside is usually AAC.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            MP4 is the international standard (ISO/IEC 14496-12) and is
            supported by virtually every device, browser, and media player in
            the world. A typical 1-minute 720p MP4 is around 10–30 MB.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            What is MP3?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            MP3 (MPEG-1 Audio Layer III) is a digital <strong>audio format</strong>{" "}
            that uses lossy compression to make audio files much smaller than
            uncompressed formats like WAV, while still sounding good to human
            ears. A typical MP3 file uses about 1 MB per minute of audio at
            standard quality (128 kbps) or 1.5 MB per minute at high quality
            (192 kbps).
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            MP3 is the most universally compatible audio format in the world —
            it plays on every phone, every browser, every music app, every
            podcast platform, and every video editor. An MP3 file from 1995
            will still play perfectly on a phone in 2026.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            MP4 vs MP3 — quick comparison
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/40">
                  <th className="px-4 py-3 text-left font-semibold">Feature</th>
                  <th className="px-4 py-3 text-left font-semibold">MP4</th>
                  <th className="px-4 py-3 text-left font-semibold">MP3</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-4 py-3 font-medium">Contains</td>
                  <td className="px-4 py-3 text-muted-foreground">Video + audio</td>
                  <td className="px-4 py-3 text-muted-foreground">Audio only</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Typical use</td>
                  <td className="px-4 py-3 text-muted-foreground">Watching videos</td>
                  <td className="px-4 py-3 text-muted-foreground">Listening to music/podcasts</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">File size (1 min)</td>
                  <td className="px-4 py-3 text-muted-foreground">10–30 MB (720p)</td>
                  <td className="px-4 py-3 text-muted-foreground">1–1.5 MB (192 kbps)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Audio codec</td>
                  <td className="px-4 py-3 text-muted-foreground">AAC (usually)</td>
                  <td className="px-4 py-3 text-muted-foreground">MP3 (libmp3lame)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Universal support</td>
                  <td className="px-4 py-3 text-muted-foreground">Yes</td>
                  <td className="px-4 py-3 text-muted-foreground">Yes</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Best for</td>
                  <td className="px-4 py-3 text-muted-foreground">Sharing visual content</td>
                  <td className="px-4 py-3 text-muted-foreground">Portable audio listening</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            When should you convert MP4 to MP3?
          </h2>
          <ul className="mt-3 space-y-2 text-base leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-2">
              <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
              <span>
                You recorded an interview or podcast on video but only need
                the audio for your editor.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
              <span>
                You have a lecture or tutorial recorded as video and want to
                listen on the commute.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
              <span>
                You want to make a video file small enough to share via email
                or messaging — MP3 is roughly 10x smaller.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
              <span>
                You have a song or voice memo recorded as video and want to
                add it to your music library.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
              <span>
                You want to transcribe an interview — most transcription
                tools work faster on MP3 than on MP4.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            When should you NOT convert MP4 to MP3?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Don&apos;t convert if you need the video — for example, when
            uploading to YouTube, Instagram, or TikTok. Those platforms need
            video files, so an MP3 won&apos;t work. If you have an audio file
            and need to upload it to a video platform, you actually need to
            do the <em>reverse</em>:{" "}
            <Link
              href="/wav-to-mp4"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              convert WAV/M4A to MP4
            </Link>{" "}
            instead.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Also, converting MP4 to MP3 re-encodes the audio, which causes a
            small quality loss. If you need bit-perfect lossless audio for
            professional editing, use{" "}
            <Link
              href="/mp4-to-wav"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              MP4 to WAV
            </Link>{" "}
            instead.
          </p>
        </section>

        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
          <h2 className="text-xl font-bold">Ready to convert?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Convert your MP4 file to MP3 in seconds — free, private, no
            sign-up. Files are processed entirely in your browser.
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
