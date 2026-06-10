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
      {/* ── Scroll container — 420vh gives ~2835px of scroll travel ── */}
      {/* ── TUNING: Portfolio section height — change the vh value below ── */}
      <div
        id="portfolio"
        ref={containerRef}
        style={{ height: '400vh', position: 'relative' }}
      >
        {/* ── Sticky viewport panel ─────────────────────────────────────────── */}
        <div
          style={{
            position: 'sticky',
            top:      0,
            height:   '100vh',
            overflow: 'hidden',
            background: '#ffffff',
          }}
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
            className="relative mx-auto w-full max-w-300 px-5"
            style={{ zIndex: 10, paddingTop: '100px' }}
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
                Sits just below Row 1's bottom edge, between the two card rows.
                clamp(floor, preferred-vh, ceiling)                            */}
          <div
            aria-hidden="true"
            style={{
              position:      'absolute',
              top:           'clamp(405px, 58vh, 555px)',
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
                  clamp(floor, preferred-vh, ceiling)
                  floor   = 244 px  — minimum safe distance below the title block
                  28vh    = preferred (252 px at 900 px viewport)
                  ceiling = 310 px  — prevents rows drifting too low on tall screens  */}
          <div
            style={{
              position: 'absolute',
              top:      'clamp(200px, 30vh, 350px)',
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
                  clamp(floor, preferred-vh, ceiling)
                  floor   = 500 px  — Row 1 floor (244) + card height (240) + 16 px gap
                  57vh    = preferred (513 px at 900 px viewport)
                  ceiling = 590 px  — keeps Row 2 inside 100 vh on very tall screens
                  At 768 px: floor (500) used → Row 2 bottom = 740 px, 28 px from edge ✓  */}
          <div
            style={{
              position: 'absolute',
              top:      'min(clamp(520px, 62vh, 640px), calc(100vh - 244px))',
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
