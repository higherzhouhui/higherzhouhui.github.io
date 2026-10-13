import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider.jsx'
import './LabScroll.css'

const MESSAGE =
  'Hãy sử dụng app live FBS, tham gia trò chơi rinh về quà khủng, hoạt động ưu đãi tặng thưởng liên tục. Chi tiết xem tại trang chủ của app.          '

export default function LabScroll() {
  const { t } = useI18n()
  const wrapRef = useRef(null)
  const beginRef = useRef(null)
  const endRef = useRef(null)

  useEffect(() => {
    document.title = `${t.scroll} · ${t.brand}`
  }, [t])

  useEffect(() => {
    const wrap = wrapRef.current
    const begin = beginRef.current
    const end = endRef.current
    if (!wrap || !begin || !end) return

    end.innerHTML = begin.innerHTML
    const speed = 30
    const marquee = () => {
      if (end.offsetWidth - wrap.scrollLeft <= 0) {
        wrap.scrollLeft -= begin.offsetWidth
      } else {
        wrap.scrollLeft += 1
      }
    }

    let timer = setInterval(marquee, speed)
    const pause = () => clearInterval(timer)
    const resume = () => {
      timer = setInterval(marquee, speed)
    }
    wrap.addEventListener('mouseover', pause)
    wrap.addEventListener('mouseout', resume)

    return () => {
      clearInterval(timer)
      wrap.removeEventListener('mouseover', pause)
      wrap.removeEventListener('mouseout', resume)
    }
  }, [])

  return (
    <div>
      <p className="text-[11px] tracking-[0.32em] text-gold">{t.exhibit}</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-display text-5xl">{t.scroll}</h1>
        <Link to="/lab" className="text-sm text-dim hover:text-gold">
          {t.labTitle}
        </Link>
      </div>
      <p className="mt-3 max-w-xl text-dim">{t.scrollDesc}</p>
      <div className="lab-scroll mt-16">
        <div className="stage" ref={wrapRef}>
          <div className="begin" ref={beginRef}>
            {MESSAGE}
          </div>
          <div className="end" ref={endRef} />
        </div>
      </div>
    </div>
  )
}
