import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

// `/alarm/*` is omitted on purpose: those routes always redirect and have no
// indexable content.
const ROUTES = ["/", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({ url: `${SITE_URL}${path}` }));
}
