import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { FileAudio, Film, Gauge, Download, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Convert MP4 to MP3 (Step-by-Step Guide, Any Device)",
  description:
    "Convert MP4 to MP3 in 3 simple steps — no software install, no sign-up. Works on iPhone, Android, Mac, Windows, Linux. Free online tool, files processed in your browser.",
  alternates: { canonical: "/how-to-convert-mp4-to-mp3" },
  openGraph: {
    title: "How to Convert MP4 to MP3 (Step-by-Step Guide, Any Device)",
    description:
      "Convert MP4 to MP3 in 3 simple steps — no software install, no sign-up. Works on iPhone, Android, Mac, Windows, Linux.",
    url: "https://www.mp4tomp3.online/how-to-convert-mp4-to-mp3",
    type: "article",
  },
};

export default function Page() {
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Convert MP4 to MP3 Online",
    description:
      "Convert any MP4 video file to an MP3 audio file using a free online tool. No software install, no sign-up. Files are processed in your browser.",
    totalTime: "PT1M",
    supply: [
      { "@type": "HowToSupply", name: "An MP4 video file (or a URL to one)" },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "MP4toMP3.online — free online MP4 to MP3 converter",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Open the MP4 to MP3 converter",
        text: "Go to https://www.mp4tomp3.online/ in any modern browser (Chrome, Firefox, Safari, Edge). The converter tool is right at the top of the homepage — no need to scroll.",
        url: "https://www.mp4tomp3.online/",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Upload your MP4 file or paste a URL",
        text: "Click 'Choose File' to upload a video from your device (max 500 MB). Or switch to 'From URL' mode and paste a direct link to a video file — Google Drive share links and Dropbox share links also work, just make sure the file is shared as 'Anyone with the link'.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Click 'Convert to MP3' and wait",
        text: "The first time you convert, your browser will download the FFmpeg engine (~30MB, cached after first use). Then FFmpeg extracts the audio track from your MP4 and re-encodes it as a high-quality MP3. Most videos under 100 MB take 10–60 seconds.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Download your MP3",
        text: "When conversion is complete, click 'Download MP3'. The file is saved to your device's default download folder with the same base name as your uploaded video, but with a .mp3 extension.",
      },
    ],
  };

  return (
    <>
      <JsonLd data={howToJsonLd} />
      <PageShell
        title="How to Convert MP4 to MP3"
        subtitle="A complete step-by-step guide for iPhone, Android, Mac, Windows, and Linux. No software install, no sign-up — takes about a minute."
      >
        <section>
          <h2 className="text-2xl font-bold tracking-tight">Quick summary</h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Converting MP4 to MP3 is simple: upload your video file, click
            Convert, and download the MP3. Everything happens in your browser —
            your video never gets uploaded to a server. The whole process takes
            about a minute for a typical short video.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Step-by-step instructions
          </h2>
          <ol className="mt-4 space-y-5">
            <li className="flex gap-4">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Film className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-semibold">
                  1. Open the converter
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Go to{" "}
                  <Link
                    href="/"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    MP4toMP3.online
                  </Link>{" "}
                  in any modern browser — Chrome, Firefox, Safari, Edge, Opera,
                  Brave. The converter tool is right at the top of the
                  homepage, no scrolling required.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileAudio className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-semibold">
                  2. Upload your MP4 file or paste a URL
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Click <strong>Choose File</strong> and pick your MP4 video
                  (max 500 MB). Or switch to the <strong>From URL</strong> tab
                  and paste a direct link to a video file. Google Drive share
                  links and Dropbox share links also work — just make sure the
                  file is shared as &quot;Anyone with the link.&quot;
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Gauge className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-semibold">
                  3. Click &quot;Convert to MP3&quot;
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  The first time you convert, your browser will download the
                  FFmpeg engine (~30 MB, cached for next time). Then FFmpeg
                  extracts the audio track from your MP4 and re-encodes it as a
                  high-quality MP3 (VBR ~190 kbps). Most videos under 100 MB
                  take 10–60 seconds.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Download className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-semibold">
                  4. Download your MP3
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  When conversion is complete, click <strong>Download MP3</strong>.
                  The file is saved to your device&apos;s default download
                  folder with the same base name as your uploaded video, but
                  with a <code>.mp3</code> extension. Done!
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            On iPhone or iPad
          </h2>
          <ul className="mt-3 space-y-2 text-base leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-2">
              <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
              <span>Use Safari or Chrome on iOS — both work.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
              <span>
                To upload from your Photos: tap Choose File → Photo Library →
                pick the video. (If your video is in Files app, choose
                &quot;Browse&quot; instead.)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
              <span>
                The MP3 will save to your Downloads folder in the Files app.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">On Android</h2>
          <ul className="mt-3 space-y-2 text-base leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-2">
              <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
              <span>Use Chrome, Firefox, or Brave — all work fine.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
              <span>
                Tap Choose File → Files → pick your video. Or upload directly
                from Google Photos by choosing &quot;Photo Library.&quot;
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
              <span>
                The MP3 will appear in your Downloads folder in the Files app.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            On Windows or Mac
          </h2>
          <ul className="mt-3 space-y-2 text-base leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-2">
              <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
              <span>
                Drag and drop your file directly onto the upload area — no
                need to click anything.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
              <span>
                On Mac: downloads go to ~/Downloads by default (or wherever
                Safari/Chrome is configured to save).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
              <span>
                On Windows: downloads go to C:\Users\&lt;you&gt;\Downloads by
                default.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Common problems
          </h2>
          <h3 className="mt-4 text-lg font-semibold">
            &quot;Conversion failed: FFmpeg engine took too long to load&quot;
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Your internet connection may be slow or jsDelivr CDN may be blocked
            in your region. Try refreshing the page, switching to a different
            network, or using a VPN.
          </p>
          <h3 className="mt-4 text-lg font-semibold">
            &quot;YouTube links cannot be converted&quot;
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            This is by design — YouTube serves HTML pages, not direct video
            files, and downloading from YouTube violates their Terms of
            Service. You can only convert files you own or have explicit
            permission to use.
          </p>
          <h3 className="mt-4 text-lg font-semibold">
            &quot;Google Drive URL failed to fetch&quot;
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Make sure your Google Drive file is shared as &quot;Anyone with
            the link.&quot; Right-click the file in Drive → Share → change
            &quot;Restricted&quot; to &quot;Anyone with the link.&quot;
          </p>
        </section>

        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
          <h2 className="text-xl font-bold">Ready to try it?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Convert your first MP4 to MP3 right now — it takes less than a
            minute and there&apos;s no sign-up.
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
