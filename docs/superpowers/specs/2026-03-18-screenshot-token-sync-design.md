# Design Spec: Screenshot & Design Token Sync (mirae → mirae-web)

**Date:** 2026-03-18
**Status:** Approved
**Scope:** mirae-web import pipeline for app screenshots and design tokens

---

## 1. Problem

mirae-web currently maintains app screenshots and design token colors as manually managed
static files. These drift from the Flutter app (mirae) over time because there is no
automated synchronization between the two repositories.

Two specific pain points:

- **Screenshots** in `public/images/` are not locale-aware and were last updated manually.
- **CSS color variables** in `app/globals.css` were written before a designer joined the
  project (pre-v1.2.0) and coincidentally share some color values with `tokens-studio.json`
  in mirae, but without any semantic alignment.

---

## 2. Goals

1. Make mirae the single source of truth for both screenshots and design tokens.
2. Provide an import pipeline that lives entirely in mirae-web (web pulls from app; app does
   not push to web).
3. Support `--dry-run` for safe preview before any file is modified.
4. Be locale-aware: `ko` (primary) and `en` at the same directory level, ready for future
   web l10n.

---

## 3. Non-Goals

- Automating the screenshot generation itself (handled by the Patrol/AutoRoute workflow in
  mirae).
- Syncing Android screenshots (iOS only for the landing page).
- Mapping web-specific CSS variables (`--accent`, `--accent-blue`, `--ring`, `--chart-*`,
  `--sidebar-*`) to any app token — these remain web-only design decisions.
- CI/CD auto-trigger — both scripts are run manually by the developer.

---

## 4. Architecture

### 4.1 Source → Target Mapping

```log
$MIRAE_APP_DIR  (env var, required)
├── fastlane/screenshots/ios/ko/*.png        →  public/screens/ko/
├── fastlane/screenshots/ios/en-US/*.png     →  public/screens/en/
└── tokens-studio.json                       →  app/globals.css
```

`tokens-studio.json` node shape (verified):

```json
{
  "color": {
    "role": {
      "light": { "primary": { "value": "#F99C50", "type": "color" }, ... },
      "dark":  { "primary": { "value": "#F99C50", "type": "color" }, ... }
    }
  }
}
```

Both `color.role.light` and `color.role.dark` exist in the same single file.
Resolving a dot-path always terminates at `{ "value": "...", "type": "color" }`;
the resolver must extract `.value`, not the node itself.

### 4.2 New Files in mirae-web

```log
mirae-web/
├── scripts/
│   ├── lib/
│   │   └── common.sh          # MIRAE_APP_DIR validation, log helpers
│   ├── import_screenshots.sh  # Shell: copy PNG files by locale
│   ├── import_tokens.ts       # Node.js: overwrite CSS variables from token JSON
│   └── tokens.config.ts       # Declarative name-bridge mapping
└── public/
    └── screens/               # replaces public/images/ for app screenshots
        ├── ko/                # iOS ko screenshots
        └── en/                # iOS en-US screenshots
```

### 4.3 pnpm Scripts (package.json additions)

| Script                        | Command                                        |
| ----------------------------- | ---------------------------------------------- |
| `pnpm import:screenshots`     | `bash scripts/import_screenshots.sh`           |
| `pnpm import:screenshots:dry` | `bash scripts/import_screenshots.sh --dry-run` |
| `pnpm import:tokens`          | `tsx scripts/import_tokens.ts`                 |
| `pnpm import:tokens:dry`      | `tsx scripts/import_tokens.ts --dry-run`       |

---

## 5. Component Design

### 5.1 `scripts/lib/common.sh`

Provides shared helpers sourced by other scripts.

**Functions:**

```bash
require_mirae_app_dir()   # exits 1 if MIRAE_APP_DIR unset or directory missing
log_info  "message"       # prints "[INFO]  message" to stdout
log_warn  "message"       # prints "[WARN]  message" to stderr
log_error "message"       # prints "[ERROR] message" to stderr
```

