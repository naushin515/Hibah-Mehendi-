import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, MessageCircle } from 'lucide-react'
import { useProducts, useBanner } from '../context'
import ProductCard from '../components/product/ProductCard'
import CategoryCard from '../components/shop/CategoryCard'
import Button from '../components/ui/Button'

export default function HomePage() {
  const { products, categories } = useProducts()
  const { banner } = useBanner()

  const featured = products.filter((p) => p.isFeatured).slice(0, 8)
  const poster = banner?.posterBanner
  const showPoster = poster?.enabled && poster?.imageUrl

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-brand-100 dark:from-stone-900 dark:via-stone-900 dark:to-brand-950">
        <div className="container-app flex flex-col items-center gap-8 py-16 lg:flex-row lg:py-24">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="flex-1 text-center lg:text-left">
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-700 dark:bg-brand-900/50 dark:text-brand-300">
              <Sparkles className="h-3 w-3" /> 100% Organic & Chemical-Free
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-stone-900 dark:text-white sm:text-5xl lg:text-6xl">
              Organic Henna,<br />Naturally Beautiful
            </h1>
            <p className="mt-4 max-w-lg text-base text-stone-600 dark:text-stone-300 lg:text-lg">
              Hibah Mehendi Store — Pure chemical-free henna cones, tools and aftercare. Order directly on WhatsApp.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link to="/shop"><Button size="lg">Shop Now <ArrowRight className="h-4 w-4" /></Button></Link>
              <a href="https://wa.me/918320430258" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700">
                <MessageCircle className="h-4 w-4" /> Order on WhatsApp
              </a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="flex-shrink-0">
            <img src="/logo.png" alt="Hibah Mehendi Store" className="h-48 w-48 rounded-full shadow-2xl lg:h-64 lg:w-64" />
          </motion.div>
        </div>
      </section>

      {/* Festive Poster Banner (admin controlled) */}
      {showPoster && (
        <section className="container-app py-6">
          <Link to={poster!.linkTo || '/shop'}>
            <img src={poster!.imageUrl} alt="Festive Offer" className="w-full rounded-2xl object-cover shadow-md" style={{ maxHeight: 300 }} />
          </Link>
        </section>
      )}

      {/* How to Order */}
      <section className="bg-green-50 py-10 dark:bg-green-900/10">
        <div className="container-app">
          <h2 className="text-center font-display text-xl font-semibold text-green-800 dark:text-green-300">How to Order</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-4">
            {[
              { step: '1', text: 'Browse & add to cart' },
              { step: '2', text: 'Click "Order on WhatsApp"' },
              { step: '3', text: 'We confirm & share UPI QR' },
              { step: '4', text: 'Pay & get your parcel!' },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-lg font-bold text-white">{s.step}</div>
                <p className="mt-2 text-sm text-green-700 dark:text-green-400">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      {/*<section className="container-app py-16">
        <h2 className="font-display text-2xl font-semibold">Shop by Category</h2>
        <p className="mt-1 text-sm text-stone-500">Find exactly what you need</p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>
      </section>*/}

      {/* Featured Products only */}
      {featured.length > 0 && (
        <section className="bg-white py-16 dark:bg-stone-900">
          <div className="container-app">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold">Featured Products</h2>
              <Link to="/shop" className="text-sm font-medium text-brand-600 hover:text-brand-700">View All →</Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
