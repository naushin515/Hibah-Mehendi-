import { useProducts } from '../../context'

interface FilterSidebarProps {
  selectedCategory: string
  onCategoryChange: (slug: string) => void
}

export default function FilterSidebar({ selectedCategory, onCategoryChange }: FilterSidebarProps) {
  const { categories } = useProducts()

  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-stone-700 dark:text-stone-300">
        Category
      </h3>
      <div className="space-y-2">
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="radio"
            name="category"
            value=""
            checked={selectedCategory === ''}
            onChange={() => onCategoryChange('')}
            className="accent-brand-600"
          />
          <span className={selectedCategory === '' ? 'font-semibold text-brand-600' : 'text-stone-600 dark:text-stone-300'}>
            All Products
          </span>
        </label>
        {categories.map((cat) => (
          <label key={cat.id} className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="radio"
              name="category"
              value={cat.slug}
              checked={selectedCategory === cat.slug}
              onChange={() => onCategoryChange(cat.slug)}
              className="accent-brand-600"
            />
            <span className={selectedCategory === cat.slug ? 'font-semibold text-brand-600' : 'text-stone-600 dark:text-stone-300'}>
              {cat.name}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}
