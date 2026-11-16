import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { QuickAnswer } from "@/components/quick-answer";
import { Citations, type Citation } from "@/components/citations";
import {
  FileAudio,
  Image as ImageIcon,
  Check,
  AlertTriangle,
  Tags,
  HardDrive,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Add Album Art to MP3 — Free Step-by-Step Guide",
  description:
    "How to add cover art to MP3 files using free tools like Mp3tag and kid3. Step-by-step with resolution tips. Free, no sign-up guide.",
  alternates: { canonical: "/mp4-to-mp3-album-art" },
  openGraph: {
    title: "Add Album Art or Cover Image to MP3 Files: A Guide",
    description:
      "How embedded album art works in MP3 files, which resolutions to use, and how to add cover images with Mp3tag or kid3 after converting MP4 to MP3.",
    url: "https://www.mp4tomp3.online/mp4-to-mp3-album-art",
    type: "article",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Add Album Art or Cover Image to MP3 Files: A Guide",
    description:
      "A practical guide to embedding album art in MP3 files, covering the APIC frame, recommended resolutions, and how to add cover images with Mp3tag or kid3 after converting MP4 to MP3.",
    author: { "@type": "Organization", name: "MP4toMP3.online" },
    publisher: { "@type": "Organization", name: "MP4toMP3.online" },
    mainEntityOfPage: "https://www.mp4tomp3.online/mp4-to-mp3-album-art",
    datePublished: "2026-11-16",
    dateModified: "2026-11-16",
    citation: [
      "https://en.wikipedia.org/wiki/ID3",
      "https://en.wikipedia.org/wiki/MP3",
      "https://ffmpeg.org/ffmpeg.html",
      "https://en.wikipedia.org/wiki/LAME",
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell
        title="Add Album Art to MP3 Files"
        subtitle="Embedded cover art is what makes the now-playing screen on your phone show the album cover. Here is how it works and how to add it after converting."
      >
        <QuickAnswer>
          Album art is embedded in an MP3 file as an APIC frame inside the
          ID3v2 tag. To add it, open the MP3 in Mp3tag or kid3, drag a JPEG
          or PNG image into the cover art panel, and save. Use a square
          image between 300x300 and 1000x1000 pixels. MP4toMP3.online gives
          you a clean MP3 ready to receive the art.
        </QuickAnswer>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            What embedded cover art actually is
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            When your phone shows the album cover for a track, that image
            is usually not stored separately. It is embedded inside the
            MP3 file itself, in an ID3v2 frame called APIC. The frame
            contains the image bytes, a MIME type (image/jpeg or
            image/png), a picture type code (cover front, cover back,
            leaflet, and so on), and an optional description. Players that
            understand ID3 read the APIC frame, decode the image, and
            display it.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            A single MP3 can carry multiple APIC frames — front cover, back
            cover, booklet pages, artist photos — but in practice most
            players only display the first one tagged as &quot;cover
            front&quot;. For personal libraries, one front cover per file
            is the universal default. Additional images waste space without
            any visible payoff.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Where the art comes from
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The most common source is the cover scan in your source MP4&apos;s
            metadata. Many MP4 files purchased from iTunes or ripped with
            album-art lookup enabled carry a cover image in a{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-sm">covr</code>{" "}
            box. This image does not survive a clean MP4-to-MP3 conversion,
            because MP4 cover art and ID3 APIC frames use different
            structures, so a converter that silently copied one to the
            other would be guessing. The reliable path is to extract the
            image from the source file first, then add it to the MP3
            afterwards with a dedicated tool.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            If the source has no embedded art, the fallback is to fetch it
            from an online source. MusicBrainz, Discogs, and Cover Art
            Archive all expose cover scans for a vast catalog of releases.
            Many tagging tools query these automatically. The Cover Art
            Archive in particular is the canonical open source for cover
            images and is what most modern taggers default to.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Recommended image specs
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="py-2 pr-4 font-semibold">Resolution</th>
                  <th className="py-2 pr-4 font-semibold">File size</th>
                  <th className="py-2 font-semibold">Best for</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/60">
                  <td className="py-2 pr-4">300 x 300</td>
                  <td className="py-2 pr-4">~20 KB</td>
                  <td className="py-2">Phone now-playing, small libraries</td>
                </tr>
                <tr className="border-b border-border/60">
                  <td className="py-2 pr-4">600 x 600</td>
                  <td className="py-2 pr-4">~60 KB</td>
                  <td className="py-2">Sweet spot for most uses</td>
                </tr>
                <tr className="border-b border-border/60">
                  <td className="py-2 pr-4">1000 x 1000</td>
                  <td className="py-2 pr-4">~150 KB</td>
                  <td className="py-2">HiDPI displays, larger libraries</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">1400+ x 1400+</td>
                  <td className="py-2 pr-4">300 KB+</td>
                  <td className="py-2">Archival; usually unnecessary</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            600x600 is the practical sweet spot. It looks crisp on every
            modern phone, including hi-DPI Retina displays, and adds only
            about 60 KB to the file. Going larger provides no visible
            benefit on phone-sized now-playing screens and inflates every
            file in your library. Going smaller than 300x300 starts to
            look pixelated on Retina displays.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Format is JPEG for photographs and painted artwork (better
            compression) and PNG for line art and logos (sharper edges).
            Most players handle both. Square images are the universal
            convention; non-square images will be letterboxed or
            stretched by players that expect square.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            The recommended workflow: Mp3tag
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Mp3tag handles album art the same way it handles other ID3
            fields. Open the file (or a batch of files), click the cover
            art panel on the left of the tag editor, and drag a JPEG or
            PNG into it. Set the picture type to &quot;Cover
            (front)&quot; and save. The image is written into the APIC
            frame of every selected file.
          </p>
          <ol className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                1
              </span>
              <span>
                <strong>Convert the MP4 to MP3.</strong> The MP3 will not
                have any embedded art yet, which is expected.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                2
              </span>
              <span>
                <strong>Get a cover image.</strong> Either extract one
                from the source MP4 (MediaInfo, FFmpeg, or Mp3tag itself
                can read the <code className="rounded bg-muted px-1 py-0.5 text-sm">covr</code> box)
                or fetch one from Cover Art Archive.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                3
              </span>
              <span>
                <strong>Drag the image into Mp3tag&apos;s cover panel.</strong>{" "}
                Select all files you want to apply the cover to, then drag.
                Mp3tag writes the same image to every selected file in one
                operation.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                4
              </span>
              <span>
                <strong>Save.</strong> Mp3tag rewrites the ID3v2 tag with
                the new APIC frame. The audio is untouched.
              </span>
            </li>
          </ol>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            kid3 is the cross-platform alternative, with a near-identical
            workflow and an identical result. Both tools write ID3v2.3 APIC
            frames by default, which is the format every modern player
            understands.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Pitfalls and edge cases
          </h2>
          <ul className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-3">
              <AlertTriangle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Multiple APIC frames.</strong> Some MP3s accumulate
                cover frames when tagged by several tools. Most players
                show only the first, but the file carries the rest as dead
                weight. Mp3tag lets you delete all but the front cover
                with one click.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Oversized images.</strong> A 4000x4000 scan adds
                2 MB per file, which on a thousand-track library is 2 GB
                of cover art for no perceptible benefit. Downscale before
                embedding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Wrong picture type.</strong> APIC frames carry a
                type code: front cover, back cover, leaflet, and so on.
                Setting a front cover image to &quot;other&quot; means
                some players will not display it. Always use &quot;Cover
                (front)&quot; for the primary image.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HardDrive className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Car stereos and embedded PNG.</strong> Some older
                car stereos only read JPEG APIC frames. If your art
                is not showing up in the car, convert the image to JPEG
                before embedding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Verify on the target player.</strong> Open one
                tagged file on the actual device you will listen on.
                Cover art rendering varies more than any other ID3 field.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Cover art and the broader tagging picture
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Cover art is one ID3 frame among many. Done well, it is the
            most visible one — the thing that makes a music library feel
            like a music library rather than a list of filenames. The
            other frames (title, artist, album, year, genre) are what
            let the library organize itself; the APIC frame is what makes
            it pleasant to look at. Both belong in a properly tagged MP3.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            For the broader context, the{" "}
            <Link
              href="/mp4-to-mp3-metadata"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              metadata preservation
            </Link>{" "}
            page covers the end-to-end tagging workflow, and the{" "}
            <Link
              href="/mp4-to-mp3-id3-tags"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              ID3 tags explained
            </Link>{" "}
            page walks through every common frame including APIC. For
            source files coming from other containers, the{" "}
            <Link
              href="/extract-audio-from-mp4"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              extract audio from MP4
            </Link>{" "}
            guide covers the upstream steps.
          </p>
        </section>

        <Citations
          sources={[
            { title: "ID3 \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/ID3", publisher: "Wikipedia", note: "The ID3 APIC frame that embeds album art inside an MP3." },
            { title: "MP3 \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/MP3", publisher: "Wikipedia", note: "How MP3 carries embedded cover art via ID3 frames." },
            { title: "FFmpeg documentation", url: "https://ffmpeg.org/ffmpeg.html", publisher: "FFmpeg", note: "FFmpeg options for attaching album art to MP3 output." },
            { title: "LAME \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/LAME", publisher: "Wikipedia", note: "The libmp3lame encoder that writes APIC artwork frames." },
          ]}
        />

        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
          <h2 className="text-xl font-bold">
            Convert MP4 to MP3, then add album art
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Clean conversion first, cover art second with Mp3tag or kid3.
            Browser-based, no upload, no sign-up.
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
