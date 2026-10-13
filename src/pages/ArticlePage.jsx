import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import ArticleLayout from '../components/article/ArticleLayout.jsx'
import { getArticle } from '../content/index.js'
import { useI18n } from '../i18n/I18nProvider.jsx'

export default function ArticlePage({ pageKey }) {
  const { lang, t } = useI18n()
  const page = getArticle(lang, pageKey)

  useEffect(() => {
    if (page) document.title = `${page.title} · ${t.brand}`
  }, [page, t.brand])

  if (!page) return <Navigate to="/" replace />
  return <ArticleLayout page={page} />
}
