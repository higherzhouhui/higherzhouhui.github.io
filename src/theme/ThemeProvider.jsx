import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export const THEMES = [
  { id: 'obsidian', label: { zh: '夜墨', en: 'Night' }, swatch: '#ff3b1f' },
  { id: 'aurora', label: { zh: '酸绿', en: 'Acid' }, swatch: '#d6ff3f' },
  { id: 'ivory', label: { zh: '纸本', en: 'Paper' }, swatch: '#14120e' },
]

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme')
    return THEMES.some((item) => item.id === stored) ? stored : 'obsidian'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const value = useMemo(() => ({ theme, setTheme, themes: THEMES }), [theme])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
