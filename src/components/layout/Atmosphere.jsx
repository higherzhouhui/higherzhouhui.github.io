export default function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: 'linear-gradient(var(--line) 1px, transparent 1px)',
          backgroundSize: '100% 5.5rem',
          maskImage: 'linear-gradient(to bottom, black 0%, transparent 72%)',
        }}
      />
      <div
        className="watermark-drift absolute -left-24 top-[-6rem] h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ background: 'var(--glow)' }}
      />
      <div
        className="watermark-drift absolute -right-16 bottom-[-8rem] h-[24rem] w-[24rem] rounded-full blur-3xl"
        style={{ background: 'var(--glow)', animationDelay: '-8s' }}
      />
    </div>
  )
}
