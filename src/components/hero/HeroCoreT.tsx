import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * HeroCoreT — the pure neon-outline "T" energy core at the centre of the scene.
 *
 * Outline only: NO fill, NO body, NO glass, NO background shape, NO box. Just
 * the glowing stroke plus a light segment that continuously travels around it.
 * The interior is fully open, so the map reads straight through the T.
 *
 * Layers (all stroke-based):
 *   1. Soft outer glow stroke (neon bloom of the outline).
 *   2. Crisp neon edge stroke.
 *   3. Travelling light segment running around the outline.
 *
 * Static — the T itself never moves; only the outline light animates. Honours
 * prefers-reduced-motion. Decorative (`aria-hidden`).
 */

const W = 200
const H = 220
// Crossbar height = 56, stem width = 64 (centred at x 68–132).
const PATH = `M 0 0 L ${W} 0 L ${W} 56 L 132 56 L 132 ${H} L 68 ${H} L 68 56 L 0 56 Z`

export function HeroCoreT() {
  const reduced = useReducedMotion()

  return (
    <div className="select-none" style={{ width: '100%' }} aria-hidden="true">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
          overflow: 'visible',
          filter: [
            'drop-shadow(0 0 7px rgba(157,112,245,0.95))',
            'drop-shadow(0 0 20px rgba(135,93,217,0.6))',
            'drop-shadow(0 0 46px rgba(110,60,210,0.32))',
          ].join(' '),
        }}
      >
        <defs>
          <linearGradient id="ht-edge" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D9C6FF" />
            <stop offset="45%" stopColor="#9D70F5" />
            <stop offset="100%" stopColor="#7A4BE0" />
          </linearGradient>
        </defs>

        {/* 1 — Soft outer glow stroke (neon bloom) */}
        <path
          d={PATH}
          fill="none"
          stroke="rgba(157,112,245,0.5)"
          strokeWidth="6"
          strokeLinejoin="round"
          style={{ filter: 'blur(4px)' }}
        />

        {/* 2 — Crisp neon edge */}
        <path
          d={PATH}
          fill="none"
          stroke="url(#ht-edge)"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />

        {/* 3 — Travelling light segment around the outline */}
        <motion.path
          d={PATH}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.8"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="0.13 0.87"
          style={{ filter: 'drop-shadow(0 0 6px rgba(225,210,255,0.95))' }}
          initial={{ strokeDashoffset: 1 }}
          animate={reduced ? { strokeDashoffset: 1 } : { strokeDashoffset: [1, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        />
      </svg>
    </div>
  )
}

export default HeroCoreT
