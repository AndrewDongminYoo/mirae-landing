# Quality Tooling Refresh

## Approved Scope

Refresh supported dependencies and existing quality tooling.
Preserve public APIs, generated artifacts and repository-specific boundaries.

## Acceptance

- Pinact remains locked to `4.1.1` with `lint` and `upgrade`.
- The full no-fix Trunk scan and declared project gates pass.
- Changed manifests have package-manager-generated lockfiles under repository policy.
- Advisory dispositions have specific evidence and affected knowledge claims are reconciled.

## Publication

Push and PR creation require explicit repository-specific approval.
After approval, continue the requested hosted gates, merge, cleanup and memory recording.

## Compatibility and Verification Boundaries

Keep TypeScript 6 because the current typescript-eslint peer range is below 6.1.
Use pnpm 10.34.9 and Node 22.23.4 consistently with CI.
Retain Python 3.14.4 within the Trunk plugin runtime definition.
Preserve authored application, legal and asset inputs.
Run the lossless offline reader CLI regressions and configured encoded/literal/clean controls.
Run builds in an owned copy of indexed public project inputs, without private runtime files.
Run token tests sequentially with `MIRAE_APP_DIR=` because the tests temporarily replace and restore CSS.
Do not run real screenshot or token synchronization.

## Oracle

Global Trunk and hook precedent from `wiki/concepts/trunk-quality-gate-agent.md` and `raw/sources/.claude/rules/no-verify-discipline.md` confirmed the bounded no-fix direction.
The source commit was `9670d54de3076c5239713f54900c7a855bd18478`; freshness and the returned window remain UNVERIFIED/PARTIAL.

## Hosted Scanner Boundary Repair

Declare the reader column unit as Unicode code points and cover an astral-character prefix.
Keep native artifact paths for Trunk 1.25.0; URI escaping causes the tested consumer to drop findings, so this adapter does not claim portable SARIF URI handling.
The reserved-path control must surface the exact file and range, and a corrupted-path mutant must be rejected by that association check.
Enable `--fail-on-scan-errors` and require controlled missing/unreadable input to fail without a finding, in both ordinary and CI Trunk modes.
Retain the inherited SARIF/stdout/finding-exit-code settings, which are already proven by actual encoded and literal controls.
