import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { getScreenPath } from "./screens.js";

describe("getScreenPath", () => {
  it("returns the ko path by default", () => {
    assert.equal(getScreenPath("alarmRing"), "/screens/ko/01_alarm-ring_ko.png");
  });

  it("returns the en path when locale is en", () => {
    assert.equal(getScreenPath("alarmRing", "en"), "/screens/en/01_alarm-ring_en-US.png");
  });

  it("correctly maps voiceMessagesList", () => {
    assert.equal(getScreenPath("voiceMessagesList"), "/screens/ko/10_voice-messages-list_ko.png");
  });

  it("correctly maps homeFabs for en", () => {
    assert.equal(getScreenPath("homeFabs", "en"), "/screens/en/02_home-fabs_en-US.png");
  });
});
