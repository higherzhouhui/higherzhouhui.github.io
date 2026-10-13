import { Link } from 'react-router-dom'
import { clearAuth, getRemainingDays } from '../../utils/auth'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import './DiaryList.css'

export default function DiaryList({ entries }) {
  const { t, lang } = useI18n()
  const copy = t.diary
  const remainingDays = getRemainingDays()

  const handleLogout = () => {
    if (confirm(copy.logoutConfirm)) {
      clearAuth()
      window.location.reload()
    }
  }

  const formatDate = (dateStr) => {
    const date = new Date(`${dateStr}T00:00:00`)
    const weekdays = lang === 'en'
      ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      : ['日', '一', '二', '三', '四', '五', '六']
    if (lang === 'en') {
      return {
        monthDay: date.toLocaleString('en', { month: 'short', day: 'numeric' }),
        year: String(date.getFullYear()),
        weekday: weekdays[date.getDay()],
      }
    }
    return {
      monthDay: `${date.getMonth() + 1}月${date.getDate()}日`,
      year: String(date.getFullYear()),
      weekday: `星期${weekdays[date.getDay()]}`,
    }
  }

  return (
    <div className="diary-list-container">
      <header className="diary-header">
        <div>
          <p className="diary-kicker">{copy.kicker}</p>
          <h1>{copy.listTitle}</h1>
          <p className="diary-subtitle">{copy.listLead}</p>
        </div>
        <div className="diary-header-actions">
          <span className="auth-status">
            {copy.unlocked} · {copy.daysLeft.replace('{n}', String(remainingDays))}
          </span>
          <button type="button" onClick={handleLogout} className="btn-logout">
            {copy.logout}
          </button>
        </div>
      </header>

      <div className="timeline">
        {entries.map((entry) => {
          const dateInfo = formatDate(entry.date)
          return (
            <Link to={`/diary/${entry.date}`} key={entry.date} className="timeline-item">
              <div className="timeline-marker" />
              <div className="timeline-card">
                <div className="timeline-date">
                  <div className="date-large">{dateInfo.monthDay}</div>
                  <div className="date-small">
                    <span>{dateInfo.year}</span>
                    <span>{dateInfo.weekday}</span>
                  </div>
                </div>
                <div className="timeline-content">
                  <h3>{entry.title || dateInfo.monthDay}</h3>
                  <p>{entry.excerpt || copy.theDay}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {entries.length === 0 ? (
        <div className="empty-state">
          <p>{copy.empty}</p>
          <small>{copy.emptyHint}</small>
        </div>
      ) : null}
    </div>
  )
}
