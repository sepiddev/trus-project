# TRUS — Design Analysis

## Reference Assets

| File | Location | Purpose |
|------|----------|---------|
| `TruS-design.png` | `/Downloads/` | Full-page screenshot, default state |
| `Hover.png` | `/Downloads/Trus.zip/TruS/` | Full-page screenshot, hover interaction state |
| `hero.png` | `src/assets/hero.png` | 3D isometric stacked-card visual for hero section |

---

## Overall Aesthetic

Dark luxury / premium digital studio. Deep near-black background with a strong purple/violet
accent system. The overall mood is cinematic — large typography, generous whitespace, moody
gradients, and purposeful motion. Nothing is arbitrary; every element serves the premium feel.

---

## Extracted Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Background | `#07070D` | Page background (slight purple undertone vs pure black) |
| Surface | `#0F0F18` | Cards, panels, navbar bg on scroll |
| Surface Elevated | `#141420` | Modals, elevated cards |
| Accent Primary | `#7C3AED` | Primary CTAs, active states, accent highlights |
| Accent Light | `#8B5CF6` | Hover states, softer accents, glow color |
| Accent Soft | `rgba(124, 58, 237, 0.15)` | Soft accent backgrounds, badge fills |
| Accent Glow | `rgba(124, 58, 237, 0.30)` | Hero radial glow, shadow on accent elements |
| White | `#FFFFFF` | Primary headings and text |
| Muted | `#9CA3AF` | Secondary/body text |
| Subtle | `#6B7280` | Tertiary text, placeholders |
| Border | `#1A1A2A` | Borders, dividers |
| Border Strong | `#252535` | More visible borders |

---

## Typography

| Role | Font | Weight | Approximate Size |
|------|------|--------|-----------------|
| Display XL | Syne | 800 | 72–96px |
| Display L | Syne | 700 | 48–64px |
| Display M | Syne | 600 | 32–40px |
| Display S | Syne | 600 | 24–28px |
| Body | Inter | 400 | 16–18px |
| Body Small | Inter | 400 | 14px |
| Caption / Label | Inter | 500 | 11–12px, uppercase, tracked |

**Character of each font:**
- **Syne**: Wide, geometric, modern. Creates the premium editorial feel. High contrast in weight.
- **Inter**: Neutral, legible, widely trusted. Ideal for body and UI text.

---

## Full-Page Section Map

### 1. Navigation Bar
- **Height**: ~64–72px
- **Background**: Fully transparent initially → dark (`#0F0F18`) + `backdrop-blur` on scroll
- **Left**: TruS wordmark logo (`font-display`, bold, white)
- **Center**: 5 nav links — About, Portfolio, Services, Team, Contact
- **Right**: Primary CTA button (purple fill) + optional icon link(s)
- **Mobile**: Hamburger collapse

### 2. Hero Section
- **Height**: Full viewport (`100svh`)
- **Background**: Deep dark base with large radial purple glow (~60% x, 40% y position)
- **Layout (desktop)**: Two-column CSS grid — text left (~55%), visual right (~45%)
- **Layout (mobile)**: Single column, visual stacks below text

**Left column content (top to bottom):**
1. Badge pill — "Web Development Studio" — violet-tinted, rounded-full
2. Headline — "Turning Ideas into Products" (line 1–2), "at TruS" (line 3)
   - "TruS" on last line is purple/accent colored
3. Body copy — 1–2 sentences describing value proposition
4. CTA row — [Start a Project] (primary, filled) + [Explore Work] (ghost/outlined)
5. Stats row — 3 metrics: `200+`, `4.8`, `1,200+` with labels below each

**Right column content:**
- `hero.png` — 3D isometric stacked-card model, floating animation
- The 3D object sits slightly above the glow epicenter
- Subtle drop shadow / glow ring beneath the object

### 3. About / Discover Section (NOT built yet)
- "DISCOVER MORE ABOUT TRUS" headline
- Imagery on one side, text on the other

### 4. Portfolio Section (NOT built yet)
- "EXPLORE OUR PROJECT" / "PORTFOLIO" large background text
- Project cards with hover reveal

### 5. Why Choose Section (NOT built yet)
- "WHY THOUSANDS CHOOSE OUR TEMPLATES"
- Feature card grid

### 6. Template Categories (NOT built yet)
- Card grid with template screenshots

### 7. Services Section (NOT built yet)
- "OUR SERVICES" with service cards

### 8. Team Section (NOT built yet)
- "SEE OUR CO-WORKERS" with headshots

### 9. Testimonials (NOT built yet)
- "CUSTOMER SUCCESS STORIES"

### 10. Contact (NOT built yet)
- "Let's Connect" form section

### 11. Footer (NOT built yet)
- "TRUS" large lettermark
- Links + social icons

---

## Spacing Patterns

| Token | Value |
|-------|-------|
| Section vertical padding | 80–120px (`py-20` to `py-32`) |
| Container max-width | 1280px |
| Container padding (horizontal) | 24px mobile / 48px tablet / 80px desktop |
| Card padding | 24–32px |
| Grid gutter | 24px mobile / 32px desktop |

---

## Identified Motion Opportunities

| Element | Animation | Notes |
|---------|-----------|-------|
| Page load | Fade-in overall opacity | Masks flash of content |
| Navbar | Slide down from `-translateY(100%)` | On mount |
| Navbar background | Opacity transition to surface color | On scroll threshold |
| Hero badge | FadeIn from below, delay 0.2s | useInView |
| Hero headline | Word-by-word stagger from Y+30, delay 0.3s | AnimatePresence |
| Hero body copy | FadeIn from below, delay 0.7s | useInView |
| Hero CTA buttons | Stagger FadeIn, delay 0.9s | useInView |
| Hero stats | Counter + FadeIn, delay 1.1s | useInView |
| Hero visual (hero.png) | Float Y oscillation + entrance from right | Continuous loop |
| Hero glow | Subtle scale pulse | Continuous, very slow |
| Section entrances | FadeIn from below with useInView | Global pattern |
