import { motion } from 'framer-motion'
import { ArrowRight, GitFork, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { getHome } from '../content/index.js'
import { useI18n } from '../i18n/I18nProvider.jsx'

const fade = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
}

export default function Home() {
  const { lang, t } = useI18n()
  const home = getHome(lang)

  useEffect(() => {
    document.title = t.brand
  }, [t.brand])

  return (
    <div className="space-y-24">
      <motion.section {...fade} transition={{ duration: 0.6 }} className="relative pt-6 md:pt-16">
        <p className="text-[11px] tracking-[0.42em] text-gold">{t.heroKicker}</p>
        <h1 className="mt-5 max-w-4xl font-display text-6xl leading-[0.95] md:text-8xl">
          {t.heroTitle}
          <span className="ml-2 inline-block h-[0.72em] w-[3px] animate-pulse bg-gold align-middle" />
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-8 text-dim">{t.heroLead}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/html"
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
        </div>
      </motion.section>

      <section>
        <h2 className="font-display text-4xl">{t.sections}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {home.cards.map((card, index) => (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index, duration: 0.4 }}
            >
              <Link
                to={card.to}
                className="group block h-full rounded-2xl border border-line bg-surface/70 p-6 backdrop-blur transition hover:border-gold hover:bg-elevated"
              >
                <p className="text-[11px] tracking-[0.28em] text-gold">{card.tag}</p>
                <h3 className="mt-3 font-display text-2xl leading-snug">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-dim">{card.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-xs tracking-wide text-gold opacity-0 transition group-hover:opacity-100">
                  {t.read} <ArrowRight size={12} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-line bg-surface/70 p-7">
          <h2 className="font-display text-3xl">{t.about}</h2>
          <p className="mt-4 text-sm leading-7 text-dim">{home.quote}</p>
          <p className="mt-5 text-sm">{home.bio.school}</p>
          <p className="mt-2 text-sm leading-7 text-dim">{home.bio.work}</p>
          <a
            href={home.bio.github}
            className="mt-5 inline-flex items-center gap-2 text-gold"
            target="_blank"
            rel="noreferrer"
          >
            <GitFork size={16} />
            {home.bio.githubName}
          </a>
        </article>
        <article className="rounded-2xl border border-line bg-surface/70 p-7">
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
      </section>

      <section>
        <h2 className="font-display text-3xl">{t.projects}</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {home.projects.map((project) => (
            <a
              key={project.href}
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-line px-4 py-4 text-sm transition hover:border-gold hover:text-gold"
            >
              {project.name}
            </a>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <article className="rounded-2xl border border-line bg-surface/60 p-6">
          <h2 className="font-display text-2xl">{t.skills}</h2>
          <p className="mt-3 text-sm leading-7 text-dim">{home.skills}</p>
        </article>
        <article className="rounded-2xl border border-line bg-surface/60 p-6">
          <h2 className="font-display text-2xl">{t.tools}</h2>
          <p className="mt-3 text-sm leading-7 text-dim">{home.tools}</p>
        </article>
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
      </section>
    </div>
  )
}
