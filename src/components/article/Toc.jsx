import { useI18n } from '../../i18n/I18nProvider.jsx'

function pad(index) {
  return String(index + 1).padStart(2, '0')
}

export default function Toc({ sections }) {
  const { t } = useI18n()
  return (
    <aside className="min-w-0">
      <div className="lg:sticky lg:top-24">
        <p className="mb-3 font-mono text-[11px] tracking-[0.2em] text-gold">{t.toc}</p>
        <nav className="flex gap-2 overflow-x-auto pb-2 lg:max-h-[70vh] lg:flex-col lg:gap-0 lg:overflow-auto lg:pb-0">
          {sections.map((section, index) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="shrink-0 border border-line px-3 py-2 text-sm text-dim transition hover:border-gold hover:text-gold lg:flex lg:items-baseline lg:gap-3 lg:border-0 lg:border-b lg:border-line lg:px-0 lg:py-2.5"
            >
              <span className="mr-2 font-mono text-[10px] text-gold lg:mr-0">{pad(index)}</span>
              {section.title}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  )
}
