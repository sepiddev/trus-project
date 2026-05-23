import { motion } from 'framer-motion'
import { siteConfig } from '@/config/site.config'
import { Button } from '@/components/ui/Button'
import { FadeIn } from '@/components/motion/FadeIn'

export interface HeroSectionProps {
  data?: typeof siteConfig.hero
}

/**
 * Parses the [accent] convention from a headline line.
 * "at [TruS]" → [{ text: 'at ', accent: false }, { text: 'TruS', accent: true }]
 */
function parseHeadlineLine(line: string): Array<{ text: string; accent: boolean }> {
  const parts: Array<{ text: string; accent: boolean }> = []
  const re = /\[([^\]]+)\]/g
  let last = 0
  let match: RegExpExecArray | null
  while ((match = re.exec(line)) !== null) {
    if (match.index > last) parts.push({ text: line.slice(last, match.index), accent: false })
    parts.push({ text: match[1], accent: true })
    last = match.index + match[0].length
  }
  if (last < line.length) parts.push({ text: line.slice(last), accent: false })
  return parts
}

export function HeroSection({ data = siteConfig.hero }: HeroSectionProps) {
  const isLastLine = (i: number) => i === data.headline.length - 1

  return (
    <section
      className="relative overflow-hidden flex items-center"
      style={{ minHeight: '100svh' }}
      aria-label="Hero"
    >
      <HeroBackground />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 pt-[120px] pb-20 lg:pt-[140px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* ── Left: copy ────────────────────────────────────────── */}
          <div className="flex flex-col gap-6 lg:gap-7">

            {/* Headline — DM Sans, one h1, per-line FadeIn via stagger */}
            <h1 className="flex flex-col gap-1">
              {data.headline.map((line, i) => {
                const segments = parseHeadlineLine(line as string)
                const isLast   = isLastLine(i)
                return (
                  <FadeIn key={line} delay={0.15 + i * 0.18} direction="up">
                    <span
                      className="block font-hero font-normal leading-[1.1] tracking-tight text-brand-white"
                      style={{ fontSize: 'clamp(2rem, 3.3vw, 3rem)' }}
                    >
                      {segments.map((seg) =>
                        seg.accent
                          ? (
                            <span
                              key={seg.text}
                              className="font-bold"
                              style={{ color: 'var(--color-brand-accent)' }}
                            >
                              {seg.text}
                            </span>
                          )
                          : <span key={seg.text}>{seg.text}</span>
                      )}
                      {isLast && <CursorBlink />}
                    </span>
                  </FadeIn>
                )
              })}
            </h1>

            {/* Subtitle */}
            <FadeIn delay={0.55} direction="up">
              <p
                className="font-body font-normal text-brand-muted leading-relaxed"
                style={{ fontSize: '1.25rem', maxWidth: '463px' }}
              >
                {data.body}
              </p>
            </FadeIn>

            {/* CTAs */}
            <FadeIn delay={0.7} direction="up" className="flex flex-wrap gap-3">
              {/* Browse Templates — gradient */}
              <Button
                variant="gradient"
                href={data.cta.primary.href}
                className="h-[44px] w-[207px]"
              >
                {data.cta.primary.label}
              </Button>
              {/* Why TruS — ghost with white border */}
              <Button
                variant="ghost"
                href={data.cta.secondary.href}
                className="h-[44px] w-[131px]"
              >
                {data.cta.secondary.label}
              </Button>
            </FadeIn>

            {/* We ◉ READY-MADE TEMPLATES */}
            <FadeIn delay={0.85} direction="up" className="flex items-center gap-[10px]">
              <RecordIcon />
              <span className="font-body font-normal text-[12px] tracking-widest uppercase text-brand-white">
                {data.badgePrefix}
              </span>
              <span className="font-body font-normal text-[12px] tracking-widest uppercase text-brand-white opacity-60">
                {data.badge}
              </span>
            </FadeIn>
          </div>

          {/* ── Right: large TRUS typography ──────────────────────── */}
          <div className="hidden lg:flex items-center justify-center relative overflow-hidden">
            <FadeIn delay={0.3} direction="right">
              <TrusTypography />
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── TrusTypography ──────────────────────────────────────────────────────────
// Each letter has its own span with data-letter + class for future scroll effects.
// "T" (hero-letter-t) is specifically isolated for the planned scroll-detach animation.

function TrusTypography() {
  return (
    <div
      className="relative flex items-center justify-center select-none"
      aria-hidden="true"
    >
      <div
        className="flex leading-none"
        style={{
          fontFamily:    'var(--font-hero)',
          fontWeight:    700,
          fontSize:      'clamp(130px, 13vw, 200px)',
          letterSpacing: '-0.04em',
          color:         'rgba(255, 255, 255, 0.07)',
          textShadow:    '0 0 120px rgba(135, 93, 217, 0.45)',
        }}
      >
        <span data-letter="T" className="hero-letter hero-letter-t">T</span>
        <span data-letter="R" className="hero-letter hero-letter-r">R</span>
        <span data-letter="U" className="hero-letter hero-letter-u">U</span>
        <span data-letter="S" className="hero-letter hero-letter-s">S</span>
      </div>
    </div>
  )
}

// ─── CursorBlink ─────────────────────────────────────────────────────────────

function CursorBlink() {
  return (
    <motion.span
      className="inline-block align-middle rounded-[2px] ml-1"
      style={{ width: '3px', height: '0.82em', background: 'var(--color-brand-accent)' }}
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ duration: 1, repeat: Infinity, times: [0, 0.45, 0.5, 0.95], ease: 'linear' }}
      aria-hidden="true"
    />
  )
}

// ─── RecordIcon ──────────────────────────────────────────────────────────────
// Simplified vinyl record: outer circle outline + inner dot (label hole)

function RecordIcon() {
  return (
    <span
      className="inline-flex size-[18px] items-center justify-center rounded-full shrink-0"
      style={{ border: '1.5px solid rgba(255,255,255,0.4)' }}
      aria-hidden="true"
    >
      <span
        className="size-[5px] rounded-full"
        style={{ background: 'rgba(255,255,255,0.55)' }}
      />
    </span>
  )
}

// ─── HeroBackground ──────────────────────────────────────────────────────────

function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10" aria-hidden="true">
      {/* Deep dark base */}
      <div className="absolute inset-0 bg-brand-bg" />

      {/* Upper-right subtle purple gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 80% 10%, rgba(135,93,217,0.18) 0%, rgba(83,40,168,0.06) 50%, transparent 75%)',
        }}
      />

      {/* Mid-right ambient glow — sits behind TRUS text */}
      <div
        className="absolute"
        style={{
          inset: 0,
          background:
            'radial-gradient(ellipse 45% 55% at 78% 52%, rgba(135,93,217,0.10) 0%, transparent 65%)',
        }}
      />

      {/* Subtle grid — depth without distraction */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      {/* Bottom vignette */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--color-brand-bg))' }}
      />
    </div>
  )
}

export default HeroSection
