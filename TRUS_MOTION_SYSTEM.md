# TRUS — Motion System

Motion is a first-class feature of this project. Every animation decision is deliberate.

---

## Motion Philosophy

- **Purposeful**: Every animation communicates meaning (entrance, state change, hierarchy).
- **Premium easing**: No `ease-in-out` defaults — use custom cubic-bezier for high-end feel.
- **Performance**: GPU-accelerated properties only (`transform`, `opacity`). No layout thrash.
- **Respectful**: All animations check `prefers-reduced-motion` via `useReducedMotion()`.
- **Layered**: Multiple simultaneous subtle animations create depth without chaos.

---

## Easing Curves

```ts
// src/motion/variants.ts — export these constants
export const EASE_PREMIUM    = [0.16, 1, 0.3, 1]      // Main reveal ease (fast in, slow settle)
export const EASE_OUT_EXPO   = [0.19, 1, 0.22, 1]      // Overshoot/spring feel
export const EASE_IN_OUT     = [0.4, 0, 0.2, 1]        // State transitions
export const EASE_OUT_QUAD   = [0.25, 0.46, 0.45, 0.94] // Subtle exits
```

---

## Duration Scale

| Token | Value | Use case |
|-------|-------|---------|
| `DURATION_XS` | 0.15s | Micro-interactions (hover color, border) |
| `DURATION_SM` | 0.25s | Hover transforms (button scale, card lift) |
| `DURATION_MD` | 0.5s | Component entrances |
| `DURATION_LG` | 0.75s | Section reveals |
| `DURATION_XL` | 1.0s | Hero entrance, major transitions |
| `DURATION_2XL` | 1.2s | Full-page scroll-linked transitions |

---

## Stagger Delays

```ts
export const STAGGER_TIGHT  = 0.05   // List items, icons
export const STAGGER_STD    = 0.08   // Nav links, cards
export const STAGGER_LOOSE  = 0.12   // Section headline words
export const STAGGER_HERO   = 0.15   // Hero sequence elements
```

---

## Animation Variants Library

All variants live in `src/motion/variants.ts`. Import and reuse everywhere.

```ts
// Fade in from direction
export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_PREMIUM } },
}

export const fadeInDown = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_PREMIUM } },
}

export const fadeInLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_PREMIUM } },
}

export const fadeInRight = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_PREMIUM } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE_IN_OUT } },
}

// Stagger container
export const staggerContainer = (stagger = STAGGER_STD, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
})

// Scale in (for cards, buttons on hover)
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE_PREMIUM } },
}

// Clip reveal (for horizontal bar wipes)
export const clipRevealLeft = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: { clipPath: 'inset(0 0% 0 0)', transition: { duration: 0.8, ease: EASE_PREMIUM } },
}
```

---

## Component-Level Animation Map

### Navbar
| State | Animation | Primitive |
|-------|-----------|----------|
| Mount | Slide in from top: `y: -80 → 0`, opacity `0 → 1` | `motion.header` with `initial/animate` |
| Scroll > 20px | Background fades in to `brand-surface` + blur | `useScroll` → `useTransform` or state-based |
| Link hover | Underline scale `0 → 1` from left | CSS + `motion.span` |

### Hero
| Element | Trigger | Animation | Timing |
|---------|---------|-----------|--------|
| Badge | Mount | `fadeInUp` | delay 0.2s |
| Headline line 1 | Mount | `fadeInUp` | delay 0.35s |
| Headline line 2 | Mount | `fadeInUp` | delay 0.5s |
| Headline line 3 | Mount | `fadeInUp` | delay 0.65s |
| Body copy | Mount | `fadeInUp` | delay 0.8s |
| CTA buttons | Mount | `stagger` `fadeInUp` | delay 1.0s, stagger 0.1s |
| Stats row | Mount | `stagger` `fadeInUp` | delay 1.2s, stagger 0.08s |
| Hero visual | Mount | `fadeInRight` | delay 0.4s |
| Hero visual | Continuous | Float Y `-12px → 0 → -12px` | 4s loop, `easeInOut` |
| Hero glow | Continuous | Scale `1 → 1.15 → 1`, opacity pulse | 6s loop, `easeInOut` |

---

## Scroll-Linked Patterns

### Parallax (ParallaxLayer component)
```ts
const { scrollY } = useScroll()
const y = useTransform(scrollY, [0, 500], [0, speed * 100])
// GPU-safe: only transforms translate(Y)
```

### Section Entrance
```ts
// Every section uses useInView with margin: "-15%"
// Triggers fadeInUp when 15% into viewport
const ref = useRef(null)
const isInView = useInView(ref, { once: true, margin: "-15% 0px" })
```

---

## Continuous Animation Patterns

### Float (hero visual)
```ts
animate={{ y: [0, -12, 0] }}
transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
```

### Glow Pulse (hero background element)
```ts
animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6] }}
transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
```

### Subtle Rotate (decorative elements)
```ts
animate={{ rotate: [0, 360] }}
transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
```

---

## Performance Rules

1. **Only animate `transform` and `opacity`** — never `width`, `height`, `top`, `left`, `margin`.
2. **Use `will-change: transform`** only on elements with continuous animations.
3. **`once: true` on useInView** — elements don't re-animate on scroll back.
4. **Disable all animations when `useReducedMotion()` returns `true`** — set `duration: 0`.
5. **No JS-driven particle or canvas effects** — use CSS gradients for glows.

---

## Reduced Motion Policy

```ts
// Every animated component must call this:
const shouldReduceMotion = useReducedMotion()

// And pass to Framer Motion:
transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
```

The `FadeIn`, `StaggerGroup`, and `ParallaxLayer` primitives handle this automatically.
Individual components must also respect it for any custom animations.
