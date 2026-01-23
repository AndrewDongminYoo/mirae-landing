## Overview

- `app/` is the App Router root for the marketing experience plus the privacy and terms pages.
- `layout.tsx` defines metadata, viewport hints, and injects `styles/globals.css` plus `<Analytics />`.
- `page.tsx` renders the header, hero, feature sections, CTAs, and footer by composing `components/landing` exports.
- `privacy` and `terms` pages export rich metadata and render their copy through `components/policy/policy-layout.tsx` and `policy-section.tsx`.

## Structure

- `layout.tsx` – metadata, theme color, fonts, analytics, and the `<body>` class stack.
- `page.tsx` – main `<main>` that wires `Header`, `Hero`, `Problem`, `PainPoints`, feature sections, CTA, and `Footer`.
- `privacy/page.tsx` – metadata plus arrays (`autoCollection`, `thirdPartyPartners`) consumed by `PolicySection` rows.
- `terms/page.tsx` – metadata plus lists (`userObligations`, `liabilityLimits`) rendered through `PolicyLayout`.
- `globals.css` – Tailwind entry, tokens, and base styles imported by `layout.tsx`.
- `favicon.ico` – the site icon served from this folder for the App Router.

## Where to look

- `layout.tsx` for the shared metadata object, viewport override, and analytics placement.
- `page.tsx` for the sequence of marketing sections and CTA stack that reference `components/landing` exports.
- `app/privacy/page.tsx` for the policy table data and the `PolicyLayout` highlight/updatedAt fields (last updated 2026-01-22).
- `app/terms/page.tsx` for the obligation/liability lists and the same `PolicyLayout` wrapper.
- `styles/globals.css` for the tokens that back the hero gradients and the `body` base.
- `components/policy/policy-layout.tsx` and `policy-section.tsx` for the legal section casing shared by both policy pages.

## Conventions

- Components in `app/` remain server components; add `"use client"` only when a local client tree is required (none inside `app/` today).
- Metadata objects use the `Metadata` type imported from `next` and are defined next to the exported component.
- `PolicyLayout` wraps legal copy, so keep highlights, `updatedAt`, and `Contact` text inside the layout props rather than duplicating the header/footer.
- The policy tables rely on the `autoCollection`, `thirdPartyPartners`, `userObligations`, and `liabilityLimits` arrays; keep those simple data exports to avoid JSX noise.

## Anti-patterns

- Avoid adding stateful hooks or `use client` directives to the existing `app/` pages; wrap interactive behavior in isolated client components if you must.
- Do not move global metadata (title, description, icons) from `layout.tsx` into `page.tsx`; `layout` owns the document head.
- Keep new styling tokens inside `styles/globals.css` rather than scattering CSS files in `app/`.
- Do not hardcode fonts or animation imports inside these files; extend `styles/globals.css` instead.
