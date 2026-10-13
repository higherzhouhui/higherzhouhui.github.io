import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Atmosphere from './Atmosphere.jsx'
import Footer from './Footer.jsx'
import Header from './Header.jsx'

export default function Shell({ children }) {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="relative min-h-screen bg-page text-ink">
      <Atmosphere />
      <Header />
      <main className="mx-auto w-full max-w-7xl px-5 py-10">{children}</main>
      <Footer />
    </div>
  )
}
