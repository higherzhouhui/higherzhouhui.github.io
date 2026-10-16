import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { decryptText, decryptImage, getCachedKey } from '../../utils/crypto'
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
  const [imagesLoading, setImagesLoading] = useState(false)
  const [error, setError] = useState('')
  const loadIdRef = useRef(0)

  useEffect(() => {
    loadDiary()
  }, [date, password])

  const loadDiary = async () => {
    const loadId = ++loadIdRef.current
    try {
      setLoading(true)
      setImagesLoading(false)
      setError('')
      setDiary(null)
      setImages((prev) => {
        prev.forEach((image) => {
          if (image.url) URL.revokeObjectURL(image.url)
        })
        return []
      })

      const key = (await getCachedKey()) || null
      const passwordOrKey = key ?? password
      if (!passwordOrKey) {
        throw new Error(copy.missing)
      }

      const response = await fetch(`/diary/data/${date}.json`)
      if (!response.ok) throw new Error(copy.missing)

      const encryptedData = await response.json()
      const decryptedText = await decryptText(encryptedData.encrypted, passwordOrKey)
      const diaryData = JSON.parse(decryptedText)

      if (loadId !== loadIdRef.current) return

      setDiary(diaryData)
      setLoading(false)

      const imageItems = (diaryData.images ?? [])
        .map((item) => {
          const imageName = typeof item === 'string' ? item : item?.name
          const caption = typeof item === 'string' ? '' : item?.caption || ''
          return imageName ? { id: imageName, imageName, caption, url: null, error: false } : null
        })
        .filter(Boolean)

      if (imageItems.length === 0) return

      setImages(imageItems)
      setImagesLoading(true)

      const decryptKey = key ?? (await getCachedKey())
      const keyForImages = decryptKey ?? password

      await Promise.all(
        imageItems.map(async (item) => {
          try {
            const imgResponse = await fetch(`/diary/images/${item.imageName}`)
            if (!imgResponse.ok) {
              if (loadId !== loadIdRef.current) return
              setImages((prev) =>
                prev.map((img) => (img.id === item.id ? { ...img, error: true } : img))
              )
              return
            }
            const imgData = await imgResponse.json()
            const decryptedImageBuffer = await decryptImage(imgData.encrypted, keyForImages)
            const blob = new Blob([decryptedImageBuffer])
            const url = URL.createObjectURL(blob)
            if (loadId !== loadIdRef.current) {
              URL.revokeObjectURL(url)
              return
            }
            setImages((prev) =>
              prev.map((img) => (img.id === item.id ? { ...img, url } : img))
            )
          } catch (err) {
            console.error('加载图片失败:', item.imageName, err)
            if (loadId !== loadIdRef.current) return
            setImages((prev) =>
              prev.map((img) => (img.id === item.id ? { ...img, error: true } : img))
            )
          }
        })
      )

      if (loadId === loadIdRef.current) {
        setImagesLoading(false)
      }
    } catch (err) {
      if (loadId !== loadIdRef.current) return
      setError(err.message || copy.missing)
      setLoading(false)
      setImagesLoading(false)
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

  const hasImageSection = images.length > 0

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

        {hasImageSection ? (
          <section className="diary-section">
            <h2>{copy.photos}</h2>
            {imagesLoading ? <p className="diary-images-status">{copy.decryptingImages}</p> : null}
            <div className="diary-images">
              {images.map((image) => (
                <figure key={image.id}>
                  {image.url ? (
                    <img src={image.url} alt={image.caption} />
                  ) : (
                    <div className="diary-image-placeholder" aria-hidden="true" />
                  )}
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
