import assert from "node:assert/strict";
import test from "node:test";

import { Children, isValidElement, type ReactElement, type ReactNode } from "react";

import { GOOGLE_ADS_TAG_ID, GoogleAdsTag } from "../components/google-ads-tag";

function assertElement(node: ReactNode): asserts node is ReactElement {
  assert.ok(isValidElement(node));
}

test("GoogleAdsTag renders a single global gtag loader and init pair", () => {
  const fragment = GoogleAdsTag();

  assertElement(fragment);

  const scripts = Children.toArray(fragment.props.children);
  assert.equal(scripts.length, 2);

  const [loaderScript, initScript] = scripts;

  assertElement(loaderScript);
  assertElement(initScript);

  assert.equal(
    loaderScript.props.src,
    `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_TAG_ID}`
  );
  assert.equal(loaderScript.props.strategy, "beforeInteractive");
  assert.equal(loaderScript.props.async, true);

  assert.equal(initScript.props.id, "google-ads-tag-init");
  assert.equal(initScript.props.strategy, "beforeInteractive");
  assert.match(
    String(initScript.props.children),
    new RegExp(`gtag\\('config', '${GOOGLE_ADS_TAG_ID}'\\);`)
  );
});
