import { useI18n } from '../../i18n/I18nProvider.jsx'

export default function LangSwitch() {
  const { t, toggleLang } = useI18n()
  return (
    <button
      type="button"
      onClick={toggleLang}
      className="rounded-full border border-line px-3 py-1 text-xs tracking-[0.18em] text-dim transition hover:border-gold hover:text-gold"
    >
      {t.lang}
    </button>
  )
}
