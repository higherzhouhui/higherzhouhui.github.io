import { useState } from 'react'
import { verifyPassword } from '../../utils/crypto'
import { saveAuth } from '../../utils/auth'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import './DiaryLogin.css'

export default function DiaryLogin({ onLoginSuccess, passwordTest }) {
  const { t } = useI18n()
  const copy = t.diary
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const isValid = await verifyPassword(password, passwordTest)
      if (isValid) {
        saveAuth(password)
        onLoginSuccess(password)
      } else {
        setError(copy.errorPwd)
      }
    } catch {
      setError(copy.errorVerify)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="diary-login-container">
      <div className="diary-login-box">
        <p className="diary-kicker">{copy.kicker}</p>
        <h2>{copy.loginTitle}</h2>
        <p className="diary-login-lead">{copy.loginLead}</p>

        <form onSubmit={handleSubmit} className="diary-login-form">
          <label className="sr-only" htmlFor="diary-pass">
            {copy.passwordPh}
          </label>
          <input
            id="diary-pass"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={copy.passwordPh}
            className="form-control"
            autoFocus
            disabled={loading}
          />

          {error ? <p className="diary-alert">{error}</p> : null}

          <button type="submit" className="btn-unlock" disabled={loading || !password}>
            {loading ? copy.unlocking : copy.unlock}
          </button>
          <p className="diary-login-hint">{copy.loginHint}</p>
        </form>
      </div>
    </div>
  )
}
