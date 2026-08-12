import { NavLink, Outlet, Link, Navigate } from 'react-router-dom'
import { LayoutDashboard, Package, Users, Megaphone, Mail, LogOut } from 'lucide-react'
import { useAuth } from '../../context'
import ToastContainer from '../ui/ToastContainer'

const adminLinks = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/banner', label: 'Banners', icon: Megaphone },
  { to: '/admin/messages', label: 'Messages', icon: Mail },
  { to: '/admin/users', label: 'Users', icon: Users },
]

export default function AdminLayout() {
  const { isAdmin, isAuthenticated, logout } = useAuth()

  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (!isAdmin) return <Navigate to="/" replace />

  return (
    <div className="flex min-h-screen bg-stone-100 dark:bg-stone-950">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900 lg:flex">
        <div className="flex items-center gap-3 border-b border-stone-200 p-6 dark:border-stone-800">
          <img src="/logo.png" alt="Hibah" className="h-10 w-10 rounded-full" />
          <div>
            <p className="font-display text-sm font-semibold">Admin Panel</p>
            <p className="text-xs text-stone-500">Hibah Mehendi Store</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {adminLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-900/20 ${isActive ? 'bg-brand-100 text-brand-800 dark:bg-brand-900/30 dark:text-brand-200' : 'text-stone-600 dark:text-stone-300'}`
              }>
              <link.icon className="h-4 w-4" />
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-stone-200 p-4 dark:border-stone-800 space-y-2">
          <Link to="/" className="flex items-center gap-2 px-4 py-2 text-xs text-stone-500 hover:text-brand-600">
            ← Back to Store
          </Link>
          <button onClick={logout}
            className="flex w-full items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 overflow-auto">
        <div className="border-b border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900 lg:hidden">
          <div className="flex gap-2 overflow-x-auto">
            {adminLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end}
                className={({ isActive }) => `shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium ${isActive ? 'bg-brand-100 text-brand-800 dark:bg-brand-900/30' : 'bg-stone-100 dark:bg-stone-800'}`}>
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
