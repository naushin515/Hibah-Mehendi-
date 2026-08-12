import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import type { Product } from '../../types'
import { formatPrice, getDisplayPrice, cn } from '../../utils/helpers'
import { useCart, useWishlist } from '../../context'
import { buildSingleProductWhatsAppUrl } from '../../utils/whatsapp'

interface ProductCardProps {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [imgError, setImgError] = useState(false)
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const displayPrice = getDisplayPrice(product)
  const imageUrl = !imgError && product.images[0]?.url
    ? product.images[0].url
    : 'https://placehold.co/400x400/f2d9c4/924a28?text=Hibah'

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault()
    window.open(buildSingleProductWhatsAppUrl(product.name, displayPrice, 1), '_blank')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative overflow-hidden rounded-2xl border border-stone-200 bg-white transition-shadow hover:shadow-lg dark:border-stone-800 dark:bg-stone-900"
    >
      {product.isNewArrival && (
        <div className="absolute left-3 top-3 z-10">
          <span className="rounded-full bg-green-600 px-2 py-0.5 text-[10px] font-semibold text-white">New</span>
        </div>
      )}

      {/* Wishlist button */}
      <button
        onClick={(e) => { e.preventDefault(); toggleWishlist(product.id, product.name) }}
        className={cn(
          'absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 shadow-sm backdrop-blur opacity-0 transition-opacity group-hover:opacity-100 dark:bg-stone-800/90',
          isInWishlist(product.id) && 'opacity-100 text-red-500'
        )}
        aria-label="Wishlist"
      >
        <Heart className={cn('h-4 w-4', isInWishlist(product.id) && 'fill-current')} />
      </button>

      <Link to={`/product/${product.slug}`}>
        <div className="aspect-square overflow-hidden bg-stone-50 dark:bg-stone-800">
          <img
            src={imageUrl}
            alt={product.name}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="p-4">
        <p className="text-xs text-stone-500">{product.category}</p>
        <Link to={`/product/${product.slug}`}>
          <h3 className="mt-1 line-clamp-2 text-sm font-medium leading-snug hover:text-brand-600 dark:hover:text-brand-400">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-base font-semibold text-brand-700 dark:text-brand-400">{formatPrice(displayPrice)}</span>
          {product.discountedPrice > 0 && product.price > product.discountedPrice && (
            <span className="text-xs text-stone-400 line-through">{formatPrice(product.price)}</span>
          )}
        </div>

        <div className="mt-3 flex gap-2">
          <button
            onClick={() => addToCart(product.id, 1, product.name)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-brand-600 py-2.5 text-xs font-medium text-white transition-colors hover:bg-brand-700"
          >
            <ShoppingBag className="h-3.5 w-3.5" /> Add to Cart
          </button>
          <button
            onClick={handleWhatsApp}
            className="flex items-center justify-center rounded-xl bg-green-600 px-3 py-2.5 text-white transition-colors hover:bg-green-700"
            aria-label="Buy on WhatsApp"
            title="Buy on WhatsApp"
          >
            <MessageCircle className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
