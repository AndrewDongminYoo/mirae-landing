import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

import { TOKEN_MAP } from "./tokens.config.js";

const isDryRun = process.argv.includes("--dry-run");
const _scriptDir: string = import.meta.dirname ?? path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(_scriptDir, "..");

// ── helpers ──────────────────────────────────────────────────────────────────

function resolvePath(obj: unknown, dotPath: string): unknown {
  return dotPath.split(".").reduce((acc: unknown, key: string) => {
    if (acc !== null && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

/**
 * Finds the [openIdx, closeIdx] of the block starting with `selector {`.
 * Uses brace-depth counting so nested braces are handled correctly.
 * Returns null if the selector is not found.
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

// ── Step 1: validate env ──────────────────────────────────────────────────────

const miraeAppDir = process.env.MIRAE_APP_DIR;
if (!miraeAppDir) {
  console.error(
    "[import_tokens] [ERROR] MIRAE_APP_DIR is not set. Export the path to the mirae Flutter app directory."
  );
  process.exit(1);
}

// ── Step 2: read and parse tokens ────────────────────────────────────────────

const tokensPath = path.join(miraeAppDir, "tokens-studio.json");
let tokens: unknown;
try {
  const raw = fs.readFileSync(tokensPath, "utf8");
  tokens = JSON.parse(raw);
} catch (err) {
  console.error(`[import_tokens] [ERROR] Failed to read/parse ${tokensPath}:`, err);
  process.exit(1);
}

// ── Step 3: read globals.css ─────────────────────────────────────────────────

const cssPath = path.join(repoRoot, "app", "globals.css");
let cssSource: string;
try {
  cssSource = fs.readFileSync(cssPath, "utf8");
} catch (err) {
  console.error(`[import_tokens] [ERROR] Failed to read ${cssPath}:`, err);
  process.exit(1);
}

// ── Step 4 & 5: process each selector block ───────────────────────────────────

let totalChanged = 0;
let totalUnchanged = 0;
let totalSkipped = 0;

const perVarLines: string[] = [];

type CssSelector = ":root" | ".dark";
const selectors = Object.keys(TOKEN_MAP) as CssSelector[];

for (const selector of selectors) {
  const block = findBlock(cssSource, selector);
  if (block === null) {
    console.warn(`[import_tokens] [WARN]  ${selector}  block not found in globals.css — skipping`);
    continue;
  }

  const [openIdx, closeIdx] = block;
  let blockStr = cssSource.slice(openIdx, closeIdx + 1);
  const originalBlockStr = blockStr;

  const varMap = TOKEN_MAP[selector];

  for (const [varName, dotPath] of Object.entries(varMap)) {
    // Resolve token value
    const node = resolvePath(tokens, dotPath);
    if (
      node === undefined ||
      node === null ||
      typeof (node as Record<string, unknown>).value !== "string"
    ) {
      console.warn(`[import_tokens] [WARN]  ${selector}  ${varName}  path not found: ${dotPath}`);
      totalSkipped++;
      continue;
    }
    const newValue: string = (node as { value: string }).value;

    if (!/^#[0-9a-fA-F]{3,8}$/.test(newValue)) {
      console.warn(
        `[import_tokens] [WARN]  ${selector}  ${varName}  value "${newValue}" is not a hex color — skipping`
      );
      totalSkipped++;
      continue;
    }

    // Replace within block substring only
    const escapedVarName = varName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`(\\s+${escapedVarName}:\\s*)#[0-9a-fA-F]{3,8}`);
    const match = pattern.exec(blockStr);
    if (match === null) {
      console.warn(`[import_tokens] [WARN]  ${selector}  ${varName}  variable not found in block`);
      totalSkipped++;
      continue;
    }

    const oldHex = match[0].replace(match[1], "");
    const newHex = newValue;

    if (oldHex.toLowerCase() === newHex.toLowerCase()) {
      totalUnchanged++;
      perVarLines.push(
        `[import_tokens] ${selector}  ${varName.padEnd(24)}${oldHex} → ${newHex}   no change`
      );
    } else {
      totalChanged++;
      blockStr = blockStr.replace(pattern, `$1${newHex}`);
      perVarLines.push(
        `[import_tokens] ${selector}  ${varName.padEnd(24)}${oldHex} → ${newHex}   CHANGED`
      );
    }
  }

  // Splice updated block back into full CSS string (only if something changed)
  if (blockStr !== originalBlockStr) {
    cssSource = cssSource.slice(0, openIdx) + blockStr + cssSource.slice(closeIdx + 1);
  }
}

// ── Step 5 / 6: dry-run or write ─────────────────────────────────────────────

if (isDryRun) {
  for (const line of perVarLines) {
    console.log(line);
  }
} else {
  if (totalChanged > 0) {
    try {
      fs.writeFileSync(cssPath, cssSource, "utf8");
    } catch (err) {
      console.error(`[import_tokens] [ERROR] Failed to write ${cssPath}:`, err);
      process.exit(1);
    }
  }
}

// ── Step 7: summary ───────────────────────────────────────────────────────────

if (isDryRun) {
  console.log(
    `[import_tokens] dry-run: ${totalChanged} variable(s) would be updated, ${totalUnchanged} unchanged, ${totalSkipped} skipped`
  );
} else {
  console.log(
    `[import_tokens] ${totalChanged} variable(s) updated, ${totalUnchanged} unchanged, ${totalSkipped} skipped`
  );
}
