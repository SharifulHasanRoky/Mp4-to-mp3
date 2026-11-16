import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { QuickAnswer } from "@/components/quick-answer";
import { Citations, type Citation } from "@/components/citations";
import {
  FileAudio,
  Tags,
  Check,
  AlertTriangle,
  FileText,
  Info,
} from "lucide-react";

export const metadata: Metadata = {
  title: "MP4 to MP3 Metadata — Preserve or Add Tags Free",
  description:
    "How to preserve or add metadata (title, artist, album) when converting MP4 to MP3. Free tools and workflow. No sign-up guide.",
  alternates: { canonical: "/mp4-to-mp3-metadata" },
  openGraph: {
    title: "Preserve or Add Metadata When Converting MP4 to MP3",
    description:
      "What happens to title, artist, and album info when you convert MP4 to MP3, and how to add ID3 tags afterwards using Mp3tag.",
    url: "https://www.mp4tomp3.online/mp4-to-mp3-metadata",
    type: "article",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Preserve or Add Metadata When Converting MP4 to MP3",
    description:
      "An honest guide to metadata when converting MP4 to MP3, covering what survives conversion, why MP4 and MP3 use different metadata systems, and how to add ID3 tags afterwards with Mp3tag.",
    author: { "@type": "Organization", name: "MP4toMP3.online" },
    publisher: { "@type": "Organization", name: "MP4toMP3.online" },
    mainEntityOfPage: "https://www.mp4tomp3.online/mp4-to-mp3-metadata",
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
        title="Preserve or Add Metadata When Converting MP4 to MP3"
        subtitle="MP4 and MP3 use different metadata systems, and a clean conversion does not translate one into the other. Here is what actually happens and what to do about it."
      >
        <QuickAnswer>
          Most MP4 metadata does not survive conversion to MP3, because MP4
          uses the MP4 box format and MP3 uses ID3 tags. A converter that
          silently translated one into the other would be guessing. Convert
          cleanly, then add ID3 tags afterwards with Mp3tag. MP4toMP3.online
          focuses on a clean conversion and leaves metadata to a dedicated
          tool.
        </QuickAnswer>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Two formats, two metadata systems
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            MP4 files store metadata in a structured hierarchy of boxes
            (also called atoms), following the ISO base media file format.
            A title lives in the <code className="rounded bg-muted px-1 py-0.5 text-sm">©nam</code>{" "}
            box, an artist in <code className="rounded bg-muted px-1 py-0.5 text-sm">©ART</code>,
            an album in <code className="rounded bg-muted px-1 py-0.5 text-sm">©alb</code>,
            and so on. These boxes are general-purpose and can carry
            arbitrary fields, which is why MP4 is used for everything from
            iTunes movies to phone-recorded video.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            MP3 files use ID3 tags, which is a separate specification bolted
            onto the front (or back) of the audio stream. ID3 has a fixed
            set of fields — title, artist, album, year, genre, track number,
            and so on — plus a freeform frame system for less common data.
            The two systems do not map one-to-one. A field that exists in
            MP4 may have no ID3 equivalent, and vice versa.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            What conversion actually does
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            A correct MP4-to-MP3 conversion produces an MP3 with empty ID3
            tags. The audio is preserved, the loudness is preserved, but
            the metadata fields in the source MP4 — title, artist, album,
            year, cover art — are not copied across. This is not a bug;
            it is the conservative default. Copying fields from one system
            to the other requires guessing how each field should map,
            and converters that do this silently produce inconsistent
            results across sources.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Some converters do attempt to copy common fields (title, artist,
            album) into ID3v2 frames during conversion. The result is
            usually correct for properly tagged MP4 sources but wrong for
            oddly tagged ones. The honest position is that metadata is
            best handled by a dedicated tagging tool after conversion,
            where you can see what is being written and fix anything that
            looks off.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            The recommended workflow: Mp3tag
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Mp3tag is the standard tool for editing ID3 tags. It is free,
            runs on Windows natively (and on Mac and Linux via Wine), and
            handles a batch of MP3s in a single window. You see every
            field of every file at once, you can edit them inline, and
            you can apply changes across hundreds of files with one click.
          </p>
          <ol className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                1
              </span>
              <span>
                <strong>Convert the MP4 files to MP3.</strong> The MP3s
                will have empty ID3 tags; that is expected.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                2
              </span>
              <span>
                <strong>Open the folder in Mp3tag.</strong> All MP3 files
                appear in a list with their current (empty) tag fields.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                3
              </span>
              <span>
                <strong>Fill in the fields.</strong> For single files, type
                them in directly. For batches, use Mp3tag&apos;s
                filename-to-tag pattern matcher (for example{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-sm">
                  %artist% - %title%
                </code>) to pull fields from a consistent filename pattern.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                4
              </span>
              <span>
                <strong>Save.</strong> Mp3tag writes ID3v2.3 tags by
                default, which is the most widely compatible version.
              </span>
            </li>
          </ol>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            For Mac users, kid3 is the equivalent tool — same lossless
            frame-based editing, similar feature set. For a deeper dive
            into the ID3 tag format itself, see the{" "}
            <Link
              href="/mp4-to-mp3-id3-tags"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              ID3 tags explained
            </Link>{" "}
            page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Fields worth filling in
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="py-2 pr-4 font-semibold">Field</th>
                  <th className="py-2 pr-4 font-semibold">ID3 frame</th>
                  <th className="py-2 font-semibold">Why it matters</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/60">
                  <td className="py-2 pr-4">Title</td>
                  <td className="py-2 pr-4">TIT2</td>
                  <td className="py-2">
                    What the player shows as the main label.
                  </td>
                </tr>
                <tr className="border-b border-border/60">
                  <td className="py-2 pr-4">Artist</td>
                  <td className="py-2 pr-4">TPE1</td>
                  <td className="py-2">
                    Drives grouping in library views and smart playlists.
                  </td>
                </tr>
                <tr className="border-b border-border/60">
                  <td className="py-2 pr-4">Album</td>
                  <td className="py-2 pr-4">TALB</td>
                  <td className="py-2">
                    Lets the player keep files from the same release together.
                  </td>
                </tr>
                <tr className="border-b border-border/60">
                  <td className="py-2 pr-4">Track number</td>
                  <td className="py-2 pr-4">TRCK</td>
                  <td className="py-2">
                    Keeps album tracks in the right order.
                  </td>
                </tr>
                <tr className="border-b border-border/60">
                  <td className="py-2 pr-4">Year</td>
                  <td className="py-2 pr-4">TDRC</td>
                  <td className="py-2">
                    Useful for sorting and for decade-based smart playlists.
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Genre</td>
                  <td className="py-2 pr-4">TCON</td>
                  <td className="py-2">
                    Freeform in ID3v2 but most players filter on it.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Beyond these six, you can add album art (covered on the{" "}
            <Link
              href="/mp4-to-mp3-album-art"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              album art
            </Link>{" "}
            page), lyrics (USLT frame), composer (TCOM), and a comment
            (COMM). Most players ignore everything past the first six, so
            prioritize those.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Where metadata comes from
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <FileText className="h-5 w-5" />
                <h3 className="text-base font-semibold">Filename</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                A consistent filename pattern like
                <code className="rounded bg-muted px-1 py-0.5 text-sm">Artist - Title.mp3</code>
                {" "}can be parsed into tags by Mp3tag with one click. This
                is the cheapest path when your source files are well
                named.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Tags className="h-5 w-5" />
                <h3 className="text-base font-semibold">Online databases</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                MusicBrainz, Discogs, and freedb all expose APIs that
                Mp3tag can query by album or fingerprint. This is the
                fastest path for commercial music.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Info className="h-5 w-5" />
                <h3 className="text-base font-semibold">Audio fingerprint</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                AcoustID fingerprints the audio itself, so it works even
                on files with no useful filename or embedded tags. Mp3tag
                integrates with AcoustID via Picard.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <FileText className="h-5 w-5" />
                <h3 className="text-base font-semibold">Manual entry</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                For voice memos, lectures, and personal recordings, manual
                entry is the only path. Keep it simple: a descriptive title
                and a date are usually enough.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Things to watch out for
          </h2>
          <ul className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-3">
              <AlertTriangle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>ID3v2.3 vs ID3v2.4.</strong> 2.3 is more widely
                supported by older players; 2.4 supports UTF-8 and longer
                fields. Mp3tag defaults to 2.3, which is the safe choice.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Encoding issues.</strong> Older ID3v1 tags use
                Latin-1, which mangles non-Latin scripts. If you have any
                non-English metadata, use ID3v2 and UTF-16 or UTF-8.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Cover art size.</strong> Embedded cover art
                balloons the file size; keep images at 600x600 or smaller
                unless you have a reason not to.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Verify in a second player.</strong> Open one of the
                tagged files in a different player to confirm the tags
                survived; some players cache tag info aggressively.
              </span>
            </li>
          </ul>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            For the broader context of MP3 vs MP4 as containers and codecs,
            the{" "}
            <Link
              href="/mp4-vs-mp3"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              MP4 vs MP3
            </Link>{" "}
            comparison explains the structural differences that make their
            metadata systems incompatible.
          </p>
        </section>

        <Citations
          sources={[
            { title: "ID3 \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/ID3", publisher: "Wikipedia", note: "The ID3 metadata container embedded in MP3 files." },
            { title: "MP3 \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/MP3", publisher: "Wikipedia", note: "How MP3 carries metadata alongside the audio stream." },
            { title: "FFmpeg documentation", url: "https://ffmpeg.org/ffmpeg.html", publisher: "FFmpeg", note: "FFmpeg options for preserving and writing metadata fields." },
            { title: "LAME \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/LAME", publisher: "Wikipedia", note: "The libmp3lame encoder that writes ID3 tags during output." },
          ]}
        />

        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
          <h2 className="text-xl font-bold">
            Convert MP4 to MP3, then tag with Mp3tag
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Conversion gives you clean audio; Mp3tag gives you clean tags.
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
