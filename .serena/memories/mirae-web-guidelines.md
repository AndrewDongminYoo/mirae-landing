# 온음(WarmWake) Web project guidelines

## Project overview

- `warmwake-web` is a Next.js 16 (App Router) + TypeScript landing page for 온음(WarmWake)/donminzzi lab that leans into a warm, minimal “warm morning” mood with sticky navigation, hero, benefits, how-it-works flow, screenshot gallery, about/support cards, and footer that references the brand details and policy placeholders.
- `app/page.tsx` renders the Header → Hero → Benefits → HowItWorks → Screenshots → About → Support → Footer stack, while `components/landing/*` holds the individual section components and `components/ui/button.tsx` provides CVA-driven CTA/button variants.
- Global layout (`app/layout.tsx`) wires up `<html lang="ko">`, Geist/Geist Mono fonts, Open Graph/keywords metadata, analytics, and `viewport.themeColor = #FFFBFE`, and `public/images/warmwake-*.png` supplies the hero/screenshot visuals.
- Styling relies on Tailwind CSS 4 with `@theme inline` vars defined in `app/globals.css`, shared color/radius/shadow tokens, plus `tw-animate-css` for subtle motion and `next-themes` toggling the light/dark palettes.

## Style conventions

- The palette uses `#FFFBFE` (background), `#1C1B1F` (foreground), coral `#FFB4AB`, blue `#A8C7FA`, plus semitransparent borders/shadows with rounded-xl/2xl corners; fonts mix `Geist`/`Geist Mono` with system sans serif for a rounded, airy feel.
- `app/globals.css` defines the CSS variables for both light and dark themes, mirrors them in `@theme inline` for Tailwind, and applies default border/ring styles plus body background/foreground.
- Prettier config enforces double quotes, trailing commas (ES5), arrow parens always, 100-character print width, LF line endings, and runs `prettier-plugin-tailwindcss` pointing at `app/globals.css`.
- ESLint merges Next.js recommended configs (incl. Core Web Vitals + TypeScript), the TypeScript-ESLint recommended rules, `eslint-config-prettier`, and uses `eslint-plugin-simple-import-sort` plus `@next/eslint-plugin-next`. Jest files import the flat recommended config, and `next-env.d.ts` allows triple-slash references for generated metadata.
- `components/ui/button.tsx` uses the `cva` helper for variant/size control so that CTA, policy, and mail links reuse consistent spacing/shadows; `clsx`/`lucide-react` support soft gradients and iconography.

## Dev commands

- `pnpm install` (sets up dependencies).
- `pnpm dev` (runs `next dev`, view at `http://localhost:3000`).
- `pnpm build` (Next.js production build), `pnpm start` (serves built output).
- `pnpm lint` (runs `eslint .` against JS/TS/JSX/TSX via the flat config).

## Completion criteria

- Section coverage: sticky nav with brand/policy/Contact links, hero with the Korean headline/subcopy/buttons, benefits cards with Lucide icons, how-it-works flow with connectors/badges, screenshot grid (6 images with captions), about/support cards including contact `mailto:donminzzi@gmail.com` and policy placeholders, plus the footer with brand text and business info.
- Visual fidelity: reuse the theme colors, rounded-2xl/3xl corners, soft borders/shadows, `Geist` fonts, blurred gradient hero decor, and CTA motion cues described in the README/local styles.
- Component hygiene: sections should stay in `components/landing/*`, global layout remains in `app/layout.tsx`, CTA/Button variants and `app/globals.css` token adjustments should follow the existing structure.
- Verification: run `pnpm lint` with no errors and smoke-test the UI via `pnpm dev` (https://localhost:3000) before marking work complete.
- Business info/policy placeholders should stay aligned with README details (contact email, policy placeholders, etc.) so the page feels production-ready.
