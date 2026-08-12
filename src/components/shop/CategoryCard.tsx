import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useProducts } from '../../context'

const CATEGORY_IMAGES: Record<string, string> = {
  'mehendi-cones': 'https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&q=80&w=600',
  'henna-products': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600',
  'after-care-products': 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600',
  'practice-kits': 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600',
}

interface CategoryCardProps {
  category: { id: string; name: string; slug: string }
  index?: number
}

export default function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  const { products } = useProducts()
  const count = products.filter(p => p.categorySlug === category.slug).length
  const image = CATEGORY_IMAGES[category.slug] || 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600'

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.08 }}>
      <Link to={`/shop?category=${category.slug}`}
        className="group block overflow-hidden rounded-2xl border border-stone-200 bg-white transition-shadow hover:shadow-md dark:border-stone-800 dark:bg-stone-900">
        <div className="aspect-[4/3] overflow-hidden">
          <img src={image} alt={category.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        </div>
        <div className="p-4">
          <h3 className="font-display text-sm font-semibold group-hover:text-brand-600">{category.name}</h3>
          <p className="mt-1 text-xs text-stone-500">{count} products</p>
        </div>
      </Link>
    </motion.div>
  )
}
