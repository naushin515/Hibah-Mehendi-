import { Link } from 'react-router-dom'
export default function OrderTrackingPage() {
  return (
    <div className="container-app py-20 text-center">
      <p className="text-stone-500">Order tracking is provided via WhatsApp after your order is confirmed.</p>
      <Link to="/" className="mt-4 inline-block text-brand-600">Go Home</Link>
    </div>
  )
}
