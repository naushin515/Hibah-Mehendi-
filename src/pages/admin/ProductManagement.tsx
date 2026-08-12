import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { useProducts, useToast } from '../../context'
import { formatPrice } from '../../utils/helpers'
import type { Product } from '../../types'
import Button from '../../components/ui/Button'

export default function ProductManagement() {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useProducts()
  const { addToast } = useToast()
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [saving, setSaving] = useState(false)
  const [imageFiles, setImageFiles] = useState<FileList | null>(null)
  const [form, setForm] = useState({
    name: '', categoryId: '', price: '', discountedPrice: '', stock: '',
    description: '', isFeatured: false, isBestSeller: false, isNewArrival: false,
  })

  const openAdd = () => {
    setEditing(null)
    setForm({ name: '', categoryId: '', price: '', discountedPrice: '', stock: '', description: '', isFeatured: false, isBestSeller: false, isNewArrival: false })
    setImageFiles(null)
    setShowForm(true)
  }

  const openEdit = (product: Product) => {
    const cat = categories.find(c => c.name === product.category || c.id === product.category)
    setEditing(product)
    setForm({
      name: product.name, categoryId: cat?.id || '', price: String(product.price),
      discountedPrice: String(product.discountedPrice || ''), stock: String(product.stock || ''),
      description: product.description, isFeatured: product.isFeatured || false,
      isBestSeller: product.isBestSeller || false, isNewArrival: product.isNewArrival || false,
    })
    setImageFiles(null)
    setShowForm(true)
  }

  const handleSave = async () => {
    if (!form.name || !form.categoryId || !form.price) {
      addToast('Name, category and price are required', 'error'); return
    }
    setSaving(true)
    const fd = new FormData()
    fd.append('name', form.name)
    fd.append('categoryId', form.categoryId)
    fd.append('price', form.price)
    fd.append('stock', form.stock || '0')
    fd.append('description', form.description)
    fd.append('isFeatured', String(form.isFeatured))
    fd.append('isBestSeller', String(form.isBestSeller))
    fd.append('isNewArrival', String(form.isNewArrival))
    if (form.discountedPrice) fd.append('discountedPrice', form.discountedPrice)
    if (imageFiles) Array.from(imageFiles).forEach(f => fd.append('images', f))

    const ok = editing ? await updateProduct(editing.id, fd) : await addProduct(fd)
    setSaving(false)
    if (ok) setShowForm(false)
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this product?')) return
    await deleteProduct(id)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold">Products</h1>
          <p className="text-sm text-stone-500">{products.length} products</p>
        </div>
        <Button onClick={openAdd}><Plus className="mr-1 h-4 w-4" /> Add Product</Button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowForm(false)}>
          <div className="w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 dark:bg-stone-900 max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <h2 className="mb-4 font-display text-xl font-semibold">{editing ? 'Edit Product' : 'Add Product'}</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Product Name</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm dark:border-stone-700 dark:bg-stone-900" required />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Category</label>
                <select value={form.categoryId} onChange={e => setForm({...form, categoryId: e.target.value})}
                  className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm dark:border-stone-700 dark:bg-stone-900" required>
                  <option value="">Select category</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="mb-1 block text-sm font-medium">Price (₹)</label>
                  <input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})}
                    className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm dark:border-stone-700 dark:bg-stone-900" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Offer Price (₹)</label>
                  <input type="number" value={form.discountedPrice} onChange={e => setForm({...form, discountedPrice: e.target.value})}
                    className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm dark:border-stone-700 dark:bg-stone-900" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Stock Qty</label>
                  <input type="number" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})}
                    className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm dark:border-stone-700 dark:bg-stone-900" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Description</label>
                <textarea rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                  className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm dark:border-stone-700 dark:bg-stone-900" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Product Images</label>
                <input type="file" multiple accept="image/*" onChange={e => setImageFiles(e.target.files)}
                  className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm dark:border-stone-700" />
                {editing && editing.images.length > 0 && !imageFiles && (
                  <p className="mt-1 text-xs text-stone-400">Current: {editing.images.length} image(s). Upload new to replace.</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Homepage Tags</label>
                <div className="flex flex-wrap gap-4">
                  {(['isFeatured', 'isBestSeller', 'isNewArrival'] as const).map(field => (
                    <label key={field} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="checkbox" checked={form[field]} onChange={e => setForm({...form, [field]: e.target.checked})}
                        className="rounded accent-brand-600" />
                      {field === 'isFeatured' ? '⭐ Featured' : field === 'isBestSeller' ? '🔥 Best Seller' : '🆕 New Arrival'}
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button onClick={handleSave} disabled={saving} className="flex-1">
                  {saving ? 'Saving…' : editing ? 'Update Product' : 'Add Product'}
                </Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-200 dark:border-stone-800">
              <th className="p-4 text-left font-medium">Product</th>
              <th className="p-4 text-left font-medium">Category</th>
              <th className="p-4 text-left font-medium">Price</th>
              <th className="p-4 text-left font-medium">Stock</th>
              <th className="p-4 text-left font-medium">Tags</th>
              <th className="p-4 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-b border-stone-100 dark:border-stone-800">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={product.images[0]?.url || 'https://placehold.co/40x40'} alt="" className="h-10 w-10 rounded-lg object-cover" />
                    <span className="font-medium line-clamp-1">{product.name}</span>
                  </div>
                </td>
                <td className="p-4 text-stone-500">{product.category}</td>
                <td className="p-4">{formatPrice(product.price)}</td>
                <td className="p-4">{product.stock}</td>
                <td className="p-4">
                  <div className="flex gap-1 flex-wrap">
                    {product.isFeatured && <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-700">⭐</span>}
                    {product.isBestSeller && <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-700">🔥</span>}
                    {product.isNewArrival && <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">🆕</span>}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(product)} className="rounded-lg p-1.5 hover:bg-stone-100 dark:hover:bg-stone-800"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => handleDelete(product.id)} className="rounded-lg p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && <p className="p-8 text-center text-stone-400">No products. Click "Add Product" to get started.</p>}
      </div>
    </div>
  )
}
