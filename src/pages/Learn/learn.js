export const SUBJECTS = ['business', 'english', 'thai']

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

export function isSubject(value) {
  return SUBJECTS.includes(value)
}

export function isIsoDate(value) {
  if (!DATE_RE.test(value || '')) return false
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
}

export function shanghaiToday(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now)
}

export function formatLearnDate(dateStr, lang) {
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  if (lang === 'en') {
    return date.toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric', weekday: 'short' })
  }
  const weekdays = ['日', '一', '二', '三', '四', '五', '六']
  return `${year}年${month}月${day}日 周${weekdays[date.getDay()]}`
}

export function formatShortDate(dateStr, lang) {
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  if (lang === 'en') return date.toLocaleDateString('en', { month: 'short', day: 'numeric' })
  return `${month}月${day}日`
}

export function fill(template, values) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replaceAll(`{${key}}`, String(value)),
    template,
  )
}

export function sortEntries(entries) {
  return [...(entries ?? [])]
    .filter((entry) => entry?.date)
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
}

export async function fetchLearnIndex() {
  const response = await fetch('/learn/data/index.json')
  if (!response.ok) throw new Error('index')
  const data = await response.json()
  return { entries: sortEntries(data.entries) }
}

export async function fetchLesson(subject, date) {
  const response = await fetch(`/learn/data/${date}/${subject}.json`)
  if (response.status === 404) return null
  const type = response.headers.get('content-type') || ''
  // Vite's SPA fallback serves index.html with 200 when the JSON is not there yet.
  if (type.includes('text/html')) return null
  if (!response.ok) throw new Error('lesson')
  try {
    return await response.json()
  } catch {
    return null
  }
}

export function lessonLang(subject, lesson) {
  if (lesson?.lang) return lesson.lang
  if (subject === 'thai') return 'th-TH'
  return 'en-US'
}

export function collectLines(subject, lesson) {
  const lines = []
  if (subject === 'english') {
    ;(lesson.words ?? []).forEach((word, index) => {
      const term = word.speak || word.term
      if (term) lines.push({ id: `word-${index}`, text: term })
      if (word.example) lines.push({ id: `word-${index}-ex`, text: word.example })
    })
    ;(lesson.sentences ?? []).forEach((sentence, index) => {
      const text = sentence.speak || sentence.en
      if (text) lines.push({ id: `sentence-${index}`, text })
    })
  }
  if (subject === 'thai') {
    ;(lesson.items ?? []).forEach((item, index) => {
      const text = item.speak || item.th
      if (text) lines.push({ id: `item-${index}`, text })
    })
    ;(lesson.scenes ?? []).forEach((scene, index) => {
      const text = scene.speak || scene.th
      if (text) lines.push({ id: `scene-${index}`, text })
    })
  }
  return lines
}
