import { useState, useEffect } from 'react'
import { siteConfig } from '@/config/site.config'
import { FadeIn } from '@/components/motion/FadeIn'
import { TeamMemberCard, type CardState } from '@/components/team/TeamMemberCard'
import { TeamInfoPanel } from '@/components/team/TeamInfoPanel'

// ── Type helpers ──────────────────────────────────────────────────────────────
type Member = (typeof siteConfig.team.members)[number]

export function TeamSection() {
  const { eyebrow, heading, members } = siteConfig.team

  // ── Interaction state ─────────────────────────────────────────────────────────
  // hoveredId = null on desktop when no card is hovered → defaults to members[0]
  // On mobile: click to select a member (click same to deselect)
  const [hoveredId,  setHoveredId]  = useState<string | null>(null)
  const [isDesktop,  setIsDesktop]  = useState(false)
  const [mobileId,   setMobileId]   = useState<string | null>(null)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Active member: hovered (desktop) → mobile selected → first member default
  const activeId     = hoveredId ?? mobileId ?? members[0].id
  const activeMember = (members.find((m) => m.id === activeId) ?? members[0]) as Member

  // ── Card state helper ─────────────────────────────────────────────────────────
  function cardState(id: string): CardState {
    if (hoveredId === id)                               return 'hovered'
    if (hoveredId !== null)                             return 'dim'
    if (mobileId === id)                                return 'active'
    if (mobileId === null && id === members[0].id)      return 'active'
    return 'idle'
  }

  function handleMobileClick(id: string) {
    setMobileId((prev) => (prev === id ? null : id))
  }

  // ── Shared card bindings ──────────────────────────────────────────────────────
  const cardProps = (m: Member) => ({
    image:        m.image,
    name:         m.name,
    state:        cardState(m.id),
    onMouseEnter: () => setHoveredId(m.id),
    onMouseLeave: () => setHoveredId(null),
    onClick:      () => handleMobileClick(m.id),
  })

  // ── Desktop layout ────────────────────────────────────────────────────────────
  const desktopLayout = (
    <div
      style={{
        display:    'flex',
        gap:        '40px',
        alignItems: 'flex-start',
      }}
    >
      {/* LEFT — eyebrow + heading */}
      <div style={{ width: '360px', flexShrink: 0, paddingTop: '6px' }}>
        <FadeIn direction="up" delay={0.08}>
          <p
            style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '14px',
              fontWeight:    400,
              lineHeight:    '20px',
              color:         '#9F7EE1',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              margin:        '0 0 14px 0',
            }}
          >
            {eyebrow}
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.18}>
          <h2
            style={{
              fontFamily: 'var(--font-hero)',
              fontSize:   '32px',
              fontWeight: 700,
              lineHeight: 1.15,
              color:      '#FFFFFF',
              margin:     0,
              whiteSpace: 'pre-line',
            }}
          >
            {heading.join('\n')}
          </h2>
        </FadeIn>
      </div>

      {/* RIGHT — two rows of cards + info panel */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Row 1: card[0] + card[1] */}
        <FadeIn direction="up" delay={0.28}>
          <div style={{ display: 'flex', gap: '20px' }}>
            <TeamMemberCard {...cardProps(members[0])} style={{ flex: 1, height: 318 }} />
            <TeamMemberCard {...cardProps(members[1])} style={{ flex: 1, height: 318 }} />
          </div>
        </FadeIn>

        {/* Row 2: card[2] + card[3] + info panel */}
        <FadeIn direction="up" delay={0.38}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'stretch' }}>
            <TeamMemberCard {...cardProps(members[2])} style={{ width: 255, height: 275 }} />
            <TeamMemberCard {...cardProps(members[3])} style={{ width: 255, height: 275 }} />

            {/* Info panel fills remaining width */}
            <div style={{ flex: 1, minHeight: 275 }}>
              <TeamInfoPanel member={activeMember} />
            </div>
          </div>
        </FadeIn>

      </div>
    </div>
  )

  // ── Mobile layout ─────────────────────────────────────────────────────────────
  const mobileLayout = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Eyebrow + heading */}
      <div>
        <FadeIn direction="up" delay={0.08}>
          <p
            style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '13px',
              fontWeight:    400,
              color:         '#9F7EE1',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              margin:        '0 0 12px 0',
            }}
          >
            {eyebrow}
          </p>
        </FadeIn>
        <FadeIn direction="up" delay={0.16}>
          <h2
            style={{
              fontFamily: 'var(--font-hero)',
              fontSize:   '28px',
              fontWeight: 700,
              lineHeight: 1.2,
              color:      '#FFFFFF',
              margin:     0,
              whiteSpace: 'pre-line',
            }}
          >
            {heading.join('\n')}
          </h2>
        </FadeIn>
      </div>

      {/* Horizontal scroll card row */}
      <FadeIn direction="up" delay={0.26}>
        <div
          style={{
            display:         'flex',
            gap:             '14px',
            overflowX:       'auto',
            scrollbarWidth:  'none',
            WebkitOverflowScrolling: 'touch',
            paddingBottom:   '4px',
          }}
        >
          {members.map((m) => (
            <TeamMemberCard
              key={m.id}
              {...cardProps(m)}
              style={{ width: 220, height: 260, flexShrink: 0 }}
            />
          ))}
        </div>
      </FadeIn>

      {/* Info panel below cards */}
      <FadeIn direction="up" delay={0.36}>
        <div
          style={{
            background:   'rgba(255,255,255,0.04)',
            borderRadius: 16,
            padding:      '24px',
            border:       '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <TeamInfoPanel member={activeMember} />
        </div>
      </FadeIn>
    </div>
  )

  return (
    <section
      id="team"
      aria-label="Meet Our Team"
      style={{
        background:    'var(--color-brand-bg)',
        position:      'relative',
        overflow:      'hidden',
        paddingTop:    '120px',
        paddingBottom: '120px',
      }}
    >
      {/* ── Purple radial glow ── */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          top:           '40%',
          left:          '55%',
          transform:     'translate(-50%, -50%)',
          width:         '860px',
          height:        '480px',
          background:    'radial-gradient(ellipse at center, rgba(124,58,237,0.09) 0%, transparent 72%)',
          pointerEvents: 'none',
          zIndex:        0,
        }}
      />

      {/* ── Dark Crystal T watermark — bottom-right ── */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          bottom:        '-8%',
          right:         '-2%',
          fontSize:      'clamp(200px, 26vw, 380px)',
          fontFamily:    'var(--font-hero)',
          fontWeight:    700,
          color:         'rgba(135, 93, 217, 0.028)',
          lineHeight:    1,
          userSelect:    'none',
          pointerEvents: 'none',
          zIndex:        0,
        }}
      >
        T
      </div>

      {/* ── Content container ── */}
      <div
        className="relative mx-auto w-full"
        style={{ maxWidth: '1200px', padding: '0 20px', zIndex: 1 }}
      >
        {isDesktop ? desktopLayout : mobileLayout}
      </div>
    </section>
  )
}

export default TeamSection
