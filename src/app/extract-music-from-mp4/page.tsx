import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { QuickAnswer } from "@/components/quick-answer";
import {
  FileAudio,
  Music,
  Check,
  Clock,
  HardDrive,
  Volume2,
  Smartphone,
} from "lucide-react";

export const metadata: Metadata = {
  title: "How to Extract Music or Songs from MP4 Video Files",
  description:
    "Pull songs and music out of MP4 videos — music videos, live recordings, concert footage. Browser-based, no upload. Step-by-step with bitrate and metadata tips.",
  alternates: { canonical: "/extract-music-from-mp4" },
  openGraph: {
    title: "How to Extract Music or Songs from MP4 Video Files",
    description:
      "Step-by-step guide to extracting songs and music from MP4 videos, with recommended bitrates and metadata tips.",
    url: "https://www.mp4tomp3.online/extract-music-from-mp4",
    type: "article",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Extract Music or Songs from MP4 Video Files",
    description:
      "A step-by-step tutorial on extracting music and songs from MP4 videos, including recommended bitrates, metadata handling, and where the resulting MP3 files can be played.",
    author: { "@type": "Organization", name: "MP4toMP3.online" },
    publisher: { "@type": "Organization", name: "MP4toMP3.online" },
    mainEntityOfPage: "https://www.mp4tomp3.online/extract-music-from-mp4",
    datePublished: "2026-11-16",
    dateModified: "2026-11-16",
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell
        title="Extract Music from MP4 Videos"
        subtitle="Turn music videos, concert recordings, and live footage into clean MP3 files you can keep in your music library. Here is how, with the right settings for songs."
      >
        <QuickAnswer>
          To extract music from an MP4 video, open MP4toMP3.online in your
          browser, drop in the MP4, choose MP3 at 192 or 320 kbps stereo, and
          click Convert. The audio track is pulled out and re-encoded as an MP3
          in seconds, entirely in your browser with no upload. Save the file,
          add your tags, and drop it into your music library.
        </QuickAnswer>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            What counts as &quot;music&quot; in an MP4
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            <Music className="mr-1 inline h-4 w-4 text-primary" />
            When people ask how to extract music from an MP4, they usually mean
            one of three things: an official music video where the song is the
            main content, a concert or live recording captured as video, or a
            tutorial or vlog where a track plays underneath. In all three cases
            the MP4 carries an audio stream — almost always AAC — and your job
            is to demux that stream and re-encode it to MP3 so it lives in your
            music library rather than trapped inside a video container.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Importantly, this process extracts the entire audio track. If the
            MP4 is a music video with a few seconds of intro dialogue, the
            dialogue comes along with the song. Trimming it down is a separate
            step you can do either before converting, by trimming the source
            MP4, or after, with any audio editor. The conversion itself does not
            pick out one song from many; it pulls out whatever audio the MP4
            contains.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Step-by-step: pulling a song out of an MP4
          </h2>
          <ol className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                1
              </span>
              <span>
                <strong>Open MP4toMP3.online</strong> in any modern browser.
                The tool loads entirely client-side, so there is no account to
                create and no software to install.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                2
              </span>
              <span>
                <strong>Drop in your MP4</strong> or click to browse. The file
                is read from disk directly into browser memory — it is never
                uploaded to a server.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                3
              </span>
              <span>
                <strong>Set the format and bitrate.</strong> Choose MP3 and
                pick 192 kbps for general listening or 320 kbps if you are
                archiving the song at MP3&apos;s quality ceiling.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                4
              </span>
              <span>
                <strong>Click Convert</strong> and wait a few seconds. A
                five-minute song typically finishes in under 15 seconds on a
                modern laptop.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                5
              </span>
              <span>
                <strong>Download the MP3</strong> and add it to your music
                library. Tag it with the song name and artist so it sorts
                correctly.
              </span>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            The right bitrate for songs
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Volume2 className="h-5 w-5" />
                <h3 className="text-base font-semibold">192 kbps</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                The default for general listening. Transparent on phone
                earbuds, car stereos, and most home speakers. About 1.4 MB per
                minute of audio.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Volume2 className="h-5 w-5" />
                <h3 className="text-base font-semibold">256 kbps</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                A comfortable middle ground for higher-quality headphones.
                Marginally larger files, imperceptibly better than 192 to most
                listeners.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Volume2 className="h-5 w-5" />
                <h3 className="text-base font-semibold">320 kbps</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                The MP3 ceiling. Pick this for archival of songs you want at
                maximum MP3 quality. About 2.4 MB per minute. Our{" "}
                <Link
                  href="/mp4-to-mp3-320kbps"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  320 kbps guide
                </Link>{" "}
                covers when this is worth the size.
              </p>
            </div>
          </div>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            For music, keep stereo. Unlike voice extraction, where mono is
            often better, songs rely on the stereo field for their character,
            and downmixing to mono collapses the mix unnaturally. Variable
            bitrate (VBR) is the efficient default; see the{" "}
            <Link
              href="/mp4-to-mp3-vbr-vs-cbr"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              VBR vs CBR comparison
            </Link>{" "}
            if you need a fixed bitrate for a particular player.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Keep your metadata
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            <Check className="mr-1 inline h-4 w-4 text-primary" />
            An MP3 without tags is a file called &quot;output.mp3&quot; that
            your music app files under &quot;Unknown Artist.&quot; After
            converting, open the file in a tagger — Mp3tag on Windows,
            Kid3 on Mac and Linux, or the built-in tag editor in your music
            app — and set at minimum the title, artist, album, and track
            number. Cover art is worth adding too, since most music apps
            display it prominently.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The conversion itself does not carry metadata from the MP4, since
            MP4 metadata (in the moov atom) uses a different schema from MP3 ID3
            tags. Plan on tagging as a final step rather than expecting the
            title to survive the trip.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Where the resulting MP3 goes
          </h2>
          <ul className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-3">
              <Smartphone className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Phone music library:</strong> drop the MP3 into your
                iCloud Drive or Files app on iOS, or your Downloads folder on
                Android, then add it to Apple Music, foobar2000, or your
                player of choice.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HardDrive className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Car stereo USB:</strong> copy it onto a FAT32-formatted
                flash drive and plug in. Most car stereos read MP3 natively.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Dedicated MP3 player:</strong> drag it onto your
                player&apos;s storage over USB. Legacy players may cap supported
                bitrates, so check before transferring 320 kbps files.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Quality: what you will actually hear
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The audio inside a typical music video MP4 is AAC at 128 to 256
            kbps, already lossy. Re-encoding to MP3 adds one more generation of
            compression. At 192 kbps or higher the added artifacts sit below
            the threshold of perception for almost all listeners on almost all
            gear, which is why a converted music video sounds essentially
            identical to streaming the same song. At 128 kbps or below, careful
            listeners on studio monitors may notice a slight softening of
            high-frequency transients like cymbals.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            If you want to skip the extra lossy generation entirely and keep a
            lossless intermediate, our{" "}
            <Link
              href="/mp4-to-wav"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              MP4 to WAV converter
            </Link>{" "}
            produces uncompressed PCM instead. For most music libraries that is
            wasteful, but it is the right call if you plan to edit or master the
            audio afterwards.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            A note on what you may convert
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Only extract music from MP4s you created or have explicit permission
            to use. Pulling audio from someone else&apos;s music video, a
            streaming platform rip, or a copyrighted concert recording is
            illegal in most jurisdictions and against this site&apos;s terms.
            The tool processes files locally and does not connect to streaming
            platforms, but the legal responsibility for what you convert is
            yours. For the broader how-to that this tutorial builds on, see{" "}
            <Link
              href="/how-to-convert-mp4-to-mp3"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              how to convert MP4 to MP3
            </Link>
            , and for the general-purpose audio extraction interface see{" "}
            <Link
              href="/extract-audio-from-mp4"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              extract audio from MP4
            </Link>
            .
          </p>
        </section>

        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
          <h2 className="text-xl font-bold">
            Extract music from your MP4 now
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Browser-based, no upload, no sign-up. Your file never leaves your
            device.
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
