import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import nextConfig from "../next.config";

test("Next header configuration scopes security and discovery headers", async () => {
  const getHeaders = nextConfig.headers;
  assert.equal(typeof getHeaders, "function");
  assert.ok(getHeaders);

  const rules = await getHeaders();
  const globalRule = rules.find((rule) => rule.source === "/:path*");
  const homeRule = rules.find((rule) => rule.source === "/");
  assert.ok(globalRule);
  assert.ok(homeRule);

  const securityHeaders = new Map(globalRule.headers.map(({ key, value }) => [key, value]));
  const discoveryHeaders = new Map(homeRule.headers.map(({ key, value }) => [key, value]));

  const contentSecurityPolicy = securityHeaders.get("Content-Security-Policy") ?? "";
  assert.match(contentSecurityPolicy, /default-src 'self'/);
  assert.match(contentSecurityPolicy, /https:\/\/www\.google\.co\.kr/);
  assert.equal(securityHeaders.get("X-Content-Type-Options"), "nosniff");
  assert.equal(securityHeaders.get("X-Frame-Options"), "DENY");
  assert.equal(securityHeaders.get("Referrer-Policy"), "strict-origin-when-cross-origin");
  assert.equal(
    securityHeaders.get("Permissions-Policy"),
    "camera=(), microphone=(), geolocation=()"
  );
  assert.equal(securityHeaders.has("Link"), false);
  assert.equal(discoveryHeaders.get("Link"), '</llms.txt>; rel="describedby"; type="text/plain"');
  assert.equal(nextConfig.poweredByHeader, false);
});

test("llms.txt describes the public site without inventing agent APIs", async () => {
  const llms = await readFile(new URL("../public/llms.txt", import.meta.url), "utf8").catch(
    () => ""
  );

  assert.match(llms, /^# WarmWake$/m);
  assert.match(llms, /https:\/\/warmwake\.donminzzi\.kr\/privacy/);
  assert.match(
    llms,
    /does not publish a public API, authentication service, MCP server, or payment endpoint/
  );
});

test("robots.txt publishes the approved Content Signal", async () => {
  const robotsRoute = await import("../app/robots.txt/route").catch(() => null);

  assert.ok(robotsRoute?.GET);
  assert.equal(robotsRoute.dynamic, "force-static");
  const response = robotsRoute.GET();
  const body = await response.text();

  assert.match(response.headers.get("content-type") ?? "", /^text\/plain/);
  assert.match(
    body,
    /^User-Agent: \*\nAllow: \/\nDisallow: \/alarm\/\nContent-Signal: ai-train=no, search=yes, ai-input=yes\n\nSitemap: https:\/\/warmwake\.donminzzi\.kr\/sitemap\.xml\n$/
  );
});

test("Apple App Site Association exposes only the production app identity", async () => {
  const association = JSON.parse(
    await readFile(
      new URL("../public/.well-known/apple-app-site-association", import.meta.url),
      "utf8"
    )
  ) as {
    applinks: { details: Array<{ appIDs: string[] }> };
  };

  assert.deepEqual(association.applinks.details[0]?.appIDs, ["393JTTV68D.kr.mirae.app"]);
});
