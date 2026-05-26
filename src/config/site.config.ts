/**
 * Single source of truth for all user-facing content.
 * Swap this file (and /src/assets/) to rebrand for a new client.
 *
 * Accent convention: wrap any word in [brackets] to render it in the accent color.
 * Example: "at [TruS]" → "at " (white) + "TruS" (brand-accent, bold)
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
      { label: 'Home',      href: '#'          },
      { label: 'Services',  href: '#services'  },
      { label: 'Portfolio', href: '#portfolio' },
      { label: 'Templates', href: '#templates' },
      { label: 'Pricing',   href: '#pricing'   },
      { label: 'About',     href: '#about'     },
      { label: 'Contact',   href: '#contact'   },
    ],
    cta: { label: 'Get Started', href: '#contact' },
  },

  hero: {
    /** Displayed below CTAs as "We ◉ READY-MADE TEMPLATES" */
    badge:       'READY-MADE TEMPLATES',
    badgePrefix: 'We',
    /**
     * Headline lines. Use [word] to apply accent color + bold weight to that word.
     * The last line gets a blinking cursor appended.
     */
    headline: [
      'Turning Ideas',
      'into Products',
      'at [TruS]',
    ] as const,
    body: 'Carefully crafted templates designed to help you launch faster and grow smarter.',
    cta: {
      primary:   { label: 'Browse Templates', href: '#templates' },
      secondary: { label: 'Why TruS',         href: '#about'     },
    },
    stats: [
      { value: '200+',   label: 'Projects Delivered' },
      { value: '4.8',    label: 'Client Rating'      },
      { value: '1,200+', label: 'Happy Clients'      },
    ],
  },

  about: {
    eyebrow: 'ABOUT US',
    headline: ['Discover More', 'About [TruS]'] as const,
    body: [
      'TruS is a modern digital studio specialising in premium React websites, AI integrations, and advanced motion design. We turn ambitious ideas into polished, production-ready products.',
      'Every project we touch is built from scratch — no bloated page builders, no recycled themes. Just clean code, thoughtful UX, and meticulous attention to detail.',
      'From solo founders to growing companies, we help our clients stand out online with websites that are as fast as they are beautiful.',
    ] as const,
    stats: [
      { value: '250+',   label: 'Projects Delivered' },
      { value: '4.9',    label: 'Client Rating'      },
      { value: '1,000+', label: 'Happy Clients'      },
    ] as const,
    image: '/about-team.jpg',
  },

  portfolio: {
    eyebrow: 'PORTFOLIO',
    headline: 'EXPLORE OUR PROJECT',
    description: [
      'A selection of our recent work showcasing creativity,',
      'performance, and attention to detail.',
    ] as const,
    seeMore: { label: 'See More', href: '#' },
    projects: [
      { id: 1, name: 'Arquivo',   category: 'Corporate',  accent: '#e63946', bg: '#f1f3f5' },
      { id: 2, name: 'Avansi',    category: 'SaaS',       accent: '#4361ee', bg: '#0f172a' },
      { id: 3, name: 'Slingshot', category: 'Product',    accent: '#06d6a0', bg: '#0d1117' },
      { id: 4, name: 'Nexora',    category: 'E-Commerce', accent: '#9d4edd', bg: '#1a0a2e' },
      { id: 5, name: 'DataFlow',  category: 'Dashboard',  accent: '#f72585', bg: '#10002b' },
      { id: 6, name: 'TechVault', category: 'Web App',    accent: '#4cc9f0', bg: '#071520' },
      { id: 7, name: 'Orbis',     category: 'Portfolio',  accent: '#ff6b6b', bg: '#1c1c1c' },
      { id: 8, name: 'Luminary',  category: 'Agency',     accent: '#ffd166', bg: '#1a1a2e' },
    ] as const,
  },
} as const

export type SiteConfig = typeof siteConfig
