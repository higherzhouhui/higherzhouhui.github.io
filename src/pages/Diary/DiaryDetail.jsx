import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { decryptText, decryptImage } from '../../utils/crypto'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import './DiaryDetail.css'

export default function DiaryDetail({ password }) {
  const { date } = useParams()
  const navigate = useNavigate()
  const { t, lang } = useI18n()
  const copy = t.diary
  const [diary, setDiary] = useState(null)
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadDiary()
  }, [date, password])

  const loadDiary = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await fetch(`/diary/data/${date}.json`)
      if (!response.ok) throw new Error(copy.missing)

      const encryptedData = await response.json()
      const decryptedText = await decryptText(encryptedData.encrypted, password)
      const diaryData = JSON.parse(decryptedText)
      setDiary(diaryData)

      const loadedImages = []
      if (diaryData.images?.length) {
        for (const item of diaryData.images) {
          const imageName = typeof item === 'string' ? item : item?.name
          const caption = typeof item === 'string' ? '' : (item?.caption || '')
          if (!imageName) continue
          try {
            const imgResponse = await fetch(`/diary/images/${imageName}`)
            if (imgResponse.ok) {
              const imgData = await imgResponse.json()
              const decryptedImageBuffer = await decryptImage(imgData.encrypted, password)
              const blob = new Blob([decryptedImageBuffer])
              loadedImages.push({ url: URL.createObjectURL(blob), caption })
            }
          } catch (err) {
            console.error('加载图片失败:', imageName, err)
          }
        }
      }
      setImages(loadedImages)
    } catch (err) {
      setError(err.message || copy.missing)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateStr) => {
    const value = new Date(`${dateStr}T00:00:00`)
    if (lang === 'en') {
      return value.toLocaleDateString('en', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    }
    const weekdays = ['日', '一', '二', '三', '四', '五', '六']
    return `${value.getFullYear()}年${value.getMonth() + 1}月${value.getDate()}日 星期${weekdays[value.getDay()]}`
  }

  if (loading) {
    return (
      <div className="diary-detail-container diary-state">
        <p>{copy.decrypting}</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="diary-detail-container diary-state">
        <p>{error}</p>
        <button type="button" onClick={() => navigate('/diary')} className="btn-back">
          {copy.back}
        </button>
      </div>
    )
  }

  return (
    <div className="diary-detail-container">
      <button type="button" onClick={() => navigate('/diary')} className="btn-back-header">
        {copy.back}
      </button>

      <article className="diary-article">
        <header className="diary-article-header">
          <p className="diary-kicker">{copy.kicker}</p>
          <h1>{diary.title || copy.theDay}</h1>
          <p className="diary-article-meta">
            <time dateTime={diary.date}>{formatDate(diary.date)}</time>
            {diary.location ? <span>{diary.location}</span> : null}
            {diary.weather ? <span>{diary.weather}</span> : null}
          </p>
        </header>

        <section className="diary-section">
          <h2>{copy.about}</h2>
          <div className="diary-text">
            {diary.userProfile.split('\n').map((line, i) => (
              <p key={i}>{line || '\u00a0'}</p>
            ))}
          </div>
        </section>

        <section className="diary-section">
          <h2>{copy.theDay}</h2>
          <div className="diary-text">
            {diary.events.split('\n').map((line, i) => (
              <p key={i}>{line || '\u00a0'}</p>
            ))}
          </div>
        </section>

        {images.length > 0 ? (
          <section className="diary-section">
            <h2>{copy.photos}</h2>
            <div className="diary-images">
              {images.map((image) => (
                <figure key={image.url}>
                  <img src={image.url} alt={image.caption} />
                  {image.caption ? <figcaption>{image.caption}</figcaption> : null}
                </figure>
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </div>
  )
}
