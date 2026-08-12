import { useState, useEffect } from 'react'
import { useBanner } from '../../context'
import { useToast } from '../../context'
import Button from '../../components/ui/Button'

const COLORS = [
  { value: 'green', label: '🟢 Green (Eid / Nature)' },
  { value: 'orange', label: '🟠 Orange (Diwali / Navratri)' },
  { value: 'red', label: '🔴 Red (Sale / Urgent)' },
  { value: 'purple', label: '🟣 Purple (Wedding / Bridal)' },
  { value: 'blue', label: '🔵 Blue (General / Announcement)' },
]

export default function BannerManagement() {
  const { banner, updateTextBanner, updatePosterBanner } = useBanner()
  const { addToast } = useToast()
  const [savingText, setSavingText] = useState(false)
  const [savingPoster, setSavingPoster] = useState(false)
  const [posterFile, setPosterFile] = useState<File | null>(null)
  const [posterPreview, setPosterPreview] = useState<string>('')

  const [textForm, setTextForm] = useState({
    enabled: false,
    message: '',
    color: 'green',
    startDate: '',
    endDate: '',
  })

  const [posterForm, setPosterForm] = useState({
    enabled: false,
    linkTo: '/shop',
  })

  useEffect(() => {
    if (banner) {
      setTextForm({
        enabled: banner.textBanner.enabled,
        message: banner.textBanner.message,
        color: banner.textBanner.color,
        startDate: banner.textBanner.startDate ? banner.textBanner.startDate.slice(0, 10) : '',
        endDate: banner.textBanner.endDate ? banner.textBanner.endDate.slice(0, 10) : '',
      })
      setPosterForm({
        enabled: banner.posterBanner.enabled,
        linkTo: banner.posterBanner.linkTo || '/shop',
      })
      if (banner.posterBanner.imageUrl) setPosterPreview(banner.posterBanner.imageUrl)
    }
  }, [banner])

  const handleTextSave = async () => {
    setSavingText(true)
    const ok = await updateTextBanner({
      enabled: textForm.enabled,
      message: textForm.message,
      color: textForm.color as any,
      startDate: textForm.startDate || null,
      endDate: textForm.endDate || null,
    })
    setSavingText(false)
    addToast(ok ? 'Text banner updated!' : 'Failed to update banner', ok ? 'success' : 'error')
  }

  const handlePosterSave = async () => {
    setSavingPoster(true)
    const formData = new FormData()
    formData.append('enabled', String(posterForm.enabled))
    formData.append('linkTo', posterForm.linkTo)
    if (posterFile) formData.append('image', posterFile)
    const ok = await updatePosterBanner(formData)
    setSavingPoster(false)
    addToast(ok ? 'Poster banner updated!' : 'Failed to update poster', ok ? 'success' : 'error')
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPosterFile(file)
    setPosterPreview(URL.createObjectURL(file))
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold">Banner Management</h1>
        <p className="text-sm text-stone-500">Control festive banners and promotional posters shown on the website</p>
      </div>

      {/* Text Banner */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold">📢 Text Banner</h2>
            <p className="text-xs text-stone-500">Shows as a colored strip at the top of every page</p>
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <span>{textForm.enabled ? 'ON' : 'OFF'}</span>
            <div onClick={() => setTextForm(f => ({ ...f, enabled: !f.enabled }))}
              className={`relative h-6 w-11 rounded-full transition-colors ${textForm.enabled ? 'bg-brand-600' : 'bg-stone-300'}`}>
              <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${textForm.enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </div>
          </label>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Message</label>
            <input
              type="text"
              value={textForm.message}
              onChange={(e) => setTextForm(f => ({ ...f, message: e.target.value }))}
              placeholder="🌙 Eid Mubarak! 20% off on all cones this week"
              className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm dark:border-stone-700 dark:bg-stone-900"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Banner Color</label>
            <select
              value={textForm.color}
              onChange={(e) => setTextForm(f => ({ ...f, color: e.target.value }))}
              className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm dark:border-stone-700 dark:bg-stone-900"
            >
              {COLORS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Start Date (optional)</label>
              <input type="date" value={textForm.startDate}
                onChange={(e) => setTextForm(f => ({ ...f, startDate: e.target.value }))}
                className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm dark:border-stone-700 dark:bg-stone-900" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">End Date (optional)</label>
              <input type="date" value={textForm.endDate}
                onChange={(e) => setTextForm(f => ({ ...f, endDate: e.target.value }))}
                className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm dark:border-stone-700 dark:bg-stone-900" />
            </div>
          </div>

          {/* Live Preview */}
          {textForm.message && (
            <div className="overflow-hidden rounded-xl">
              <p className="mb-1 text-xs text-stone-500">Preview:</p>
              <div className={`flex items-center justify-center py-2 text-sm font-medium text-white rounded-lg ${
                { green: 'bg-green-600', orange: 'bg-orange-500', red: 'bg-red-600', purple: 'bg-purple-600', blue: 'bg-blue-600' }[textForm.color]
              }`}>
                {textForm.message}
              </div>
            </div>
          )}

          <Button onClick={handleTextSave} disabled={savingText}>
            {savingText ? 'Saving…' : 'Save Text Banner'}
          </Button>
        </div>
      </div>

      {/* Poster Banner */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold">🖼️ Festive Poster</h2>
            <p className="text-xs text-stone-500">Big image banner shown on homepage. Design your poster on Canva and upload here.</p>
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <span>{posterForm.enabled ? 'ON' : 'OFF'}</span>
            <div onClick={() => setPosterForm(f => ({ ...f, enabled: !f.enabled }))}
              className={`relative h-6 w-11 rounded-full transition-colors ${posterForm.enabled ? 'bg-brand-600' : 'bg-stone-300'}`}>
              <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${posterForm.enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </div>
          </label>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Upload Poster Image</label>
            <p className="mb-2 text-xs text-stone-400">Recommended size: 1200×400px. PNG or JPG. Design on Canva for best results.</p>
            <input type="file" accept="image/*" onChange={handleFileChange}
              className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm dark:border-stone-700" />
          </div>

          {posterPreview && (
            <div className="overflow-hidden rounded-xl">
              <p className="mb-1 text-xs text-stone-500">Current Poster:</p>
              <img src={posterPreview} alt="Poster preview" className="w-full rounded-xl object-cover" style={{ maxHeight: 200 }} />
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium">When clicked, go to:</label>
            <select value={posterForm.linkTo}
              onChange={(e) => setPosterForm(f => ({ ...f, linkTo: e.target.value }))}
              className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm dark:border-stone-700 dark:bg-stone-900">
              <option value="/shop">Shop Page</option>
              <option value="/shop?category=mehendi-cones">Mehendi Cones</option>
              <option value="/shop?category=henna-products">Henna Products</option>
              <option value="/shop?category=after-care-products">After Care Products</option>
              <option value="/shop?category=practice-kits">Practice Kits</option>
            </select>
          </div>

          <Button onClick={handlePosterSave} disabled={savingPoster}>
            {savingPoster ? 'Saving…' : 'Save Poster Banner'}
          </Button>
        </div>
      </div>
    </div>
  )
}
