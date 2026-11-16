import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { QuickAnswer } from "@/components/quick-answer";
import { Citations, type Citation } from "@/components/citations";
import {
  FileAudio,
  Activity,
  Music,
  Video,
  Mic,
  Waves,
} from "lucide-react";

export const metadata: Metadata = {
  title: "MP3 Sample Rate Explained: 44.1 kHz vs 48 kHz",
  description:
    "What MP3 sample rate means, how the Nyquist theorem sets the limit, and when to use 44.1 kHz, 48 kHz, or 22.05 kHz. Plus how resampling affects audio quality.",
  alternates: { canonical: "/mp4-to-mp3-sample-rate" },
  openGraph: {
    title: "MP3 Sample Rate Explained: 44.1 kHz vs 48 kHz",
    description:
      "A practical guide to MP3 sample rates — what 44.1 kHz and 48 kHz actually mean, when to resample, and how MP4-to-MP3 conversion handles them.",
    url: "https://www.mp4tomp3.online/mp4-to-mp3-sample-rate",
    type: "article",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "MP3 Sample Rate Explained: 44.1 kHz vs 48 kHz",
    description:
      "A practical guide to MP3 sample rates — what 44.1 kHz and 48 kHz actually mean, how the Nyquist theorem sets the limit, when resampling matters, and how MP4-to-MP3 conversion handles sample rates.",
    author: { "@type": "Organization", name: "MP4toMP3.online" },
    publisher: { "@type": "Organization", name: "MP4toMP3.online" },
    mainEntityOfPage:
      "https://www.mp4tomp3.online/mp4-to-mp3-sample-rate",
    datePublished: "2026-11-16",
    dateModified: "2026-11-16",
    citation: [
      "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs",
      "https://en.wikipedia.org/wiki/MP3",
      "https://ffmpeg.org/ffmpeg-codecs.html",
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell
        title="MP3 Sample Rate Explained"
        subtitle="What 44.1 kHz and 48 kHz actually mean, why the CD standard is 44.1, and when you should care about resampling when converting MP4 to MP3."
      >
        <QuickAnswer>
          Use 44.1 kHz for music — it matches CD quality and works
          everywhere. Use 48 kHz for video audio and pro production. For
          voice-only recordings, 22.05 kHz is plenty. Do not upsample: a
          48 kHz source converted to 44.1 kHz loses a tiny bit of high
          end. MP4toMP3.online preserves your source sample rate by
          default.
        </QuickAnswer>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            What sample rate actually measures
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Sample rate is the number of times per second the audio
            waveform is measured and stored as a discrete number. A 44.1
            kHz file takes 44,100 samples every second; a 48 kHz file
            takes 48,000. Each sample is a single amplitude value, and
            playing them back reconstructs the original continuous
            waveform. The higher the rate, the more faithfully high
            frequencies are captured — but only up to a hard limit set
            by the Nyquist theorem.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Sample rate is independent of bitrate. Bitrate (kbps) is the
            total data per second, which depends on both the sample rate
            and how many bits each sample is compressed into. A 320 kbps
            MP3 at 44.1 kHz and a 320 kbps MP3 at 48 kHz are the same
            size, but the 48 kHz version spreads its bits across more
            samples per second, leaving slightly fewer bits per sample.
            Sample rate sets the frequency ceiling; bitrate sets the
            quality floor within that ceiling.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            The Nyquist limit, in plain terms
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The Nyquist-Shannon sampling theorem says that to perfectly
            reconstruct a signal, you must sample at more than twice its
            highest frequency. Double the highest frequency you want to
            reproduce, and that is your minimum sample rate. Human
            hearing tops out at roughly 20 kHz in childhood and declines
            with age, so the floor for full-bandwidth audio is just above
            40 kHz.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            This is why 44.1 kHz exists: it sits comfortably above 2 × 20
            kHz, leaving a 2.05 kHz transition band for the anti-aliasing
            filter at the top of the DAC. Without that headroom,
            frequencies above the Nyquist limit would fold back into the
            audible range as aliasing artifacts — metallic, spurious
            tones. A few kilohertz of transition band makes the cutoff
            filter achievable with real hardware.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            44.1 kHz: the music standard
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            44.1 kHz is the sample rate of the audio CD, defined in the
            Red Book standard in 1980 and carried into every digital music
            format since. iTunes, Spotify, Apple Music, YouTube Music,
            and Tidal&apos;s standard tier all serve 44.1 kHz. Most
            studio masters start there or are downsampled to it for
            distribution. When you convert an MP4 of a song or music
            video to MP3, the audio inside is almost always 44.1 kHz
            already.
          </p>
          <ul className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-3">
              <Music className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Universal compatibility.</strong> Every MP3
                decoder, every phone, every car stereo, every piece of
                audio software made in the last thirty years handles
                44.1 kHz natively. There is no resampling, no
                conversion, no surprise.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Music className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>CD-quality bandwidth.</strong> 44.1 kHz captures
                up to 22.05 kHz, which covers the entire range of human
                hearing with headroom. For music, there is no audible
                benefit to going higher.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Music className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Smaller files than 48 kHz.</strong> Same bit
                depth and same encoder settings, 44.1 kHz produces files
                about 8 per cent smaller than 48 kHz — because it stores
                fewer samples per second.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            48 kHz: the video and pro standard
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            48 kHz is the sample rate of professional video. DAT, DVD,
            Blu-ray, broadcast television, and every modern video camera
            from a phone to an ARRI Alexa record at 48 kHz. If your MP4
            came from a camera, a screen recording, a video-editing
            timeline, or a streaming-service download, the audio is
            almost certainly 48 kHz. Pro audio software defaults to 48
            kHz for the same reason: it aligns with video without needing
            resampling, and the slightly higher Nyquist limit (24 kHz)
            gives mix engineers a little more room before the
            anti-aliasing filter kicks in.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            For pure listening, 48 kHz is indistinguishable from 44.1
            kHz. The extra 3.95 kHz of bandwidth sits above human
            hearing, and any modern DAC reproduces either rate cleanly.
            The practical reason to pick 48 kHz is workflow: if you are
            extracting audio to drop into a video editor or a DAW that
            runs at 48 kHz, keeping the MP3 at 48 kHz avoids an
            unnecessary resample step.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Lower rates: 22.05 kHz and below
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The MPEG-2 Layer III standard adds three lower sample rates:
            16 kHz, 22.05 kHz, and 24 kHz. These exist for content where
            the audible bandwidth is narrower than music. Speech tops out
            around 8 kHz — consonants like /s/ and /f/ carry most of
            their information between 4 and 8 kHz — so 22.05 kHz captures
            the entire useful range of the human voice with room to
            spare.
          </p>
          <ul className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-3">
              <Mic className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Voice memos and podcasts:</strong> 22.05 kHz.
                Half the data of 44.1 kHz with no audible loss for spoken
                word. Pair with 64 kbps mono and an hour of speech fits in
                under 30 MB.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Mic className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Telephony and dictation:</strong> 16 kHz is the
                standard for VoIP, dictation software, and IVR systems.
                Speech is perfectly intelligible, though music played
                through them sounds muffled.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Mic className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Audiobooks at 8 kHz:</strong> Some legacy
                platforms still distribute at 8 kHz mono. It works for
                narration but blunts consonants. Prefer 22.05 kHz when
                you have the choice.
              </span>
            </li>
          </ul>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Do not go below 22.05 kHz for music. Below that rate, the
            Nyquist limit falls inside the audible range and the encoder
            is forced to filter out high frequencies you can actually
            hear. Cymbals, strings, and reverb tails are the first to
            suffer.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Higher rates: 96 kHz and 192 kHz
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Pro audio often works at 96 kHz or 192 kHz for processing
            headroom during mixing and to push the anti-aliasing filter
            further from the audible band. These rates are useful in the
            studio, where plugins, pitch shifting, and DSP benefit from
            oversampled source material. They are pointless for
            distribution: nothing in the audible spectrum is captured
            above 48 kHz that 44.1 kHz misses, and the MPEG-1 Layer III
            standard caps MP3 at 48 kHz anyway. Feed a 96 kHz source into
            an MP3 encoder and it downsamples to 48 kHz internally before
            encoding — the result is identical to encoding from a 48 kHz
            master.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Resampling: when it matters and when it does not
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Resampling converts audio from one sample rate to another. It
            is lossy in the sense that the new samples are interpolated
            from the old ones, and any content above the new Nyquist
            limit is removed. The question is whether that loss is
            audible.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Activity className="h-5 w-5" />
                <h3 className="text-base font-semibold">
                  48 kHz to 44.1 kHz
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Downsampling removes content above 22.05 kHz, which is
                inaudible anyway. With a good resampler (soxr, the
                algorithm LAME uses), the audible band is preserved
                cleanly. Practically transparent for listening; matters
                only for archival integrity.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Waves className="h-5 w-5" />
                <h3 className="text-base font-semibold">
                  44.1 kHz to 48 kHz
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Upsampling adds no information. The new samples are
                interpolated from the existing ones, and the result
                sounds identical to the original. Useful only when a
                downstream tool requires 48 kHz input.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Activity className="h-5 w-5" />
                <h3 className="text-base font-semibold">
                  48 kHz to 22.05 kHz
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Aggressive downsample that throws away everything above
                11 kHz. Audible on music, fine for speech. Use only when
                file size is the overriding concern and the content is
                voice-only.
              </p>
            </div>
          </div>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The quality of the resampler matters as much as the
            direction. LAME uses soxr by default, a high-quality
            polyphase filter. Cheap converters use
            linear-interpolation resamplers that introduce pre-echo and
            imaging artifacts on transients — if you hear a dull, smeared
            quality after a rate conversion, the resampler is the
            suspect, not the MP3 format. When source and destination
            rates match, no resampling happens and the encoder works
            directly on the original samples; always prefer this when
            you can.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            How the converter handles sample rates
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            By default, the converter preserves the source sample rate —
            an MP4 with 48 kHz audio produces a 48 kHz MP3, and one with
            44.1 kHz audio produces a 44.1 kHz MP3. No resampling, no
            information lost, the output faithful to the source within
            the limits of the MP3 codec. The converter will resample
            automatically only in two cases: if the source rate exceeds
            48 kHz (it downsamples to 48 kHz, the MP3 ceiling), or if you
            explicitly request a different output rate in the advanced
            settings. For step-by-step guidance through the conversion
            flow, see the{" "}
            <Link
              href="/how-to-convert-mp4-to-mp3"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              how to convert MP4 to MP3
            </Link>{" "}
            walkthrough, and the{" "}
            <Link
              href="/mp4-to-mp3-online"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              online converter
            </Link>{" "}
            page itself. The relationship between the container and the
            codec is covered in our{" "}
            <Link
              href="/mp4-vs-mp3"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              MP4 vs MP3
            </Link>{" "}
            explainer.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            The short version
          </h2>
          <ul className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-3">
              <Music className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Music:</strong> 44.1 kHz. CD standard, smallest
                file, universal compatibility. If your MP4 is already
                44.1 kHz, keep it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Video className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Video audio and pro tools:</strong> 48 kHz.
                Matches what cameras, editors, and DAWs expect, avoiding
                an unnecessary resample.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Mic className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Speech:</strong> 22.05 kHz. Half the data of CD
                quality with no audible loss for voice. Pair with 64 kbps
                mono for tiny files.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Above 48 kHz:</strong> pointless for MP3. The
                format caps at 48 kHz, and any higher source will be
                downsampled before encoding anyway.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Waves className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Resampling direction:</strong> downsample
                reluctantly, never upsample for quality. Match the source
                rate when you can.
              </span>
            </li>
          </ul>
        </section>

        <Citations
          sources={[
            { title: "Audio codecs \u2014 MDN", url: "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs", publisher: "Mozilla MDN", note: "Common sample rates (44.1 kHz, 48 kHz) and their use in web audio." },
            { title: "MP3 \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/MP3", publisher: "Wikipedia", note: "MPEG-1 Layer III sample-rate tables and the Nyquist limit on MP3 audio." },
            { title: "FFmpeg codecs documentation", url: "https://ffmpeg.org/ffmpeg-codecs.html", publisher: "FFmpeg", note: "The -ar flag for setting output sample rate in libmp3lame." },
          ]}
        />

        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
          <h2 className="text-xl font-bold">
            Convert MP4 to MP3 at the right sample rate
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Source sample rate preserved by default. Browser-based, no
            upload, no sign-up, no resampling surprises.
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
