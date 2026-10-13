import { Link } from 'react-router-dom';
import { clearAuth, getRemainingDays } from '../../utils/auth';
import './DiaryList.css';

export default function DiaryList({ entries }) {
  const remainingDays = getRemainingDays();

  const handleLogout = () => {
    if (confirm('确定要退出登录吗？')) {
      clearAuth();
      window.location.reload();
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
    const weekday = weekdays[date.getDay()];
    
    return {
      year,
      monthDay: `${month}月${day}日`,
      weekday: `星期${weekday}`
    };
  };

  return (
    <div className="diary-list-container">
      <div className="diary-header">
        <div className="diary-header-content">
          <div>
            <h1>📔 我的日记</h1>
            <p className="diary-subtitle">记录生活，了解自己</p>
          </div>
          <div className="diary-header-actions">
            <span className="auth-status">
              🔓 已解锁 · 剩余 {remainingDays} 天
            </span>
            <button onClick={handleLogout} className="btn-logout">
              退出
            </button>
          </div>
        </div>
      </div>

      <div className="diary-content">
        <div className="timeline">
          {entries.map((entry) => {
            const dateInfo = formatDate(entry.date);
            return (
              <Link 
                to={`/diary/${entry.date}`} 
                key={entry.date}
                className="timeline-item"
              >
                <div className="timeline-marker"></div>
                <div className="timeline-card">
                  <div className="timeline-date">
                    <div className="date-large">{dateInfo.monthDay}</div>
                    <div className="date-small">
                      <span>{dateInfo.year}</span>
                      <span>{dateInfo.weekday}</span>
                    </div>
                  </div>
                  <div className="timeline-content">
                    <h3>日记</h3>
                    <p>点击查看详情 →</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {entries.length === 0 && (
          <div className="empty-state">
            <p>📝 还没有日记</p>
            <small>开始记录你的生活吧</small>
          </div>
        )}
      </div>
    </div>
  );
}
