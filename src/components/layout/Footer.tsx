import { Link } from 'react-router-dom'
import { Instagram, Phone, Mail, MessageCircle } from 'lucide-react'

const footerLinks = {
  shop: [
    { to: '/shop', label: 'All Products' },
    { to: '/shop?category=mehendi-cones', label: 'Mehendi Cones' },
    { to: '/shop?category=henna-products', label: 'Henna Products' },
    { to: '/shop?category=after-care-products', label: 'After Care' },
    { to: '/shop?category=practice-kits', label: 'Practice Kits' },
  ],
  support: [
    { to: '/faq', label: 'FAQ' },
    { to: '/shipping', label: 'Shipping Policy' },
    { to: '/returns', label: 'Return Policy' },
    { to: '/contact', label: 'Contact Us' },
  ],
  legal: [
    { to: '/privacy', label: 'Privacy Policy' },
    { to: '/terms', label: 'Terms & Conditions' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-900 text-stone-300 dark:border-stone-800">
      <div className="container-app py-12 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <img src="/logo.png" alt="Hibah Mehendi Store" className="h-12 w-12 rounded-full object-cover" />
              <div>
                <p className="font-display text-base font-semibold text-white">Hibah Mehendi Store</p>
                <p className="text-xs text-stone-400">Chemical-Free Henna</p>
              </div>
            </Link>
            <p className="mt-4 text-sm text-stone-400 leading-relaxed">
              Pure, organic mehendi products handcrafted with love. Safe for all skin types.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href="https://www.instagram.com/hibah_mehendi_art" target="_blank" rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400 text-white transition-opacity hover:opacity-90"
                aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://wa.me/918320430258" target="_blank" rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-green-600 text-white transition-opacity hover:opacity-90"
                aria-label="WhatsApp">
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-stone-400 transition-colors hover:text-white">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-stone-400 transition-colors hover:text-white">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Order on WhatsApp</h3>
            <p className="text-sm text-stone-400">Browse, select, and place your order directly on WhatsApp. We confirm personally and share payment QR code.</p>
            <a href="https://wa.me/918320430258" target="_blank" rel="noopener noreferrer"
              className="mt-4 flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700 w-fit">
              <MessageCircle className="h-4 w-4" /> Chat with Us
            </a>
            <div className="mt-6 space-y-2 text-sm text-stone-400">
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /><span>+91 83204 30258</span></div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /><span>hibah.mehendi@gmail.com</span></div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-stone-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Hibah Mehendi Store. All rights reserved.</p>
          <div className="flex gap-4 items-center">
            {footerLinks.legal.map((link) => (
              <Link key={link.to} to={link.to} className="hover:text-white">{link.label}</Link>
            ))}
            <Link to="/login" className="opacity-30 hover:opacity-70 hover:text-white transition-opacity">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
