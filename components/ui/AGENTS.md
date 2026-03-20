## Overview

- `components/ui/` is the reusable primitive layer.
- It contains CVA-driven components and Radix wrappers used by landing/legal surfaces.

## Structure

- Form primitives: `input.tsx`, `textarea.tsx`, `label.tsx`.
- Action/display primitives: `button.tsx`, `badge.tsx`, `card.tsx`.
- Interaction wrappers: `dialog.tsx`, `select.tsx`, `switch.tsx`, `tabs.tsx`, `radio-group.tsx`, `toast.tsx`.

## Where to look

- Variant model and CTA behavior: `components/ui/button.tsx`.
- Toast rendering primitives: `components/ui/toast.tsx`.
- Generic card/surface framing: `components/ui/card.tsx`.

## Conventions

- Use `cn()` from `lib/utils.ts` for class merging.
- Define variants with CVA; extend maps rather than ad-hoc class concatenation.
- Keep primitives layout-agnostic and composable.

## Notes

- This folder does not contain `use-toast`/`use-mobile` hooks; behavioral hooks live in `hooks/`.
- For toast behavior wiring, pair `components/ui/toast.tsx` with state logic from `hooks/use-toast.ts`.

## Anti-patterns

- Do not import `clsx` or `tailwind-merge` directly in primitive files; route through `cn()`.
- Do not duplicate hook/store logic in this folder; `hooks/` owns behavioral hooks.
- Do not encode landing-specific layout decisions in primitive components.
