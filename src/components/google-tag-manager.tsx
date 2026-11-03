import Script from "next/script";

/**
 * Google Tag Manager (GTM) container loader.
 *
 * Container ID: GTM-NW8NRWVZ (provided by site owner)
 *
 * This implementation follows Google's official Next.js GTM guide:
 *  - The <Script> tag is rendered once in <head> via the layout.
 *  - GTM loads GA4 and any advertising tags via its own container
 *    (we do NOT install gtag.js directly in the app).
 *  - The dataLayer is initialized once here; downstream event helpers
 *    (lib/analytics.ts) push onto the existing window.dataLayer.
 *
 * Idempotent: if window.dataLayer already exists (e.g. from a previous
 * render or from GTM preview mode), we don't reset it.
 */
const GTM_ID = "GTM-NW8NRWVZ";

export function GoogleTagManager() {
  return (
    <>
      <Script id="gtm-init" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),
                dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>

      {/* GTM <noscript> fallback — for users with JS disabled */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="gtm"
        />
      </noscript>
    </>
  );
}
