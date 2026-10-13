import { useI18n } from '../../i18n/I18nProvider.jsx'
import { useTheme } from '../../theme/ThemeProvider.jsx'

export default function ThemeSwitch() {
  const { theme, setTheme, themes } = useTheme()
  const { lang } = useI18n()

  return (
    <div className="flex items-center gap-1 rounded-full border border-line p-1">
      {themes.map((item) => (
        <button
          key={item.id}
          type="button"
          title={item.label[lang]}
          aria-label={item.label[lang]}
          onClick={() => setTheme(item.id)}
          className={`grid h-6 w-6 place-items-center rounded-full transition ${
            theme === item.id ? 'ring-2 ring-gold ring-offset-1 ring-offset-page' : 'opacity-70 hover:opacity-100'
          }`}
        >
          <span className="block h-3.5 w-3.5 rounded-full" style={{ background: item.swatch }} />
        </button>
      ))}
    </div>
  )
}
