import { Link } from 'react-router-dom'
import { Package, Megaphone, Mail, Users, ShoppingBag } from 'lucide-react'
import { useProducts, useOrders } from '../../context'

const cards = [
  { to: '/admin/products', label: 'Products', icon: Package, color: 'bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-300' },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingBag, color: 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300' },
  { to: '/admin/banner', label: 'Banners', icon: Megaphone, color: 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300' },
  { to: '/admin/messages', label: 'Messages', icon: Mail, color: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300' },
  { to: '/admin/users', label: 'Users', icon: Users, color: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300' },
]

export default function AdminDashboard() {
  const { products } = useProducts()
  const { orders } = useOrders()

  const stats = [
    { label: 'Total Products', value: products.length },
    { label: 'Total Orders', value: orders.length },
    { label: 'Featured', value: products.filter(p => p.isFeatured).length },
    { label: 'Out of Stock', value: products.filter(p => !p.inStock).length },
  ]

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Dashboard</h1>
      <p className="text-sm text-stone-500">Welcome to Hibah Mehendi Store Admin Panel</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
            <p className="text-sm text-stone-500">{stat.label}</p>
            <p className="mt-1 text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="mb-4 font-display text-lg font-semibold">Quick Access</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <Link key={card.to} to={card.to}
              className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-5 transition-shadow hover:shadow-md dark:border-stone-800 dark:bg-stone-900">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.color}`}>
                <card.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium">{card.label}</p>
                <p className="text-xs text-stone-500">Manage {card.label.toLowerCase()}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
        <h2 className="font-semibold">How Orders Work</h2>
        <div className="mt-3 space-y-2 text-sm text-stone-500">
          <p>1. Customer browses products and clicks "Order on WhatsApp"</p>
          <p>2. WhatsApp opens with their order pre-filled</p>
          <p>3. You confirm and share UPI QR code on WhatsApp</p>
          <p>4. Customer pays → you dispatch and update order status here</p>
        </div>
      </div>
    </div>
  )
}
