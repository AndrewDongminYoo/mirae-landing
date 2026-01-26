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
```

Package manager: pnpm (v10.28.1)

## Architecture

### Directory Structure

- `app/` - App Router pages (landing, privacy, terms)
- `components/landing/` - Marketing sections (Hero, Header, Footer, feature blocks)
- `components/policy/` - Legal page wrappers (PolicyLayout, PolicySection)
- `components/ui/` - Design system primitives (CVA + Radix wrappers)
- `lib/utils.ts` - `cn()` helper for class merging
- `app/globals.css` - Tailwind entry, design tokens, light/dark theme variables

### Key Patterns

**Component Styling:**

- Use `cn()` from `lib/utils.ts` for all class merging - never concatenate classes manually
- Build variants with `class-variance-authority` (CVA) in `components/ui/`
- Icons via `lucide-react` rather than inline SVG

**Server/Client Split:**

- Pages in `app/` remain server components
- Only Header, theme provider, and toast hooks use `"use client"`
- Wrap interactive behavior in isolated client components when needed

**Button/Link Pattern:**

- CTA buttons use `<Button asChild>` wrapping `<Link>` for consistent spacing and focus states
- Store download buttons follow this pattern throughout landing sections

**Metadata:**

- Global metadata (title, description, icons) belongs in `app/layout.tsx`
- Policy pages define their own metadata objects next to the exported component

### Design Tokens

Light/dark theme variables defined in `app/globals.css` using CSS custom properties:

- `--background`, `--foreground`, `--primary`, `--accent`, etc.
- Radius variants: `--radius-sm` through `--radius-2xl`
- Font stack: Geist Sans and Geist Mono

## AGENTS.md Files

This repo contains `AGENTS.md` files with detailed context for each directory:

- `app/AGENTS.md` - App Router pages and metadata conventions
- `components/AGENTS.md` - Component organization overview
- `components/landing/AGENTS.md` - Landing section structure and patterns
- `components/ui/AGENTS.md` - Design system conventions and CVA usage

## Code Conventions

- ESLint with `simple-import-sort` - imports auto-sorted alphabetically
- Prettier with `prettier-plugin-tailwindcss` for class ordering
- TypeScript strict mode enabled
- Use `@/*` path alias for imports
