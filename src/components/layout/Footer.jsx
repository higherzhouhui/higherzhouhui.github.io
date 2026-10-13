import { useI18n } from '../../i18n/I18nProvider.jsx'

export default function Footer() {
  const { t } = useI18n()
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-[90rem] flex-col gap-6 px-5 py-10 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="font-display text-5xl font-bold leading-none md:text-7xl">{t.brand}</p>
          <p className="mt-3 font-mono text-xs tracking-[0.16em] text-dim">{t.brandSub}</p>
        </div>
        <div className="text-sm text-dim md:text-right">
          <p>{t.copyright}</p>
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer" className="link-draw mt-1 inline-block hover:text-gold">
            渝ICP备2023007595号-1
          </a>
        </div>
      </div>
    </footer>
  )
}
