## Overview

- Mirae is a Next 16 App Router marketing site, built with pnpm + Tailwind 4.
- Landing sections are server components that lean on a shared design system and two legal pages.

## Structure tree

- `.` (root) contains `AGENTS.md`, `app/AGENTS.md`, `components/AGENTS.md`, `components/landing/AGENTS.md`, and `components/ui/AGENTS.md`.
- `app/` holds the App Router entry, metadata-aware layout, and legal pages.
- `components/` nests landing sections, policy shells, a theme provider, and the UI primitives.
- `public/` keeps the mockup art and icons referenced by the landing sections.
- `styles/` hosts `globals.css`; `lib/` exposes helpers; `hooks/` holds shared client utilities.

## Where to look

- `app/page.tsx` orchestrates `Header`, `Hero`, `Problem`, `PainPoints`, each feature, CTAs, and `Footer`.
- `components/landing/` contains every marketing section plus the sticky header/footer used everywhere.
- `app/privacy` and `app/terms` render policy copy through `components/policy/policy-layout.tsx` and `policy-section.tsx`.
- `components/ui/` defines the CVA-driven primitives, toast system, and reusable icon/button patterns.
- `styles/globals.css` wires Tailwind 4, `tw-animate-css`, the oklch tokens, and `@theme inline` alias.
- `public/images/` stores the `mirae-*.png` mockups used by `Hero` and the feature sections.

## Code map

- `app/layout.tsx` exports metadata, viewport hints, imports `styles/globals.css`, and renders `<Analytics />`.
- `app/page.tsx` layers `Header`, hero/problem/pain-point sections, three feature calls, CTA, final CTA, and `Footer` inside `<main>`.
- `app/privacy/page.tsx` and `app/terms/page.tsx` each export `metadata`, `PolicyLayout`, and `PolicySection` content with predefined arrays of copy.
- `components/policy/policy-layout.tsx` wraps legal copy with the shared header/footer and the `PolicySection` gutter.
- `components/theme-provider.tsx` re-exports `next-themes` for future client layouts.
- `components/landing/*` files style every section with gradients, `lucide-react` icons, `next/image` mockups, and CTA buttons.
- `components/ui/*` files expose wrappers around `@radix-ui` primitives, CVA variants, `Slot`, and focus/animation states.
- `hooks/use-toast.ts` and `components/ui/use-toast.ts` drive the same reducer-based toast store; keep them aligned before refactors.
- `hooks/use-mobile.ts` and `components/ui/use-mobile.tsx` provide the same breakpoint detector for client use.
- `lib/utils.ts` exports the `cn` helper that merges `clsx` + `twMerge`.
- `styles/globals.css` defines color tokens, radius variables, `@custom-variant dark`, and base layer styling.

## Conventions

- Default to server components inside `app/`; add `"use client"` only when the component uses state, effects, or context (header, theme provider, toast hooks).
- Always pass classes through `cn`; put reusable variants inside the CVA configs in `components/ui`.
- Wrap every App Store/Google Play CTA with `<Button asChild>` + `<Link>` so spacing stays consistent.
- Favor `lucide-react` icons and `@radix-ui` primitives instead of hand-building interactive behavior.
- Keep typography balanced via the `text-balance` utility, generous `tracking-tight`, and `bg-linear-to-b` background helpers.
- Legal copy uses `components/policy/policy-section.tsx` so every section shares the same padding, background, and `detail` styling.

## Anti-patterns

- Do not convert the server pages in `app/` into client components just to use hooks; extract wrappers instead.
- Avoid rewriting primitives like `Button` or `Toast` outside `components/ui`; extend variants instead of copying logic.
- Do not scatter new font or animation imports; keep tokens centralized inside `styles/globals.css`.
- Avoid linking remote images directly; prefer `next/image` pointed at `public/` assets so `images.unoptimized` stays in sync with `next.config.ts`.

## Unique styles

- `styles/globals.css` seeds the palette with `oklch` tokens, `--radius`, `--sidebar` palettes, and registers the `.dark` overrides plus `@custom-variant dark` for Tailwind 4.
- `@theme inline` exposes the token set to utility classes, so `components/landing` sections can use `var(--color-*)` through color helpers.
- Most sections lean on `tw-animate` helpers, layered `blur` circles, and `text-balance` while stacking `bg-linear-to-b` gradients across `div`s.
- Phone mockups use `next/image`, `aspect-9/19`, and layered borders/shadows to mimic curved glass with `bg-card` backgrounds.

## Commands

- `pnpm dev` – start the Next dev server with App Router support.
- `pnpm build` – build for production; `next.config.ts` currently ignores TypeScript build errors.
- `pnpm lint` – run ESLint with the Next.js config, `simple-import-sort`, and the `@eslint/js` parser.

## Notes

- `pnpm-lock.yaml` shows pnpm is the package manager here; please keep using pnpm.
- `next.config.ts` flips on `typescript.ignoreBuildErrors` and `images.unoptimized` for this staging site.
- `hooks/use-toast.ts` and `components/ui/use-toast.ts` share the reducer logic; keep them in sync or consider deduplicating once the UI tree stabilizes.
- `hooks/use-mobile.ts` mirrors `components/ui/use-mobile.tsx` so both layers can detect the 768px breakpoint consistently.
- No AGENTS.md existed before this change; this file anchors the new hierarchy.
