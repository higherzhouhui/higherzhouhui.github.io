import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export const THEMES = [
  { id: 'obsidian', label: { zh: '黑金', en: 'Obsidian' }, swatch: '#d4af37' },
  { id: 'aurora', label: { zh: '极光', en: 'Aurora' }, swatch: '#5ce1e6' },
  { id: 'ivory', label: { zh: '象牙', en: 'Ivory' }, swatch: '#efe6d4' },
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
