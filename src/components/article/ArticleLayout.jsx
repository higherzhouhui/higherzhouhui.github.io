import Section from './Section.jsx'
import Toc from './Toc.jsx'

export default function ArticleLayout({ page }) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">{page.kicker}</p>
      <h1 className="mt-3 max-w-5xl text-balance font-display text-[clamp(2.8rem,6.2vw,5rem)] font-bold leading-[0.95]">
        {page.title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-dim">{page.lead}</p>
      <div className="mt-12 grid min-w-0 gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
        <Toc sections={page.sections} />
        <div className="min-w-0">
          {page.sections.map((section, index) => (
            <Section key={section.id} section={section} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
