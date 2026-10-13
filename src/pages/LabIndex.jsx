import { Droplets, Printer, Text } from 'lucide-react'
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
    { to: '/lab/water', icon: Droplets, title: t.water, desc: t.waterDesc },
    { to: '/lab/scroll', icon: Text, title: t.scroll, desc: t.scrollDesc },
    { to: '/lab/printer', icon: Printer, title: t.printer, desc: t.printerDesc },
  ]

  return (
    <Reveal>
      <p className="text-[11px] tracking-[0.32em] text-gold">MOTION  ·  CSS LAB</p>
      <h1 className="mt-3 font-display text-5xl md:text-6xl">{t.labTitle}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-dim">{t.labLead}</p>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {labs.map((lab, index) => (
          <Reveal key={lab.to} delay={index * 0.08}>
            <Link
              to={lab.to}
              className="block rounded-2xl border border-line bg-surface/70 p-6 transition hover:border-gold hover:-translate-y-1"
            >
              <lab.icon className="text-gold" size={28} />
              <h2 className="mt-4 font-display text-3xl">{lab.title}</h2>
              <p className="mt-3 text-sm leading-7 text-dim">{lab.desc}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </Reveal>
  )
}
