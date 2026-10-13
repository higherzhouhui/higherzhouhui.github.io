import { motion, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/motion/Reveal.jsx'
import { getHome } from '../content/index.js'
import { useI18n } from '../i18n/I18nProvider.jsx'

const CARD_LAYOUT = {
  notes: 'md:col-span-4',
  html: 'md:col-span-2 md:mt-16',
  js: 'md:col-span-3',
  react: 'md:col-span-3 md:-mt-8',
  vue: 'md:col-span-2',
  engineering: 'md:col-span-2 md:mt-10',
  diary: 'md:col-span-2',
}

function pad(index) {
  return String(index + 1).padStart(2, '0')
}

function Marquee({ items }) {
  const loop = [...items, ...items]
  return (
    <div className="marquee border-y border-line py-4">
      <div className="marquee-track items-center">
        {loop.map((item, index) => (
          <span
            key={`${item}-${index}`}
            aria-hidden={index >= items.length ? true : undefined}
            className="px-4 font-display text-2xl md:text-3xl"
          >
            {item}
            <span className="px-4 text-gold">/</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const { lang, t } = useI18n()
  const home = getHome(lang)
  const reduce = useReducedMotion()

  useEffect(() => {
    document.title = t.brand
  }, [t.brand])

  return (
    <div className="space-y-24 md:space-y-32">
      <motion.section
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduce ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden"
      >
        <span
          aria-hidden
          className="watermark-drift pointer-events-none absolute -right-[8vw] -top-8 select-none font-display text-[38vw] leading-none text-ink/[0.07] md:text-[26vw]"
        >
          风
        </span>
        <div className="relative flex items-start justify-between gap-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">{t.heroKicker}</p>
          <span className="grid h-16 w-16 shrink-0 rotate-[-8deg] place-items-center border border-gold text-center font-display text-sm leading-tight text-gold">
            重庆
            <br />
            现场
          </span>
        </div>
        <h1 className="relative mt-6 max-w-[12ch] font-display text-[clamp(3.4rem,8.4vw,7.5rem)] font-bold leading-[0.9] tracking-tight">
          {t.heroTitle}
          <span className={`mt-1 block text-gold ${lang === 'en' ? 'font-latin text-[0.78em] font-normal italic' : ''}`}>
            {t.heroTitleEm}
          </span>
        </h1>
        <div className="relative mt-10 grid items-end gap-8 md:grid-cols-[minmax(0,1.15fr)_minmax(14rem,0.7fr)]">
          <p className="max-w-xl text-lg leading-8 text-dim md:text-xl md:leading-9">{t.heroLead}</p>
          <div className="flex flex-col items-start gap-2">
            {[
              [t.ctaNotes, '/notes'],
              [t.ctaLab, '/lab'],
              [t.ctaDiary, '/diary'],
            ].map(([label, to]) => (
              <Link key={to} to={to} className="group inline-flex items-baseline gap-3 font-display text-3xl leading-tight md:text-4xl">
                <span className="link-draw">{label}</span>
                <span aria-hidden className="font-mono text-sm text-gold transition duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
        <dl className="relative mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-6 md:grid-cols-4">
          {home.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="font-latin text-5xl leading-none text-ink md:text-6xl">{stat.value}</dt>
              <dd className="mt-2 text-sm text-dim">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </motion.section>

      <Marquee items={home.tags} />

      <section>
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-display text-4xl font-bold leading-none md:text-6xl">{t.sections}</h2>
          <span className="font-mono text-xs text-dim">02</span>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:items-start md:gap-5">
          {home.cards.map((card, index) => (
            <Reveal key={card.key} delay={index * 0.04} className={CARD_LAYOUT[card.key] || ''}>
              <Link
                to={card.to}
                className={`group flex h-full min-h-44 flex-col justify-between border border-line p-5 transition duration-300 hover:bg-ink hover:text-page md:p-6 ${
                  card.key === 'diary' ? 'border-l-4 border-l-gold' : ''
                } ${card.key === 'notes' ? 'md:min-h-72' : ''}`}
              >
                <div className="flex items-center justify-between font-mono text-[11px] text-gold">
                  <span>{pad(index)}</span>
                  <span className="tracking-[0.14em]">{card.tag}</span>
                </div>
                <div className="mt-8">
                  <h3 className={`font-display font-bold leading-tight ${card.key === 'notes' ? 'text-4xl md:text-5xl' : 'text-3xl'}`}>
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-dim group-hover:text-page group-hover:opacity-80">{card.desc}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-2 flex items-end justify-between gap-4">
          <h2 className="font-display text-4xl font-bold leading-none md:text-6xl">{t.notesFeed}</h2>
          <span className="font-mono text-xs text-dim">03</span>
        </div>
        <div>
          {home.notes.map((note, index) => (
            <Link
              key={note.to}
              to={note.to}
              className="group grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-baseline gap-3 border-b border-line py-5"
            >
              <span className="font-mono text-xs text-gold">{pad(index)}</span>
              <span className="min-w-0">
                <span className="mb-1 block font-mono text-[10px] tracking-[0.16em] text-dim">{note.tag}</span>
                <span className="block font-display text-2xl font-bold leading-tight transition group-hover:text-gold md:text-3xl">
                  {note.title}
                </span>
                <span className="mt-1 block text-sm leading-6 text-dim">{note.desc}</span>
              </span>
              <span aria-hidden className="font-mono text-sm text-gold transition duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-2 flex items-end justify-between gap-4">
          <h2 className="font-display text-4xl font-bold leading-none md:text-6xl">{t.timeline}</h2>
          <span className="font-mono text-xs text-dim">04</span>
        </div>
        <ol>
          {home.timeline.map((item) => (
            <li key={item.time} className="grid gap-3 border-t border-line py-7 md:grid-cols-[11rem_minmax(0,0.9fr)_minmax(0,1.2fr)] md:gap-8">
              <p className="font-mono text-sm text-gold">{item.time}</p>
              <div>
                <p className="font-display text-3xl font-bold leading-tight">{item.company}</p>
                <p className="mt-1 text-sm text-dim">{item.pos}</p>
              </div>
              <ul className="space-y-1 text-sm leading-7">
                {item.items.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid items-start gap-12 lg:grid-cols-[1.45fr_0.75fr]">
        <Reveal>
          <p className="font-mono text-xs text-gold">05 — {t.about}</p>
          <blockquote className="mt-4 font-display text-[clamp(1.8rem,4vw,3.4rem)] font-bold leading-[1.2]">
            {home.quote}
          </blockquote>
          <p className="mt-6 max-w-xl text-base leading-8 text-dim">{home.quoteAlt}</p>
          <p className="mt-8 font-mono text-xs tracking-[0.14em] text-gold">{home.role}</p>
          <p className="mt-3 text-sm">{home.bio.school}</p>
          <p className="mt-2 max-w-xl text-sm leading-7 text-dim">{home.bio.work}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-display text-2xl">
            <a href={home.bio.github} target="_blank" rel="noreferrer" className="link-draw">
              {home.bio.githubName}
            </a>
            <a href={home.bio.telegram} target="_blank" rel="noreferrer" className="link-draw">
              Telegram
            </a>
            <a href={home.bio.site} target="_blank" rel="noreferrer" className="link-draw">
              jizaoji.top
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="font-mono text-xs text-gold">{t.contact}</p>
          <ul className="mt-4">
            {home.contact.map((item) => (
              <li key={item.label} className="flex items-baseline justify-between gap-4 border-b border-line py-3">
                <span className="text-sm text-dim">{item.label}</span>
                <span className="text-right font-display text-xl">{item.value}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section>
        <div className="mb-2 flex items-end justify-between gap-4">
          <h2 className="font-display text-4xl font-bold leading-none md:text-6xl">{t.projects}</h2>
          <span className="font-mono text-xs text-dim">06</span>
        </div>
        <div>
          {home.projects.map((project) => (
            <a
              key={project.href + project.name}
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-baseline justify-between gap-4 border-b border-line px-1 py-4 transition duration-300 hover:bg-ink hover:text-page"
            >
              <span className="font-display text-2xl font-bold leading-tight md:text-3xl">{project.name}</span>
              <span className="shrink-0 font-mono text-[10px] tracking-wide text-dim group-hover:text-page group-hover:opacity-70">
                {project.tags.join(' · ')}
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="grid gap-10 border-t border-line pt-10 md:grid-cols-[1.4fr_0.8fr]">
        <div>
          <h2 className="font-mono text-xs text-gold">{t.skills}</h2>
          <p className="mt-4 font-display text-3xl font-bold leading-snug md:text-5xl">{home.skillChips.join(' / ')}</p>
        </div>
        <div className="space-y-8">
          <div>
            <h2 className="font-mono text-xs text-gold">{t.tools}</h2>
            <p className="mt-3 text-sm leading-7 text-dim">{home.tools}</p>
          </div>
          <div>
            <h2 className="font-mono text-xs text-gold">{t.archives}</h2>
            <p className="mt-3 font-display text-2xl leading-snug">{home.archives.join(' · ')}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
