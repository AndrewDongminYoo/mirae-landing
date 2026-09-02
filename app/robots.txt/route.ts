import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export function GET(): Response {
  const body = [
    "User-Agent: *",
    "Allow: /",
    "Disallow: /alarm/",
    "Content-Signal: ai-train=no, search=yes, ai-input=yes",
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
