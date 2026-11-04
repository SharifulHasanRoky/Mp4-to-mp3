/**
 * Cloud storage URL normalizers.
 *
 * Each function takes a share URL and returns one of:
 *   - { url: string }       → normalized direct-download URL to fetch
 *   - { error: string }     → invalid URL (preview/login page), with
 *                              a clear, helpful message for the user
 *   - null                    → not a URL for this provider, try the next
 *
 * IMPORTANT — what we DO support:
 *   Direct file-sharing services where the user has uploaded their own
 *   file and explicitly shared it as a public link: Google Drive,
 *   Dropbox, OneDrive, MediaFire, Mega, WeTransfer, Box, pCloud,
 *   TeraBox, Send.cm, GoFile, AnonFiles, Catbox, GitHub raw,
 *   archive.org, AWS S3, etc.
 *
 * IMPORTANT — what we DO NOT support (and never will):
 *   Streaming/social platforms where the file is uploaded TO BE
 *   consumed on that platform (not to be downloaded): YouTube,
 *   TikTok, Instagram, Facebook, Twitter/X, Spotify, Netflix,
 *   SoundCloud, Vimeo, Twitch, Dailymotion, etc.
 *   These violate copyright law + platform ToS, and would get the
 *   site DMCA'd and AdSense-banned.
 */

export type NormalizedUrl =
  | { url: string }
  | { error: string }
  | null;

/**
 * Google Drive: convert any share URL format to direct download URL.
 *
 * Supports:
 *   - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 *   - https://drive.google.com/open?id=FILE_ID
 *   - https://drive.google.com/uc?id=FILE_ID
 *   - https://drive.usercontent.google.com/download?id=FILE_ID
 */
export function normalizeGoogleDriveUrl(input: string): NormalizedUrl {
  let parsed: URL;
  try {
    parsed = new URL(input);
  } catch {
    return null;
  }
  const host = parsed.hostname.toLowerCase();
  if (
    host !== "drive.google.com" &&
    host !== "docs.google.com" &&
    host !== "drive.usercontent.google.com"
  ) {
    return null;
  }

  let fileId: string | null = null;
  const pathMatch = parsed.pathname.match(/\/file\/d\/([^/?]+)/);
  if (pathMatch && pathMatch[1]) fileId = pathMatch[1];
  if (!fileId) {
    const idParam = parsed.searchParams.get("id");
    if (idParam) fileId = idParam;
  }
  if (!fileId) return null;

  // confirm=t bypasses the "virus scan warning" interstitial for
  // files larger than 100 MB.
  return {
    url: `https://drive.usercontent.google.com/download?id=${encodeURIComponent(
      fileId
    )}&export=download&confirm=t`,
  };
}

/**
 * Dropbox: convert share URL to direct download URL.
 *
 * Supports:
 *   - https://www.dropbox.com/s/abc123/file.mp4?dl=0   → dl=1
 *   - https://www.dropbox.com/scl/fi/abc123/file.mp4?rlkey=xyz&dl=0  → dl=1
 *
 * REJECTS:
 *   - https://www.dropbox.com/preview/filename.mp4  (preview page — needs login)
 *   - https://www.dropbox.com/home/...  (file browser — needs login)
 */
export function normalizeDropboxUrl(input: string): NormalizedUrl {
  let parsed: URL;
  try {
    parsed = new URL(input);
  } catch {
    return null;
  }
  const host = parsed.hostname.toLowerCase();
  if (host !== "www.dropbox.com" && host !== "dropbox.com") return null;

  if (parsed.pathname.startsWith("/preview/")) {
    const filename = parsed.pathname.replace("/preview/", "");
    return {
      error: `This is a Dropbox preview URL, not a share link. To get a shareable link:

1. Open Dropbox in your browser or app
2. Find the file "${filename}"
3. Right-click on it (or click the ⋯ menu)
4. Click "Copy link" or "Share" → "Copy link"
5. Paste that URL here — it will look like https://www.dropbox.com/s/abc123/${filename}?dl=0

The share link can be downloaded; the preview URL you used requires Dropbox login and can't be fetched by our tool.`,
    };
  }

  if (parsed.pathname.startsWith("/home/")) {
    return {
      error: `This is a Dropbox home URL, not a share link. Please right-click the file in Dropbox and choose "Copy link" to get a shareable URL.`,
    };
  }

  if (parsed.pathname.includes("/s/") || parsed.pathname.includes("/scl/fi/")) {
    parsed.searchParams.set("dl", "1");
    return { url: parsed.toString() };
  }

  return null;
}

