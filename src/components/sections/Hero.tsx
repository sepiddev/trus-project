import { motion } from 'framer-motion'
import { siteConfig } from '@/config/site.config'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { FadeIn } from '@/components/motion/FadeIn'
import heroImg from '@/assets/hero.png'

export interface HeroSectionProps {
  data?: {
    badge: string
    headline: readonly [string, string, string]
    body: string
    cta: {
      primary:   { label: string; href: string }
      secondary: { label: string; href: string }
    }
    stats: ReadonlyArray<{ value: string; label: string }>
    visual?: string
  }
}

export function HeroSection({ data = siteConfig.hero }: HeroSectionProps) {
  const visual = data.visual ?? heroImg

  return (
    <section
      className="relative min-h-svh overflow-hidden flex items-center"
      aria-label="Hero"
    >
      {/* ── Background ──────────────────────────────────────────── */}
      <HeroBackground />

      {/* ── Content grid ────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-20 py-32 lg:py-0">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[55fr_45fr] lg:gap-16">

          {/* Left — copy */}
          <div className="flex flex-col gap-6 text-center lg:text-left">

            {/* Badge */}
            <FadeIn delay={0.2} direction="up" className="flex justify-center lg:justify-start">
              <Badge>{data.badge}</Badge>
            </FadeIn>

            {/* Headline */}
            <div className="flex flex-col gap-1">
              {data.headline.map((line, i) => {
                const isAccentLine = i === data.headline.length - 1
                return (
                  <FadeIn
                    key={line}
                    delay={0.35 + i * 0.15}
                    direction="up"
                  >
                    <h1
                      className={`font-display font-extrabold leading-none tracking-tight ${
                        isAccentLine ? 'text-brand-accent' : 'text-brand-white'
                      }`}
                      style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
                    >
                      {line}
                    </h1>
                  </FadeIn>
                )
              })}
            </div>

            {/* Body */}
            <FadeIn delay={0.8} direction="up">
              <p className="max-w-md text-body-lg text-brand-muted leading-relaxed mx-auto lg:mx-0">
                {data.body}
              </p>
            </FadeIn>

            {/* CTA row */}
            <FadeIn delay={1.0} direction="up" className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <Button variant="primary"  href={data.cta.primary.href}>
                {data.cta.primary.label}
              </Button>
              <Button variant="ghost" href={data.cta.secondary.href}>
                {data.cta.secondary.label}
              </Button>
            </FadeIn>

            {/* Stats row */}
            <FadeIn delay={1.2} direction="up" className="flex items-center justify-center lg:justify-start gap-6 pt-2">
              {data.stats.map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-6">
                  <StatItem value={stat.value} label={stat.label} />
                  {i < data.stats.length - 1 && (
                    <span
                      className="hidden sm:block h-8 w-px"
                      style={{ background: 'var(--color-brand-border-2)' }}
                      aria-hidden="true"
                    />
                  )}
                </div>
              ))}
            </FadeIn>
          </div>

          {/* Right — visual */}
          <FadeIn
            delay={0.4}
            direction="right"
            className="flex items-center justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow ring behind image */}
              <motion.div
                className="absolute inset-0 rounded-full blur-3xl -z-10"
                style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.45) 0%, transparent 70%)' }}
                animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0.85, 0.6] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden="true"
              />

              {/* Floating hero image */}
              <motion.img
                src={visual}
                alt="3D visual representing TruS's work"
                width={420}
                height={440}
                className="relative w-full max-w-sm md:max-w-md lg:max-w-lg drop-shadow-2xl select-none"
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                draggable={false}
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

// ─── StatItem ────────────────────────────────────────────────────────────────

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-display font-bold text-brand-white" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}>
        {value}
      </span>
      <span className="text-label font-body font-medium text-brand-subtle uppercase tracking-wider">
        {label}
      </span>
    </div>
  )
}

// ─── HeroBackground ──────────────────────────────────────────────────────────

function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10" aria-hidden="true">
      {/* Base */}
      <div className="absolute inset-0 bg-brand-bg" />

      {/* Purple radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 75% 65% at 68% 38%, rgba(124,58,237,0.28) 0%, rgba(124,58,237,0.07) 45%, transparent 70%)',
        }}
      />

      {/* Subtle grid lines */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Bottom fade-out */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{
          background: 'linear-gradient(to bottom, transparent, var(--color-brand-bg))',
        }}
      />
    </div>
  )
}

export default HeroSection
