## Overview

- `components/` contains the rendering layer for landing, policy shells, and UI primitives.
- `landing/` + `policy/` are feature sections; `ui/` is the reusable primitive layer.

## Structure

- `landing/` - marketing sections consumed by `app/page.tsx`.
- `policy/` - legal markdown sources (`privacy.md`, `service.md`) and rendering layer consumed by `app/privacy` and `app/terms`.
- `ui/` - CVA-driven primitives (`button`, `animate-on-scroll`).
- `google-ads-tag.tsx` - server component rendering the Google Ads `next/script` tag; mounted by `app/layout.tsx`.

## Where to look

- Navigation/footer behavior: `components/landing/header.tsx`, `components/landing/footer.tsx`.
- Legal content source of truth: `components/policy/privacy.md`, `components/policy/service.md`.
- Legal wrapper markup: `components/policy/policy-layout.tsx`.
- Variant extension points: `components/ui/button.tsx`.

## Conventions

- Keep landing sections presentational; push reusable controls into `components/ui`.
- Use `cn()` and CVA for variant logic in primitives.
- Reuse `PolicyLayout`/`MarkdownSections` instead of duplicating legal page chrome.

## Notes

- Route pages import section components directly from this tree (`landing/` and `policy/`).
- `ui/` is intentionally minimal; the shadcn preset primitives were removed once nothing imported them, so add a primitive back only when a real consumer exists.

## Anti-patterns

- Do not add global CSS files under `components/`; use `app/globals.css` tokens/utilities.
- Do not implement layout-specific one-off styles inside `components/ui` primitives.
- Do not duplicate landing section markup under other directories.
