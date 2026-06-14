/**
 * Visual design tokens — the re-skinning surface of the template.
 *
 * These values are the RUNTIME source of truth: `applyTheme()` (called from
 * main.tsx) writes them onto :root as CSS custom properties, which every
 * Tailwind utility (`bg-brand-accent`, `font-display`, …) and inline `var(--…)`
 * reads. Change a value here and the whole site re-skins.
 *
 * NOTE: the same default values are mirrored in src/styles/globals.css `@theme`
 * so Tailwind can generate the utility classes at build time and the very first
 * paint (before React mounts) is already on-brand. When rebranding you can edit
 * just this file — the runtime override wins after mount — but mirroring the new
 * values into globals.css too avoids a one-frame flash of the old palette.
 *
 * Structural tokens (radius, shadows, type-scale) intentionally live only in
 * globals.css — they define the template's "shape", not its brand.
 */
export const themeConfig = {
  /** Brand palette. Keys map to `--color-{key}` CSS variables. */
  colors: {
    'brand-bg':           '#07070D',
    'brand-surface':      '#0F0F18',
    'brand-surface-2':    '#141420',
    'brand-accent':       '#875DD9',
    'brand-accent-light': '#9D70F5',
    'brand-accent-dim':   '#5328A8',
    'brand-white':        '#FFFFFF',
    'brand-muted':        '#9CA3AF',
    'brand-subtle':       '#6B7280',
    'brand-border':       '#1A1A2A',
    'brand-border-2':     '#252535',
  },

  /** Font stacks. Map to `--font-display` / `--font-body` / `--font-hero`. */
  fonts: {
    display: "'Syne', sans-serif",
    body:    "'Inter', sans-serif",
    hero:    "'DM Sans', sans-serif",
  },

  /**
   * Google Fonts stylesheet for the families above. Mirrored by the <link> in
   * index.html (kept there so fonts load on first paint — no flash). When you
   * swap `fonts`, update both this URL and that <link>.
   */
  googleFontsUrl:
    'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap',
} as const

export type ThemeConfig = typeof themeConfig
