# Design Spec: Color Palette & Screen Image Redesign

**Date:** 2026-03-18
**Status:** Approved
**Scope:** `globals.css` color tokens, `lib/screens.ts` i18n helper, landing component image references

---

## Overview

The 온음 (WarmWake) app has been updated to an orange-toned color palette. The marketing website still uses the old pink primary color and old screenshot images. This redesign aligns the website's color tokens and screen images with the current app palette, and introduces an i18n-ready screen image helper.

Font changes (Pretendard + A2Z) are out of scope — handled in a separate session.

---

## 1. Color Token Changes

Only light-mode tokens are updated. Dark mode retains current values pending new dark-mode screenshots.

### Light mode (`globals.css` `:root`)

| Token              | Before           | After                          | Rationale                                                                                                                      |
| ------------------ | ---------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `--accent`         | `#ffb4ab` (pink) | `#ffba87` (warm peach/apricot) | Derived from app's `gradientEnd (#FFF8F0)` / `startupBackground (#FFF8EF)` at medium saturation; readable on light backgrounds |
| `--ring`           | `#ffb4ab`        | `#f99c50`                      | Unified with `--primary` (orange)                                                                                              |
| `--sidebar-accent` | `#fff0ee`        | `#fff8ef`                      | Matches app's `WwPalette.startupBackground`                                                                                    |
| `--sidebar-ring`   | `#ffb4ab`        | `#f99c50`                      | Unified with `--ring`                                                                                                          |

### `--chart-1` — intentionally unchanged

`--chart-1: #ffb4ab` is retained as-is. No chart components exist on the landing page, so this token has no visible effect in the current build. It can be revisited if charts are added later.

### Dark mode (`.dark`) — no change

All dark-mode values remain unchanged until dark-mode screenshots are available.

### Cascade effect

Components using Tailwind utilities (`from-accent/10`, `bg-accent/20`, `text-accent`, etc.) automatically reflect the new token values without any direct component edits.

---

## 2. Screen Image i18n Helper

### Directory layout (existing in `public/`)

```plaintext
public/
  screens/
    ko/   # 01_alarm-ring_ko.png … 10_voice-messages-list_ko.png
    en/   # 01_alarm-ring_en-US.png … 10_voice-messages-list_en-US.png
```

### New file: `lib/screens.ts`

