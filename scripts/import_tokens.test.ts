import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { after, before, describe, it } from "node:test";
import { fileURLToPath } from "node:url";

// ── helpers ───────────────────────────────────────────────────────────────────

const repoRoot = path.resolve(
  import.meta.dirname ?? path.dirname(fileURLToPath(import.meta.url)),
  ".."
);

function run(args: string[], env: NodeJS.ProcessEnv) {
  return spawnSync("npx", ["tsx", "scripts/import_tokens.ts", ...args], {
    env: { ...process.env, ...env },
    cwd: repoRoot,
  });
}

/**
 * Comprehensive tokens-studio.json fixture covering all 14 TOKEN_MAP paths
 * for both :root (light) and .dark themes.
 */
const FULL_FIXTURE = {
  color: {
    role: {
      light: {
        scaffoldBackground: { value: "#FFFBFE", type: "color" },
        onSurface: { value: "#1C1B1F", type: "color" },
        surfaceContainer: { value: "#EEECF0", type: "color" },
        primary: { value: "#FF0000", type: "color" },
        onPrimary: { value: "#FFFFFF", type: "color" },
        secondaryContainer: { value: "#FFD8D4", type: "color" },
        onSecondaryContainer: { value: "#1C1B1F", type: "color" },
        surface: { value: "#FDF8FD", type: "color" },
        onSurfaceVariant: { value: "#4A4458", type: "color" },
        error: { value: "#BA1A1A", type: "color" },
        onError: { value: "#FFFFFF", type: "color" },
        outline: { value: "#7A757F", type: "color" },
      },
      dark: {
        scaffoldBackground: { value: "#1C1B1F", type: "color" },
        onSurface: { value: "#E6E1E5", type: "color" },
        surfaceContainer: { value: "#2B2930", type: "color" },
        primary: { value: "#FF5555", type: "color" },
        onPrimary: { value: "#000000", type: "color" },
        secondaryContainer: { value: "#3D3A42", type: "color" },
        onSecondaryContainer: { value: "#E6E1E5", type: "color" },
        surface: { value: "#1C1B1F", type: "color" },
        onSurfaceVariant: { value: "#CAC4D0", type: "color" },
        error: { value: "#FF897D", type: "color" },
        onError: { value: "#690005", type: "color" },
        outline: { value: "#938F99", type: "color" },
      },
    },
  },
};

/**
 * Minimal globals.css fixture with :root and .dark blocks (no @theme inline).
 */
const MINIMAL_CSS = `\
:root {
  --background: #000000;
  --foreground: #000000;
  --card: #000000;
  --card-foreground: #000000;
  --primary: #000000;
  --primary-foreground: #000000;
  --secondary: #000000;
  --secondary-foreground: #000000;
  --muted: #000000;
  --muted-foreground: #000000;
  --destructive: #000000;
  --destructive-foreground: #000000;
  --border: #000000;
  --input: #000000;
}

.dark {
  --background: #000000;
  --foreground: #000000;
  --card: #000000;
  --card-foreground: #000000;
  --primary: #000000;
  --primary-foreground: #000000;
  --secondary: #000000;
  --secondary-foreground: #000000;
  --muted: #000000;
  --muted-foreground: #000000;
  --destructive: #000000;
  --destructive-foreground: #000000;
  --border: #000000;
  --input: #000000;
}
`;

// ── test suite ────────────────────────────────────────────────────────────────

