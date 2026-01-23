## Overview

- `components/ui/` is the design system of CVA-driven primitives, Radix wrappers, and client hooks that the rest of the app consumes.
- Most exports are themed wrappers (`Button`, `Toast`, `Input`, `Popover`, etc.) that expose variant props and forward refs.
- The folder also duplicates the toast/mobile hooks so both primitives and the `hooks/` directory can share the same logic.

## Structure

- `button.tsx` – CVA variant map plus the `Button` component that uses `clsx`, `twMerge`, and `Slot` for `asChild` CTA buttons.
- `toast.tsx` & `use-toast.ts` – Radix provider, viewport, toast root/action/close, and the reducer-driven `useToast`/`toast` helpers.
- `input.tsx`, `textarea.tsx`, `label.tsx`, `field.tsx`, `form.tsx` – form primitives with consistent border, focus, and disabled states.
- Overlay primitives (`popover.tsx`, `dropdown-menu.tsx`, `dialog.tsx`, `drawer.tsx`, `sheet.tsx`, `alert-dialog.tsx`, etc.) that rely on Radix props and expose variant props for size/position.
- Navigation helpers (`tabs.tsx`, `table.tsx`, `navigation-menu.tsx`, `sidebar.tsx`, `pagination.tsx`, `breadcrumb.tsx`, `menu` components) that reuse the same tokens and spacing.
- Utility hooks (`use-mobile.tsx`, `use-toast.ts`) that mirror the ones in `hooks/` so both UI primitives and other parts of the app can import them.
- Miscellaneous wrappers (`badge.tsx`, `avatar.tsx`, `badge`, `skeleton.tsx`, `toast.tsx`) that all feed into the same `cn` + CVA styling approach.

## Where to look

- `button.tsx` for the base CVA definition, default variant map, and the `asChild` pattern used across CTAs.
- `toast.tsx` for the provider/viewport, `ToastAction`, `ToastClose`, and the class names that hook into `sonner`-like animations.
- `input.tsx` and `textarea.tsx` for the form control spacing and disabled/focus outlines.
- `popover.tsx`, `dropdown-menu.tsx`, and `dialog.tsx` for the `Radix` overlay conventions and `cn` usage with `data-state` selectors.
- `navigation-menu.tsx`, `tabs.tsx`, and `sidebar.tsx` for the layout of the navigation primitives and how they layer `border`, `hover`, and `focus` styling.
- `components/ui/use-toast.ts` and `hooks/use-toast.ts` for the shared reducer; validate any changes to one by mirroring it in the other file.
- `components/ui/use-mobile.tsx` for the 768px breakpoint hook that the header and other responsive pieces rely on.

## Conventions

- Use the `cn` helper from `lib/utils.ts`; never merge classes manually with `+` or template strings in these files.
- Define variant props with `class-variance-authority`, export `VariantProps`, and let callers pass `size`, `variant`, etc.
- Always forward refs (`React.forwardRef`) so Radix/Next focus management stays intact.
- Keep focus styles, `data-[state]`, and `aria` props aligned across comparable primitives to avoid visual glitches.
- Reuse the provided `ToastViewport`, `ToastProvider`, and `toast` helper instead of creating new toast implementations.
- Keep UI primitives stateless and purely presentational; push behavior into hooks or the consuming component.

## Anti-patterns

- Do not bypass CVA by hardcoding new tailwind strings inside the JSX; add them via the variant map instead.
- Avoid duplicating the same logic across multiple primitives; factor shared classes into the `cn` helper or variant defaults.
- Do not import `clsx`/`twMerge` outside `lib/utils.ts`; use the exported `cn` function for consistency.
- Resist adding layout-specific markup inside these primitives; keep them generic so the landing page can compose them differently.
