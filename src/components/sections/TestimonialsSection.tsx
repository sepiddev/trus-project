import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { siteConfig } from '@/config/site.config'
import { TestimonialCard } from '@/components/testimonials/TestimonialCard'

// ── Card layout config (desktop) ──────────────────────────────────────────────
// Each entry: resting left/top position, and the [start, end] progress window
// during which the card travels from +110vh below its top to its resting top.
const CARD_LAYOUT = [
  { left: '5%',  top: '38vh', inputRange: [0.06, 0.40] as [number, number] },
  { left: '55%', top: '28vh', inputRange: [0.10, 0.44] as [number, number] },
  { left: '30%', top: '52vh', inputRange: [0.14, 0.48] as [number, number] },
  { left: '55%', top: '56vh', inputRange: [0.18, 0.52] as [number, number] },
  { left: '5%',  top: '68vh', inputRange: [0.22, 0.56] as [number, number] },
] as const

// ── Sparse stars (module-level, no re-render churn) ───────────────────────────
const TEST_STARS = Array.from({ length: 25 }, (_, i) => ({
  id:      i,
  x:       Math.random() * 100,
  y:       Math.random() * 100,
  size:    Math.random() * 1.4 + 0.4,
  opacity: Math.random() * 0.18 + 0.03,
}))

// ── Shared helper — lives inside a component, NOT module-level ────────────────
function makeProgressFn(containerRef: React.RefObject<HTMLDivElement | null>) {
  return (y: number): number => {
    const el = containerRef.current
    if (!el) return 0
    const start = el.offsetTop
    const end   = el.offsetTop + el.offsetHeight - window.innerHeight
    return Math.max(0, Math.min(1, (y - start) / Math.max(1, end - start)))
  }
}

// ── Single animated card ──────────────────────────────────────────────────────
interface AnimatedCardProps {
  index:        number
  scrollYMV:    MotionValue<number>
  containerRef: React.RefObject<HTMLDivElement | null>
  isDesktop:    boolean
  children:     React.ReactNode
}

function AnimatedCard({ index, scrollYMV, containerRef, isDesktop, children }: AnimatedCardProps) {
  const layout  = CARD_LAYOUT[index]
  const [rs, re] = layout.inputRange
  const midPt   = rs + (re - rs) * 0.4
  const prog    = makeProgressFn(containerRef)

  // y: enter from +150vh → pass through composition (y=0) → exit to -130vh
  // Cards don't settle — they flow continuously upward through the scene.
  const EXIT_START = 0.57  // all cards begin exiting together
  const EXIT_END   = 0.94  // all cards fully off-screen top
  const yMV = useTransform(scrollYMV, (y) => {
    const p  = prog(y)
    const vh = window.innerHeight
    if (p <= re) {
      // Enter phase: +150vh → 0
      const t = Math.max(0, Math.min(1, (p - rs) / (re - rs)))
      return (1 - t) * (1.5 * vh)
    }
    if (p >= EXIT_START) {
      // Exit phase: 0 → -130vh (clears even the lowest card at top:68vh)
      const t = Math.max(0, Math.min(1, (p - EXIT_START) / (EXIT_END - EXIT_START)))
      return -t * (1.3 * vh)
    }
    // Brief composition hold between last card entering (0.56) and exit start (0.57)
    return 0
  })

  // opacity: fades in during the first 40% of its travel window
  const opMV = useTransform(scrollYMV, (y) => {
    return Math.max(0, Math.min(1, (prog(y) - rs) / (midPt - rs)))
  })

  if (!isDesktop) return null

  return (
    <motion.div
      style={{
        position: 'absolute',
        left:     layout.left,
        top:      layout.top,
        y:        yMV,
        opacity:  opMV,
        zIndex:   4,
      }}
    >
      {children}
    </motion.div>
  )
}

// ── Mobile stacked list ───────────────────────────────────────────────────────
interface MobileStackProps {
  items:        typeof siteConfig.testimonials.items
  scrollYMV:    MotionValue<number>
  containerRef: React.RefObject<HTMLDivElement | null>
}

