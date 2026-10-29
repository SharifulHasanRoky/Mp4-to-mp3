import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Copyright / DMCA Policy",
  description:
    "How to file a DMCA takedown notice with MP4 to MP3. We respond to all valid copyright takedown requests within 24 hours.",
  alternates: { canonical: "/copyright" },
};

export default function Page() {
  return (
    <PageShell
      title="Copyright / DMCA Policy"
      subtitle="MP4 to MP3 respects intellectual property rights. Here is how to file a takedown request."
    >
      <section>
        <h2 className="text-2xl font-bold tracking-tight">
          Our copyright policy
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          MP4 to MP3 is a personal audio-extraction utility. We do not
          host, store, distribute, or scrape any copyrighted content. The
          service only processes files that users upload themselves. By
          design, we have no ability to identify, filter, or remove specific
          copyrighted works from user uploads — but we can and do take action
          against users who repeatedly violate our Terms of Service by using
          the tool to process copyrighted content without permission.
        </p>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          If you believe that a user is using this tool to extract audio from
          your copyrighted work without authorization, you may file a DMCA
          takedown notice as described below. We respond to all valid notices
          within 24 hours.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">
          Filing a DMCA takedown notice
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Under the Digital Millennium Copyright Act (17 U.S.C. §512), a
          copyright owner or their authorized agent may submit a takedown
          notice to a service provider to have allegedly infringing content
          removed. To file a valid notice with us, please send a written
          communication to{" "}
          <a
            href="mailto:dmca@mp4-to-mp3.app"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            dmca@mp4-to-mp3.app
          </a>{" "}
          that includes the following information:
        </p>
        <ol className="mt-3 list-decimal space-y-2 pl-6 text-base leading-relaxed text-muted-foreground">
          <li>
            A physical or electronic signature of the copyright owner or a
            person authorized to act on their behalf.
          </li>
          <li>
            Identification of the copyrighted work claimed to have been
            infringed (e.g. title, ISRC/ISWC code, URL of the original work,
            or a representative list if multiple works are involved).
          </li>
          <li>
            Identification of the allegedly infringing activity — since
            MP4 to MP3 does not host content, please describe the
            nature of the alleged misuse (e.g. &quot;a user is repeatedly
            using this tool to extract audio from my copyrighted song
            titled ___ and redistribute it&quot;).
          </li>
          <li>
            Information reasonably sufficient to permit us to contact you,
            including your name, address, telephone number, and email
            address.
          </li>
          <li>
            A statement that you have a good-faith belief that the disputed
            use is not authorized by the copyright owner, its agent, or the
            law.
          </li>
          <li>
            A statement, made under penalty of perjury, that the information
            in your notice is accurate and that you are the copyright owner
            or authorized to act on the owner&apos;s behalf.
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">
          Counter-notification
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          If you believe that your use of the service has been wrongly
          restricted due to a takedown notice, you may file a
          counter-notification with the same information required under
          17 U.S.C. §512(g)(3). Send counter-notices to{" "}
          <a
            href="mailto:dmca@mp4-to-mp3.app"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            dmca@mp4-to-mp3.app
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">
          Repeat infringer policy
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          In accordance with the DMCA, we maintain a policy of terminating,
          in appropriate circumstances, the accounts or access of users who
          are determined to be repeat infringers. Because MP4 to MP3
          does not require user accounts, &quot;termination&quot; in this
          context means blocking the IP addresses and device fingerprints
          associated with repeat infringing activity.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">
          What we cannot do
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Please note that MP4 to MP3:
        </p>
        <ul className="mt-3 space-y-2 text-base leading-relaxed text-muted-foreground">
          <li>
            Does not host, store, or distribute any copyrighted content;
          </li>
          <li>
            Does not scrape, fetch, or download content from any third-party
            platform;
          </li>
          <li>
            Cannot identify whether a specific uploaded file contains
            copyrighted material;
          </li>
          <li>
            Cannot prevent a determined user from re-uploading content from a
            different IP address.
          </li>
        </ul>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          If you believe your copyrighted work is being distributed online,
          you may also want to send takedown notices to the platforms where
          the actual distribution is occurring (YouTube, Spotify, etc.).
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">DMCA agent</h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Designated DMCA Agent:
          <br />
          MP4 to MP3 Copyright Team
          <br />
          Email:{" "}
          <a
            href="mailto:dmca@mp4-to-mp3.app"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            dmca@mp4-to-mp3.app
          </a>
        </p>
      </section>
    </PageShell>
  );
}
