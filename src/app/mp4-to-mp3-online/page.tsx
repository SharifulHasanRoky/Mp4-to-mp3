import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { QuickAnswer } from "@/components/quick-answer";
import {
  FileAudio,
  Check,
  Zap,
  ShieldCheck,
  Globe,
  Clock,
  Smartphone,
  Wifi,
  HardDrive,
} from "lucide-react";

export const metadata: Metadata = {
  title: "MP4 to MP3 Online — Free Browser-Based Converter",
  description:
    "Convert MP4 to MP3 online for free. Browser-based, no upload, no sign-up, no install. Your video never leaves your device. Fast, private, works on any device.",
  alternates: { canonical: "/mp4-to-mp3-online" },
  openGraph: {
    title: "MP4 to MP3 Online — Free Browser-Based Converter",
    description:
      "Convert MP4 to MP3 online for free. Browser-based, no upload, no sign-up. Works on iPhone, Android, Mac, Windows.",
    url: "https://www.mp4tomp3.online/mp4-to-mp3-online",
    type: "article",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "MP4 to MP3 Online — Free Browser-Based Converter",
    description:
      "A guide to converting MP4 to MP3 online using a browser-based tool. No upload, no sign-up, no install. Fast, private, works on any device.",
    author: { "@type": "Organization", name: "MP4toMP3.online" },
    publisher: { "@type": "Organization", name: "MP4toMP3.online" },
    mainEntityOfPage: "https://www.mp4tomp3.online/mp4-to-mp3-online",
    datePublished: "2025-03-10",
    dateModified: "2026-01-15",
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell
        title="MP4 to MP3 Online"
        subtitle="Convert MP4 to MP3 in your browser — no upload, no install, no sign-up. Fast, private, and free on any device."
      >
        {/* Voice-search quick answer — read aloud by Google Assistant
            when users ask "How do I convert MP4 to MP3 online?" */}
        <QuickAnswer>
          To convert MP4 to MP3 online, open MP4toMP3.online in any browser,
          upload your MP4 file, click &quot;Convert to MP3,&quot; and download
          the audio. The conversion runs entirely in your browser using
          WebAssembly FFmpeg, so your file is never uploaded and you never
          need to sign up or install anything.
        </QuickAnswer>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            What &quot;MP4 to MP3 online&quot; should mean
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            &quot;MP4 to MP3 online&quot; is one of the most-searched
            conversion queries on the web, and most of the results disappoint.
            The typical online converter asks for an email before letting you
            upload, caps files at 50 MB, queues your job behind other users,
            and stores your video on a server you have no control over.
            &quot;Online&quot; ends up meaning &quot;through a server,&quot;
            with all the privacy and speed costs that implies.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            It does not have to be that way. A browser-based converter is
            still &quot;online&quot; — it loads from a URL, requires no
            install, and works on any device — but it runs the actual
            conversion locally using WebAssembly. Your video file never leaves
            your device, the conversion starts instantly without a queue, and
            there is no per-user cost to recover, so the tool can stay
            genuinely free with no sign-up.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            How online MP4 to MP3 conversion works
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Whether online or desktop, almost every MP4 to MP3 converter uses
            the same underlying engine: FFmpeg, the open-source multimedia
            framework. The conversion pipeline is always the same three steps:
          </p>
          <ol className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                1
              </span>
              <span>
                <strong>Demux</strong> the MP4 container to separate the audio
                stream (usually AAC) from the video stream.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                2
              </span>
              <span>
                <strong>Decode</strong> the AAC audio into raw PCM samples.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                3
              </span>
              <span>
                <strong>Re-encode</strong> the PCM samples as MP3 using the
                libmp3lame encoder at a target bitrate (typically VBR ~190
                kbps).
              </span>
            </li>
          </ol>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The video stream is discarded along the way — that is why an MP4
            of 30 MB can become an MP3 of 3 MB without losing the audible
            content. The only difference between an online converter and a
            desktop one is <em>where</em> those three steps run.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Why browser-based beats server-side
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <ShieldCheck className="h-5 w-5" />
                <h3 className="text-base font-semibold">Your file stays put</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Browser conversion means the video is read from your disk,
                processed in memory, and written back as an MP3 — all locally.
                There is no upload, no temporary server storage, no access
                log. The privacy model is identical to a desktop app.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Zap className="h-5 w-5" />
                <h3 className="text-base font-semibold">No upload wait</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                On a typical home connection, uploading a 50 MB file takes
                longer than encoding it. Browser-based conversion skips the
                upload entirely, so a 30-second clip can finish in 5 seconds
                instead of 30.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Clock className="h-5 w-5" />
                <h3 className="text-base font-semibold">No queue</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Server-side converters queue jobs during peak hours. A
                browser-based converter uses your own CPU, so the only wait is
                the encoding itself.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <HardDrive className="h-5 w-5" />
                <h3 className="text-base font-semibold">Nothing stored</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Because there is no upload, there is nothing to delete. The
                file exists in your browser memory during conversion and is
                gone the moment you close the tab.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Speed: what to actually expect
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Conversion speed depends on three things: your CPU, the file
            length, and the source codec. On a modern laptop, a 5-minute 720p
            MP4 converts to MP3 in roughly 8–15 seconds. On a mid-range phone,
            the same file might take 20–30 seconds. A 4K clip will be slower
            because the demux step has more data to wade through, even though
            the final MP3 is the same length.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            There is a one-time cost the first time you convert: the browser
            downloads the WebAssembly FFmpeg engine (around 30 MB) from a CDN.
            After that it is cached, so every subsequent conversion starts
            instantly. On a fast connection the first-time download takes
            about 3 seconds; on a slow connection it can take 30. This is the
            trade-off for an install-free experience.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Privacy: the part most converters get wrong
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            When you upload a video to a server-side converter, that file sits
            on someone else&apos;s hardware. Even sites that promise automatic
            deletion have been caught keeping files in predictable URLs that
            later get indexed by search engines. Sensitive interviews, internal
            company recordings, personal voice memos — all of it ends up on a
            stranger&apos;s disk, even if briefly.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Browser-based conversion removes that exposure entirely. The file
            is read from your disk into browser memory, processed, and written
            back as an MP3. No network request carries the file&apos;s
            contents. You can verify this yourself: open your browser&apos;s
            developer tools, switch to the Network tab, and watch what happens
            during conversion. The only outbound traffic should be the initial
            page load and a one-time FFmpeg fetch from a CDN.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Works on every device
          </h2>
          <ul className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-3">
              <Smartphone className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>iPhone and iPad:</strong> Safari or Chrome, upload
                from Photos or Files. The MP3 saves to your Files app.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Smartphone className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Android:</strong> Chrome, Firefox, or Brave. Upload
                from Files or Google Photos. The MP3 lands in your Downloads
                folder.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Globe className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Mac, Windows, Linux:</strong> any modern browser.
                Drag-and-drop your file onto the upload area and skip the file
                picker entirely.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Chromebook:</strong> works natively, no Linux
                container required.
              </span>
            </li>
          </ul>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            For step-by-step instructions including screenshots for each
            platform, the{" "}
            <Link
              href="/"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              main MP4 to MP3 converter
            </Link>{" "}
            is on the homepage. If you specifically want to extract audio
            without choosing a format, the{" "}
            <Link
              href="/mp3-extractor"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              MP3 extractor
            </Link>{" "}
            is a thinner interface for the same job.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Quality: what you will hear
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            A browser-based converter uses the same libmp3lame encoder as
            Audacity and HandBrake, so the output quality is identical to what
            you would get from a desktop tool at the same bitrate. At VBR ~190
            kbps — the default for most online converters — the output is
            transparent to human ears on virtually all consumer playback
            equipment.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The unavoidable cost is one generation of re-encoding. MP4 audio
            is usually AAC, which is already lossy. Re-encoding AAC to MP3
            adds a small amount of additional compression. For spoken-word
            content — interviews, lectures, voice memos — this is imperceptible.
            For music at high listening volumes on studio monitors, careful
            listeners may notice a slight softening in the high frequencies,
            but it is well below the threshold most people will ever detect.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Other formats, same engine
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The same browser-based engine handles more than just MP4. If you
            have QuickTime .mov files from an iPhone, our{" "}
            <Link
              href="/mov-to-mp3"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              MOV to MP3 converter
            </Link>{" "}
            is purpose-built for that container. For MKV, WebM, AVI, and
            everything else FFmpeg understands, the MP3 extractor linked above
            handles them all. The conversion pipeline is the same three steps
            regardless of input container — only the demuxer differs.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            A quick note on copyright
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Online converters are tools, not licenses. You should only convert
            files you created yourself or that you have explicit permission to
            use. Pulling audio from someone else&apos;s YouTube video, a
            Netflix film, or a streaming platform without permission is illegal
            in most jurisdictions and against our Terms of Service. This tool
            does not connect to streaming platforms and will reject URLs that
            point to them.
          </p>
        </section>

        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
          <h2 className="text-xl font-bold">Convert MP4 to MP3 online now</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Free, browser-based, no sign-up, no upload. Your file never leaves
            your device.
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
