## Overview

- `hooks/` contains shared client-side behavior hooks.
- Current hooks: `use-mobile.ts` and `use-toast.ts`.

## Structure

- `use-mobile.ts` - viewport breakpoint utility returning a normalized boolean.
- `use-toast.ts` - reducer-based toast queue/store and public helper APIs.

## Where to look

- Breakpoint detection logic: `hooks/use-mobile.ts`.
- Toast reducer/store actions: `hooks/use-toast.ts`.

## Code map

- `use-toast.ts` exports `toast` and `useToast`, with state transition actions for add/update/dismiss/remove.
- `use-mobile.ts` uses `window.matchMedia` with a shared breakpoint constant.

## Conventions

- Keep hooks framework-agnostic to page/section structure.
- Export stable typed APIs (`useToast`, `toast`, `useIsMobile`) instead of leaking internals.
- Keep browser-only code inside effects so SSR boundaries stay safe.

## Notes

- `use-mobile.ts` currently has limited direct usage; verify callers before changing breakpoint behavior.
- `use-toast.ts` is designed to pair with `components/ui/toast.tsx` rather than owning UI rendering.

## Anti-patterns

- Do not duplicate hook implementations under `components/ui`.
- Do not couple hooks directly to specific landing components.
- Do not add style/layout concerns into hook modules.