/**
 * Microsoft OneDrive: convert share URL to direct download URL.
 *
 * Supports:
 *   - https://1drv.ms/v/s!ABC123...  (short share link)
 *   - https://onedrive.live.com/download?cid=ABC&resid=ABC&authkey=XYZ
 *   - https://onedrive.live.com/redir?cid=...&resid=...
 *
 * For 1drv.ms short links, we follow the redirect server-side to get
 * the actual OneDrive download URL.
 */
export function normalizeOneDriveUrl(input: string): NormalizedUrl {
  let parsed: URL;
  try {
    parsed = new URL(input);
  } catch {
    return null;
  }
  const host = parsed.hostname.toLowerCase();
  if (
    host !== "1drv.ms" &&
    host !== "onedrive.live.com" &&
    host !== "api.onedrive.com" &&
    host !== "live.com"
  ) {
    return null;
  }

  // If it's already a direct download URL, leave it alone
  if (parsed.pathname.includes("/download")) {
    return { url: parsed.toString() };
  }

  // For 1drv.ms short links and other share links, the proxy server
  // follows redirects. We just need to append ?download=1 (or replace
  // existing download param) to hint OneDrive that we want the file.
  parsed.searchParams.set("download", "1");
  return { url: parsed.toString() };
}

/**
 * MediaFire: convert share URL to direct download URL.
 *
 * Supports:
 *   - https://www.mediafire.com/file/abc123/file.mp4/file
 *   - https://www.mediafire.com/file/abc123/file.mp4
 *
 * Direct download URL: https://www.mediafire.com/download/abc123/
 */
export function normalizeMediaFireUrl(input: string): NormalizedUrl {
  let parsed: URL;
  try {
    parsed = new URL(input);
  } catch {
    return null;
  }
  const host = parsed.hostname.toLowerCase();
  if (host !== "www.mediafire.com" && host !== "mediafire.com") return null;

  // /file/ID/filename/file → /download/ID
  const pathMatch = parsed.pathname.match(/\/file\/([^/]+)/);
  if (pathMatch && pathMatch[1]) {
    return {
      url: `https://www.mediafire.com/download/${pathMatch[1]}/`,
    };
  }

  // Already a /download/ URL — leave it
  if (parsed.pathname.startsWith("/download/")) {
    return { url: parsed.toString() };
  }

  return null;
}

/**
 * Box.com: convert share URL to direct download URL.
 *
 * Supports:
 *   - https://www.box.com/s/abc123xyz
 *   - https://app.box.com/s/abc123xyz
 *
 * Box shared links can be converted to direct downloads by appending
 * ?dl=1 to the URL.
 */
export function normalizeBoxUrl(input: string): NormalizedUrl {
  let parsed: URL;
  try {
    parsed = new URL(input);
  } catch {
    return null;
  }
  const host = parsed.hostname.toLowerCase();
  if (host !== "www.box.com" && host !== "box.com" && host !== "app.box.com") {
    return null;
  }

  if (parsed.pathname.startsWith("/s/")) {
    parsed.searchParams.set("dl", "1");
    return { url: parsed.toString() };
  }

  return null;
}

/**
 * pCloud: convert share URL to direct download URL.
 *
 * Supports:
 *   - https://u.pcloud.link/T6X7Y/filename
 *   - https://u.pcloud.link/#page=popup&code=XYZ
 *
 * pCloud share links redirect to direct download when fetched.
 */
export function normalizePCloudUrl(input: string): NormalizedUrl {
  let parsed: URL;
  try {
    parsed = new URL(input);
  } catch {
    return null;
  }
  if (parsed.hostname.toLowerCase() !== "u.pcloud.link") return null;

  // pCloud links work as direct downloads — no normalization needed,
  // but we signal "we recognize this URL" so the proxy tries it.
  return { url: parsed.toString() };
}

/**
 * WeTransfer: convert share URL to a fetchable form.
 *
 * Supports:
 *   - https://wetransfer.com/downloads/ABCDEF/XYZ
 *   - https://we.tl/t-ABCDEF
 *
 * NOTE: WeTransfer requires server-side rendering to extract the
 * actual download URL from their JS-rendered page. The proxy will
 * follow redirects and try to get the file.
 */
export function normalizeWeTransferUrl(input: string): NormalizedUrl {
  let parsed: URL;
  try {
    parsed = new URL(input);
  } catch {
    return null;
  }
  const host = parsed.hostname.toLowerCase();
  if (host !== "wetransfer.com" && host !== "www.wetransfer.com" && host !== "we.tl") {
    return null;
  }

  // WeTransfer share links work via redirect — our proxy follows them.
  return { url: parsed.toString() };
}

