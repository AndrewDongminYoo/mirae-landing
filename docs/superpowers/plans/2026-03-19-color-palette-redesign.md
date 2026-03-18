# Color Palette & Screen Image Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the old pink accent tokens with warm peach/orange tones and swap all landing page screenshots to the new orange-toned app screens in `public/screens/<locale>/`.

**Architecture:** CSS token update cascades automatically to all Tailwind utility usages; a new typed `lib/screens.ts` helper centralizes image path resolution for i18n; components are updated to call the helper instead of hardcoding paths.

**Tech Stack:** Next.js 16 App Router, Tailwind CSS v4 (CSS custom properties), TypeScript, `node:test` for unit tests, `pnpm` scripts.

**Spec:** `docs/superpowers/specs/2026-03-18-color-palette-redesign-design.md`

---

## File Map

| File                                      | Action | Responsibility                                   |
| ----------------------------------------- | ------ | ------------------------------------------------ |
| `app/globals.css`                         | Modify | 4 CSS custom property values in `:root`          |
| `eslint.config.mjs`                       | Modify | Allow `node:test` imports in `lib/**/*.test.ts`  |
| `lib/screens.ts`                          | Create | i18n screen path helper + type exports           |
| `lib/screens.test.ts`                     | Create | Unit tests for `getScreenPath` using `node:test` |
| `components/landing/hero.tsx`             | Modify | 3 image `src` + `alt` values                     |
| `components/landing/feature-voice.tsx`    | Modify | 2 image `src` + `alt` values                     |
| `components/landing/feature-record.tsx`   | Modify | 2 image `src` + `alt` values                     |
| `components/landing/feature-settings.tsx` | Modify | 2 image `src` + `alt` values                     |
| `components/landing/final-cta.tsx`        | Modify | 1 image `src` + `alt` value                      |

---

## Task 1: Update CSS Color Tokens

**Files:**

- Modify: `app/globals.css`

- [ ] **Step 1: Edit 4 tokens in `:root`**

In `app/globals.css`, inside the `:root` block, change:

```css
/* before */
--accent: #ffb4ab;
--ring: #ffb4ab;
--sidebar-accent: #fff0ee;
--sidebar-ring: #ffb4ab;

/* after */
--accent: #ffba87;
--ring: #f99c50;
--sidebar-accent: #fff8ef;
--sidebar-ring: #f99c50;
```

The `.dark` block is **not changed**.

- [ ] **Step 2: Verify lint passes**

```bash
pnpm lint
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "style: update accent tokens to warm peach/orange palette"
```

---

## Task 2: Create `lib/screens.ts` Helper (TDD)

**Files:**

- Modify: `eslint.config.mjs`
- Create: `lib/screens.test.ts`
- Create: `lib/screens.ts`

### Step 2a — ESLint override for lib test files

- [ ] **Step 1: Add `node:test` override to ESLint config**

In `eslint.config.mjs`, after the existing `scripts/**/*.test.ts` override block, add:

```js
{
  files: ["lib/**/*.test.ts"],
  rules: {
    // lib tests use node:test, not jest
    ...Object.fromEntries(
      Object.keys(pluginJest.rules ?? {}).map((rule) => [`jest/${rule}`, "off"])
    ),
  },
},
```

- [ ] **Step 2: Verify lint still passes**

```bash
pnpm lint
```

Expected: no errors.

### Step 2b — Write failing tests

- [ ] **Step 3: Create `lib/screens.test.ts`**

```ts
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
```

- [ ] **Step 4: Run tests to verify they fail**

```bash
npx tsx --test lib/screens.test.ts
```

Expected: error — `Cannot find module './screens.js'`

### Step 2c — Implement helper

- [ ] **Step 5: Create `lib/screens.ts`**

```ts
export type ScreenLocale = "ko" | "en";

const SCREENS = {
  alarmRing: { ko: "01_alarm-ring_ko.png", en: "01_alarm-ring_en-US.png" },
  homeFabs: { ko: "02_home-fabs_ko.png", en: "02_home-fabs_en-US.png" },
  alarmDetail: {
    ko: "03_alarm-detail-weekdays_ko.png",
    en: "03_alarm-detail-weekdays_en-US.png",
  },
  soundPicker: { ko: "04_sound-picker_ko.png", en: "04_sound-picker_en-US.png" },
  messagePreview: {
    ko: "05_message-preview-playing_ko.png",
    en: "05_message-preview-playing_en-US.png",
  },
  settings: { ko: "06_settings-default_ko.png", en: "06_settings-default_en-US.png" },
  settingsTheme: {
    ko: "07_settings-theme-modal_ko.png",
    en: "07_settings-theme-modal_en-US.png",
  },
  onboardingIntro: {
    ko: "08_onboarding-intro_ko.png",
    en: "08_onboarding-intro_en-US.png",
  },
  onboardingFlow: {
    ko: "09_onboarding-flow_ko.png",
    en: "09_onboarding-flow_en-US.png",
  },
  voiceMessagesList: {
    ko: "10_voice-messages-list_ko.png",
    en: "10_voice-messages-list_en-US.png",
  },
} satisfies Record<string, Record<ScreenLocale, string>>;

export type ScreenKey = keyof typeof SCREENS;

export function getScreenPath(key: ScreenKey, locale: ScreenLocale = "ko"): string {
  return `/screens/${locale}/${SCREENS[key][locale]}`;
}
```

- [ ] **Step 6: Run tests to verify they pass**

