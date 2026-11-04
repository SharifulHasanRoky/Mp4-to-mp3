import { NextRequest, NextResponse } from "next/server";

/**
 * Own CORS proxy endpoint.
 *
 * Why we need this:
 *   - Browser CORS rules block client-side fetch() from cross-origin URLs
 *     that don't send Access-Control-Allow-Origin. Google Drive, Dropbox,
 *     and many personal websites don't send this header.
 *   - Public CORS proxies (allorigins, corsproxy.io, codetabs) are
 *     unreliable — they rate-limit, require API keys, or go down.
 *   - By hosting our own proxy on Vercel, we control reliability and
 *     can stream the response back to the browser.
 *
 * What this endpoint does:
 *   1. Receives a `?url=...` query parameter from the browser.
 *   2. Validates the URL is http(s).
 *   3. Fetches it server-side (no CORS restriction server-side).
 *   4. Streams the response body back to the browser with
 *      Access-Control-Allow-Origin: * so the browser accepts it.
 *
 * SECURITY:
 *   - Only allows GET method.
 *   - Refuses to proxy localhost / private IPs (SSRF protection).
 *   - Caps response size at 500 MB (matches our conversion limit).
 *   - Sets a 90-second timeout on the upstream fetch.
 *   - Forwards Content-Type, Content-Length, and Content-Disposition
 *     so the browser treats the response as the original file.
 *
 * USAGE from the browser:
 *   fetch(`/api/proxy?url=${encodeURIComponent(targetUrl)}`)
 *     .then(res => res.blob())
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120; // Vercel Pro allows up to 300s; we cap at 120

const MAX_BYTES = 500 * 1024 * 1024; // 500 MB
const FETCH_TIMEOUT_MS = 90_000;

// SSRF protection: block localhost, link-local, private IP ranges
function isForbiddenHost(hostname: string): boolean {
  const h = hostname.toLowerCase();
  if (h === "localhost" || h.endsWith(".localhost")) return true;
  if (h === "0.0.0.0" || h.startsWith("0.")) return true;
  // Block common private network ranges
  if (/^10\./.test(h)) return true;
  if (/^192\.168\./.test(h)) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(h)) return true;
  if (/^169\.254\./.test(h)) return true; // link-local
  if (/^127\./.test(h)) return true; // loopback
  if (h.startsWith("::1") || h.startsWith("fc") || h.startsWith("fd")) return true; // IPv6 loopback / ULA
  return false;
}

export async function GET(req: NextRequest) {
  const targetUrl = req.nextUrl.searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json(
      { error: "Missing 'url' query parameter." },
      { status: 400 }
    );
  }

  let parsed: URL;
  try {
    parsed = new URL(targetUrl);
  } catch {
    return NextResponse.json(
      { error: "Invalid URL. Must be a valid http(s) URL." },
      { status: 400 }
    );
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return NextResponse.json(
      { error: "Only http(s) URLs are supported." },
      { status: 400 }
    );
  }

  if (isForbiddenHost(parsed.hostname)) {
    return NextResponse.json(
      { error: "This host is blocked for security reasons." },
      { status: 403 }
    );
  }

  // Build upstream fetch with timeout
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const upstreamRes = await fetch(parsed.toString(), {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        // Some hosts (Google Drive, Dropbox) behave differently for
        // browsers vs servers. Pretend to be a normal browser so we get
        // the actual file instead of an interstitial page.
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    if (!upstreamRes.ok) {
      return NextResponse.json(
        {
          error: `Upstream returned HTTP ${upstreamRes.status} ${upstreamRes.statusText}`,
        },
        { status: 502 }
      );
    }

    // Check Content-Length if present — reject early if too big
    const contentLength = upstreamRes.headers.get("content-length");
    if (contentLength) {
      const size = parseInt(contentLength, 10);
      if (!isNaN(size) && size > MAX_BYTES) {
        return NextResponse.json(
          {
            error: `File is too large (${(size / 1024 / 1024).toFixed(
              1
            )} MB). Maximum is 500 MB.`,
          },
          { status: 413 }
        );
      }
    }

    // Stream the body back to the client. Use a TransformStream to
    // enforce the size limit even if Content-Length is missing.
    const reader = upstreamRes.body?.getReader();
    if (!reader) {
      return NextResponse.json(
        { error: "Upstream returned no body." },
        { status: 502 }
      );
    }

    let totalBytes = 0;
    const enforcedStream = new ReadableStream({
      async pull(controller) {
        const { done, value } = await reader.read();
        if (done) {
          controller.close();
          return;
        }
        totalBytes += value.byteLength;
        if (totalBytes > MAX_BYTES) {
          controller.error(
            new Error("Stream exceeded 500 MB limit during download.")
          );
          try {
            await reader.cancel();
          } catch {
            // ignore
          }
          return;
        }
        controller.enqueue(value);
      },
      cancel() {
        try {
          reader.cancel();
        } catch {
          // ignore
        }
      },
    });

    // Forward relevant headers so the browser treats the response correctly
    const responseHeaders = new Headers();
    responseHeaders.set(
      "Content-Type",
      upstreamRes.headers.get("content-type") || "application/octet-stream"
    );
    responseHeaders.set(
      "Content-Length",
      upstreamRes.headers.get("content-length") || ""
    );
    const cd = upstreamRes.headers.get("content-disposition");
    if (cd) responseHeaders.set("Content-Disposition", cd);
    responseHeaders.set("Access-Control-Allow-Origin", "*");
    responseHeaders.set("Access-Control-Allow-Methods", "GET");
    responseHeaders.set("Cache-Control", "no-store");
    responseHeaders.set("X-Proxied-From", parsed.hostname);

    return new NextResponse(enforcedStream, {
      status: 200,
      headers: responseHeaders,
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown upstream fetch error";
    const isTimeout = message.includes("aborted");
    return NextResponse.json(
      {
        error: isTimeout
          ? `Upstream fetch timed out after ${FETCH_TIMEOUT_MS / 1000}s. The file may be too large or the host is too slow.`
          : `Could not fetch the URL: ${message}`,
      },
      { status: isTimeout ? 504 : 502 }
    );
  } finally {
    clearTimeout(timeout);
  }
}

// Allow preflight requests from any origin
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });
}
