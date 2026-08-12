import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import type { Testimonial } from '../../types'

interface TestimonialCardProps {
  testimonial: Testimonial
  index?: number
}

export default function TestimonialCard({ testimonial, index = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900"
    >
      <Quote className="mb-3 h-6 w-6 text-brand-300" />
      <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">&ldquo;{testimonial.content}&rdquo;</p>
      <div className="mt-4 flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`h-3.5 w-3.5 ${i < testimonial.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`} />
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3">
        <img src={testimonial.avatar} alt={testimonial.name} className="h-10 w-10 rounded-full object-cover" />
        <div>
          <p className="text-sm font-medium">{testimonial.name}</p>
          <p className="text-xs text-stone-500">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  )
}
