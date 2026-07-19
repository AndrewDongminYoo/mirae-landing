import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // `/alarm/*` are deep-link bouncers that UA-sniff and redirect to the
      // app stores. They serve no content, so keep crawlers out of them.
      disallow: "/alarm/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
