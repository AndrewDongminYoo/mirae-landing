import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";

import { createElement } from "react";
import { renderToString } from "react-dom/server";

import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

const originalWindowDescriptor = Object.getOwnPropertyDescriptor(globalThis, "window");

function restoreWindow() {
  if (originalWindowDescriptor) {
    Object.defineProperty(globalThis, "window", originalWindowDescriptor);
    return;
  }

  delete (globalThis as { window?: Window }).window;
}

function renderMarkup() {
  return renderToString(createElement(AnimateOnScroll, null, "content"));
}

describe("AnimateOnScroll hydration", () => {
  afterEach(() => {
    restoreWindow();
  });

  it("keeps initial client markup aligned with server markup for reduced-motion users", () => {
    delete (globalThis as { window?: Window }).window;
    const serverMarkup = renderMarkup();

    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        matchMedia: () => ({ matches: true }),
      } as unknown as Window,
    });

    assert.equal(renderMarkup(), serverMarkup);
  });
});
