import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LegacyPage({ html, title }) {
  const navigate = useNavigate()
  const rootRef = useRef(null)

  useEffect(() => {
    if (title) {
      document.title = title
    }
  }, [title])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const onClick = (event) => {
      const anchor = event.target.closest('a')
      if (!anchor || event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      if (anchor.target && anchor.target !== '_self') return
      if (anchor.hasAttribute('download')) return

      const href = anchor.getAttribute('href')
      if (!href || href.startsWith('#')) return

      const url = new URL(anchor.href)
      if (url.origin !== window.location.origin) return

      event.preventDefault()
      navigate(`${url.pathname}${url.search}${url.hash}`)
    }

    root.addEventListener('click', onClick)
    return () => root.removeEventListener('click', onClick)
  }, [navigate])

  return <div ref={rootRef} dangerouslySetInnerHTML={{ __html: html }} />
}
