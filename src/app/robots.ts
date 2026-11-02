import type { MetadataRoute } from "next";

const baseUrl = "https://www.mp4tomp3.online";

/**
 * robots.txt — explicitly controls crawler access.
 *
 * KEY POLICY:
 *  - Allow major search engines: Googlebot, Bingbot, DuckDuckBot, Yandex,
 *    Baidu, Applebot, FacebookBot, LinkedInBot, Slackbot, TelegramBot
 *  - Allow AI *discovery* crawlers (so they can index/cite us in answers):
 *      OAI-SearchBot (ChatGPT Search), PerplexityBot, ClaudeBot, anthropic-ai,
 *      Google-Extended, CCbot, Bytespider
 *  - Block GPTBot (OpenAI model-training crawler) per owner preference.
 *    Note: OAI-SearchBot is a separate crawler for search discovery and
 *    is NOT used to train OpenAI models — keeping it allowed is essential
 *    so ChatGPT Search can surface this site.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow major search engines — everything
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "DuckDuckBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "YandexBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Baiduspider",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Applebot",
        allow: "/",
        disallow: ["/api/"],
      },
      // Allow ChatGPT Search discovery (separate from GPTBot training crawler)
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/api/"],
      },
      // Allow Perplexity (answer engine)
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/"],
      },
      // Allow Anthropic / Claude
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: ["/api/"],
      },
      // Allow Google's AI training crawler (we want to be cited in AI answers)
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      // Allow Common Crawl (used by many open-source AI projects)
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: ["/api/"],
      },
      // Allow social media bots to render previews
      {
        userAgent: "facebookexternalhit",
        allow: "/",
      },
      {
        userAgent: "Twitterbot",
        allow: "/",
      },
      {
        userAgent: "LinkedInBot",
        allow: "/",
      },
      {
        userAgent: "Slackbot",
        allow: "/",
      },
      {
        userAgent: "TelegramBot",
        allow: "/",
      },
      {
        userAgent: "WhatsApp",
        allow: "/",
      },
      // Block OpenAI's MODEL-TRAINING crawler only.
      // OAI-SearchBot (above) is for search discovery and stays allowed.
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
      // Block known aggressive scrapers / SEO bots that don't drive traffic
      {
        userAgent: "SemrushBot",
        disallow: "/",
      },
      {
        userAgent: "AhrefsBot",
        disallow: "/",
      },
      {
        userAgent: "DotBot",
        disallow: "/",
      },
      {
        userAgent: "MJ12bot",
        disallow: "/",
      },
      {
        userAgent: "BLEXBot",
        disallow: "/",
      },
      // Default rule for everyone else
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
