# Landing Page Template

This project doubles as a **reusable landing-page template**. The live TruS site
is the bundled **demo** — every brand, theme, content and asset value is driven
by config, so you can re-skin it for a new client without touching component code.

## Where everything lives

| Concern | File | What it controls |
|---|---|---|
| **Content** | [`src/config/site.config.ts`](src/config/site.config.ts) | All section copy: nav, hero, about, portfolio, services, team, testimonials, contact, footer. |
| **Brand identity** | [`src/config/brand.config.ts`](src/config/brand.config.ts) | Name, all-caps wordmark, logo, loading caption, SEO/`<head>` metadata, replaceable media paths. |
| **Visual theme** | [`src/config/theme.config.ts`](src/config/theme.config.ts) | Brand colors and font stacks (injected onto `:root` at runtime). |
| **Structural tokens** | [`src/styles/globals.css`](src/styles/globals.css) | Radius, type-scale, shadows (the template's "shape"), plus build-time mirrors of the theme colors/fonts. |

## Rebrand in 5 steps

1. **Name & wordmark** — edit `name` (and, if needed, `wordmark`) in
   [`brand.config.ts`](src/config/brand.config.ts). `wordmark` defaults to the
   uppercased name and is used for the preloader and the giant footer word.

2. **Logo & media** — drop your files into `src/assets/` (logo) and `public/`
   (hero video, globe video, favicon, about image), then point
   `brand.config.ts` (`logo`, `assets.*`) and `site.config.ts` (`about.image`)
   at them. Current files to replace: `src/assets/logo.png`,
   `public/hero-galaxy.mp4`, `public/globe.mp4`, `public/favicon.svg`,
   `public/about-team.jpg`.

3. **Colors & fonts** — edit `colors` and `fonts` in
   [`theme.config.ts`](src/config/theme.config.ts). For a flash-free first paint,
   mirror the same values into the `@theme` block of
   [`globals.css`](src/styles/globals.css). If you change fonts, also update
   `googleFontsUrl` there **and** the matching `<link>` in
   [`index.html`](index.html).

4. **SEO** — `brand.config.ts → seo` controls the document title, description,
   Open Graph tags and theme-color. These are applied at runtime by
   `applyHead()`, so `index.html` itself stays brand-neutral.

5. **Content** — rewrite the copy in [`site.config.ts`](src/config/site.config.ts).
   Wrap any word in `[brackets]` inside a headline to render it in the accent
   color (e.g. `'at [TruS]'`).

## How theming works

- `theme.config.ts` is the runtime source of truth. `applyTheme()` (called from
  [`src/main.tsx`](src/main.tsx) before render) writes each color as a
  `--color-*` custom property and each font as `--font-*` on `:root`.
- Tailwind utilities (`bg-brand-accent`, `font-display`, …) and inline
  `var(--…)` references resolve against those variables, so one edit re-skins the
  whole app.
- `globals.css` keeps matching defaults only so Tailwind can generate the utility
  classes at build time and the first paint is already on-brand.

## Notes

- `src/components/hero/GalaxyOrbit.tsx` is an orphaned (never-rendered) component
  — the hero uses a video. Safe to ignore or delete.