All log functions prefix with the script name: `[import_screenshots]`, `[import_tokens]`, etc.
`log_error` is always followed by `exit 1` at the call site.

### 5.2 `import_screenshots.sh`

**Inputs:**

- `MIRAE_APP_DIR` env var (required)
- `--dry-run` flag (optional)

**Locale map** (explicit, exhaustive for now):

| Source locale dir                | Target dir          |
| -------------------------------- | ------------------- |
| `fastlane/screenshots/ios/ko`    | `public/screens/ko` |
| `fastlane/screenshots/ios/en-US` | `public/screens/en` |

Adding a new locale requires updating this map. Unknown locale directories in the source
are not auto-discovered and are silently ignored.

**PNG count invariant:** between 5 and 10 PNG files (inclusive) are required per locale.
This accommodates different screen counts across app versions while guarding against
obviously incomplete or over-quota imports. If the count falls outside this range,
the script exits non-zero.

**Behaviour:**

1. Source `lib/common.sh`; call `require_mirae_app_dir`.
2. For each locale pair:
   - Verify source directory exists (exit 1 if missing).
   - Count `*.png` files; exit 1 if count ≠ 8, reporting actual count.
   - In dry-run: for each file, print `NEW` / `CHANGED` / `UNCHANGED` status.
   - In live: `mkdir -p` target dir; copy each file with `cp`.
3. Print summary line; exit 0 on success.

**Example output (dry-run):**

```log
[import_screenshots] ios/ko → public/screens/ko  (8 files, dry-run)
  warmwake-alarm-home.png     NEW
  warmwake-alarm-detail.png   UNCHANGED
  warmwake-alarm-ring.png     CHANGED
[import_screenshots] dry-run: 1 changed, 1 new, 6 unchanged
```

### 5.3 `tokens.config.ts`

Declares the name-bridge between Tailwind CSS variables and `tokens-studio.json` paths.

**Design principle:** mapping is name-driven, not value-driven. A CSS variable maps to a
token by semantic role equivalence, regardless of whether their current color values match.
CSS variables not present in this map are never touched by `import_tokens.ts`.

```ts
// CSS variable name → dot-path into tokens-studio.json (resolves to .value)
export const TOKEN_MAP: Record<string, Record<string, string>> = {
  ":root": {
    "--background": "color.role.light.scaffoldBackground",
    "--foreground": "color.role.light.onSurface",
    "--card": "color.role.light.surfaceContainer",
    "--card-foreground": "color.role.light.onSurface",
    "--primary": "color.role.light.primary",
    "--primary-foreground": "color.role.light.onPrimary",
    "--secondary": "color.role.light.secondaryContainer",
    "--secondary-foreground": "color.role.light.onSecondaryContainer",
    "--muted": "color.role.light.surface",
    "--muted-foreground": "color.role.light.onSurfaceVariant",
    "--destructive": "color.role.light.error",
    "--destructive-foreground": "color.role.light.onError",
    "--border": "color.role.light.outline",
    "--input": "color.role.light.outline",
  },
  ".dark": {
    "--background": "color.role.dark.scaffoldBackground",
    "--foreground": "color.role.dark.onSurface",
    "--card": "color.role.dark.surfaceContainer",
    "--card-foreground": "color.role.dark.onSurface",
    "--primary": "color.role.dark.primary",
    "--primary-foreground": "color.role.dark.onPrimary",
    "--secondary": "color.role.dark.secondaryContainer",
    "--secondary-foreground": "color.role.dark.onSecondaryContainer",
    "--muted": "color.role.dark.surface",
    "--muted-foreground": "color.role.dark.onSurfaceVariant",
    "--destructive": "color.role.dark.error",
    "--destructive-foreground": "color.role.dark.onError",
    "--border": "color.role.dark.outline",
    "--input": "color.role.dark.outline",
  },
};

// CSS variables intentionally NOT in TOKEN_MAP (web-only, never overwritten):
// --accent, --accent-blue, --ring, --popover, --popover-foreground,
// --chart-1..5, --sidebar-*, and all @theme inline variables
```

### 5.4 `import_tokens.ts`

