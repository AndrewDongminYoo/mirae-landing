/**
 * Canonical origin, used to build absolute URLs in the metadata routes
 * (`app/robots.txt/route.ts`, `app/sitemap.ts`).
 *
 * Note this is the `warmwake` subdomain. The apex `donminzzi.kr` is reserved
 * for a separate site and currently has no A record, so it must not be
 * substituted here.
 */
export const SITE_URL = "https://warmwake.donminzzi.kr";

export const IOS_STORE_URL = "https://apps.apple.com/app/id6758120543";
export const ANDROID_STORE_URL = "https://play.google.com/store/apps/details?id=kr.mirae.app";

// Version 2.2.0 is public on Google Play and the App Store as of 2026-11-09.
export const APP_VERSION = "2.2.0";
export const APP_RELEASE_STATUS = "Android와 iOS 모두 2.2.0을 이용할 수 있어요.";
