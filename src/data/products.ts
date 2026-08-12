import type { Product, Review } from '../types'
import { categories } from './categories'

const sampleReviews = (productName: string): Review[] => [
  { id: 'r1', author: 'Aisha K.', rating: 5, comment: `Absolutely love the ${productName}! Chemical-free and gives a beautiful dark stain.`, date: '2026-03-15' },
  { id: 'r2', author: 'Priya M.', rating: 4, comment: 'Great quality product. Fast delivery and excellent packaging.', date: '2026-02-28' },
  { id: 'r3', author: 'Fatima R.', rating: 5, comment: 'Been using Hibah products for months. Highly recommend!', date: '2026-01-10' },
]

const productVariants: Record<string, string[]> = {
  'organic-henna-cones': ['Classic Organic Cone', 'Dark Stain Cone', 'Bridal Special Cone', 'Mini Travel Cone Pack'],
  'organic-henna-powder': ['Rajasthani Henna Powder 100g', 'Sifted Powder 250g', 'Bridal Grade Powder 500g', 'Sample Pack 50g'],
  'hair-mehendi': ['Natural Hair Henna 200g', 'Indigo Mix Hair Color', 'Herbal Hair Mehendi Blend', 'Amla Enriched Hair Henna'],
  'henna-oils': ['Eucalyptus Essential Oil', 'Clove Oil Blend', 'Lavender Henna Oil', 'Tea Tree After-Mix Oil'],
  'after-care-sealant-spray': ['Lemon Sugar Sealant', 'Natural Fixative Spray', 'Bridal Lock Spray'],
  'after-care-oil': ['Coconut After Care Oil', 'Eucalyptus Care Oil', 'Herbal Blend Care Oil'],
  'after-care-balm': ['Shea Butter Henna Balm', 'Beeswax Protection Balm', 'Cooling Aloe Balm'],
  'spatulas': ['Small Spatula Set (5pc)', 'Medium Spatula Pack', 'Large Professional Spatula', 'Complete Spatula Kit'],
  'henna-filter-cloth': ['Fine Mesh Filter (1m)', 'Muslin Cloth', 'Double Layer Filter Pack'],
  'acrylic-practice-hands': ['Left Hand Practice Model', 'Right Hand Practice Model', 'Pair Set with Stand'],
  'mixing-containers': ['500ml Mixing Bowl', '1L Stainless Container', 'Set of 3 Nested Bowls', 'Lidded Mixing Jar'],
  'mehendi-practice-books': ['Beginner Pattern Book', 'Advanced Design Book', 'Bridal Design Collection'],
  'piping-bags': ['Small Piping Bags (50pc)', 'Medium Piping Bags (30pc)', 'Large Piping Bags (20pc)', 'Assorted Size Pack'],
  'dispenser-bottles': ['10ml Precision Bottle', '15ml Applicator Bottle', '30ml Squeeze Bottle', 'Bottle Set with Tips'],
  'spray-bottles': ['50ml Fine Mist Bottle', '100ml Spray Bottle', 'Travel Size 30ml'],
  'cellophane-sheets': ['Roll 10m x 30cm', 'Roll 5m x 20cm', 'Professional Grade Roll'],
  'pre-cut-cellophane-sheets': ['Hand Wrap Pack (50 sheets)', 'Arm Wrap Pack (30 sheets)', 'Bridal Pack (100 sheets)'],
  'roller-bottles': ['10ml Roller Bottle', '15ml Glass Roller', 'Set of 5 Rollers'],
  'henna-practice-kits': ['Starter Practice Kit', 'Professional Artist Kit', 'Bridal Prep Kit', 'Complete Master Kit'],
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function generateImages(name: string, slug: string): Product['images'] {
  const base = encodeURIComponent(name.slice(0, 20))
  return [
    { id: `${slug}-img-1`, url: `https://placehold.co/600x600/f2d9c4/924a28?text=${base}+1`, alt: `${name} - view 1`, isPrimary: true },
    { id: `${slug}-img-2`, url: `https://placehold.co/600x600/e8bf9a/773d24?text=${base}+2`, alt: `${name} - view 2`, isPrimary: false },
    { id: `${slug}-img-3`, url: `https://placehold.co/600x600/f9ede3/623420?text=${base}+3`, alt: `${name} - view 3`, isPrimary: false },
  ]
}

function generateProducts(): Product[] {
  const products: Product[] = []
  let globalIndex = 0

  categories.forEach((cat, catIndex) => {
    const variants = productVariants[cat.slug] || [`${cat.name} Standard`, `${cat.name} `]
    variants.forEach((variantName, i) => {
      globalIndex++
      const slug = `${cat.slug}-${slugify(variantName)}`
      const basePrice = 99 + catIndex * 15 + i * 40
      const price = Math.round(basePrice / 10) * 10 - 1
      products.push({
        id: `prod-${globalIndex}`,
        slug,
        name: `Hibah ${variantName}`,
        category: cat.name,
        categorySlug: cat.slug,
        price,
        compareAtPrice: price + 50,
        festivalPrice: Math.round(price * 0.85),
        images: generateImages(variantName, slug),
        description: `${variantName} from Hibah Mehendi Store. Our chemical-free formula ensures a rich, natural stain without harmful additives. Perfect for professional artists and home use. Each batch is carefully prepared using organic ingredients sourced from trusted suppliers. Suitable for all skin types. Store in a cool, dry place for best results.`,
        shortDescription: `Chemical-free ${variantName.toLowerCase()} for professional results.`,
        rating: 4.2 + (i * 0.2) % 0.8,
        reviewCount: 12 + globalIndex * 3,
        inStock: true,
        stock: 50 + i * 10,
        tags: ['organic', 'chemical-free', cat.slug],
        isFeatured: globalIndex <= 8,
        isBestSeller: globalIndex % 5 === 0,
        isNewArrival: globalIndex > 60,
        popularity: 100 - globalIndex,
        createdAt: new Date(2025, catIndex % 12, (i + 1) * 5).toISOString(),
        reviews: sampleReviews(variantName),
      })
    })
  })

  return products
}

export const products = generateProducts()

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, limit)
}
