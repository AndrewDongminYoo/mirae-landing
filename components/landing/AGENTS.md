## Overview

- `components/landing/` holds every marketing section that `app/page.tsx` renders: header, hero, problem statement, pain points, feature showcases, CTAs, and footer.
- The folder combines client interactions (mobile menu) with server-friendly hero/feature markup.

## Structure

- `Header.tsx` – sticky nav with App Store CTA, mobile menu toggled via `useState`, and icon buttons.
- `Hero.tsx` – main headline, dual store CTAs, and three phone mockups built with `next/image`.
- `Problem.tsx` – high-level question section with a simple centered copy block.
- `PainPoints.tsx` – icon-driven list that uses `lucide-react` icons and pill badges.
- `FeatureVoice.tsx`, `FeatureRecord.tsx`, `FeatureSettings.tsx` – gradient sections pairing explanatory copy with `next/image` mockups.
- `CTA.tsx` – lightweight encouragement that sits between features and the final CTA.
- `FinalCTA.tsx` – dark background section with CTA buttons, decorative blur circles, and another mockup.
- `Footer.tsx` – business info, footer nav links, and a `<details>` block for contact info.

## Where to look

- `Hero.tsx` for the top banner, `Button`/`Link` combos, `Apple` + `Play` buttons, and the priority mockup.
- `FeatureVoice.tsx`, `FeatureRecord.tsx`, `FeatureSettings.tsx` for the three gradient sections that reuse `public/images/mirae-*.png` assets.
- `CTA.tsx` and `FinalCTA.tsx` for the text-to-CTA transitions and the final dark panel with decorative circles.
- `Header.tsx` for the sticky navigation, App Store CTA, and the `Button variant="ghost"` mobile toggle.
- `Footer.tsx` for the footer nav, conditional year, and the collapsible business info `<details>`.
- `Problem.tsx` + `PainPoints.tsx` for the softer messaging before features and the icon/CTA pill layout.
- `public/images` owns the mockups (`mirae-time-picker.png`, `mirae-alarm-wake.png`, `mirae-voice-record.png`, `mirae-settings.png`, `mirae-theme-light.png`, `mirae-alarm-sounds.png`).

## Conventions

- Every section uses `<section>` plus `aria-labelledby` for accessibility.
- CTA buttons always wrap `Link` with `<Button asChild>` so spacing and focus work across the site.
- Background gradients lean on `bg-linear-to-b` utilities plus layered `div`s with `bg-foreground/5`, shadows, and rounded corners.
- Phone mockups are built from nested `div`s and `next/image`, using `aspect-9/19`, `border`, and `shadow` helpers to mimic hardware.
- `PainPoints` uses `lucide-react` icons (`AlarmClock`, `Frown`, `Volume2`) with pill-style text.
- The hero and feature sections reuse the same `Button` variant mixins so the store CTAs stay identical.

## Anti-patterns

- Do not move business logic into these files; keep them presentational and push behavior into shared hooks or the `components/ui` primitives.
- Avoid inventing new gradient utilities; reuse `bg-linear-to-b`, `bg-accent`, and `text-balance` so the feel stays consistent.
- Never bypass the existing `Button` + `Link` pattern for store downloads; it keeps mobile spacing and icon alignment uniform.
- Do not duplicate these sections elsewhere; if you need a new landing block, add it here and update `app/page.tsx`.
