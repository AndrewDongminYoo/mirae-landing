## Overview

- `components/` bundles the landing sections, legal wrappers, a theme provider, and the shared UI primitives.
- Landing sections and policy wrappers feed the `app/page.tsx`, `app/privacy`, and `app/terms` pages.
- `components/ui/` is the design system that other folders depend on for buttons, inputs, toasts, and popovers.

## Structure

- `landing/` – hero, CTA, feature blocks, header, and footer used by `app/page.tsx`.
- `policy/` – `policy-layout.tsx` and `policy-section.tsx` that share the same frame used by both policy pages.
- `theme-provider.tsx` – re-exports `next-themes` and is the only client-side theme hook today.
- `ui/` – CVA-driven primitives, Radix wrappers, and client hooks (toast, mobile) that power the rest of the UI.

## Where to look

- `components/landing/Header.tsx` for the sticky navigation, App Store CTA, and mobile menu logic.
- `components/landing/Footer.tsx` for the footer links, business info zipper, and collapsible details block.
- `components/landing/Hero.tsx` plus the feature files for gradients, `next/image` mockups, and CTA buttons.
- `components/policy/policy-layout.tsx` and `policy-section.tsx` for the legal discipline and header/footer reuse.
- `components/ui/button.tsx`, `toast.tsx`, and `input.tsx` for the CVA pattern and `cn` helper usage.
- `components/ui/use-toast.ts`, `components/ui/use-mobile.tsx`, and `hooks/*` so the toast/mobile store stays in sync across layers.

## Conventions

- Only the header, theme provider, and toast hooks carry `"use client"`; most components remain server-friendly.
- Pass every class combo through `cn`; build variants with `class-variance-authority` inside `components/ui`.
- Buttons, toasts, and dropdowns reuse the same CVA configs to keep focus, hover, and disabled states synchronized.
- Use `lucide-react` icons rather than inline SVG when a simple icon is needed.
- Keep landing sections thin: isolate gradient wrappers, descriptive copy, and `next/image` phone mockups.

## Anti-patterns

- Do not copy landing markup into `components/ui` or policy files; keep landing sections grouped under `landing/`.
- Avoid inventing new button variants outside `components/ui/button.tsx`; extend the variant map instead.
- Do not add global CSS inside `components/`; rely on `styles/globals.css` and Tailwind utilities.
- Resist the urge to wrap radic primitives with extra logic; use the exported providers/helpers when you need toast or tooltip behavior.
