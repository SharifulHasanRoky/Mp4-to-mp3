import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How ReelAudio Studio handles your data: uploaded files, cookies, analytics, advertising, and your rights under GDPR and CCPA.",
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return (
    <PageShell
      title="Privacy Policy"
      subtitle="Last updated: October 29, 2026"
    >
      <section>
        <p className="text-base leading-relaxed text-muted-foreground">
          This Privacy Policy explains how ReelAudio Studio (&quot;we&quot;,
          &quot;us&quot;, or &quot;our&quot;) collects, uses, and protects
          information when you use our website and audio extraction tool. By
          using the service, you consent to the practices described below.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">
          1. Uploaded files
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          When you upload a video file for audio extraction, the file is
          transmitted over HTTPS to our server, written to a temporary
          directory, processed immediately by FFmpeg, and deleted right after
          the resulting MP3 is returned to your browser. We do not store,
          retain, log, share, or distribute your uploaded media. We do not
          analyze the content of your files. The temporary file exists on our
          server for only the few seconds required for processing.
        </p>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          We use ffprobe to inspect the technical metadata of your file
          (container format, audio stream presence, duration) strictly for the
          purpose of running the extraction. This metadata is not retained
          after processing completes.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">
          2. Information we collect automatically
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Like most websites, we collect basic technical information
          automatically when you visit:
        </p>
        <ul className="mt-3 space-y-2 text-base leading-relaxed text-muted-foreground">
          <li>
            <strong>Server logs:</strong> IP address (anonymized after 7
            days), user agent, referring URL, timestamp, and request path.
            Used for security, abuse prevention, and debugging.
          </li>
          <li>
            <strong>Cookies &amp; local storage:</strong> Used for basic
            session management and (if you consent) analytics and
            advertising personalization.
          </li>
          <li>
            <strong>Analytics:</strong> Aggregated, privacy-respecting
            analytics (e.g. Google Analytics 4 with anonymized IP) to
            understand traffic patterns, popular pages, and device breakdowns.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">
          3. Advertising
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          We may display advertising through Google AdSense or similar
          networks to keep the service free. Third-party vendors, including
          Google, use cookies to serve ads based on your prior visits to
          this and other websites. Google&apos;s use of advertising cookies
          enables it and its partners to serve ads to you based on your
          visit to our site and/or other sites on the internet.
        </p>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          You may opt out of personalized advertising by visiting{" "}
          <a
            href="https://www.google.com/settings/ads"
            className="font-medium text-primary underline-offset-4 hover:underline"
            rel="nofollow noopener"
            target="_blank"
          >
            Google Ads Settings
          </a>
          . You can also opt out of third-party tracking cookies via{" "}
          <a
            href="https://www.aboutads.info/choices/"
            className="font-medium text-primary underline-offset-4 hover:underline"
            rel="nofollow noopener"
            target="_blank"
          >
            aboutads.info/choices
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">
          4. Cookies
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          We use the following categories of cookies:
        </p>
        <ul className="mt-3 space-y-2 text-base leading-relaxed text-muted-foreground">
          <li>
            <strong>Essential cookies:</strong> Required for the site to
            function. Cannot be disabled.
          </li>
          <li>
            <strong>Analytics cookies:</strong> Help us understand how
            visitors use the site. Opt out via your browser settings.
          </li>
          <li>
            <strong>Advertising cookies:</strong> Used by ad partners to
            serve relevant ads. Opt out via the links above.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">
          5. Your rights (GDPR &amp; CCPA)
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          If you are located in the European Economic Area, United Kingdom,
          or California, you have certain rights regarding your personal
          data, including the right to access, correct, delete, or restrict
          processing of your data. Because we do not retain uploaded files
          or personally identifiable information beyond anonymized server
          logs (deleted after 7 days), most of these rights are already
          satisfied by our default data handling.
        </p>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          To exercise any data right, contact{" "}
          <a
            href="mailto:privacy@reelaudiosudio.example.com"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            privacy@reelaudiosudio.example.com
          </a>
          . We respond to all valid requests within 30 days.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">
          6. Children&apos;s privacy
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          ReelAudio Studio is not directed at children under 13 (or the
          minimum age in your jurisdiction). We do not knowingly collect
          personal information from children. If you believe a child has
          provided us with personal data, please contact us and we will
          delete it immediately.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">
          7. Changes to this policy
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          We may update this Privacy Policy from time to time. Changes will
          be posted on this page with an updated &quot;Last updated&quot;
          date. Material changes will be highlighted at the top of the page
          for at least 30 days.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">8. Contact</h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          For any privacy questions, email{" "}
          <a
            href="mailto:privacy@reelaudiosudio.example.com"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            privacy@reelaudiosudio.example.com
          </a>
          .
        </p>
      </section>
    </PageShell>
  );
}
