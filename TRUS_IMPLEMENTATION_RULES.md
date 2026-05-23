# TRUS — Implementation Rules

These rules are mandatory for every file written in this project.
Violations must be fixed immediately, not deferred.

---

## 1. TypeScript

- **Strict mode is on** — no `any`, no `@ts-ignore`, no `as unknown`.
- Every component has a typed `Props` interface (`interface ComponentNameProps`).
- Optional props use `?` and always have a default value.
- All exported functions have explicit return types.
- Asset imports use TypeScript's module declaration or Vite's asset URL import.

```ts
// ✅
import heroImg from '@/assets/hero.png'   // typed as string (URL)

// ✅
interface ButtonProps {
  variant?: 'primary' | 'ghost' | 'outline-accent'
  children: React.ReactNode
  onClick?: () => void
  href?: string
  className?: string
}
```

---

## 2. Content & Configuration

- **Zero hardcoded strings in JSX.** Every visible string comes from `site.config.ts`.
- Color values (in `style={}` props) must reference CSS variables, not hex literals.
  Exception: one-off background gradients in `HeroBackground` that can't be tokenized.
- Navigation links, CTA labels, stat values — all in config.

---

## 3. Styling

- **Tailwind utility classes only** — no CSS modules, no `styled-components`.
- No inline styles except for JS-driven dynamic values (Framer Motion `style={{ y }}`).
- No `!important`. If Tailwind specificity is an issue, rethink the composition.
- All responsive classes are **mobile-first**: `text-sm md:text-base lg:text-lg`.
- Custom CSS lives only in `src/styles/globals.css` under `@layer base` or `@theme`.
- The `cn()` utility (or Tailwind Merge) is used for conditional class merging.

---

## 4. Animation

- **GPU-accelerated only**: `transform` (translate, scale, rotate) and `opacity`.
- Never animate `width`, `height`, `padding`, `margin`, `top`, `left`, etc.
- Every animated component calls `useReducedMotion()` and passes `duration: 0` when true.
- `useInView` always uses `once: true` — no re-animation on scroll back.
- Continuous animations (float, pulse) use `repeat: Infinity` with `ease: "easeInOut"`.
- No animation libraries beyond Framer Motion.

---

## 5. Component Rules

- Components are **pure functions** (no class components).
- Each component is exported as a **named export** AND as the default export.
  This is required for template tree-shaking flexibility.
- Components that are section-level accept an optional `data` prop pointing to the
  relevant slice of `siteConfig`. They fall back to `siteConfig` if no prop is passed.
- No component imports from a sibling component directly — always through the index
  file or by importing from the shared layer (`ui/`, `motion/`, `layout/`).

---

## 6. Accessibility

- Every `<img>` has `alt`. Decorative images use `alt=""` and `aria-hidden="true"`.
- Interactive elements (`<button>`, `<a>`) have visible focus styles and `aria-label`
  where the label is not evident from text content alone.
- Heading hierarchy is respected: one `<h1>` per page, sections use `<h2>`.
- Color contrast meets WCAG AA (4.5:1 for body, 3:1 for large text).
- Keyboard navigation works for all interactive components.

---

## 7. Performance

- Images are loaded with `loading="lazy"` except above-the-fold (Hero visual).
- No synchronous heavy computations in render — use `useMemo` if needed.
- No unnecessary `useEffect` or subscriptions.
- The hero `hero.png` is the only above-the-fold image — ensure it loads fast (no lazy).
- Framer Motion is imported tree-shakably: `import { motion } from 'framer-motion'`
  (not the entire bundle).

---

## 8. File Organization

- One component per file (no multi-export component files except `index.ts` barrels).
- `index.ts` barrel files are optional — only add them once there are 3+ exports.
- Section files live in `src/components/sections/`.
- Motion primitives live in `src/components/motion/`.
- The variants object library lives in `src/motion/variants.ts`.

---

## 9. Code Comments

- **No comments explaining what the code does** — the code explains itself.
- Write a comment only when explaining a non-obvious constraint, a workaround, or
  a specific architectural reason.
- No TODO comments in committed code.

---

## 10. Git Discipline

- Commits follow conventional commits: `feat:`, `fix:`, `style:`, `chore:`, `docs:`.
- Each logical phase (foundation, primitives, navbar, hero) is a separate commit.
- Never commit with failing TypeScript (`tsc`) or ESLint errors.

---

## Quick Checklist Before Marking Any Task Done

- [ ] `tsc --noEmit` passes (zero errors)
- [ ] No hardcoded strings in JSX
- [ ] Every animation respects `useReducedMotion()`
- [ ] All props are typed
- [ ] Mobile layout is correct
- [ ] Focus states are visible
- [ ] No inline static styles (only Tailwind + dynamic Framer transforms)
