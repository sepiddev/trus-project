# TRUS — Hero Section Blueprint

---

## Layout Zones

```
┌─────────────────────────────────────────────────────────────────┐
│ NAVBAR (sticky, 64–72px, full width)                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  HERO SECTION  (100svh, overflow hidden)                        │
│  ┌──────────────────────────────┐  ┌────────────────────────┐  │
│  │ [A] HERO CONTENT (left ~55%) │  │ [B] HERO VISUAL (45%)  │  │
│  │                              │  │                        │  │
│  │  ① Badge pill                │  │   ┌──────────────┐    │  │
│  │  ② Headline (3 lines)        │  │   │  hero.png    │    │  │
│  │  ③ Body copy                 │  │   │  (floating)  │    │  │
│  │  ④ CTA row (2 buttons)       │  │   └──────────────┘    │  │
│  │  ⑤ Stats row (3 items)       │  │                        │  │
│  │                              │  │   [glow behind img]    │  │
│  └──────────────────────────────┘  └────────────────────────┘  │
│                                                                 │
│  [BG] Background glow (absolute, z-0)                          │
│       Radial gradient ~60% x / 40% y                           │
│       Grid pattern overlay (very subtle)                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Component Tree

```
<HeroSection>                      ← section, relative, overflow-hidden, 100svh
  <HeroBackground>                 ← absolute inset-0, z-0 (gradient + grid)
  
  <div container>                  ← relative z-10, grid 2-col (desktop) / 1-col (mobile)
    
    <HeroContent>                  ← flex col, justify-center, gap-6
      <FadeIn delay={0.2}>
        <Badge>                    ← "Web Development Studio" pill
      </FadeIn>
      
      <div headlineBlock>
        <FadeIn delay={0.35}><HeadlineLine>line 1</HeadlineLine></FadeIn>
        <FadeIn delay={0.5}><HeadlineLine>line 2</HeadlineLine></FadeIn>
        <FadeIn delay={0.65}><HeadlineLine accent>line 3</HeadlineLine></FadeIn>
      </div>
      
      <FadeIn delay={0.8}>
        <p>body copy</p>
      </FadeIn>
      
      <StaggerGroup delay={1.0} stagger={0.1}>
        <Button variant="primary">Start a Project</Button>
        <Button variant="ghost">Explore Work</Button>
      </StaggerGroup>
      
      <StaggerGroup delay={1.2} stagger={0.08}>
        <StatItem v="200+" l="Projects Delivered" />
        <StatItem v="4.8"  l="Client Rating"      />
        <StatItem v="1,200+" l="Happy Clients"    />
      </StaggerGroup>
    
    </HeroContent>
    
    <HeroVisual>                   ← relative, flex items-center justify-center
      <FadeIn delay={0.4} direction="right">
        <motion.img                ← hero.png, float animation
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </FadeIn>
      <GlowRing />                 ← absolute, blurred circle below image
    </HeroVisual>
  
  </div>
</HeroSection>
```

---

## Full Animation Sequence

| t (seconds) | Element | From | To | Easing |
|-------------|---------|------|-----|--------|
| 0.0 | Section fade-in | opacity 0 | opacity 1 | 0.3s ease |
| 0.2 | Badge | y+20, opacity 0 | y 0, opacity 1 | EASE_PREMIUM 0.6s |
| 0.35 | Headline line 1 | y+24, opacity 0 | y 0, opacity 1 | EASE_PREMIUM 0.6s |
| 0.5 | Headline line 2 | y+24, opacity 0 | y 0, opacity 1 | EASE_PREMIUM 0.6s |
| 0.65 | Headline line 3 | y+24, opacity 0 | y 0, opacity 1 | EASE_PREMIUM 0.6s |
| 0.8 | Body copy | y+20, opacity 0 | y 0, opacity 1 | EASE_PREMIUM 0.5s |
| 1.0 | CTA button 1 | y+16, opacity 0 | y 0, opacity 1 | EASE_PREMIUM 0.5s |
| 1.1 | CTA button 2 | y+16, opacity 0 | y 0, opacity 1 | EASE_PREMIUM 0.5s |
| 1.2 | Stat 1 | y+16, opacity 0 | y 0, opacity 1 | EASE_PREMIUM 0.5s |
| 1.28 | Stat 2 | y+16, opacity 0 | y 0, opacity 1 | EASE_PREMIUM 0.5s |
| 1.36 | Stat 3 | y+16, opacity 0 | y 0, opacity 1 | EASE_PREMIUM 0.5s |
| 0.4 | Hero visual | x+40, opacity 0 | x 0, opacity 1 | EASE_PREMIUM 0.8s |
| ∞ | Hero visual | y: 0 | y: -12 → 0 | easeInOut 4s loop |
| ∞ | Hero glow | scale 1, opacity 0.6 | 1.1, 0.8 | easeInOut 6s loop |

---

## Props Interface

```ts
export interface HeroSectionProps {
  data?: {
    badge: string
    headline: [string, string, string]   // 3 lines
    body: string
    cta: {
      primary: { label: string; href: string }
      secondary: { label: string; href: string }
    }
    stats: Array<{ value: string; label: string }>
    visual?: string   // Image src — defaults to hero.png
  }
}
```

---

## Responsive Behavior

| Breakpoint | Layout | Visual |
|-----------|--------|--------|
| Mobile (`< md`) | Single column, text above visual | Visual below, 60% width, centered |
| Tablet (`md`) | Single column, visual smaller | 50% width, no float |
| Desktop (`lg+`) | Two-column grid (55/45 split) | Full size, float animation |

---

## Background Implementation Detail

```tsx
// HeroBackground — pure CSS, no canvas
<div className="absolute inset-0 -z-10">
  {/* Base dark */}
  <div className="absolute inset-0 bg-brand-bg" />
  
  {/* Radial glow */}
  <div
    className="absolute inset-0"
    style={{
      background: 'radial-gradient(ellipse 70% 60% at 65% 40%, rgba(124,58,237,0.28) 0%, rgba(124,58,237,0.08) 40%, transparent 70%)'
    }}
  />
  
  {/* Grid pattern */}
  <div
    className="absolute inset-0 opacity-30"
    style={{
      backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
      backgroundSize: '48px 48px'
    }}
  />
</div>
```

---

## Stat Item Sub-Component

```tsx
// Inline in Hero.tsx — small enough, not worth extracting
function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-display-sm font-display font-bold text-brand-white">{value}</span>
      <span className="text-label text-brand-subtle uppercase tracking-wider">{label}</span>
    </div>
  )
}
```

The stat dividers (vertical lines between items) are `<div className="w-px h-8 bg-brand-border">`.
