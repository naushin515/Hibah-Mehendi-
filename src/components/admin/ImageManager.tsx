import { useState, useRef } from 'react'
import { Upload, Trash2, Image as ImageIcon } from 'lucide-react'
import type { ProductImage } from '../../types'
import { uploadProductImage } from '../../services/cloudinary'
import { useToast } from '../../context'

interface ImageManagerProps {
  images: ProductImage[]
  onChange: (images: ProductImage[]) => void
}

export default function ImageManager({ images, onChange }: ImageManagerProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const { addToast } = useToast()

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const result = await uploadProductImage(file)
      const newImage: ProductImage = {
        id: `img-${Date.now()}`,
        url: result.secure_url,
        publicId: result.public_id,
        alt: file.name,
        isPrimary: images.length === 0,
      }
      onChange([...images, newImage])
      addToast('Image uploaded successfully!')
    } catch {
      addToast('Upload failed', 'error')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const handleDelete = (id: string) => {
    onChange(images.filter((img) => img.id !== id))
    addToast('Image removed', 'info')
  }

  const setPrimary = (id: string) => {
    onChange(images.map((img) => ({ ...img, isPrimary: img.id === id })))
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((img) => (
          <div key={img.id} className="group relative overflow-hidden rounded-xl border border-stone-200 dark:border-stone-700">
            <img src={img.url} alt={img.alt} className="aspect-square w-full object-cover" />
            {img.isPrimary && (
              <span className="absolute left-2 top-2 rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-bold text-white">Primary</span>
            )}
            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              {!img.isPrimary && (
                <button onClick={() => setPrimary(img.id)} className="rounded-lg bg-white px-2 py-1 text-xs font-medium">Set Primary</button>
              )}
              <button onClick={() => handleDelete(img.id)} className="rounded-lg bg-red-600 p-1.5 text-white" aria-label="Delete image">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
            {img.publicId && (
              <p className="truncate px-2 py-1 text-[10px] text-stone-500">{img.publicId}</p>
            )}
          </div>
        ))}
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-stone-300 text-stone-400 transition-colors hover:border-brand-400 hover:text-brand-600 dark:border-stone-600"
        >
          {uploading ? (
            <span className="text-xs">Uploading...</span>
          ) : (
            <>
              <Upload className="h-6 w-6" />
              <span className="text-xs font-medium">Upload Image</span>
            </>
          )}
        </button>
      </div>
      <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
      <p className="flex items-center gap-1 text-xs text-stone-500">
        <ImageIcon className="h-3 w-3" /> Cloudinary integration ready — images will upload to CDN in Phase 2
      </p>
    </div>
  )
}
