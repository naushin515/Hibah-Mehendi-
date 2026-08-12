import { useState } from 'react'
import { Phone, Mail, Instagram, MessageCircle, Send, CheckCircle } from 'lucide-react'
import api from '../services/api'
import Button from '../components/ui/Button'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', mobile: '', subject: 'General Enquiry', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await api.post('/messages', form)
      setSent(true)
      setForm({ name: '', email: '', mobile: '', subject: 'General Enquiry', message: '' })
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-app py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-display text-3xl font-bold">Contact Us</h1>
        <p className="mt-2 text-stone-500">We'd love to hear from you. Send a message or reach us directly on WhatsApp.</p>

        <div className="mt-10 grid gap-10 lg:grid-cols-5">
          {/* Contact info */}
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl bg-brand-50 p-6 dark:bg-brand-900/10">
              <h2 className="font-semibold">Fastest Response</h2>
              <a href="https://wa.me/918320430258" target="_blank" rel="noopener noreferrer"
                className="mt-3 flex items-center gap-3 rounded-xl bg-green-600 px-4 py-3 text-white hover:bg-green-700">
                <MessageCircle className="h-5 w-5" />
                <span className="font-medium">Chat on WhatsApp</span>
              </a>
              <p className="mt-2 text-xs text-stone-500">We typically reply within 30 minutes on WhatsApp</p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 dark:bg-stone-800">
                  <Phone className="h-4 w-4 text-brand-600" />
                </div>
                <div>
                  <p className="font-medium">Phone / WhatsApp</p>
                  <p className="text-stone-500">+91 83204 30258</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 dark:bg-stone-800">
                  <Mail className="h-4 w-4 text-brand-600" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-stone-500">hibah.mehendi@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 dark:bg-stone-800">
                  <Instagram className="h-4 w-4 text-brand-600" />
                </div>
                <div>
                  <p className="font-medium">Instagram</p>
                  <a href="https://www.instagram.com/hibah_mehendi_art" target="_blank" rel="noopener noreferrer"
                    className="text-brand-600 hover:underline">@hibah_mehendi_art</a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-green-200 bg-green-50 p-12 text-center dark:border-green-800 dark:bg-green-900/10">
                <CheckCircle className="h-16 w-16 text-green-500" />
                <h2 className="mt-4 font-display text-xl font-semibold">Message Sent!</h2>
                <p className="mt-2 text-stone-500">We'll get back to you soon. For faster response, WhatsApp us directly.</p>
                <button onClick={() => setSent(false)} className="mt-6 text-sm text-brand-600 hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
                <h2 className="font-display text-lg font-semibold">Send a Message</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Your Name</label>
                    <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                      className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm dark:border-stone-700 dark:bg-stone-900" placeholder="Ayesha Khan" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Mobile (optional)</label>
                    <input value={form.mobile} onChange={e => setForm({...form, mobile: e.target.value})}
                      className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm dark:border-stone-700 dark:bg-stone-900" placeholder="9876543210" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Email</label>
                  <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm dark:border-stone-700 dark:bg-stone-900" placeholder="you@email.com" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Subject</label>
                  <select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}
                    className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm dark:border-stone-700 dark:bg-stone-900">
                    <option>General Enquiry</option>
                    <option>Product Question</option>
                    <option>Order Related</option>
                    <option>Bulk Order</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Message</label>
                  <textarea required rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                    className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm dark:border-stone-700 dark:bg-stone-900" placeholder="Tell us what you need..." />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? 'Sending…' : <><Send className="mr-2 h-4 w-4" />Send Message</>}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
