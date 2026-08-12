import { Link } from 'react-router-dom'
export default function CheckoutSuccessPage() {
  return (
    <div className="container-app py-20 text-center">
      <p className="text-stone-500">Thank you for your order!</p>
      <Link to="/" className="mt-4 inline-block text-brand-600">Go Home</Link>
    </div>
  )
}
