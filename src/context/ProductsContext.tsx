import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { Product, Category } from '../types'
import api from '../services/api'
import { useToast } from './ToastContext'

interface ProductsContextType {
  products: Product[]
  categories: Category[]
  loading: boolean
  fetchProducts: () => Promise<void>
  fetchCategories: () => Promise<void>
  addProduct: (formData: FormData) => Promise<boolean>
  updateProduct: (id: string, formData: FormData) => Promise<boolean>
  deleteProduct: (id: string) => Promise<boolean>
}

const ProductsContext = createContext<ProductsContextType | null>(null)

const PRODUCTS_CACHE_KEY = 'hibah-products-cache'
const CATEGORIES_CACHE_KEY = 'hibah-categories-cache'

function mapProduct(p: any): Product {
  return {
    ...p,
    id: p._id || p.id,
    // ✅ Map backend image format { public_id, secure_url } → frontend { url, publicId }
    images: (p.images || []).map((img: any, idx: number) => ({
      id: img._id || img.id || `img-${idx}`,
      url: img.secure_url || img.url || '',
      publicId: img.public_id || img.publicId || '',
      alt: p.name || '',
      isPrimary: idx === 0,
    })),
    category: p.category?.name || p.category || '',
    categorySlug: p.category?.slug || '',
    rating: p.ratings || p.rating || 0,
    reviewCount: p.numReviews || p.reviewCount || 0,
    inStock: (p.stock ?? 1) > 0,
    stock: p.stock ?? 0,
    shortDescription: (p.description || '').slice(0, 100),
    slug: p.slug || '',
    tags: p.tags || [],
    isFeatured: p.isFeatured || false,
    isBestSeller: p.isBestSeller || false,
    isNewArrival: p.isNewArrival || false,
    reviews: [],
  }
}

// ✅ Load cached products from localStorage so images don't disappear on refresh
function loadCache<T>(key: string): T[] {
  try {
    const cached = localStorage.getItem(key)
    return cached ? JSON.parse(cached) : []
  } catch {
    return []
  }
}

function saveCache<T>(key: string, data: T[]) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch {}
}

export function ProductsProvider({ children }: { children: ReactNode }) {
  // ✅ Start with cached data so products show instantly on refresh
  const [products, setProducts] = useState<Product[]>(() => loadCache<Product>(PRODUCTS_CACHE_KEY))
  const [categories, setCategories] = useState<Category[]>(() => loadCache<Category>(CATEGORIES_CACHE_KEY))
  const [loading, setLoading] = useState(products.length === 0) // only show loading if no cache
  const { addToast } = useToast()

  const fetchProducts = useCallback(async () => {
    if (products.length === 0) setLoading(true)
    try {
      const { data } = await api.get('/products')
      const mapped = data.map(mapProduct)
      setProducts(mapped)
      saveCache(PRODUCTS_CACHE_KEY, mapped) // ✅ Save to cache
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }, [products.length])

  const fetchCategories = useCallback(async () => {
    try {
      const { data } = await api.get('/categories')
      const mapped = data.map((c: any) => ({ ...c, id: c._id || c.id }))
      setCategories(mapped)
      saveCache(CATEGORIES_CACHE_KEY, mapped) // ✅ Save to cache
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const addProduct = useCallback(async (formData: FormData) => {
    try {
      await api.post('/products', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      addToast('Product added successfully!')
      await fetchProducts()
      return true
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Failed to add product', 'error')
      return false
    }
  }, [fetchProducts, addToast])

  const updateProduct = useCallback(async (id: string, formData: FormData) => {
    try {
      await api.put(`/products/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      addToast('Product updated successfully!')
      await fetchProducts()
      return true
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Failed to update product', 'error')
      return false
    }
  }, [fetchProducts, addToast])

  const deleteProduct = useCallback(async (id: string) => {
    try {
      await api.delete(`/products/${id}`)
      addToast('Product deleted!')
      await fetchProducts()
      return true
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Failed to delete product', 'error')
      return false
    }
  }, [fetchProducts, addToast])

  return (
    <ProductsContext.Provider value={{
      products, categories, loading,
      fetchProducts, fetchCategories,
      addProduct, updateProduct, deleteProduct,
    }}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const ctx = useContext(ProductsContext)
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider')
  return ctx
}

export function useProductBySlug(slug: string) {
  const { products } = useProducts()
  return products.find((p) => p.slug === slug)
}

export function useProductById(id: string) {
  const { products } = useProducts()
  return products.find((p) => p.id === id)
}
