import { useI18n } from '../../i18n/I18nProvider.jsx'

export default function Footer() {
  const { t } = useI18n()
  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-dim sm:flex-row">
        <p>{t.copyright}</p>
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer" className="hover:text-gold">
          渝ICP备2023007595号-1
        </a>
      </div>
    </footer>
  )
}
