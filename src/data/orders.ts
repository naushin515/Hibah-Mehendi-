import type { Order } from '../types'

export const mockOrders: Order[] = [
  {
    id: 'ORD-2026-001',
    userId: 'user-1',
    items: [
      { productId: 'prod-1', name: 'Hibah Classic Organic Cone', image: 'https://placehold.co/80x80/f2d9c4/924a28?text=Cone', price: 149, quantity: 2 },
      { productId: 'prod-5', name: 'Hibah Dark Stain Cone', image: 'https://placehold.co/80x80/e8bf9a/773d24?text=Cone', price: 189, quantity: 1 },
    ],
    total: 487,
    status: 'delivered',
    createdAt: '2026-05-20T10:30:00Z',
    shippingAddress: '42 Rose Garden Lane, Mumbai, Maharashtra 400001',
    trackingId: 'HMS-TRK-784521',
  },
  {
    id: 'ORD-2026-002',
    userId: 'user-1',
    items: [
      { productId: 'prod-10', name: 'Hibah Rajasthani Henna Powder 100g', image: 'https://placehold.co/80x80/f2d9c4/924a28?text=Powder', price: 299, quantity: 1 },
    ],
    total: 349,
    status: 'shipped',
    createdAt: '2026-06-01T14:15:00Z',
    shippingAddress: '42 Rose Garden Lane, Mumbai, Maharashtra 400001',
    trackingId: 'HMS-TRK-912345',
  },
  {
    id: 'ORD-2026-003',
    userId: 'user-1',
    items: [
      { productId: 'prod-70', name: 'Hibah Complete Master Kit', image: 'https://placehold.co/80x80/f9ede3/623420?text=Kit', price: 1299, quantity: 1 },
      { productId: 'prod-20', name: 'Hibah Lemon Sugar Sealant', image: 'https://placehold.co/80x80/d99a6b/ffffff?text=Spray', price: 249, quantity: 2 },
    ],
    total: 1847,
    status: 'processing',
    createdAt: '2026-06-07T09:00:00Z',
    shippingAddress: '42 Rose Garden Lane, Mumbai, Maharashtra 400001',
    trackingId: 'HMS-TRK-456789',
  },
  {
    id: 'ORD-2026-004',
    userId: 'user-2',
    items: [
      { productId: 'prod-3', name: 'Hibah Bridal Special Cone', image: 'https://placehold.co/80x80/c97847/ffffff?text=Bridal', price: 249, quantity: 5 },
    ],
    total: 1295,
    status: 'placed',
    createdAt: '2026-06-08T16:45:00Z',
    shippingAddress: '15 Park Street, Delhi, Delhi 110001',
    trackingId: 'HMS-TRK-321654',
  },
]
