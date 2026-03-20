## Overview

- `scripts/` contains repo automation for screenshot and token sync.
- These scripts bridge data from the app workspace into this web repo.

## Structure

- `import_tokens.ts` - reads token JSON and updates mapped CSS variables.
- `tokens.config.ts` - token-name to CSS-variable mapping source of truth.
- `import_screenshots.sh` - copies/normalizes screenshot assets into `public/screens`.
- `lib/common.sh` - shared shell helpers for import scripts.
- `import_tokens.test.ts` - script-level behavior tests.

## Where to look

- Token import pipeline: `scripts/import_tokens.ts` + `scripts/tokens.config.ts`.
- Screenshot import pipeline: `scripts/import_screenshots.sh` + `scripts/lib/common.sh`.
- Token script tests: `scripts/import_tokens.test.ts`.

## Code map

- Token sync updates `app/globals.css` `:root` and `.dark` variable blocks only.
- Screenshot sync populates locale-specific folders under `public/screens/ko` and `public/screens/en`.

## Conventions

- Use `MIRAE_APP_DIR` to point at the source app workspace when running sync scripts.
- Use dry-run variants first (`pnpm import:tokens:dry`, `pnpm import:screenshots:dry`).
- Token updates must only target mapped variables in `app/globals.css`.

## Notes

- Treat script output as generated artifacts; commit reviewed results, not hand-edited alternatives.
- Keep mapping changes in `tokens.config.ts` coupled with test updates in `import_tokens.test.ts`.

## Anti-patterns

- Do not edit generated screenshot files manually.
- Do not modify token variables directly when the source of truth is tokens JSON.
- Do not run live sync scripts blindly when dry-run output indicates unexpected diffs.
