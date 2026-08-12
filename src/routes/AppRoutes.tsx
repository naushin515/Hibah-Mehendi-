import { Routes, Route } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import AdminLayout from '../components/layout/AdminLayout'

import HomePage from '../pages/HomePage'
import ShopPage from '../pages/ShopPage'
import ProductDetailsPage from '../pages/ProductDetailsPage'
import CartPage from '../pages/CartPage'
import WishlistPage from '../pages/WishlistPage'
import LoginPage from '../pages/LoginPage'
import AboutPage from '../pages/AboutPage'
import ContactPage from '../pages/ContactPage'
import FAQPage from '../pages/FAQPage'
import { PrivacyPolicyPage, TermsPage, ShippingPolicyPage, ReturnPolicyPage } from '../pages/PolicyPages'

import AdminDashboard from '../pages/admin/AdminDashboard'
import ProductManagement from '../pages/admin/ProductManagement'
import OrderManagement from '../pages/admin/OrderManagement'
import UserManagement from '../pages/admin/UserManagement'
import BannerManagement from '../pages/admin/BannerManagement'
import MessageInbox from '../pages/admin/MessageInbox'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="product/:slug" element={<ProductDetailsPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="faq" element={<FAQPage />} />
        <Route path="privacy" element={<PrivacyPolicyPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="shipping" element={<ShippingPolicyPage />} />
        <Route path="returns" element={<ReturnPolicyPage />} />
        {/* Login only accessible directly for admin — not shown in navbar */}
        <Route path="login" element={<LoginPage />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<ProductManagement />} />
        <Route path="orders" element={<OrderManagement />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="banner" element={<BannerManagement />} />
        <Route path="messages" element={<MessageInbox />} />
      </Route>
    </Routes>
  )
}
