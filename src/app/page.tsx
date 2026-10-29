import Link from "next/link";
import {
  Zap,
  ShieldCheck,
  Smartphone,
  Music,
  FileAudio,
  Film,
  Gauge,
  Heart,
  ArrowRight,
  Sparkles,
  Lock,
} from "lucide-react";
import { AudioExtractor } from "@/components/audio-extractor";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { AllToolsGrid } from "@/components/all-tools-grid";

const features = [
  {
    icon: Zap,
    title: "Fast Conversion",
    desc: "FFmpeg-powered extraction processes most videos in seconds — no waiting in queue.",
  },
  {
    icon: ShieldCheck,
    title: "Private by Design",
    desc: "Files are processed and deleted automatically. We do not keep your videos on our servers.",
  },
  {
    icon: Smartphone,
    title: "Works on Every Device",
    desc: "Mobile-first responsive design that runs smoothly on phones, tablets, and desktops.",
  },
  {
    icon: Music,
    title: "High-Quality MP3",
    desc: "Output is encoded with libmp3lame at VBR ~190 kbps for clean, professional audio.",
  },
  {
    icon: Film,
    title: "All Major Formats",
    desc: "Supports MP4, MOV, WebM, MKV, AVI, M4V, FLV, 3GP and direct audio formats too.",
  },
  {
    icon: Lock,
    title: "No Sign-up Required",
    desc: "No account, no email, no watermark. Just upload, extract, and download — free.",
  },
];

const steps = [
  {
    n: "01",
    title: "Upload your video",
    desc: "Drag and drop a video file you own, or click to browse. We accept MP4, MOV, WebM, MKV, AVI and more.",
    icon: Film,
  },
  {
    n: "02",
    title: "Extract the audio",
    desc: "Our FFmpeg-powered backend extracts the audio track and encodes it to a clean MP3 file in seconds.",
    icon: Gauge,
  },
  {
    n: "03",
    title: "Download your MP3",
    desc: "Save the extracted MP3 file to your device. Temp files are automatically deleted after processing.",
    icon: Download,
  },
];

const faqItems = [
  {
    q: "How do I convert MP4 to MP3?",
    a: "Converting MP4 to MP3 is simple: drag and drop your MP4 file into the upload area above (or click Choose File to browse), then click the Convert MP4 to MP3 button. FFmpeg extracts the audio track from your MP4 and encodes it as a high-quality MP3 file in seconds. Click Download MP3 to save it to your device.",
  },
  {
    q: "Is the MP4 to MP3 converter free?",
    a: "Yes. MP4 to MP3 is 100% free for personal use. There are no hidden fees, no sign-up requirement, and no watermark on your output. You can convert as many MP4 files to MP3 as you like, up to 100 MB per file.",
  },
  {
    q: "What video formats can I convert to MP3?",
    a: "We primarily convert MP4 to MP3, but we also accept MOV, WebM, MKV, AVI, M4V, FLV, and 3GP — all converted to the same high-quality MP3 output. We also accept direct audio files (MP3, M4A, AAC, WAV, OGG, Opus, FLAC) if you want to standardize them on MP3.",
  },
  {
    q: "How long does the MP4 to MP3 conversion take?",
    a: "Most MP4 files under 100 MB are converted in 5 to 30 seconds depending on file size and length. Our backend uses FFmpeg, the industry standard for media processing, so conversion is fast and reliable.",
  },
  {
    q: "Will converting MP4 to MP3 reduce the audio quality?",
    a: "Slightly, because we re-encode the audio to MP3. However, we use FFmpeg with the libmp3lame encoder at VBR quality 2 (~190 kbps), which delivers near-transparent audio quality — indistinguishable from the original for almost all listeners, suitable for podcasts, music production, video editing, and personal listening.",
  },
  {
    q: "Do you store my uploaded MP4 files?",
    a: "No. Uploaded files are written to a temporary directory, processed immediately by FFmpeg, and deleted right after the MP3 is returned to you. We never persist, share, or distribute your media. The MP3 itself is delivered to your browser as a stream and is not stored on our server either.",
  },
  {
    q: "Can I convert MP4 to MP3 from any video on the internet?",
    a: "No. MP4 to MP3 is designed for your own content — videos you recorded, edited, or have explicit permission to use. You cannot use this tool to download audio from copyrighted material on Instagram, TikTok, YouTube, or any other platform. Doing so would violate copyright law and our Terms of Service.",
  },
  {
    q: "Is there a file size limit for MP4 to MP3 conversion?",
    a: "Yes, the maximum upload size is 100 MB per file. This limit helps keep the service fast and free for everyone. If you regularly need to process larger files, consider trimming your video first or using a local tool like HandBrake.",
  },
  {
    q: "Does the MP4 to MP3 converter work on iPhone and Android?",
    a: "Yes. The website is fully responsive and works in modern mobile browsers including Safari on iOS and Chrome on Android. You can upload MP4 files directly from your phone's camera roll or file manager.",
  },
];

