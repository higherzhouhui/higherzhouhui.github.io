import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Cpu } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import { COLUMN_ITEMS, PRIMARY_NAV } from '../../content/routes.js'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import LangSwitch from './LangSwitch.jsx'
import ThemeSwitch from './ThemeSwitch.jsx'

export default function Header() {
  const { t } = useI18n()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const columnActive = COLUMN_ITEMS.some(
    (item) => location.pathname === item.to || location.pathname.startsWith(`${item.to}/`),
  )

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onPointer = (event) => {
      if (!menuRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    return () => document.removeEventListener('pointerdown', onPointer)
  }, [])

  const linkClass = (isActive) =>
    `rounded-full px-3 py-1.5 text-xs tracking-wide whitespace-nowrap transition ${
      isActive ? 'bg-elevated text-gold' : 'text-dim hover:text-ink'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-page/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-3">
        <NavLink to="/" className="flex min-w-0 items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-gold/50 text-gold">
            <Cpu size={18} />
          </span>
          <span className="min-w-0">
            <span className="block font-display text-xl leading-none text-ink">{t.brand}</span>
            <span className="hidden truncate text-[10px] tracking-[0.22em] text-dim sm:block">{t.brandSub}</span>
          </span>
        </NavLink>

        <nav className="ml-auto flex min-w-0 items-center gap-1">
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              aria-expanded={open}
              aria-haspopup="true"
              onClick={() => setOpen((prev) => !prev)}
              className={`inline-flex items-center ${linkClass(columnActive)}`}
            >
              {t.columns}
              <ChevronDown size={14} className={`ml-1 inline align-[-2px] transition ${open ? 'rotate-180' : ''}`} />
            </button>
            {open ? (
              <div className="absolute left-0 top-full z-50 mt-2 w-44 rounded-2xl border border-line bg-page/95 p-2 shadow-lg backdrop-blur-xl">
                {COLUMN_ITEMS.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `block rounded-xl px-3 py-2 text-sm ${isActive ? 'text-gold' : 'text-dim hover:text-ink'}`
                    }
                  >
                    {t.nav[item.key]}
                  </NavLink>
                ))}
              </div>
            ) : null}
          </div>
          {PRIMARY_NAV.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => linkClass(isActive)}>
              {t.nav[item.key]}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LangSwitch />
          <ThemeSwitch />
        </div>
      </div>
    </header>
  )
}
