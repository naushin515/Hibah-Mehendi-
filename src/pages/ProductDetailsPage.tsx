import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Heart, ShoppingBag, Minus, Plus, MessageCircle } from 'lucide-react'
import { useProductBySlug, useProducts, useCart, useWishlist, useRecentlyViewed } from '../context'
import { formatPrice, getDisplayPrice, cn } from '../utils/helpers'
import { buildSingleProductWhatsAppUrl } from '../utils/whatsapp'
import ProductGallery from '../components/product/ProductGallery'
import ShareProduct from '../components/product/ShareProduct'
import ProductCard from '../components/product/ProductCard'
import Button from '../components/ui/Button'
import { ProductGridSkeleton } from '../components/ui/Skeleton'

export default function ProductDetailsPage() {
  const { slug } = useParams()
  const product = useProductBySlug(slug || '')
  const { products } = useProducts()
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const { addRecentlyViewed } = useRecentlyViewed()
  const [qty, setQty] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (product) addRecentlyViewed(product.id)
  }, [product, addRecentlyViewed])

  if (loading) {
    return <div className="container-app py-8"><ProductGridSkeleton count={1} /></div>
  }

  if (!product) {
    return (
      <div className="container-app py-20 text-center">
        <p className="text-lg font-medium">Product not found</p>
        <Link to="/shop" className="mt-4 inline-block text-brand-600">Back to Shop</Link>
      </div>
    )
  }

  const displayPrice = getDisplayPrice(product)
  const related = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4)

  const handleWhatsAppBuyNow = () => {
    window.open(buildSingleProductWhatsAppUrl(product.name, displayPrice, qty), '_blank')
  }

  return (
    <div className="container-app py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <ProductGallery images={product.images} />

        <div>
          <h1 className="font-display text-2xl font-bold lg:text-3xl">{product.name}</h1>
          <p className="mt-1 text-sm text-stone-500">{product.category}</p>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-bold text-brand-700 dark:text-brand-400">
              {formatPrice(displayPrice)}
            </span>
            {product.discountedPrice > 0 && product.price > product.discountedPrice && (
              <>
                <span className="text-sm text-stone-400 line-through">{formatPrice(product.price)}</span>
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  Save ₹{product.price - product.discountedPrice}
                </span>
              </>
            )}
          </div>

          <p className="mt-4 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
            {product.description}
          </p>

          <div className="mt-4 rounded-xl bg-green-50 px-4 py-3 dark:bg-green-900/10">
            <p className="text-sm font-medium text-green-700 dark:text-green-400">
              ✅ Order on WhatsApp & pay via UPI/Scanner
            </p>
            <p className="mt-0.5 text-xs text-green-600 dark:text-green-500">
              Confirm first, pay after — secure & personal
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <span className="text-sm font-medium">Quantity:</span>
            <div className="flex items-center rounded-xl border border-stone-200 dark:border-stone-700">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800"
                aria-label="Decrease"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm font-medium">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800"
                aria-label="Increase"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <span className="text-xs text-stone-500">{product.stock} in stock</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => addToCart(product.id, qty, product.name)} size="lg">
              <ShoppingBag className="mr-1 h-4 w-4" /> Add to Cart
            </Button>
            <button
              onClick={handleWhatsAppBuyNow}
              className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
            >
              <MessageCircle className="h-4 w-4" /> Buy on WhatsApp
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => toggleWishlist(product.id, product.name)}>
              <Heart className={cn('mr-1 h-4 w-4', isInWishlist(product.id) && 'fill-red-500 text-red-500')} />
              {isInWishlist(product.id) ? 'Wishlisted' : 'Wishlist'}
            </Button>
            <ShareProduct title={product.name} slug={product.slug} />
          </div>

          <div className="mt-6 rounded-xl border border-stone-200 p-4 dark:border-stone-700">
            <h3 className="text-sm font-semibold">How to Order</h3>
            <ol className="mt-2 space-y-1 text-xs text-stone-500">
              <li>1. Click "Buy on WhatsApp" or add to cart and order all at once</li>
              <li>2. We confirm availability and share UPI QR code</li>
              <li>3. Pay via UPI scanner — order dispatched same day</li>
              <li>4. We share tracking ID on WhatsApp</li>
            </ol>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display text-2xl font-bold">You May Also Like</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
