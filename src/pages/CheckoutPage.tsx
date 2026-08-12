import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'

// Checkout is handled via WhatsApp — this page is no longer used
export default function CheckoutPage() {
  return (
    <div className="container-app py-20 text-center">
      <MessageCircle className="mx-auto h-16 w-16 text-green-500" />
      <h1 className="mt-4 font-display text-2xl font-bold">Order via WhatsApp</h1>
      <p className="mt-2 text-stone-500">Add items to cart and click "Order on WhatsApp" to place your order.</p>
      <Link to="/cart" className="mt-6 inline-block rounded-xl bg-green-600 px-6 py-3 text-white hover:bg-green-700">
        Go to Cart
      </Link>
    </div>
  )
}
