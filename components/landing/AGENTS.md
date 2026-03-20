## Overview

- `components/landing/` contains all sections rendered by `app/page.tsx`.
- Files are kebab-case (`header.tsx`, `hero.tsx`, `feature-voice.tsx`, ...).

## Structure

- `header.tsx` - sticky top nav + mobile menu toggle.
- `hero.tsx` - lead copy + store CTA + screenshot hero frame.
- `problem.tsx`, `pain-points.tsx` - pain framing before feature sections.
- `feature-voice.tsx`, `feature-record.tsx`, `feature-settings.tsx` - three feature detail blocks.
- `cta.tsx`, `final-cta.tsx` - conversion sections.
- `footer.tsx` - brand/legal/footer links.

## Where to look

- Screenshot references and phone mockups: `hero.tsx` and `feature-*.tsx`.
- Store CTA pattern: `hero.tsx`, `final-cta.tsx`.
- Navigation labels/anchors: `header.tsx`.
- Footer business info/contact links: `footer.tsx`.

## Conventions

- Use `<Button asChild><Link ... /></Button>` for app-store CTAs.
- Reuse `getScreenPath()` from `lib/screens.ts` for `/public/screens/{locale}` assets.
- Keep sections mostly presentational; avoid local business state.

## Anti-patterns

- Do not hardcode screenshot paths that bypass `getScreenPath()`.
- Do not create alternate CTA link/button structures for store actions.
- Do not add reusable primitive logic here; move it to `components/ui`.
