import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, useAnimation }           from 'framer-motion'
import { CrystalT }                                  from '@/components/hero/CrystalT'
import { siteConfig }                                from '@/config/site.config'
import trusLogo                                      from '@/assets/logo.png'

// How long the T takes to travel from entry to its slot in the TRUS word
const ARRIVE_DURATION = 3.0   // seconds

// Column heading style — reused across Main Pages, Legal, Contact Us
const columnTitleStyle: React.CSSProperties = {
  fontFamily:    'var(--font-body)',
  fontSize:      '13px',
  fontWeight:    600,
  color:         '#FFFFFF',
  letterSpacing: '0.09em',
  textTransform: 'uppercase' as const,
  margin:        '0 0 24px 0',
}

// ─── FooterLink ───────────────────────────────────────────────────────────────
// Underline sweeps left → right on hover — same pattern as Navbar NavLink.
function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="group relative inline-block"
      style={{
        fontFamily:     'var(--font-body)',
        fontSize:       '14px',
        color:          'rgba(255,255,255,0.65)',
        textDecoration: 'none',
        transition:     'color 0.2s ease',
      }}
    >
      {label}
      <span
        className="absolute -bottom-0.5 left-0 h-px rounded-full w-0 group-hover:w-full transition-all duration-300"
        style={{ background: 'rgba(255,255,255,0.50)' }}
        aria-hidden="true"
      />
    </a>
  )
}

// ─── FooterSection ────────────────────────────────────────────────────────────
export function FooterSection() {
  const footerRef  = useRef<HTMLElement>(null)
  const tSlotRef   = useRef<HTMLSpanElement>(null)
  const controls   = useAnimation()
  const timers     = useRef<ReturnType<typeof setTimeout>[]>([])
  const prevInView = useRef(false)

  const [tActivated, setTActivated] = useState(false)

  // Fire when 20 % of the footer is visible — enough for TRUS text to be on screen
  const isInView = useInView(footerRef, { once: false, amount: 0.20 })

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }, [])

  useEffect(() => {
    const wasInView = prevInView.current
    prevInView.current = isInView

    if (!isInView) {
      if (wasInView) {
        clearTimers()
        setTActivated(false)           // dim TRUS again — journey resets
        controls.set({ opacity: 0 })  // hide T so re-entry looks fresh
      }
      return
    }
    if (wasInView) return  // still in view after a re-render

    clearTimers()

    const footer = footerRef.current
    const tSlot  = tSlotRef.current
    if (!footer || !tSlot) return

    const footerRect = footer.getBoundingClientRect()
    const tSlotRect  = tSlot.getBoundingClientRect()

    // Section-relative arrival coordinates (T locks exactly into the T glyph)
    const arrivalX     = tSlotRect.left  - footerRect.left
    const arrivalY     = tSlotRect.top   - footerRect.top
    // Scale so CrystalT fills the background T character's exact width
    const arrivalScale = tSlotRect.width / 380

    // Enter from off-screen left, matching the direction ContactT exited
    const entryX = -(380 + 100)
    const entryY = arrivalY

    controls.set({ x: entryX, y: entryY, scale: 0.34, opacity: 0 })
    controls.start({
      x:       [entryX,        arrivalX      ],
      y:       [entryY,        arrivalY      ],
      opacity: [0,             1             ],
      scale:   [0.34,          arrivalScale  ],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transition: { duration: ARRIVE_DURATION, ease: [0.16, 1, 0.3, 1] as any },
    })

    // Activate TRUS brightening the moment T locks into position
    const t1 = setTimeout(() => setTActivated(true), ARRIVE_DURATION * 1000)
    timers.current.push(t1)
  }, [isInView, clearTimers, controls])

  const { footer } = siteConfig

  return (
    <footer
      id="footer"
      ref={footerRef}
      style={{ position: 'relative', background: '#07070D', overflow: 'visible' }}
    >

      {/* ── Background TRUS word ─────────────────────────────────────────────
          Anchored to the TOP of the footer (not centered vertically) so it
          sits above the columns as a backdrop word.  The tSlotRef on the T
          character is what the animated Crystal T measures for its landing
          coordinates — do not remove it.
          ─ TRUS vertical position  → controlled by `top` on the outer div
          ─ TRUS size               → controlled by `fontSize` on motion.span
          ─ TRUS opacity states     → 0.04 resting / 0.10 after T arrives     */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          top:           '0px',
          left:          '50%',
          transform:     'translateX(-50%)',
          pointerEvents: 'none',
          zIndex:        0,
          userSelect:    'none',
          whiteSpace:    'nowrap',
        }}
      >
        <motion.span
          animate={{ opacity: tActivated ? 0.10 : 0.04 }}
          transition={{ duration: 2.5, ease: 'easeInOut' }}
          style={{
            display:       'block',
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(120px, 17vw, 240px)',
            fontWeight:    900,
            color:         '#FFFFFF',
            letterSpacing: '-0.02em',
            lineHeight:    1,
          }}
        >
          {/* ref on the T character only — arrivalX/Y/scale are measured from this */}
          <span ref={tSlotRef}>T</span>RUS
        </motion.span>
      </div>

      {/* ── Crystal T — absolutely scoped to this section ───────────────────
          Enters from off-screen left (same direction ContactT exited),
          travels to the T slot in the background TRUS word, and locks in.     */}
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

      {/* ── Footer content ───────────────────────────────────────────────── */}
      <div
        className="relative mx-auto w-full max-w-[1200px] px-5"
        style={{ paddingTop: '120px', paddingBottom: '60px', position: 'relative', zIndex: 2 }}
      >

        {/* 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1.5fr_1fr_1.5fr] gap-12">

          {/* Left — logo + tagline */}
          <div>
            <img
              src={trusLogo}
              alt="TruS"
              style={{ height: '44px', width: 'auto', display: 'block', marginBottom: '20px' }}
            />
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize:   '14px',
              lineHeight: '1.65',
              color:      'rgba(255,255,255,0.55)',
              maxWidth:   '220px',
              margin:     0,
            }}>
              {footer.tagline}
            </p>
          </div>

          {/* Main Pages */}
          <div>
            <h4 style={columnTitleStyle}>Main Pages</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {footer.mainPages.map(link => (
                <li key={link.label}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 style={columnTitleStyle}>Legal</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {footer.legal.map(link => (
                <li key={link.label}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 style={columnTitleStyle}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href={`tel:${footer.contact.phone}`}
                style={{
                  fontFamily:     'var(--font-body)',
                  fontSize:       '14px',
                  lineHeight:     '1.5',
                  color:          'rgba(255,255,255,0.70)',
                  textDecoration: 'none',
                }}
              >
                {footer.contact.phone}
              </a>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize:   '14px',
                lineHeight: '1.65',
                color:      'rgba(255,255,255,0.70)',
                margin:     0,
                whiteSpace: 'pre-line',
              }}>
                {footer.contact.address}
              </p>
            </div>
          </div>

        </div>

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid #FFFFFF4D', margin: '48px 0 32px' }} />

        {/* Bottom bar */}
        <div style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          flexWrap:       'wrap',
          gap:            '16px',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize:   '14px',
            color:      'rgba(255,255,255,0.40)',
            margin:     0,
          }}>
            © {new Date().getFullYear()} TruS. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {footer.socials.map(social => (
              <a
                key={social.label}
                href={social.href}
                style={{
                  fontFamily:     'var(--font-body)',
                  fontSize:       '14px',
                  color:          'rgba(255,255,255,0.55)',
                  textDecoration: 'none',
                  transition:     'color 0.2s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#FFFFFF' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.55)' }}
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}

export default FooterSection