function MobileStack({ items, scrollYMV, containerRef }: MobileStackProps) {
  const prog = makeProgressFn(containerRef)

  const yMV = useTransform(scrollYMV, (y) => {
    const p  = prog(y)
    const vh = window.innerHeight
    if (p <= 0.60) {
      // Enter: +80vh → 0
      const t = Math.max(0, Math.min(1, (p - 0.05) / (0.60 - 0.05)))
      return (1 - t) * (0.8 * vh)
    }
    if (p >= 0.65) {
      // Exit: stack top (44vh) + full stack height (~1250px) must clear the top.
      // 2.5 * vh is enough to push even the last card above the viewport.
      const t = Math.max(0, Math.min(1, (p - 0.65) / (0.94 - 0.65)))
      return -t * (2.5 * vh)
    }
    return 0
  })

  const opMV = useTransform(scrollYMV, (y) => {
    return Math.max(0, Math.min(1, (prog(y) - 0.05) / (0.30 - 0.05)))
  })

  return (
    <motion.div
      style={{
        position:      'absolute',
        top:           '44vh',
        left:          0,
        right:         0,
        y:             yMV,
        opacity:       opMV,
        zIndex:        4,
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        gap:           '16px',
        padding:       '0 16px',
      }}
    >
      {items.map((item) => (
        <TestimonialCard
          key={item.name}
          name={item.name}
          role={item.role}
          quote={item.quote}
          avatar={item.avatar}
          style={{ width: 'min(337px, 90vw)', height: 'auto', minHeight: '200px' }}
        />
      ))}
    </motion.div>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────
export function TestimonialsSection() {
  const { eyebrow, heading, subtitle, items } = siteConfig.testimonials

  const containerRef = useRef<HTMLDivElement>(null)
  const scrollYMV    = useMotionValue(0)
  const [isDesktop, setIsDesktop] = useState(false)

  // Breakpoint listener
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Manual scroll listener — same reliable pattern as ServicesSection
  useEffect(() => {
    const update = () => scrollYMV.set(window.scrollY)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [scrollYMV])

  const prog = makeProgressFn(containerRef)

  // Globe + header: fades 1→0 between progress 0.08 and 0.50
  const globeHeaderOpacity = useTransform(scrollYMV, (y) => {
    const p = prog(y)
    return Math.max(0, Math.min(1, 1 - (p - 0.08) / (0.50 - 0.08)))
  })

  // Dark overlay: ramps 0→0.55 between progress 0.40 and 0.80
  const overlayOpacity = useTransform(scrollYMV, (y) => {
    const p = prog(y)
    return Math.max(0, Math.min(0.55, (p - 0.40) / (0.40) * 0.55))
  })

  return (
    // ── 350vh scroll container ───────────────────────────────────────────────
    <div
      id="testimonials"
      ref={containerRef}
      style={{ height: '350vh', position: 'relative' }}
    >
      {/* ── Sticky viewport panel ─────────────────────────────────────────── */}
      <div
        style={{
          position:   'sticky',
          top:        0,
          height:     '100vh',
          overflow:   'hidden',
          background: 'var(--color-brand-bg)',
        }}
      >

        {/* Sparse stars */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {TEST_STARS.map((s) => (
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
        </div>

        {/* Progressive dark overlay — sits above globe (z:2) but below cards (z:4) */}
        <motion.div
          aria-hidden="true"
          style={{
            position:      'absolute',
            inset:         0,
            background:    '#000000',
            opacity:       overlayOpacity,
            zIndex:        3,
            pointerEvents: 'none',
          }}
        />

        {/* Globe + header block */}
        <motion.div
          style={{
            position:      'absolute',
            inset:         0,
            opacity:       globeHeaderOpacity,
            zIndex:        2,
            pointerEvents: 'none',
          }}
        >
          {/* Soft purple aura — behind globe, slightly larger */}
          <div
            aria-hidden="true"
            style={{
              position:      'absolute',
              top:           '50%',
              left:          '50%',
              transform:     'translate(-50%, -50%)',
              width:         'clamp(520px, 82vw, 900px)',
              height:        'clamp(520px, 82vw, 900px)',
              background:    'radial-gradient(ellipse 55% 55% at 50% 50%, rgba(135,93,217,0.22) 0%, rgba(83,40,168,0.09) 42%, transparent 68%)',
              filter:        'blur(32px)',
              zIndex:        0,
              pointerEvents: 'none',
            }}
          />

          {/* Globe video — clipped to circle, white glow suppressed */}
          <div
            aria-hidden="true"
            style={{
              position:     'absolute',
              top:          '50%',
              left:         '50%',
              transform:    'translate(-50%, -50%)',
              width:        'clamp(400px, 65vw, 720px)',
              height:       'clamp(400px, 65vw, 720px)',
              zIndex:       1,
              overflow:     'hidden',
              borderRadius: '50%',
            }}
          >
            <video
              src="/globe.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{
                width:     '100%',
                height:    '100%',
                objectFit: 'cover',
                display:   'block',
                opacity:   0.65,
              }}
            />

            {/* Dark purple overlay — sits directly on the video, kills white brightness */}
            <div
              style={{
                position:   'absolute',
                inset:      0,
                background: 'rgba(4, 2, 18, 0.52)',
              }}
            />

            {/* Edge vignette — slight dark tint at centre, solid at edges */}
            <div
              style={{
                position:   'absolute',
                inset:      0,
                background: 'radial-gradient(ellipse 65% 65% at 50% 50%, rgba(4,2,18,0.12) 25%, rgba(6,4,20,0.80) 72%, rgba(5,5,14,1.00) 100%)',
              }}
            />
          </div>

          {/* Header text */}
          <div
            style={{
              position:      'absolute',
              top:           '200px',
              left:          0,
              right:         0,
              display:       'flex',
              flexDirection: 'column',
              alignItems:    'center',
              gap:           '6px',
              zIndex:        2,
            }}
          >
            <p
              style={{
                fontFamily:    'var(--font-body)',
                fontWeight:    400,
                fontSize:      '14px',
                lineHeight:    '20px',
                color:         '#9F7EE1',
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                margin:        0,
                textAlign:     'center',
              }}
            >
              {eyebrow}
            </p>

            <h2
              style={{
                fontFamily:    'var(--font-hero)',
                fontWeight:    700,
                fontSize:      'clamp(24px, 3.5vw, 32px)',
                lineHeight:    '43px',
                color:         '#FFFFFF',
                textTransform: 'uppercase',
                margin:        0,
                textAlign:     'center',
                letterSpacing: '-0.01em',
              }}
            >
              {heading}
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
                fontSize:   '14px',
                lineHeight: '26px',
                color:      '#BFBFBF',
                margin:     '4px 0 0 0',
                textAlign:  'center',
                maxWidth:   '460px',
              }}
            >
              {subtitle[0]}
              <br />
              {subtitle[1]}
            </p>
          </div>
        </motion.div>

        {/* Desktop: 5 individually animated cards */}
        {isDesktop && items.map((item, i) => (
          <AnimatedCard
            key={item.name}
            index={i}
            scrollYMV={scrollYMV}
            containerRef={containerRef}
            isDesktop={isDesktop}
          >
            <TestimonialCard
              name={item.name}
              role={item.role}
              quote={item.quote}
              avatar={item.avatar}
            />
          </AnimatedCard>
        ))}

        {/* Mobile: single-axis animated stack */}
        {!isDesktop && (
          <MobileStack
            items={items}
            scrollYMV={scrollYMV}
            containerRef={containerRef}
          />
        )}

        {/* T watermark */}
        <div
          aria-hidden="true"
          style={{
            position:      'absolute',
            bottom:        '-5%',
            left:          '-2%',
            fontSize:      'clamp(200px, 26vw, 380px)',
            fontFamily:    'var(--font-hero)',
            fontWeight:    700,
            color:         'rgba(135,93,217,0.022)',
            lineHeight:    1,
            userSelect:    'none',
            pointerEvents: 'none',
            zIndex:        1,
          }}
        >
          T
        </div>

      </div>
    </div>
  )
}

export default TestimonialsSection
