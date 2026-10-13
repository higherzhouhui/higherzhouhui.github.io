import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { decryptText, decryptImage } from '../../utils/crypto';
import './DiaryDetail.css';

export default function DiaryDetail({ password }) {
  const { date } = useParams();
  const navigate = useNavigate();
  const [diary, setDiary] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDiary();
  }, [date, password]);

  const loadDiary = async () => {
    try {
      setLoading(true);
      setError('');

      // 加载日记数据
      const response = await fetch(`/diary/data/${date}.json`);
      if (!response.ok) {
        throw new Error('日记不存在');
      }

      const encryptedData = await response.json();
      const decryptedText = await decryptText(encryptedData.encrypted, password);
      const diaryData = JSON.parse(decryptedText);

      setDiary(diaryData);

      // 加载图片
      if (diaryData.images && diaryData.images.length > 0) {
        const loadedImages = [];
        for (const imageName of diaryData.images) {
          try {
            const imgResponse = await fetch(`/diary/images/${imageName}`);
            if (imgResponse.ok) {
              const imgData = await imgResponse.json();
              const decryptedImageBuffer = await decryptImage(imgData.encrypted, password);
              const blob = new Blob([decryptedImageBuffer]);
              const url = URL.createObjectURL(blob);
              loadedImages.push(url);
            }
          } catch (err) {
            console.error('加载图片失败:', imageName, err);
          }
        }
        setImages(loadedImages);
      }
    } catch (err) {
      setError(err.message || '加载日记失败');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
    const weekday = weekdays[date.getDay()];
    
    return `${year}年${month}月${day}日 星期${weekday}`;
  };

  if (loading) {
    return (
      <div className="diary-detail-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>解密中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="diary-detail-container">
        <div className="error-message">
          <p>❌ {error}</p>
          <button onClick={() => navigate('/diary')} className="btn-back">
            返回列表
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="diary-detail-container">
      <div className="diary-detail-header">
        <button onClick={() => navigate('/diary')} className="btn-back-header">
          ← 返回
        </button>
      </div>

      <div className="diary-detail-content">
        <article className="diary-article">
          <header className="diary-article-header">
            <h1>📔 日记</h1>
            <time>{formatDate(diary.date)}</time>
          </header>

          <section className="diary-section">
            <h2>👤 用户画像</h2>
            <div className="diary-text">
              {diary.userProfile.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="diary-section">
            <h2>📝 今天的重要事项</h2>
            <div className="diary-text">
              {diary.events.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </section>

          {images.length > 0 && (
            <section className="diary-section">
              <h2>📷 图片</h2>
              <div className="diary-images">
                {images.map((url, i) => (
                  <img key={i} src={url} alt={`日记图片 ${i + 1}`} />
                ))}
              </div>
            </section>
          )}
        </article>
      </div>
    </div>
  );
}
