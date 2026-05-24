import { motion, MotionValue } from 'framer-motion'
import {
  TrendingUp, Atom, Bot, Headphones,
  Sparkles, PenTool, Code2,
} from 'lucide-react'
import { siteConfig } from '@/config/site.config'
import { parseHeadline } from '@/utils/text'
import { Button } from '@/components/ui/Button'
import { FadeIn } from '@/components/motion/FadeIn'
import { BackgroundStars } from '@/components/hero/BackgroundStars'
import { CrystalT } from '@/components/hero/CrystalT'
import { OrbitBubble } from '@/components/hero/OrbitBubble'

export interface HeroSectionProps {
  data?: typeof siteConfig.hero
  /** Scroll-driven opacity for the orbit system — fades it out as T "lifts off". */
  orbitOpacity?: MotionValue<number>
}

// ─── Orbit-system dimensions ─────────────────────────────────────────────────
// T is 380×430 px; center it at (350, 300) inside a 700×600 canvas.
const OS_W = 700
const OS_H = 600
const T_CX = 350   // T visual center X inside orbit container
const T_CY = 300   // T visual center Y inside orbit container

/** Orbit ring — rotating SVG ellipse with glow */
function OrbitRing({
  rx, ry, tiltDeg, duration, reverse = false, opacity = 0.65,
}: {
  rx: number; ry: number; tiltDeg: number
  duration: number; reverse?: boolean; opacity?: number
}) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
      style={{ transformOrigin: `${T_CX}px ${T_CY}px` }}
    >
      <svg
        viewBox={`0 0 ${OS_W} ${OS_H}`}
        className="absolute inset-0 w-full h-full overflow-visible"
        style={{ opacity }}
      >
        {/* Wide blurred glow */}
        <ellipse
          cx={T_CX} cy={T_CY} rx={rx} ry={ry}
          fill="none"
          stroke="rgba(195,80,255,0.50)"
          strokeWidth="4"
          transform={`rotate(${tiltDeg},${T_CX},${T_CY})`}
          style={{ filter: 'blur(3px)' }}
        />
        {/* Sharp crisp line */}
        <ellipse
          cx={T_CX} cy={T_CY} rx={rx} ry={ry}
          fill="none"
          stroke="rgba(220,110,255,0.75)"
          strokeWidth="1"
          strokeDasharray="8 5"
          transform={`rotate(${tiltDeg},${T_CX},${T_CY})`}
        />
      </svg>
    </motion.div>
  )
}

/** Icon wrapper used inside each OrbitBubble */
function BubbleIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-white" style={{ filter: 'drop-shadow(0 0 6px rgba(210,130,255,0.9))' }}>
      {children}
    </span>
  )
}

// ─── Service bubbles ──────────────────────────────────────────────────────────
// Positions are (top%, left%) of the orbit-system container.
// Each bubble is offset by translate(-50%,-50%) so the disc centre sits on the coord.
const BUBBLES = [
  { label: 'SEO',     icon: <BubbleIcon><TrendingUp size={22} /></BubbleIcon>, top: '17%', left: '14%', delay: 0   },
  { label: 'REACT',   icon: <BubbleIcon><Atom       size={22} /></BubbleIcon>, top:  '2%', left: '77%', delay: 1   },
  { label: 'AGENT',   icon: <BubbleIcon><Bot        size={22} /></BubbleIcon>, top: '34%', left: '86%', delay: 2   },
  { label: 'ASSIST',  icon: <BubbleIcon><Headphones size={22} /></BubbleIcon>, top: '61%', left: '83%', delay: 3   },
  { label: 'AI',      icon: <BubbleIcon><Sparkles   size={22} /></BubbleIcon>, top: '76%', left: '68%', delay: 4   },
  { label: 'UI/UX',   icon: <BubbleIcon><PenTool    size={22} /></BubbleIcon>, top: '74%', left: '22%', delay: 5   },
  { label: 'WEB DEV', icon: <BubbleIcon><Code2      size={22} /></BubbleIcon>, top: '44%', left:  '4%', delay: 6   },
] as const

// ─── HeroSection ─────────────────────────────────────────────────────────────
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
                const segs = parseHeadline(line as string)
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
                              color: 'var(--color-brand-accent)',
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

            {/* CTAs — Why TruS left, Browse Templates right (matches reference) */}
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
              RIGHT COLUMN — Crystal T + orbit system
          ══════════════════════════════════════════════════════════════════ */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            style={{ opacity: orbitOpacity }}
          >
            <OrbitSystem />
          </motion.div>

        </div>
      </div>

      {/* ── Bottom label ── */}
      <BottomLabel badge={data.badge} prefix={data.badgePrefix} />
    </section>
  )
}

// ─── OrbitSystem ─────────────────────────────────────────────────────────────
function OrbitSystem() {
  // T is 380×430; position so its visual centre lands at (T_CX, T_CY)
  const tLeft = T_CX - 380 / 2  // 160
  const tTop  = T_CY - 430 / 2  // 85

  return (
    <div
      className="relative"
      style={{ width: `${OS_W}px`, height: `${OS_H}px`, overflow: 'visible' }}
    >
      {/* Orbit rings (behind T) */}
      <OrbitRing rx={330} ry={90}  tiltDeg={-18} duration={58} opacity={0.70} />
      <OrbitRing rx={258} ry={70}  tiltDeg={ 24} duration={42} reverse opacity={0.55} />
      <OrbitRing rx={195} ry={52}  tiltDeg={  5} duration={70} opacity={0.40} />

      {/* Crystal T */}
      <div
        className="absolute"
        style={{ left: tLeft, top: tTop, width: '380px' }}
      >
        <CrystalT />
      </div>

      {/* Service bubbles */}
      {BUBBLES.map((b) => (
        <OrbitBubble
          key={b.label}
          icon={b.icon}
          label={b.label}
          animDelay={b.delay}
          style={{
            top: b.top,
            left: b.left,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  )
}

// ─── CursorBlink ─────────────────────────────────────────────────────────────
function CursorBlink() {
  return (
    <motion.span
      className="inline-block align-middle rounded-[2px] ml-1"
      style={{
        width: '3px',
        height: '0.82em',
        background: 'var(--color-brand-accent)',
        boxShadow: '0 0 8px var(--color-brand-accent)',
      }}
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ duration: 1, repeat: Infinity, times: [0, 0.45, 0.5, 0.95], ease: 'linear' }}
      aria-hidden="true"
    />
  )
}

// ─── BottomLabel ─────────────────────────────────────────────────────────────
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
                inset: '-4px',
                background: 'radial-gradient(circle, rgba(255,60,60,0.55) 0%, transparent 70%)',
                filter: 'blur(3px)',
              }}
            />
            <span
              className="relative rounded-full"
              style={{ width: '9px', height: '9px', background: '#ff3333', boxShadow: '0 0 8px rgba(255,60,60,0.9), 0 0 16px rgba(255,60,60,0.5)' }}
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
