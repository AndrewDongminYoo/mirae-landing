# Screenshot & Design Token Sync Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a pull-based import pipeline in mirae-web that syncs iOS app screenshots and design tokens from the mirae Flutter app.

**Architecture:** Two independent shell/Node scripts both read `MIRAE_APP_DIR` env var. `import_screenshots.sh` copies PNG files from Fastlane output into `public/screens/{locale}/`. `import_tokens.ts` reads `tokens-studio.json` and overwrites mapped CSS variables in `app/globals.css` using an explicit name-bridge in `tokens.config.ts`.

**Tech Stack:** bash (shell script), Node.js + TypeScript via `tsx`, `node:test` (built-in test runner)

**Spec:** `docs/superpowers/specs/2026-03-18-screenshot-token-sync-design.md`

---

## File Map

| Action | File                            | Responsibility                                      |
| ------ | ------------------------------- | --------------------------------------------------- |
| CREATE | `scripts/lib/common.sh`         | `MIRAE_APP_DIR` validation, shared log helpers      |
| CREATE | `scripts/import_screenshots.sh` | Copy iOS PNGs by locale into `public/screens/`      |
| CREATE | `scripts/tokens.config.ts`      | Name-bridge: CSS variable → token dot-path          |
| CREATE | `scripts/import_tokens.ts`      | Read tokens JSON, overwrite CSS vars in globals.css |
| CREATE | `scripts/import_tokens.test.ts` | Node built-in tests for token import logic          |
| MODIFY | `package.json`                  | Add `tsx` devDep + import pnpm scripts              |

---

## Task 1: Add `tsx` and pnpm scripts to `package.json`

`tsx` is required to run `.ts` scripts directly. The pnpm scripts give the pipeline a standard entry point.

**Files:**

- Modify: `package.json`

- [ ] **Step 1: Add `tsx` to devDependencies**

```bash
pnpm add -D tsx
```

Expected: `tsx` appears in `package.json` devDependencies.

- [ ] **Step 2: Add import scripts to `package.json`**

Add the following inside the `"scripts"` block in `package.json`:

```json
"import:screenshots":     "bash scripts/import_screenshots.sh",
"import:screenshots:dry": "bash scripts/import_screenshots.sh --dry-run",
"import:tokens":          "tsx scripts/import_tokens.ts",
"import:tokens:dry":      "tsx scripts/import_tokens.ts --dry-run",
"test:tokens":            "tsx --test scripts/import_tokens.test.ts"
```

- [ ] **Step 3: Verify**

```bash
pnpm run --list | grep import
```

Expected: all five new scripts listed.

- [ ] **Step 4: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: add tsx and import pipeline pnpm scripts"
```

---

## Task 2: Create `scripts/lib/common.sh`

Shared helpers sourced by both shell scripts.

**Files:**

- Create: `scripts/lib/common.sh`

- [ ] **Step 1: Create the file**

```bash
mkdir -p scripts/lib
```

Create `scripts/lib/common.sh`:

```bash
#!/usr/bin/env bash
# Shared helpers for mirae-web import scripts.
# Usage: source "$(dirname "$0")/lib/common.sh"

_SCRIPT_NAME="$(basename "${BASH_SOURCE[1]:-$0}" .sh)"

log_info()  { echo "[${_SCRIPT_NAME}] $*"; }
log_warn()  { echo "[${_SCRIPT_NAME}] [WARN]  $*" >&2; }
log_error() { echo "[${_SCRIPT_NAME}] [ERROR] $*" >&2; }