function Download({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "MP4 to MP3",
    url: "https://mp4-to-mp3.app",
    description:
      "Free online MP4 to MP3 converter. Convert any video file to high-quality MP3 audio with FFmpeg-powered processing. No sign-up, no watermark.",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "MP4 to MP3 conversion",
      "Video to audio conversion",
      "Extract audio from video",
      "Supports MP4, MOV, WebM, MKV, AVI",
      "FFmpeg-powered processing",
      "Private and secure",
      "Mobile-friendly",
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <JsonLd data={[jsonLd, faqJsonLd]} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-accent/40 via-background to-background" />
        <div
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(var(--primary) / 0.18), transparent)",
          }}
        />
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Free · Private · No Sign-up
              </div>
              <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                MP4 to MP3{" "}
                <span className="bg-gradient-to-r from-primary to-fuchsia-500 bg-clip-text text-transparent">
                  Converter
                </span>
              </h1>
              <p className="mt-5 text-base text-muted-foreground sm:text-lg lg:text-xl">
                Convert MP4 to MP3 online for free. Upload any video file and
                extract a high-quality MP3 audio track in seconds — fast,
                private, and powered by FFmpeg. No software install, no sign-up,
                no watermark.
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <a
                  href="#extractor"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90"
                >
                  <FileAudio className="h-4 w-4" /> Convert MP4 to MP3
                </a>
                <Link
                  href="/how-to-use"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-card px-7 text-sm font-semibold transition-all hover:bg-secondary"
                >
                  How it works <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-8 flex items-center justify-center gap-6 text-xs text-muted-foreground lg:justify-start">
                <span className="flex items-center gap-1.5">
                  <Gauge className="h-4 w-4 text-primary" /> Fast
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-primary" /> Private
                </span>
                <span className="flex items-center gap-1.5">
                  <Heart className="h-4 w-4 text-primary" /> Free forever
                </span>
              </div>
            </div>

            <div>
              <AudioExtractor />
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip / supported formats */}
      <section className="border-y border-border/60 bg-secondary/20">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-center text-sm font-medium text-muted-foreground">
            <span className="text-foreground/70">Supported formats:</span>
            {["MP4", "MOV", "WebM", "MKV", "AVI", "M4V", "FLV", "3GP", "MP3", "WAV"].map(
              (fmt) => (
                <span key={fmt} className="rounded-md bg-card px-2.5 py-1 text-xs">
                  {fmt}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Why use MP4 to MP3?
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            The fastest, cleanest, and most private way to convert MP4 to MP3
            online — built for creators, podcasters, students, and anyone who
            needs to extract audio from their own video files.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-border/70 bg-card p-6 transition-all hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-border/60 bg-secondary/20 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How to convert MP4 to MP3 in 3 simple steps
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              From video upload to MP3 download in under a minute. No technical
              knowledge required.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.n}
                className="relative rounded-2xl border border-border/70 bg-card p-6 text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-fuchsia-500/20 text-primary">
                  <step.icon className="h-6 w-6" />
                </div>
                <div className="mt-4 text-xs font-bold text-primary">
                  STEP {step.n}
                </div>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="#extractor"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90"
            >
              <FileAudio className="h-4 w-4" /> Try it now — it&apos;s free
            </a>
          </div>
        </div>
      </section>

      {/* SEO content block */}
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Convert MP4 to MP3 — the easy, legal way
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            MP4 to MP3 is a free online MP4 to MP3 converter that takes
            any MP4 video file you upload and turns it into a clean, portable
            MP3 audio track. Whether you recorded a podcast on your phone,
            exported a video from your editing software, or captured a personal
            clip that you want to reuse as audio only, this tool does the job in
            seconds — without installing any software or signing up for an
            account. Beyond MP4, we also accept MOV, WebM, MKV, AVI, M4V, FLV,
            and 3GP, so the same tool works as a complete video-to-audio
            converter for almost any file you have.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Unlike many &quot;Instagram audio downloader&quot; or &quot;Reel
            audio download&quot; sites, MP4 to MP3 does not scrape, fetch,
            or distribute content from third-party platforms. We only process
            files that you upload yourself, which means there is no copyright
            infringement, no DMCA risk, and no platform-terms violation. This
            also makes the site eligible for clean monetization through
            advertising networks such as Google AdSense, because the underlying
            service is a legitimate audio-conversion utility — the same category
            as online-convert, CloudConvert, and Audacity&apos;s export
            feature.
          </p>

          <h3 className="mt-8 text-xl font-semibold">
            Built on FFmpeg — the industry standard
          </h3>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Every MP4 to MP3 conversion on this site is powered by FFmpeg, the
            same open-source media framework used by YouTube, Vimeo, OBS Studio,
            and virtually every professional video pipeline in the world. We
            use the libmp3lame encoder at VBR quality 2 (approximately 190
            kbps), which produces near-transparent audio suitable for podcasts,
            music production, voice-overs, and personal listening. The output is
            a standard MP3 file that plays on every device, browser, and audio
            app.
          </p>

          <h3 className="mt-8 text-xl font-semibold">Privacy-first by design</h3>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Your uploaded videos never live on our servers for more than a few
            seconds. Files are written to a temporary processing directory,
            passed to FFmpeg, and immediately deleted once the MP3 has been
            generated and returned to your browser. We do not store, log, or
            share your media with any third party. There is no account, no
            tracking of file contents, and no permanent copy of your video
            anywhere on our infrastructure.
          </p>

          <h3 className="mt-8 text-xl font-semibold">
            Use cases for converting MP4 to MP3
          </h3>
          <ul className="mt-3 space-y-2 text-base leading-relaxed text-muted-foreground">
            <li>
              <strong>Podcast production:</strong> Pull the audio track from a
              recorded video interview so you can edit it in Audacity, Garage
              Band, or Descript.
            </li>
            <li>
              <strong>Voice memos:</strong> Convert a voice memo you recorded as
              a video on your phone into a portable MP3.
            </li>
            <li>
              <strong>Music production:</strong> Extract a vocal or instrument
              stem from your own recorded session for further mixing.
            </li>
            <li>
              <strong>Education:</strong> Turn lecture recordings, tutorials, or
              course videos into audio that students can listen to on the go.
            </li>
            <li>
              <strong>Archival:</strong> Convert old home videos into audio
              files for easier storage, sharing, and preservation.
            </li>
          </ul>
        </div>
      </section>

      {/* Why our tool is the best MP4 to MP3 converter (covers "best mp4 to mp3 converter" + "mp4 to mp3 software" keywords) */}
      <section className="border-t border-border/60 bg-secondary/20 py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              The best MP4 to MP3 converter — online, no software install
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Searching for the best MP4 to MP3 converter usually turns up two
              kinds of results: desktop software like Audacity, VLC, and
              HandBrake (powerful but require installation, take up disk space,
              and have a learning curve), and online tools like MP4 to MP3
              Studio (instant, free, no install). For most one-off conversions
              — pulling a voice memo from a phone video, exporting a podcast
              interview from Zoom, isolating a scratch vocal take — an online
              tool is faster, simpler, and just as reliable.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Unlike downloadable MP4 to MP3 software, MP4 to MP3 runs
              entirely in your browser. There is nothing to download, nothing
              to install, nothing to update, and nothing to expose your computer
              to potential malware from sketchy download sites. You drag your
              file in, click one button, and the MP3 is delivered back to you
              in seconds. This makes it ideal for quick tasks on phones,
              tablets, shared computers, or workstations where you don&apos;t
              have admin privileges.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              The conversion engine is identical to what desktop software
              uses: FFmpeg with the libmp3lame encoder at VBR quality 2 (~190
              kbps). The output is the same high-quality, universally playable
              MP3 file you would get from Audacity or VLC. The only
              differences are convenience (no install), privacy (files deleted
              automatically after conversion), and price (free, with no
              watermark or sign-up required).
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              If you regularly need to process multi-gigabyte files or do
              advanced audio editing (filtering, normalization, multi-track
              mixing), install a desktop tool like{" "}
              <Link
                href="/mp4-to-wav"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                convert MP4 to WAV
              </Link>{" "}
              for lossless work and then edit in Audacity. For 95% of personal
              MP4 to MP3 conversion tasks, this online tool is the right
              choice.
            </p>
          </div>
        </div>
      </section>

      {/* All tools grid — links to every conversion page on the site */}
      <AllToolsGrid
        exclude={["/"]}
        title="All tools & converters"
        subtitle="Every conversion you might need — one tool, every format. Pick the page that matches your file type."
      />

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <Faq items={faqItems} />
      </section>

      {/* Final CTA */}
      <section className="border-t border-border/60 bg-gradient-to-b from-background to-accent/30 py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to convert MP4 to MP3?
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Upload a video you own, get a clean MP3 in seconds. Free, private,
            and no sign-up required.
          </p>
          <a
            href="#extractor"
            className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90"
          >
            <FileAudio className="h-4 w-4" /> Convert MP4 to MP3 now
          </a>
        </div>
      </section>
    </>
  );
}
