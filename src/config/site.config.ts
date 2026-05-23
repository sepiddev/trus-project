/**
 * Single source of truth for all user-facing content.
 * Swap this file (and /src/assets/) to rebrand for a new client.
 */
export const siteConfig = {
  name: 'TruS',
  tagline: 'Turning Ideas into Products',
  description:
    'TruS is a modern web development studio building premium, interactive, and scalable React websites with advanced motion design and full client ownership.',
  url: 'https://trus.dev',

  nav: {
    logo: 'TruS',
    links: [
      { label: 'About',     href: '#about' },
      { label: 'Portfolio', href: '#portfolio' },
      { label: 'Services',  href: '#services' },
      { label: 'Team',      href: '#team' },
      { label: 'Contact',   href: '#contact' },
    ],
    cta: { label: 'Get Started', href: '#contact' },
  },

  hero: {
    badge: 'Web Development Studio',
    headline: [
      'Turning Ideas',
      'into Products',
      'at TruS',
    ] as const,
    body: 'We build modern, highly interactive websites with advanced motion design and full client ownership — no platform lock-in, ever.',
    cta: {
      primary:   { label: 'Start a Project', href: '#contact' },
      secondary: { label: 'Explore Work',    href: '#portfolio' },
    },
    stats: [
      { value: '200+',   label: 'Projects Delivered' },
      { value: '4.8',    label: 'Client Rating' },
      { value: '1,200+', label: 'Happy Clients' },
    ],
  },
} as const

export type SiteConfig = typeof siteConfig
