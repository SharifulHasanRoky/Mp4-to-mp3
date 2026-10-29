import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "ReelAudio Studio is an independent, privacy-first online audio extraction tool. Learn about our mission, our technology, and our commitment to copyright compliance.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return (
    <PageShell
      title="About ReelAudio Studio"
      subtitle="A free, private, and copyright-compliant online audio extraction tool."
    >
      <section>
        <h2 className="text-2xl font-bold tracking-tight">Our mission</h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          ReelAudio Studio exists to make audio extraction from video files
          simple, fast, and private. We believe that converting your own
          recorded videos into portable audio files should not require
          installing desktop software, signing up for an account, or
          surrendering your personal data. Whether you are a podcaster
          pulling audio from a Zoom interview, a student extracting lecture
          audio for offline listening, or a musician exporting a scratch
          vocal take from your phone, we want to give you a clean, free tool
          that respects both your privacy and the rights of content creators.
        </p>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          We deliberately built ReelAudio Studio as a personal-use utility,
          not a downloader. The tool only accepts files you upload yourself
          and never connects to Instagram, TikTok, YouTube, or any other
          third-party platform. This is not a limitation we are working
          around — it is a core principle. Copyright-compliant design is what
          allows the service to exist long-term without DMCA takedowns,
          legal exposure, or platform-policy violations.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Our technology</h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          The conversion engine is built on FFmpeg, the open-source media
          framework trusted by YouTube, Vimeo, OBS Studio, and virtually
          every professional media pipeline. We use the libmp3lame encoder
          at VBR quality 2 (~190 kbps), which is widely considered the
          sweet spot between file size and audio quality. The output is a
          standard, universally playable MP3 file.
        </p>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          The frontend is built with Next.js and Tailwind CSS, deployed on
          Vercel-edge infrastructure for fast global delivery. Pages are
          statically generated where possible for instant load times and
          excellent Core Web Vitals — important signals for both user
          experience and search ranking.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">
          Privacy-first by design
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Your uploaded videos never live on our servers for more than a few
          seconds. Files are written to a temporary directory, processed
          immediately by FFmpeg, and deleted right after the MP3 is returned
          to your browser. We do not store, log, share, or analyze your
          media. There is no account, no tracking of file contents, and no
          permanent copy of your video anywhere on our infrastructure.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">
          Copyright compliance
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          We take copyright seriously. ReelAudio Studio does not host, store,
          or distribute any copyrighted media. We do not scrape, fetch, or
          download content from any third-party platform. If you believe
          that someone is using this tool to process copyrighted content
          without permission, please see our{" "}
          <a
            href="/copyright"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Copyright / DMCA page
          </a>{" "}
          to file a takedown request.
        </p>
      </section>
    </PageShell>
  );
}
