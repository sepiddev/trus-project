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

  whyUs: {
    eyebrow: 'WHY US',
    headline: ['WHY THOUSANDS CHOOSE', 'OUR TEMPLATES'] as const,
    cards: [
      {
        number:      '01',
        title:       'Premium Design Quality',
        description: 'Every template is handcrafted with meticulous attention to detail — not auto-generated or recycled.',
      },
      {
        number:      '02',
        title:       'Built for Performance',
        description: 'Clean React code, zero bloat. Your site loads fast and scores well on every metric.',
      },
      {
        number:      '03',
        title:       'Fully Customisable',
        description: 'Comprehensive design tokens and config files make rebranding and adapting content trivial.',
      },
      {
        number:      '04',
        title:       'You Own Everything',
        description: 'Full source code ownership. No subscriptions, no lock-in, no hidden fees ever.',
      },
    ] as const,
  },

  templateCategories: {
    eyebrow:     'EXPLORE CATEGORIES',
    heading:     'TEMPLATE CATEGORIES',
    description: 'Choose from professionally designed templates for every need',
    seeMore:     { label: 'See More', href: '#' },
    categories:  ['Lawyers', 'Fitness', 'Real Estate', 'Clinics', 'Barbershops'] as const,
    templates: {
      Lawyers: [
        { id: 1,  name: 'LegalEdge Pro',   tag: 'Law Firm',         image: 'https://picsum.photos/seed/law1/900/600'  },
        { id: 2,  name: 'Justice Suite',   tag: 'Attorney',         image: 'https://picsum.photos/seed/law2/900/600'  },
        { id: 3,  name: 'Counsel Hub',     tag: 'Legal Services',   image: 'https://picsum.photos/seed/law3/900/600'  },
        { id: 4,  name: 'Verdict Studio',  tag: 'Corporate Law',    image: 'https://picsum.photos/seed/law4/900/600'  },
        { id: 5,  name: 'Lex Modern',      tag: 'Family Law',       image: 'https://picsum.photos/seed/law5/900/600'  },
        { id: 6,  name: 'Charter Law',     tag: 'Estate Planning',  image: 'https://picsum.photos/seed/law6/900/600'  },
        { id: 7,  name: 'Gavel & Co.',     tag: 'Criminal Defense', image: 'https://picsum.photos/seed/law7/900/600'  },
        { id: 8,  name: 'TrueCase',        tag: 'Litigation',       image: 'https://picsum.photos/seed/law8/900/600'  },
        { id: 9,  name: 'Advocate Plus',   tag: 'Immigration',      image: 'https://picsum.photos/seed/law9/900/600'  },
        { id: 10, name: 'Pinnacle Legal',  tag: 'Civil Rights',     image: 'https://picsum.photos/seed/law10/900/600' },
      ],
      Fitness: [
        { id: 1,  name: 'GymCore',         tag: 'Gym',              image: 'https://picsum.photos/seed/fit1/900/600'  },
        { id: 2,  name: 'FitPulse Studio', tag: 'Yoga',             image: 'https://picsum.photos/seed/fit2/900/600'  },
        { id: 3,  name: 'EliteBody Pro',   tag: 'Personal Training',image: 'https://picsum.photos/seed/fit3/900/600'  },
        { id: 4,  name: 'SweatBox',        tag: 'CrossFit',         image: 'https://picsum.photos/seed/fit4/900/600'  },
        { id: 5,  name: 'Zen Flow',        tag: 'Wellness',         image: 'https://picsum.photos/seed/fit5/900/600'  },
        { id: 6,  name: 'IronGrip',        tag: 'Powerlifting',     image: 'https://picsum.photos/seed/fit6/900/600'  },
        { id: 7,  name: 'Aqua Motion',     tag: 'Swimming',         image: 'https://picsum.photos/seed/fit7/900/600'  },
        { id: 8,  name: 'CycleFit',        tag: 'Cycling Studio',   image: 'https://picsum.photos/seed/fit8/900/600'  },
        { id: 9,  name: 'PilatesPlus',     tag: 'Pilates',          image: 'https://picsum.photos/seed/fit9/900/600'  },
        { id: 10, name: 'Marathon Hub',    tag: 'Running Club',     image: 'https://picsum.photos/seed/fit10/900/600' },
      ],
      'Real Estate': [
        { id: 1,  name: 'Domaine',         tag: 'Luxury Homes',     image: 'https://picsum.photos/seed/re1/900/600'   },
        { id: 2,  name: 'PropVault',       tag: 'Property Sales',   image: 'https://picsum.photos/seed/re2/900/600'   },
        { id: 3,  name: 'Urbanest',        tag: 'Urban Living',     image: 'https://picsum.photos/seed/re3/900/600'   },
        { id: 4,  name: 'CasaElite',       tag: 'Villa Rentals',    image: 'https://picsum.photos/seed/re4/900/600'   },
        { id: 5,  name: 'HorizonHomes',    tag: 'New Developments', image: 'https://picsum.photos/seed/re5/900/600'   },
        { id: 6,  name: 'LandMark Pro',    tag: 'Commercial',       image: 'https://picsum.photos/seed/re6/900/600'   },
        { id: 7,  name: 'NestFinder',      tag: 'Apartments',       image: 'https://picsum.photos/seed/re7/900/600'   },
        { id: 8,  name: 'Terra Realty',    tag: 'Land Sales',       image: 'https://picsum.photos/seed/re8/900/600'   },
        { id: 9,  name: 'PrimeSpace',      tag: 'Office Space',     image: 'https://picsum.photos/seed/re9/900/600'   },
        { id: 10, name: 'KeyStone',        tag: 'Investment',       image: 'https://picsum.photos/seed/re10/900/600'  },
      ],
      Clinics: [
        { id: 1,  name: 'MediCore',        tag: 'General Practice', image: 'https://picsum.photos/seed/cl1/900/600'   },
        { id: 2,  name: 'DentaPlus',       tag: 'Dental Clinic',    image: 'https://picsum.photos/seed/cl2/900/600'   },
        { id: 3,  name: 'VisionCare',      tag: 'Eye Clinic',       image: 'https://picsum.photos/seed/cl3/900/600'   },
        { id: 4,  name: 'SkinGlow',        tag: 'Dermatology',      image: 'https://picsum.photos/seed/cl4/900/600'   },
        { id: 5,  name: 'OrthoFit',        tag: 'Orthopedics',      image: 'https://picsum.photos/seed/cl5/900/600'   },
        { id: 6,  name: 'PediaCare',       tag: 'Pediatrics',       image: 'https://picsum.photos/seed/cl6/900/600'   },
        { id: 7,  name: 'MindSpace',       tag: 'Mental Health',    image: 'https://picsum.photos/seed/cl7/900/600'   },
        { id: 8,  name: 'CardioVita',      tag: 'Cardiology',       image: 'https://picsum.photos/seed/cl8/900/600'   },
        { id: 9,  name: 'NutriMed',        tag: 'Nutrition',        image: 'https://picsum.photos/seed/cl9/900/600'   },
        { id: 10, name: 'PhysioMove',      tag: 'Physiotherapy',    image: 'https://picsum.photos/seed/cl10/900/600'  },
      ],
      Barbershops: [
        { id: 1,  name: 'BladeCraft',      tag: 'Classic Barber',   image: 'https://picsum.photos/seed/bar1/900/600'  },
        { id: 2,  name: 'Sharp & Co.',     tag: 'Luxury Grooming',  image: 'https://picsum.photos/seed/bar2/900/600'  },
        { id: 3,  name: 'FadeKing',        tag: 'Urban Barber',     image: 'https://picsum.photos/seed/bar3/900/600'  },
        { id: 4,  name: 'The Clipped',     tag: 'Vintage Style',    image: 'https://picsum.photos/seed/bar4/900/600'  },
        { id: 5,  name: 'RazorEdge',       tag: "Men's Grooming",   image: 'https://picsum.photos/seed/bar5/900/600'  },
        { id: 6,  name: 'BarberHaus',      tag: 'Premium Cuts',     image: 'https://picsum.photos/seed/bar6/900/600'  },
        { id: 7,  name: 'TrimMaster',      tag: 'Family Barber',    image: 'https://picsum.photos/seed/bar7/900/600'  },
        { id: 8,  name: 'CutCulture',      tag: 'Streetwear Style', image: 'https://picsum.photos/seed/bar8/900/600'  },
        { id: 9,  name: 'GentleMan',       tag: 'Beard Studio',     image: 'https://picsum.photos/seed/bar9/900/600'  },
        { id: 10, name: 'ScissorKings',    tag: 'Trend Cuts',       image: 'https://picsum.photos/seed/bar10/900/600' },
      ],
    } as const,
  },
} as const

export type SiteConfig = typeof siteConfig
