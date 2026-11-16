import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { QuickAnswer } from "@/components/quick-answer";
import { Citations, type Citation } from "@/components/citations";
import {
  FileAudio,
  ShieldCheck,
  HardDrive,
  Network,
  Code,
  ServerOff,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Why Your Files Never Leave Your Device with Our Tool",
  description:
    "MP4toMP3.online never uploads your file. Here is the technical proof: how WebAssembly FFmpeg processes MP4 to MP3 locally, with no server-side processing at all.",
  alternates: { canonical: "/mp4-to-mp3-no-upload" },
  openGraph: {
    title: "Why Your Files Never Leave Your Device with Our Tool",
    description:
      "A technical walkthrough of why MP4toMP3.online never uploads your file. WebAssembly FFmpeg, in-memory buffers, and how to verify it yourself.",
    url: "https://www.mp4tomp3.online/mp4-to-mp3-no-upload",
    type: "article",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Why Your Files Never Leave Your Device with Our Tool",
    description:
      "A technical explanation of how MP4toMP3.online uses WebAssembly FFmpeg to convert MP4 to MP3 entirely on the client device, with no server upload.",
    author: { "@type": "Organization", name: "MP4toMP3.online" },
    publisher: { "@type": "Organization", name: "MP4toMP3.online" },
    mainEntityOfPage: "https://www.mp4tomp3.online/mp4-to-mp3-no-upload",
    datePublished: "2026-11-16",
    dateModified: "2026-11-16",
    citation: [
      "https://developer.mozilla.org/en-US/docs/WebAssembly",
      "https://github.com/ffmpegwasm/ffmpeg.wasm",
      "https://ffmpeg.org/ffmpeg.html",
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell
        title="Why Your Files Never Leave Your Device"
        subtitle="A claim worth proving. Here is the exact mechanism by which MP4toMP3.online converts your MP4 to MP3 without ever sending the file to a server."
      >
        {/* Voice-search quick answer — read aloud by Google Assistant
            when users ask "Does MP4toMP3.online upload my files?" */}
        <QuickAnswer>
          No. MP4toMP3.online does not upload your files. The conversion
          runs entirely in your browser using WebAssembly FFmpeg, which
          means the MP4 is read from your disk into browser memory,
          encoded to MP3 locally, and written back to your device. You
          can verify this in your browser&apos;s Network tab: no upload
          request is made during conversion.
        </QuickAnswer>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            The claim, stated plainly
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            When you convert an MP4 to MP3 with MP4toMP3.online, the
            contents of your video file never traverse the network. There
            is no upload step, no temporary server-side storage, no
            asynchronous job queue on a remote machine. The conversion
            happens in the browser tab you have open, on the CPU of the
            device you are using. This page exists because that is a
            strong claim, and strong claims deserve evidence.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Most &quot;online converters&quot; do upload your file, even
            when they promise otherwise. The upload is structural — their
            architecture cannot function without it, because the FFmpeg
            binary runs on their server, not in your browser. Our
            architecture is different in kind, not just in degree: we run
            FFmpeg in your browser, so the upload step has been removed
            entirely rather than merely promised away.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            The three pieces that make this work
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Code className="h-5 w-5" />
                <h3 className="text-base font-semibold">
                  FFmpeg compiled to WebAssembly
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                FFmpeg is the open-source multimedia framework that almost
                every converter on Earth uses, server-side or otherwise.
                By compiling it to WebAssembly — a binary format browsers
                can execute at near-native speed — we run the exact same
                encoder locally that a server would run remotely.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <HardDrive className="h-5 w-5" />
                <h3 className="text-base font-semibold">
                  In-memory file access
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                When you select a file, the browser reads it into an
                in-memory ArrayBuffer using the File API. That buffer is
                passed directly to the WebAssembly FFmpeg module. No
                <code className="mx-1 rounded bg-muted px-1 py-0.5 text-xs">fetch()</code>
                or XMLHttpRequest sends the bytes anywhere.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <ServerOff className="h-5 w-5" />
                <h3 className="text-base font-semibold">
                  No conversion endpoint
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                The server that hosts the page does not expose any endpoint
                that accepts file uploads for conversion. There is nothing
                to POST to, even if a hypothetical attacker wanted to. The
                conversion API lives in your browser, not on our origin.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Network className="h-5 w-5" />
                <h3 className="text-base font-semibold">
                  Observable network behavior
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Every network request the page makes is visible in the
                browser&apos;s developer tools. You can watch the entire
                conversion flow and confirm for yourself that no file
                content leaves your device.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Verify it yourself, step by step
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            You do not need to take our word for it. Here is how to prove
            the no-upload claim with the tools already in your browser.
          </p>
          <ol className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                1
              </span>
              <span>
                Open the homepage in Chrome, Firefox, or Safari. Open the
                browser&apos;s developer tools — usually with
                <kbd className="mx-1 rounded border border-border bg-muted px-1.5 py-0.5 text-xs">F12</kbd>
                or right-click and &quot;Inspect&quot;.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                2
              </span>
              <span>
                Switch to the <strong>Network</strong> tab. Optionally
                check the &quot;Disable cache&quot; box so nothing is
                hidden by the browser cache.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                3
              </span>
              <span>
                Drop your MP4 file onto the converter and click Convert.
                You will see the WASM engine load on first use (a 30 MB
                fetch from a CDN), then nothing else. No upload request,
                no POST with the file bytes, no streaming connection
                carrying your video away.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                4
              </span>
              <span>
                Inspect any request that does appear. You will see static
                assets, the WASM fetch, and possibly an analytics beacon.
                None of them carry your file&apos;s contents. The
                converted MP3 appears in your Downloads folder, generated
                locally.
              </span>
            </li>
          </ol>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            If you want to be extra thorough, do the same experiment on a
            competing online converter. You will see an upload request
            appear the moment you select a file. That is the difference.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            What this means for sensitive files
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The files people convert are often more sensitive than they
            first appear. An MP4 of an internal company meeting may contain
            trade secrets. A voice memo may discuss a medical diagnosis. A
            recorded interview may include a source who spoke on
            condition of anonymity. A family video may include children.
            Each of these is a real category of file that has, at various
            times, leaked out of server-side converters through
            misconfigured buckets, indexed URLs, or insider access.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Browser-based conversion is not just a privacy improvement
            for the average user. It is the only architecture that makes
            it responsible to convert genuinely sensitive files using a
            web tool at all. A recording that should never leave your
            device never leaves your device — because there is no path by
            which it could.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Common follow-up questions
          </h2>
          <div className="mt-4 space-y-3">
            <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary/30 p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <span className="text-sm leading-relaxed text-muted-foreground">
                <strong>&quot;If nothing is uploaded, how does the file
                get converted?&quot;</strong> The conversion code runs
                locally. WebAssembly FFmpeg executes on your CPU. The file
                goes from disk to memory to MP3 to disk again, all on
                your machine.
              </span>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary/30 p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <span className="text-sm leading-relaxed text-muted-foreground">
                <strong>&quot;Where is the converted MP3 stored?&quot;</strong>
                In your browser memory during the conversion, then in
                your Downloads folder once the conversion completes. It is
                not stored anywhere on our infrastructure.
              </span>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary/30 p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <span className="text-sm leading-relaxed text-muted-foreground">
                <strong>&quot;What about the WASM engine? Does it phone
                home?&quot;</strong> No. Once the WebAssembly binary is
                loaded into your browser, it runs as a pure computation.
                It does not make network requests during conversion. You
                can confirm this in the Network tab.
              </span>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary/30 p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <span className="text-sm leading-relaxed text-muted-foreground">
                <strong>&quot;Is this slower than a server-side
                converter?&quot;</strong> Often faster, because you skip
                the upload entirely. The encoding itself takes about the
                same time on your CPU as it would on a comparable server.
              </span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Related pages
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            For the broader privacy picture — cookies, analytics, GDPR
            rights — see our{" "}
            <Link
              href="/privacy"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              privacy policy
            </Link>
            . For a focused walkthrough of the privacy model and how the
            browser sandbox contains the conversion, the{" "}
            <Link
              href="/mp4-to-mp3-private"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              privacy overview
            </Link>{" "}
            is the companion piece to this page. And for the legal
            dimension — what you may and may not convert — our{" "}
            <Link
              href="/copyright"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              copyright and DMCA policy
            </Link>{" "}
            is the right reference.
          </p>
        </section>

        <Citations
          sources={[
            { title: "WebAssembly \u2014 MDN", url: "https://developer.mozilla.org/en-US/docs/WebAssembly", publisher: "Mozilla MDN", note: "How WebAssembly runs native code, like FFmpeg, inside the browser sandbox." },
            { title: "ffmpeg.wasm \u2014 GitHub", url: "https://github.com/ffmpegwasm/ffmpeg.wasm", publisher: "GitHub", note: "The WebAssembly FFmpeg port that enables no-upload media conversion." },
            { title: "FFmpeg documentation", url: "https://ffmpeg.org/ffmpeg.html", publisher: "FFmpeg", note: "The FFmpeg pipeline that runs entirely client-side when compiled to WASM." },
          ]}
        />

        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
          <h2 className="text-xl font-bold">
            Convert with no upload, right now
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Your file never leaves your device. Verify it yourself in the
            Network tab while you convert.
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
