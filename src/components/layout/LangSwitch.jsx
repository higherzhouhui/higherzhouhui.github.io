import { useI18n } from '../../i18n/I18nProvider.jsx'

export default function LangSwitch() {
  const { t, toggleLang } = useI18n()
  return (
    <button type="button" onClick={toggleLang} className="font-mono text-xs tracking-[0.14em] text-dim hover:text-gold">
      {t.lang}
    </button>
  )
}
