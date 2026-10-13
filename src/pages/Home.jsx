import { motion } from 'framer-motion'
import { ArrowRight, BookLock, GitFork, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import Reveal from '../components/motion/Reveal.jsx'
import { getHome } from '../content/index.js'
import { useI18n } from '../i18n/I18nProvider.jsx'

export default function Home() {
  const { lang, t } = useI18n()
  const home = getHome(lang)

  useEffect(() => {
    document.title = t.brand
  }, [t.brand])

  return (
    <div className="space-y-24">
      <motion.section
        initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative pt-6 md:pt-16"
      >
        <p className="text-[11px] tracking-[0.42em] text-gold">{t.heroKicker}</p>
        <p className="mt-4 text-sm tracking-[0.2em] text-dim">{home.role}</p>
        <h1 className="mt-4 max-w-4xl font-display text-6xl leading-[0.95] md:text-8xl">
          {t.heroTitle}
          <span className="ml-2 inline-block h-[0.72em] w-[3px] animate-pulse bg-gold align-middle" />
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-8 text-dim">{t.heroLead}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/notes"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-page transition hover:opacity-90"
          >
            {t.ctaNotes}
            <ArrowRight size={16} />
          </Link>
          <Link
            to="/lab"
            className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-ink transition hover:border-gold hover:text-gold"
          >
            <Sparkles size={16} />
            {t.ctaLab}
          </Link>
          <Link
            to="/diary"
            className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-ink transition hover:border-gold hover:text-gold"
          >
            <BookLock size={16} />
            {t.ctaDiary}
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
          {home.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.08 }}
              className="rounded-2xl border border-line bg-surface/50 px-4 py-4"
            >
              <p className="font-mono text-3xl text-gold">{stat.value}</p>
              <p className="mt-1 text-xs tracking-wide text-dim">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <Reveal>
        <div className="flex flex-wrap gap-2">
          {home.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-line px-3 py-1 text-[11px] tracking-wide text-dim">
              {tag}
            </span>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <h2 className="font-display text-4xl">{t.sections}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {home.cards.map((card, index) => (
            <Reveal key={card.key} delay={index * 0.05}>
              <Link
                to={card.to}
                className="group block h-full rounded-2xl border border-line bg-surface/70 p-6 backdrop-blur transition hover:border-gold hover:bg-elevated hover:-translate-y-1"
              >
                <p className="text-[11px] tracking-[0.28em] text-gold">{card.tag}</p>
                <h3 className="mt-3 font-display text-2xl leading-snug">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-dim">{card.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-xs tracking-wide text-gold opacity-0 transition group-hover:opacity-100">
                  {t.read} <ArrowRight size={12} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <h2 className="font-display text-4xl">{t.notesFeed}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {home.notes.map((note) => (
            <Link
              key={note.to}
              to={note.to}
              className="rounded-2xl border border-line bg-surface/60 p-5 transition hover:border-gold"
            >
              <p className="text-[11px] tracking-[0.22em] text-gold">{note.tag}</p>
              <h3 className="mt-2 font-display text-xl">{note.title}</h3>
              <p className="mt-2 text-sm leading-7 text-dim">{note.desc}</p>
            </Link>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <h2 className="font-display text-4xl">{t.timeline}</h2>
        <ol className="mt-8 space-y-0">
          {home.timeline.map((item, index) => (
            <li key={item.time} className="relative grid gap-4 border-l border-gold/40 pl-8 pb-10 md:grid-cols-[180px_1fr]">
              <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-gold shadow-[0_0_12px_var(--glow)]" />
              <div>
                <p className="text-xs tracking-wide text-gold">{item.time}</p>
                <p className="mt-2 font-display text-2xl">{item.company}</p>
                <p className="mt-1 text-sm text-dim">{item.pos}</p>
              </div>
              <ul className="space-y-1 text-sm leading-7 text-ink/90">
                {item.items.map((line) => (
                  <li key={line}>· {line}</li>
                ))}
              </ul>
              <span className="sr-only">{index}</span>
            </li>
          ))}
        </ol>
      </Reveal>

      <section className="grid gap-6 lg:grid-cols-2">
        <Reveal>
          <article className="h-full rounded-2xl border border-line bg-surface/70 p-7">
            <h2 className="font-display text-3xl">{t.about}</h2>
            <p className="mt-4 text-sm leading-7 text-dim">{home.quote}</p>
            <p className="mt-4 text-sm leading-7 text-dim">{home.quoteAlt}</p>
            <p className="mt-5 text-sm">{home.bio.school}</p>
            <p className="mt-2 text-sm leading-7 text-dim">{home.bio.work}</p>
            <div className="mt-5 flex flex-wrap gap-4 text-gold">
              <a href={home.bio.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                <GitFork size={16} />
                {home.bio.githubName}
              </a>
              <a href={home.bio.telegram} target="_blank" rel="noreferrer">
                Telegram
              </a>
              <a href={home.bio.site} target="_blank" rel="noreferrer">
                jizaoji.top
              </a>
            </div>
          </article>
        </Reveal>
        <Reveal delay={0.08}>
          <article className="h-full rounded-2xl border border-line bg-surface/70 p-7">
            <h2 className="font-display text-3xl">{t.contact}</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {home.contact.map((item) => (
                <li key={item.label} className="flex justify-between gap-4 border-b border-line/60 py-2">
                  <span className="text-dim">{item.label}</span>
                  <span>{item.value}</span>
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      </section>

      <Reveal>
        <h2 className="font-display text-3xl">{t.projects}</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {home.projects.map((project) => (
            <a
              key={project.href + project.name}
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-line px-4 py-4 text-sm transition hover:border-gold hover:text-gold hover:-translate-y-0.5"
            >
              <span className="block">{project.name}</span>
              <span className="mt-2 flex flex-wrap gap-1">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-[10px] tracking-wide text-dim">
                    {tag}
                  </span>
                ))}
              </span>
            </a>
          ))}
        </div>
      </Reveal>

      <section className="grid gap-6 md:grid-cols-3">
        <Reveal>
          <article className="rounded-2xl border border-line bg-surface/60 p-6">
            <h2 className="font-display text-2xl">{t.skills}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {home.skillChips.map((chip) => (
                <span key={chip} className="rounded-full border border-line px-2.5 py-1 text-xs text-dim">
                  {chip}
                </span>
              ))}
            </div>
          </article>
        </Reveal>
        <Reveal delay={0.06}>
          <article className="rounded-2xl border border-line bg-surface/60 p-6">
            <h2 className="font-display text-2xl">{t.tools}</h2>
            <p className="mt-3 text-sm leading-7 text-dim">{home.tools}</p>
          </article>
        </Reveal>
        <Reveal delay={0.12}>
          <article className="rounded-2xl border border-line bg-surface/60 p-6">
            <h2 className="font-display text-2xl">{t.archives}</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {home.archives.map((item) => (
                <li key={item} className="rounded-full border border-line px-3 py-1 text-xs text-dim">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      </section>
    </div>
  )
}
