import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useI18n } from '../i18n/I18nProvider.jsx'

export default function NotFound() {
  const { t } = useI18n()

  useEffect(() => {
    document.title = `404 · ${t.brand}`
  }, [t.brand])

  return (
    <section className="mx-auto max-w-2xl py-16">
      <p className="text-[11px] tracking-[0.32em] text-gold">404</p>
      <h1 className="mt-4 font-display text-5xl leading-tight md:text-6xl">{t.notFoundTitle}</h1>
      <p className="mt-6 max-w-lg text-lg leading-8 text-dim">{t.notFoundLead}</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          to="/"
          className="rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-page transition hover:opacity-90"
        >
          {t.backHome}
        </Link>
        <Link
          to="/notes"
          className="rounded-full border border-line px-5 py-2.5 text-sm text-ink transition hover:border-gold hover:text-gold"
        >
          {t.nav.notes}
        </Link>
      </div>
    </section>
  )
}
