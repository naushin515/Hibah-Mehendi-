import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Camera } from 'lucide-react'
import { useAuth } from '../context'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

export default function ProfilePage() {
  const { user, isAuthenticated, updateProfile } = useAuth()
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    pincode: user?.pincode || '',
  })

  if (!isAuthenticated) return <Navigate to="/login" replace />

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile(form)
  }

  return (
    <div className="container-app py-8">
      <h1 className="font-display text-3xl font-bold">My Profile</h1>
      <div className="mt-8 max-w-2xl">
        <div className="mb-8 flex items-center gap-6">
          <div className="relative">
            <img src={user?.avatar || '/logo.png'} alt="Profile" className="h-24 w-24 rounded-full object-cover" />
            <button className="absolute bottom-0 right-0 rounded-full bg-brand-600 p-1.5 text-white" aria-label="Change photo">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div>
            <p className="text-lg font-semibold">{user?.name}</p>
            <p className="text-sm text-stone-500">{user?.email}</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <Input label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Input label="Mobile Number" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} />
          <Input label="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          <div className="grid gap-4 sm:grid-cols-3">
            <Input label="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            <Input label="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
            <Input label="Pincode" value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} />
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </div>
    </div>
  )
}