```bash
npx tsx --test lib/screens.test.ts
```

Expected: `▶ getScreenPath` / `✔ returns the ko path by default` × 4 tests passing.

- [ ] **Step 7: Lint**

```bash
pnpm lint
```

Expected: no errors.

- [ ] **Step 8: Commit**

```bash
git add eslint.config.mjs lib/screens.ts lib/screens.test.ts
git commit -m "feat: add getScreenPath i18n helper for screen images"
```

---

## Task 3: Update `hero.tsx` Image References

**Files:**

- Modify: `components/landing/hero.tsx`

- [ ] **Step 1: Add import and replace 3 image slots**

At the top of the file, add the import after existing imports:

```ts
import { getScreenPath } from "@/lib/screens";
```

Replace the three `<Image>` `src` and `alt` props:

**Left phone** (was `warmwake-time-picker.png`):

```tsx
alt="온음 앱 음성 메시지 목록 화면"
src={getScreenPath("voiceMessagesList")}
```

**Center phone** (was `warmwake-alarm-wake.png`):

```tsx
alt="온음 앱 알람 울림 화면 - 어제의 당신이 남긴 메시지"
src={getScreenPath("alarmRing")}
```

**Right phone** (was `warmwake-voice-record.png`):

```tsx
alt="온음 앱 홈 화면"
src={getScreenPath("homeFabs")}
```

- [ ] **Step 2: Lint**

```bash
pnpm lint
```

Expected: no errors. (ESLint `perfectionist/sort-jsx-props` enforces alphabetical JSX prop order — `alt` before `src` is correct.)

- [ ] **Step 3: Commit**

```bash
git add components/landing/hero.tsx
git commit -m "feat: update hero screenshots to new orange-toned screens"
```

---

## Task 4: Update `feature-voice.tsx` Image References

**Files:**

- Modify: `components/landing/feature-voice.tsx`

- [ ] **Step 1: Add import and replace 2 image slots**

Add import:

```ts
import { getScreenPath } from "@/lib/screens";
```

**Background phone** (was `warmwake-time-picker.png`):

```tsx
alt="온음 앱 알람 시간 및 요일 설정 화면"
src={getScreenPath("alarmDetail")}
```

**Main phone** (was `warmwake-alarm-wake.png`):

```tsx
alt="온음 앱 알람 울림 화면 - 어제의 당신이 남긴 메시지"
src={getScreenPath("alarmRing")}
```

- [ ] **Step 2: Lint**

```bash
pnpm lint
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/landing/feature-voice.tsx
git commit -m "feat: update feature-voice screenshots to new screens"
```

---

## Task 5: Update `feature-record.tsx` Image References

**Files:**

- Modify: `components/landing/feature-record.tsx`

- [ ] **Step 1: Add import and replace 2 image slots**

Add import:

```ts
import { getScreenPath } from "@/lib/screens";
```

**Left phone** (was `warmwake-alarm-sounds.png`):

```tsx
alt="온음 앱 알람 소리 선택 화면"
src={getScreenPath("soundPicker")}
```

**Main phone** (was `warmwake-voice-record.png`):

```tsx
alt="온음 앱 음성 메시지 미리 듣기 화면"
src={getScreenPath("messagePreview")}
```

- [ ] **Step 2: Lint**

```bash
pnpm lint
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/landing/feature-record.tsx
git commit -m "feat: update feature-record screenshots to new screens"
```

---

## Task 6: Update `feature-settings.tsx` Image References

**Files:**

- Modify: `components/landing/feature-settings.tsx`

- [ ] **Step 1: Add import and replace 2 image slots**

Add import:

```ts
import { getScreenPath } from "@/lib/screens";
```

**Background phone** (was `warmwake-theme-light.png`):

```tsx
alt="온음 앱 테마 설정 화면"
src={getScreenPath("settingsTheme")}
```

**Main phone** (was `warmwake-settings.png`):

```tsx
alt="온음 앱 설정 화면"
src={getScreenPath("settings")}
```

- [ ] **Step 2: Lint**

```bash
pnpm lint
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/landing/feature-settings.tsx
git commit -m "feat: update feature-settings screenshots to new screens"
```

---

## Task 7: Update `final-cta.tsx` Image Reference

**Files:**

- Modify: `components/landing/final-cta.tsx`

- [ ] **Step 1: Add import and replace 1 image slot**

Add import:

```ts
import { getScreenPath } from "@/lib/screens";
```

**Single phone** (was `warmwake-alarm-wake.png`):

```tsx
alt="온음 앱 홈 화면"
src={getScreenPath("homeFabs")}
```

- [ ] **Step 2: Lint**

```bash
pnpm lint
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/landing/final-cta.tsx
git commit -m "feat: update final-cta screenshot to new home screen"
```

---

## Task 8: Full Build Verification

- [ ] **Step 1: Production build**

```bash
pnpm build
```

Expected: `✓ Compiled successfully` with no TypeScript errors and no `next/image` warnings about missing files.

- [ ] **Step 2: Verify screens load in browser**

```bash
pnpm dev
```

Open `http://localhost:3000` and visually verify:

- Hero shows 3 new orange-toned screens
- Feature sections show updated screens
- Final CTA shows home screen
- Accent colour (heading highlights, gradient backgrounds) is warm peach/orange, not pink

- [ ] **Step 3: Run unit tests one final time**

```bash
npx tsx --test lib/screens.test.ts
```

Expected: 4 passing.
