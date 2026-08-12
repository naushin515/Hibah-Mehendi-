import { useState } from 'react'
import { X } from 'lucide-react'
import { useBanner } from '../../context'

const COLOR_CLASSES: Record<string, string> = {
  green: 'bg-green-600 text-white',
  orange: 'bg-orange-500 text-white',
  red: 'bg-red-600 text-white',
  purple: 'bg-purple-600 text-white',
  blue: 'bg-blue-600 text-white',
}

export default function FestiveBanner() {
  const { banner } = useBanner()
  const [dismissed, setDismissed] = useState(false)

  if (!banner || !banner.textBanner.enabled || dismissed) return null

  const { message, color, startDate, endDate } = banner.textBanner
  if (!message) return null

  // Check date range
  const now = new Date()
  if (startDate && new Date(startDate) > now) return null
  if (endDate && new Date(endDate) < now) return null

  return (
    <div className={`relative flex items-center justify-center px-10 py-2 text-center text-sm font-medium ${COLOR_CLASSES[color] || COLOR_CLASSES.green}`}>
      <span>{message}</span>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 opacity-80 hover:opacity-100"
        aria-label="Dismiss banner"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
