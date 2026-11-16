import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { QuickAnswer } from "@/components/quick-answer";
import {
  FileAudio,
  Tags,
  Check,
  AlertTriangle,
  FileText,
  Info,
} from "lucide-react";

export const metadata: Metadata = {
  title: "ID3 Tags Explained: Add Title, Artist, Album to MP3",
  description:
    "ID3 tags store title, artist, album, year, and genre inside the MP3 file itself. Learn ID3v1 vs ID3v2 differences and how to edit tags with Mp3tag. Free converter.",
  alternates: { canonical: "/mp4-to-mp3-id3-tags" },
  openGraph: {
    title: "ID3 Tags Explained: Add Title, Artist, Album to MP3",
    description:
      "A field-by-field walkthrough of ID3 tags — what each frame means, ID3v1 vs ID3v2, and how to edit them with Mp3tag after converting MP4 to MP3.",
    url: "https://www.mp4tomp3.online/mp4-to-mp3-id3-tags",
    type: "article",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "ID3 Tags Explained: Add Title, Artist, Album to MP3",
    description:
      "A field-by-field walkthrough of ID3 tags, covering ID3v1 vs ID3v2, the most common frames, and how to edit them with Mp3tag after converting MP4 to MP3.",
    author: { "@type": "Organization", name: "MP4toMP3.online" },
    publisher: { "@type": "Organization", name: "MP4toMP3.online" },
    mainEntityOfPage: "https://www.mp4tomp3.online/mp4-to-mp3-id3-tags",
    datePublished: "2026-11-16",
    dateModified: "2026-11-16",
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell
        title="ID3 Tags Explained"
        subtitle="ID3 tags are how an MP3 knows its own name, artist, and album. Here is what is inside them, why two versions exist, and how to edit them properly."
      >
        <QuickAnswer>
          ID3 tags are metadata chunks stored inside an MP3 file that hold
          the title, artist, album, year, genre, and track number. The
          modern version is ID3v2, written at the start of the file. The
          easiest way to add or edit them is Mp3tag, a free tool that edits
          ID3 tags in batches without re-encoding. MP4toMP3.online produces
          a clean MP3 ready to be tagged.
        </QuickAnswer>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            What an ID3 tag actually is
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            An MP3 file is, at its core, a stream of compressed audio frames.
            The format has no built-in way to carry a title or an artist
            name. ID3 solves this by defining a chunk of metadata that
            sits alongside the audio: either at the front (ID3v2) or at
            the back (ID3v1) of the file. Players that understand ID3 read
            this chunk first, display its fields in the now-playing screen,
            and then start decoding the audio.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The chunk is structured as a list of frames, each with a
            four-letter identifier (like TIT2 for title or TPE1 for artist)
            and a value. The format is flexible enough to carry arbitrary
            text fields, embedded images, lyrics, chapter markers, and
            even custom application data. In practice, almost every MP3
            in your library uses six or seven of the dozens of defined
            frames.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            ID3v1 vs ID3v2
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            ID3v1 is the original spec, dating to 1996. It is a fixed
            128-byte block appended to the end of the file with hard limits:
            30 characters each for title, artist, album, and comment; a
            single byte for year; a single byte for genre selected from
            a fixed list of 80. The character encoding is Latin-1, which
            breaks on any non-Latin script. ID3v1 was fine for the early
            Napster era but is unworkable for modern libraries.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            ID3v2 was introduced in 1998 to fix all of these problems. It
            sits at the start of the file, supports variable-length fields,
            handles UTF-16 and UTF-8 text, allows arbitrary genre strings,
            and can embed images, lyrics, and chapter data. Two versions
            are in active use: 2.3, the most widely compatible, and 2.4,
            which adds UTF-8 support and a few structural improvements.
            Some older players cannot read 2.4, so 2.3 remains the
            conservative default.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            A single MP3 can carry both an ID3v1 tag at the end and an
            ID3v2 tag at the start. Tools like Mp3tag can sync the two so
            that older players reading v1 see the same data as newer
            players reading v2. For modern libraries, the right move is to
            write ID3v2.3 and let Mp3tag optionally write a stripped v1
            tag for compatibility.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            The frames you will actually use
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="py-2 pr-4 font-semibold">Frame</th>
                  <th className="py-2 pr-4 font-semibold">Field</th>
                  <th className="py-2 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/60">
                  <td className="py-2 pr-4">TIT2</td>
                  <td className="py-2 pr-4">Title</td>
                  <td className="py-2">The track name. Always fill this in.</td>
                </tr>
                <tr className="border-b border-border/60">
                  <td className="py-2 pr-4">TPE1</td>
                  <td className="py-2 pr-4">Artist</td>
                  <td className="py-2">Lead performer. Drives library grouping.</td>
                </tr>
                <tr className="border-b border-border/60">
                  <td className="py-2 pr-4">TALB</td>
                  <td className="py-2 pr-4">Album</td>
                  <td className="py-2">Source release name.</td>
                </tr>
                <tr className="border-b border-border/60">
                  <td className="py-2 pr-4">TRCK</td>
                  <td className="py-2 pr-4">Track number</td>
                  <td className="py-2">Format: <code className="rounded bg-muted px-1 py-0.5 text-sm">n/N</code>, e.g. 3/12.</td>
                </tr>
                <tr className="border-b border-border/60">
                  <td className="py-2 pr-4">TDRC</td>
                  <td className="py-2 pr-4">Year</td>
                  <td className="py-2">Recording or release date.</td>
                </tr>
                <tr className="border-b border-border/60">
                  <td className="py-2 pr-4">TCON</td>
                  <td className="py-2 pr-4">Genre</td>
                  <td className="py-2">Freeform in v2, but most players filter on it.</td>
                </tr>
                <tr className="border-b border-border/60">
                  <td className="py-2 pr-4">TPE2</td>
                  <td className="py-2 pr-4">Album artist</td>
                  <td className="py-2">Useful for compilations where individual tracks have different artists.</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">APIC</td>
                  <td className="py-2 pr-4">Picture</td>
                  <td className="py-2">Embedded cover art. Covered on the album art page.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Editing tags with Mp3tag
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Mp3tag is the standard tool for editing ID3 tags and the one we
            recommend. It is free for Windows and runs on Mac and Linux via
            Wine. The interface is a list of files on the left, an editable
            field panel on the right, and a filename pattern matcher that
            can pull fields out of consistent filenames.
          </p>
          <ol className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                1
              </span>
              <span>
                <strong>Convert your MP4s to MP3.</strong> The MP3s will
                have empty tags, which is what you want at this stage.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                2
              </span>
              <span>
                <strong>Open the folder in Mp3tag.</strong> Select all
                files at once for batch editing.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                3
              </span>
              <span>
                <strong>Fill in the shared fields</strong> (album, artist,
                year, genre) once, and apply to all selected files with
                Ctrl-S. Per-track fields (title, track number) get filled
                in one file at a time.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                4
              </span>
              <span>
                <strong>Optionally pull fields from filenames.</strong>{" "}
                Mp3tag&apos;s Converter &gt; Filename to Tag command parses
                a pattern like{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-sm">
                  %artist% - %album% - %track% - %title%
                </code>{" "}
                against the actual filenames and writes the captured
                values into the corresponding frames.
              </span>
            </li>
          </ol>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            For Mac users, kid3 is the equivalent tool with a similar
            feature set and a similar batch-editing model.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Where to get tag data
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <FileText className="h-5 w-5" />
                <h3 className="text-base font-semibold">Filenames</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                If your files are well named, Mp3tag can parse the names
                into tags. The cheapest path, but only works if filenames
                are consistent.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Tags className="h-5 w-5" />
                <h3 className="text-base font-semibold">MusicBrainz</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                The open music encyclopedia. Mp3tag can query it directly
                by album name. Data is community-curated and reliable.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Info className="h-5 w-5" />
                <h3 className="text-base font-semibold">AcoustID</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Fingerprints the audio itself, so it works even on
                untagged files with misleading filenames. Use Picard
                (MusicBrainz&apos;s tagger) to apply the fingerprints.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <FileText className="h-5 w-5" />
                <h3 className="text-base font-semibold">Manual entry</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                For voice memos, lectures, and personal recordings, this
                is the only path. A descriptive title and a date are
                usually enough.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Common pitfalls
          </h2>
          <ul className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-3">
              <AlertTriangle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Mixed ID3 versions.</strong> Some players see v1,
                some see v2, and a file with both can display conflicting
                info. Pick one version and stick to it (v2.3 is the safe
                default).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Encoding mismatches.</strong> Latin-1 tags with
                non-Latin characters render as garbage. Always use UTF-16
                or UTF-8 (v2.4) for non-English text.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Genre strings.</strong> Older ID3v1 used a numeric
                genre ID. ID3v2 allows freeform strings, but some players
                still expect the canonical list. Use common genre names
                like &quot;Rock&quot; or &quot;Jazz&quot; to be safe.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Test in multiple players.</strong> Open one tagged
                file in two different players to confirm the tags render
                correctly in both.
              </span>
            </li>
          </ul>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            For the broader question of what to put in your tags after
            converting, the{" "}
            <Link
              href="/mp4-to-mp3-metadata"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              metadata preservation
            </Link>{" "}
            page covers the workflow end to end, and the{" "}
            <Link
              href="/mp4-to-mp3-album-art"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              album art
            </Link>{" "}
            page covers the APIC frame specifically.
          </p>
        </section>

        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
          <h2 className="text-xl font-bold">
            Convert MP4 to MP3, then tag with Mp3tag
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Clean conversion first, ID3 tags second. Browser-based, no
            upload, no sign-up.
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
