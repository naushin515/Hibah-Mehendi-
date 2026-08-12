import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { useAuth } from './AuthContext'
import api from '../services/api'
import { useToast } from './ToastContext'

// Simplified order type for admin view only
export interface AdminOrder {
  id: string
  userId: string
  customerName?: string
  items: Array<{ name: string; quantity: number; price: number; image?: string }>
  total: number
  status: string
  createdAt: string
  shippingAddress: string
  paymentMethod?: string
}

interface OrderContextType {
  orders: AdminOrder[]
  loading: boolean
  fetchAllOrders: () => Promise<void>
  updateOrderStatus: (orderId: string, status: string) => Promise<boolean>
}

const OrderContext = createContext<OrderContextType | null>(null)

function mapOrder(o: any): AdminOrder {
  const addr = o.shippingAddress
  return {
    id: o._id,
    userId: o.user?._id || o.user || '',
    customerName: o.user?.name || addr?.name || 'Customer',
    items: (o.orderItems || []).map((item: any) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
    })),
    total: o.totalPrice || 0,
    status: (o.trackingStatus || 'Placed'),
    createdAt: o.createdAt,
    shippingAddress: addr
      ? `${addr.name || ''}, ${addr.address || ''}, ${addr.city || ''} - ${addr.pincode || ''}`
      : 'N/A',
    paymentMethod: o.paymentMethod || 'WhatsApp',
  }
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<AdminOrder[]>([])
  const [loading, setLoading] = useState(false)
  const { isAuthenticated, user } = useAuth()
  const { addToast } = useToast()

  const fetchAllOrders = useCallback(async () => {
    if (!isAuthenticated || !user?.isAdmin) return
    setLoading(true)
    try {
      const { data } = await api.get('/orders')
      setOrders(data.map(mapOrder))
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, user])

  useEffect(() => {
    if (isAuthenticated && user?.isAdmin) {
      fetchAllOrders()
    } else {
      setOrders([])
    }
  }, [isAuthenticated, user, fetchAllOrders])

  const updateOrderStatus = useCallback(async (orderId: string, status: string) => {
    try {
      await api.put(`/orders/${orderId}/tracking`, { status })
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o))
      addToast('Order status updated', 'success')
      return true
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Failed to update order', 'error')
      return false
    }
  }, [addToast])

  return (
    <OrderContext.Provider value={{ orders, loading, fetchAllOrders, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrders() {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error('useOrders must be used within OrderProvider')
  return ctx
}
