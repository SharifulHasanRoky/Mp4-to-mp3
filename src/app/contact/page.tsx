import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the MP4 to MP3 team. We respond to general inquiries within 1–2 business days and to DMCA / copyright takedown requests within 24 hours.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return (
    <PageShell
      title="Contact us"
      subtitle="Questions, feedback, or a copyright concern? Here is how to reach us."
    >
      <section>
        <h2 className="text-2xl font-bold tracking-tight">General inquiries</h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          For feature requests, bug reports, partnership inquiries, or general
          feedback, email us at{" "}
          <a
            href="mailto:hello@mp4-to-mp3.app"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            hello@mp4-to-mp3.app
          </a>
          . We typically respond within 1–2 business days.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">
          Copyright / DMCA takedown
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          If you believe that a user is using this tool to process your
          copyrighted content without permission, please see our{" "}
          <a
            href="/copyright"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Copyright / DMCA page
          </a>{" "}
          for instructions on filing a takedown notice. We respond to all
          valid DMCA requests within 24 hours.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Privacy questions</h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          For questions about how we handle your data — including uploaded
          files, cookies, and analytics — please review our{" "}
          <a
            href="/privacy"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Privacy Policy
          </a>{" "}
          first. Most questions are answered there. If you still have
          concerns, email{" "}
          <a
            href="mailto:privacy@mp4-to-mp3.app"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            privacy@mp4-to-mp3.app
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Press &amp; media</h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Members of the press can reach us at{" "}
          <a
            href="mailto:press@mp4-to-mp3.app"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            press@mp4-to-mp3.app
          </a>
          . Please include your outlet and deadline in the subject line.
        </p>
      </section>

      <section className="rounded-2xl border border-border/70 bg-secondary/30 p-6">
        <h3 className="text-lg font-semibold">Please note</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          MP4 to MP3 is an independent utility. We are not affiliated
          with Instagram, TikTok, YouTube, Facebook, or any other platform.
          We cannot help you download content from those platforms —
          requests of that nature will not receive a response.
        </p>
      </section>
    </PageShell>
  );
}
