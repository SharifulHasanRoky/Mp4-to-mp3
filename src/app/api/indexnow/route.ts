import { NextRequest, NextResponse } from "next/server";

/**
 * IndexNow API endpoint.
 *
 * POST a list of URLs to this endpoint and it will ping IndexNow
 * (Bing, Yandex, Naver, Seznam, Yep) to let them know the URLs have
 * changed and should be re-crawled.
 *
 * The IndexNow key file lives at /<KEY>.txt in /public/ so any search
 * engine can verify ownership by fetching that URL.
 *
 * SECURITY: The key is included in this server-side code, NOT in any
 * client-side bundle. The endpoint accepts only POST requests with a
 * JSON body containing a `urlList` array. We never expose the key to
 * the browser.
 *
 * Usage:
 *   POST /api/indexnow
 *   Content-Type: application/json
 *   { "urlList": ["https://www.mp4tomp3.online/", "https://www.mp4tomp3.online/faq"] }
 *
 * Response:
 *   200 OK — pinged successfully
 *   400   — invalid request body
 *   502   — IndexNow service responded with an error
 */

const INDEXNOW_KEY = "334d1ac50a935a11b0eef82609423b9f";
const SITE_URL = "https://www.mp4tomp3.online";
// Use api.indexnow.org for submission; IndexNow distributes to all partners
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/IndexNow";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface IndexNowRequest {
  urlList?: string[];
}

export async function POST(req: NextRequest) {
  let body: IndexNowRequest;
  try {
    body = (await req.json()) as IndexNowRequest;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body. Expected { urlList: string[] }" },
      { status: 400 }
    );
  }

  const urls = Array.isArray(body.urlList) ? body.urlList : [];
  if (urls.length === 0) {
    return NextResponse.json(
      { error: "urlList must contain at least one URL" },
      { status: 400 }
    );
  }

  // Validate URLs — only allow URLs on our own domain
  const validUrls: string[] = [];
  for (const u of urls) {
    try {
      const parsed = new URL(u);
      if (parsed.hostname === "www.mp4tomp3.online" || parsed.hostname === "mp4tomp3.online") {
        validUrls.push(u);
      }
    } catch {
      // skip invalid URLs
    }
  }

  if (validUrls.length === 0) {
    return NextResponse.json(
      { error: "No valid URLs for this domain found in urlList" },
      { status: 400 }
    );
  }

  // IndexNow accepts up to 10,000 URLs per request. We cap at 1000 to be safe.
  const limited = validUrls.slice(0, 1000);

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        host: "www.mp4tomp3.online",
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: limited,
      }),
    });

    if (res.ok) {
      return NextResponse.json({
        ok: true,
        submitted: limited.length,
        skipped: urls.length - limited.length,
      });
    }

    // IndexNow returns 200 on success, 202 if accepted but not yet processed,
    // 422 if the key file is unreachable, 429 if rate-limited.
    return NextResponse.json(
      {
        error: `IndexNow returned HTTP ${res.status}`,
        detail: await res.text().catch(() => ""),
      },
      { status: 502 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    return NextResponse.json(
      { error: `Could not reach IndexNow: ${message}` },
      { status: 502 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    name: "IndexNow ping endpoint",
    description:
      "POST a JSON body { urlList: string[] } to ping IndexNow partners (Bing, Yandex, Naver, Seznam, Yep) about URL changes.",
    documentation: "https://www.indexnow.org/",
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
  });
}