**Inputs:**

- `MIRAE_APP_DIR` env var (required; checked via `process.env.MIRAE_APP_DIR`)
- `--dry-run` flag detected via `process.argv.includes('--dry-run')`

**Behaviour:**

1. Read `$MIRAE_APP_DIR/tokens-studio.json` and parse as JSON.
2. Read `app/globals.css` (path relative to repo root).
3. For each CSS selector in `TOKEN_MAP` (`:root`, `.dark`):
   a. Locate the selector block in the CSS using start/end boundary detection
   (e.g., find `:root {` … matching `}`). Skip all other blocks including `@theme inline`.
   b. For each mapped variable:
   - Resolve dot-path in JSON → extract `.value` (string). Warn and skip if path missing.
   - Apply regex replacement within the block only:
     `/(  --variable-name:\s*)#[0-9a-fA-F]{3,8}/`
     Note: all current CSS variables in scope use hex format only (verified). No
     `hsl()` / `rgb()` handling needed.
   - Warn and skip if the variable name is not found in the block.
4. In dry-run: print per-variable diff; do not write file.
5. In live: write updated CSS back to `app/globals.css`.
6. Print summary: `N variable(s) updated, M unchanged, K skipped`.

**Example output (dry-run):**

```log
[import_tokens] :root  --primary        #1c1b1f → #F99C50   CHANGED
[import_tokens] :root  --background     #fffbfe → #FFFBFE   no change
[import_tokens] :root  --accent         (not mapped, skipped)
[import_tokens] .dark  --background     #1c1b1f → #1C1B1F   no change
[import_tokens] dry-run: 2 variable(s) would be updated, 12 unchanged, 2 skipped
```

---

## 6. Error Handling

| Condition                          | Behaviour                                                 |
| ---------------------------------- | --------------------------------------------------------- |
| `MIRAE_APP_DIR` not set            | `log_error` + exit 1 with setup instructions              |
| `MIRAE_APP_DIR` dir does not exist | `log_error` + exit 1 with path                            |
| Source locale directory missing    | `log_error` + exit 1 with path                            |
| PNG count < 5 or > 10              | `log_error` + exit 1, report actual count and valid range |
| Token dot-path not found in JSON   | `log_warn` + skip variable, continue                      |
| CSS variable not found in block    | `log_warn` + skip variable, continue                      |
| `tokens-studio.json` not parseable | `log_error` + exit 1                                      |

---

## 7. Out-of-Scope Constraints

- Do not touch `@theme inline` block in `globals.css` — block boundary detection must
  explicitly exclude it.
- Do not rename or reorder existing CSS variables.
- Do not modify any file in mirae.

---

## 8. Testing Approach

### `import_screenshots.sh`

| Test case                        | Expected                                              |
| -------------------------------- | ----------------------------------------------------- |
| Fixture dir with 8 PNGs, dry-run | Prints correct NEW/CHANGED/UNCHANGED; no files copied |
| Fixture dir with 8 PNGs, live    | Files copied to target; existing files overwritten    |
| Source dir missing               | Exits 1 with path in message                          |
| Wrong PNG count (7 or 9)         | Exits 1, reports actual vs expected count             |
| `MIRAE_APP_DIR` not set          | Exits 1 with setup message                            |

### `import_tokens.ts`

| Test case                                                   | Expected                                                                       |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------ |
| All TOKEN_MAP paths resolve in current `tokens-studio.json` | No paths missing                                                               |
| dry-run output format                                       | Each line has variable name, old value, new value, status                      |
| Token path missing in JSON                                  | `[WARN]` line; variable unchanged in output CSS                                |
| CSS variable not found in block                             | `[WARN]` line; rest of variables processed normally                            |
| `@theme inline` block                                       | Variables inside `@theme inline` are never replaced                            |
| `.dark` block variables                                     | Correctly replaced using `color.role.dark.*` values                            |
| Live run                                                    | `globals.css` updated; only mapped variables changed; file structure preserved |
| `MIRAE_APP_DIR` not set                                     | Exits 1 with message                                                           |
