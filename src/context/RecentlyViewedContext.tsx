import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'

interface RecentlyViewedContextType {
  items: string[]
  addRecentlyViewed: (productId: string) => void
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | null>(null)
const MAX_ITEMS = 8

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('hibah-recently-viewed')
      return saved ? JSON.parse(saved) : []
    } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('hibah-recently-viewed', JSON.stringify(items))
  }, [items])

  const addRecentlyViewed = useCallback((productId: string) => {
    setItems((prev) => {
      const filtered = prev.filter((id) => id !== productId)
      return [productId, ...filtered].slice(0, MAX_ITEMS)
    })
  }, [])

  return (
    <RecentlyViewedContext.Provider value={{ items, addRecentlyViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  )
}

export function useRecentlyViewed() {
  const ctx = useContext(RecentlyViewedContext)
  if (!ctx) throw new Error('useRecentlyViewed must be used within RecentlyViewedProvider')
  return ctx
}
