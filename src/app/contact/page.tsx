import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { Mail, FileText, Shield, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the MP4toMP3.online team. Find the right channel for general inquiries, copyright / DMCA takedown requests, and privacy questions.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Us — MP4toMP3.online",
    description:
      "Get in touch with the MP4toMP3.online team. Find the right channel for general inquiries, copyright / DMCA takedown requests, and privacy questions.",
    url: "https://www.mp4tomp3.online/contact",
    type: "website",
  },
};

export default function Page() {
  return (
    <PageShell
      title="Contact us"
      subtitle="Questions, feedback, or a copyright concern? Choose the right channel below."
    >
      {/* Quick channel cards */}
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/copyright"
          className="group rounded-2xl border border-border/70 bg-card p-6 transition-all hover:border-primary/40 hover:shadow-md"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">Copyright / DMCA</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            File a copyright takedown notice. We respond to all valid DMCA
            requests within 24 hours.
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
            File a notice →
          </span>
        </Link>

        <Link
          href="/privacy"
          className="group rounded-2xl border border-border/70 bg-card p-6 transition-all hover:border-primary/40 hover:shadow-md"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Shield className="h-5 w-5" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">Privacy questions</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Most data and privacy questions are answered in our Privacy
            Policy. Start there for the fastest answer.
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
            Read privacy policy →
          </span>
        </Link>

        <Link
          href="/faq"
          className="group rounded-2xl border border-border/70 bg-card p-6 transition-all hover:border-primary/40 hover:shadow-md"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FileText className="h-5 w-5" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">General questions</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Most common questions about MP4 to MP3 conversion, supported
            formats, and file limits are already answered in our FAQ.
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
            Browse FAQ →
          </span>
        </Link>
      </section>

      {/* Info section */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold tracking-tight">
          About MP4toMP3.online
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          MP4toMP3.online is an independent, browser-based audio-extraction
          utility. We do not maintain a public email inbox — most questions
          are answered in our FAQ and policy pages above. For anything not
          covered there, please use the channels listed above.
        </p>
      </section>

      {/* Important note */}
      <section className="mt-8 rounded-2xl border border-border/70 bg-secondary/30 p-6">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          <Mail className="h-5 w-5 text-primary" />
          Please note
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          MP4toMP3.online is an independent utility. We are not affiliated
          with Instagram, TikTok, YouTube, Facebook, or any other platform.
          We cannot help you download content from those platforms —
          requests of that nature will not receive a response and would
          violate copyright law.
        </p>
      </section>
    </PageShell>
  );
}
