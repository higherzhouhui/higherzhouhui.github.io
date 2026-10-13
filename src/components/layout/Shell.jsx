import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ScrollProgress from '../motion/ScrollProgress.jsx'
import Atmosphere from './Atmosphere.jsx'
import Footer from './Footer.jsx'
import Header from './Header.jsx'

export default function Shell({ children }) {
  const location = useLocation()
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (!location.hash) return
    const id = decodeURIComponent(location.hash.slice(1))
    const timer = window.setTimeout(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      document.getElementById(id)?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start',
      })
    }, 80)
    return () => window.clearTimeout(timer)
  }, [location.hash, location.pathname])

  return (
    <div className="relative min-h-screen bg-page text-ink">
      <ScrollProgress />
      <Atmosphere />
      <Header />
      <main className="mx-auto w-full max-w-[90rem] px-5 py-8 md:px-8 md:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0, y: -10 }}
            transition={reduce ? { duration: 0 } : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
