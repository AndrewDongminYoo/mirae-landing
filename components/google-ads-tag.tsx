/* eslint-disable @next/next/no-before-interactive-script-outside-document -- App Router root layouts support beforeInteractive and inject it into <head>. */
import Script from "next/script";

export const GOOGLE_ADS_TAG_ID = "AW-18030938015";

export function GoogleAdsTag() {
  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_TAG_ID}`}
        strategy="beforeInteractive"
      />
      <Script id="google-ads-tag-init" strategy="beforeInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', '${GOOGLE_ADS_TAG_ID}');`}
      </Script>
    </>
  );
}
