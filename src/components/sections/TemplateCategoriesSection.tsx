import { useRef, useState, useEffect, useCallback } from 'react'
import { useInView } from 'framer-motion'
import { siteConfig } from '@/config/site.config'
import { FadeIn } from '@/components/motion/FadeIn'
import { TemplatesT } from '@/components/hero/TemplatesT'
import { TemplateCard } from '@/components/templates/TemplateCard'
import { CategoryTabs } from '@/components/templates/CategoryTabs'

// ── Grid layout map ────────────────────────────────────────────────────────────
// 12-column grid, 3 rows. Card index 4 (card #5, 1-indexed) is the featured
// centre card spanning 6 of 12 columns — visually the centrepiece of the grid.
//
//  Row 1  [0: 4col] [1: 4col] [2: 4col]           — 3 equal cards, 260 px tall
//  Row 2  [3: 3col] [4: 6col ★] [5: 3col]         — card #5 featured, 300 px tall
//  Row 3  [6: 3col] [7: 3col] [8: 3col] [9: 3col] — 4 smaller cards, 200 px tall
//
// ── TUNING: row heights ──────────────────────────────────────────────────────
const GRID_LAYOUT: { colSpan: number; height: number; isFeatured?: boolean }[] = [
  { colSpan: 4, height: 260 },
  { colSpan: 4, height: 260 },
  { colSpan: 4, height: 260 },
  { colSpan: 3, height: 300 },
  { colSpan: 6, height: 300, isFeatured: true },   // ← card #5
  { colSpan: 3, height: 300 },
  { colSpan: 3, height: 200 },
  { colSpan: 3, height: 200 },
  { colSpan: 3, height: 200 },
  { colSpan: 3, height: 200 },
]

// Card #5 is index 4
const FEATURED_INDEX = 4

// Cascade order — energy spreads outward from card #5 to adjacent then distant cards.
// Indices: all except FEATURED_INDEX, ordered by proximity to centre.
// ── TUNING: cascade order & delays ──────────────────────────────────────────
const CASCADE_ORDER  = [3, 5, 1, 7, 6, 8, 0, 9, 2]
const CASCADE_DELAYS = [0, 180, 360, 560, 780, 1000, 1240, 1510, 1800]   // ms from cascade start

// ── T animation timing (must match TemplatesT keyframe times × duration) ────
const T_ARRIVAL_MS  = Math.round(2200 * 0.54)   // ≈ 1188 ms — when T centres on card #5
const CASCADE_START = T_ARRIVAL_MS + 480         // start cascade after card #5 glow establishes

// Type helpers
type Category = typeof siteConfig.templateCategories.categories[number]
type TState   = { active: boolean; targetX: number; targetY: number }

