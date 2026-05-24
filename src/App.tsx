import { useScroll, useTransform } from 'framer-motion'
import { Navbar }           from '@/components/layout/Navbar'
import { HeroSection }      from '@/components/sections/Hero'
import { AboutSection }     from '@/components/sections/AboutSection'
import { FloatingCrystalT } from '@/components/hero/FloatingCrystalT'

export default function App() {
  // scrollYProgress: 0 at top of page, 1 at bottom — adapts to any page height.
  // Previously used raw scrollY [150→1500] which exceeded max scroll (~788px),
  // so the T never actually faded and the glow never fired.
  const { scrollYProgress } = useScroll()

  // ── Scroll-linked MotionValues ────────────────────────────────────────────

  /**
   * Hero orbit system opacity.
   * Fades out in the first ~28% of total page scroll.
   * (line that controls hero orbit fade-out)
   */
  const heroOrbitOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0])

  /**
   * Normalised T journey progress: 0 = at Hero, 1 = arrived at About image.
   * Spans 5%→90% of total page scroll so it always completes before bottom.
   * (line that controls T scroll progress range)
   */
  const floatingTProgress = useTransform(scrollYProgress, [0.05, 0.90], [0, 1])

  /**
   * About section image glow intensity.
   * Derived from floatingTProgress so it is frame-perfectly synced:
   * rises 0→1 over the exact same window [0.72→1] that the T fades 1→0.
   * (line that controls when image border glow activates)
   */
  const imageGlowIntensity = useTransform(floatingTProgress, [0.72, 1], [0, 1])

  return (
    <div className="bg-brand-bg min-h-screen font-body antialiased">
      <Navbar />

      {/* Fixed crystal T that travels from Hero → About via scroll */}
      <FloatingCrystalT scrollProgress={floatingTProgress} />

      <HeroSection  orbitOpacity={heroOrbitOpacity} />
      <AboutSection imageGlowIntensity={imageGlowIntensity} />
    </div>
  )
}
