## Overview

- 온음(WarmWake) is a Next.js 16 App Router marketing site built with pnpm, React 19, and Tailwind CSS 4.
- The core surface is a landing page (`app/page.tsx`) plus legal pages (`/privacy`, `/terms`) sharing policy wrappers.

## Structure tree

- `.` holds root config, docs, and AGENTS hierarchy.
- `app/` owns routes, metadata, and `app/globals.css`.
- `components/` splits into `landing/`, `policy/`, and `ui/` primitives.
- `hooks/`, `lib/`, and `scripts/` provide shared logic and import pipelines.
- `public/screens/{ko,en}` stores localized app screenshots used by landing sections.

## Where to look

- Landing composition: `app/page.tsx`.
- Legal content (single source of truth): `components/policy/privacy.md`, `components/policy/service.md`.
- Global tokens/theme variables: `app/globals.css`.
- CTA and section visuals: `components/landing/*.tsx`.
- Primitive variants and Radix wrappers: `components/ui/*.tsx`.
- Screenshot path resolver: `lib/screens.ts`.
- Token/screenshot sync pipeline: `scripts/import_tokens.ts`, `scripts/import_screenshots.sh`.

## Code map

- `app/layout.tsx` exports `metadata` + `viewport`, imports `./globals.css`, and mounts `<Analytics />`.
- `components/policy/privacy.md` and `service.md` are the canonical legal documents; pages read and render them via `markdown-sections.tsx`.
- `components/policy/policy-layout.tsx` centralizes legal page chrome (header/footer, title block, section container).
- `lib/utils.ts` exports `cn()`; all UI primitives should rely on it for class merging.
- `hooks/use-toast.ts` contains reducer/store logic; `components/ui/toast.tsx` contains visual primitives.
- `lib/screens.ts` defines canonical screenshot keys and locale-aware URL generation.

## Conventions

- Keep `app/` pages server-first; only opt into `"use client"` when state/effects are required.
- Use `<Button asChild><Link ... /></Button>` for store/download CTAs.
- Keep tokens and shared visual variables in `app/globals.css`; expose via `@theme inline`.
- Reuse `getScreenPath()` instead of hardcoding `/screens/...` file names.
- Extend UI variants in `components/ui` (CVA + Radix), not inside landing sections.

## Anti-patterns

- Do not reference `styles/globals.css` or `public/images`; this repo uses `app/globals.css` and `public/screens`.
- Do not import `clsx`/`tailwind-merge` directly in feature components; use `cn()` from `lib/utils.ts`.
- Do not copy legal layout markup into page files; use `PolicyLayout` + `PolicySection`.
- Do not bypass import scripts when syncing app screenshots/tokens.

## Unique styles

- Palette is tokenized in CSS variables (`:root` + `.dark`) with warm accent colors and Tailwind 4 token mapping.
- Landing visuals layer gradients/blur circles and phone frames around screenshots from `public/screens`.
- Typography and spacing emphasize `tracking-tight`, rounded card frames, and soft border/shadow treatment.

## Commands

- `pnpm dev` - run local Next.js dev server.
- `pnpm build` - create production build.
- `pnpm start` - serve production build.
- `pnpm lint` - run ESLint flat config checks.
- `pnpm import:screenshots` / `pnpm import:screenshots:dry` - sync localized screenshots.
- `pnpm import:tokens` / `pnpm import:tokens:dry` - sync token values into `app/globals.css`.
- `pnpm test:tokens` - run token import tests (`node:test` via `tsx --test`).

## Notes

- Package manager is pnpm (`pnpm-lock.yaml` committed).
- `next.config.ts` uses `typescript.ignoreBuildErrors: false` and `images.unoptimized: false`.
- There is currently no CI workflow under `.github/workflows`.
- `components/theme-provider.tsx` exists, but root layout currently does not mount it.
