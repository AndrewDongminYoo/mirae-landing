## Overview

- `app/` is the App Router root for landing and legal routes.
- `layout.tsx` owns global metadata, viewport, and `./globals.css` import.

## Structure

- `layout.tsx` - metadata/viewport + `<Analytics />` mount.
- `page.tsx` - landing composition entry (imports all landing sections).
- `privacy/page.tsx` - privacy content arrays + `PolicyLayout` composition.
- `terms/page.tsx` - terms content arrays + `PolicyLayout` composition.
- `globals.css` - Tailwind 4 entry and design tokens (`:root` + `.dark`).

## Where to look

- Shared SEO/meta behavior: `app/layout.tsx`.
- Landing section order: `app/page.tsx`.
- Legal content text updates: `app/privacy/page.tsx`, `app/terms/page.tsx`.
- Token/theme updates: `app/globals.css`.

## Conventions

- Keep route files server components by default.
- Export route `metadata` alongside each page when route-level SEO differs.
- Keep policy copy mostly data-first (arrays/objects) to minimize JSX repetition.

## Anti-patterns

- Do not add `"use client"` to full route files just to use one interactive element.
- Do not move head metadata concerns from `layout.tsx` into child routes unless route-specific.
- Do not move design tokens out of `app/globals.css`.
