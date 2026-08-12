import { Link } from 'react-router-dom'
import { ShoppingBag, Heart, User, Menu, X, MessageCircle, Lock } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart, useWishlist, useAuth } from '../../context'
import ThemeToggle from '../ui/ThemeToggle'

const WHATSAPP_URL = 'https://wa.me/918320430258'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { itemCount } = useCart()
  const { items: wishlistItems } = useWishlist()
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/90 backdrop-blur-md dark:border-stone-800 dark:bg-stone-900/90">
      <div className="container-app flex h-16 items-center justify-between lg:h-18">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Hibah Mehendi Store" className="h-10 w-10 rounded-full object-cover lg:h-11 lg:w-11" />
          <div className="hidden sm:block">
            <p className="font-display text-sm font-semibold leading-tight lg:text-base">Hibah Mehendi Store</p>
            <p className="text-[10px] text-stone-500 lg:text-xs">Chemical-Free Henna</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to}
              className="rounded-lg px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-brand-50 hover:text-brand-700 dark:text-stone-300 dark:hover:bg-brand-900/20 dark:hover:text-brand-300">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />

          {/* WhatsApp quick contact */}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="hidden rounded-xl p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 sm:block"
            aria-label="WhatsApp">
            <MessageCircle className="h-5 w-5" />
          </a>

          <Link to="/wishlist" className="relative rounded-xl p-2 text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
            {wishlistItems.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative rounded-xl p-2 text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800" aria-label="Cart">
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>

          {isAuthenticated && user?.isAdmin ? (
            /* Admin logged in — show profile dropdown */
            <div className="group relative">
              <button className="rounded-xl p-2 text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800" aria-label="Admin">
                <User className="h-5 w-5" />
              </button>
              <div className="invisible absolute right-0 top-full z-50 mt-1 w-48 rounded-xl border border-stone-200 bg-white py-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100 dark:border-stone-700 dark:bg-stone-900">
                <p className="px-4 py-1 text-xs text-stone-500">{user.name}</p>
                <Link to="/admin" className="block px-4 py-2 text-sm hover:bg-stone-50 dark:hover:bg-stone-800">Admin Panel</Link>
                <button onClick={logout} className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-stone-50 dark:hover:bg-stone-800">Logout</button>
              </div>
            </div>
          ) : (
            /* Not logged in — subtle lock icon for admin access */
            <Link to="/login" className="rounded-xl p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-600 dark:hover:bg-stone-800" aria-label="Admin Login" title="Admin Login">
              <Lock className="h-4 w-4" />
            </Link>
          )}

          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-xl p-2 text-stone-600 hover:bg-stone-100 md:hidden dark:text-stone-300 dark:hover:bg-stone-800" aria-label="Menu">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-stone-200 md:hidden dark:border-stone-800">
            <nav className="container-app flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-stone-600 hover:bg-brand-50 dark:text-stone-300 dark:hover:bg-brand-900/20">
                  {link.label}
                </Link>
              ))}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="mt-2 flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-medium text-white">
                <MessageCircle className="h-4 w-4" /> Order on WhatsApp
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
