# TRUS — Design System

All tokens are defined in `src/styles/globals.css` under `@theme` (Tailwind v4 syntax).
Use the Tailwind utility classes directly — no inline styles except for JS-driven transforms.

---

## Color Tokens

```css
/* In @theme block */
--color-brand-bg:           #07070D;   /* Page background */
--color-brand-surface:      #0F0F18;   /* Cards, panels */
--color-brand-surface-2:    #141420;   /* Elevated surfaces */
--color-brand-accent:       #7C3AED;   /* Primary accent (violet-600) */
--color-brand-accent-light: #8B5CF6;   /* Hover state (violet-500) */
--color-brand-accent-dim:   #4C1D95;   /* Muted accent (violet-900) */
--color-brand-white:        #FFFFFF;   /* Primary text */
--color-brand-muted:        #9CA3AF;   /* Secondary text */
--color-brand-subtle:       #6B7280;   /* Tertiary text */
--color-brand-border:       #1A1A2A;   /* Borders */
--color-brand-border-2:     #252535;   /* Stronger borders */
```

**Tailwind class mapping:**
| Class | Token | Example use |
|-------|-------|------------|
| `bg-brand-bg` | `#07070D` | Page / section background |
| `bg-brand-surface` | `#0F0F18` | Cards, navbar after scroll |
| `bg-brand-accent` | `#7C3AED` | Primary button fill |
| `text-brand-white` | `#FFFFFF` | Headings |
| `text-brand-muted` | `#9CA3AF` | Body copy |
| `text-brand-subtle` | `#6B7280` | Captions, labels |
| `text-brand-accent` | `#7C3AED` | Accent-colored text |
| `border-brand-border` | `#1A1A2A` | Card borders |

---

## Typography Tokens

```css
--font-display: 'Syne', sans-serif;
--font-body:    'Inter', sans-serif;
```

### Type Scale

| Class | Size | Line height | Weight | Font | Usage |
|-------|------|------------|--------|------|-------|
| `text-display-2xl` | 96px | 1 | 800 | display | Hero XL |
| `text-display-xl` | 72px | 1.05 | 800 | display | Hero |
| `text-display-lg` | 56px | 1.1 | 700 | display | Section h1 |
| `text-display-md` | 40px | 1.15 | 700 | display | Section h2 |
| `text-display-sm` | 28px | 1.2 | 600 | display | Card headings |
| `text-body-lg` | 18px | 1.6 | 400 | body | Hero copy |
| `text-body` | 16px | 1.5 | 400 | body | Standard copy |
| `text-body-sm` | 14px | 1.5 | 400 | body | Small copy |
| `text-label` | 12px | 1.4 | 500 | body | Uppercase labels |

Define these in `@theme`:
```css
--text-display-2xl: 6rem;
--text-display-xl: 4.5rem;
--text-display-lg: 3.5rem;
--text-display-md: 2.5rem;
--text-display-sm: 1.75rem;
--text-body-lg: 1.125rem;
--text-body: 1rem;
--text-body-sm: 0.875rem;
--text-label: 0.75rem;
```

---

## Spacing System

Uses Tailwind's default spacing scale (4px base unit). Custom overrides where needed.

| Purpose | Value | Tailwind |
|---------|-------|---------|
| Section vertical padding | 80px / 120px | `py-20` / `py-32` |
| Container padding (mobile) | 24px | `px-6` |
| Container padding (tablet) | 48px | `px-12` |
| Container padding (desktop) | 80px | `px-20` |
| Card padding | 24px / 32px | `p-6` / `p-8` |
| Component gap (tight) | 8px | `gap-2` |
| Component gap (standard) | 16px | `gap-4` |
| Component gap (loose) | 24px | `gap-6` |
| Section gap | 64px | `gap-16` |

---

## Border & Radius System

```css
--radius-sm:  4px;    /* Inline tags, small pills */
--radius-md:  8px;    /* Buttons, small cards */
--radius-lg:  12px;   /* Cards */
--radius-xl:  16px;   /* Large panels */
--radius-full: 9999px; /* Pills, badges, round buttons */
```

---

## Shadow System

```css
--shadow-accent-sm:  0 0 20px rgba(124, 58, 237, 0.2);
--shadow-accent-md:  0 0 40px rgba(124, 58, 237, 0.3);
--shadow-accent-lg:  0 0 80px rgba(124, 58, 237, 0.4);
--shadow-card:       0 4px 24px rgba(0, 0, 0, 0.4);
--shadow-elevated:   0 8px 40px rgba(0, 0, 0, 0.6);
```

---

## Button Variants

| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| `primary` | `brand-accent` | white | — | `brand-accent-light` |
| `ghost` | transparent | white | `brand-border-2` | `brand-surface` bg |
| `outline-accent` | transparent | `brand-accent` | `brand-accent` | soft accent bg |

---

## Badge / Pill Style

```
background: rgba(124, 58, 237, 0.15)
border: 1px solid rgba(124, 58, 237, 0.3)
color: #8B5CF6
border-radius: 9999px
padding: 6px 14px
font: Inter 500 12px uppercase tracked
```

---

## Glow / Gradient Utilities

Hero background glow:
```css
background: radial-gradient(
  ellipse 70% 60% at 65% 40%,
  rgba(124, 58, 237, 0.28) 0%,
  rgba(124, 58, 237, 0.08) 40%,
  transparent 70%
);
```

Accent element glow (box-shadow approach):
```css
box-shadow: 0 0 40px rgba(124, 58, 237, 0.35);
```

Grid pattern overlay (subtle depth):
```css
background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
background-size: 48px 48px;
```
