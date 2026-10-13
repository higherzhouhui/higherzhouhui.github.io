import { useEffect, useRef } from 'react'
import './TextScroll.css'

const MESSAGE =
  'Hãy sử dụng app live FBS, tham gia trò chơi rinh về quà khủng, hoạt động ưu đãi tặng thưởng liên tục. Chi tiết xem tại trang chủ của app.          '

export default function TextScroll() {
  const wrapRef = useRef(null)
  const beginRef = useRef(null)
  const endRef = useRef(null)

  useEffect(() => {
    document.title = '文字滚动'
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
    <div id="scroll_div" className="fl" ref={wrapRef}>
      <div id="scroll_begin" ref={beginRef}>
        {MESSAGE}
      </div>
      <div id="scroll_end" ref={endRef} />
    </div>
  )
}
