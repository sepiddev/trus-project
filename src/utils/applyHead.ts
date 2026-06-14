/**
 * Applies brand metadata to the document <head> at runtime, so index.html can
 * stay brand-neutral. Sets the title, description, Open Graph tags, theme-color
 * and favicon from brand.config.ts. Call once before React mounts (main.tsx).
 *
 * Fonts are intentionally NOT managed here — they stay as a <link> in index.html
 * so they load on first paint without a flash of fallback text.
 */
import { brandConfig, type BrandConfig } from '@/config/brand.config'

/** Upsert a <meta> tag by name or property attribute. */
function setMeta(attr: 'name' | 'property', key: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/** Upsert a <link rel="icon">. */
function setFavicon(href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="icon"]')
  if (!el) {
    el = document.createElement('link')
    el.rel = 'icon'
    document.head.appendChild(el)
  }
  el.href = href
}

export function applyHead(brand: BrandConfig = brandConfig): void {
  const { seo, assets } = brand

  document.title = seo.title
  setMeta('name', 'description', seo.description)
  setMeta('name', 'theme-color', seo.themeColor)
  setMeta('property', 'og:title', seo.ogTitle)
  setMeta('property', 'og:description', seo.ogDescription)
  setMeta('property', 'og:type', 'website')
  setFavicon(assets.favicon)
}
