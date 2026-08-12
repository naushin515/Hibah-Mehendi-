import { useProducts, useRecentlyViewed } from '../../context'
import ProductCard from './ProductCard'

export default function RecentlyViewed() {
  const { items } = useRecentlyViewed()
  const { products } = useProducts()

  const viewedProducts = items
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean)

  if (viewedProducts.length === 0) return null

  return (
    <section className="container-app py-12">
      <h2 className="font-display text-2xl font-semibold">Recently Viewed</h2>
      <p className="mt-1 text-sm text-stone-500">Products you recently browsed</p>
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {viewedProducts.slice(0, 4).map((product, i) => (
          product && <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  )
}
