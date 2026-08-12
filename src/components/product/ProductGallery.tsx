import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ProductImage } from '../../types'
import { cn } from '../../utils/helpers'

interface ProductGalleryProps {
  images: ProductImage[]
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0)
  const displayImages = images.slice(0, 3)

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 dark:border-stone-800 dark:bg-stone-800">
        <AnimatePresence mode="wait">
          <motion.img
            key={displayImages[selected]?.id}
            src={displayImages[selected]?.url}
            alt={displayImages[selected]?.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="aspect-square max-h-[480px] w-full object-cover"
          />
        </AnimatePresence>
      </div>
      <div className="flex gap-2">
        {displayImages.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setSelected(i)}
            className={cn(
              'overflow-hidden rounded-xl border-2 transition-colors',
              selected === i ? 'border-brand-600' : 'border-transparent hover:border-stone-300'
            )}
          >
            <img src={img.url} alt={img.alt} className="h-20 w-20 object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
