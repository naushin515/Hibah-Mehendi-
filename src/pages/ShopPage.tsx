import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import { useProducts } from '../context'
import ProductCard from '../components/product/ProductCard'
import SearchBar from '../components/shop/SearchBar'
import FilterSidebar from '../components/shop/FilterSidebar'

export default function ShopPage() {
  const { products } = useProducts()
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(searchParams.get('category') || '')
  const [filterOpen, setFilterOpen] = useState(false)

  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat !== null) setCategory(cat)
  }, [searchParams])

  const filtered = useMemo(() => {
    let result = [...products]
    if (search) {
      const q = search.toLowerCase()
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      )
    }
    if (category) result = result.filter((p) => p.categorySlug === category)
    return result
  }, [products, search, category])

  return (
    <div className="container-app py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Shop</h1>
        <p className="mt-1 text-stone-500">{filtered.length} products</p>
      </div>

      <div className="mb-6 flex gap-3">
        <div className="flex-1"><SearchBar value={search} onChange={setSearch} /></div>
        <button
          onClick={() => setFilterOpen(true)}
          className="flex items-center gap-2 rounded-xl border border-stone-200 px-4 py-2 text-sm font-medium lg:hidden dark:border-stone-700"
        >
          <SlidersHorizontal className="h-4 w-4" /> Category
        </button>
      </div>

      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden w-52 shrink-0 lg:block">
          <FilterSidebar selectedCategory={category} onCategoryChange={setCategory} />
        </aside>

        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg font-medium">No products found</p>
              <p className="mt-1 text-sm text-stone-500">Try a different category or search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setFilterOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 max-h-[70vh] overflow-y-auto rounded-t-2xl bg-white p-6 dark:bg-stone-900">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Category</h3>
              <button onClick={() => setFilterOpen(false)}><X className="h-5 w-5" /></button>
            </div>
            <FilterSidebar selectedCategory={category} onCategoryChange={(slug) => { setCategory(slug); setFilterOpen(false) }} />
          </div>
        </div>
      )}
    </div>
  )
}
