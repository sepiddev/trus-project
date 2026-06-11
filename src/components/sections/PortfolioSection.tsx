import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { siteConfig } from '@/config/site.config'
import { ProjectCard }            from '@/components/portfolio/ProjectCard'
import { AnimatedPortfolioWord }  from '@/components/portfolio/AnimatedPortfolioWord'

// Sparse stars — module-level so they never re-generate on re-render
const PORT_STARS = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 1.4 + 0.4,
  opacity: Math.random() * 0.20 + 0.04,
}))

export function PortfolioSection() {
  // ── Scroll tracking scoped to THIS container ───────────────────────────────
  // progress 0 = container top at viewport top
  // progress 1 = container bottom at viewport bottom
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: sectionProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // ── Derived MotionValues ───────────────────────────────────────────────────

  // Cards horizontal slide (row 1 and row 2 at different rates for parallax depth)
  // Both start off-screen right, slide to off-screen left
  const cardsRow1X = useTransform(sectionProgress, [0.05, 0.88], ['38vw', '-125vw'])
  const cardsRow2X = useTransform(sectionProgress, [0.10, 0.92], ['54vw', '-120vw'])

  // Halo behind PORTFOLIO word — pulses with letter light-up, dims with cards exit
  const haloOpacity = useTransform(sectionProgress, [0.05, 0.35, 0.55, 0.78], [0, 0.6, 0.6, 0])

  const { projects } = siteConfig.portfolio
  const row1 = projects.slice(0, 5)
  const row2 = projects.slice(3, 8) // intentional overlap for density

  return (
    <>
      {/* ── Scroll container ── */}
      {/* ── TUNING: Portfolio section height — change the vh value below ── */}
      <div
        id="portfolio"
        ref={containerRef}
        style={{ height: '500vh', position: 'relative' }}
      >
        {/* ── Sticky viewport panel ───────────────────────────────────────────
             Row layout is driven by two CSS custom properties so Row 2 can
             never overlap Row 1 regardless of viewport height:

               --row1-top : clamp(280px, 34vh, 420px)
               --row2-top : the LOWER of
                            a) desktop position  min(clamp(640px,72vh,780px), 100vh-244px)
                            b) chained minimum   row1-top + 240px card + 64px gap
                            → max(a, b) guarantees ≥ 64px between the rows.

             Panel height grows past 100vh only when Row 2 wouldn't fit
             (laptop 13" / tablet) — on desktop ≥ 900px tall it stays 100vh.   */}
        <div
          style={{
            '--row1-top': 'clamp(280px, 34vh, 420px)',
            '--row2-top':
              'max(calc(var(--row1-top) + 304px), ' +
              'min(clamp(640px, 72vh, 780px), calc(100vh - 244px)))',
            position: 'sticky',
            top:      0,
            height:   'max(100vh, calc(var(--row2-top) + 252px))',
            overflow: 'hidden',
            background: '#ffffff',
          } as React.CSSProperties}
        >

          {/* ── Background layers ─────────────────────────────────────────── */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
          >
            {/* Sparse stars */}
            {PORT_STARS.map((s) => (
              <div
                key={s.id}
                className="absolute rounded-full bg-white"
                style={{
                  left:    `${s.x}%`,
                  top:     `${s.y}%`,
                  width:   s.size,
                  height:  s.size,
                  opacity: s.opacity,
                }}
              />
            ))}

            {/* Right-side ambient purple wash */}
            <div
              style={{
                position: 'absolute',
                inset:    0,
                background:
                  'radial-gradient(ellipse 55% 70% at 85% 60%, rgba(91,43,185,0.14) 0%, transparent 65%)',
              }}
            />

            {/* Bottom halo — glows as PORTFOLIO word lights up */}
            <motion.div
              style={{
                position:  'absolute',
                bottom:    '-5%',
                left:      '5%',
                right:     '5%',
                height:    '55%',
                background:
                  'radial-gradient(ellipse 80% 70% at 50% 80%, rgba(91,43,185,0.55) 0%, rgba(55,20,130,0.25) 40%, transparent 70%)',
                filter:    'blur(38px)',
                opacity:   haloOpacity,
              }}
            />

            {/* Dark T watermark — upper-right, same pattern as About section */}
            <div
              className="absolute select-none"
              style={{
                top:        '-8%',
                right:      '-4%',
                fontSize:   'clamp(240px, 30vw, 460px)',
                fontFamily: 'var(--font-hero)',
                fontWeight: 700,
                color:      'rgba(0,0,0,0.04)',
                lineHeight: 1,
                userSelect: 'none',
              }}
            >
              T
            </div>

            {/* Top edge fade (continuity from About) */}
            <div
              style={{
                position:   'absolute',
                top:        0,
                left:       0,
                right:      0,
                height:     '80px',
                background: 'linear-gradient(to bottom, #ffffff, transparent)',
              }}
            />
          </div>

          {/* ── Top content — z:10 above cards ───────────────────────────── */}
          <div
            className="relative mx-auto w-full max-w-[1200px] px-5"
            style={{ zIndex: 10, paddingTop: '130px' }}
          >
            {/* Row: label + heading + description (left) | See More (right) */}
            <div className="flex items-start justify-between">
              <div>
                {/* Eyebrow */}
                <p
                  className="font-body font-normal uppercase tracking-[0.22em]"
                  style={{
                    fontSize:     '14px',
                    lineHeight:   '20px',
                    color:        '#9F7EE1',
                    marginBottom: '0px',
                  }}
                >
                  {siteConfig.portfolio.eyebrow}
                </p>

                {/* Heading */}
                <h2
                  className="font-hero font-bold uppercase"
                  style={{
                    fontSize:     '32px',
                    lineHeight:   '1.1',
                    marginBottom: '5px',
                    color:        '#111111',
                  }}
                >
                  {siteConfig.portfolio.headline}
                </h2>

                {/* Description — two lines as specified */}
                <div
                  className="font-body font-normal"
                  style={{ fontSize: '16px', lineHeight: '20px', color: '#555555' }}
                >
                  {siteConfig.portfolio.description.map((line, i) => (
                    <p key={i} style={{ margin: 1 }}>{line}</p>
                  ))}
                </div>
              </div>

              {/* See More — top-right, aligned ~141px from section top */}
              <a
                href={siteConfig.portfolio.seeMore.href}
                className="font-body font-normal shrink-0"
                style={{
                  fontSize:   '16.35px',
                  lineHeight: '25.2px',
                  color:      '#9F7EE1',
                  marginTop:  '41px', /* 141px from section top − 100px paddingTop = 41px offset */
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.75')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                {siteConfig.portfolio.seeMore.label}
              </a>
            </div>
          </div>

          {/* ── PORTFOLIO background word — z:2, behind cards ────────────── */}
          {/* ── TUNING: PORTFOLIO word vertical position ──
                Anchored to Row 2 (not the viewport) so it always renders the
                same way: the top edge of the letters shows in the row gap and
                the rest tucks behind Row 2's cards (z:2 < z:5).
                72 px offset reproduces the previous desktop position exactly
                (Row 2 at 648 px → word at 576 px = old 64vh @ 900 px vh).     */}
          <div
            aria-hidden="true"
            style={{
              position:      'absolute',
              top:           'calc(var(--row2-top) - 72px)',
              left:          0,
              right:         0,
              paddingLeft:   'max(120px, calc((100vw - 1200px) / 2 + 20px))',
              zIndex:        2,
              pointerEvents: 'none',
              overflow:      'visible',
            }}
          >
            <AnimatedPortfolioWord sectionProgress={sectionProgress} />
          </div>

          {/* ── Project cards — z:5, above the PORTFOLIO word ────────────── */}

          {/* ── Row 1 ────────────────────────────────────────────────────────
               ── TUNING: Row 1 vertical position ──
                  --row1-top on the sticky panel: clamp(280px, 34vh, 420px)
                  floor   = 280 px  — clears the title block (~230 px tall)
                  34vh    = preferred (306 px at 900 px, 367 px at 1080 px)
                  ceiling = 420 px  — cap on tall/wide screens               */}
          <div
            style={{
              position: 'absolute',
              top:      'var(--row1-top)',
              left:     0,
              right:    0,
              zIndex:   5,
              overflow: 'visible',
            }}
          >
            <motion.div
              style={{
                display:  'flex',
                gap:      '20px',
                x:        cardsRow1X,
                width:    'max-content',
                paddingLeft: '60px',
              }}
            >
              {row1.map((p) => (
                <ProjectCard
                  key={p.id}
                  name={p.name}
                  category={p.category}
                  accent={p.accent}
                  bg={p.bg}
                />
              ))}
            </motion.div>
          </div>

          {/* ── Row 2 ────────────────────────────────────────────────────────
               ── TUNING: Row 2 vertical position ──
                  --row2-top on the sticky panel — the LOWER of:
                  a) desktop position: min(clamp(640px,72vh,780px), 100vh-244px)
                     (648 px at 900 px vh, 778 px at 1080 px vh — unchanged)
                  b) chained minimum: row1-top + 240 px card + 64 px gap
                     (engages on laptop/tablet, guarantees rows never overlap)
                  Gap between rows: 64 px floor → ≈102 px at 900 px,
                  ≈171 px at 1080 px (identical to previous desktop values)     */}
          <div
            style={{
              position: 'absolute',
              top:      'var(--row2-top)',
              left:     0,
              right:    0,
              zIndex:   5,
              overflow: 'visible',
            }}
          >
            <motion.div
              style={{
                display:  'flex',
                gap:      '20px',
                x:        cardsRow2X,
                width:    'max-content',
                paddingLeft: '60px',
              }}
            >
              {row2.map((p) => (
                <ProjectCard
                  key={p.id}
                  name={p.name}
                  category={p.category}
                  accent={p.accent}
                  bg={p.bg}
                />
              ))}
            </motion.div>
          </div>

        </div>
        {/* end sticky panel */}
      </div>
      {/* end scroll container */}
    </>
  )
}

export default PortfolioSection
