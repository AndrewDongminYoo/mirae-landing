## Overview

- `components/` contains the rendering layer for landing, policy shells, and UI primitives.
- `landing/` + `policy/` are feature sections; `ui/` is the reusable primitive layer.

## Structure

- `landing/` - marketing sections consumed by `app/page.tsx`.
- `policy/` - legal layout primitives consumed by `app/privacy` and `app/terms`.
- `ui/` - CVA + Radix wrappers (`button`, `toast`, `dialog`, `tabs`, etc.).
- `theme-provider.tsx` - optional `next-themes` wrapper (currently not mounted by root layout).

## Where to look

- Navigation/footer behavior: `components/landing/header.tsx`, `components/landing/footer.tsx`.
- Legal wrapper markup: `components/policy/policy-layout.tsx`.
- Variant extension points: `components/ui/button.tsx`, `components/ui/badge.tsx`, `components/ui/toast.tsx`.

## Conventions

- Keep landing sections presentational; push reusable controls into `components/ui`.
- Use `cn()` and CVA for variant logic in primitives.
- Reuse `PolicyLayout`/`PolicySection` instead of duplicating legal page chrome.

## Notes

- `theme-provider.tsx` is available but optional; root layout currently renders without it.
- Route pages import section components directly from this tree (`landing/` and `policy/`).

## Anti-patterns

- Do not add global CSS files under `components/`; use `app/globals.css` tokens/utilities.
- Do not implement layout-specific one-off styles inside `components/ui` primitives.
- Do not duplicate landing section markup under other directories.
