import { motion } from 'framer-motion'
import Section from './Section.jsx'
import Toc from './Toc.jsx'

export default function ArticleLayout({ page }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
      <p className="text-[11px] tracking-[0.32em] text-gold">{page.kicker}</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl leading-tight md:text-6xl">{page.title}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-dim">{page.lead}</p>
      <div className="mt-12 grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
        <Toc sections={page.sections} />
        <div>
          {page.sections.map((section) => (
            <Section key={section.id} section={section} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
