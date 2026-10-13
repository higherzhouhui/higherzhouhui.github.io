import { useI18n } from '../../i18n/I18nProvider.jsx'
import { useTheme } from '../../theme/ThemeProvider.jsx'

export default function ThemeSwitch() {
  const { theme, setTheme, themes } = useTheme()
  const { lang } = useI18n()

  return (
    <div className="flex items-center gap-1.5">
      {themes.map((item) => (
        <button
          key={item.id}
          type="button"
          title={item.label[lang]}
          aria-label={item.label[lang]}
          aria-pressed={theme === item.id}
          onClick={() => setTheme(item.id)}
          className={`h-3.5 w-3.5 border border-ink/50 transition ${theme === item.id ? 'outline outline-2 outline-offset-2 outline-gold' : 'opacity-80 hover:opacity-100'}`}
          style={{ background: item.swatch }}
        />
      ))}
    </div>
  )
}
