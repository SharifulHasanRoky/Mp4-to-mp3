import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { QuickAnswer } from "@/components/quick-answer";
import { Citations, type Citation } from "@/components/citations";
import {
  FileAudio,
  Check,
  Link2,
  ShieldCheck,
  AlertTriangle,
  Globe,
  Cloud,
  Lock,
  XCircle,
} from "lucide-react";

const sources: Citation[] = [
  {
    title: "MP3 — Wikipedia",
    url: "https://en.wikipedia.org/wiki/MP3",
    publisher: "Wikipedia",
    note: "Documents the MP3 output format produced from the URL-fetched source file.",
  },
  {
    title: "MPEG-4 — Wikipedia",
    url: "https://en.wikipedia.org/wiki/MPEG-4",
    publisher: "Wikipedia",
    note: "Defines the MP4 container the converter expects at the URL endpoint.",
  },
  {
    title: "FFmpeg — Wikipedia",
    url: "https://en.wikipedia.org/wiki/FFmpeg",
    publisher: "Wikipedia",
    note: "Background on FFmpeg, the framework that performs the in-browser demux and re-encode once the URL-fetched file arrives.",
  },
  {
    title: "WebAssembly — Wikipedia",
    url: "https://en.wikipedia.org/wiki/WebAssembly",
    publisher: "Wikipedia",
    note: "Describes WebAssembly, which lets the in-browser pipeline run a full FFmpeg build on the fetched file without install.",
  },
  {
    title: "Copyright — U.S. Copyright Office",
    url: "https://www.copyright.gov/",
    publisher: "U.S. Copyright Office",
    note: "Underpins the guidance that only files you own or have permission to use should be converted from a URL.",
  },
];

