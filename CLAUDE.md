# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

온음(WarmWake) Web is a Next.js 16 marketing site for the 온음 alarm app. It uses the App Router with React 19, Tailwind CSS v4, and Radix UI primitives. The site includes a landing page with feature showcases and legal (privacy/terms) pages.

## Commands

```bash
pnpm dev      # Start development server
pnpm build    # Production build
pnpm start    # Start production server
pnpm lint     # Run ESLint
pnpm test:tokens                    # Run token import script tests
pnpm knip                           # Find unused exports/files
pnpm import:tokens                  # Sync design tokens from tokens-studio.json → globals.css
pnpm import:tokens:dry              # Dry-run: preview token changes without writing
pnpm import:screenshots             # Copy app screenshots into public/screens/{ko,en}/
pnpm import:screenshots:dry         # Dry-run: preview screenshot copy
```

Package manager: pnpm (v11+)

Dependency overrides live in `pnpm-workspace.yaml` under `overrides:`, not in `package.json` — pnpm v11 ignores the `package.json` `pnpm` field.

## Architecture

### Directory Structure

- `app/` - App Router pages (landing, privacy, terms)
- `components/landing/` - Marketing sections (Hero, Header, Footer, feature blocks)
- `components/policy/` - Legal page wrappers (PolicyLayout, MarkdownSections) and the canonical `privacy.md` / `service.md` sources
- `components/ui/` - Design system primitives (CVA + Radix wrappers)
- `hooks/` - Shared client hooks (`use-scroll-animation.ts`)
- `lib/utils.ts` - `cn()` helper for class merging; `lib/screens.ts` - localized screenshot path resolver
- `scripts/` - Dev tooling: `import_tokens.ts`, `import_screenshots.sh`, `tokens.config.ts`
- `app/globals.css` - Tailwind entry, design tokens, light/dark theme variables

### Key Patterns

**Component Styling:**

- Use `cn()` from `lib/utils.ts` for all class merging - never concatenate classes manually
- Build variants with `class-variance-authority` (CVA) in `components/ui/`
- Icons via `lucide-react` rather than inline SVG

**Server/Client Split:**

- Pages in `app/` remain server components
- Only Header and the scroll-animation components use `"use client"`
- Wrap interactive behavior in isolated client components when needed

**Button/Link Pattern:**

- CTA buttons use `<Button asChild>` wrapping `<Link>` for consistent spacing and focus states
- Store download buttons follow this pattern throughout landing sections

**Metadata:**

- Global metadata (title, description, icons) belongs in `app/layout.tsx`
- Policy pages define their own metadata objects next to the exported component

### Design Tokens

Light/dark theme variables defined in `app/globals.css` using CSS custom properties with `oklch` color values:

- `--background`, `--foreground`, `--primary`, `--accent`, etc.
- Radius variants: `--radius-sm` through `--radius-2xl`
- Font stack: Geist Sans and Geist Mono
- `@theme inline` exposes tokens to Tailwind utility classes
- Token values are imported from a `tokens-studio.json` file via `pnpm import:tokens`; the mapping is defined in `scripts/tokens.config.ts`. Variables not in `TOKEN_MAP` (e.g. `--accent`, `--ring`, sidebar palette) are web-only and never overwritten by the import script.

### next.config.ts Notes

- `typescript.ignoreBuildErrors: false` — TypeScript errors fail the build
- `images.unoptimized: false` — `next/image` optimization is active; screenshots live in `public/screens/{ko,en}/`

## AGENTS.md Files

This repo contains `AGENTS.md` files with detailed context for each directory:

- `AGENTS.md` - Root stub pointing back to this file
- `app/AGENTS.md` - App Router pages and metadata conventions
- `components/AGENTS.md` - Component organization overview
- `components/landing/AGENTS.md` - Landing section structure and patterns
- `components/policy/AGENTS.md` - Legal page rendering and markdown sources
- `components/ui/AGENTS.md` - Design system conventions and CVA usage
- `hooks/AGENTS.md` - Shared client hooks (`use-scroll-animation`)
- `lib/AGENTS.md` - Utility functions and screenshot path resolver
- `scripts/AGENTS.md` - Token and screenshot import pipelines

## Workflow for Large Tasks

For substantial work (new features, refactors, multi-step implementations), follow this sequence:

1. **Plan**: Use the `superpowers:writing-plans` skill to write and align on an implementation plan before touching code.
2. **Worktree**: Use the `superpowers:using-git-worktrees` skill to work in an isolated git worktree and keep `main` clean.
3. **Implement**: Execute the plan inside the worktree.
4. **Finish**: Use the `superpowers:finishing-a-development-branch` skill to decide on merge or PR.

Simple bug fixes and small, self-contained changes can be done directly on `main` without a worktree.

## Code Conventions

- ESLint with `simple-import-sort` - imports auto-sorted alphabetically
- Prettier with `prettier-plugin-tailwindcss` for class ordering
- TypeScript strict mode enabled
- Use `@/*` path alias for imports
- Global styles live in `app/globals.css` and images in `public/screens` — do not introduce `styles/globals.css` or `public/images`
