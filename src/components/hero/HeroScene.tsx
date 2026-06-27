import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '@/config/site.config'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { serviceIcon } from '@/components/hero/serviceIcons'
import { HeroCoreT } from '@/components/hero/HeroCoreT'
import { HeroServiceCard } from '@/components/hero/HeroServiceCard'

export interface HeroSceneProps {
  /** Card slots + base video — defaults to siteConfig.heroScene. */
  data?: typeof siteConfig.heroScene
  /** Fired once the base video is buffered enough to play through. */
  onReady?: () => void
}

/**
 * HeroScene — the right-column interactive map environment of the Hero.
 *
 * Fills its column (no viewport bleed, stays inside the container). Two layers:
 *
 *   1. VIDEO  — the map, in a clipped (overflow-hidden) layer. `object-fit:
 *               cover` + a slight zoom crops the source video's empty side
 *               margins so the continents fill the frame; `mix-blend-mode:
 *               screen` drops the black background so only the map shows.
 *   2. OVERLAY — the glowing T core (centre, static) + glass service cards
 *               flanking it, in an overflow-visible layer so card glows and the
 *               T halo are never clipped.
 *
 * Sizing uses container-query units (`cqw`) against the frame, so the T and
 * cards scale proportionally with the column at every breakpoint.
 *
 * `pointer-events: none` so it never intercepts clicks meant for the copy/CTAs.
 */
export function HeroScene({ data = siteConfig.heroScene, onReady }: HeroSceneProps) {
  const reduced = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)

  // Reduce the number of nodes on narrower screens so the scene never crowds.
  const [maxCards, setMaxCards] = useState(6)
  useEffect(() => {
    const update = () => setMaxCards(window.innerWidth >= 1280 ? 6 : 4)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Signal readiness once buffered enough to play through, so the loader hands
  // off to a live map. Guards: warm-cache check, `error` fallback so a failed
  // video never blocks the loader, and a `canplay` grace for slow browsers.
  useEffect(() => {
    const video = videoRef.current
    if (!video || !onReady) return

    let settled = false
    let graceTimer: number | undefined
    const settle = () => {
      if (settled) return
      settled = true
      window.clearTimeout(graceTimer)
      onReady()
    }

    if (video.readyState >= 4) {
      settle()
      return
    }

    const onCanPlay = () => { graceTimer = window.setTimeout(settle, 2500) }

    video.addEventListener('canplaythrough', settle)
    video.addEventListener('canplay', onCanPlay)
    video.addEventListener('error', settle)
    return () => {
      window.clearTimeout(graceTimer)
      video.removeEventListener('canplaythrough', settle)
      video.removeEventListener('canplay', onCanPlay)
      video.removeEventListener('error', settle)
    }
  }, [onReady])

  const cards = [...data.cards]
    .sort((a, b) => a.priority - b.priority)
    .slice(0, maxCards)

  return (
    <div style={{ position: 'relative', width: '100%', pointerEvents: 'none' }}>
      {/* ── Frame: defines the coordinate space + cqw container for overlays ── */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '12 / 10',
          containerType: 'inline-size',
        }}
      >
        {/* 1 — Map video, clipped + cropped to fill the frame */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 1 }}>
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              transform: 'scale(1.22)',
              display: 'block',
              mixBlendMode: 'screen',
            }}
          >
            <source src={data.video} type="video/webm" />
          </video>
        </div>

        {/* 2 — Overlay (T core + service cards), overflow-visible */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '18cqw',
            }}
          >
            <HeroCoreT />
          </div>

          {cards.map((card) => (
            <HeroServiceCard
              key={card.id}
              icon={serviceIcon(card.id)}
              title={card.title}
              x={card.x}
              y={card.y}
              reduced={reduced}
              initialDelay={card.delay}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HeroScene
