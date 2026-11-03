# GTM Setup Guide for MP4toMP3.online

This guide explains how to finish configuring the Google Tag Manager
container `GTM-NW8NRWVZ` so that events fired by the website are
forwarded to Google Analytics 4 (and optionally to Google Ads).

The website code already:
- Loads the GTM container in `<head>` of every page.
- Initializes `window.dataLayer` on first page load.
- Pushes the following custom events to `dataLayer`:

  | Event | When it fires |
  |------|---------------|
  | `file_upload_start` | User clicks the file picker button |
  | `file_upload_success` | A video file has been selected successfully |
  | `url_paste_start` | User clicks Convert in URL mode |
  | `url_paste_success` | A URL has been fetched successfully |
  | `conversion_start` | FFmpeg.wasm has started processing |
  | `conversion_success` | Conversion has finished, output is ready |
  | `conversion_error` | Conversion failed (with `error_type` category) |
  | `mp3_download` | User clicked Download MP3 |
  | `wav_download` | User clicked Download WAV |
  | `mp4_download` | User clicked Download MP4 |
  | `tool_page_view` | Reserved — not currently fired automatically |

Each event includes the following parameters (where relevant):

- `format`: "mp3" | "wav" | "mp4"
- `source`: "upload" | "url"
- `size_bucket`: "0-5MB" | "5-25MB" | "25-100MB" | "100MB+"
  (coarse bucket only — never the exact file size)
- `error_type`: category string like "fetch_failed", "ffmpeg_error",
  "timeout", "file_too_large", "unsupported_platform", "unknown"
- `page`: pathname of the page the conversion happened on (e.g. "/",
  "/mp3-extractor", "/mov-to-mp3")

No PII, no filenames, no URLs, no file contents are ever sent.

---

## Step 1 — Open the GTM container

1. Go to https://tagmanager.google.com/
2. Sign in with the Google account that owns `GTM-NW8NRWVZ`.
3. Click the container (workspace called "MP4toMP3.online" or default).

---

## Step 2 — Set up the GA4 Configuration Tag

1. In the left sidebar, click **Tags → New**.
2. Click **Tag Configuration → Google Analytics: GA4 Configuration**.
3. Paste your **GA4 Measurement ID** (format: `G-XXXXXXXXXX`).
   - If you don't have a GA4 property yet, create one at
     https://analytics.google.com/ → Admin → Create Property.
4. Click **Triggering → All Pages**.
5. Name the tag `GA4 - Configuration - All Pages`.
6. Click **Save**.

This tag will fire on every page view and establish the GA4 session.

---

## Step 3 — Set up GA4 Event Tags for each custom event

Repeat the following for each of these events:

- `conversion_start`
- `conversion_success`
- `conversion_error`
- `mp3_download`
- `wav_download`
- `mp4_download`

For each event:

1. **Tags → New → Tag Configuration → Google Analytics: GA4 Event**.
2. Select the configuration tag from Step 2.
3. Event name: the exact event name from the table above
   (e.g. `conversion_success`).
4. (Optional) Add event parameters:
   - `format`
   - `source`
   - `size_bucket`
   - `error_type` (only for `conversion_error`)
   - `page`
5. **Triggering → New → Custom Event**.
6. Event name (regex): the exact event name (e.g. `^conversion_success$`).
7. Save the trigger.
8. Save the tag with name `GA4 - Event - <event_name>`.

You should end up with ~7 event tags + 1 configuration tag = 8 total.

---

## Step 4 — (Optional) Google Ads conversion tracking

If you want to track `conversion_success` as a Google Ads conversion:

1. In Google Ads, get your Conversion ID and Conversion Label.
2. In GTM, create a new tag: **Google Ads Conversion Tracking**.
3. Paste Conversion ID and Conversion Label.
4. Set Triggering to the `conversion_success` custom event trigger
   you created in Step 3.
5. Save and publish.

This is optional — only useful if you're running paid ads.

---

## Step 5 — Submit and Publish

1. Click the **Submit** button in the top right of GTM.
2. Add a version name like `v1.0 — GA4 events wired up`.
3. Add a description: `First production release with GA4 event tracking
   for upload, conversion, and download flows.`
4. Click **Publish**.

Your changes are now live on www.mp4tomp3.online.

---

## Step 6 — Verify with Tag Assistant

1. Install the Chrome extension "Tag Assistant" (by Google).
2. Go to https://www.mp4tomp3.online/
3. Click the Tag Assistant icon → **Connect**.
4. Upload a video and click Convert.
5. Tag Assistant will show which tags fired, in what order.

You should see:
- `GA4 - Configuration - All Pages` on page load
- `GA4 - Event - file_upload_success` after file selection
- `GA4 - Event - conversion_start` when you click Convert
- `GA4 - Event - conversion_success` when conversion finishes
- `GA4 - Event - mp3_download` when you click Download

---

## Step 7 — Alternative verification: browser console

Open browser DevTools (F12) → Console, and run:

```js
window.debugAnalytics()
```

This will print a table of the last 10 custom events. Other useful commands:

```js
window.debugAnalytics().count()      // total custom events so far
window.debugAnalytics().all()        // all events
window.debugAnalytics().last(5)     // last 5 events
window.debugAnalytics().reset()     // clear dataLayer (dev only)
```

Or inspect the raw dataLayer directly:

```js
window.dataLayer
```

---

## What NOT to do

- ❌ Do NOT install gtag.js directly in the Next.js app. The website
  already loads GTM, and adding gtag.js alongside it will cause
  duplicate page views.
- ❌ Do NOT create a second GTM container. Use `GTM-NW8NRWVZ` only.
- ❌ Do NOT push raw file sizes to GA4. The code already converts them
  to coarse buckets (0-5MB, 5-25MB, 25-100MB, 100MB+) — preserve
  this when mapping parameters in GTM.
- ❌ Do NOT push filenames, URLs, or file contents. The website code
  never does this; do not add parameters in GTM that reference
  `{{Page URL}}` or `{{Click Element}}` from conversion events.

---

## Event parameters reference

Use these names exactly when mapping event parameters in GA4:

| Parameter | Type | Example values | Available on events |
|-----------|------|----------------|---------------------|
| `format` | string | mp3, wav, mp4 | conversion_start, conversion_success, conversion_error, *_download |
| `source` | string | upload, url | file_upload_*, url_paste_*, conversion_* |
| `size_bucket` | string | 0-5MB, 5-25MB, 25-100MB, 100MB+ | file_upload_success, url_paste_success |
| `error_type` | string | fetch_failed, ffmpeg_error, timeout, file_too_large, unsupported_platform, invalid_gdrive_url, unknown | conversion_error |
| `page` | string | /, /mp3-extractor, /mov-to-mp3, /how-to-convert-mp4-to-mp3 | all events |

---

## What's left after this

Once Steps 1-5 are done, your analytics pipeline is complete. The
remaining tasks are:

1. Google Search Console verification (need a verification token)
2. Bing Webmaster Tools setup + sitemap submission
3. IndexNow ping for new/updated URLs (already wired up via
   `POST /api/indexnow`)
4. Add `verification.google` token to `src/app/layout.tsx` once
   you have it from Search Console
