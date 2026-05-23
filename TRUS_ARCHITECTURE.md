# TRUS — Architecture

## Directory Structure

```
src/
├── components/
│   ├── ui/                  ← Atoms: Button, Badge, Tag, Icon
│   │   ├── Button.tsx
│   │   └── Badge.tsx
│   ├── layout/              ← Structural: Navbar, Footer, PageWrapper
│   │   └── Navbar.tsx
│   ├── sections/            ← Page sections (each is a full-width section)
│   │   └── Hero.tsx
│   └── motion/              ← Reusable animation wrappers
│       ├── FadeIn.tsx
│       ├── StaggerGroup.tsx
│       └── ParallaxLayer.tsx
├── config/
│   └── site.config.ts       ← ALL copy, links, stats, meta — single source of truth
├── hooks/
│   └── useReducedMotion.ts  ← Wraps Framer Motion's useReducedMotion
├── motion/
│   └── variants.ts          ← All Framer Motion variant objects and constants
├── styles/
│   └── globals.css          ← Tailwind v4 @import + @theme tokens
├── assets/
│   └── hero.png             ← 3D isometric visual asset
├── App.tsx                  ← Root layout: Navbar + sections
└── main.tsx                 ← React root, imports globals.css
```

---

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `HeroSection`, `NavBar`, `FadeIn` |
| Files | PascalCase `.tsx` | `Hero.tsx`, `Button.tsx` |
| Config files | camelCase `.ts` | `site.config.ts`, `variants.ts` |
| CSS classes | Tailwind utilities | No custom class names except `@layer base` resets |
| CSS variables | `--color-brand-*` | `--color-brand-accent` |
| Prop interfaces | `ComponentNameProps` | `ButtonProps`, `HeroProps` |

---

## Component Architecture Principles

### 1. Config-Driven Content
Every string visible to the user comes from `site.config.ts`. No exceptions.
```ts
// ✅ Correct
import { siteConfig } from '@/config/site.config'
<h1>{siteConfig.hero.headline[0]}</h1>

// ❌ Wrong
<h1>Turning Ideas into Products</h1>
```

### 2. Prop-Driven for Template Reuse
Every section accepts an optional data prop (falls back to `siteConfig`):
```tsx
interface HeroProps {
  data?: typeof siteConfig.hero
}
export function HeroSection({ data = siteConfig.hero }: HeroProps) { ... }
```

### 3. Motion Wrappers, Not Inline Logic
Keep animation logic in `motion/` primitives. Section components use them compositionally:
```tsx
// ✅ Correct
<FadeIn delay={0.3} direction="up">
  <h1>{headline}</h1>
</FadeIn>

// ❌ Wrong — animation logic scattered in section files
<motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} ...>
```

**Exception**: Continuous animations (float, pulse) that are specific to one element
may live inline in the section file.

### 4. No Inline Styles (Except JS-Driven Transforms)
```tsx
// ✅ Correct — Framer Motion transform value
style={{ y }} // from useTransform

// ✅ Correct — Dynamic value that can't be expressed in Tailwind
style={{ background: `radial-gradient(... ${glowColor} ...)` }}

// ❌ Wrong — Static style that belongs in Tailwind
style={{ paddingTop: '80px' }}
```

### 5. Mobile-First Responsive
All Tailwind classes start mobile, then scale up:
```tsx
// ✅ Mobile first
<div className="px-6 md:px-12 lg:px-20">

// ❌ Desktop first
<div className="px-20 max-md:px-6">
```

---

## Import Alias

Use `@/` to reference `src/`:
```ts
import { siteConfig } from '@/config/site.config'
import FadeIn from '@/components/motion/FadeIn'
```

Configure in `vite.config.ts` and `tsconfig.app.json`.

---

## Page Assembly (App.tsx)

App.tsx is the root layout. Each section is imported and rendered in DOM order.
No routing yet (single-page). As sections are built, add them here:

```tsx
import Navbar from '@/components/layout/Navbar'
import HeroSection from '@/components/sections/Hero'
// import AboutSection from '@/components/sections/About'  // Not built yet

export default function App() {
  return (
    <div className="bg-brand-bg min-h-screen font-body antialiased">
      <Navbar />
      <HeroSection />
    </div>
  )
}
```

---

## Template Extraction Strategy

When reselling as a template:
1. Replace `site.config.ts` with the buyer's content
2. Swap `/src/assets/` images with buyer's assets
3. Update `--color-brand-accent` token for brand color
4. Update font imports in `index.html` and `@theme` in `globals.css`
5. All other code remains unchanged

The architecture is designed so steps 1–4 are the only changes needed for a new brand.
