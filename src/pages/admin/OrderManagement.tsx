import { useState } from 'react'
import { Package, ChevronDown } from 'lucide-react'
import { useOrders } from '../../context'
import type { AdminOrder } from '../../context/OrderContext'
import { formatPrice } from '../../utils/helpers'

const STATUS_OPTIONS = ['Placed', 'Processing', 'Packed', 'Shipped', 'Out For Delivery', 'Delivered']

const STATUS_COLORS: Record<string, string> = {
  'Placed': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'Processing': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  'Packed': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  'Shipped': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  'Out For Delivery': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
  'Delivered': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
}

export default function OrderManagement() {
  const { orders, loading, updateOrderStatus } = useOrders()
  const [expanded, setExpanded] = useState<string | null>(null)

  if (loading) return <p className="text-stone-400">Loading orders...</p>

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold">Order Management</h1>
        <p className="text-sm text-stone-500">{orders.length} total orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-stone-200 p-12 text-center dark:border-stone-800">
          <Package className="mx-auto h-12 w-12 text-stone-300" />
          <p className="mt-4 text-stone-400">No orders yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order: AdminOrder) => (
            <div key={order.id} className="rounded-2xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900">
              <div
                className="flex cursor-pointer flex-wrap items-center gap-4 p-4"
                onClick={() => setExpanded(expanded === order.id ? null : order.id)}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{order.customerName}</p>
                  <p className="text-xs text-stone-500">{new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                </div>
                <div className="text-sm font-semibold">{formatPrice(order.total)}</div>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_COLORS[order.status] || 'bg-stone-100 text-stone-600'}`}>
                  {order.status}
                </span>
                <select
                  value={order.status}
                  onChange={(e) => { e.stopPropagation(); updateOrderStatus(order.id, e.target.value) }}
                  onClick={(e) => e.stopPropagation()}
                  className="rounded-lg border border-stone-200 px-2 py-1 text-xs dark:border-stone-700 dark:bg-stone-800"
                >
                  {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown className={`h-4 w-4 text-stone-400 transition-transform ${expanded === order.id ? 'rotate-180' : ''}`} />
              </div>

              {expanded === order.id && (
                <div className="border-t border-stone-100 px-4 pb-4 pt-3 dark:border-stone-800">
                  <p className="mb-2 text-xs font-medium text-stone-500 uppercase">Order Items</p>
                  <div className="space-y-2">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span>{item.name} × {item.quantity}</span>
                        <span>{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 border-t border-stone-100 pt-3 dark:border-stone-800">
                    <p className="text-xs text-stone-500"><span className="font-medium">Shipping:</span> {order.shippingAddress}</p>
                    {order.paymentMethod && <p className="mt-1 text-xs text-stone-500"><span className="font-medium">Payment:</span> {order.paymentMethod}</p>}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
