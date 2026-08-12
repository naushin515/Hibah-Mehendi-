import type { ReactNode } from 'react'
import { ThemeProvider } from './ThemeContext'
import { ToastProvider } from './ToastContext'
import { AuthProvider } from './AuthContext'
import { CartProvider } from './CartContext'
import { WishlistProvider } from './WishlistContext'
import { RecentlyViewedProvider } from './RecentlyViewedContext'
import { ProductsProvider } from './ProductsContext'
import { BannerProvider } from './BannerContext'
import { OrderProvider } from './OrderContext'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <ProductsProvider>
          <AuthProvider>
            <BannerProvider>
              <OrderProvider>
                <CartProvider>
                  <WishlistProvider>
                    <RecentlyViewedProvider>
                      {children}
                    </RecentlyViewedProvider>
                  </WishlistProvider>
                </CartProvider>
              </OrderProvider>
            </BannerProvider>
          </AuthProvider>
        </ProductsProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}

export { useTheme } from './ThemeContext'
export { useToast } from './ToastContext'
export { useAuth } from './AuthContext'
export { useCart } from './CartContext'
export { useWishlist } from './WishlistContext'
export { useRecentlyViewed } from './RecentlyViewedContext'
export { useProducts, useProductBySlug, useProductById } from './ProductsContext'
export { useBanner } from './BannerContext'
export { useOrders } from './OrderContext'
