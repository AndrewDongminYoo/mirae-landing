## Overview

- `hooks/` contains shared client-side behavior hooks.
- Current hooks: `use-scroll-animation.ts`.

## Structure

- `use-scroll-animation.ts` - IntersectionObserver wrapper returning a ref and an `isInView` flag.

## Where to look

- Scroll-reveal trigger logic: `hooks/use-scroll-animation.ts`.
- The component that consumes it: `components/ui/animate-on-scroll.tsx`.

## Code map

- `useScrollAnimation<T>()` is generic over the observed element type and defaults to `HTMLDivElement`.
- It accepts a threshold and a `triggerOnce` flag, and returns `{ ref, isInView }`.

## Conventions

- Keep hooks framework-agnostic to page/section structure.
- Export stable typed APIs instead of leaking internals.
- Keep browser-only code inside effects so SSR boundaries stay safe.

## Notes

- `AnimateOnScroll` is the only direct consumer; landing and policy sections use the component rather than the hook.

## Anti-patterns

- Do not duplicate hook implementations under `components/ui`.
- Do not couple hooks directly to specific landing components.
- Do not add style/layout concerns into hook modules.
