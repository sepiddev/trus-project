import { useScroll, useTransform } from 'framer-motion'
import { Navbar }             from '@/components/layout/Navbar'
import { HeroSection }        from '@/components/sections/Hero'
import { AboutSection }       from '@/components/sections/AboutSection'
import { PortfolioSection }   from '@/components/sections/PortfolioSection'
import { WhyUsSection }       from '@/components/sections/WhyUsSection'
import { FloatingCrystalT }   from '@/components/hero/FloatingCrystalT'

export default function App() {
  // Raw scrollY (pixels) rather than scrollYProgress (fraction) is used here
  // so that Hero → About animations fire at fixed pixel offsets and remain
  // correct regardless of how many sections are added below.
  //
  // Pixel anchors (900 px viewport, Hero = 100 svh = 900 px):
  //   Hero orbit fade  : 0 → 252 px  (28 % of 900 px Hero height)
  //   Floating T start : ~45 px       (T lifts off near top of Hero)
  //   Floating T end   : ~800 px      (T arrives at About image centre)
  //
  // WhyUsSection and PortfolioSection each own their scroll progress via
  // useScroll({ target: ref }) — they need no entries here.
  const { scrollY } = useScroll()

  // ── Hero orbit opacity ────────────────────────────────────────────────────
  // Fades the orbit rings + bubbles out as the T lifts off.
  const heroOrbitOpacity = useTransform(scrollY, [0, 252], [1, 0])

  // ── Floating T: Hero → About journey ─────────────────────────────────────
  // T lifts off at scrollY ≈ 45 px, arrives at About image at scrollY ≈ 800 px.
  // (About image centre ≈ page-y 1294 px; viewport-centre when scrollY ≈ 800 px)
  const floatingTProgress = useTransform(scrollY, [45, 800], [0, 1])

  // ── About image border glow ───────────────────────────────────────────────
  // Derived from floatingTProgress — frame-perfect sync with T fade-out.
  // [0.72 → 1] progress = T fading window; same window = glow brightens.
  const imageGlowIntensity = useTransform(floatingTProgress, [0.72, 1], [0, 1])

  return (
    <div className="bg-brand-bg min-h-screen font-body antialiased">
      <Navbar />

      {/* Fixed Crystal T — Hero → About phase */}
      <FloatingCrystalT scrollProgress={floatingTProgress} />

      <HeroSection      orbitOpacity={heroOrbitOpacity} />
      <AboutSection     imageGlowIntensity={imageGlowIntensity} />

      {/* Portfolio: self-contained sticky section.
          Renders its own PortfolioT (position:fixed) internally. */}
      <PortfolioSection />

      {/* Why Us: self-contained sticky section.
          Renders its own WhyUsT (position:fixed) internally. */}
      <WhyUsSection />
    </div>
  )
}
