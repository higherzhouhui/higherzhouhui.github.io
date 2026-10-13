import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, useLocation } from 'react-router-dom'
import { COLUMN_ITEMS, PRIMARY_NAV } from '../../content/routes.js'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import LangSwitch from './LangSwitch.jsx'
import ThemeSwitch from './ThemeSwitch.jsx'

function pad(index) {
  return String(index + 1).padStart(2, '0')
}

export default function Header() {
  const { t } = useI18n()
  const location = useLocation()
  const [columnsOpen, setColumnsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const menuRef = useRef(null)
  const columnActive = COLUMN_ITEMS.some(
    (item) => location.pathname === item.to || location.pathname.startsWith(`${item.to}/`),
  )

  useEffect(() => {
    setColumnsOpen(false)
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onPointer = (event) => {
      if (!menuRef.current?.contains(event.target)) setColumnsOpen(false)
    }
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setColumnsOpen(false)
        setMobileOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const itemClass = (isActive) =>
    `font-display text-sm tracking-wide ${isActive ? 'text-gold' : 'text-ink hover:text-gold'}`

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-page/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[90rem] items-center gap-4 px-5 py-3 md:px-8">
        <NavLink to="/" className="font-display text-[1.7rem] font-bold leading-none tracking-tight">
          {t.brand}
        </NavLink>

        <nav className="ml-auto hidden items-center gap-6 md:flex" ref={menuRef}>
          <button
            type="button"
            aria-expanded={columnsOpen}
            aria-haspopup="true"
            onClick={() => setColumnsOpen((prev) => !prev)}
            className={itemClass(columnActive || columnsOpen)}
          >
            {t.columns}
            <span aria-hidden className="ml-1 font-mono text-[10px]">
              {columnsOpen ? '−' : '+'}
            </span>
          </button>
          {PRIMARY_NAV.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => itemClass(isActive)}>
              {t.nav[item.key]}
            </NavLink>
          ))}
          {columnsOpen ? (
            <div className="absolute inset-x-0 top-full border-b border-line bg-page/95 backdrop-blur-md">
              <div className="mx-auto grid max-w-[90rem] grid-cols-2 gap-x-10 gap-y-1 px-8 py-6 md:grid-cols-3">
                {COLUMN_ITEMS.map((item, index) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-baseline gap-3 border-b border-line py-3 font-display text-3xl font-bold leading-none ${
                        isActive ? 'text-gold' : 'hover:text-gold'
                      }`
                    }
                  >
                    <span className="font-mono text-[11px] text-gold">{pad(index)}</span>
                    {t.nav[item.key]}
                  </NavLink>
                ))}
              </div>
            </div>
          ) : null}
        </nav>

        <div className="ml-auto flex items-center gap-3 md:ml-4">
          <LangSwitch />
          <ThemeSwitch />
          <button
            type="button"
            className="font-mono text-xs tracking-[0.14em] md:hidden"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            {t.menu}
          </button>
        </div>
      </div>

      {mobileOpen
        ? createPortal(
            <div className="fixed inset-0 z-[80] flex flex-col bg-page md:hidden">
              <div className="flex items-center justify-between border-b border-line px-5 py-3">
                <span className="font-display text-[1.7rem] font-bold leading-none">{t.brand}</span>
                <button type="button" className="font-mono text-xs tracking-[0.14em]" onClick={() => setMobileOpen(false)}>
                  {t.close}
                </button>
              </div>
              <nav className="flex-1 overflow-auto px-5 py-4">
                {COLUMN_ITEMS.map((item, index) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-baseline gap-3 border-b border-line py-3 font-display text-3xl font-bold ${
                        isActive ? 'text-gold' : ''
                      }`
                    }
                  >
                    <span className="font-mono text-[11px] text-gold">{pad(index)}</span>
                    {t.nav[item.key]}
                  </NavLink>
                ))}
                <div className="h-6" />
                {PRIMARY_NAV.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `block border-b border-line py-3 font-display text-3xl font-bold ${isActive ? 'text-gold' : ''}`
                    }
                  >
                    {t.nav[item.key]}
                  </NavLink>
                ))}
              </nav>
            </div>,
            document.body,
          )
        : null}
    </header>
  )
}
