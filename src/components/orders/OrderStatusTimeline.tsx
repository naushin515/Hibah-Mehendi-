import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import type { OrderStatus } from '../../types'
import { cn } from '../../utils/helpers'

const steps: { key: OrderStatus; label: string }[] = [
  { key: 'placed', label: 'Order Placed' },
  { key: 'processing', label: 'Processing' },
  { key: 'packed', label: 'Packed' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'out_for_delivery', label: 'Out For Delivery' },
  { key: 'delivered', label: 'Delivered' },
]

const statusOrder: OrderStatus[] = steps.map((s) => s.key)

interface OrderStatusTimelineProps {
  currentStatus: OrderStatus
  vertical?: boolean
}

export default function OrderStatusTimeline({ currentStatus, vertical = false }: OrderStatusTimelineProps) {
  const currentIndex = statusOrder.indexOf(currentStatus)

  return (
    <div className={cn(vertical ? 'space-y-0' : 'flex items-start justify-between')}>
      {steps.map((step, i) => {
        const isComplete = i <= currentIndex
        const isCurrent = i === currentIndex

        if (vertical) {
          return (
            <div key={step.key} className="flex gap-4">
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm',
                    isComplete ? 'border-brand-600 bg-brand-600 text-white' : 'border-stone-300 bg-white dark:border-stone-600 dark:bg-stone-900',
                    isCurrent && 'ring-4 ring-brand-200 dark:ring-brand-800'
                  )}
                >
                  {isComplete && <Check className="h-4 w-4" />}
                </motion.div>
                {i < steps.length - 1 && (
                  <div className={cn('h-10 w-0.5', isComplete && i < currentIndex ? 'bg-brand-600' : 'bg-stone-200 dark:bg-stone-700')} />
                )}
              </div>
              <div className="pb-8 pt-1">
                <p className={cn('text-sm font-medium', isComplete ? 'text-brand-700 dark:text-brand-400' : 'text-stone-400')}>
                  {step.label}
                </p>
              </div>
            </div>
          )
        }

        return (
          <div key={step.key} className="flex flex-1 flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full border-2',
                isComplete ? 'border-brand-600 bg-brand-600 text-white' : 'border-stone-300 bg-white dark:border-stone-600 dark:bg-stone-900',
                isCurrent && 'ring-4 ring-brand-200 dark:ring-brand-800'
              )}
            >
              {isComplete && <Check className="h-4 w-4" />}
            </motion.div>
            <p className={cn('mt-2 text-xs font-medium', isComplete ? 'text-brand-700 dark:text-brand-400' : 'text-stone-400')}>
              {step.label}
            </p>
            {i < steps.length - 1 && (
              <div className={cn('absolute hidden h-0.5 md:block', isComplete && i < currentIndex ? 'bg-brand-600' : 'bg-stone-200')} style={{ width: `${100 / (steps.length - 1)}%` }} />
            )}
          </div>
        )
      })}
    </div>
  )
}
