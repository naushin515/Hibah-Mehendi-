import { Link } from 'react-router-dom'
import { Heart, ShoppingBag } from 'lucide-react'
import { useWishlist, useProducts, useCart } from '../context'
import { formatPrice, getDisplayPrice } from '../utils/helpers'
import Button from '../components/ui/Button'

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist()
  const { products } = useProducts()
  const { addToCart } = useCart()

  const wishlistProducts = items.map((id) => products.find((p) => p.id === id)).filter(Boolean)

  if (wishlistProducts.length === 0) {
    return (
      <div className="container-app py-20 text-center">
        <Heart className="mx-auto h-16 w-16 text-stone-300" />
        <h1 className="mt-4 font-display text-2xl font-semibold">Your wishlist is empty</h1>
        <Link to="/shop" className="mt-6 inline-block"><Button>Browse Products</Button></Link>
      </div>
    )
  }

  return (
    <div className="container-app py-8">
      <h1 className="font-display text-3xl font-bold">Wishlist</h1>
      <p className="mt-1 text-stone-500">{wishlistProducts.length} items saved</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {wishlistProducts.map((product) => product && (
          <div key={product.id} className="flex gap-4 rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
            <Link to={`/product/${product.slug}`}>
              <img src={product.images[0]?.url} alt={product.name} className="h-24 w-24 rounded-xl object-cover" />
            </Link>
            <div className="flex flex-1 flex-col">
              <Link to={`/product/${product.slug}`} className="font-medium hover:text-brand-600">{product.name}</Link>
              <p className="mt-1 font-semibold text-brand-700 dark:text-brand-400">{formatPrice(getDisplayPrice(product))}</p>
              <div className="mt-auto flex gap-2">
                <Button size="sm" onClick={() => addToCart(product.id)}><ShoppingBag className="h-3.5 w-3.5" /> Add to Cart</Button>
                <button onClick={() => removeFromWishlist(product.id)} className="text-xs text-red-500 hover:text-red-600">Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
