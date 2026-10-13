import { useI18n } from '../../i18n/I18nProvider.jsx'

export default function Toc({ sections }) {
  const { t } = useI18n()
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 rounded-2xl border border-line bg-surface/80 p-5 backdrop-blur">
        <p className="mb-4 text-[11px] tracking-[0.28em] text-gold">{t.toc}</p>
        <nav className="flex max-h-[70vh] flex-col gap-2 overflow-auto pr-1">
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`} className="text-sm text-dim transition hover:text-gold">
              {section.title}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  )
}
