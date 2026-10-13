export default function CodeBlock({ code, lang = 'js' }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-line bg-elevated p-4 font-mono text-[13px] leading-relaxed text-accent">
      <span className="mb-2 block text-[10px] tracking-[0.2em] text-dim">{lang.toUpperCase()}</span>
      <code>{code}</code>
    </pre>
  )
}
