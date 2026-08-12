import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import FestiveBanner from './FestiveBanner'
import ToastContainer from '../ui/ToastContainer'

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Text banner shows on ALL pages, above navbar */}
      <FestiveBanner />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  )
}
