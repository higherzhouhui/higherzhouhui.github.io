import Reveal from '../motion/Reveal.jsx'
import CodeBlock from './CodeBlock.jsx'

function pad(index) {
  return String(index + 1).padStart(2, '0')
}

function Block({ block }) {
  if (typeof block === 'string') {
    return <p className="text-[15px] leading-8 text-ink/90">{block}</p>
  }
  if (block.type === 'p') return <p className="text-[15px] leading-8 text-ink/90">{block.text}</p>
  if (block.type === 'h') {
    return <h3 className="mt-6 font-display text-2xl font-bold text-gold">{block.text}</h3>
  }
  if (block.type === 'ul' || block.type === 'ol') {
    const List = block.type === 'ol' ? 'ol' : 'ul'
    return (
      <List className={`marker:text-gold space-y-2 pl-5 text-[15px] leading-7 text-ink/90 ${block.type === 'ol' ? 'list-decimal' : 'list-disc'}`}>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </List>
    )
  }
  if (block.type === 'code') return <CodeBlock code={block.code} lang={block.lang} />
  if (block.type === 'callout') {
    return (
      <aside className="border-l-2 border-gold px-4 py-1 text-sm leading-7 text-ink">{block.text}</aside>
    )
  }
  if (block.type === 'link') {
    return (
      <a href={block.href} target="_blank" rel="noreferrer" className="link-draw text-gold">
        {block.text}
      </a>
    )
  }
  return null
}

export default function Section({ section, index = 0 }) {
  return (
    <Reveal>
      <article id={section.id} className="scroll-mt-28 space-y-4 border-b border-line py-10 last:border-b-0">
        <p className="font-mono text-[11px] text-gold">{pad(index)}</p>
        <h2 className="font-display text-3xl font-bold leading-tight text-ink md:text-5xl">{section.title}</h2>
        {section.blocks.map((block, blockIndex) => (
          <Block key={blockIndex} block={block} />
        ))}
      </article>
    </Reveal>
  )
}
