/**
 * Analytics event helpers.
 *
 * All events are pushed onto window.dataLayer (managed by Google Tag
 * Manager container GTM-NW8NRWVZ). GTM then forwards them to GA4 and
 * any configured ad tags.
 *
 * PRIVACY: We NEVER send filenames, file contents, personal information,
 * media URLs, IP addresses, or any user-identifiable data. Only
 * anonymous event names and aggregate counters.
 */

type EventName =
  | "file_upload_start"
  | "file_upload_success"
  | "file_upload_error"
  | "url_paste_start"
  | "url_paste_success"
  | "url_paste_error"
  | "conversion_start"
  | "conversion_success"
  | "conversion_error"
  | "mp3_download"
  | "wav_download"
  | "mp4_download"
  | "tool_page_view";

interface EventPayload {
  /** Output format being converted to — useful for conversion rates per format. */
  format?: "mp3" | "wav" | "mp4";
  /** Input source — useful for understanding user behavior. */
  source?: "upload" | "url";
  /** Approximate file size bucket (e.g. "0-5MB", "5-25MB", "25-100MB", "100MB+"). */
  sizeBucket?: string;
  /** Generic error category, no detail. */
  errorType?: string;
  /** Tool page slug — useful for understanding which converters get used. */
  page?: string;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Push an event to the dataLayer. Safe to call before GTM has loaded —
 * the event will be queued and flushed when GTM initializes.
 *
 * On SSR (server-side rendering, no window), this is a no-op.
 */
export function trackEvent(name: EventName, payload: EventPayload = {}): void {
  if (typeof window === "undefined") return;
  if (!window.dataLayer) window.dataLayer = [];

  // Sanitize payload — strip any value that could contain user data.
  // We only allow the known keys.
  const cleanPayload: Record<string, unknown> = { event: name };
  if (payload.format) cleanPayload.format = payload.format;
  if (payload.source) cleanPayload.source = payload.source;
  if (payload.sizeBucket) cleanPayload.size_bucket = payload.sizeBucket;
  if (payload.errorType) cleanPayload.error_type = payload.errorType;
  if (payload.page) cleanPayload.page = payload.page;

  window.dataLayer.push(cleanPayload);
}

/**
 * Convert a byte count into a coarse size bucket. We deliberately use
 * buckets instead of exact sizes so that we can't accidentally leak
 * information about a specific file.
 *
 * Returns one of: "0-5MB", "5-25MB", "25-100MB", "100MB+".
 */
export function bucketizeSize(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  if (mb < 5) return "0-5MB";
  if (mb < 25) return "5-25MB";
  if (mb < 100) return "25-100MB";
  return "100MB+";
}

// Convenience wrappers for the most common events
export const track = {
  fileUploadStart: (page?: string) =>
    trackEvent("file_upload_start", { source: "upload", page }),
  fileUploadSuccess: (sizeBytes: number, page?: string) =>
    trackEvent("file_upload_success", {
      source: "upload",
      sizeBucket: bucketizeSize(sizeBytes),
      page,
    }),
  urlPasteStart: (page?: string) =>
    trackEvent("url_paste_start", { source: "url", page }),
  urlPasteSuccess: (sizeBytes: number, page?: string) =>
    trackEvent("url_paste_success", {
      source: "url",
      sizeBucket: bucketizeSize(sizeBytes),
      page,
    }),
  conversionStart: (
    format: "mp3" | "wav" | "mp4",
    source: "upload" | "url",
    page?: string
  ) => trackEvent("conversion_start", { format, source, page }),
  conversionSuccess: (
    format: "mp3" | "wav" | "mp4",
    source: "upload" | "url",
    page?: string
  ) => trackEvent("conversion_success", { format, source, page }),
  conversionError: (
    format: "mp3" | "wav" | "mp4",
    source: "upload" | "url",
    errorType: string,
    page?: string
  ) =>
    trackEvent("conversion_error", {
      format,
      source,
      errorType,
      page,
    }),
  download: (format: "mp3" | "wav" | "mp4", page?: string) => {
    const eventName =
      format === "mp3"
        ? "mp3_download"
        : format === "wav"
        ? "wav_download"
        : "mp4_download";
    trackEvent(eventName, { format, page });
  },
  toolPageView: (page: string) => trackEvent("tool_page_view", { page }),
};
