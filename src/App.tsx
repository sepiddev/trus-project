import { useScroll, useTransform } from 'framer-motion'
import { Navbar }           from '@/components/layout/Navbar'
import { HeroSection }      from '@/components/sections/Hero'
import { AboutSection }     from '@/components/sections/AboutSection'
import { FloatingCrystalT } from '@/components/hero/FloatingCrystalT'

export default function App() {
  // Track raw document scroll position
  const { scrollY } = useScroll()

  // ── Scroll-linked MotionValues ────────────────────────────────────────────

  /**
   * Hero orbit system opacity.
   * Fades the orbit rings + static T from full visible → invisible
   * as the user scrolls into the hero content (creating the "T lifts off" effect).
   */
  const heroOrbitOpacity = useTransform(scrollY, [80, 520], [1, 0])

  /**
   * Normalised scroll progress fed to FloatingCrystalT.
   * 0 = T at Hero position, 1 = T arrived at About image area.
   */
  const floatingTProgress = useTransform(scrollY, [150, 1500], [0, 1])

  /**
   * About section image glow intensity.
   * Brightens the image card border as FloatingCrystalT fades out on arrival.
   */
  const imageGlowIntensity = useTransform(scrollY, [1100, 1500], [0, 1])

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
