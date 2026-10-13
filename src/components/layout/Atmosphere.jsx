import { useEffect, useState } from 'react'

const DOTS = Array.from({ length: 28 }, (_, i) => ({
  left: `${(i * 37 + 11) % 97}%`,
  top: `${(i * 53 + 7) % 93}%`,
  size: 1 + (i % 3),
  delay: `${(i % 9) * 0.45}s`,
  duration: `${8 + (i % 6)}s`,
}))

export default function Atmosphere() {
  const [pointer, setPointer] = useState({ x: 50, y: 30 })

  useEffect(() => {
    const onMove = (event) => {
      setPointer({
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100,
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse at center, black 35%, transparent 78%)',
        }}
      />
      <div className="atmosphere-stream" />
      <div
        className="absolute h-[28rem] w-[28rem] rounded-full blur-3xl transition-transform duration-700"
        style={{
          background: 'var(--glow)',
          left: `calc(${pointer.x}% - 14rem)`,
          top: `calc(${pointer.y}% - 14rem)`,
        }}
      />
      <div
        className="absolute -left-24 top-10 h-72 w-72 rounded-full blur-3xl"
        style={{ background: 'var(--glow)', animation: 'drift 14s ease-in-out infinite' }}
      />
      <div
        className="absolute -right-10 bottom-10 h-80 w-80 rounded-full blur-3xl"
        style={{ background: 'var(--glow)', animation: 'drift 18s ease-in-out infinite reverse' }}
      />
      {DOTS.map((dot) => (
        <span
          key={`${dot.left}-${dot.top}`}
          className="atmosphere-dot"
          style={{
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
            animationDelay: dot.delay,
            animationDuration: dot.duration,
          }}
        />
      ))}
      <div
        className="absolute inset-x-0 h-24 bg-linear-to-b from-transparent via-gold/20 to-transparent opacity-40"
        style={{ animation: 'scan 9s linear infinite' }}
      />
    </div>
  )
}