/**
 * Mega.nz: convert share URL to a fetchable form.
 *
 * Supports:
 *   - https://mega.nz/file/ABC123#XYZ123
 *   - https://mega.nz/#!ABC123!XYZ123  (old format)
 *
 * NOTE: Mega uses encryption. Files are encrypted and require a
 * decryption key that's part of the URL hash (after #). Browser fetch
 * can't see the hash, so this is a limitation. We pass it to the proxy
 * which can't decrypt either. For most files, this will not work
 * unless the user provides a direct mega.nz/d/ link.
 */
export function normalizeMegaUrl(input: string): NormalizedUrl {
  let parsed: URL;
  try {
    parsed = new URL(input);
  } catch {
    return null;
  }
  if (parsed.hostname.toLowerCase() !== "mega.nz") return null;

  // Mega uses encrypted file storage — direct fetch won't work without
  // a JS decryption library. Tell the user this clearly.
  return {
    error: `Mega.nz files are end-to-end encrypted and require a decryption key that's part of the URL fragment (after #). Our tool can't decrypt Mega files in the browser. Please download the file from mega.nz manually first, then upload it to our tool.`,
  };
}

/**
 * TeraBox: convert share URL to a fetchable form.
 *
 * Supports:
 *   - https://terabox.com/wap/share/link?shorturl=ABC&path=/
 *   - https://teraboxapp.com/s/ABC
 *   - https://1024terabox.com/sharing/link?...
 *
 * NOTE: TeraBox often requires JS-rendered page parsing to extract
 * the direct download URL. Our proxy will follow redirects.
 */
export function normalizeTeraBoxUrl(input: string): NormalizedUrl {
  let parsed: URL;
  try {
    parsed = new URL(input);
  } catch {
    return null;
  }
  const host = parsed.hostname.toLowerCase();
  const isTeraBox =
    host === "terabox.com" ||
    host === "www.terabox.com" ||
    host === "teraboxapp.com" ||
    host === "www.teraboxapp.com" ||
    host === "1024terabox.com" ||
    host.endsWith(".terabox.com");
  if (!isTeraBox) return null;

  // TeraBox share links need to be fetched via proxy which follows
  // redirects to get the actual file URL.
  return { url: parsed.toString() };
}

/**
 * Send.cm: convert share URL to direct download URL.
 *
 * Supports:
 *   - https://send.cm/abc123
 *   - https://send.cm/abc123/file.mp4
 */
export function normalizeSendCmUrl(input: string): NormalizedUrl {
  let parsed: URL;
  try {
    parsed = new URL(input);
  } catch {
    return null;
  }
  if (parsed.hostname.toLowerCase() !== "send.cm") return null;

  // Send.cm links work via direct fetch through our proxy.
  return { url: parsed.toString() };
}

/**
 * GoFile.io: convert share URL to a fetchable form.
 *
 * Supports:
 *   - https://gofile.io/d/ABC123
 *   - https://gofile.io/?c=ABC123
 *
 * NOTE: GoFile requires API call to get the actual download URL.
 */
export function normalizeGoFileUrl(input: string): NormalizedUrl {
  let parsed: URL;
  try {
    parsed = new URL(input);
  } catch {
    return null;
  }
  if (parsed.hostname.toLowerCase() !== "gofile.io") return null;

  return { url: parsed.toString() };
}

/**
 * AnonFiles: convert share URL to direct download URL.
 *
 * Supports:
 *   - https://anonfiles.com/abc123/filename.mp4
 *   - https://anonfiles.com/abc123
 */
export function normalizeAnonFilesUrl(input: string): NormalizedUrl {
  let parsed: URL;
  try {
    parsed = new URL(input);
  } catch {
    return null;
  }
  const host = parsed.hostname.toLowerCase();
  if (host !== "anonfiles.com" && host !== "www.anonfiles.com") return null;

  // AnonFiles has direct download links at /abc123/filename
  return { url: parsed.toString() };
}

/**
 * Catbox.moe: convert share URL to direct download URL.
 *
 * Supports:
 *   - https://files.catbox.moe/abc123.mp4  (already direct)
 *   - https://catbox.moe/abc123.mp4  (redirects to files.)
 */
export function normalizeCatboxUrl(input: string): NormalizedUrl {
  let parsed: URL;
  try {
    parsed = new URL(input);
  } catch {
    return null;
  }
  const host = parsed.hostname.toLowerCase();
  if (host !== "catbox.moe" && host !== "files.catbox.moe" && host !== "www.catbox.moe") {
    return null;
  }

  // files.catbox.moe is already direct, catbox.moe redirects
  return { url: parsed.toString() };
}

/**
 * Detect if a URL points to a known streaming/social platform that
 * we cannot convert (YouTube, TikTok, Instagram, etc.).
 *
 * Returns a user-friendly explanation if blocked, or null if the URL
 * appears to be a direct file link.
 */
