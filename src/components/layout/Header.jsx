import { Cpu } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { NAV_ITEMS } from '../../content/routes.js'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import LangSwitch from './LangSwitch.jsx'
import ThemeSwitch from './ThemeSwitch.jsx'

export default function Header() {
  const { t } = useI18n()

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-page/80 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-5 py-3">
        <NavLink to="/" className="group flex min-w-0 items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-gold/50 text-gold">
            <Cpu size={18} />
          </span>
          <span className="min-w-0">
            <span className="block font-display text-xl leading-none text-ink">{t.brand}</span>
            <span className="hidden truncate text-[10px] tracking-[0.22em] text-dim 2xl:block">{t.brandSub}</span>
          </span>
        </NavLink>
        <nav className="hidden min-w-0 items-center justify-center gap-0.5 overflow-x-auto lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-2 py-1 text-[11px] tracking-wide whitespace-nowrap transition ${
                  isActive ? 'bg-elevated text-gold' : 'text-dim hover:text-ink'
                }`
              }
            >
              {t.nav[item.key]}
            </NavLink>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <LangSwitch />
          <ThemeSwitch />
        </div>
      </div>
      <nav className="flex gap-2 overflow-x-auto border-t border-line px-5 py-2 lg:hidden">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `whitespace-nowrap rounded-full px-3 py-1 text-xs ${isActive ? 'text-gold' : 'text-dim'}`
            }
          >
            {t.nav[item.key]}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
