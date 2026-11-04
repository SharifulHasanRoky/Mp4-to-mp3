import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { QuickAnswer } from "@/components/quick-answer";
import { FileAudio, Film, Gauge, Download, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Convert MP4 to MP3 on iPhone (Safari, No App)",
  description:
    "Convert MP4 to MP3 on iPhone in 4 simple steps — no app install, no sign-up. Works in Safari on iOS 13+. Files processed entirely in your browser.",
  alternates: { canonical: "/how-to-convert-mp4-to-mp3-on-iphone" },
  openGraph: {
    title: "How to Convert MP4 to MP3 on iPhone (Safari, No App)",
    description:
      "Convert MP4 to MP3 on iPhone in 4 simple steps — no app install, no sign-up. Works in Safari on iOS 13+.",
    url: "https://www.mp4tomp3.online/how-to-convert-mp4-to-mp3-on-iphone",
    type: "article",
  },
};

export default function Page() {
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Convert MP4 to MP3 on iPhone",
    description:
      "Convert any MP4 video file to MP3 audio on iPhone using Safari. No app install, no sign-up, files processed in your browser.",
    totalTime: "PT2M",
    supply: [{ "@type": "HowToSupply", name: "An MP4 video file on your iPhone" }],
    tool: [
      {
        "@type": "HowToTool",
        name: "Safari browser + MP4toMP3.online",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Open Safari",
        text: "Open the Safari browser on your iPhone. Chrome and Firefox on iOS also work, but Safari is the fastest.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Go to MP4toMP3.online",
        text: "Type mp4tomp3.online in the address bar and press Go. The converter tool is right at the top of the page.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Upload your MP4 file",
        text: "Tap 'Choose File', then select 'Photo Library' to pick a video from your Photos, or 'Browse' to pick from Files app. Select your MP4 video.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Tap Convert to MP3",
        text: "Tap the 'Convert to MP3' button. The first time, your browser downloads the FFmpeg engine (~30MB, cached after). Conversion takes 10-60 seconds depending on video length.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Download your MP3",
        text: "When conversion finishes, tap 'Download MP3'. The file saves to your Downloads folder in the Files app.",
      },
    ],
  };

  return (
    <>
      <JsonLd data={howToJsonLd} />
      <PageShell
        title="How to Convert MP4 to MP3 on iPhone"
        subtitle="A complete step-by-step guide for iPhone and iPad. No app install, no sign-up — works in Safari on iOS 13 and later."
      >
        <QuickAnswer>
          To convert MP4 to MP3 on iPhone, open Safari, go to MP4toMP3.online,
          tap Choose File, select your video from Photo Library or Files,
          tap Convert to MP3, then tap Download MP3. The whole process takes
          about a minute and works on any iPhone running iOS 13 or later.
        </QuickAnswer>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Quick summary</h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Converting MP4 to MP3 on iPhone is simple and free. You don&apos;t
            need to install any app from the App Store — everything happens
            in Safari. Your video file is processed entirely on your device,
            so it never gets uploaded to a server. Your privacy is fully
            protected.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Step-by-step instructions</h2>
          <ol className="mt-4 space-y-5">
            <li className="flex gap-4">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Film className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-semibold">1. Open Safari</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Open the Safari browser on your iPhone. Chrome and Firefox
                  on iOS also work, but Safari is the fastest because it has
                  native WebAssembly support.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileAudio className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-semibold">2. Go to MP4toMP3.online</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Type{" "}
                  <Link
                    href="/"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    mp4tomp3.online
                  </Link>{" "}
                  in the address bar and press Go. The converter tool is right
                  at the top of the page — no scrolling needed.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Film className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-semibold">3. Upload your MP4 file</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Tap <strong>Choose File</strong>. You&apos;ll see two options:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>
                      <strong>Photo Library</strong> — pick a video from your
                      Photos app (most iPhone videos are here)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>
                      <strong>Browse</strong> — pick from Files app (Downloads,
                      iCloud Drive, etc.)
                    </span>
                  </li>
                </ul>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Select your MP4 video. Maximum file size is 500 MB.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Gauge className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-semibold">4. Tap &quot;Convert to MP3&quot;</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Tap the <strong>Convert to MP3</strong> button. The first
                  time you convert, your browser downloads the FFmpeg engine
                  (~30 MB) — this is cached for future conversions. The
                  conversion itself takes 10-60 seconds depending on video
                  length.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Download className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-semibold">5. Download your MP3</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  When conversion is complete, tap <strong>Download MP3</strong>.
                  The file saves to your Downloads folder in the Files app.
                  You can play it in the Music app, share it, or move it
                  anywhere you like.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Tips for iPhone users</h2>
          <ul className="mt-3 space-y-2 text-base leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-2">
              <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
              <span>
                <strong>iOS 13 or later required</strong> — earlier versions
                don&apos;t support WebAssembly well enough for FFmpeg.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
              <span>
                <strong>Wi-Fi recommended</strong> — the first conversion
                downloads ~30 MB for the FFmpeg engine. Use Wi-Fi to avoid
                mobile data charges.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
              <span>
                <strong>iPhone recordings are .mov</strong> — iPhone records
                video as .mov by default. Our tool also handles MOV files, so
                you don&apos;t need to convert to MP4 first. See our{" "}
                <Link
                  href="/mov-to-mp3"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  MOV to MP3 guide
                </Link>
                .
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
              <span>
                <strong>Files app location</strong> — the MP3 saves to{" "}
                <strong>Files → On My iPhone → Downloads</strong>. If you
                can&apos;t find it, open the Files app and check Downloads.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
              <span>
                <strong>Battery</strong> — conversion uses CPU, so your phone
                may get warm. This is normal and safe.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Common problems</h2>
          <h3 className="mt-4 text-lg font-semibold">
            &quot;Choose File&quot; button doesn&apos;t do anything
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Make sure you&apos;re running iOS 13 or later. Try refreshing the
            page. If it still doesn&apos;t work, try Chrome or Firefox from
            the App Store.
          </p>

          <h3 className="mt-4 text-lg font-semibold">
            Conversion is very slow
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            iPhone conversion speed depends on the video length and your
            device. A 1-minute video takes about 15-30 seconds on iPhone 12
            or later. Longer videos take proportionally longer. See our{" "}
            <Link
              href="/mp4-to-mp3-slow-conversion"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              slow conversion troubleshooting guide
            </Link>
            .
          </p>

          <h3 className="mt-4 text-lg font-semibold">
            Can&apos;t find the downloaded MP3
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Open the <strong>Files app</strong> → tap <strong>Browse</strong> →
            look under <strong>On My iPhone → Downloads</strong>. If you used
            Safari, the file is there. If you used Chrome, check Chrome&apos;s
            downloads from the Chrome menu.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Why use MP4toMP3.online on iPhone?</h2>
          <ul className="mt-3 space-y-2 text-base leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-2">
              <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
              <span><strong>No app install</strong> — saves storage space</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
              <span><strong>Private</strong> — files never leave your device</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
              <span><strong>Free</strong> — no subscription, no watermark</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
              <span><strong>Fast</strong> — most videos convert in under a minute</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
              <span><strong>Works offline</strong> — after first load, the engine is cached</span>
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
          <h2 className="text-xl font-bold">Ready to convert?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Convert your MP4 to MP3 on iPhone right now — it takes less than
            a minute and there&apos;s no sign-up.
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
