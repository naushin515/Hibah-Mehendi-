import { cn } from '../../utils/helpers'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'sale' | 'new' | 'bestseller'
  className?: string
}

const variants = {
  default: 'bg-brand-100 text-brand-800 dark:bg-brand-900/50 dark:text-brand-200',
  sale: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300',
  new: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300',
  bestseller: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold', variants[variant], className)}>
      {children}
    </span>
  )
}