export const metadata: Metadata = {
  title: "Convert MP4 to MP3 From a URL — Direct Link Support",
  description:
    "Convert an MP4 from a direct URL to MP3 in your browser. MP4toMP3.online fetches direct file URLs and cloud share links locally. Streaming platforms blocked.",
  alternates: { canonical: "/mp4-to-mp3-from-url" },
  openGraph: {
    title: "Convert MP4 to MP3 From a URL — Direct Link Support",
    description:
      "Paste a direct file URL or cloud share link, get an MP3. Fetched into your browser and encoded locally — no server upload, no sign-up. Streaming platforms not supported.",
    url: "https://www.mp4tomp3.online/mp4-to-mp3-from-url",
    type: "article",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Convert MP4 to MP3 From a URL — Direct Link Support",
    description:
      "An honest guide to converting an MP4 from a URL to MP3 in a browser, including which URLs work (direct file links and cloud share URLs) and which (streaming and social platforms) are intentionally rejected.",
    author: { "@type": "Organization", name: "MP4toMP3.online" },
    publisher: { "@type": "Organization", name: "MP4toMP3.online" },
    mainEntityOfPage: "https://www.mp4tomp3.online/mp4-to-mp3-from-url",
    datePublished: "2026-11-16",
    dateModified: "2026-11-16",
    citation: [
      "https://en.wikipedia.org/wiki/MP3",
      "https://en.wikipedia.org/wiki/MPEG-4",
      "https://en.wikipedia.org/wiki/FFmpeg",
      "https://en.wikipedia.org/wiki/WebAssembly",
      "https://www.copyright.gov/",
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell
        title="Convert MP4 to MP3 From a URL"
        subtitle="Paste a direct file URL or cloud share link, get an MP3. Fetched into your browser and encoded locally — no server upload, no sign-up."
      >
        {/* Voice-search quick answer — read aloud when users ask
            "Can I convert an MP4 from a URL to MP3?" */}
        <QuickAnswer>
          Yes, for direct file URLs and cloud share links. MP4toMP3.online
          fetches the URL into your browser, encodes the MP4 to MP3
          locally with FFmpeg, and offers the MP3 as a download. It does
          not fetch from streaming or social platforms (YouTube, TikTok,
          Spotify) — those are intentionally rejected for copyright and
          ToS reasons.
        </QuickAnswer>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Which URLs actually work
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The URL input accepts two broad categories. The first is a
            direct file URL — a link that returns the MP4 bytes when
            fetched, with no login wall, no preview page, no
            interstitial. Typical sources include archive.org, raw files
            on GitHub (<code className="text-sm">raw.githubusercontent.com</code>),
            AWS S3 buckets with CORS enabled, your own web server, and
            any direct media host that sends permissive CORS headers.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The second is a cloud share URL from one of 13 supported
            providers: Google Drive, Dropbox, OneDrive, MediaFire, Box,
            pCloud, WeTransfer, Mega, TeraBox, Send.cm, GoFile,
            AnonFiles, and Catbox. Each of those returns a preview page
            by default; the converter rewrites the share URL into a
            direct-download URL before fetching. For Drive and Dropbox
            specifically, the{" "}
            <Link
              href="/mp4-to-mp3-from-google-drive"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Google Drive
            </Link>{" "}
            and{" "}
            <Link
              href="/mp4-to-mp3-from-dropbox"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Dropbox
            </Link>{" "}
            guides walk through the share-link setup in detail.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Which URLs are intentionally rejected
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Streaming and social platforms are blocked by design. YouTube,
            TikTok, Instagram, Facebook, Twitter/X, Spotify, Netflix,
            SoundCloud, Vimeo, Twitch, and Dailymotion all serve video as
            encrypted or fragmented streams that are not direct file
            downloads, and extracting audio from them is illegal in most
            jurisdictions and against each platform&apos;s Terms of
            Service. The converter checks pasted URLs against a blocklist
            of these hosts and refuses them with a clear message rather
            than pretending to work.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            This is not a technical limitation the converter could work
            around. Even setting aside the legal exposure, a tool that
            downloaded audio from YouTube would be DMCA&apos;d into
            oblivion and AdSense-banned within weeks of launch, taking
            the rest of the service down with it. The honest policy is
            to refuse those URLs up front and tell you why.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            How the fetch happens, and the CORS catch
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            When you paste a URL, the converter tries to fetch the file
            directly first. This works for hosts that send the{" "}
            <code className="text-sm">Access-Control-Allow-Origin</code>
            {" "}header — archive.org, GitHub raw, S3 buckets with CORS
            configured, most cloud providers after URL normalization. If
            the direct fetch is blocked by the browser&apos;s CORS rules
            (the same-origin policy that prevents one website from
            reading another website&apos;s responses), the converter
            falls back through a chain of CORS proxies: its own
            server-side proxy first, then <code className="text-sm">
            allorigins.win</code>, then <code className="text-sm">
            corsproxy.io</code>. If every fallback fails, you get a
            clear error message.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The CORS catch is worth understanding because it explains
            why some perfectly legitimate direct URLs fail. A
            self-hosted MP4 on a personal web server that does not send
            CORS headers cannot be fetched by the browser directly; the
            proxy fallback will handle it, but with extra latency. If you
            control the server, adding the{" "}
            <code className="text-sm">
            Access-Control-Allow-Origin: *
            </code>{" "}
            header to the response makes direct fetch work and removes
            the proxy hop.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Privacy: where the file goes during a URL fetch
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Globe className="h-5 w-5" />
                <h3 className="text-base font-semibold">Fetched into browser memory</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                The MP4 is downloaded from the source URL directly into
                your browser&apos;s memory and handed to FFmpeg. It is
                not re-uploaded to a separate conversion server, because
                the conversion runs entirely in the page.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <ShieldCheck className="h-5 w-5" />
                <h3 className="text-base font-semibold">URL not logged</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                The converter records only the size bucket of a
                successful fetch — never the URL itself, the file&apos;s
                path, or its contents. Close the tab and the in-memory
                file is gone.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Cloud className="h-5 w-5" />
                <h3 className="text-base font-semibold">Proxy fallback is one-way</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                When a CORS proxy is used, the file transits the proxy
                on its way to your browser. The proxy sees the source
                URL and the bytes. If that matters for your threat model,
                download the file and upload it directly instead.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Lock className="h-5 w-5" />
                <h3 className="text-base font-semibold">HTTPS enforced</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Mixed-content rules block the browser from fetching an
                <code className="text-sm"> http://</code> URL from an
                <code className="text-sm"> https://</code> page. Use
                HTTPS source URLs; most modern hosts support them.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            The full workflow, step by step
          </h2>
          <ol className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                1
              </span>
              <span>
                Copy a direct file URL or cloud share URL. Verify the
                file is publicly accessible (no login wall, share set to
                &quot;Anyone with the link&quot; for cloud providers).
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                2
              </span>
              <span>
                Open the converter, switch the input mode to{" "}
                <strong>URL</strong>, and paste the link into the URL
                field.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                3
              </span>
              <span>
                Click <strong>Convert to MP3</strong>. The converter
                normalizes the URL if it is a known cloud share link,
                then fetches the file with CORS-proxy fallbacks as
                needed.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                4
              </span>
              <span>
                FFmpeg encodes the fetched MP4 to MP3 locally and offers
                the MP3 as a download. The fetched bytes are dropped from
                browser memory once encoding completes.
              </span>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            When to fetch from URL vs. upload directly
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The URL path is genuinely useful in two situations. First,
            when the file lives in cloud storage and you do not want to
            download it to disk first — pasting a Drive or Dropbox share
            link skips a manual download step. Second, when the file is
            already publicly hosted somewhere (archive.org, a GitHub
            release, a research dataset) and you want the MP3 without
            leaving the browser tab you are working in.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The URL path is the wrong choice when the file is already on
            your disk. Uploading directly is faster than fetching through
            a proxy, avoids any CORS friction, and keeps the file on your
            device the whole time. For most one-off conversions, the
            upload path is the simpler default; the URL path is for the
            specific case where the file lives elsewhere and you want to
            skip the intermediate download.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Common failure modes and their fixes
          </h2>
          <ul className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-3">
              <AlertTriangle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>&quot;This is a streaming/social platform.&quot;</strong>{" "}
                The URL points to YouTube, TikTok, Instagram, or another
                blocked host. There is no workaround — these are
                intentionally rejected. Convert files you own instead.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>&quot;This is a preview URL, not a share
                link.&quot;</strong> The cloud URL points to a
                login-walled preview page. Use the provider&apos;s Share
                button (not the address bar) to copy a public share
                link.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>&quot;Could not fetch the URL.&quot;</strong>{" "}
                Every CORS-proxy fallback failed. The host blocks
                cross-origin requests and none of the proxies could
                reach it. Download the file and upload directly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>&quot;File too large.&quot;</strong> The fetched
                file exceeds the browser&apos;s practical memory limit
                (around 2 GB on a 64-bit browser, less on a phone).
                Split the source or use a desktop tool for very large
                files.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            What URL conversion does not mean
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            &quot;Convert from a URL&quot; is sometimes used as a
            euphemism for &quot;download audio from a streaming
            site.&quot; That is not what this tool does, and the
            distinction matters. A direct file URL points at a file the
            source has explicitly made available for download — your
            own recording, a collaborator&apos;s export, an
            archive.org item, a public-domain film. A streaming URL
            points at content the platform has licensed for on-platform
            consumption only, and circumventing that is copyright
            infringement in most jurisdictions regardless of how the
            extraction is framed. The converter supports the first case
            and refuses the second.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            For more on the broader browser-based conversion model that
            this URL path plugs into, the{" "}
            <Link
              href="/mp4-to-mp3-online"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              MP4 to MP3 online
            </Link>{" "}
            guide covers the local encoding pipeline, the privacy model,
            and the device support matrix.
          </p>
        </section>

        <Citations sources={sources} />

        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
          <h2 className="text-xl font-bold">Convert MP4 from a URL now</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Paste a direct file URL or cloud share link. The file is
            fetched into your browser and converted locally — no
            re-upload, no sign-up.
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
