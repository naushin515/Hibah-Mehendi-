import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import type { CartItem } from '../types'
import { useToast } from './ToastContext'

interface CartContextType {
  items: CartItem[]
  addToCart: (productId: string, qty?: number, productName?: string) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  itemCount: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const { addToast } = useToast()
  const [items, setItems] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('hibah-cart') || '[]') } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('hibah-cart', JSON.stringify(items))
  }, [items])

  const addToCart = useCallback((productId: string, qty = 1, productName = 'Product') => {
    setItems(prev => {
      const existing = prev.find(i => i.productId === productId)
      if (existing) return prev.map(i => i.productId === productId ? { ...i, quantity: i.quantity + qty } : i)
      return [...prev, { productId, quantity: qty }]
    })
    addToast(`${productName} added to cart`)
  }, [addToast])

  const removeFromCart = useCallback((productId: string) => {
    setItems(prev => prev.filter(i => i.productId !== productId))
    addToast('Item removed', 'info')
  }, [addToast])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) return
    setItems(prev => prev.map(i => i.productId === productId ? { ...i, quantity } : i))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, itemCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
