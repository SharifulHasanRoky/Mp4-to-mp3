import { JsonLd } from "@/components/json-ld";

const SITE_URL = "https://www.mp4tomp3.online";

/**
 * Organization schema — applies site-wide. Tells search engines and AI
 * systems who runs the website. We deliberately do NOT include fake
 * aggregate ratings, reviews, founder names, employee counts, etc.
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MP4toMP3.online",
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.svg`,
  description:
    "Free online MP4 to MP3 converter. Convert video files to MP3, WAV, or MP4 entirely in the browser. No sign-up, no watermark, no server-side upload.",
  sameAs: [],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: `${SITE_URL}/contact`,
      availableLanguage: ["English"],
    },
  ],
};

/**
 * WebSite schema — applies site-wide. Enables sitelinks search box
 * eligibility and gives AI systems a top-level description of the site.
 */
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "MP4toMP3.online",
  url: SITE_URL,
  description:
    "Free online MP4 to MP3 converter. Extract audio from MP4, MOV, WebM, MKV and more — fast, private, runs entirely in your browser.",
  inLanguage: "en",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

/**
 * WebApplication schema — describes the converter tool itself. This is
 * what AI answer engines will use to understand what the tool does,
 * what it costs, and what platforms it runs on.
 *
 * NOTE: We do NOT include aggregateRating, review, or offers with a price
 * higher than 0. The tool is genuinely free.
 */
const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "MP4 to MP3 Converter",
  url: SITE_URL,
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web Browser (any modern browser)",
  browserRequirements:
    "Requires JavaScript and WebAssembly support. Works on Chrome, Firefox, Safari, Edge, Opera on desktop and mobile.",
  description:
    "Free online MP4 to MP3 converter. Upload a video file or paste a URL (Google Drive and Dropbox supported) and extract the audio as a high-quality MP3 file. Conversion happens entirely in your browser using FFmpeg.wasm — no server-side upload, fully private.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free for personal use. No sign-up required.",
  },
  featureList: [
    "Convert MP4 to MP3 (libmp3lame VBR ~190 kbps)",
    "Convert MP4 to WAV (lossless PCM 16-bit 44.1 kHz stereo)",
    "Convert WAV/M4A audio to MP4 video (H.264 + AAC)",
    "Supports MP4, MOV, WebM, MKV, AVI, M4V, FLV, 3GP, MP3, M4A, AAC, WAV, OGG, Opus, FLAC input",
    "Direct file URL input (Google Drive, Dropbox, archive.org, GitHub raw, AWS S3 with CORS)",
    "Client-side processing — files never leave the user's browser",
    "No sign-up, no watermark, no installation",
    "Works on iPhone, Android, Mac, Windows, Linux",
    "Maximum file size: 500 MB",
  ],
  audience: {
    "@type": "Audience",
    audienceType: "General users, podcasters, content creators, students, journalists",
  },
};

/**
 * Speakable schema — tells voice assistants (Google Assistant, Alexa,
 * Siri) which parts of the page are good candidates to be read aloud
 * when a user asks a question like "Hey Google, how do I convert MP4
 * to MP3?"
 *
 * We point at the .speakable CSS class — content blocks tagged with
 * that class are short, direct, conversational answers designed for
 * voice delivery.
 *
 * Spec: https://developers.google.com/search/docs/appearance/structured-data/speakable
 */
const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  url: SITE_URL,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: [".speakable"],
  },
};

/**
 * SiteSchema — drop this once into the root layout. Emits the
 * Organization, WebSite, WebApplication, and Speakable schemas so
 * every page on the site has consistent machine-readable identity
 * AND voice-search optimization.
 */
export function SiteSchema() {
  return (
    <JsonLd
      data={[
        organizationSchema,
        websiteSchema,
        webAppSchema,
        speakableSchema,
      ]}
    />
  );
}
