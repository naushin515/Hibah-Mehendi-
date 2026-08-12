import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', mobile: '', password: '', confirmPassword: '' })
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) return
    register({ name: form.name, email: form.email, mobile: form.mobile, password: form.password })
    navigate('/')
  }

  const handleGoogle = () => {
    register({ name: 'Google User', email: 'google@hibah.com', mobile: '', password: '' })
    navigate('/')
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center">
          <img src="/logo.png" alt="Hibah Mehendi Store" className="mx-auto h-20 w-20 rounded-full" />
          <h1 className="mt-4 font-display text-2xl font-bold">Create Account</h1>
          <p className="mt-1 text-sm text-stone-500">Join the Hibah Mehendi family</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <Input label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <Input label="Mobile Number" type="tel" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} placeholder="10-digit mobile" required />
          <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <Input label="Confirm Password" type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} required />
          <Button type="submit" className="w-full" size="lg">Create Account</Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-stone-200 dark:border-stone-700" /></div>
          <div className="relative flex justify-center text-xs"><span className="bg-surface-muted px-2 text-stone-500 dark:bg-surface-dark">or</span></div>
        </div>

        <Button variant="outline" className="w-full" onClick={handleGoogle}>Sign up with Google</Button>

        <p className="mt-6 text-center text-sm text-stone-500">
          Already have an account? <Link to="/login" className="font-medium text-brand-600 hover:text-brand-700">Sign In</Link>
        </p>
      </div>
    </div>
  )
}
