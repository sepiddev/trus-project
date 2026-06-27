import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'

export interface HeroServiceCardProps {
  icon: ReactNode
  title: string
  /** Centre position over the frame, as a percentage of the frame box. */
  x: number
  y: number
  /** When true the card stays present (no randomised cycle). */
  reduced?: boolean
  /** Initial delay (ms) before the card first powers on — spreads the stagger. */
  initialDelay?: number
}

// ── CRT power on/off variants ────────────────────────────────────────────────
// Smooth + slow: collapsed centre line → eases open vertically (gentle settle,
// no sharp overshoot). OFF collapses back into the centre line while fading.
const crt: Variants = {
  off: {
    opacity: 0,
    scaleY: 0.04,
    scaleX: 0.92,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
  },
  on: {
    opacity: 1,
    scaleY: [0.04, 1.015, 1],
    scaleX: [0.92, 1, 1],
    transition: {
      duration: 1.05,
      ease: [0.22, 1, 0.36, 1],
      opacity: { duration: 0.6 },
      times: [0, 0.78, 1],
    },
  },
}

// Soft scanline that glows as the card powers on, then fades (gentle, slow).
const scanline: Variants = {
  off: { opacity: 0, transition: { duration: 0.25 } },
  on: { opacity: [0.7, 0.7, 0], transition: { duration: 0.8, times: [0, 0.45, 1] } },
}

/** Random number in [min, max]. */
const rand = (min: number, max: number) => min + Math.random() * (max - min)

/**
 * HeroServiceCard — an ultra-light, Apple-style glass "service node" floating
 * over the map. Frosted but nearly transparent, very subtle blur, big rounded
 * corners; the icon sits directly inside the glass (no tile / no border). A soft
 * ambient glow dot pulses gently beneath it, synced to visibility.
 *
 * Powers on/off with a smooth, slow CRT split-open on a randomised cycle.
 * Sizing uses container-query units (`cqw`) so it scales with the scene.
 * Decorative (`pointer-events: none`).
 */
export function HeroServiceCard({
  icon,
  title,
  x,
  y,
  reduced = false,
  initialDelay = 0,
}: HeroServiceCardProps) {
  const [cycledOn, setCycledOn] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  // Reduced motion → always present; otherwise driven by the randomised cycle.
  const on = reduced || cycledOn

  useEffect(() => {
    if (reduced) return

    let alive = true
    const cycle = (next: boolean) => {
      if (!alive) return
      setCycledOn(next)
      // On lingers longer than off so cards mostly read as present.
      const wait = next ? rand(3200, 6000) : rand(1100, 2400)
      timer.current = window.setTimeout(() => cycle(!next), wait)
    }
    timer.current = window.setTimeout(() => cycle(true), initialDelay)

    return () => {
      alive = false
      window.clearTimeout(timer.current)
    }
  }, [reduced, initialDelay])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
        width: 'max-content',
        maxWidth: '38cqw',
        pointerEvents: 'none',
      }}
    >
      {/* ── Card body (ultra-light glass + CRT) ── */}
      <motion.div
        variants={crt}
        animate={on ? 'on' : 'off'}
        style={{
          position: 'relative',
          zIndex: 1,
          transformOrigin: 'center center',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5cqw',
          padding: '1.7cqw 2.4cqw',
          borderRadius: '2.6cqw',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.13)',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.16), 0 6px 18px rgba(0,0,0,0.22)',
          backdropFilter: 'blur(7px) saturate(135%)',
          WebkitBackdropFilter: 'blur(7px) saturate(135%)',
          willChange: 'transform, opacity',
        }}
      >
        {/* Icon — sits directly inside the glass (no tile, no border) */}
        <span
          style={{
            flexShrink: 0,
            width: '5cqw',
            height: '5cqw',
            minWidth: '20px',
            minHeight: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-brand-accent-light)',
            filter: 'drop-shadow(0 0 4px rgba(157,112,245,0.55))',
          }}
        >
          {icon}
        </span>

        {/* Title */}
        <span
          style={{
            fontFamily: 'var(--font-hero)',
            fontSize: '2.5cqw',
            fontWeight: 500,
            lineHeight: 1.15,
            color: 'var(--color-brand-white)',
          }}
        >
          {title}
        </span>

        {/* Soft CRT scanline on power-on */}
        <motion.div
          variants={scanline}
          animate={on ? 'on' : 'off'}
          style={{
            position: 'absolute',
            left: '8%',
            right: '8%',
            top: '50%',
            height: '1px',
            transform: 'translateY(-50%)',
            background:
              'linear-gradient(90deg, transparent, rgba(232,224,255,0.85) 50%, transparent)',
            pointerEvents: 'none',
          }}
        />
      </motion.div>

      {/* ── Soft ambient glow dot beneath the card (gentle pulse, synced) ── */}
      <motion.div
        style={{
          position: 'absolute',
          top: 'calc(100% + 1.6cqw)',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '4.5cqw',
          height: '4.5cqw',
          minWidth: '16px',
          minHeight: '16px',
          borderRadius: '999px',
          background:
            'radial-gradient(circle, rgba(157,112,245,0.5) 0%, rgba(135,93,217,0.18) 45%, transparent 72%)',
          filter: 'blur(4px)',
          willChange: 'opacity, transform',
        }}
        animate={
          reduced
            ? { opacity: on ? 0.55 : 0 }
            : on
              ? { opacity: [0.25, 0.55, 0.25], scale: [0.92, 1.08, 0.92] }
              : { opacity: 0 }
        }
        transition={
          on && !reduced
            ? { duration: 3.8, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.5 }
        }
      />
    </div>
  )
}

export default HeroServiceCard
