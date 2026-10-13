export default function CodeBlock({ code, lang = 'js' }) {
  return (
    <pre className="overflow-x-auto border border-line border-l-4 border-l-gold bg-elevated p-4 font-mono text-[13px] leading-relaxed text-ink">
      <span className="mb-2 block text-[10px] tracking-[0.18em] text-gold">{lang.toUpperCase()}</span>
      <code>{code}</code>
    </pre>
  )
}
