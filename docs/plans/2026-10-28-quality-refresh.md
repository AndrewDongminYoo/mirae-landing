# Quality Tooling Refresh Plan

## Work

1. Verify repository identity, instructions, current changes and Oracle precedent.
2. Refresh compatible dependency and linter versions with existing package managers.
3. Run the declared local gates and `trunk check --all --no-fix`.
4. Reconcile affected knowledge and review the scoped candidate.
5. Commit locally and prepare visible evidence before requesting publication approval.

## Declared Gates

- `pnpm install --frozen-lockfile`
- `pnpm lint`
- `pnpm test:production-readiness`
- `MIRAE_APP_DIR= pnpm test:tokens`
- `pnpm build`
- `pnpm exec knip`

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
