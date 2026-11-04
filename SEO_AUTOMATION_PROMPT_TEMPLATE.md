# MASTER SEO/AEO/GEO AUTOMATION PROMPT
# Reusable template for any tool or product
# ========================================================
# HOW TO USE:
# 1. Copy this entire file
# 2. Replace all [PLACEHOLDER] values with your product details
# 3. Paste into any AI assistant (ChatGPT, Claude, Gemini, etc.)
# 4. The AI will set up the complete daily SEO system
# ========================================================

## PRODUCT INFORMATION (fill these in)

Product name: [YOUR_PRODUCT_NAME]
Product URL: [https://www.yourdomain.com]
Product type: [online tool / SaaS / mobile app / browser extension / desktop software / API service / other]
Primary keyword: [YOUR_PRIMARY_KEYWORD]
Secondary keywords: [keyword1, keyword2, keyword3, keyword4, keyword5]
Target market: [worldwide / USA / UK / India / Bangladesh / specific country]
Primary language: [English / Bengali / Hindi / Spanish / other]
Tech stack: [Next.js / React / WordPress / Webflow / other]
Analytics ID: [GTM-XXXXXXX or G-XXXXXXXX]
GitHub repo: [https://github.com/username/repo]
Git token: [ghp_xxxxxxxxxxxx]
Cron timezone: [Asia/Dhaka / America/New_York / Europe/London / other]

## PRODUCT DESCRIPTION (2-3 sentences)

[Describe what your product does, who it's for, and what makes it unique. Example: "Free online MP4 to MP3 converter that runs entirely in the browser using FFmpeg.wasm. Files never leave the user's device. No sign-up, no watermark, no software install."]

## KEY FEATURES (list 5-10)

1. [Feature 1]
2. [Feature 2]
3. [Feature 3]
4. [Feature 4]
5. [Feature 5]

## TARGET AUDIENCE

- Primary: [e.g., content creators, podcasters, students]
- Secondary: [e.g., developers, marketers, small business owners]
- Pain point solved: [e.g., "converting video to audio without installing software"]

## CONTENT PLAN PARAMETERS

Days: [30 or 15 or 45 — how many days to run]
Pages per day: [3 or 6 or 9]
Words per page: [500-800 or 800-1500 or 1500-2500]
Content depth: [basic / standard / comprehensive]

---

# ========================================================
# AUTOMATION INSTRUCTIONS (do not modify below this line)
# ========================================================

## OBJECTIVE

Set up a complete daily SEO + AEO + GEO content automation system for [YOUR_PRODUCT_NAME]. The system should run daily, create [PAGES_PER_DAY] new SEO-optimized content pages, update sitemap and llms.txt, commit and push to GitHub, and ping IndexNow to notify search engines.

## PHASE 1: SETUP (one-time, do this first)

### 1.1 Create SEO Content Plan

Create a file at `[PROJECT_ROOT]/SEO_CONTENT_PLAN.md` with [DAYS × PAGES_PER_DAY] page topics organized into batches of [PAGES_PER_DAY]. Each batch should contain [PAGES_PER_DAY] pages.

Content categories to cover (adjust for your product):

**Device/Platform guides** (15% of content)
- How to use [PRODUCT] on iPhone/Android/Mac/Windows/Linux
- How to use [PRODUCT] on Chrome/Safari/Firefox/Edge
- How to use [PRODUCT] on iPad/Tablet

**Format/Feature comparisons** (15% of content)
- [Competitor feature] vs [your feature]
- [Format A] vs [Format B]
- [Method 1] vs [Method 2]

**Use cases** (20% of content)
- Use [PRODUCT] for [use case 1]
- Use [PRODUCT] for [use case 2]
- Use [PRODUCT] for [use case 3]

**Quality/Advanced guides** (15% of content)
- Best quality settings for [PRODUCT]
- Advanced features of [PRODUCT]
- Pro tips for [PRODUCT]

**Troubleshooting** (10% of content)
- Fix: [common error 1]
- Fix: [common error 2]
- Why [PRODUCT] is slow/failing

**Educational** (10% of content)
- What is [concept 1]?
- What is [concept 2]?
- How does [technology] work?

**Long-tail keywords** (10% of content)
- [primary keyword] + [modifier: free/online/no signup/best/2026]
- [primary keyword] + [modifier: for X/from Y/with Z]

**Legal/Trust/Privacy** (5% of content)
- Is [PRODUCT] legal/safe/private?
- [PRODUCT] GDPR/privacy policy
- [PRODUCT] vs alternatives

Each page entry should include:
```
## Batch N
1. `/url-slug` — Page Title (brief description)
2. `/url-slug` — Page Title (brief description)
3. `/url-slug` — Page Title (brief description)
```

### 1.2 Create Tracking File

Create `[PROJECT_ROOT]/scripts/seo-batch-state.json`:
```json
{
  "lastBatchCompleted": 0,
  "nextBatch": 1,
  "totalBatches": [TOTAL_BATCHES],
  "pagesPerBatch": [PAGES_PER_DAY],
  "completedPages": [],
  "createdAt": "[TODAY_DATE]",
  "lastRunAt": null,
  "status": "ready"
}
```

### 1.3 Set Up Git Credentials

```bash
git config --global credential.helper store
echo "https://[GITHUB_USERNAME]:[GIT_TOKEN]@github.com" > ~/.git-credentials
chmod 600 ~/.git-credentials
cd [PROJECT_ROOT]
git remote set-url origin https://github.com/[USERNAME]/[REPO].git
```

### 1.4 Create Daily Cron Job

Schedule a cron job that runs daily at [CRON_TIME] in [CRON_TIMEZONE] timezone. The cron job should execute the Daily Content Creation Prompt (see Phase 2).

## PHASE 2: DAILY CONTENT CREATION PROMPT

This is the prompt that the cron job executes every day:

---

### DAILY SEO CONTENT CREATION TASK

You are a scheduled SEO content agent for [YOUR_PRODUCT_NAME] ([PRODUCT_URL]). Your job is to create [PAGES_PER_DAY] new SEO-optimized content pages every day, then notify search engines.

#### Step 1: Read the tracking file

Read `[PROJECT_ROOT]/scripts/seo-batch-state.json` to find the `nextBatch` number. If `nextBatch` > `totalBatches`, report 'All batches complete. SEO content plan fully executed.' and stop.

#### Step 2: Read the content plan

Read `[PROJECT_ROOT]/SEO_CONTENT_PLAN.md`. Find the batch matching `nextBatch`. It lists [PAGES_PER_DAY] page topics with URL slugs and descriptions.

#### Step 3: Check for existing pages

Before creating each page, check if `src/app/<slug>/page.tsx` (or equivalent for your framework) already exists. If it does, skip that page. Only create pages that don't exist.

#### Step 4: Create each page

For each page, create the file following these rules:

**4.1 Metadata:**
- Unique title (50-60 chars), primary keyword first
- Meta description (120-160 chars), includes primary + secondary keyword
- Canonical URL: `https://[DOMAIN]/<slug>`
- OpenGraph + Twitter card metadata
- OG image reference

**4.2 Structured Data (JSON-LD):**
- Article schema for informational pages
- HowTo schema for tutorial/guide pages
- FAQPage schema if page has Q&A section
- BreadcrumbList if using breadcrumbs
- Include: headline, description, author (Organization), publisher, mainEntityOfPage, datePublished, dateModified

**4.3 Page Structure:**
- H1: Primary keyword, exact match, 30-60 chars
- QuickAnswer block (for voice search/AEO): 40-60 words, conversational, answers the page's main question directly
- 2-3 H2 headings with keyword variations
- Body content: [WORDS_PER_PAGE] words, genuinely useful, unique
- 2-3 internal links to related pages on the site
- CTA at the end linking to the main product/tool page

**4.4 Content Guidelines:**
- Write for humans, not search engines
- Natural keyword usage (1-2% density, no stuffing)
- Use simple, conversational language
- Include concrete examples and numbers
- Mention the brand name once per page
- Address the user directly (use "you")
- Each paragraph 3-5 sentences
- Use lists and tables where appropriate
- No fluff, no padding, no AI-generated filler

**4.5 Voice Search Optimization (AEO):**
- QuickAnswer block tagged with `.speakable` CSS class
- Answers start directly (no "Yes," "Sure," "Great question")
- Conversational tone, like explaining to a friend
- 40-60 words in the QuickAnswer (voice assistants read this aloud)

**4.6 AI Engine Optimization (GEO):**
- Clear, factual, citable content
- Brand mentioned naturally
- Technical accuracy (verify all claims)
- Original explanations, not copied from competitors
- Structured data helps AI engines parse content

#### Step 5: Update sitemap

Add each new page path to the sitemap (sitemap.xml or sitemap.ts for Next.js). Use priority 0.8 and changeFrequency 'monthly' for content pages.

#### Step 6: Update llms.txt

Add each new page URL to `public/llms.txt` under the `## Links` section. This helps AI engines (ChatGPT, Perplexity, Claude, Gemini) discover and cite your content.

#### Step 7: Update tracking file

Edit `[PROJECT_ROOT]/scripts/seo-batch-state.json`:
- Set `lastBatchCompleted` to the batch number just completed
- Set `nextBatch` to `lastBatchCompleted + 1`
- Add the new page paths to `completedPages` array
- Set `lastRunAt` to today's date
- Set `status` to `'completed'`

#### Step 8: Commit and push

```bash
cd [PROJECT_ROOT]
git add -A
git commit -m "📝 Daily SEO Batch #<N>: [PAGES_PER_DAY] new content pages

Pages created:
- /<slug1>
- /<slug2>
- /<slug3>

Each page includes: unique metadata, JSON-LD schema, QuickAnswer
block for voice search, [WORDS_PER_PAGE] words of unique content,
internal links, and CTA.

Updated: sitemap, llms.txt"
git push origin main
```

#### Step 9: Ping IndexNow

After push, notify search engines about the new URLs:

```bash
curl -s -X POST https://[DOMAIN]/api/indexnow \
  -H 'Content-Type: application/json' \
  -d '{"urlList":["https://[DOMAIN]/<slug1>","https://[DOMAIN]/<slug2>","https://[DOMAIN]/<slug3>"]}'
```

This pings: Bing, Yandex, Naver, Seznam, Yep.

#### Step 10: Report

Report a summary:
- Batch number completed
- Page URLs created
- Sitemap total URL count
- IndexNow ping result
- Next batch number
- Pages remaining (out of total)

---

## PHASE 3: TECHNICAL SEO CHECKLIST (one-time setup)

### 3.1 Robots.txt

Ensure robots.txt allows:
- Googlebot, Bingbot, DuckDuckBot, YandexBot, Baiduspider, Applebot
- OAI-SearchBot (ChatGPT Search discovery)
- PerplexityBot (Perplexity answers)
- ClaudeBot, anthropic-ai (Claude)
- Google-Extended (Google AI training)
- CCBot (Common Crawl)
- Social bots: FacebookBot, Twitterbot, LinkedInBot, Slackbot, TelegramBot, WhatsApp

Block:
- GPTBot (if you don't want OpenAI model training — separate from OAI-SearchBot)
- SEO scrapers: AhrefsBot, SemrushBot, DotBot, MJ12bot, BLEXBot

### 3.2 Sitemap

Generate sitemap.xml with all indexable URLs. Include:
- Homepage (priority 1.0)
- Tool/converter pages (priority 0.9)
- Content pages (priority 0.8)
- Resource pages (priority 0.7)
- Policy pages (priority 0.3)
- lastmod dates
- changeFrequency

### 3.3 Structured Data (site-wide)

Implement these JSON-LD schemas globally:
- Organization (name, url, logo, description, contactPoint)
- WebSite (name, url, description, potentialAction for search)
- WebApplication (name, applicationCategory, operatingSystem, offers, featureList, audience)
- SpeakableSpecification (cssSelector pointing to .speakable class)

### 3.4 llms.txt

Create `public/llms.txt` with:
- Product name and description
- Primary use cases
- Supported features/formats
- How it works
- Limitations
- Privacy policy summary
- All page links

### 3.5 IndexNow Setup

- Generate a random key (32 hex chars)
- Create `public/<key>.txt` with the key as content
- Create API endpoint at `/api/indexnow` that:
  - Accepts POST with `{urlList: [...]}`
  - Validates URLs are on your domain
  - Pings `https://api.indexnow.org/IndexNow`
  - Key stays server-side only

### 3.6 Analytics (GTM)

- Install Google Tag Manager (container ID: [GTM_ID])
- Load in `<head>` via Next.js Script component
- Initialize dataLayer
- Track events: page_view, tool_use_start, tool_use_success, tool_use_error, download
- NEVER send PII, filenames, URLs, or file contents
- Send file size as coarse bucket (0-5MB, 5-25MB, 25-100MB, 100MB+)

### 3.7 OG Image

Create an OG image (1200x630 or square 1200x1200):
- Product name
- Tagline
- Brand colors
- Clean, modern design

### 3.8 Performance

- Font loading: `display: 'swap'` to avoid FOIT
- Preconnect to CDNs used by the app
- Lazy-load non-critical scripts
- Optimize images with next/image (or equivalent)
- Target: LCP < 2.5s, INP < 200ms, CLS < 0.1

---

## PHASE 4: AI SEARCH VISIBILITY (ongoing)

### 4.1 AI Crawler Access

Ensure these crawlers can access your site:
- OAI-SearchBot → ChatGPT Search
- PerplexityBot → Perplexity
- ClaudeBot, anthropic-ai → Claude
- Google-Extended → Google AI Overviews
- CCBot → Common Crawl (open-source AI)

### 4.2 Conversational Content

All content should be:
- Written conversationally (like explaining to a friend)
- Direct answers first (no "Yes," "Sure," fluff)
- Brand mentioned once per page
- Concrete numbers and examples
- Second person ("you") addressing

### 4.3 QuickAnswer Blocks

Every content page should have a QuickAnswer block:
- 40-60 words
- Tagged with `.speakable` CSS class
- Directly answers the page's main question
- Conversational tone
- Brand-named

### 4.4 FAQ Schema

Include FAQPage schema on pages with Q&A:
- Questions written as users actually speak them
- "How do I..." "What is..." "Can I..." "Is it..."
- Answers start directly with the answer
- 5-20 questions per FAQ page

### 4.5 30 AI Visibility Test Questions

Create a list of 30 questions users might ask AI tools about your product. Test monthly:
1. How do I [primary use case]?
2. What is the best [product category]?
3. Is [product category] legal/safe?
4. How to [use case] on [device]?
5. [Competitor] vs [your product]?
... (continue for 30 questions)

---

## PHASE 5: MONITORING (weekly)

### 5.1 Google Search Console
- Check indexing status
- Review search queries driving traffic
- Monitor crawl errors
- Submit new URLs for indexing

### 5.2 Bing Webmaster Tools
- Check indexing status
- Verify IndexNow pings are working
- Review search queries

### 5.3 AI Engine Test
- Test 30 visibility questions in ChatGPT, Perplexity, Claude, Gemini
- Note which questions your site is cited for
- Identify content gaps

### 5.4 Analytics
- Review event tracking (tool_use_start, tool_use_success, download)
- Monitor conversion rate
- Track which pages drive most tool usage

---

## RULES (do not break these)

1. NEVER create content for copyright-infringing use cases
2. NEVER add fake ratings, reviews, or made-up statistics
3. NEVER keyword stuff — write natural, helpful content
4. NEVER duplicate content from existing pages
5. NEVER block legitimate search/AI crawlers (Googlebot, Bingbot, OAI-SearchBot, PerplexityBot, ClaudeBot)
6. ALWAYS include QuickAnswer block for voice search
7. ALWAYS include JSON-LD schema
8. ALWAYS add internal links
9. ALWAYS update sitemap after creating pages
10. ALWAYS ping IndexNow after pushing
11. ALWAYS write for humans first, search engines second
12. ALWAYS mention the brand name naturally once per page

---

## CUSTOMIZATION NOTES

### For different product types:

**Online tool (converter/calculator/generator):**
- Focus on "how to use" guides
- Format/feature comparisons
- Use case tutorials
- Quality settings guides

**SaaS product:**
- Feature deep-dives
- Integration guides
- Comparison vs competitors
- Use case tutorials
- Pricing/ROI content

**Mobile app:**
- Device-specific guides
- Feature tutorials
- Troubleshooting
- App store optimization content

**API service:**
- Integration guides
- Code examples
- Use case tutorials
- API reference content

### For different languages:
- Adjust keyword research for target language
- Use native speaker for content review
- Localize examples and cultural references
- Adjust for local search engines (Baidu for China, Naver for Korea, etc.)

### For different markets:
- USA: Google-focused, English content
- Europe: Multi-language, GDPR compliance
- Asia: Local search engines, local languages
- Worldwide: English-first, multi-language support

---

## TEMPLATE END

Replace all [PLACEHOLDER] values above with your product details, then paste the entire template into your AI assistant to set up the complete daily SEO + AEO + GEO automation system.
