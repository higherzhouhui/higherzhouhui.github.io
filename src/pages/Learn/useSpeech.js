import { useCallback, useEffect, useRef, useState } from 'react'

function preferredVoice(lang) {
  const voices = window.speechSynthesis?.getVoices?.() ?? []
  const norm = (value) => String(value || '').toLowerCase().replaceAll('_', '-')
  const target = norm(lang)
  const prefix = target.slice(0, 2)
  return (
    voices.find((voice) => norm(voice.lang) === target)
    || voices.find((voice) => norm(voice.lang).startsWith(`${prefix}-`))
    || voices.find((voice) => norm(voice.lang).startsWith(prefix))
    || null
  )
}

function canSpeak() {
  return typeof window !== 'undefined'
    && 'speechSynthesis' in window
    && window.speechSynthesis != null
    && typeof window.SpeechSynthesisUtterance === 'function'
}

export function useSpeech(messages) {
  const [activeId, setActiveId] = useState(null)
  const [playingAll, setPlayingAll] = useState(false)
  const [toast, setToast] = useState('')
  const runRef = useRef(0)
  const timerRef = useRef(0)
  const kickRef = useRef(0)
  const toastTimer = useRef(0)
  const messagesRef = useRef(messages)
  messagesRef.current = messages

  const clearRunTimers = () => {
    window.clearTimeout(timerRef.current)
    window.clearInterval(kickRef.current)
  }

  const showToast = useCallback((text) => {
    setToast(text)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(''), 3200)
  }, [])

  const stop = useCallback(() => {
    runRef.current += 1
    clearRunTimers()
    setActiveId(null)
    setPlayingAll(false)
    window.speechSynthesis?.cancel?.()
  }, [])

  useEffect(() => {
    if (!canSpeak()) return undefined
    window.speechSynthesis.getVoices()
    const onVoices = () => window.speechSynthesis.getVoices()
    window.speechSynthesis.addEventListener('voiceschanged', onVoices)
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', onVoices)
      runRef.current += 1
      clearRunTimers()
      window.clearTimeout(toastTimer.current)
      window.speechSynthesis.cancel()
    }
  }, [])

  const utter = (run, text, lang, id, onDone) => {
    const piece = new SpeechSynthesisUtterance(text)
    piece.lang = lang
    try {
      const voice = preferredVoice(lang)
      if (voice) piece.voice = voice
    } catch {
      // A voice object the browser rejects should not block lang-based speech.
    }
    piece.rate = lang.toLowerCase().startsWith('th') ? 0.82 : 0.94
    piece.onstart = () => {
      if (run === runRef.current) setActiveId(id)
    }
    piece.onend = () => {
      if (run !== runRef.current) return
      onDone()
    }
    piece.onerror = (event) => {
      if (run !== runRef.current) return
      const reason = event.error
      if (reason === 'interrupted' || reason === 'canceled' || reason === 'cancelled') return
      setActiveId(null)
      setPlayingAll(false)
      clearRunTimers()
      const blocked = reason === 'not-allowed' || reason === 'synthesis-unavailable' || reason === 'language-unavailable'
      showToast(blocked ? messagesRef.current.unsupported : messagesRef.current.speakFail)
    }
    window.speechSynthesis.resume()
    window.speechSynthesis.speak(piece)
  }

  // Speak inside the tap, with no delay. Phones drop speechSynthesis calls
  // that happen after the click stack (iOS especially).
  const speak = (text, lang, id) => {
    if (!text) return
    if (!canSpeak()) {
      showToast(messagesRef.current.unsupported)
      return
    }
    stop()
    const run = runRef.current
    utter(run, text, lang, id, () => {
      if (run === runRef.current) setActiveId(null)
    })
  }

  const playAll = (lines, lang) => {
    const queue = (lines ?? []).filter((line) => line?.text)
    if (!canSpeak()) {
      showToast(messagesRef.current.unsupported)
      return
    }
    if (queue.length === 0) return
    stop()
    const run = runRef.current
    setPlayingAll(true)
    kickRef.current = window.setInterval(() => {
      if (run !== runRef.current) return
      if (window.speechSynthesis.paused) window.speechSynthesis.resume()
    }, 4000)

    let index = 0
    const next = () => {
      if (run !== runRef.current) return
      if (index >= queue.length) {
        setActiveId(null)
        setPlayingAll(false)
        window.clearInterval(kickRef.current)
        return
      }
      const line = queue[index]
      index += 1
      utter(run, line.text, lang, line.id, () => {
        timerRef.current = window.setTimeout(next, 420)
      })
    }
    next()
  }

  return { activeId, playingAll, toast, speak, playAll, stop }
}