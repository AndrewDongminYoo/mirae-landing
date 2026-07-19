## Overview

- `components/ui/` is the reusable primitive layer.
- It contains CVA-driven components used by landing/legal surfaces.

## Structure

- Action primitives: `button.tsx`.
- Presentation wrappers: `animate-on-scroll.tsx`.

## Where to look

- Variant model and CTA behavior: `components/ui/button.tsx`.
- Scroll-reveal wrapper and its `AnimationVariant` union: `components/ui/animate-on-scroll.tsx`.

## Conventions

- Use `cn()` from `lib/utils.ts` for class merging.
- Define variants with CVA; extend maps rather than ad-hoc class concatenation.
- Keep primitives layout-agnostic and composable.

## Notes

- This layer is deliberately small; the shadcn preset components that shipped with the scaffold were removed once nothing imported them.
- Behavioral hooks live in `hooks/`, not here.
- `Button` is commonly used with `asChild` wrapping a `next/link` for store CTAs.

## Anti-patterns

- Do not import `clsx` or `tailwind-merge` directly in primitive files; route through `cn()`.
- Do not duplicate hook/store logic in this folder; `hooks/` owns behavioral hooks.
- Do not encode landing-specific layout decisions in primitive components.
