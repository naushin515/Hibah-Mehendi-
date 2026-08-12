import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { faqItems } from '../data/policies'
import { cn } from '../utils/helpers'

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="container-app py-12">
      <h1 className="font-display text-4xl font-bold">Frequently Asked Questions</h1>
      <p className="mt-2 text-stone-500">Find answers to common questions</p>

      <div className="mt-10 max-w-3xl space-y-3">
        {faqItems.map((item, i) => (
          <div key={i} className="rounded-2xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between p-4 text-left"
            >
              <span className="font-medium">{item.q}</span>
              <ChevronDown className={cn('h-4 w-4 shrink-0 transition-transform', open === i && 'rotate-180')} />
            </button>
            {open === i && (
              <div className="border-t border-stone-200 px-4 py-3 dark:border-stone-800">
                <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">{item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
