import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { useToast } from './ToastContext'

interface SaveForLaterContextType {
  items: string[]
  addToSaveForLater: (productId: string, productName?: string) => void
  removeFromSaveForLater: (productId: string) => void
  isSaved: (productId: string) => boolean
}

const SaveForLaterContext = createContext<SaveForLaterContextType | null>(null)

export function SaveForLaterProvider({ children }: { children: ReactNode }) {
  const { addToast } = useToast()
  const [items, setItems] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('hibah-save-later') || '[]') } catch { return [] }
  })
  useEffect(() => { localStorage.setItem('hibah-save-later', JSON.stringify(items)) }, [items])

  const addToSaveForLater = useCallback((productId: string, productName = 'Product') => {
    setItems(prev => { if (prev.includes(productId)) return prev; addToast(`${productName} saved for later`); return [...prev, productId] })
  }, [addToast])

  const removeFromSaveForLater = useCallback((productId: string) => setItems(prev => prev.filter(id => id !== productId)), [])
  const isSaved = useCallback((productId: string) => items.includes(productId), [items])

  return <SaveForLaterContext.Provider value={{ items, addToSaveForLater, removeFromSaveForLater, isSaved }}>{children}</SaveForLaterContext.Provider>
}

export function useSaveForLater() {
  const ctx = useContext(SaveForLaterContext)
  if (!ctx) throw new Error('useSaveForLater must be used within SaveForLaterProvider')
  return ctx
}
