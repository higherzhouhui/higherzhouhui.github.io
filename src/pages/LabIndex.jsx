import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/motion/Reveal.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'

export default function LabIndex() {
  const { t } = useI18n()

  useEffect(() => {
    document.title = `${t.labTitle} · ${t.brand}`
  }, [t])

  const labs = [
    { to: '/lab/water', index: '01', title: t.water, desc: t.waterDesc },
    { to: '/lab/scroll', index: '02', title: t.scroll, desc: t.scrollDesc },
    { to: '/lab/printer', index: '03', title: t.printer, desc: t.printerDesc },
  ]

  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">{t.labKicker}</p>
      <h1 className="mt-3 font-display text-[clamp(3rem,8vw,6rem)] font-bold leading-[0.92]">{t.labTitle}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-dim">{t.labLead}</p>
      <div className="mt-12 grid gap-4 md:grid-cols-3 md:items-start">
        {labs.map((lab, index) => (
          <Reveal key={lab.to} delay={index * 0.06} className={index === 1 ? 'md:mt-10' : ''}>
            <Link
              to={lab.to}
              className="group block h-full border border-line p-6 transition duration-300 hover:bg-ink hover:text-page"
            >
              <p className="font-mono text-xs text-gold">{lab.index}</p>
              <h2 className="mt-8 font-display text-4xl font-bold">{lab.title}</h2>
              <p className="mt-3 text-sm leading-7 text-dim group-hover:text-page group-hover:opacity-80">{lab.desc}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
