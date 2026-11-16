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
  Gavel,
  Database,
  Mail,
} from "lucide-react";

export const metadata: Metadata = {
  title: "GDPR and MP4 to MP3: Your Data Protection Rights",
  description:
    "How MP4toMP3.online handles GDPR obligations: no file uploads, no personal data stored, anonymized analytics, and your rights to access, delete, and object.",
  alternates: { canonical: "/mp4-to-mp3-gdpr" },
  openGraph: {
    title: "GDPR and MP4 to MP3: Your Data Protection Rights",
    description:
      "A walkthrough of how MP4toMP3.online meets GDPR requirements through browser-based processing, no uploads, and minimal data handling.",
    url: "https://www.mp4tomp3.online/mp4-to-mp3-gdpr",
    type: "article",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "GDPR and MP4 to MP3: Your Data Protection Rights",
    description:
      "An explanation of how MP4toMP3.online complies with the EU General Data Protection Regulation through browser-based processing and minimal data collection.",
    author: { "@type": "Organization", name: "MP4toMP3.online" },
    publisher: { "@type": "Organization", name: "MP4toMP3.online" },
    mainEntityOfPage: "https://www.mp4tomp3.online/mp4-to-mp3-gdpr",
    datePublished: "2026-11-16",
    dateModified: "2026-11-16",
    citation: [
      "https://eur-lex.europa.eu/eli/reg/2016/679/oj",
      "https://gdpr.eu/",
      "https://en.wikipedia.org/wiki/WebAssembly",
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell
        title="GDPR and MP4 to MP3: Your Data Protection Rights"
        subtitle="The General Data Protection Regulation gives EU residents strong rights over their personal data. Here is how the regulation maps onto a browser-based converter."
      >
        {/* Voice-search quick answer — read aloud by Google Assistant
            when users ask "Is MP4toMP3.online GDPR compliant?" */}
        <QuickAnswer>
          Yes. MP4toMP3.online is structured to comply with GDPR because
          it never uploads, stores, or processes your files on a server.
          Conversion runs in your browser via WebAssembly FFmpeg, so your
          media never constitutes personal data in our hands. We collect
          only anonymized analytics and limited server logs, and you can
          exercise your GDPR rights through our contact page.
        </QuickAnswer>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            What GDPR actually regulates
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The General Data Protection Regulation (Regulation (EU)
            2016/679) regulates the processing of personal data — meaning
            any information relating to an identified or identifiable
            natural person — by controllers and processors established in
            the EU, or offering goods and services to people in the EU.
            The regulation grants data subjects rights including access,
            rectification, erasure, restriction, portability, and objection,
            and it requires a lawful basis for every processing activity.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The key insight for a file conversion tool is that GDPR only
            applies to <em>personal data</em>. A generic video file is not
            personal data by itself. A video file that contains a
            recognizable person, a voice memo that identifies a named
            individual, or a recording of a confidential meeting may be
            personal data — and may even be special-category data under
            Article 9 if it reveals health, political opinions, or other
            sensitive attributes. The cleaner the tool is about not
            handling the file at all, the simpler the GDPR analysis.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Why browser-based processing simplifies compliance
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Under GDPR, processing means any operation performed on
            personal data, whether or not by automated means. A
            server-side converter that receives, stores, and transcodes
            your file is unambiguously processing personal data when that
            file contains personal data. It must therefore identify a
            lawful basis, honor data subject rights, conduct a data
            protection impact assessment for high-risk processing, and so
            on. Each of those obligations is real work.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            MP4toMP3.online does not receive, store, or transcode your file
            on a server. The file is read from your device into browser
            memory, processed by WebAssembly FFmpeg running on your
            device, and written back to your device. The server that
            hosts the website never has the file. From a GDPR perspective,
            the controller of the processing that happens to your file is
            you, the data subject, not us. We are not processing your
            file&apos;s contents because we never receive them.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            This is a structural compliance advantage rather than a policy
            compliance advantage. A server-side converter can promise to
            delete your file after processing; we never have it to delete.
            A server-side converter can promise to encrypt it at rest; we
            never have it at rest. The architectural choice removes the
            data from our scope entirely.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            The data we do process
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Database className="h-5 w-5" />
                <h3 className="text-base font-semibold">Server logs</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Like most websites, we log basic request metadata: IP
                address (anonymized after 7 days), user agent, referring
                URL, timestamp, and request path. Used for security, abuse
                prevention, and debugging. The IP address is personal data
                while it is held, which is why we anonymize it promptly.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Database className="h-5 w-5" />
                <h3 className="text-base font-semibold">
                  Analytics cookies
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                We use privacy-respecting, aggregated analytics — typically
                Google Analytics 4 with IP anonymization — to understand
                traffic patterns. These cookies only fire with your
                consent, which our consent banner collects before any
                non-essential cookies are set.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Database className="h-5 w-5" />
                <h3 className="text-base font-semibold">
                  Contact form submissions
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                If you contact us, we process the name, email, and message
                you provide in order to respond. We retain these
                communications only as long as needed to resolve your
                inquiry.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Database className="h-5 w-5" />
                <h3 className="text-base font-semibold">
                  Advertising cookies
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                We may serve advertising to keep the service free. Ad
                partners set their own cookies, which are personal data,
                and we honor your consent choices for those cookies under
                both GDPR and the ePrivacy Directive.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Lawful basis for each processing activity
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            GDPR Article 6 requires a lawful basis for every processing
            activity. Our bases are:
          </p>
          <ul className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-3">
              <Gavel className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Server logs:</strong> legitimate interest in
                security and abuse prevention (Article 6(1)(f)), balanced
                against your rights and minimized through prompt IP
                anonymization.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gavel className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Analytics and advertising cookies:</strong> consent
                (Article 6(1)(a)), collected through our consent banner
                before any non-essential cookie is set.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gavel className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Contact form submissions:</strong> legitimate
                interest in responding to your inquiry, or necessity for
                the performance of a contract if your inquiry relates to
                our services.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Your GDPR rights, mapped
          </h2>
          <div className="mt-4 space-y-3">
            <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary/30 p-4">
              <Lock className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <span className="text-sm leading-relaxed text-muted-foreground">
                <strong>Right of access (Article 15).</strong> You can
                request a copy of the personal data we hold about you. For
                server logs and contact submissions, we can produce this.
                For your converted files, we hold nothing — the file is on
                your device, where you already have it.
              </span>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary/30 p-4">
              <Lock className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <span className="text-sm leading-relaxed text-muted-foreground">
                <strong>Right to erasure (Article 17).</strong> You can
                request deletion of personal data we hold. Anonymized
                server logs and contact submissions can be deleted on
                request. Files you converted cannot be deleted from our
                servers because they were never there.
              </span>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary/30 p-4">
              <Lock className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <span className="text-sm leading-relaxed text-muted-foreground">
                <strong>Right to object (Article 21).</strong> You can
                object to processing based on legitimate interests. We
                will stop the objected-to processing unless we can
                demonstrate compelling legitimate grounds.
              </span>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary/30 p-4">
              <Lock className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <span className="text-sm leading-relaxed text-muted-foreground">
                <strong>Right to data portability (Article 20).</strong>
                For data you provided to us in a structured, commonly used
                format — typically contact submissions — we can provide it
                in a portable format on request.
              </span>
            </div>
          </div>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            To exercise any of these rights, contact us through our{" "}
            <Link
              href="/contact"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              contact page
            </Link>{" "}
            and identify the right you wish to exercise. We respond to all
            valid requests within 30 days, as the regulation requires.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            International data transfers
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Our hosting and CDN providers may process data outside the EU.
            For any personal data that does cross borders — primarily
            anonymized log fragments and analytics beacons — we rely on
            the European Commission&apos;s adequacy decisions where
            applicable, or on Standard Contractual Clauses adopted under
            Article 46 of the GDPR. Because the volume of personal data
            we process is minimal, the transfer exposure is correspondingly
            small.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            For your converted files, there is no international transfer at
            all, because there is no transfer. The file stays on your
            device throughout the conversion. If you are a journalist,
            lawyer, or healthcare professional handling data that cannot
            leave your jurisdiction, this is the property that makes the
            tool usable for your work in the first place.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            What this does not cover
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            GDPR compliance is necessary but not sufficient. The
            regulation does not bless any particular use of copyrighted
            material, and it does not override national copyright law. If
            you convert a file you do not have the right to convert, the
            illegality is not cured by the fact that the conversion
            happened locally. The legal analysis lives on our{" "}
            <Link
              href="/is-mp4-to-mp3-conversion-legal"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              page on whether MP4 to MP3 conversion is legal
            </Link>{" "}
            and our{" "}
            <Link
              href="/copyright"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              copyright and DMCA policy
            </Link>
            .
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            For the full text of our data handling practices — including
            CCPA for California residents, children&apos;s privacy, and
            cookie categories — see our{" "}
            <Link
              href="/privacy"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              privacy policy
            </Link>
            . For the technical architecture that makes most of this
            compliance straightforward, the{" "}
            <Link
              href="/mp4-to-mp3-private"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              privacy overview
            </Link>{" "}
            and the{" "}
            <Link
              href="/mp4-to-mp3-no-upload"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              no-upload explanation
            </Link>{" "}
            go deeper.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Contacting our data protection contact
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            We do not currently maintain a formal Data Protection Officer
            because we are not engaged in the large-scale systematic
            monitoring that would trigger the Article 37 requirement.
            For any GDPR inquiry, including requests to exercise your
            rights, contact us through our{" "}
            <Link
              href="/contact"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              contact page
            </Link>{" "}
            using the &quot;Privacy / GDPR&quot; channel. You also have
            the right to lodge a complaint with your local supervisory
            authority — for example, the Irish Data Protection Commission
            or the relevant Landesdatenschutzbehörde in Germany — if you
            believe our handling of your data has been inadequate.
          </p>
        </section>

        <Citations
          sources={[
            { title: "General Data Protection Regulation (official text)", url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj", publisher: "EUR-Lex", note: "The official consolidated text of Regulation (EU) 2016/679 (GDPR)." },
            { title: "GDPR.eu", url: "https://gdpr.eu/", publisher: "gdpr.eu", note: "Plain-language overview of GDPR rights and obligations for controllers and processors." },
            { title: "WebAssembly \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/WebAssembly", publisher: "Wikipedia", note: "The sandboxed runtime that keeps personal data on the user's device." },
          ]}
        />

        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
          <h2 className="text-xl font-bold">
            Convert with GDPR peace of mind
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            <Mail className="mr-1 inline h-4 w-4" />
            Your file never leaves your device. No upload, no server
            storage, no personal data in our hands.
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
