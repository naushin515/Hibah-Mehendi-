import { Share2, Check } from 'lucide-react'
import { useState } from 'react'
import { shareProduct } from '../../services/cloudinary'
import { useToast } from '../../context'
import Button from '../ui/Button'

interface ShareProductProps {
  title: string
  slug: string
}

export default function ShareProduct({ title, slug }: ShareProductProps) {
  const [copied, setCopied] = useState(false)
  const { addToast } = useToast()
  const url = `${window.location.origin}/product/${slug}`

  const handleShare = async () => {
    const shared = await shareProduct(title, url)
    if (shared) addToast('Product link shared!')
    else {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      addToast('Link copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleShare}>
      {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
      Share
    </Button>
  )
}
