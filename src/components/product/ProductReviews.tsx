import { Star } from 'lucide-react'
import type { Review } from '../../types'

interface ProductReviewsProps {
  reviews: Review[]
  rating: number
  reviewCount: number
}

export default function ProductReviews({ reviews, rating, reviewCount }: ProductReviewsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-brand-700 dark:text-brand-400">{rating.toFixed(1)}</p>
          <div className="mt-1 flex justify-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`} />
            ))}
          </div>
          <p className="mt-1 text-xs text-stone-500">{reviewCount} reviews</p>
        </div>
        <div className="flex-1 space-y-1">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter((r) => Math.round(r.rating) === star).length
            const pct = reviews.length ? (count / reviews.length) * 100 : 0
            return (
              <div key={star} className="flex items-center gap-2 text-xs">
                <span className="w-3">{star}</span>
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-700">
                  <div className="h-full rounded-full bg-amber-400" style={{ width: `${pct}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="rounded-xl border border-stone-200 p-4 dark:border-stone-800">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{review.author}</p>
              <p className="text-xs text-stone-500">{new Date(review.date).toLocaleDateString('en-IN')}</p>
            </div>
            <div className="mt-1 flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`} />
              ))}
            </div>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
