import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import api from '../services/api'

interface TextBanner {
  enabled: boolean
  message: string
  color: 'green' | 'orange' | 'red' | 'purple' | 'blue'
  startDate: string | null
  endDate: string | null
}

interface PosterBanner {
  enabled: boolean
  imageUrl: string
  publicId: string
  linkTo: string
}

export interface BannerData {
  _id?: string
  textBanner: TextBanner
  posterBanner: PosterBanner
}

interface BannerContextType {
  banner: BannerData | null
  loading: boolean
  fetchBanner: () => Promise<void>
  updateTextBanner: (data: Partial<TextBanner>) => Promise<boolean>
  updatePosterBanner: (formData: FormData) => Promise<boolean>
}

const defaultBanner: BannerData = {
  textBanner: { enabled: false, message: '', color: 'green', startDate: null, endDate: null },
  posterBanner: { enabled: false, imageUrl: '', publicId: '', linkTo: '/shop' },
}

const BannerContext = createContext<BannerContextType | null>(null)

export function BannerProvider({ children }: { children: ReactNode }) {
  const [banner, setBanner] = useState<BannerData | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchBanner = useCallback(async () => {
    try {
      const { data } = await api.get('/banner')
      setBanner(data)
    } catch (err) {
      // If API fails, use defaults so app still works
      setBanner(defaultBanner)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchBanner() }, [fetchBanner])

  const updateTextBanner = useCallback(async (data: Partial<TextBanner>) => {
    try {
      const { data: updated } = await api.put('/banner/text', data)
      setBanner(updated)
      return true
    } catch (err: any) {
      console.error('Banner update failed:', err.response?.data || err.message)
      return false
    }
  }, [])

  const updatePosterBanner = useCallback(async (formData: FormData) => {
    try {
      const { data: updated } = await api.put('/banner/poster', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setBanner(updated)
      return true
    } catch (err: any) {
      console.error('Poster update failed:', err.response?.data || err.message)
      return false
    }
  }, [])

  return (
    <BannerContext.Provider value={{ banner, loading, fetchBanner, updateTextBanner, updatePosterBanner }}>
      {children}
    </BannerContext.Provider>
  )
}

export function useBanner() {
  const ctx = useContext(BannerContext)
  if (!ctx) throw new Error('useBanner must be used within BannerProvider')
  return ctx
}
