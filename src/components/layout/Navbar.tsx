import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { siteConfig } from '@/config/site.config'
import { Button } from '@/components/ui/Button'
import { EASE_PREMIUM, DURATION_MD, DURATION_SM } from '@/motion/variants'

export interface NavbarProps {
  data?: typeof siteConfig.nav
}

export function Navbar({ data = siteConfig.nav }: NavbarProps) {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: DURATION_MD, ease: EASE_PREMIUM, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-50"
        role="banner"
      >
        {/* Backdrop — fades in on scroll, border always present */}
        <motion.div
          className="absolute inset-0 border-b border-[rgba(255,255,255,0.18)]"
          animate={{
            backgroundColor: scrolled ? 'rgba(7, 7, 13, 0.92)' : 'rgba(0,0,0,0)',
            backdropFilter:  scrolled ? 'blur(20px)'            : 'blur(0px)',
          }}
          transition={{ duration: DURATION_SM, ease: EASE_PREMIUM }}
          aria-hidden="true"
        />

        <nav
          className="relative mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-5"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a
            href="/"
            className="font-display text-xl font-bold tracking-tight text-brand-white focus-visible:rounded shrink-0"
            aria-label={`${data.logo} — home`}
          >
            {data.logo}
          </a>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-[10px]" role="list">
            {data.links.map((link, i) => (
              <li key={link.label}>
                <NavLink href={link.href} label={link.label} active={i === 0} />
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center shrink-0">
            <Button
              variant="gradient"
              href={data.cta.href}
              className="h-[44px] w-[148px] text-[16px] font-medium"
            >
              {data.cta.label}
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden relative z-10 flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <HamburgerIcon open={mobileOpen} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-0 z-40 flex flex-col pt-20 px-6 pb-10"
            style={{ background: 'rgba(7, 7, 13, 0.97)', backdropFilter: 'blur(24px)' }}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: DURATION_MD, ease: EASE_PREMIUM }}
          >
            <ul className="flex flex-col gap-6 mt-8" role="list">
              {data.links.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: DURATION_MD, ease: EASE_PREMIUM }}
                >
                  <a
                    href={link.href}
                    className="text-display-sm font-display font-semibold text-brand-white hover:text-brand-accent-light transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto">
              <Button variant="gradient" href={data.cta.href} className="w-full justify-center">
                {data.cta.label}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── NavLink ─────────────────────────────────────────────────────────────────

function NavLink({ href, label, active = false }: { href: string; label: string; active?: boolean }) {
  return (
    <a
      href={href}
      className="group relative text-[15px] font-body font-normal text-brand-white hover:text-brand-accent-light transition-colors duration-200 px-[7px] py-[4px]"
      aria-current={active ? 'page' : undefined}
    >
      {label}
      {/* Underline: always visible when active, animated on hover otherwise */}
      <span
        className={[
          'absolute -bottom-0.5 left-[7px] h-px rounded-full transition-all duration-300',
          active
            ? 'w-[calc(100%-14px)]'
            : 'w-0 group-hover:w-[calc(100%-14px)]',
        ].join(' ')}
        style={{ background: 'var(--color-brand-accent)' }}
        aria-hidden="true"
      />
    </a>
  )
}

// ─── HamburgerIcon ───────────────────────────────────────────────────────────

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="flex flex-col gap-1.5 w-5" aria-hidden="true">
      <motion.span
        className="h-px w-full rounded-full bg-brand-white"
        animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
        transition={{ duration: DURATION_SM, ease: EASE_PREMIUM }}
      />
      <motion.span
        className="h-px w-full rounded-full bg-brand-white"
        animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
        transition={{ duration: DURATION_SM, ease: EASE_PREMIUM }}
      />
      <motion.span
        className="h-px w-full rounded-full bg-brand-white"
        animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
        transition={{ duration: DURATION_SM, ease: EASE_PREMIUM }}
      />
    </span>
  )
}

export default Navbar
