import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { QuickAnswer } from "@/components/quick-answer";
import {
  FileAudio,
  Music,
  Podcast,
  GraduationCap,
  Download,
  Mic,
  Languages,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Get Audio From Video — Free Online Audio Extractor",
  description:
    "Get audio from any video file for free in your browser. No upload, no sign-up, no install. Supports MP4, MOV, MKV, WebM and saves as MP3.",
  alternates: { canonical: "/get-audio-from-video" },
  openGraph: {
    title: "Get Audio From Video — Free Online Audio Extractor",
    description:
      "Get audio from any video file in your browser. No upload, no sign-up. Works with MP4, MOV, MKV, WebM on any device.",
    url: "https://www.mp4tomp3.online/get-audio-from-video",
    type: "article",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Get Audio From Video — Free Online Audio Extractor",
    description:
      "A guide to getting audio out of any video file using a browser-based extractor. No upload, no sign-up, no install. Works with MP4, MOV, MKV, WebM.",
    author: { "@type": "Organization", name: "MP4toMP3.online" },
    publisher: { "@type": "Organization", name: "MP4toMP3.online" },
    mainEntityOfPage: "https://www.mp4tomp3.online/get-audio-from-video",
    datePublished: "2026-11-16",
    dateModified: "2026-11-16",
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell
        title="Get Audio From Video"
        subtitle="Pull the audio track out of any video file — in your browser, no upload, no install. Free, private, and works on every device."
      >
        {/* Voice-search quick answer — read aloud by assistants when
            users ask "How do I get audio from a video file?" */}
        <QuickAnswer>
          To get audio from a video file, open MP4toMP3.online in your
          browser, drop the video into the extractor, and click Convert.
          The tool reads the file locally, pulls out the audio track, and
          saves it as an MP3 — no upload, no sign-up, no software to
          install.
        </QuickAnswer>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            What &quot;get audio from video&quot; actually means
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            A video file is never just video. Underneath the .mp4 or .mov
            extension is a container that bundles two separate streams: a
            video track (the pictures) and an audio track (the sound).
            Getting audio from a video simply means splitting those streams
            apart and saving the audio track as its own file — usually an
            MP3 you can drop into a music player, a transcription tool, or
            a podcast editor.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            This is not the same as &quot;recording&quot; audio. Nothing is
            played through your speakers and re-captured by a microphone,
            which would sound terrible. Real audio extraction is a digital
            operation: the tool reads the bytes of the audio stream
            directly and either copies them (when the source codec is
            already MP3) or re-encodes them (when the source is AAC or
            another codec). The result is bit-for-bit identical to what
            was mixed into the original video.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Which video formats you can pull audio from
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Because the underlying engine is FFmpeg, a browser-based
            extractor handles essentially every container in common use.
            The list includes:
          </p>
          <ul className="mt-3 space-y-2 text-base leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-3">
              <FileAudio className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>MP4</strong> — the dominant format from phones,
                cameras, and YouTube.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileAudio className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>MOV</strong> — Apple&apos;s QuickTime container,
                the default on iPhone.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileAudio className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>MKV</strong> — popular for high-quality rips and
                anime releases.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileAudio className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>WebM</strong> — Google&apos;s web-optimized
                format, common on HTML5 video.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileAudio className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>AVI, M4V, 3GP</strong> — older formats that still
                show up in archives and email attachments.
              </span>
            </li>
          </ul>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            If your file plays in VLC, the extractor can almost certainly
            read its audio stream. The container format is independent of
            the audio codec — an MP4 might contain AAC, MP3, AC3, or ALAC,
            and a good extractor handles all of them automatically without
            asking you to pick a demuxer.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Step-by-step: getting audio from a video
          </h2>
          <ol className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                1
              </span>
              <span>
                <strong>Open the extractor.</strong> Load the page in any
                modern browser — Chrome, Safari, Firefox, Edge, or Brave on
                desktop or mobile.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                2
              </span>
              <span>
                <strong>Drop your video.</strong> Drag the file onto the
                upload area, or click to open the file picker. On iPhone
                you can pull from Photos or Files; on Android from Files
                or Google Photos.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                3
              </span>
              <span>
                <strong>Click Convert.</strong> The tool reads the file
                locally, demuxes the audio stream, and re-encodes it as MP3
                at roughly 190 kbps variable bitrate.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                4
              </span>
              <span>
                <strong>Download the MP3.</strong> The file lands in your
                Downloads folder (or Files app on iOS). Close the tab and
                nothing is left behind.
              </span>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Common reasons to get audio from a video
          </h2>
          <ul className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-3">
              <Music className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Music from your own recordings.</strong> You filmed
                a live concert or band practice with your phone and want
                just the audio for your music library.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Podcast className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Podcast clips.</strong> Pulling a 30-second
                highlight from a video podcast to share as a teaser or
                drop into another episode.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Lecture audio.</strong> Stripping the audio from a
                recorded lecture so you can listen on a commute without
                burning mobile data on video.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Mic className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Interview audio for transcription.</strong> Feeding
                the audio into a service like Otter or Whisper without the
                video overhead, which slows down most transcribers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Languages className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Language practice.</strong> Extracting audio from
                foreign-language video so you can drill listening
                comprehension on the go.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Choosing an output format
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            MP3 is the safe default because every player on earth supports
            it. But for some use cases a different format is genuinely
            better:
          </p>
          <ul className="mt-3 space-y-2 text-base leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              <span>
                <strong>AAC</strong> keeps the original codec if your MP4
                already uses AAC, with zero quality loss from re-encoding.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              <span>
                <strong>WAV</strong> is uncompressed — best when you will
                edit the audio further before re-compressing it.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              <span>
                <strong>M4A</strong> is Apple&apos;s preferred container
                for AAC, smaller than MP3 at the same quality.
              </span>
            </li>
          </ul>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The browser extractor exposes MP3 as the default and that is the
            right choice for almost everyone. For the wider format menu, the{" "}
            <Link
              href="/mp3-extractor"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              MP3 extractor
            </Link>{" "}
            is a thinner interface that accepts any video container and
            skips the format selection entirely.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Privacy and speed
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Because the conversion runs in your browser using WebAssembly
            FFmpeg, the video file never leaves your device. There is no
            upload, no server queue, no temporary storage on a
            stranger&apos;s disk. A 5-minute clip typically finishes in
            under 15 seconds on a modern laptop and around 25 seconds on a
            mid-range phone.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The one-time cost is a roughly 30 MB FFmpeg engine download the
            first time you convert; after that it is cached and every
            subsequent conversion starts instantly. You can verify the
            no-upload behavior yourself by opening your browser&apos;s
            developer tools and watching the Network tab during a
            conversion — the only outbound traffic should be the initial
            page load and a one-time engine fetch from a CDN.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Related tools</h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            For a deeper, more technical treatment of how audio extraction
            works under the hood, the{" "}
            <Link
              href="/extract-audio-from-video"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              extract audio from video
            </Link>{" "}
            guide walks through demuxing, codecs, and quality trade-offs in
            detail. If you want the broader context of online MP4 to MP3
            conversion, the{" "}
            <Link
              href="/mp4-to-mp3-online"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              MP4 to MP3 online
            </Link>{" "}
            page covers the browser-based pipeline end to end.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            A note on copyright
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Audio extraction is a tool, not a license. Only get audio from
            files you created yourself or have explicit permission to use.
            Pulling audio from someone else&apos;s YouTube video, a
            streaming film, or a paid course without permission is illegal
            in most jurisdictions and against our Terms of Service. This
            tool does not connect to streaming platforms and will reject
            URLs that point to them.
          </p>
        </section>

        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
          <h2 className="text-xl font-bold">Get audio from your video now</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Free, browser-based, no sign-up, no upload. Your file never
            leaves your device.
          </p>
          <Link
            href="/#extractor"
            className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90"
          >
            <Download className="h-4 w-4" /> Extract audio now
          </Link>
        </section>
      </PageShell>
    </>
  );
}
