import { useState, useEffect } from 'react'
import { Mail, MailOpen, Trash2, MessageCircle } from 'lucide-react'
import api from '../../services/api'
import { useToast } from '../../context'

interface Message {
  _id: string
  name: string
  email: string
  mobile?: string
  subject?: string
  message: string
  isRead: boolean
  createdAt: string
}

export default function MessageInbox() {
  const [messages, setMessages] = useState<Message[]>([])
  const [selected, setSelected] = useState<Message | null>(null)
  const [loading, setLoading] = useState(true)
  const { addToast } = useToast()

  const fetchMessages = async () => {
    try {
      const { data } = await api.get('/messages')
      setMessages(data)
    } catch {
      addToast('Failed to load messages', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchMessages() }, [])

  const handleOpen = async (msg: Message) => {
    setSelected(msg)
    if (!msg.isRead) {
      await api.put(`/messages/${msg._id}/read`)
      setMessages(prev => prev.map(m => m._id === msg._id ? { ...m, isRead: true } : m))
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this message?')) return
    await api.delete(`/messages/${id}`)
    setMessages(prev => prev.filter(m => m._id !== id))
    if (selected?._id === id) setSelected(null)
    addToast('Message deleted', 'info')
  }

  const unreadCount = messages.filter(m => !m.isRead).length

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold">Message Inbox</h1>
        <p className="text-sm text-stone-500">
          {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}` : 'All messages read'}
        </p>
      </div>

      {loading ? (
        <p className="text-stone-400">Loading messages...</p>
      ) : messages.length === 0 ? (
        <div className="rounded-2xl border border-stone-200 p-12 text-center dark:border-stone-800">
          <Mail className="mx-auto h-12 w-12 text-stone-300" />
          <p className="mt-4 text-stone-400">No messages yet</p>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-5">
          {/* Message list */}
          <div className="space-y-2 lg:col-span-2">
            {messages.map((msg) => (
              <div
                key={msg._id}
                onClick={() => handleOpen(msg)}
                className={`cursor-pointer rounded-xl border p-4 transition-colors ${
                  selected?._id === msg._id
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/10'
                    : 'border-stone-200 bg-white hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {msg.isRead
                      ? <MailOpen className="h-4 w-4 shrink-0 text-stone-400" />
                      : <Mail className="h-4 w-4 shrink-0 text-brand-600" />
                    }
                    <div>
                      <p className={`text-sm ${!msg.isRead ? 'font-semibold' : 'font-medium'}`}>{msg.name}</p>
                      <p className="text-xs text-stone-500">{msg.email}</p>
                    </div>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); handleDelete(msg._id) }}
                    className="text-red-400 hover:text-red-600" aria-label="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-2 line-clamp-2 text-xs text-stone-500">{msg.message}</p>
                <p className="mt-1 text-xs text-stone-400">{new Date(msg.createdAt).toLocaleDateString('en-IN')}</p>
              </div>
            ))}
          </div>

          {/* Message detail */}
          <div className="lg:col-span-3">
            {selected ? (
              <div className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">{selected.name}</h2>
                    <p className="text-sm text-stone-500">{selected.email}</p>
                    {selected.mobile && <p className="text-sm text-stone-500">📱 {selected.mobile}</p>}
                    {selected.subject && <p className="mt-1 text-sm font-medium">{selected.subject}</p>}
                  </div>
                  <p className="text-xs text-stone-400">{new Date(selected.createdAt).toLocaleString('en-IN')}</p>
                </div>
                <div className="mt-4 rounded-xl bg-stone-50 p-4 dark:bg-stone-800">
                  <p className="whitespace-pre-wrap text-sm text-stone-700 dark:text-stone-300">{selected.message}</p>
                </div>
                <div className="mt-4 flex gap-3">
                  <a
                    href={`https://wa.me/91${selected.mobile?.replace(/\D/g, '')}?text=Hi ${selected.name}! Thank you for contacting Hibah Mehendi Store.`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                  >
                    <MessageCircle className="h-4 w-4" /> Reply on WhatsApp
                  </a>
                  <a href={`mailto:${selected.email}`}
                    className="flex items-center gap-2 rounded-xl border border-stone-200 px-4 py-2 text-sm font-medium hover:bg-stone-50 dark:border-stone-700">
                    <Mail className="h-4 w-4" /> Reply via Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-stone-200 p-12 text-center dark:border-stone-800">
                <p className="text-stone-400">Select a message to read</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
