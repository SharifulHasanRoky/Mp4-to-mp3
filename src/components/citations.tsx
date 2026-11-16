import Link from "next/link";
import { BookOpen, ExternalLink } from "lucide-react";

/**
 * A single source citation.
 *
 * - `title`: the title of the source page/article/spec
 * - `url`: the canonical URL of the source
 * - `publisher`: the publishing organization (e.g. "Mozilla MDN", "Wikipedia", "IETF")
 * - `note`: optional short note on what the source supports in the article
 */
export interface Citation {
  title: string;
  url: string;
  publisher?: string;
  note?: string;
}

interface CitationsProps {
  sources: Citation[];
}

/**
 * Renders a "Sources & References" section at the bottom of an article page.
 *
 * Why this exists:
 * - Google's E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
 *   guidance rewards pages that cite authoritative external sources.
 * - Voice/AI answer engines (Google AI Overviews, ChatGPT search, Perplexity)
 *   prefer to summarize pages that link to primary sources.
 * - Readers can verify claims by clicking through.
 *
 * Use at the END of the article body, just before the CTA box.
 */
export function Citations({ sources }: CitationsProps) {
  if (!sources || sources.length === 0) return null;

  return (
    <section
      aria-labelledby="sources-heading"
      className="mt-10 rounded-xl border border-border/60 bg-muted/30 p-5 sm:p-6"
    >
      <h2
        id="sources-heading"
        className="flex items-center gap-2 text-lg font-semibold"
      >
        <BookOpen className="h-5 w-5 text-primary" aria-hidden="true" />
        Sources &amp; References
      </h2>
      <ol className="mt-4 space-y-3">
        {sources.map((source, index) => (
          <li
            key={source.url}
            className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
          >
            <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              {index + 1}
            </span>
            <span>
              <Link
                href={source.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="font-medium text-foreground underline-offset-2 hover:underline"
              >
                {source.title}
                <ExternalLink
                  className="ml-1 inline-block h-3 w-3 align-baseline"
                  aria-hidden="true"
                />
              </Link>
              {source.publisher && (
                <span className="text-muted-foreground">
                  {" "}
                  — {source.publisher}
                </span>
              )}
              {source.note && (
                <span className="block text-muted-foreground/80">
                  {source.note}
                </span>
              )}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
