import { ReactNode } from "react";

interface QuickAnswerProps {
  /** The short, conversational answer — 1-3 sentences max. This is what
   * gets read aloud by Google Assistant/Alexa/Siri, and what gets shown
   * as a featured snippet. Should be self-contained: makes sense even
   * without seeing the surrounding page.
   */
  children: ReactNode;
  /** Optional label shown above the answer (defaults to "Quick Answer"). */
  label?: string;
}

/**
 * QuickAnswer — a small highlighted box at the top of an article that
 * directly answers the user's question in 1-3 sentences.
 *
 * Why this matters for voice search and AEO:
 *   - Google Assistant, Alexa, and Siri typically read the FIRST ~40-60
 *     words of an answer aloud. We tag this block with the .speakable
 *     class so the Speakable JSON-LD schema points at it.
 *   - ChatGPT/Perplexity/Claude prefer pages that answer the question
 *     directly in the first paragraph — they're more likely to cite
 *     pages with clear, short answers.
 *   - Google's featured snippets almost always pull from a "Quick
 *     Answer" / "TL;DR" / "Key Takeaway" block at the top of an article.
 *
 * Format rules (enforced by convention, not by code):
 *   - 40-60 words max for the spoken portion
 *   - Start with the answer, not with "Yes" or "Sure"
 *   - Use simple, conversational language
 *   - Mention the brand once ("MP4toMP3.online") so voice assistants
 *     can attribute the source
 */
export function QuickAnswer({ children, label = "Quick Answer" }: QuickAnswerProps) {
  return (
    <div className="speakable my-6 rounded-2xl border-l-4 border-primary bg-primary/5 p-5 shadow-sm">
      <p className="mb-1 text-xs font-bold uppercase tracking-wide text-primary">
        {label}
      </p>
      <div className="text-base leading-relaxed text-foreground sm:text-lg">
        {children}
      </div>
    </div>
  );
}
