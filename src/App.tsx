import { useScroll, useTransform } from 'framer-motion'
import { Navbar }             from '@/components/layout/Navbar'
import { HeroSection }        from '@/components/sections/Hero'
import { AboutSection }       from '@/components/sections/AboutSection'
import { PortfolioSection }   from '@/components/sections/PortfolioSection'
import { FloatingCrystalT }   from '@/components/hero/FloatingCrystalT'

export default function App() {
  // scrollYProgress: 0 at top of page, 1 at bottom.
  //
  // Page height estimate (900px viewport):
  //   Hero        ~  900px  (100svh)
  //   About       ~  788px  (py-36 × 2 + 500px content)
  //   Portfolio   ~ 2700px  (300vh sticky container)
  //   ─────────────────────
  //   Total       ~ 4388px  →  max scroll ~ 3488px
  //
  // All scroll percentages below are calculated against this total.
  const { scrollYProgress } = useScroll()

  // ── Hero orbit opacity ────────────────────────────────────────────────────
  // Fades out in the first 28% of the Hero section.
  // 28% of 900px = 252px.  252 / 3488 ≈ 0.072.
  // (recalibrated from [0, 0.28] which assumed old 788px max-scroll)
  const heroOrbitOpacity = useTransform(scrollYProgress, [0, 0.072], [1, 0])

  // ── Floating T: Hero → About journey ─────────────────────────────────────
  // T starts at 5% into Hero  → scrollY=45px  → scrollYProgress=0.013
  // T arrives at About image  → scrollY≈800px → scrollYProgress=0.229
  //   (About image center at page-y≈1294px; appears at viewport centre when
  //    scrollY = 1294 − 26vh − 260px ≈ 800px — matches T's y offset)
  // (recalibrated from [0.05, 0.90] which assumed old 788px max-scroll)
  const floatingTProgress = useTransform(scrollYProgress, [0.013, 0.229], [0, 1])

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
    </div>
  )
}
