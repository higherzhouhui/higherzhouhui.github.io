import { useCallback, useEffect, useRef, useState } from 'react'

const FAIL_TOAST = '暂时播不了，请检查网络或稍后重试'

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

function audioUrls(lang, text) {
  const q = encodeURIComponent(text)
  if (String(lang).toLowerCase().startsWith('th')) {
    // Baidu gettts rejects lan=th (403). Youdao still returns Thai audio and is
    // reachable in mainland China; Google is last because it is often blocked there.
    // no-referrer is required: Baidu and Google refuse a third-party Referer.
    return [
      `https://fanyi.baidu.com/gettts?lan=th&text=${q}&spd=3&source=web`,
      `https://dict.youdao.com/dictvoice?audio=${q}&le=th`,
      `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=th&q=${q}`,
    ]
  }
  return [
    `https://dict.youdao.com/dictvoice?audio=${q}&le=eng`,
    `https://fanyi.baidu.com/gettts?lan=en&text=${q}&spd=3&source=web`,
    `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en&q=${q}`,
  ]
}

function speechShouldFallBack(reason) {
  return reason === 'language-unavailable'
    || reason === 'synthesis-failed'
    || reason === 'synthesis-unavailable'
    || reason === 'not-allowed'
    || reason === 'audio-busy'
}

export function useSpeech(messages) {
  const [activeId, setActiveId] = useState(null)
  const [playingAll, setPlayingAll] = useState(false)
  const [toast, setToast] = useState('')
  const runRef = useRef(0)
  const gapRef = useRef(0)
  const watchRef = useRef(0)
  const kickRef = useRef(0)
  const toastTimer = useRef(0)
  const audioRef = useRef(null)
  const messagesRef = useRef(messages)
  messagesRef.current = messages

  const clearRunTimers = () => {
    window.clearTimeout(gapRef.current)
    window.clearTimeout(watchRef.current)
    window.clearInterval(kickRef.current)
  }

  const showToast = useCallback((text) => {
    setToast(text)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(''), 3200)
  }, [])

  const failToast = () => messagesRef.current.playbackFail || FAIL_TOAST

  const stopAudio = () => {
    const audio = audioRef.current
    audioRef.current = null
    if (!audio) return
    audio.onended = null
    audio.onerror = null
    audio.onplaying = null
    audio.pause()
    audio.removeAttribute('src')
    try {
      audio.load()
    } catch {
      // Ignore browsers that reject load() with an empty source.
    }
  }

  const openAudio = () => {
    stopAudio()
    const audio = new Audio()
    audio.preload = 'auto'
    audio.referrerPolicy = 'no-referrer'
    audioRef.current = audio
    return audio
  }

  const stop = useCallback(() => {
    runRef.current += 1
    clearRunTimers()
    setActiveId(null)
    setPlayingAll(false)
    window.speechSynthesis?.cancel?.()
    stopAudio()
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
      stopAudio()
    }
  }, [])

  const giveUp = (run) => {
    if (run !== runRef.current) return
    setActiveId(null)
    setPlayingAll(false)
    clearRunTimers()
    showToast(failToast())
  }

  const playAudio = (run, urls, id, onDone, index = 0) => {
    if (run !== runRef.current) return
    if (index >= urls.length) {
      giveUp(run)
      return
    }
    const audio = openAudio()
    let settled = false
    const nextUrl = () => {
      if (settled || run !== runRef.current) return
      settled = true
      window.clearTimeout(watchRef.current)
      audio.onended = null
      audio.onerror = null
      audio.onplaying = null
      audio.pause()
      playAudio(run, urls, id, onDone, index + 1)
    }
    setActiveId(id)
    audio.onplaying = () => {
      window.clearTimeout(watchRef.current)
      if (run === runRef.current) setActiveId(id)
    }
    audio.onended = () => {
      if (settled || run !== runRef.current) return
      settled = true
      window.clearTimeout(watchRef.current)
      onDone()
    }
    audio.onerror = nextUrl
    watchRef.current = window.setTimeout(nextUrl, 4500)
    audio.src = urls[index]
    const pending = audio.play()
    if (pending && typeof pending.catch === 'function') pending.catch(nextUrl)
  }

  const playLine = (run, text, lang, id, onDone) => {
    const urls = audioUrls(lang, text)
    const voice = canSpeak() ? preferredVoice(lang) : null
    if (!voice) {
      window.speechSynthesis?.cancel?.()
      playAudio(run, urls, id, onDone)
      return
    }

    let handed = false
    const started = { at: 0 }
    const handoff = () => {
      if (handed || run !== runRef.current) return
      handed = true
      window.clearTimeout(watchRef.current)
      window.speechSynthesis.cancel()
      playAudio(run, urls, id, onDone)
    }

    const piece = new SpeechSynthesisUtterance(text)
    piece.lang = lang
    try {
      piece.voice = voice
    } catch {
      handoff()
      return
    }
    piece.rate = String(lang).toLowerCase().startsWith('th') ? 0.82 : 0.94
    piece.onstart = () => {
      started.at = performance.now()
      window.clearTimeout(watchRef.current)
      if (run === runRef.current) setActiveId(id)
    }
    piece.onend = () => {
      if (handed || run !== runRef.current) return
      const elapsed = started.at ? performance.now() - started.at : 0
      if (!started.at || elapsed < 140) {
        handoff()
        return
      }
      handed = true
      onDone()
    }
    piece.onerror = (event) => {
      if (handed || run !== runRef.current) return
      const reason = event.error
      if (reason === 'interrupted' || reason === 'canceled' || reason === 'cancelled') return
      if (speechShouldFallBack(reason)) {
        handoff()
        return
      }
      handed = true
      giveUp(run)
    }

    setActiveId(id)
    watchRef.current = window.setTimeout(() => {
      if (!started.at) handoff()
    }, 900)
    window.speechSynthesis.cancel()
    window.speechSynthesis.resume()
    window.speechSynthesis.speak(piece)
  }

  const speak = (text, lang, id) => {
    if (!text) return
    stop()
    const run = runRef.current
    playLine(run, text, lang, id, () => {
      if (run === runRef.current) setActiveId(null)
    })
  }

  const playAll = (lines, lang) => {
    const queue = (lines ?? []).filter((line) => line?.text)
    if (queue.length === 0) return
    stop()
    const run = runRef.current
    setPlayingAll(true)
    if (canSpeak()) {
      kickRef.current = window.setInterval(() => {
        if (run !== runRef.current) return
        if (window.speechSynthesis.paused) window.speechSynthesis.resume()
      }, 4000)
    }
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
      playLine(run, line.text, lang, line.id, () => {
        gapRef.current = window.setTimeout(next, 420)
      })
    }
    next()
  }

  return { activeId, playingAll, toast, speak, playAll, stop }
}
