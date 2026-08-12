import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag, Loader2, MessageCircle } from 'lucide-react'
import { useCart, useProducts } from '../context'
import { formatPrice, getDisplayPrice } from '../utils/helpers'
import { buildCartWhatsAppUrl } from '../utils/whatsapp'
import Button from '../components/ui/Button'

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, itemCount } = useCart()
  const { products, loading } = useProducts()

  if (loading) {
    return (
      <div className="container-app flex min-h-[50vh] items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
      </div>
    )
  }

  const cartProducts = items.map((item) => {
    const product = products.find((p) => p.id === item.productId)
    return { ...item, product }
  }).filter((item) => item.product)

  const subtotal = cartProducts.reduce((sum, { quantity, product }) =>
    sum + (product ? getDisplayPrice(product) : 0) * quantity, 0)
  const shipping = subtotal >= 999 ? 0 : 49
  const total = subtotal + shipping

  const handleWhatsAppOrder = () => {
    const waItems = cartProducts.map(({ quantity, product }) => ({
      name: product!.name,
      price: getDisplayPrice(product!),
      quantity,
    }))
    window.open(buildCartWhatsAppUrl(waItems), '_blank')
  }

  if (cartProducts.length === 0) {
    return (
      <div className="container-app py-20 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-stone-300" />
        <h1 className="mt-4 font-display text-2xl font-semibold">Your cart is empty</h1>
        <p className="mt-2 text-stone-500">Add some products to get started</p>
        <Link to="/shop" className="mt-6 inline-block"><Button>Continue Shopping</Button></Link>
      </div>
    )
  }

  return (
    <div className="container-app py-8">
      <h1 className="font-display text-3xl font-bold">Shopping Cart</h1>
      <p className="mt-1 text-stone-500">{itemCount} items</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Cart items */}
        <div className="space-y-4 lg:col-span-2">
          {cartProducts.map(({ productId, quantity, product }) => product && (
            <div key={productId} className="flex gap-4 rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
              <Link to={`/product/${product.slug}`}>
                <img src={product.images[0]?.url} alt={product.name} className="h-24 w-24 rounded-xl object-cover" />
              </Link>
              <div className="flex flex-1 flex-col">
                <Link to={`/product/${product.slug}`} className="font-medium hover:text-brand-600">{product.name}</Link>
                <p className="text-sm text-stone-500">{product.category}</p>
                <p className="mt-1 font-semibold text-brand-700 dark:text-brand-400">{formatPrice(getDisplayPrice(product))}</p>
                <div className="mt-auto flex items-center gap-3">
                  <div className="flex items-center rounded-lg border border-stone-200 dark:border-stone-700">
                    <button onClick={() => updateQuantity(productId, quantity - 1)} className="p-1.5" disabled={quantity <= 1}>
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm">{quantity}</span>
                    <button onClick={() => updateQuantity(productId, quantity + 1)} className="p-1.5">
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(productId)} className="text-red-500 hover:text-red-600" aria-label="Remove">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="h-fit rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
          <h2 className="font-display text-lg font-semibold">Order Summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-stone-500">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-stone-500">Delivery</span><span>{shipping === 0 ? 'Free 🎉' : formatPrice(shipping)}</span></div>
            {subtotal < 999 && <p className="text-xs text-brand-600">Add {formatPrice(999 - subtotal)} more for free delivery!</p>}
            <div className="border-t border-stone-200 pt-2 dark:border-stone-700">
              <div className="flex justify-between font-semibold"><span>Total</span><span>{formatPrice(total)}</span></div>
            </div>
          </div>

          <button
            onClick={handleWhatsAppOrder}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
          >
            <MessageCircle className="h-5 w-5" /> Order on WhatsApp
          </button>
          <p className="mt-2 text-center text-xs text-stone-400">Your full order list will be sent on WhatsApp</p>
          <Link to="/shop" className="mt-3 block text-center text-sm text-brand-600 hover:text-brand-700">Continue Shopping</Link>
        </div>
      </div>
    </div>
  )
}
