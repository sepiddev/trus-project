import { motion, MotionValue } from 'framer-motion'
import { siteConfig } from '@/config/site.config'
import { parseHeadline } from '@/utils/text'
import { Button } from '@/components/ui/Button'
import { FadeIn } from '@/components/motion/FadeIn'
import { BackgroundStars } from '@/components/hero/BackgroundStars'
import { GalaxyOrbit } from '@/components/hero/GalaxyOrbit'

export interface HeroSectionProps {
  data?: typeof siteConfig.hero
  /** Scroll-driven opacity — fades the galaxy out as the hero exits. */
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
              LEFT COLUMN — copy
          ══════════════════════════════════════════════════════════════════ */}
          <div className="flex flex-col gap-6 lg:gap-7">

            {/* Headline */}
            <h1 className="flex flex-col gap-1">
              {data.headline.map((line, i) => {
                const segs  = parseHeadline(line as string)
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
              RIGHT COLUMN — Orbital galaxy system
          ══════════════════════════════════════════════════════════════════ */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            style={{ opacity: orbitOpacity }}
          >
            <GalaxyOrbit />
          </motion.div>

        </div>
      </div>

      {/* ── Bottom label ── */}
      <BottomLabel badge={data.badge} prefix={data.badgePrefix} />
    </section>
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
                width:     '9px',
                height:    '9px',
                background: '#ff3333',
                boxShadow: '0 0 8px rgba(255,60,60,0.9), 0 0 16px rgba(255,60,60,0.5)',
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