export function detectUnsupportedPlatform(input: string): string | null {
  const lower = input.toLowerCase();
  const patterns: Array<{ hosts: string[]; name: string }> = [
    {
      hosts: ["youtube.com", "youtu.be", "m.youtube.com", "music.youtube.com"],
      name: "YouTube",
    },
    { hosts: ["tiktok.com", "vm.tiktok.com"], name: "TikTok" },
    {
      hosts: ["instagram.com", "instagr.am"],
      name: "Instagram",
    },
    {
      hosts: ["facebook.com", "fb.watch", "fb.com", "m.facebook.com"],
      name: "Facebook",
    },
    { hosts: ["twitter.com", "x.com", "t.co"], name: "Twitter/X" },
    { hosts: ["vimeo.com"], name: "Vimeo" },
    { hosts: ["twitch.tv"], name: "Twitch" },
    { hosts: ["soundcloud.com"], name: "SoundCloud" },
    { hosts: ["spotify.com", "open.spotify.com"], name: "Spotify" },
    { hosts: ["netflix.com"], name: "Netflix" },
    { hosts: ["dailymotion.com", "dai.ly"], name: "Dailymotion" },
    { hosts: ["pinterest.com", "pin.it"], name: "Pinterest" },
    { hosts: ["reddit.com", "redditmedia.com"], name: "Reddit" },
    { hosts: ["bilibili.com", "b23.tv"], name: "Bilibili" },
    { hosts: ["snapchat.com"], name: "Snapchat" },
  ];

  for (const pattern of patterns) {
    for (const host of pattern.hosts) {
      if (
        lower.includes(`://${host}`) ||
        lower.includes(`://${host}:`) ||
        lower.includes(`//www.${host}`) ||
        lower.includes(`//m.${host}`)
      ) {
        return `${pattern.name} links cannot be converted. ${pattern.name} serves video through its own player, not as a direct video file. Downloading from ${pattern.name} also violates their Terms of Service and copyright law. Please upload a video file you own instead.`;
      }
    }
  }
  return null;
}

/**
 * Master normalizer — try all cloud storage providers in order.
 * Returns the first non-null result. Falls back to null (= "try the
 * URL as-is via the proxy") if no provider matches.
 */
export function normalizeCloudStorageUrl(input: string): NormalizedUrl {
  const normalizers = [
    normalizeGoogleDriveUrl,
    normalizeDropboxUrl,
    normalizeOneDriveUrl,
    normalizeMediaFireUrl,
    normalizeBoxUrl,
    normalizePCloudUrl,
    normalizeWeTransferUrl,
    normalizeMegaUrl,
    normalizeTeraBoxUrl,
    normalizeSendCmUrl,
    normalizeGoFileUrl,
    normalizeAnonFilesUrl,
    normalizeCatboxUrl,
  ];

  for (const normalize of normalizers) {
    const result = normalize(input);
    if (result !== null) return result;
  }

  return null;
}

/**
 * Returns true if the URL points to a cloud storage provider we
 * explicitly support (so we can show "Fetching from X..." in the UI).
 */
export function detectCloudProvider(input: string): string | null {
  try {
    const u = new URL(input);
    const h = u.hostname.toLowerCase();
    if (h === "drive.google.com" || h === "docs.google.com" || h === "drive.usercontent.google.com") {
      return "Google Drive";
    }
    if (h === "www.dropbox.com" || h === "dropbox.com") return "Dropbox";
    if (h === "1drv.ms" || h === "onedrive.live.com") return "OneDrive";
    if (h === "www.mediafire.com" || h === "mediafire.com") return "MediaFire";
    if (h === "www.box.com" || h === "box.com" || h === "app.box.com") return "Box";
    if (h === "u.pcloud.link") return "pCloud";
    if (h === "wetransfer.com" || h === "www.wetransfer.com" || h === "we.tl") return "WeTransfer";
    if (h === "mega.nz") return "Mega";
    if (
      h === "terabox.com" ||
      h === "www.terabox.com" ||
      h === "teraboxapp.com" ||
      h === "1024terabox.com"
    ) {
      return "TeraBox";
    }
    if (h === "send.cm") return "Send.cm";
    if (h === "gofile.io") return "GoFile";
    if (h === "anonfiles.com" || h === "www.anonfiles.com") return "AnonFiles";
    if (h === "catbox.moe" || h === "files.catbox.moe") return "Catbox";
    if (h === "raw.githubusercontent.com") return "GitHub";
    if (h === "archive.org") return "archive.org";
    return null;
  } catch {
    return null;
  }
}
