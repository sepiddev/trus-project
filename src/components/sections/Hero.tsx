import { motion, MotionValue } from 'framer-motion'
import { siteConfig } from '@/config/site.config'
import { parseHeadline } from '@/utils/text'
import { Button } from '@/components/ui/Button'
import { FadeIn } from '@/components/motion/FadeIn'
import { BackgroundStars } from '@/components/hero/BackgroundStars'

export interface HeroSectionProps {
  data?: typeof siteConfig.hero
  /** Scroll-driven opacity — fades the right visual out as the hero exits. */
  orbitOpacity?: MotionValue<number>
}

// ─── HeroSection ──────────────────────────────────────────────────────────────
export function HeroSection({ data = siteConfig.hero, orbitOpacity }: HeroSectionProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: '100svh' }}
      aria-label="Hero"
    >
      {/* ── Background ── */}
      <BackgroundStars />

      {/* ── Main content grid ── */}
      <div
        className="relative z-10 mx-auto w-full max-w-[1200px] px-5 flex items-center"
        style={{ minHeight: '100svh', paddingTop: '88px', paddingBottom: '80px' }}
      >
        <div className="grid w-full grid-cols-1 lg:grid-cols-[42%_58%] items-center gap-4">

          {/* ═══════════════════════════════════════════════════════════════
              LEFT COLUMN — copy (unchanged)
          ══════════════════════════════════════════════════════════════════ */}
          <div className="flex flex-col gap-6 lg:gap-7">

            {/* Headline */}
            <h1 className="flex flex-col gap-1">
              {data.headline.map((line, i) => {
                const segs   = parseHeadline(line as string)
                const isLast = i === data.headline.length - 1
                return (
                  <FadeIn key={line} delay={0.12 + i * 0.16} direction="up">
                    <span
                      className="block font-hero font-normal leading-[1.12] tracking-tight"
                      style={{ fontSize: 'clamp(2.1rem, 3.4vw, 3.1rem)' }}
                    >
                      {segs.map((seg) =>
                        seg.accent ? (
                          <span
                            key={seg.text}
                            className="font-bold"
                            style={{
                              color:      'var(--color-brand-accent)',
                              textShadow: '0 0 30px rgba(135,93,217,0.7)',
                            }}
                          >
                            {seg.text}
                          </span>
                        ) : (
                          <span key={seg.text} className="text-brand-white">
                            {seg.text}
                          </span>
                        )
                      )}
                      {isLast && <CursorBlink />}
                    </span>
                  </FadeIn>
                )
              })}
            </h1>

            {/* Subtitle */}
            <FadeIn delay={0.52} direction="up">
              <p
                className="font-body font-normal text-brand-muted leading-relaxed"
                style={{ fontSize: '1.15rem', maxWidth: '440px' }}
              >
                {data.body}
              </p>
            </FadeIn>

            {/* CTAs */}
            <FadeIn delay={0.68} direction="up" className="flex flex-wrap gap-3">
              <Button
                variant="ghost"
                href={data.cta.secondary.href}
                className="h-[44px] w-[131px]"
              >
                {data.cta.secondary.label}
              </Button>
              <Button
                variant="gradient"
                href={data.cta.primary.href}
                className="h-[44px] w-[207px]"
              >
                {data.cta.primary.label}
              </Button>
            </FadeIn>

          </div>

          {/* ═══════════════════════════════════════════════════════════════
              RIGHT COLUMN — video placeholder
              Hidden on mobile; visible on lg+ only.
          ══════════════════════════════════════════════════════════════════ */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            style={{ opacity: orbitOpacity, x: 80 }}
          >
            <HeroVideo />
          </motion.div>

        </div>
      </div>

      {/* ── Bottom label ── */}
      <BottomLabel badge={data.badge} prefix={data.badgePrefix} />
    </section>
  )
}

