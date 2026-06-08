import { forwardRef } from 'react'
import { motion } from 'framer-motion'

export interface ContactInfoCardProps {
  tagline: string
  cta:     string
  office:  string
  phone:   string
  email:   string
  isLit:   boolean
}

export const ContactInfoCard = forwardRef<HTMLDivElement, ContactInfoCardProps>(
  function ContactInfoCard({ tagline, cta, office, phone, email, isLit }, ref) {
    // tel: link derived dynamically from the displayed phone value — no hardcoded number
    const telHref = `tel:${phone.replace(/\s+/g, '')}`
    return (
      <div ref={ref} style={{ position: 'relative' }}>

        {/* Outer ambient glow — very subtle on white background */}
        <motion.div
          aria-hidden="true"
          animate={{ opacity: isLit ? 1 : 0 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          style={{
            position:      'absolute',
            inset:         '-18px',
            borderRadius:  '30px',
            background:    'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(91,43,185,0.09) 0%, transparent 72%)',
            filter:        'blur(18px)',
            pointerEvents: 'none',
          }}
        />

        {/* 1 px border wrapper */}
        <div
          style={{
            position:     'relative',
            padding:      '1px',
            borderRadius: '17px',
            overflow:     'hidden',
          }}
        >
          {/* Static inactive border — always present */}
          <div
            aria-hidden="true"
            style={{
              position:      'absolute',
              inset:         0,
              borderRadius:  '17px',
              background:    'rgba(0,0,0,0.10)',
              pointerEvents: 'none',
            }}
          />

          {/* Active gradient border — fades in when lit */}
          <motion.div
            aria-hidden="true"
            animate={{ opacity: isLit ? 1 : 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{
              position:      'absolute',
              inset:         0,
              background:    'linear-gradient(135deg, rgba(135,93,217,0.75) 0%, rgba(91,43,185,0.92) 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* Rotating sweep — bright white peak contrasts clearly against the purple base border */}
          <motion.div
            aria-hidden="true"
            animate={
              isLit
                ? { opacity: 1, rotate: [0, 360] }
                : { opacity: 0, rotate: 0 }
            }
            transition={
              isLit
                ? {
                    opacity: { duration: 0.8, ease: 'easeOut' },
                    rotate:  { duration: 5.5, repeat: Infinity, ease: 'linear' },
                  }
                : { opacity: { duration: 0.4 } }
            }
            style={{
              position:      'absolute',
              inset:         0,
              background:    'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.45) 8deg, rgba(255,255,255,0.92) 16deg, rgba(210,165,255,0.55) 28deg, transparent 44deg, transparent 360deg)',
              pointerEvents: 'none',
            }}
          />

          {/* Inner card */}
          <div
            style={{
              position:      'relative',
              zIndex:        2,
              borderRadius:  '16px',
              background:    '#FFFFFF',
              padding:       '32px 28px 28px',
              display:       'flex',
              flexDirection: 'column',
              minHeight:     '430px',
            }}
          >
            {/* Tagline */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
                fontSize:   '22px',
                lineHeight: '100%',
                color:      '#707075',
                margin:     '0 0 22px 0',
              }}
            >
              {tagline}
            </p>

            {/* Book a call CTA — tel: href built dynamically from the phone prop */}
            <a
              href={telHref}
              style={{
                display:        'inline-flex',
                alignItems:     'center',
                gap:            '10px',
                textDecoration: 'none',
                marginBottom:   'auto',
              }}
              onMouseEnter={(e) => {
                const btn = e.currentTarget.querySelector('span:last-child') as HTMLSpanElement | null
                if (btn) { btn.style.background = '#070606'; btn.style.borderColor = '#070606' }
                const arrow = e.currentTarget.querySelector('svg path') as SVGPathElement | null
                if (arrow) arrow.style.stroke = '#FFFFFF'
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget.querySelector('span:last-child') as HTMLSpanElement | null
                if (btn) { btn.style.background = 'transparent'; btn.style.borderColor = '#070606' }
                const arrow = e.currentTarget.querySelector('svg path') as SVGPathElement | null
                if (arrow) arrow.style.stroke = '#070606'
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-hero)',
                  fontWeight: 700,
                  fontSize:   '16px',
                  lineHeight: '100%',
                  color:      '#070606',
                }}
              >
                {cta}
              </span>
              <span
                style={{
                  display:         'flex',
                  alignItems:      'center',
                  justifyContent:  'center',
                  width:           '28px',
                  height:          '28px',
                  borderRadius:    '50%',
                  border:          '1.5px solid #070606',
                  background:      'transparent',
                  flexShrink:      0,
                  transition:      'background 0.2s, border-color 0.2s',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path
                    d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
                    stroke="#070606"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ transition: 'stroke 0.2s' }}
                  />
                </svg>
              </span>
            </a>

            {/* Spacer pushes contact info to bottom */}
            <div style={{ flexGrow: 1, minHeight: '60px' }} />

            {/* Contact info rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>

              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '14px', lineHeight: '100%', color: '#707075', margin: '0 0 6px 0' }}>
                  Office
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '14px', lineHeight: '100%', color: '#070606', margin: 0 }}>
                  {office}
                </p>
              </div>

              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '14px', lineHeight: '19px', color: '#707075', margin: '0 0 4px 0' }}>
                  Phone
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '14px', lineHeight: '19px', color: '#070606', margin: 0 }}>
                  {phone}
                </p>
              </div>

              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '14px', lineHeight: '100%', color: '#707075', margin: '0 0 6px 0' }}>
                  Email
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '14px', lineHeight: '19px', color: '#070606', margin: 0 }}>
                  {email}
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
)

export default ContactInfoCard
