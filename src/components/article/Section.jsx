import Reveal from '../motion/Reveal.jsx'
import CodeBlock from './CodeBlock.jsx'

function Block({ block }) {
  if (typeof block === 'string') {
    return <p className="text-[15px] leading-8 text-ink/90">{block}</p>
  }
  if (block.type === 'p') return <p className="text-[15px] leading-8 text-ink/90">{block.text}</p>
  if (block.type === 'h') {
    return <h3 className="mt-6 font-display text-2xl text-gold">{block.text}</h3>
  }
  if (block.type === 'ul' || block.type === 'ol') {
    const List = block.type === 'ol' ? 'ol' : 'ul'
    return (
      <List className={`space-y-2 text-[15px] leading-7 text-ink/90 ${block.type === 'ol' ? 'list-decimal' : 'list-disc'} pl-5`}>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </List>
    )
  }
  if (block.type === 'code') return <CodeBlock code={block.code} lang={block.lang} />
  if (block.type === 'callout') {
    return (
      <aside className="rounded-xl border border-gold/30 bg-gold/10 px-4 py-3 text-sm leading-7 text-accent">
        {block.text}
      </aside>
    )
  }
  if (block.type === 'link') {
    return (
      <a href={block.href} target="_blank" rel="noreferrer" className="text-gold underline-offset-4 hover:underline">
        {block.text}
      </a>
    )
  }
  return null
}

export default function Section({ section }) {
  return (
    <Reveal>
      <article id={section.id} className="scroll-mt-28 space-y-4 border-b border-line/70 py-10 last:border-b-0">
        <h2 className="font-display text-3xl text-ink md:text-4xl">{section.title}</h2>
        <div className="h-px w-16 bg-gold/70" />
        {section.blocks.map((block, index) => (
          <Block key={index} block={block} />
        ))}
      </article>
    </Reveal>
  )
}
