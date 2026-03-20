## Overview

- `lib/` is for shared pure utilities.
- Key files are `utils.ts` (`cn`) and `screens.ts` (`getScreenPath`).

## Structure

- `utils.ts` - class-name composition helper used across UI primitives.
- `screens.ts` - canonical screenshot key map and locale-aware path generation.
- `screens.test.ts` - verification for `getScreenPath` behavior and key coverage.

## Where to look

- Class merge helper used by UI primitives: `lib/utils.ts`.
- Localized screenshot key map + path resolver: `lib/screens.ts`.
- Utility verification tests: `lib/screens.test.ts`.

## Code map

- `cn(...inputs)` wraps `clsx` + `twMerge`; consumers should not recreate this merge logic.
- `ScreenKey` and `ScreenLocale` in `screens.ts` constrain screenshot access paths.

## Conventions

- Keep functions side-effect free and small.
- Keep screenshot naming aligned with `public/screens/{ko,en}`.
- Keep helper APIs typed and deterministic for easy testing.

## Notes

- Landing sections should import `getScreenPath()` instead of embedding locale-specific file names.
- If screenshot names change, update both `lib/screens.ts` and `lib/screens.test.ts` together.

## Anti-patterns

- Do not hardcode screenshot file names in landing components.
- Do not bypass `cn()` with ad-hoc merge helpers.
- Do not import filesystem/runtime-specific logic into this utility layer.
