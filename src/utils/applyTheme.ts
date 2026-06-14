/**
 * Writes theme tokens onto :root as CSS custom properties.
 *
 * Tailwind utilities and inline `var(--…)` references resolve against these, so
 * setting them at runtime re-skins the whole app. Call once before React mounts
 * (see main.tsx). The defaults already match globals.css, so for the bundled
 * TruS demo this is a no-op visually — it only matters once theme.config.ts is
 * edited to new values.
 */
import { themeConfig, type ThemeConfig } from '@/config/theme.config'

export function applyTheme(theme: ThemeConfig = themeConfig): void {
  const root = document.documentElement

  for (const [name, value] of Object.entries(theme.colors)) {
    root.style.setProperty(`--color-${name}`, value)
  }

  root.style.setProperty('--font-display', theme.fonts.display)
  root.style.setProperty('--font-body',    theme.fonts.body)
  root.style.setProperty('--font-hero',    theme.fonts.hero)
}