export function TemplateCategoriesSection() {
  const { eyebrow, heading, description, seeMore, categories, templates } =
    siteConfig.templateCategories

  // ── State ────────────────────────────────────────────────────────────────────
  const [activeCategory, setActiveCategory] = useState<Category>(categories[0])
  const [tState, setTState]                 = useState<TState>({ active: false, targetX: 0, targetY: 0 })
  const [card5Lit, setCard5Lit]             = useState(false)
  const [activatedSet, setActivatedSet]     = useState<Set<number>>(new Set())

  // ── Refs ─────────────────────────────────────────────────────────────────────
  const sectionRef  = useRef<HTMLElement>(null)
  const card5Ref    = useRef<HTMLDivElement>(null)
  const triggeredRef = useRef(false)

  // ── Intersection trigger ──────────────────────────────────────────────────────
  // Fires once when 20 % of the section is visible.
  const isInView = useInView(sectionRef, { once: true, amount: 0.20 })

  // ── Cascade helper ────────────────────────────────────────────────────────────
  const startCascade = useCallback(() => {
    CASCADE_ORDER.forEach((cardIndex, i) => {
      setTimeout(() => {
        setActivatedSet((prev) => new Set([...prev, cardIndex]))
      }, CASCADE_DELAYS[i])
    })
  }, [])

  // ── Main animation sequence ───────────────────────────────────────────────────
  useEffect(() => {
    if (!isInView || triggeredRef.current) return
    triggeredRef.current = true

    const el = card5Ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    setTState({
      active:  true,
      targetX: rect.left + rect.width  / 2,
      targetY: rect.top  + rect.height / 2,
    })

    // Card #5 lights up when T arrives
    const t1 = setTimeout(() => setCard5Lit(true), T_ARRIVAL_MS)

    // Cascade begins after card #5 glow establishes
    const t2 = setTimeout(() => startCascade(), CASCADE_START)

    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [isInView, startCascade])

  // ── Tab switch ────────────────────────────────────────────────────────────────
  // Reset activations so new cards feel fresh. T animation does NOT replay.
  function handleCategoryChange(cat: string) {
    setActiveCategory(cat as Category)
    setCard5Lit(false)
    setActivatedSet(new Set())
  }

  const currentTemplates =
    templates[activeCategory as keyof typeof templates] as readonly {
      id: number; name: string; tag: string; image: string
    }[]

  return (
    <>
      {/* ── Position:fixed Crystal T ── */}
      <TemplatesT
        active={tState.active}
        targetX={tState.targetX}
        targetY={tState.targetY}
      />

      {/* ── Section ── */}
      <section
        id="templates"
        ref={sectionRef}
        className="relative"
        style={{
          background: 'var(--color-brand-bg)',
          paddingBottom: '100px',
          overflow: 'hidden',
        }}
        aria-label="Template Categories"
      >
        {/* Top fade-in from Why Us section */}
        <div
          aria-hidden="true"
          style={{
            position:   'absolute',
            top:        0, left: 0, right: 0,
            height:     '100px',
            background: 'linear-gradient(to bottom, var(--color-brand-bg), transparent)',
            zIndex:     1,
            pointerEvents: 'none',
          }}
        />

        {/* Background T watermark — upper-right, very faint */}
        <div
          aria-hidden="true"
          className="absolute select-none pointer-events-none"
          style={{
            top:        '-6%',
            right:      '-3%',
            fontSize:   'clamp(220px, 28vw, 420px)',
            fontFamily: 'var(--font-hero)',
            fontWeight: 700,
            color:      'rgba(135, 93, 217, 0.022)',
            lineHeight: 1,
          }}
        >
          T
        </div>

        <div
          className="relative mx-auto w-full"
          style={{ maxWidth: '1200px', paddingLeft: '20px', paddingRight: '20px', zIndex: 2 }}
        >

          {/* ══════════════════════════════════════════════════════════════════
              SECTION HEADER
          ══════════════════════════════════════════════════════════════════ */}
          <div style={{ paddingTop: '110px' }}>

            {/* Eyebrow + Heading row (left) | See More (right) */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>

              {/* Left block */}
              <div>
                {/* Eyebrow */}
                <FadeIn direction="up" delay={0.08}>
                  <p
                    style={{
                      fontFamily:    'var(--font-body)',
                      fontSize:      '14px',
                      fontWeight:    400,
                      lineHeight:    '20px',
                      color:         '#9F7EE1',
                      textTransform: 'uppercase',
                      letterSpacing: '0.18em',
                      margin:        0,
                    }}
                  >
                    {eyebrow}
                  </p>
                </FadeIn>

                {/* Heading */}
                <FadeIn direction="up" delay={0.18}>
                  <h2
                    style={{
                      fontFamily:  'var(--font-hero)',
                      fontSize:    '32px',
                      fontWeight:  700,
                      lineHeight:  '67.2px',
                      color:       '#FFFFFF',
                      margin:      0,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {heading}
                  </h2>
                </FadeIn>

                {/* Description */}
                <FadeIn direction="up" delay={0.28}>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize:   '16px',
                      fontWeight: 400,
                      lineHeight: '28px',
                      color:      '#BFBFBF',
                      margin:     0,
                    }}
                  >
                    {description}
                  </p>
                </FadeIn>
              </div>

              {/* See More — aligned to heading area (153px from section top − 110px padding = 43px) */}
              <FadeIn direction="up" delay={0.22}>
                <a
                  href={seeMore.href}
                  style={{
                    fontFamily:     'var(--font-body)',
                    fontSize:       '16px',
                    fontWeight:     400,
                    color:          '#9F7EE1',
                    textDecoration: 'none',
                    marginTop:      '43px',
                    display:        'inline-block',
                    flexShrink:     0,
                    transition:     'opacity 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  {seeMore.label}
                </a>
              </FadeIn>
            </div>

            {/* Divider — 993 px wide (centred within max-width container) */}
            <FadeIn direction="none" delay={0.38}>
              <div
                style={{
                  width:        '993px',
                  maxWidth:     '100%',
                  height:       '1px',
                  background:   'rgba(255,255,255,0.30)',
                  marginTop:    '18px',
                }}
                aria-hidden="true"
              />
            </FadeIn>

            {/* Category Tabs */}
            <FadeIn direction="up" delay={0.48}>
              <div style={{ marginTop: '24px' }}>
                <CategoryTabs
                  categories={categories}
                  activeCategory={activeCategory}
                  onChange={handleCategoryChange}
                />
              </div>
            </FadeIn>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              TEMPLATE GRID WRAPPER
          ══════════════════════════════════════════════════════════════════ */}
          <FadeIn direction="up" delay={0.58}>
            <div
              style={{
                marginTop:    '28px',
                background:   'rgba(10, 10, 20, 0.70)',
                border:       '1px solid rgba(255,255,255,0.07)',
                borderRadius: '20px',
                padding:      '20px',
              }}
            >
              {/* 12-column grid */}
              <div
                key={activeCategory}   // remount grid on tab change → fresh stagger
                style={{
                  display:               'grid',
                  gridTemplateColumns:   'repeat(12, 1fr)',
                  gap:                   '14px',
                }}
              >
                {GRID_LAYOUT.map((layout, index) => {
                  const tpl = currentTemplates[index]
                  if (!tpl) return null

                  const isFeatured   = index === FEATURED_INDEX
                  const isCard5Lit   = isFeatured && card5Lit
                  const isCascadeLit = !isFeatured && activatedSet.has(index)

                  return (
                    <div
                      key={`${activeCategory}-${tpl.id}`}
                      style={{
                        gridColumn: `span ${layout.colSpan}`,
                        // Stagger entrance on tab switch via animation-delay CSS
                        animationDelay: `${index * 40}ms`,
                      }}
                    >
                      <TemplateCard
                        ref={isFeatured ? card5Ref : undefined}
                        name={tpl.name}
                        tag={tpl.tag}
                        image={tpl.image}
                        height={layout.height}
                        isActivated={isCard5Lit || isCascadeLit}
                        isFeatured={layout.isFeatured}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </FadeIn>

        </div>
      </section>
    </>
  )
}

export default TemplateCategoriesSection
