import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { CrystalT } from '@/components/hero/CrystalT'
import { ContactInfoCard } from '@/components/contact/ContactInfoCard'
import { ContactForm } from '@/components/contact/ContactForm'
import { siteConfig } from '@/config/site.config'
import { FadeIn } from '@/components/motion/FadeIn'

// Crystal T display dimensions at arrival scale
const T_W = Math.round(380 * 0.40)   // ≈ 152 px
const T_H = Math.round(430 * 0.40)   // ≈ 172 px

// Timing constants — tuned for continuous enter → touch → exit feel
const DURATION = 3.0    // total T animation duration (seconds)
const ARRIVE_T = 0.38   // fraction when T reaches card centre (≈ 1.14 s)
const EXIT_T   = 0.52   // fraction when T starts leaving (dwell ≈ 0.42 s only)

export function ContactSection() {
  const { eyebrow, heading, card, form } = siteConfig.contact

  const sectionRef = useRef<HTMLElement>(null)
  const cardRef    = useRef<HTMLDivElement>(null)
  const controls   = useAnimation()
  const timers     = useRef<ReturnType<typeof setTimeout>[]>([])
  const prevInView = useRef(false)

  const [isLit, setIsLit] = useState(false)

  // Fire when 40 % of the section is in view — ensures the card is visible
  const isInView = useInView(sectionRef, { once: false, amount: 0.40 })

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }, [])

  useEffect(() => {
    const wasInView = prevInView.current
    prevInView.current = isInView

    if (!isInView) {
      if (wasInView) clearTimers()
      // isLit intentionally NOT reset — border keeps its "transferred energy"
      return
    }
    if (wasInView) return   // still in view after a re-render

    clearTimers()

    const sec  = sectionRef.current
    const card = cardRef.current
    if (!sec || !card) return

    const sRect = sec.getBoundingClientRect()
    const cRect = card.getBoundingClientRect()

    // Section-relative coordinates for position:absolute placement
    const cardX = cRect.left  - sRect.left
    const cardY = cRect.top   - sRect.top
    const cardW = cRect.width
    const cardH = cRect.height

    // T path: off-screen left → card left-centre → off-screen lower-left
    const entryX   = -(T_W + 80)
    const entryY   = cardY - 40
    const arrivalX = cardX + cardW * 0.20 - T_W * 0.5
    const arrivalY = cardY + cardH * 0.28 - T_H * 0.5
    const exitX    = -(T_W + 100)
    const exitY    = cardY + cardH * 0.85

    controls.set({ x: entryX, y: entryY, scale: 0.52, opacity: 0 })
    controls.start({
      x:       [entryX, arrivalX, arrivalX, exitX],
      y:       [entryY, arrivalY, arrivalY, exitY],
      opacity: [0,      1,        0.95,     0    ],
      scale:   [0.52,   0.40,     0.40,     0.34 ],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transition: { duration: DURATION, times: [0, ARRIVE_T, EXIT_T, 0.92], ease: 'easeInOut' as any },
    })

    // Light border exactly when T arrives at the card
    const t1 = setTimeout(
      () => setIsLit(true),
      Math.round(ARRIVE_T * DURATION * 1000),
    )
    timers.current.push(t1)
  }, [isInView, clearTimers, controls])

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ position: 'relative', background: '#FFFFFF', overflow: 'visible' }}
    >
      {/* ── Crystal T — absolutely scoped to this section, never fixed ── */}
      <div
        aria-hidden="true"
        className="hidden lg:block pointer-events-none"
        style={{
          position:      'absolute',
          inset:         0,
          overflow:      'visible',
          zIndex:        20,
          pointerEvents: 'none',
        }}
      >
        <motion.div
          animate={controls}
          style={{
            position:        'absolute',
            left:            0,
            top:             0,
            width:           380,
            opacity:         0,
            transformOrigin: 'center center',
            pointerEvents:   'none',
          }}
        >
          <CrystalT />
        </motion.div>
      </div>

      {/* ── Content ── */}
      <div
        className="relative mx-auto w-full max-w-[1200px] px-5"
        style={{ paddingTop: '100px', paddingBottom: '120px', position: 'relative', zIndex: 2 }}
      >

        {/* Eyebrow */}
        <FadeIn direction="up" delay={0.08}>
          <p
            style={{
              fontFamily:    'var(--font-body)',
              fontWeight:    400,
              fontSize:      '14px',
              lineHeight:    '100%',
              color:         '#5B2BB9',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              margin:        '0 0 24px 0',
            }}
          >
            {eyebrow}
          </p>
        </FadeIn>

        {/* Heading */}
        <FadeIn direction="up" delay={0.16}>
          <h2
            style={{
              fontFamily: 'var(--font-hero)',
              fontWeight: 700,
              fontSize:   'clamp(28px, 3vw, 42px)',
              lineHeight: '100%',
              color:      '#070606',
              margin:     '0 0 48px 0',
            }}
          >
            {heading}
          </h2>
        </FadeIn>

        {/* Two-column layout — no FadeIn wrapper so cardRef measures accurately */}
        <div
          className="flex flex-col lg:flex-row"
          style={{ gap: '48px', alignItems: 'flex-start' }}
        >
          {/* Left — info card (ref measured for T targeting) */}
          <div style={{ flexShrink: 0, width: 'min(380px, 100%)' }}>
            <ContactInfoCard
              ref={cardRef}
              tagline={card.tagline}
              cta={card.cta}
              office={card.office}
              phone={card.phone}
              email={card.email}
              isLit={isLit}
            />
          </div>

          {/* Right — contact form */}
          <div style={{ flex: 1, minWidth: 0, paddingTop: '8px' }}>
            <ContactForm fields={form.fields} submit={form.submit} />
          </div>
        </div>

      </div>
    </section>
  )
}

export default ContactSection
