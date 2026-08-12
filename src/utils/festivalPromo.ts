export type PromoType = 'festival' | 'wedding' | null

export function getActivePromo(): PromoType {
  const now = new Date()
  const month = now.getMonth() + 1
  const day = now.getDate()

  if ((month === 10 && day >= 15) || (month === 11 && day <= 15)) return 'festival'
  if ([11, 12, 1, 2].includes(month)) return 'wedding'
  return null
}

export function getPromoLabel(): string | null {
  const promo = getActivePromo()
  if (promo === 'festival') return 'Festival Offer — Special Prices!'
  if (promo === 'wedding') return 'Wedding Season Sale — Up to 15% Off!'
  return null
}

export function getPromoBannerText(): { title: string; subtitle: string } | null {
  const promo = getActivePromo()
  if (promo === 'festival') {
    return { title: 'Festival Special Offers', subtitle: 'Celebrate with chemical-free henna at exclusive prices' }
  }
  if (promo === 'wedding') {
    return { title: 'Wedding Season Collection', subtitle: 'Bridal-ready henna products with special wedding season pricing' }
  }
  return null
}