require_mirae_app_dir() {
  if [[ -z "${MIRAE_APP_DIR:-}" ]]; then
    log_error "MIRAE_APP_DIR is not set."
    log_error "Example: MIRAE_APP_DIR=~/path/to/mirae pnpm import:screenshots"
    exit 1
  fi
  if [[ ! -d "${MIRAE_APP_DIR}" ]]; then
    log_error "MIRAE_APP_DIR directory does not exist: ${MIRAE_APP_DIR}"
    exit 1
  fi
}
```

- [ ] **Step 2: Smoke test**

```bash
bash -c 'source scripts/lib/common.sh && log_info "ok"'
```

Expected: `[common] ok`

- [ ] **Step 3: Commit**

```bash
git add scripts/lib/common.sh
git commit -m "feat: add common.sh shared helpers for import scripts"
```

---

## Task 3: Create `scripts/import_screenshots.sh`

Copies 8 PNG files per locale from `$MIRAE_APP_DIR/fastlane/screenshots/ios/{locale}/` to `public/screens/{locale}/`.

**Files:**

- Create: `scripts/import_screenshots.sh`

- [ ] **Step 1: Create the file**

```bash
#!/usr/bin/env bash
# Copies iOS screenshots from the mirae Flutter app into public/screens/.
# Usage: MIRAE_APP_DIR=/path/to/mirae bash scripts/import_screenshots.sh [--dry-run]
#
# PNG count invariant: exactly 8 per locale (matches App Store Connect iphone65 slots).
# Kept in lockstep with mirae/scripts/screenshots/sync_metadata.sh.
# If the Flutter repo adds a 9th screen, update EXPECTED_COUNT in both repos.

set -euo pipefail

source "$(dirname "$0")/lib/common.sh"

DRY_RUN=0
[[ "${1:-}" == "--dry-run" ]] && DRY_RUN=1

EXPECTED_COUNT=8

# locale map: source locale dir → target dir name
declare -A LOCALE_MAP=(
  ["ko"]="ko"
  ["en-US"]="en"
)

require_mirae_app_dir

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

