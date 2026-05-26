interface ProjectCardProps {
  name:     string
  category: string
  /** Accent colour used for the header stripe and label */
  accent:   string
  /** Card background colour */
  bg:       string
}

/**
 * Browser-mockup project preview card — 337×240 px.
 * Uses geometric blocks to simulate a website layout without needing real screenshots.
 */
export function ProjectCard({ name, category, accent, bg }: ProjectCardProps) {
  return (
    <div
      style={{
        width:        '337px',
        height:       '240px',
        borderRadius: '6.12px',
        overflow:     'hidden',
        background:   bg,
        flexShrink:   0,
        boxShadow:    '0 8px 32px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.4)',
        position:     'relative',
      }}
    >
      {/* Browser chrome bar */}
      <div
        style={{
          height:     '26px',
          background: '#1a1a1f',
          display:    'flex',
          alignItems: 'center',
          padding:    '0 10px',
          gap:        '5px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Traffic-light dots */}
        {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
          <span key={c} style={{ width: 7, height: 7, borderRadius: '50%', background: c, flexShrink: 0 }} />
        ))}
        {/* Fake URL bar */}
        <div
          style={{
            flex:         1,
            height:       14,
            borderRadius: 3,
            background:   'rgba(255,255,255,0.08)',
            margin:       '0 8px',
          }}
        />
      </div>

      {/* Simulated website content */}
      <div style={{ padding: '10px 12px', height: 'calc(100% - 26px)', position: 'relative' }}>
        {/* Header / hero stripe */}
        <div
          style={{
            height:       '40px',
            background:   accent,
            borderRadius: '3px',
            marginBottom: '8px',
            display:      'flex',
            alignItems:   'center',
            padding:      '0 10px',
            gap:          '6px',
          }}
        >
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'rgba(255,255,255,0.5)' }} />
          <div style={{ height: 8, width: '40%', borderRadius: 3, background: 'rgba(255,255,255,0.55)' }} />
        </div>

        {/* Content columns */}
        <div style={{ display: 'flex', gap: '7px', marginBottom: '7px' }}>
          {[0.45, 0.28, 0.27].map((w, i) => (
            <div
              key={i}
              style={{
                flex:         w,
                height:       '48px',
                borderRadius: '3px',
                background:   i === 0
                  ? `linear-gradient(135deg, ${accent}22 0%, ${accent}0a 100%)`
                  : 'rgba(255,255,255,0.05)',
                border:       i === 0 ? `1px solid ${accent}44` : '1px solid rgba(255,255,255,0.06)',
              }}
            />
          ))}
        </div>

        {/* Body rows */}
        <div style={{ display: 'flex', gap: '7px', marginBottom: '6px' }}>
          {[0.5, 0.5].map((w, i) => (
            <div
              key={i}
              style={{
                flex:         w,
                height:       '28px',
                borderRadius: '3px',
                background:   'rgba(255,255,255,0.04)',
                border:       '1px solid rgba(255,255,255,0.05)',
              }}
            />
          ))}
        </div>
        <div style={{ height: '14px', width: '65%', borderRadius: '3px', background: 'rgba(255,255,255,0.04)' }} />

        {/* Project name overlay — bottom */}
        <div
          style={{
            position:   'absolute',
            bottom:     '10px',
            left:       '12px',
            right:      '12px',
            padding:    '8px 10px',
            background: 'rgba(0,0,0,0.65)',
            borderRadius: '4px',
            backdropFilter: 'blur(4px)',
          }}
        >
          <div
            style={{
              fontSize:      '9px',
              color:         accent,
              fontWeight:    600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginBottom:  '2px',
              fontFamily:    'var(--font-body)',
            }}
          >
            {category}
          </div>
          <div
            style={{
              fontSize:   '13px',
              color:      '#ffffff',
              fontWeight: 700,
              fontFamily: 'var(--font-hero)',
              lineHeight: 1.2,
            }}
          >
            {name}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