// ─── HeroVideo ────────────────────────────────────────────────────────────────
/**
 * Temporary video placeholder — right-side Hero visual.
 *
 * "Floating in space" technique — three layers:
 *
 * 1. GLOW  — absolute div, bleeds 45 % beyond the video on every side,
 *            completely detached from any box boundary.
 *
 * 2. SIZE  — video is rendered at 130 % of the column width and shifted
 *            left by 15 % so it is centred. The extra 15 % on each side
 *            sits in the fade zone so the active galaxy content is still
 *            ~30 % larger than the old implementation.
 *
 * 3. MASK  — two intersecting linear gradients (one per axis) instead of
 *            a single radial gradient. This gives independent, precise
 *            control over each of the four edges with no ellipse maths:
 *              H: transparent → black 22 % … 78 % → transparent
 *              V: transparent → black 25 % … 75 % → transparent
 *            Combined with mix-blend-mode: screen (dark pixels → transparent)
 *            the edges dissolve completely — no rectangular frame.
 */
function HeroVideo() {
  // Horizontal and vertical fade gradients — each fades its respective edges
  const maskH = 'linear-gradient(to right,  transparent 0%, black 22%, black 78%, transparent 100%)'
  const maskV = 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)'

  return (
    // No maxWidth, no background, no border, no overflow:hidden.
    // overflow:visible (default) lets the video and glow bleed naturally.
    <div
      style={{
        position:      'relative',
        width:         '100%',
        pointerEvents: 'none',   // never block left-column clicks
      }}
    >

      {/* Atmospheric glow — intentionally larger than the video */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          top:        '-45%',
          left:       '-32%',
          right:      '-32%',
          bottom:     '-45%',
          background:
            'radial-gradient(ellipse 64% 64% at 52% 50%,' +
            ' rgba(118,42,240,0.55) 0%,' +
            ' rgba(88,18,198,0.26) 38%,' +
            ' rgba(55,8,145,0.10) 62%,' +
            ' transparent 80%)',
          filter:     'blur(62px)',
          zIndex:     0,
        }}
      />

      {/* Video — 30 % wider than column, centred, all four edges faded */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position:  'relative',
          zIndex:    1,
          display:   'block',
          // 30 % size increase: 130 % width, centred via negative left margin
          width:              '130%',
          marginLeft:         '-15%',
          height:             'auto',
          // Screen blend — makes the video's dark background pixels
          // identical to the page background (effectively transparent)
          mixBlendMode:       'screen',
          // Dual-axis mask: H gradient × V gradient = precise 4-edge fade
          WebkitMaskImage:     `${maskH}, ${maskV}`,
          WebkitMaskComposite: 'destination-in',   // WebKit intersection
          maskImage:           `${maskH}, ${maskV}`,
          maskComposite:       'intersect',         // standard
        }}
      >
        <source src="/hero-placeholder.mp4" type="video/mp4" />
      </video>

    </div>
  )
}

// ─── CursorBlink ──────────────────────────────────────────────────────────────
function CursorBlink() {
  return (
    <motion.span
      className="inline-block align-middle rounded-[2px] ml-1"
      style={{
        width:      '3px',
        height:     '0.82em',
        background: 'var(--color-brand-accent)',
        boxShadow:  '0 0 8px var(--color-brand-accent)',
      }}
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ duration: 1, repeat: Infinity, times: [0, 0.45, 0.5, 0.95], ease: 'linear' }}
      aria-hidden="true"
    />
  )
}

// ─── BottomLabel ──────────────────────────────────────────────────────────────
function BottomLabel({ badge, prefix }: { badge: string; prefix: string }) {
  return (
    <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20 pointer-events-none">
      <FadeIn delay={1.1} direction="up">
        <div className="flex items-center gap-3">
          <span
            className="font-body font-medium text-white tracking-[0.22em] uppercase"
            style={{ fontSize: '12px' }}
          >
            {prefix}
          </span>

          {/* Glowing dot */}
          <span className="relative flex items-center justify-center" style={{ width: '14px', height: '14px' }}>
            <span
              className="absolute rounded-full"
              style={{
                inset:      '-4px',
                background: 'radial-gradient(circle, rgba(255,60,60,0.55) 0%, transparent 70%)',
                filter:     'blur(3px)',
              }}
            />
            <span
              className="relative rounded-full"
              style={{
                width:      '9px',
                height:     '9px',
                background: '#ff3333',
                boxShadow:  '0 0 8px rgba(255,60,60,0.9), 0 0 16px rgba(255,60,60,0.5)',
              }}
            />
          </span>

          <span
            className="font-body font-medium text-white tracking-[0.22em] uppercase"
            style={{ fontSize: '12px' }}
          >
            {badge}
          </span>
        </div>
      </FadeIn>
    </div>
  )
}

export default HeroSection
