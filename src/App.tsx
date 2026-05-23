import { Navbar }      from '@/components/layout/Navbar'
import { HeroSection } from '@/components/sections/Hero'

export default function App() {
  return (
    <div className="bg-brand-bg min-h-screen font-body antialiased">
      <Navbar />
      <HeroSection />
    </div>
  )
}
