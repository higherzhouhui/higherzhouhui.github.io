import { useEffect, useRef } from 'react'
import './StudyTest.css'

export default function StudyTest() {
  const paperRef = useRef(null)

  useEffect(() => {
    document.title = 'Study New'
    const paper = paperRef.current
    if (!paper) return

    const message = 'This is a printer animation!'
    paper.classList.add('print')
    paper.querySelector('p').textContent = message
    const timer = setTimeout(() => {
      paper.classList.remove('print')
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="printer">
      <div className="paper" ref={paperRef}>
        <p>Printing</p>
      </div>
      <div className="printer-body" />
    </div>
  )
}
