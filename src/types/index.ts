export interface ProductImage {
  id: string
  url: string
  publicId?: string
  alt: string
  isPrimary: boolean
}

export interface Review {
  id: string
  author: string
  rating: number
  comment: string
  date: string
}

export interface Product {
  id: string
  slug: string
  name: string
  category: string
  categorySlug: string
  price: number
  discountedPrice?: number
  compareAtPrice?: number
  festivalPrice?: number
  images: ProductImage[]
  description: string
  shortDescription: string
  rating: number
  reviewCount: number
  inStock: boolean
  stock: number
  tags: string[]
  isFeatured: boolean
  isBestSeller: boolean
  isNewArrival: boolean
  popularity: number
  createdAt: string
  reviews: Review[]
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  productCount: number
}

export interface CartItem {
  productId: string
  quantity: number
}

export interface User {
  id: string
  name: string
  email: string
  mobile: string
  avatar?: string
  address?: string
  city?: string
  state?: string
  pincode?: string
  isAdmin?: boolean
  role?: string
}

export type OrderStatus =
  | 'placed'
  | 'processing'
  | 'packed'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'

export interface OrderItem {
  productId: string
  name: string
  image: string
  price: number
  quantity: number
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  total: number
  status: OrderStatus
  createdAt: string
  shippingAddress: string
  trackingId: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  avatar: string
}

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'popularity'

export interface ShopFilters {
  search: string
  category: string
  minPrice: number
  maxPrice: number
  sort: SortOption
}

export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

export interface AdminUser {
  id: string
  name: string
  email: string
  mobile: string
  orders: number
  joinedAt: string
  status: 'active' | 'inactive'
}