describe("import_tokens.ts", () => {
  let tmpDir: string;
  let cssBackup: string | null = null;
  const cssPath = path.join(repoRoot, "app", "globals.css");

  before(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "import-tokens-test-"));
  });

  after(() => {
    // Restore globals.css if it was modified during a live-run test
    if (cssBackup !== null) {
      fs.writeFileSync(cssPath, cssBackup, "utf8");
      cssBackup = null;
    }
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  // ── Test 1: MIRAE_APP_DIR not set ─────────────────────────────────────────

  it("exits non-zero when MIRAE_APP_DIR is not set", () => {
    const result = run([], { ...process.env, MIRAE_APP_DIR: "" });
    assert.notEqual(result.status, 0, "should exit with non-zero status");
    const stderr = result.stderr.toString();
    assert.ok(stderr.includes("[ERROR]"), `stderr should contain [ERROR], got: ${stderr}`);
  });

  // ── Test 2: tokens-studio.json missing ───────────────────────────────────

  it("exits non-zero when tokens-studio.json is missing", () => {
    const emptyDir = fs.mkdtempSync(path.join(tmpDir, "no-tokens-"));
    const result = run([], { ...process.env, MIRAE_APP_DIR: emptyDir });
    assert.notEqual(
      result.status,
      0,
      "should exit with non-zero status when tokens file is missing"
    );
  });

  // ── Test 3: all TOKEN_MAP paths resolve (conditional on real MIRAE_APP_DIR) ─

  it("all TOKEN_MAP paths resolve in real tokens-studio.json (skipped if MIRAE_APP_DIR not set)", (t) => {
    const realDir = process.env.MIRAE_APP_DIR;
    if (!realDir) {
      t.skip("MIRAE_APP_DIR not set — skipping real token path resolution test");
      return;
    }
    const tokensPath = path.join(realDir, "tokens-studio.json");
    assert.ok(fs.existsSync(tokensPath), `tokens-studio.json must exist at ${tokensPath}`);

    const raw = fs.readFileSync(tokensPath, "utf8");
    const tokens = JSON.parse(raw) as unknown;

    // Import TOKEN_MAP dynamically isn't possible in node:test without dynamic import,
    // so we replicate the paths inline (same source as tokens.config.ts).
    const allPaths = [
      "color.role.light.scaffoldBackground",
      "color.role.light.onSurface",
      "color.role.light.surfaceContainer",
      "color.role.light.primary",
      "color.role.light.onPrimary",
      "color.role.light.secondaryContainer",
      "color.role.light.onSecondaryContainer",
      "color.role.light.surface",
      "color.role.light.onSurfaceVariant",
      "color.role.light.error",
      "color.role.light.onError",
      "color.role.light.outline",
      "color.role.dark.scaffoldBackground",
      "color.role.dark.onSurface",
      "color.role.dark.surfaceContainer",
      "color.role.dark.primary",
      "color.role.dark.onPrimary",
      "color.role.dark.secondaryContainer",
      "color.role.dark.onSecondaryContainer",
      "color.role.dark.surface",
      "color.role.dark.onSurfaceVariant",
      "color.role.dark.error",
      "color.role.dark.onError",
      "color.role.dark.outline",
    ];

    for (const dotPath of allPaths) {
      const node = dotPath.split(".").reduce((acc: unknown, key: string) => {
        if (acc !== null && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
          return (acc as Record<string, unknown>)[key];
        }
        return undefined;
      }, tokens);
      assert.ok(node !== undefined, `path not found: ${dotPath}`);
      assert.equal(
        typeof (node as Record<string, unknown>).value,
        "string",
        `${dotPath}.value should be a string`
      );
    }
  });

  // ── Test 4: dry-run output format ────────────────────────────────────────

  it("dry-run output contains variable names, hex values, and 'dry-run' summary", () => {
    const fixtureDir = fs.mkdtempSync(path.join(tmpDir, "dry-run-"));
    fs.writeFileSync(
      path.join(fixtureDir, "tokens-studio.json"),
      JSON.stringify(FULL_FIXTURE),
      "utf8"
    );

    const result = run(["--dry-run"], { ...process.env, MIRAE_APP_DIR: fixtureDir });

    // Script can exit 0 even in dry-run when globals.css is the real one
    const stdout = result.stdout.toString();
    const stderr = result.stderr.toString();
    const combined = stdout + stderr;

    // Must contain "dry-run" in the summary line
    assert.ok(stdout.includes("dry-run"), `stdout should contain 'dry-run', got: ${stdout}`);

    // Output should mention at least one CSS variable name
    assert.ok(
      stdout.includes("--primary") || combined.includes("--primary"),
      `dry-run output should mention --primary, got: ${combined}`
    );

    // Output should contain at least one hex value from the fixture
    assert.ok(
      /→\s*#[0-9a-fA-F]{3,8}/.test(stdout),
      `dry-run stdout should contain hex color arrows, got: ${stdout}`
    );
  });

  // ── Test 5: missing token paths produce [WARN] lines ─────────────────────

  it("emits [WARN] for token paths missing in the JSON", () => {
    const fixtureDir = fs.mkdtempSync(path.join(tmpDir, "missing-paths-"));

    // Partial fixture — only provides primary, missing everything else
    const partialFixture = {
      color: {
        role: {
          light: {
            primary: { value: "#FF0000", type: "color" },
          },
          dark: {
            primary: { value: "#FF5555", type: "color" },
          },
        },
      },
    };
    fs.writeFileSync(
      path.join(fixtureDir, "tokens-studio.json"),
      JSON.stringify(partialFixture),
      "utf8"
    );

    const result = run(["--dry-run"], { ...process.env, MIRAE_APP_DIR: fixtureDir });
    const stderr = result.stderr.toString();
    assert.ok(
      stderr.includes("[WARN]"),
      `stderr should contain [WARN] for missing paths; got: ${stderr}`
    );
  });

  // ── Test 6: @theme inline block not modified (dry-run) ───────────────────

  it("dry-run output does not mention @theme inline variables (only :root/.dark vars)", () => {
    const fixtureDir = fs.mkdtempSync(path.join(tmpDir, "theme-inline-"));
    fs.writeFileSync(
      path.join(fixtureDir, "tokens-studio.json"),
      JSON.stringify(FULL_FIXTURE),
      "utf8"
    );

    // Back up real globals.css and write fixture with @theme inline block
    cssBackup = fs.readFileSync(cssPath, "utf8");
    const cssWithThemeInline = `\
:root {
  --background: #000000;
  --foreground: #000000;
  --card: #000000;
  --card-foreground: #000000;
  --primary: #000000;
  --primary-foreground: #000000;
  --secondary: #000000;
  --secondary-foreground: #000000;
  --muted: #000000;
  --muted-foreground: #000000;
  --destructive: #000000;
  --destructive-foreground: #000000;
  --border: #000000;
  --input: #000000;
}

.dark {
  --background: #000000;
  --foreground: #000000;
  --card: #000000;
  --card-foreground: #000000;
  --primary: #000000;
  --primary-foreground: #000000;
  --secondary: #000000;
  --secondary-foreground: #000000;
  --muted: #000000;
  --muted-foreground: #000000;
  --destructive: #000000;
  --destructive-foreground: #000000;
  --border: #000000;
  --input: #000000;
}

@theme inline {
  --theme-only-var: #ABCDEF;
}
`;
    fs.writeFileSync(cssPath, cssWithThemeInline, "utf8");

    const result = run(["--dry-run"], { ...process.env, MIRAE_APP_DIR: fixtureDir });

    // Restore immediately after the run
    fs.writeFileSync(cssPath, cssBackup, "utf8");
    cssBackup = null;

    const stdout = result.stdout.toString();

    // dry-run output should NOT mention the @theme inline-only variable
    assert.ok(
      !stdout.includes("--theme-only-var"),
      `dry-run output should not mention --theme-only-var from @theme inline block; got: ${stdout}`
    );

    // Summary line must be present
    assert.ok(
      stdout.includes("dry-run"),
      `stdout should contain 'dry-run' summary; got: ${stdout}`
    );
  });

  // ── Test 7: live run updates mapped variables ─────────────────────────────

  it("live run updates :root --primary to the token value", () => {
    const fixtureDir = fs.mkdtempSync(path.join(tmpDir, "live-run-"));
    fs.writeFileSync(
      path.join(fixtureDir, "tokens-studio.json"),
      JSON.stringify(FULL_FIXTURE),
      "utf8"
    );

    // Back up real globals.css and replace with minimal fixture
    cssBackup = fs.readFileSync(cssPath, "utf8");
    fs.writeFileSync(cssPath, MINIMAL_CSS, "utf8");

    const result = run([], { ...process.env, MIRAE_APP_DIR: fixtureDir });

    // Read the (possibly) modified file before restoring
    const updatedCss = fs.readFileSync(cssPath, "utf8");

    // Always restore
    fs.writeFileSync(cssPath, cssBackup, "utf8");
    cssBackup = null;

    assert.equal(result.status, 0, `script should exit 0; stderr: ${result.stderr.toString()}`);

    // FULL_FIXTURE.color.role.light.primary.value = "#FF0000"
    assert.ok(
      updatedCss.includes("--primary: #FF0000"),
      `globals.css :root --primary should be updated to #FF0000; got:\n${updatedCss}`
    );

    // FULL_FIXTURE.color.role.dark.primary.value = "#FF5555"
    // The .dark block also has --primary
    assert.ok(
      updatedCss.includes("--primary: #FF5555"),
      `globals.css .dark --primary should be updated to #FF5555; got:\n${updatedCss}`
    );
  });
});
