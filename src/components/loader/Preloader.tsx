import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePageLoaded } from '@/hooks/usePageLoaded'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { EASE_PREMIUM } from '@/motion/variants'

/**
 * Full-screen initial preloader.
 *
 * Renders a violet gradient backdrop with an outline-only "TRUS" wordmark.
 * A bright white stroke-dash glows and travels along the letter contours —
 * giving the impression of light scanning *through* the outline while the
 * letters themselves stay fixed. Fades out smoothly once the page has loaded.
 *
 * Self-contained: tracks its own load state and locks body scroll while
 * visible, so mounting it once near the app root is all that's required.
 */
export function Preloader() {
  const loaded         = usePageLoaded()
  const reducedMotion  = useReducedMotion()

  // Lock scroll while the loader covers the page.
  useEffect(() => {
    if (loaded) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [loaded])

  return (
    <AnimatePresence>
      {!loaded && (
        <motion.div
          key="trus-preloader"
          role="status"
          aria-live="polite"
          aria-label="Loading TruS ecosystem"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          style={{
            position:       'fixed',
            inset:          0,
            zIndex:         9999,
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            justifyContent: 'center',
            // Violet gradient: radial bloom for depth over a diagonal base.
            background: [
              'radial-gradient(ellipse 90% 75% at 50% 42%, rgba(130,95,220,0.45) 0%, rgba(60,40,130,0) 62%)',
              'linear-gradient(158deg, #3c2b88 0%, #2c2068 55%, #221a52 100%)',
            ].join(', '),
          }}
        >
          <TrusOutline reducedMotion={reducedMotion} />

          <span
            style={{
              position:      'absolute',
              bottom:        'clamp(20px, 5vh, 40px)',
              left:          0,
              right:         0,
              textAlign:     'center',
              fontFamily:    'var(--font-body)',
              fontSize:      'var(--text-label)',
              fontWeight:    500,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.55)',
            }}
          >
            Loading Ecosystem
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Outline wordmark with traveling stroke glow ──────────────────────────────

/**
 * Outlined letters are stroked with NO fill, so every glyph contour is drawn.
 * Modern Google Fonts (DM Sans, Inter, Syne) build the "R" leg as a separate
 * contour overlapping the bowl — harmless when filled, but stroke-only exposes
 * the overlap as a stray diagonal line through the leg. Arial / Helvetica use
 * merged, non-overlapping contours, so the R reads clean. Keep this stack on
 * any stroke-only TRUS lettering; do NOT swap it back to --font-hero.
 */
const OUTLINE_FONT = "Arial, 'Helvetica Neue', Helvetica, sans-serif"

function TrusOutline({ reducedMotion }: { reducedMotion: boolean }) {
  const SHARED = {
    x:                600,
    y:                182,
    textAnchor:       'middle'  as const,
    dominantBaseline: 'central' as const,
    fontFamily:       OUTLINE_FONT,
    fontWeight:       700,
    fontSize:         230,
    letterSpacing:    '6',
    fill:             'none',
  }

  return (
    <svg
      viewBox="0 0 1200 360"
      role="img"
      aria-hidden="true"
      style={{ width: 'min(82vw, 760px)', height: 'auto', overflow: 'visible' }}
    >
      <defs>
        {/* Soft bloom around the traveling stroke. */}
        <filter id="trus-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Base: faint full outline, always visible. */}
      <text {...SHARED} stroke="rgba(255,255,255,0.22)" strokeWidth={1.5}>
        TRUS
      </text>

      {/* Traveling glow: bright dashes that scan along the letter contours.
          `strokeDasharray` repeats around each glyph; animating the offset by
          exactly one dash period gives a seamless loop. */}
      <motion.text
        {...SHARED}
        stroke="#ffffff"
        strokeWidth={2}
        strokeLinecap="round"
        filter="url(#trus-glow)"
        strokeDasharray="55 360"
        initial={false}
        animate={reducedMotion ? { strokeDashoffset: 0, opacity: 0.5 } : { strokeDashoffset: [415, 0] }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : { duration: 3, repeat: Infinity, ease: 'linear' }
        }
      >
        TRUS
      </motion.text>
    </svg>
  )
}

export default Preloader
