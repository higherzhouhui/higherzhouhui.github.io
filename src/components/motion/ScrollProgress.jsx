import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 })

  if (reduce) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-50 h-[3px] origin-left bg-gold"
      style={{ scaleX, width: '100%' }}
    />
  )
}
