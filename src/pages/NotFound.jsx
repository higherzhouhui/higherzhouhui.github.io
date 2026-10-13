import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useI18n } from '../i18n/I18nProvider.jsx'

export default function NotFound() {
  const { t } = useI18n()

  useEffect(() => {
    document.title = `404 · ${t.brand}`
  }, [t.brand])

  return (
    <section className="py-10">
      <p className="font-latin text-[clamp(6rem,22vw,14rem)] leading-none text-gold">404</p>
      <h1 className="mt-2 max-w-3xl font-display text-5xl font-bold leading-tight md:text-7xl">{t.notFoundTitle}</h1>
      <p className="mt-6 max-w-lg text-lg leading-8 text-dim">{t.notFoundLead}</p>
      <div className="mt-10 flex flex-wrap gap-6 font-display text-3xl">
        <Link to="/" className="link-draw">
          {t.backHome}
        </Link>
        <Link to="/notes" className="link-draw">
          {t.nav.notes}
        </Link>
      </div>
    </section>
  )
}