copy_locale() {
  local src_locale="$1"
  local tgt_locale="$2"
  local src_dir="${MIRAE_APP_DIR}/fastlane/screenshots/ios/${src_locale}"
  local tgt_dir="${REPO_ROOT}/public/screens/${tgt_locale}"

  if [[ ! -d "${src_dir}" ]]; then
    log_error "Source directory does not exist: ${src_dir}"
    exit 1
  fi

  shopt -s nullglob
  local files=("${src_dir}"/*.png)
  shopt -u nullglob

  local actual=${#files[@]}
  if [[ ${actual} -ne ${EXPECTED_COUNT} ]]; then
    log_error "Expected ${EXPECTED_COUNT} PNG files in ${src_dir}, found ${actual}"
    exit 1
  fi

  if [[ ${DRY_RUN} -eq 1 ]]; then
    log_info "${src_locale} → public/screens/${tgt_locale}  (${actual} files, dry-run)"
    local changed=0 new=0 unchanged=0
    for f in "${files[@]}"; do
      local name
      name="$(basename "${f}")"
      local tgt="${tgt_dir}/${name}"
      if [[ ! -e "${tgt}" ]]; then
        echo "  ${name}  NEW"
        (( new++ )) || true
      elif ! cmp -s "${f}" "${tgt}"; then
        echo "  ${name}  CHANGED"
        (( changed++ )) || true
      else
        echo "  ${name}  unchanged"
        (( unchanged++ )) || true
      fi
    done
    log_info "dry-run: ${changed} changed, ${new} new, ${unchanged} unchanged"
    return
  fi

  mkdir -p "${tgt_dir}"
  for f in "${files[@]}"; do
    cp "${f}" "${tgt_dir}/$(basename "${f}")"
  done
  log_info "${src_locale} → public/screens/${tgt_locale}: copied ${actual} file(s)"
}

for src_locale in "${!LOCALE_MAP[@]}"; do
  copy_locale "${src_locale}" "${LOCALE_MAP[${src_locale}]}"
done

log_info "done"
```

- [ ] **Step 2: Make executable**

```bash
chmod +x scripts/import_screenshots.sh
```

- [ ] **Step 3: Test — missing MIRAE_APP_DIR**

```bash
bash scripts/import_screenshots.sh
```

Expected: exits 1 with `[ERROR] MIRAE_APP_DIR is not set.`

- [ ] **Step 4: Test — wrong PNG count**

```bash
mkdir -p /tmp/mirae_fixture/fastlane/screenshots/ios/ko
touch /tmp/mirae_fixture/fastlane/screenshots/ios/ko/a.png
MIRAE_APP_DIR=/tmp/mirae_fixture bash scripts/import_screenshots.sh
```

Expected: exits 1 with `Expected 8 PNG files ... found 1`

- [ ] **Step 5: Test — dry-run with 8 files**

```bash
mkdir -p /tmp/mirae_fixture/fastlane/screenshots/ios/ko
mkdir -p /tmp/mirae_fixture/fastlane/screenshots/ios/en-US
for i in 1 2 3 4 5 6 7 8; do
  touch /tmp/mirae_fixture/fastlane/screenshots/ios/ko/screen_${i}.png
  touch /tmp/mirae_fixture/fastlane/screenshots/ios/en-US/screen_${i}.png
done
MIRAE_APP_DIR=/tmp/mirae_fixture bash scripts/import_screenshots.sh --dry-run
```

Expected: prints `NEW` for all 8 files per locale, no files created in `public/screens/`.

- [ ] **Step 6: Test — live copy**

```bash
MIRAE_APP_DIR=/tmp/mirae_fixture bash scripts/import_screenshots.sh
ls public/screens/ko/ public/screens/en/
```

Expected: 8 files in each directory.

- [ ] **Step 7: Cleanup fixture and commit**

```bash
rm -rf /tmp/mirae_fixture
git add scripts/import_screenshots.sh public/screens/
git commit -m "feat: add import_screenshots.sh for locale-aware iOS screenshot sync"
```

> Note: `public/screens/ko/` and `public/screens/en/` directories are committed empty (git tracks directories via `.gitkeep` if needed). The actual PNGs are populated by running the import script and are committed separately when screenshots are updated.

---

## Task 4: Create `scripts/tokens.config.ts`

Declares the name-bridge mapping from Tailwind CSS variables to `tokens-studio.json` dot-paths.

**Files:**

- Create: `scripts/tokens.config.ts`

- [ ] **Step 1: Create the file**

```ts
/**
 * Name-bridge mapping: CSS variable → dot-path in tokens-studio.json.
 *
 * Mapping is NAME-DRIVEN, not value-driven. Each CSS variable maps to a token
 * by semantic role equivalence, regardless of whether current color values match.
 *
 * CSS variables NOT listed here are never touched by import_tokens.ts:
 *   --accent, --accent-blue, --ring, --popover*, --chart-1..5, --sidebar-*
 *   and all variables inside @theme inline.
 *
 * Note: --border and --input both map to color.role.*.outline intentionally
 * (shadcn/ui convention: input border uses the same outline role token).
 */
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
```

- [ ] **Step 2: Verify TypeScript parses cleanly**

```bash
pnpm exec tsx --version && pnpm exec tsx -e "import { TOKEN_MAP } from './scripts/tokens.config.ts'; console.log(Object.keys(TOKEN_MAP))"
```

Expected: `[ ':root', '.dark' ]`

- [ ] **Step 3: Commit**

```bash
git add scripts/tokens.config.ts
git commit -m "feat: add tokens.config.ts name-bridge mapping"
```

---

## Task 5: Create `scripts/import_tokens.ts`

Reads `tokens-studio.json`, resolves each mapped token's `.value`, and overwrites matching CSS variables in `app/globals.css`. Operates only inside `:root { }` and `.dark { }` blocks.

**Files:**

- Create: `scripts/import_tokens.ts`

- [ ] **Step 1: Create the file**

```ts
/**
 * import_tokens.ts
 *
 * Reads $MIRAE_APP_DIR/tokens-studio.json and overwrites mapped CSS variables
 * in app/globals.css. Only `:root` and `.dark` blocks are modified.
 * The `@theme inline` block and all unmapped variables are left untouched.
 *
 * Usage:
 *   MIRAE_APP_DIR=/path/to/mirae pnpm import:tokens
 *   MIRAE_APP_DIR=/path/to/mirae pnpm import:tokens:dry
 */

import fs from "node:fs";
import path from "node:path";
import { TOKEN_MAP } from "./tokens.config.ts";

const DRY_RUN = process.argv.includes("--dry-run");
const PREFIX = "[import_tokens]";

function log(msg: string) {
  console.log(`${PREFIX} ${msg}`);
}
function warn(msg: string) {
  console.warn(`${PREFIX} [WARN]  ${msg}`);
}
function fatal(msg: string): never {
  console.error(`${PREFIX} [ERROR] ${msg}`);
  process.exit(1);
}

// ── Resolve MIRAE_APP_DIR ────────────────────────────────────────────────────

const miraeAppDir = process.env.MIRAE_APP_DIR;
if (!miraeAppDir) {
  fatal("MIRAE_APP_DIR is not set.\nExample: MIRAE_APP_DIR=~/path/to/mirae pnpm import:tokens");
}
if (!fs.existsSync(miraeAppDir)) {
  fatal(`MIRAE_APP_DIR directory does not exist: ${miraeAppDir}`);
}

// ── Load tokens ──────────────────────────────────────────────────────────────

const tokensPath = path.join(miraeAppDir, "tokens-studio.json");
let tokensJson: Record<string, unknown>;
try {
  tokensJson = JSON.parse(fs.readFileSync(tokensPath, "utf8")) as Record<string, unknown>;
} catch {
  fatal(`Failed to parse tokens-studio.json at: ${tokensPath}`);
}

/** Resolves a dot-path like "color.role.light.primary" and extracts .value */
function resolveToken(dotPath: string): string | null {
  const parts = dotPath.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let node: any = tokensJson;
  for (const part of parts) {
    if (node == null || typeof node !== "object") return null;
    node = node[part];
  }
  if (node == null || typeof node !== "object" || typeof node.value !== "string") return null;
  return node.value as string;
}

// ── Load globals.css ─────────────────────────────────────────────────────────

const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const cssPath = path.join(repoRoot, "app", "globals.css");
let css = fs.readFileSync(cssPath, "utf8");

// ── Apply replacements ───────────────────────────────────────────────────────

let updated = 0;
let unchanged = 0;
let skipped = 0;

/**
 * Locates a CSS selector block (e.g. ":root {" … "}") using brace-depth counting
 * so nested rules inside the block are handled correctly.
 * Returns [blockStart, blockEnd] indices (inclusive of braces), or null if not found.
 */
function findBlock(source: string, selector: string): [number, number] | null {
  const openIdx = source.indexOf(`${selector} {`);
  if (openIdx === -1) return null;
  let depth = 0;
  for (let i = openIdx; i < source.length; i++) {
    if (source[i] === "{") depth++;
    else if (source[i] === "}") {
      depth--;
      if (depth === 0) return [openIdx, i];
    }
  }
  return null;
}

for (const [selector, varMap] of Object.entries(TOKEN_MAP)) {
  const bounds = findBlock(css, selector);
  if (!bounds) {
    warn(`Selector block "${selector}" not found in globals.css — skipping all variables for it`);
    skipped += Object.keys(varMap).length;
    continue;
  }
  const [blockStart, blockEnd] = bounds;
  let block = css.slice(blockStart, blockEnd + 1);

  for (const [cssVar, tokenPath] of Object.entries(varMap)) {
    const tokenValue = resolveToken(tokenPath);
    if (!tokenValue) {
      warn(`Token path not found: ${tokenPath} — skipping ${cssVar}`);
      skipped++;
      continue;
    }

    // Match the variable line inside this block only (hex values only).
    const regex = new RegExp(`(${cssVar.replace("--", "--")}:\\s*)(#[0-9a-fA-F]{3,8})`);
    const match = block.match(regex);
    if (!match) {
      warn(`CSS variable "${cssVar}" not found in "${selector}" block — skipping`);
      skipped++;
      continue;
    }

    const oldValue = match[2];
    if (oldValue.toLowerCase() === tokenValue.toLowerCase()) {
      log(
        `${selector.padEnd(6)}  ${cssVar.padEnd(28)}  ${oldValue}  →  ${tokenValue}  (no change)`
      );
      unchanged++;
    } else {
      log(`${selector.padEnd(6)}  ${cssVar.padEnd(28)}  ${oldValue}  →  ${tokenValue}  CHANGED`);
      block = block.replace(regex, `$1${tokenValue}`);
      updated++;
    }
  }

  css = css.slice(0, blockStart) + block + css.slice(blockEnd + 1);
}

// ── Write or report ───────────────────────────────────────────────────────────

if (DRY_RUN) {
  log(
    `dry-run: ${updated} variable(s) would be updated, ${unchanged} unchanged, ${skipped} skipped`
  );
} else {
  if (updated > 0) {
    fs.writeFileSync(cssPath, css, "utf8");
    log(`wrote app/globals.css: ${updated} updated, ${unchanged} unchanged, ${skipped} skipped`);
  } else {
    log(`no changes needed (${unchanged} unchanged, ${skipped} skipped)`);
  }
}
```

- [ ] **Step 2: Dry-run smoke test**

```bash
MIRAE_APP_DIR=/path/to/your/mirae pnpm import:tokens:dry
```

Expected: per-variable lines with CHANGED / no change status, no file modified.

- [ ] **Step 3: Verify `@theme inline` block is untouched**

The `@theme inline` block uses `var(--background)` references, not direct hex values — but confirm the script does not accidentally match these by checking there are no `#` hex values inside `@theme inline`:

```bash
awk '/@theme inline/,/^}/' app/globals.css | grep '#[0-9a-fA-F]'
```

Expected: no output (the `@theme inline` block contains only `var(...)` references).

- [ ] **Step 4: Commit**

```bash
git add scripts/import_tokens.ts
git commit -m "feat: add import_tokens.ts CSS variable sync from tokens-studio.json"
```

---

## Task 6: Write and run tests for `import_tokens.ts`

Uses Node's built-in `node:test` runner (no extra framework needed).

**Files:**

- Create: `scripts/import_tokens.test.ts`

- [ ] **Step 1: Write the test file**

```ts
/**
 * import_tokens.test.ts
 *
 * Tests for token resolution and CSS variable mapping logic.
 * Run: pnpm test:tokens
 */

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import fs from "node:fs";
import path from "node:path";

import { TOKEN_MAP } from "./tokens.config.ts";

// ── Helpers ───────────────────────────────────────────────────────────────────

const MIRAE_APP_DIR = process.env.MIRAE_APP_DIR;

function resolveToken(tokensJson: Record<string, unknown>, dotPath: string): string | null {
  const parts = dotPath.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let node: any = tokensJson;
  for (const part of parts) {
    if (node == null || typeof node !== "object") return null;
    node = node[part];
  }
  if (node == null || typeof node !== "object" || typeof node.value !== "string") return null;
  return node.value as string;
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("tokens.config.ts", () => {
  it("TOKEN_MAP has :root and .dark selectors", () => {
    assert.ok(":root" in TOKEN_MAP);
    assert.ok(".dark" in TOKEN_MAP);
  });

  it("TOKEN_MAP :root and .dark have the same set of CSS variables", () => {
    const rootKeys = Object.keys(TOKEN_MAP[":root"]).sort();
    const darkKeys = Object.keys(TOKEN_MAP[".dark"]).sort();
    assert.deepEqual(rootKeys, darkKeys, "Mismatched variables between :root and .dark");
  });
});

describe("token path resolution (requires MIRAE_APP_DIR)", () => {
  if (!MIRAE_APP_DIR) {
    it.skip("MIRAE_APP_DIR not set — skipping live token tests");
    return;
  }

  const tokensPath = path.join(MIRAE_APP_DIR, "tokens-studio.json");
  const tokensJson = JSON.parse(fs.readFileSync(tokensPath, "utf8")) as Record<string, unknown>;

  it("all TOKEN_MAP paths resolve to a hex string in tokens-studio.json", () => {
    const missing: string[] = [];
    for (const [selector, varMap] of Object.entries(TOKEN_MAP)) {
      for (const [cssVar, dotPath] of Object.entries(varMap)) {
        const value = resolveToken(tokensJson, dotPath);
        if (!value) missing.push(`${selector} ${cssVar} → ${dotPath}`);
      }
    }
    assert.equal(missing.length, 0, `Missing token paths:\n${missing.join("\n")}`);
  });
});

describe("globals.css structure", () => {
  const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
  const cssPath = path.join(repoRoot, "app", "globals.css");
  const css = fs.readFileSync(cssPath, "utf8");

  it(":root block exists in globals.css", () => {
    assert.ok(css.includes(":root {"), "globals.css must have a :root block");
  });

  it(".dark block exists in globals.css", () => {
    assert.ok(css.includes(".dark {"), "globals.css must have a .dark block");
  });

  it("@theme inline block contains no direct hex values (only var() references)", () => {
    const themeMatch = css.match(/@theme inline \{[\s\S]*?\n\}/);
    if (!themeMatch) return; // no @theme block = OK
    const hexInTheme = themeMatch[0].match(/#[0-9a-fA-F]{3,8}/g);
    assert.equal(
      hexInTheme,
      null,
      `@theme inline block must not contain hex values: ${hexInTheme}`
    );
  });

  it("all :root mapped variables are present as hex values", () => {
    const missing: string[] = [];
    for (const cssVar of Object.keys(TOKEN_MAP[":root"])) {
      const regex = new RegExp(`${cssVar}:\\s*#[0-9a-fA-F]{3,8}`);
      if (!regex.test(css)) missing.push(cssVar);
    }
    assert.equal(missing.length, 0, `Missing hex variables in :root:\n${missing.join("\n")}`);
  });

  it("all .dark mapped variables are present as hex values", () => {
    const missing: string[] = [];
    for (const cssVar of Object.keys(TOKEN_MAP[".dark"])) {
      const regex = new RegExp(`${cssVar}:\\s*#[0-9a-fA-F]{3,8}`);
      if (!regex.test(css)) missing.push(cssVar);
    }
    assert.equal(missing.length, 0, `Missing hex variables in .dark:\n${missing.join("\n")}`);
  });
});
```

- [ ] **Step 2: Run tests (without MIRAE_APP_DIR — token resolution tests auto-skip)**

```bash
pnpm test:tokens
```

Expected: all non-skip tests pass. Token resolution tests show as skipped.

- [ ] **Step 3: Run tests with MIRAE_APP_DIR to verify all paths resolve**

```bash
MIRAE_APP_DIR=/path/to/your/mirae pnpm test:tokens
```

Expected: all tests pass including "all TOKEN_MAP paths resolve to a hex string".

- [ ] **Step 4: Commit**

```bash
git add scripts/import_tokens.test.ts
git commit -m "test: add import_tokens tests for token path resolution and CSS structure"
```

---

## Task 7: Add `.gitkeep` for `public/screens/` directories

Git does not track empty directories. Add placeholder files so the directory structure is preserved in the repo.

**Files:**

- Create: `public/screens/ko/.gitkeep`
- Create: `public/screens/en/.gitkeep`

- [ ] **Step 1: Create placeholders**

```bash
mkdir -p public/screens/ko public/screens/en
touch public/screens/ko/.gitkeep public/screens/en/.gitkeep
```

- [ ] **Step 2: Commit**

```bash
git add public/screens/
git commit -m "chore: add public/screens/ directory structure for locale screenshots"
```

---

## Task 8: Final smoke test

End-to-end verification with the real mirae repo.

- [ ] **Step 1: Run screenshot dry-run**

```bash
MIRAE_APP_DIR=/path/to/your/mirae pnpm import:screenshots:dry
```

Expected: file list with NEW/CHANGED/UNCHANGED per locale, no files copied.

- [ ] **Step 2: Run token dry-run**

```bash
MIRAE_APP_DIR=/path/to/your/mirae pnpm import:tokens:dry
```

Expected: per-variable diff report, no file written.

- [ ] **Step 3: Run full token import and verify CSS**

```bash
MIRAE_APP_DIR=/path/to/your/mirae pnpm import:tokens
git diff app/globals.css
```

Expected: only mapped `:root` and `.dark` hex values changed; `@theme inline` untouched; file structure (comments, ordering) preserved.

- [ ] **Step 4: Run linter**

```bash
pnpm lint
```

Expected: no new lint errors.

- [ ] **Step 5: Commit any resulting CSS changes**

```bash
git add app/globals.css
git commit -m "chore: sync design tokens from mirae tokens-studio.json"
```
