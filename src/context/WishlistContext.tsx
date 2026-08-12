import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { useToast } from './ToastContext'

interface WishlistContextType {
  items: string[]
  toggleWishlist: (productId: string, productName?: string) => void
  isInWishlist: (productId: string) => boolean
  removeFromWishlist: (productId: string) => void
}

const WishlistContext = createContext<WishlistContextType | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { addToast } = useToast()
  const [items, setItems] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('hibah-wishlist') || '[]') } catch { return [] }
  })
  useEffect(() => { localStorage.setItem('hibah-wishlist', JSON.stringify(items)) }, [items])

  const toggleWishlist = useCallback((productId: string, productName = 'Product') => {
    setItems(prev => {
      if (prev.includes(productId)) { addToast('Removed from wishlist', 'info'); return prev.filter(id => id !== productId) }
      addToast(`${productName} added to wishlist`); return [...prev, productId]
    })
  }, [addToast])

  const isInWishlist = useCallback((productId: string) => items.includes(productId), [items])
  const removeFromWishlist = useCallback((productId: string) => setItems(prev => prev.filter(id => id !== productId)), [])

  return <WishlistContext.Provider value={{ items, toggleWishlist, isInWishlist, removeFromWishlist }}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
