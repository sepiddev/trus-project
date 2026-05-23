import { motion } from 'framer-motion'
import { DURATION_SM, EASE_IN_OUT } from '@/motion/variants'

export type ButtonVariant = 'primary' | 'ghost' | 'outline-accent'

export interface ButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  'aria-label'?: string
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium font-body cursor-pointer transition-colors focus-visible:outline-none select-none'

const variants: Record<ButtonVariant, string> = {
  'primary':
    'bg-brand-accent text-white hover:bg-brand-accent-light',
  'ghost':
    'bg-transparent text-brand-white border border-brand-border-2 hover:bg-brand-surface',
  'outline-accent':
    'bg-transparent text-brand-accent border border-brand-accent hover:bg-[rgba(124,58,237,0.1)]',
}

export function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  className = '',
  'aria-label': ariaLabel,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap:   { scale: 0.97 },
    transition: { duration: DURATION_SM, ease: EASE_IN_OUT },
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...motionProps}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      aria-label={ariaLabel}
      {...motionProps}
    >
      {children}
    </motion.button>
  )
}

export default Button
