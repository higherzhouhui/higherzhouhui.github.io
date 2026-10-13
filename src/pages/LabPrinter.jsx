import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider.jsx'
import './LabPrinter.css'

export default function LabPrinter() {
  const { t } = useI18n()
  const [run, setRun] = useState(0)

  useEffect(() => {
    document.title = `${t.printer} · ${t.brand}`
  }, [t])

  return (
    <div>
      <p className="text-[11px] tracking-[0.32em] text-gold">{t.exhibit}</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-display text-5xl">{t.printer}</h1>
        <Link to="/lab" className="text-sm text-dim hover:text-gold">
          {t.labTitle}
        </Link>
      </div>
      <p className="mt-3 max-w-xl text-dim">{t.printerDesc}</p>
      <div className="lab-printer mt-10">
        <div className="machine">
          <div key={run} className="paper print">
            <p>This is a printer animation!</p>
          </div>
          <div className="body" />
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={() => setRun((n) => n + 1)}
          className="rounded-full border border-line px-4 py-2 text-sm text-dim hover:border-gold hover:text-gold"
        >
          {t.replay}
        </button>
      </div>
    </div>
  )
}
