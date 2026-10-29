import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms and conditions for using MP4 to MP3. By using the service, you agree to these terms, including the prohibition on processing copyrighted content.",
  alternates: { canonical: "/terms" },
};

export default function Page() {
  return (
    <PageShell
      title="Terms of Service"
      subtitle="Last updated: October 29, 2026"
    >
      <section>
        <p className="text-base leading-relaxed text-muted-foreground">
          Welcome to MP4 to MP3. By accessing or using our website and
          audio extraction tool, you agree to be bound by these Terms of
          Service. If you do not agree with any part of these terms, please
          do not use the service.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">
          1. Permitted use
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          MP4 to MP3 is a personal audio-extraction utility. You may
          use the service to extract audio from video files that:
        </p>
        <ul className="mt-3 space-y-2 text-base leading-relaxed text-muted-foreground">
          <li>You created yourself;</li>
          <li>
            You have explicit written permission from the copyright holder
            to process; or
          </li>
          <li>
            Are in the public domain or licensed under a permissive license
            (such as Creative Commons).
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">
          2. Prohibited use
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          You may <strong>not</strong> use MP4 to MP3 to:
        </p>
        <ul className="mt-3 space-y-2 text-base leading-relaxed text-muted-foreground">
          <li>
            Download, scrape, or extract audio from content hosted on
            Instagram, TikTok, YouTube, Facebook, Twitter/X, Snapchat, or
            any other third-party platform;
          </li>
          <li>
            Extract audio from copyrighted music, movies, TV shows, podcasts,
            audiobooks, or any other copyrighted work without permission;
          </li>
          <li>
            Distribute, sell, or redistribute the extracted audio in any way
            that infringes on the rights of the original copyright holder;
          </li>
          <li>
            Use the service for any illegal, fraudulent, or abusive purpose;
          </li>
          <li>
            Attempt to disrupt, overload, reverse-engineer, or gain
            unauthorized access to our servers, APIs, or infrastructure;
          </li>
          <li>
            Use automated scripts, bots, or scrapers to upload files at scale
            without our prior written permission.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">
          3. Your responsibility
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          You are solely responsible for the content you upload and the
          audio you extract. You affirm that you have the legal right to
          process every file you upload. MP4 to MP3 is not responsible
          for verifying ownership of uploaded files and cannot be held
          liable for misuse of the tool by users.
        </p>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          By using the service, you agree to indemnify and hold harmless
          MP4 to MP3, its operators, and its hosting providers from any
          claim, demand, or damage arising from your use of the service or
          your violation of these Terms.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">
          4. No warranty
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          The service is provided &quot;as is&quot; and &quot;as
          available&quot; without any warranty of any kind, express or
          implied. We do not guarantee that the service will be
          uninterrupted, error-free, virus-free, or that extracted audio
          will meet your specific requirements. You use the service at your
          own risk.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">
          5. Limitation of liability
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          To the maximum extent permitted by law, MP4 to MP3 shall not
          be liable for any indirect, incidental, special, consequential, or
          punitive damages arising from your use of, or inability to use,
          the service. Our total liability for any claim arising from these
          terms or your use of the service shall not exceed the amount you
          have paid us (which is $0, as the service is free).
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">
          6. File size and usage limits
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          The maximum upload size is 100 MB per file. We reserve the right to
          impose additional rate limits, daily limits, or temporary
          restrictions to maintain service quality for all users. Abuse of
          the service through excessive automated requests may result in IP
          blocking without notice.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">
          7. Copyright &amp; DMCA
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          We respect the intellectual property rights of others. If you
          believe that a user is using this tool to process your copyrighted
          content without permission, please see our{" "}
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
        <h2 className="text-2xl font-bold tracking-tight">
          8. Changes to these terms
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          We may update these Terms of Service at any time. Changes will be
          posted on this page with an updated &quot;Last updated&quot;
          date. Your continued use of the service after changes are posted
          constitutes your acceptance of the new terms.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">9. Contact</h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          For any questions about these Terms, email{" "}
          <a
            href="mailto:hello@mp4-to-mp3.app"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            hello@mp4-to-mp3.app
          </a>
          .
        </p>
      </section>
    </PageShell>
  );
}
