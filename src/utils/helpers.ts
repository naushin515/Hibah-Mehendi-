import type { Product } from '../types'
import { getActivePromo } from './festivalPromo'

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)
}

export function getDisplayPrice(product: Product): number {
  const promo = getActivePromo()
  if (promo && product.festivalPrice) return product.festivalPrice
  return product.price
}

export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}
