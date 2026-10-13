export default function Atmosphere() {
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
      <div
        className="absolute -left-24 top-10 h-72 w-72 rounded-full blur-3xl"
        style={{ background: 'var(--glow)', animation: 'drift 14s ease-in-out infinite' }}
      />
      <div
        className="absolute -right-10 bottom-10 h-80 w-80 rounded-full blur-3xl"
        style={{ background: 'var(--glow)', animation: 'drift 18s ease-in-out infinite reverse' }}
      />
      <div
        className="absolute inset-x-0 h-24 bg-linear-to-b from-transparent via-gold/20 to-transparent opacity-40"
        style={{ animation: 'scan 9s linear infinite' }}
      />
    </div>
  )
}
