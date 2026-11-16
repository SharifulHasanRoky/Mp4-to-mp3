import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { QuickAnswer } from "@/components/quick-answer";
import { Citations, type Citation } from "@/components/citations";
import {
  FileAudio,
  ShieldCheck,
  Lock,
  Eye,
  Cpu,
  Network,
  Trash2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "How MP4toMP3.online Protects Your Privacy (Browser-Based)",
  description:
    "MP4toMP3.online runs FFmpeg in your browser via WebAssembly. Your file is never uploaded, stored, or logged. Here is exactly how it works.",
  alternates: { canonical: "/mp4-to-mp3-private" },
  openGraph: {
    title: "How MP4toMP3.online Protects Your Privacy (Browser-Based)",
    description:
      "Browser-based conversion means no upload, no server storage, no logs of your file contents. The technical explanation.",
    url: "https://www.mp4tomp3.online/mp4-to-mp3-private",
    type: "article",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "How MP4toMP3.online Protects Your Privacy (Browser-Based)",
    description:
      "A technical explanation of how browser-based MP4 to MP3 conversion via WebAssembly FFmpeg protects user privacy by keeping all file processing on the client device.",
    author: { "@type": "Organization", name: "MP4toMP3.online" },
    publisher: { "@type": "Organization", name: "MP4toMP3.online" },
    mainEntityOfPage: "https://www.mp4tomp3.online/mp4-to-mp3-private",
    datePublished: "2026-11-16",
    dateModified: "2026-11-16",
    citation: [
      "https://en.wikipedia.org/wiki/FFmpeg",
      "https://github.com/ffmpegwasm/ffmpeg.wasm",
      "https://en.wikipedia.org/wiki/WebAssembly",
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell
        title="How MP4toMP3.online Protects Your Privacy"
        subtitle="Browser-based conversion means your file is read, processed, and written back on your own device. No upload, no server storage, no logs."
      >
        {/* Voice-search quick answer — read aloud by Google Assistant
            when users ask "Is MP4 to MP3 conversion private?" */}
        <QuickAnswer>
          Yes. When you convert MP4 to MP3 with MP4toMP3.online, the file
          is processed entirely in your browser using WebAssembly FFmpeg.
          No part of your video or extracted audio is uploaded to a server,
          stored, or logged. The conversion runs locally on your device,
          so the privacy model is identical to a desktop application.
        </QuickAnswer>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            The privacy problem with most converters
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The standard architecture of an online converter is simple and
            bad for privacy: you upload a file to a web server, the server
            runs FFmpeg on it, the server sends the converted file back,
            and the server may or may not delete the original afterward.
            &quot;May or may not&quot; is doing a lot of work in that
            sentence. Even reputable services that promise automatic
            deletion have been caught keeping files in predictable URLs
            that later got indexed by search engines, and even a few
            minutes of server-side storage is enough for a breach, a
            misconfigured bucket, or a curious employee to expose
            sensitive content.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The deeper problem is structural: a server-side converter has
            to receive the file in order to process it, which means it
            always has the technical capability to retain, inspect, or share
            that file. Promises about deletion are policy, not architecture.
            The only way to remove that capability is to not have a server
            receive the file in the first place.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            How the browser-based architecture is different
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            MP4toMP3.online loads the page itself — HTML, CSS, JavaScript —
            from a web server, but the actual conversion work runs inside
            your browser using WebAssembly. WebAssembly, often abbreviated
            WASM, is a low-level binary instruction format that modern
            browsers can execute at near-native speed. The FFmpeg multimedia
            framework has been compiled to WebAssembly, so the same
            encoder that runs on a Linux server can run inside a sandboxed
            browser tab on your laptop or phone.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            When you drop a file onto the converter, the browser reads the
            file from your disk into an in-memory ArrayBuffer, hands that
            buffer to the WebAssembly FFmpeg module, and receives the
            encoded MP3 bytes back as another in-memory buffer. The
            browser then triggers a download of the MP3 to your device. At
            no point in this pipeline does the file leave your device over
            the network.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            What actually crosses the network
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Network className="h-5 w-5" />
                <h3 className="text-base font-semibold">
                  The page itself
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                HTML, CSS, JavaScript, and image assets load over HTTPS when
                you first open the page. This is the same traffic any
                website generates. No file contents are involved.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Cpu className="h-5 w-5" />
                <h3 className="text-base font-semibold">
                  The WASM engine
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                The WebAssembly FFmpeg binary — roughly 30 MB — is fetched
                once from a CDN and cached by the browser. Subsequent
                conversions start instantly without re-downloading.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Eye className="h-5 w-5" />
                <h3 className="text-base font-semibold">
                  Aggregated analytics
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Privacy-respecting analytics may record that the page was
                visited, with an anonymized IP. No file metadata, no file
                contents, no user identifiers are sent.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Trash2 className="h-5 w-5" />
                <h3 className="text-base font-semibold">
                  Nothing else
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                No upload of your MP4. No upload of your converted MP3. No
                metadata about your file. No transcripts of audio content.
                No logs of what you converted.
              </p>
            </div>
          </div>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            You do not have to take our word for it. Open your
            browser&apos;s developer tools (the Network tab in Chrome,
            Firefox, or Safari), perform a conversion, and watch the
            requests that fire. You will see the page load, the WASM
            fetch, the analytics beacon, and nothing else. There is no
            upload request, because there is no upload.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            The browser sandbox
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Modern browsers enforce a same-origin policy and a permissions
            model that constrains what any web page can do. A page loaded
            from mp4tomp3.online cannot read files from arbitrary paths
            on your disk — it can only read files you explicitly hand it
            through a file input or drag-and-drop. It cannot write to
            arbitrary paths either; downloads go through the
            browser&apos;s normal download mechanism, which lands files in
            your Downloads folder unless you choose otherwise.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The WebAssembly module itself runs inside the same sandbox as
            the rest of the page&apos;s JavaScript. It has no direct access
            to your filesystem, your network, or your other tabs. It can
            only see the memory buffers the page explicitly hands it, and
            it can only return data to the page that called it. The
            conversion is a pure function: bytes in, bytes out.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            What happens when you close the tab
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The file you uploaded and the MP3 you received both live in
            browser memory during the conversion. The browser garbage
            collects that memory when the tab is closed or navigated away.
            There is no on-disk cache of your input or output on the
            server, because nothing was ever written there. Even if a
            court ordered us to produce your files, we could not — we never
            had them.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The browser may keep the converted MP3 in your Downloads
            folder if you saved it, and it will keep the WASM engine in
            its cache for next time. Both are under your control: you can
            delete the MP3 from your Downloads at any time, and you can
            clear your browser cache to evict the WASM module.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Edge cases worth being explicit about
          </h2>
          <div className="mt-4 space-y-3">
            <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary/30 p-4">
              <Lock className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <span className="text-sm leading-relaxed text-muted-foreground">
                <strong>If you are offline.</strong> Once the page and the
                WASM engine are cached, conversion works without an active
                network connection. The conversion itself never needed the
                network to begin with.
              </span>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary/30 p-4">
              <Lock className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <span className="text-sm leading-relaxed text-muted-foreground">
                <strong>If you are on a corporate VPN.</strong> The VPN can
                see that you visited the page, but it cannot see the
                contents of the file you converted, because those contents
                never travel over the network. The VPN is in the same
                position as our own server: it sees the wrapper, not the
                payload.
              </span>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary/30 p-4">
              <Lock className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <span className="text-sm leading-relaxed text-muted-foreground">
                <strong>If you use a browser extension.</strong> A
                malicious extension that has been granted access to page
                contents could in principle read the in-memory buffers
                during conversion. This is a general risk of any web
                activity, not specific to this tool, but it is worth
                knowing about.
              </span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            How this compares to alternatives
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            A desktop application like Audacity or FFmpeg itself also runs
            locally and never uploads your files. The privacy model is
            equivalent to MP4toMP3.online, but you have to install and
            update the software. A server-based online converter has a
            worse privacy model — the file must traverse the network — but
            requires no install. The browser-based approach is the rare
            case that gets both: no install and no upload.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            If you want a deeper comparison of conversion approaches, our{" "}
            <Link
              href="/best-mp4-to-mp3-converter"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              best MP4 to MP3 converter overview
            </Link>{" "}
            walks through the tradeoffs. For the explicit technical claim
            about no uploads, the dedicated{" "}
            <Link
              href="/mp4-to-mp3-no-upload"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              no-upload explanation
            </Link>{" "}
            goes deeper into what that means in practice.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            The formal privacy policy
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The technical guarantees above describe the conversion flow
            itself. For the broader picture — cookies, analytics,
            advertising, GDPR and CCPA rights, and how to contact us about
            data — see our full{" "}
            <Link
              href="/privacy"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              privacy policy
            </Link>
            . If you are specifically concerned about GDPR compliance,
            the dedicated{" "}
            <Link
              href="/mp4-to-mp3-gdpr"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              GDPR and MP4 to MP3 page
            </Link>{" "}
            maps the regulation&apos;s requirements onto how the tool
            actually behaves.
          </p>
        </section>

        <Citations
          sources={[
            { title: "FFmpeg \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/FFmpeg", publisher: "Wikipedia", note: "The open-source engine used for private, local media processing." },
            { title: "ffmpeg.wasm \u2014 GitHub", url: "https://github.com/ffmpegwasm/ffmpeg.wasm", publisher: "GitHub", note: "The WebAssembly port that lets FFmpeg run privately in the browser." },
            { title: "WebAssembly \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/WebAssembly", publisher: "Wikipedia", note: "The sandboxed execution model that keeps conversion off the server." },
          ]}
        />

        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
          <h2 className="text-xl font-bold">
            Convert privately, right in your browser
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            <ShieldCheck className="mr-1 inline h-4 w-4" />
            No upload. No server storage. No sign-up. Your file never
            leaves your device.
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
