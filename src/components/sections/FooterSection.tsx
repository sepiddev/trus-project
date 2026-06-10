/**
 * FooterSection — static, no animation dependencies.
 *
 * Layout hierarchy (top → bottom):
 *   1. Large TRUS background word  — block element, above columns
 *   2. 4-column content grid       — Logo | Main Pages | Legal | Contact Us
 *   3. Divider
 *   4. Bottom bar                  — copyright (dynamic year) + social links
 *
 * Typography:
 *   Column titles → DM Sans 700 (var(--font-hero))
 *   Everything else → Inter 400 (var(--font-body))
 *
 * TRUS sizing:
 *   font-size: clamp(130px, 20.2vw, 292px)
 *   At 1440 px viewport → fontSize ≈ 291 px → TRUS word ≈ 895 px wide
 *   Controlled by `fontSize` on the <span> inside #footer-trus-block
 *
 * T journey: fully removed — no imports, refs, state, effects, or timers.
 *   Will be redesigned from scratch in a future iteration.
 */

import { siteConfig } from '@/config/site.config'
import trusLogo       from '@/assets/logo.png'

// ─── Shared style tokens ──────────────────────────────────────────────────────

/** DM Sans Bold — used for all column section titles */
const titleStyle: React.CSSProperties = {
  fontFamily:    'var(--font-hero)',   // DM Sans
  fontSize:      '14px',
  fontWeight:    700,
  color:         '#FFFFFF',
  letterSpacing: '0.09em',
  textTransform: 'uppercase' as const,
  lineHeight:    '100%',
  margin:        '0 0 24px 0',
}

/** Inter Regular — used for all body-level text in the footer */
const bodyStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',  // Inter
  fontWeight: 400,
  lineHeight: '100%',
}

// ─── FooterLink ───────────────────────────────────────────────────────────────
/** Underline sweeps left → right on hover — same pattern as Navbar NavLink. */
function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="group relative inline-block"
      style={{
        ...bodyStyle,
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
  const { footer } = siteConfig

  return (
    <footer id="footer" style={{ background: '#07070D' }}>

      {/* ── 1. Large TRUS background word ──────────────────────────────────
          Block element in document flow — NOT position:absolute.
          Sits visually above the 4-column content grid.

          ▸ TRUS vertical position   → paddingTop / paddingBottom on this div
          ▸ TRUS width / font-size   → fontSize on the inner <span>
            clamp(130px, 20.2vw, 292px) targets ≈ 895 px at 1440 px viewport.
          ▸ TRUS opacity             → opacity on the inner <span>               */}
      <div
        id="footer-trus-block"
        aria-hidden="true"
        style={{
          paddingTop:    '44px',
          paddingBottom: '36px',
          textAlign:     'center',
          userSelect:    'none',
          pointerEvents: 'none',
          overflow:      'hidden',
        }}
      >
        <span
          style={{
            display:       'block',
            fontFamily:    'var(--font-display)',              // Syne 900
            fontSize:      'clamp(130px, 20.2vw, 292px)',     // ≈ 895 px wide @ 1440 px
            fontWeight:    900,
            color:         '#FFFFFF',
            opacity:       0.12,
            letterSpacing: '-0.01em',
            lineHeight:    1,
            whiteSpace:    'nowrap',
          }}
        >
          TRUS
        </span>
      </div>

      {/* ── 2. Footer content ───────────────────────────────────────────── */}
      <div
        className="mx-auto w-full max-w-[1200px] px-5"
        style={{ paddingBottom: '60px' }}
      >

        {/* 4-column grid: Logo | Main Pages | Legal | Contact Us */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1.5fr_1fr_1.5fr] gap-12">

          {/* Logo + tagline */}
          <div>
            <img
              src={trusLogo}
              alt="TruS"
              style={{ height: '44px', width: 'auto', display: 'block', marginBottom: '20px' }}
            />
            <p style={{
              ...bodyStyle,
              fontSize:  '14px',
              color:     'rgba(255,255,255,0.55)',
              maxWidth:  '220px',
              margin:    0,
            }}>
              {footer.tagline}
            </p>
          </div>

          {/* Main Pages */}
          <div>
            <h4 style={titleStyle}>Main Pages</h4>
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
            <h4 style={titleStyle}>Legal</h4>
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
            <h4 style={titleStyle}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href={`tel:${footer.contact.phone}`}
                style={{
                  ...bodyStyle,
                  fontSize:       '14px',
                  color:          'rgba(255,255,255,0.70)',
                  textDecoration: 'none',
                }}
              >
                {footer.contact.phone}
              </a>
              <p style={{
                ...bodyStyle,
                fontSize:   '14px',
                color:      'rgba(255,255,255,0.70)',
                margin:     0,
                whiteSpace: 'pre-line',
              }}>
                {footer.contact.address}
              </p>
            </div>
          </div>

        </div>

        {/* ── 3. Divider ──────────────────────────────────────────────────── */}
        <hr style={{ border: 'none', borderTop: '1px solid #FFFFFF4D', margin: '48px 0 32px' }} />

        {/* ── 4. Bottom bar ───────────────────────────────────────────────── */}
        <div style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          flexWrap:       'wrap',
          gap:            '16px',
        }}>
          {/* Copyright — year is dynamic, never hardcoded */}
          <p style={{
            ...bodyStyle,
            fontSize: '14px',
            color:    'rgba(255,255,255,0.40)',
            margin:   0,
          }}>
            © {new Date().getFullYear()} TruS. All rights reserved.
          </p>

          {/* Social links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {footer.socials.map(social => (
              <a
                key={social.label}
                href={social.href}
                style={{
                  ...bodyStyle,
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
