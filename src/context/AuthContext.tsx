import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import type { User } from '../types'
import { useToast } from './ToastContext'
import api from '../services/api'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isAdmin: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (data: { name: string; email: string; mobile: string; password: string }) => Promise<boolean>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { addToast } = useToast()
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('hibah-user')
      return saved ? JSON.parse(saved) : null
    } catch { return null }
  })

  useEffect(() => {
    if (user) localStorage.setItem('hibah-user', JSON.stringify(user))
    else localStorage.removeItem('hibah-user')
  }, [user])

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const data = response.data;
      setUser({
        id: data._id,
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        address: data.address,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        isAdmin: data.role === 'Admin',
        role: data.role,
        token: data.token
      } as any);
      addToast('Welcome back!')
      return true
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Login failed', 'error')
      return false
    }
  }, [addToast])

  const register = useCallback(async (data: { name: string; email: string; mobile: string; password: string }) => {
    try {
      const response = await api.post('/auth/register', data);
      const resData = response.data;
      setUser({
        id: resData._id,
        name: resData.name,
        email: resData.email,
        mobile: resData.mobile,
        isAdmin: resData.role === 'Admin',
        role: resData.role,
        token: resData.token
      } as any);
      addToast('Account created successfully!')
      return true
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Registration failed', 'error')
      return false
    }
  }, [addToast])

  const logout = useCallback(() => {
    setUser(null)
    addToast('Logged out successfully', 'info')
  }, [addToast])

  const updateProfile = useCallback(async (userData: Partial<User>) => {
    try {
      const { data } = await api.put('/auth/profile', userData)
      setUser((prev: any) => prev ? {
        ...prev,
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        address: data.address,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        token: data.token || prev.token
      } : null)
      addToast('Profile updated successfully!')
      return true
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Failed to update profile', 'error')
      return false
    }
  }, [addToast])

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'Admin',
      login,
      register,
      logout,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
