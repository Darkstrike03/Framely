import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

export function Logo({ className, iconClassName = 'h-9 w-9', showText = true, textClassName }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <img
        src="/favicon.svg"
        alt=""
        width={36}
        height={36}
        className={cn('shrink-0 rounded-lg', iconClassName)}
        decoding="async"
      />
      {showText && (
        <span className={cn('font-display text-2xl font-bold text-primary', textClassName)}>Framely</span>
      )}
    </span>
  )
}

export function LogoLink({ to = '/', className, ...props }) {
  return (
    <Link to={to} className={cn('inline-flex items-center', className)} aria-label="Framely home" {...props}>
      <Logo />
    </Link>
  )
}
