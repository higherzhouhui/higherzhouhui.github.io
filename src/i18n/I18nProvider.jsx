import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { ui } from './ui.js'

const I18nContext = createContext(null)

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'zh')

  useEffect(() => {
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN'
    localStorage.setItem('lang', lang)
  }, [lang])

  const value = useMemo(
    () => ({
      lang,
      t: ui[lang],
      toggleLang: () => setLang((prev) => (prev === 'zh' ? 'en' : 'zh')),
      setLang,
    }),
    [lang],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
