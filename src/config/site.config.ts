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
} as const

export type SiteConfig = typeof siteConfig
