import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import DiaryLogin from './DiaryLogin'
import DiaryList from './DiaryList'
import DiaryDetail from './DiaryDetail'
import { isAuthValid, getSavedPassword } from '../../utils/auth'
import { useI18n } from '../../i18n/I18nProvider.jsx'

export default function DiaryIndex() {
  const { t } = useI18n()
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [indexData, setIndexData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadIndexData()
  }, [])

  const loadIndexData = async () => {
    try {
      const response = await fetch('/diary/index.json')
      const data = await response.json()
      setIndexData(data)

      if (isAuthValid()) {
        const savedPassword = getSavedPassword()
        if (savedPassword) {
          setPassword(savedPassword)
          setAuthenticated(true)
        }
      }
    } catch (err) {
      console.error('加载日记索引失败:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <p className="py-16 text-center text-dim">{t.diary.loading}</p>
  }

  if (!indexData) {
    return <p className="py-16 text-center text-dim">{t.diary.loadFail}</p>
  }

  if (!authenticated) {
    return (
      <DiaryLogin
        onLoginSuccess={(pwd) => {
          setPassword(pwd)
          setAuthenticated(true)
        }}
        passwordTest={indexData.passwordTest}
      />
    )
  }

  return (
    <Routes>
      <Route index element={<DiaryList entries={indexData.entries} />} />
      <Route path=":date" element={<DiaryDetail password={password} />} />
    </Routes>
  )
}
