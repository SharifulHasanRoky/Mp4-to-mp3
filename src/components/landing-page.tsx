import Link from "next/link";
import { AudioExtractor } from "@/components/audio-extractor";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { AllToolsGrid } from "@/components/all-tools-grid";
import { ArrowRight, FileAudio, Check } from "lucide-react";

interface LandingPageProps {
  /** Page H1, also used as JSON-LD name */
  h1: string;
  /** Page subtitle shown under H1 */
  subtitle: string;
  /** Primary SEO keyword for this page */
  keyword: string;
  /** FAQ items for this landing page */
  faqItems: { q: string; a: string }[];
  /** Unique SEO content blocks */
  contentBlocks: { heading: string; paragraphs: string[]; list?: string[] }[];
  /** Bullet list of "what you can do" highlights */
  highlights: string[];
  /** Optional internal links to weave into content (related tools) */
  internalLinks?: { text: string; href: string }[];
  /** Custom upload area title (defaults to "Drop your video file here") */
  uploadTitle?: string;
  /** Custom upload hint */
  uploadHint?: string;
  /** Custom button label */
  buttonLabel?: string;
  /** Path of this page, used to exclude from related tools */
  currentPath: string;
  /** Output format passed to the backend: mp3 (default), wav, or mp4 */
  outputFormat?: "mp3" | "wav" | "mp4";
}

export function LandingPage({
  h1,
  subtitle,
  keyword,
  faqItems,
  contentBlocks,
  highlights,
  internalLinks = [],
  uploadTitle,
  uploadHint,
  buttonLabel,
  currentPath,
  outputFormat = "mp3",
}: LandingPageProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: h1,
    description: subtitle,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: h1 },
    ],
  };

  return (
    <>
      <JsonLd data={[jsonLd, faqJsonLd, breadcrumbJsonLd]} />

      {/* Breadcrumb */}
      <div className="border-b border-border/40 bg-secondary/20">
        <nav
          className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-2 text-xs text-muted-foreground sm:px-6 lg:px-8"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground">{h1}</span>
        </nav>
      </div>

      {/* Hero with tool */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% -20%, hsl(var(--primary) / 0.15), transparent)",
          }}
        />
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
                <FileAudio className="h-3.5 w-3.5" /> Free Online Tool
              </div>
              <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
                {h1}
              </h1>
              <p className="mt-5 text-base text-muted-foreground sm:text-lg">
                {subtitle}
              </p>

              <ul className="mt-7 grid gap-2 text-left text-sm">
                {highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span className="text-muted-foreground">{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 hidden lg:block">
                <a
                  href="#extractor"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90"
                >
                  <FileAudio className="h-4 w-4" /> Start now
                </a>
              </div>
            </div>

            <AudioExtractor
              uploadTitle={uploadTitle}
              uploadHint={uploadHint}
              primaryButtonLabel={buttonLabel}
              outputFormat={outputFormat}
            />
          </div>
        </div>
      </section>

      {/* SEO content blocks */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {contentBlocks.map((block, idx) => (
          <div key={idx} className="mt-10 first:mt-0">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {block.heading}
            </h2>
            {block.paragraphs.map((p, pIdx) => (
              <p
                key={pIdx}
                className="mt-4 text-base leading-relaxed text-muted-foreground"
                dangerouslySetInnerHTML={{
                  __html: weaveLinks(p, internalLinks),
                }}
              />
            ))}
            {block.list && (
              <ul className="mt-4 space-y-2 text-base leading-relaxed text-muted-foreground">
                {block.list.map((li, liIdx) => (
                  <li key={liIdx} className="flex items-start gap-2">
                    <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                    <span dangerouslySetInnerHTML={{ __html: weaveLinks(li, internalLinks) }} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>

      {/* All tools / cross-link grid */}
      <AllToolsGrid
        exclude={[currentPath]}
        title="Related converters & tools"
        subtitle="Looking for a different conversion? Try one of these:"
      />

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <Faq items={faqItems} title={`${keyword} — FAQ`} />
      </section>

      {/* CTA */}
      <section className="border-t border-border/60 bg-gradient-to-b from-background to-accent/30 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Try the {keyword} now
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Free, private, no sign-up. Upload a video you own and get your MP3
            in seconds.
          </p>
          <a
            href="#extractor"
            className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90"
          >
            <FileAudio className="h-4 w-4" /> Extract audio
          </a>
        </div>
      </section>
    </>
  );
}

/**
 * Replace [[text|href]] tokens in a string with internal links.
 * Example: "Try our [[MOV to MP3|/mov-to-mp3]] converter" becomes
 * "Try our <a href='/mov-to-mp3'>MOV to MP3</a> converter".
 */
function weaveLinks(input: string, links: { text: string; href: string }[]): string {
  let out = input;
  for (const link of links) {
    const token = `[[${link.text}]]`;
    const replacement = `<a href="${link.href}" class="font-medium text-primary underline-offset-4 hover:underline">${link.text}</a>`;
    out = out.split(token).join(replacement);
  }
  return out;
}
