const WHATSAPP_NUMBER = '918320430258' // India country code + number
const INSTAGRAM_URL = 'https://www.instagram.com/hibah_mehendi_art'

export { INSTAGRAM_URL }

export function buildSingleProductWhatsAppUrl(productName: string, price: number, qty = 1): string {
  const total = price * qty
  const msg = [
    `Hi Hibah Mehendi! 🌿`,
    ``,
    `I want to order:`,
    `📦 *${productName}* x${qty} — ₹${total}`,
    ``,
    `Please confirm availability and share payment details.`,
  ].join('\n')
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}

export function buildCartWhatsAppUrl(
  items: Array<{ name: string; price: number; quantity: number }>
): string {
  const lines = items.map((item, i) => `${i + 1}. *${item.name}* x${item.quantity} — ₹${item.price * item.quantity}`)
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const shipping = subtotal >= 999 ? 0 : 49
  const total = subtotal + shipping

  const msg = [
    `Hi Hibah Mehendi! 🌿`,
    ``,
    `I want to order the following:`,
    ``,
    ...lines,
    ``,
    `─────────────────`,
    `Subtotal: ₹${subtotal}`,
    `Delivery: ${shipping === 0 ? 'Free 🎉' : `₹${shipping}`}`,
    `*Total: ₹${total}*`,
    ``,
    `Please confirm availability and share payment details.`,
  ].join('\n')
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}
