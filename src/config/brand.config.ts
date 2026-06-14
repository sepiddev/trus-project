/**
 * Brand identity — everything that says "this is TruS".
 *
 * Swap these values (and the asset files they point at) to rebrand the template
 * for a new client. Content lives in site.config.ts; visual tokens live in
 * theme.config.ts; this file is the name, logo, wordmark and document <head>.
 */
import { siteConfig }  from './site.config'
import { themeConfig } from './theme.config'
import logo            from '@/assets/logo.png'

export const brandConfig = {
  /** Proper-case name used in prose, alt text and copyright (e.g. "TruS"). */
  name: siteConfig.name,

  /**
   * All-caps wordmark for the preloader and the giant footer background word
   * (e.g. "TRUS"). Defaults to the uppercased name; override if your wordmark
   * differs from a simple uppercasing.
   */
  wordmark: siteConfig.name.toUpperCase(),

  /** Logo image. Replace /src/assets/logo.png, or point this at another asset. */
  logo,

  /** Caption shown under the preloader wordmark while the hero loads. */
  loadingLabel: 'Loading Ecosystem',

  /** Replaceable media. Files live in /public. */
  assets: {
    heroVideo:  '/hero-galaxy.mp4',
    globeVideo: '/globe.mp4',
    favicon:    '/favicon.svg',
  },

  /**
   * Document <head> metadata. Applied at runtime by applyHead() (main.tsx),
   * so index.html stays brand-neutral.
   */
  seo: {
    title:         `${siteConfig.name} — ${siteConfig.tagline}`,
    description:   siteConfig.description,
    themeColor:    themeConfig.colors['brand-bg'],
    ogTitle:       `${siteConfig.name} — ${siteConfig.tagline}`,
    ogDescription:
      'Premium React web development studio. Modern motion-forward websites with full client ownership.',
  },
} as const

export type BrandConfig = typeof brandConfig
