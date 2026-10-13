import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider.jsx'
import './LabWater.css'

export default function LabWater() {
  const { t } = useI18n()

  useEffect(() => {
    document.title = `${t.water} · ${t.brand}`
  }, [t])

  return (
    <div>
      <p className="text-[11px] tracking-[0.32em] text-gold">{t.exhibit}</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-display text-5xl">{t.water}</h1>
        <Link to="/lab" className="text-sm text-dim hover:text-gold">
          {t.labTitle}
        </Link>
      </div>
      <p className="mt-3 max-w-xl text-dim">{t.waterDesc}</p>
      <div className="lab-water mt-8">
        <div className="drop">
          <form
            onSubmit={(event) => {
              event.preventDefault()
            }}
          >
            <label>
              {t.waterUser}
              <input className="field" type="text" placeholder={t.waterUserPh} autoComplete="username" />
            </label>
            <label>
              {t.waterPass}
              <input className="field" type="password" placeholder={t.waterPassPh} autoComplete="current-password" />
            </label>
            <label className="remember">
              <input type="checkbox" />
              {t.waterRemember}
            </label>
            <button type="submit">{t.waterLogin}</button>
            <p className="hint">
              {t.waterNeedAccount}{' '}
              <a href="#register">{t.waterRegister}</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
