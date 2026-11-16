import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { QuickAnswer } from "@/components/quick-answer";
import { Citations, type Citation } from "@/components/citations";
import {
  FileAudio,
  Scale,
  ShieldAlert,
  Sparkles,
  GraduationCap,
  Newspaper,
  Search,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Fair Use and MP4 to MP3 Conversion: What You Need to Know",
  description:
    "US fair use can excuse some MP4 to MP3 conversions — criticism, commentary, teaching, parody. Learn the four-factor test and its limits.",
  alternates: { canonical: "/mp4-to-mp3-fair-use" },
  openGraph: {
    title: "Fair Use and MP4 to MP3 Conversion: What You Need to Know",
    description:
      "When does US fair use excuse converting MP4 to MP3? The four-factor test, common use cases, and hard limits.",
    url: "https://www.mp4tomp3.online/mp4-to-mp3-fair-use",
    type: "article",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Fair Use and MP4 to MP3 Conversion: What You Need to Know",
    description:
      "An explanation of how the US fair use doctrine applies to MP4 to MP3 conversion, including the four statutory factors and common qualifying use cases.",
    author: { "@type": "Organization", name: "MP4toMP3.online" },
    publisher: { "@type": "Organization", name: "MP4toMP3.online" },
    mainEntityOfPage: "https://www.mp4tomp3.online/mp4-to-mp3-fair-use",
    datePublished: "2026-11-16",
    dateModified: "2026-11-16",
    citation: [
      "https://en.wikipedia.org/wiki/Fair_use",
      "https://www.copyright.gov/fair-use/",
      "https://www.copyright.gov/",
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell
        title="Fair Use and MP4 to MP3 Conversion"
        subtitle="The fair use doctrine can excuse some otherwise infringing conversions. Here is how it actually works, factor by factor."
      >
        {/* Voice-search quick answer — read aloud by Google Assistant
            when users ask "Does fair use apply to converting MP4 to MP3?" */}
        <QuickAnswer>
          Fair use can apply to converting MP4 to MP3 when the conversion
          serves a transformative purpose like criticism, commentary,
          teaching, news reporting, or parody. US courts weigh four factors:
          purpose, nature, amount used, and market effect. Pure personal
          enjoyment is usually not fair use, and fair use does not apply
          outside the United States.
        </QuickAnswer>

        <section className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-5">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
            <ShieldAlert className="h-5 w-5" />
            <h2 className="text-base font-semibold">
              General information, not legal advice
            </h2>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Fair use is a US-specific doctrine. Its outcome depends on the
            specific facts of each case and is decided by courts after the
            fact, never in advance by a website. This page explains the
            framework so you can reason about your own situation; it is not
            a substitute for advice from a qualified attorney.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            What fair use actually is
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Fair use is an affirmative defense to copyright infringement
            rooted in 17 U.S.C. §107. It does not say that the use is not
            infringement; it says that even though the use would otherwise
            infringe, the law excuses it because of its public benefit.
            Criticism, commentary, news reporting, teaching, scholarship,
            and research are listed in the statute as illustrative
            purposes, but the list is not closed. Whether a particular use
            qualifies depends on the four-factor test the statute sets out,
            applied by a court to the specific facts.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Crucially, fair use is an affirmative defense. That means if
            you are sued, you bear the burden of proving your use qualifies.
            It is not a permission slip you can show to a copyright holder
            in advance. The risk is real, and the doctrine is narrower in
            practice than its popular reputation suggests.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            The four statutory factors
          </h2>
          <div className="mt-4 space-y-4">
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold">
                  1
                </span>
                <h3 className="text-base font-semibold">
                  Purpose and character of the use
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                The most important factor. Courts favor uses that are
                <em> transformative</em> — that add new meaning, message,
                or purpose to the original — over uses that merely
                repurpose the work for the same reason it was created.
                Converting a music video to MP3 so you can listen to the
                song is not transformative; the song is still a song. Using
                a converted clip in a critical video essay that comments on
                the song&apos;s lyrics is.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Commercial uses are weighed against fair use, but commercial
                intent is not dispositive. Nonprofit educational uses get
                more leeway, but again, only one factor among four.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold">
                  2
                </span>
                <h3 className="text-base font-semibold">
                  Nature of the copyrighted work
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Uses of factual or informational works are more likely to be
                fair than uses of highly creative works. Pulling audio from
                a documentary to comment on its claims gets more leeway
                than pulling audio from a song for the same purpose. Unpublished
                works get the strongest protection of all.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold">
                  3
                </span>
                <h3 className="text-base font-semibold">
                  Amount and substantiality used
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Using less of the work weighs in favor of fair use, but
                &quot;less&quot; is judged by both quantity and qualitative
                importance. A three-second clip from a podcast to illustrate
                a point in a critique is more defensible than converting
                the whole episode. For some transformative purposes, using
                the entire work is necessary — but the bar is higher.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold">
                  4
                </span>
                <h3 className="text-base font-semibold">
                  Effect on the potential market
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                The factor that often decides close cases. If your use
                substitutes for the original in its market — meaning people
                would buy the original less because they have your version —
                fair use is unlikely. Converting a song to MP3 instead of
                buying the MP3 directly substitutes, which is why personal
                listening rarely qualifies. A critical review that uses a
                clip does not substitute for the song itself.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Conversion use cases that often qualify
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Newspaper className="h-5 w-5" />
                <h3 className="text-base font-semibold">
                  Criticism and commentary
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                A video essayist converts a snippet of a music video to MP3
                to play during a critical analysis. The use is
                transformative, takes only what is needed, and does not
                substitute for buying the song. Strong fair use candidate.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <GraduationCap className="h-5 w-5" />
                <h3 className="text-base font-semibold">Teaching</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                An instructor converts an excerpt of a documentary to MP3
                for a classroom listening exercise. The purpose is
                educational, the excerpt is bounded, and the use is
                noncommercial. Favored, though classroom guidelines
                recommend limiting clip length.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Sparkles className="h-5 w-5" />
                <h3 className="text-base font-semibold">Parody</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                A comedian uses a converted clip of an original song as the
                musical bed for a parody that mocks the original. Parody that
                comments on the work itself is squarely within fair use —
                the Supreme Court said so in Campbell v. Acuff-Rose Music
                in 1994.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-5">
              <div className="flex items-center gap-2 text-primary">
                <Search className="h-5 w-5" />
                <h3 className="text-base font-semibold">
                  News reporting
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                A journalist converts a brief clip from a leaked recording
                to play during a news segment. The use is transformative —
                the clip is being reported on, not consumed as entertainment
                — and the public benefit is high.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Use cases that almost never qualify
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Personal listening, building a music library from streaming
            sources, sharing converted files with friends, and any
            distribution of the converted MP3 to the public fail the
            transformative test and substitute directly for the market of
            the original work. These uses may be tolerated in practice
            without enforcement, but they are not protected by fair use and
            do not become legal just because nobody has sued yet.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Personal format-shifting of lawfully acquired content sits in a
            gray zone that is sometimes tolerated under separate
            exceptions. That is a different doctrine from fair use and is
            covered in more depth on our{" "}
            <Link
              href="/mp4-to-mp3-personal-use"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              personal use exceptions page
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Fair use is not a magic word
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            One common mistake is to assume that adding the words
            &quot;for educational purposes&quot; or &quot;no copyright
            infringement intended&quot; to a description makes a use fair.
            It does not. Courts look at what the use actually does, not at
            the disclaimers attached to it. A converted clip used without
            transformation in a monetized YouTube video does not become
            fair use because the creator said it was educational.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            The opposite mistake is also common: assuming that any use of
            copyrighted material is automatically infringement. Fair use is
            a real, functioning doctrine that protects a great deal of
            legitimate commentary, scholarship, and education. The point is
            that it has to actually be a fair use — analyzed under the four
            factors — not merely labeled as one.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Outside the United States
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Fair use is a US doctrine. Most other countries have narrower
            specific exceptions instead of a flexible four-factor test. The
            UK and other common-law jurisdictions sometimes recognize
            &quot;fair dealing&quot; for specific purposes like criticism,
            review, and news reporting, but the categories are closed and
            the test is stricter. Civil-law jurisdictions in the EU tend to
            enumerate permitted uses exhaustively and offer no general
            fairness defense. If you are outside the United States, you
            cannot rely on US fair use even if your use would qualify
            there.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            For a broader overview of when conversion is legal at all —
            personal use, format-shifting, distribution, and international
            differences — start with our{" "}
            <Link
              href="/is-mp4-to-mp3-conversion-legal"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              main page on whether MP4 to MP3 conversion is legal
            </Link>
            . Our formal{" "}
            <Link
              href="/copyright"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              copyright and DMCA policy
            </Link>{" "}
            describes how we handle takedown requests.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            A practical self-test
          </h2>
          <ul className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-3">
              <Scale className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Am I adding new meaning or just consuming the
                original?</strong> Commentary, criticism, and parody add
                meaning. Personal listening does not.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Am I using the smallest portion that serves my
                purpose?</strong> Three seconds beats three minutes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Would someone who has my converted file be less
                likely to buy the original?</strong> If yes, the market
                factor cuts against you.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>
                <strong>Am I in the United States?</strong> If not, fair use
                does not apply at all.
              </span>
            </li>
          </ul>
        </section>

        <Citations
          sources={[
            { title: "Fair use \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Fair_use", publisher: "Wikipedia", note: "The four fair-use factors: purpose, nature, amount and market effect." },
            { title: "Fair use index \u2014 U.S. Copyright Office", url: "https://www.copyright.gov/fair-use/", publisher: "U.S. Copyright Office", note: "Official guidance on fair use from the U.S. Copyright Office." },
            { title: "U.S. Copyright Office", url: "https://www.copyright.gov/", publisher: "U.S. Copyright Office", note: "Primary U.S. authority for personal-copying and format-shifting rules." },
          ]}
        />

        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
          <h2 className="text-xl font-bold">
            Convert your own files in your browser
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            MP4toMP3.online runs entirely on your device. No upload, no
            server storage, no sign-up.
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
