import type { ReactNode } from 'react'

/**
 * Compact line-icons for the Hero scene service cards, keyed by card id.
 *
 * 24×24 viewBox, `currentColor` stroke so the card controls colour. Stored as
 * raw JSX (a data map, not components) so the Hero scene owns its own assets and
 * stays template-portable.
 */

const svg = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  width: '100%',
  height: '100%',
}

/** Card id → icon element. */
export const SERVICE_ICONS: Record<string, ReactNode> = {
  'web-design': (
    <svg {...svg}>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <line x1="3" y1="8.5" x2="21" y2="8.5" />
      <circle cx="6" cy="6.25" r="0.6" fill="currentColor" stroke="none" />
      <line x1="6.5" y1="13" x2="11" y2="13" />
      <line x1="6.5" y1="15.5" x2="9" y2="15.5" />
      <line x1="9" y1="18" x2="15" y2="21" />
    </svg>
  ),
  'ai-lead-finder': (
    <svg {...svg}>
      <circle cx="10.5" cy="10.5" r="6" />
      <line x1="15" y1="15" x2="20.5" y2="20.5" />
      <circle cx="10.5" cy="8.5" r="1.8" />
      <path d="M7 14c0-1.9 1.6-3 3.5-3s3.5 1.1 3.5 3" />
    </svg>
  ),
  'ai-content-creator': (
    <svg {...svg}>
      <path d="M5 19l1-4L16 5l3 3L9 18l-4 1z" />
      <line x1="14" y1="7" x2="17" y2="10" />
      <path d="M18.5 3l.5 1.4 1.4.5-1.4.5-.5 1.4-.5-1.4-1.4-.5 1.4-.5.5-1.4z" fill="currentColor" stroke="none" />
    </svg>
  ),
  'ai-online-book': (
    <svg {...svg}>
      <path d="M12 6.5C10.5 5 8 4.5 4 5v13c4-.5 6.5 0 8 1.5 1.5-1.5 4-2 8-1.5V5c-4-.5-6.5 0-8 1.5z" />
      <line x1="12" y1="6.5" x2="12" y2="19.5" />
    </svg>
  ),
  'grow-ai': (
    <svg {...svg}>
      <polyline points="3,17 9,11 13,15 21,7" />
      <polyline points="15,7 21,7 21,13" />
    </svg>
  ),
  'ai-email-newsletter': (
    <svg {...svg}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <polyline points="3.5,6.5 12,13 20.5,6.5" />
    </svg>
  ),
}

export function serviceIcon(id: string): ReactNode {
  return SERVICE_ICONS[id] ?? SERVICE_ICONS['web-design']
}
