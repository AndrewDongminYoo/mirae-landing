/**
 * Canonical origin, used to build absolute URLs in the metadata routes
 * (`app/robots.ts`, `app/sitemap.ts`).
 *
 * Note this is the `warmwake` subdomain. The apex `donminzzi.kr` is reserved
 * for a separate site and currently has no A record, so it must not be
 * substituted here.
 */
export const SITE_URL = "https://warmwake.donminzzi.kr";

export const IOS_STORE_URL = "https://apps.apple.com/app/id6758120543";
export const ANDROID_STORE_URL = "https://play.google.com/store/apps/details?id=kr.mirae.app";