```ts
export type ScreenLocale = "ko" | "en";

const SCREENS = {
  alarmRing: { ko: "01_alarm-ring_ko.png", en: "01_alarm-ring_en-US.png" },
  homeFabs: { ko: "02_home-fabs_ko.png", en: "02_home-fabs_en-US.png" },
  alarmDetail: { ko: "03_alarm-detail-weekdays_ko.png", en: "03_alarm-detail-weekdays_en-US.png" },
  soundPicker: { ko: "04_sound-picker_ko.png", en: "04_sound-picker_en-US.png" },
  messagePreview: {
    ko: "05_message-preview-playing_ko.png",
    en: "05_message-preview-playing_en-US.png",
  },
  settings: { ko: "06_settings-default_ko.png", en: "06_settings-default_en-US.png" },
  settingsTheme: { ko: "07_settings-theme-modal_ko.png", en: "07_settings-theme-modal_en-US.png" },
  onboardingIntro: { ko: "08_onboarding-intro_ko.png", en: "08_onboarding-intro_en-US.png" },
  onboardingFlow: { ko: "09_onboarding-flow_ko.png", en: "09_onboarding-flow_en-US.png" },
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

- Locale defaults to `"ko"` so existing call sites require no change until i18n is added.
- `satisfies` enforces the shape without widening the inferred type — invalid keys are TypeScript compile errors.
- No runtime validation is needed: `ScreenKey` is a compile-time union; passing an unknown key is a type error.
- The locale key (`"en"`) maps to the `en/` subdirectory. The `en-US` suffix in filenames (e.g. `01_alarm-ring_en-US.png`) is baked into the `SCREENS` map and is not derived from the locale key.
- `onboardingIntro` and `onboardingFlow` are defined but unused (reserved for a future onboarding section).

---

## 3. Image Mapping per Component

All components import `getScreenPath` from `@/lib/screens` and replace hardcoded `/images/` paths. `alt` text is updated to match the new screens. All `<Image>` components use the `fill` prop (no explicit `width`/`height`), so screen dimensions do not affect rendering.

### Hero image order rationale

Left → Center → Right tells the app story in sequence: **메시지 목록** (밤에 녹음한 메시지 확인) → **알람 울림** (아침의 핵심 순간, 시각적으로 가장 크게 표시) → **홈 화면** (앱의 일상적인 진입점). Left and Right are rendered at the same smaller size; only Center is the dominant phone.

| Component              | Position          | Screen key          | `alt` text                                           | Previous file               |
| ---------------------- | ----------------- | ------------------- | ---------------------------------------------------- | --------------------------- |
| `hero.tsx`             | Left              | `voiceMessagesList` | `온음 앱 음성 메시지 목록 화면`                      | `warmwake-time-picker.png`  |
| `hero.tsx`             | Center (main)     | `alarmRing`         | `온음 앱 알람 울림 화면 - 어제의 당신이 남긴 메시지` | `warmwake-alarm-wake.png`   |
| `hero.tsx`             | Right             | `homeFabs`          | `온음 앱 홈 화면`                                    | `warmwake-voice-record.png` |
| `feature-voice.tsx`    | Background        | `alarmDetail`       | `온음 앱 알람 시간 및 요일 설정 화면`                | `warmwake-time-picker.png`  |
| `feature-voice.tsx`    | Main              | `alarmRing`         | `온음 앱 알람 울림 화면 - 어제의 당신이 남긴 메시지` | `warmwake-alarm-wake.png`   |
| `feature-record.tsx`   | Left (background) | `soundPicker`       | `온음 앱 알람 소리 선택 화면`                        | `warmwake-alarm-sounds.png` |
| `feature-record.tsx`   | Main              | `messagePreview`    | `온음 앱 음성 메시지 미리 듣기 화면`                 | `warmwake-voice-record.png` |
| `feature-settings.tsx` | Background        | `settingsTheme`     | `온음 앱 테마 설정 화면`                             | `warmwake-theme-light.png`  |
| `feature-settings.tsx` | Main              | `settings`          | `온음 앱 설정 화면`                                  | `warmwake-settings.png`     |
| `final-cta.tsx`        | Single            | `homeFabs`          | `온음 앱 홈 화면`                                    | `warmwake-alarm-wake.png`   |

### Rationale for `final-cta.tsx` image choice

The closing CTA section aims to show the full app experience rather than a single moment. `homeFabs` (home screen with action buttons) communicates the app's day-to-day usage better than `alarmRing`. Hero center already uses `alarmRing` as the key emotional moment; repeating it in the final CTA would be redundant.

---

## 4. Files Changed

| File                                      | Type   | Change                                         |
| ----------------------------------------- | ------ | ---------------------------------------------- |
| `app/globals.css`                         | Edit   | Update 4 CSS custom property values in `:root` |
| `lib/screens.ts`                          | Create | i18n screen path helper                        |
| `components/landing/hero.tsx`             | Edit   | Replace 3 image `src` + `alt` values           |
| `components/landing/feature-voice.tsx`    | Edit   | Replace 2 image `src` + `alt` values           |
| `components/landing/feature-record.tsx`   | Edit   | Replace 2 image `src` + `alt` values           |
| `components/landing/feature-settings.tsx` | Edit   | Replace 2 image `src` + `alt` values           |
| `components/landing/final-cta.tsx`        | Edit   | Replace 1 image `src` + `alt` value            |

---

## 5. Out of Scope

- Font changes (Pretendard + A2Z) — separate session
- Dark mode accent color update — pending dark-mode screenshots
- `--chart-1` token — no chart components on the landing page
- Layout, structure, or copy changes
- New sections (onboarding, etc.)
