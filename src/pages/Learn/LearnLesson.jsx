import { useEffect, useState } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import BusinessLesson from './BusinessLesson.jsx'
import GrowLesson from './GrowLesson.jsx'
import LanguageLesson from './LanguageLesson.jsx'
import {
  SUBJECTS,
  fetchLearnIndex,
  fetchLesson,
  fill,
  formatLearnDate,
  formatShortDate,
  isIsoDate,
  isSubject,
} from './learn.js'

function StatusLine({ children }) {
  return <p className="py-16 text-center text-dim">{children}</p>
}

export default function LearnLesson() {
  const { subject, date } = useParams()
  const { t, lang } = useI18n()
  const copy = t.learn
  const knownSubject = isSubject(subject)
  const knownDate = isIsoDate(date)
  const [status, setStatus] = useState(knownSubject && knownDate ? 'loading' : 'missing')
  const [lesson, setLesson] = useState(null)
  const [entries, setEntries] = useState([])

  useEffect(() => {
    document.title = `${copy.title} · ${t.brand}`
  }, [copy.title, t.brand])

  useEffect(() => {
    if (!knownSubject || !knownDate) {
      setStatus('missing')
      setLesson(null)
      return undefined
    }

    let cancelled = false
    setStatus('loading')
    setLesson(null)

    Promise.all([
      fetchLesson(subject, date),
      fetchLearnIndex().catch(() => ({ entries: [] })),
    ])
      .then(([nextLesson, index]) => {
        if (cancelled) return
        setEntries(index.entries)
        setLesson(nextLesson)
        setStatus(nextLesson ? 'ready' : 'missing')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [subject, date, knownSubject, knownDate])

  useEffect(() => {
    if (status === 'ready' && lesson?.title) {
      document.title = `${lesson.title} · ${copy.title}`
    }
  }, [status, lesson, copy.title])

  const entryIndex = entries.findIndex((entry) => entry.date === date)
  const newer = entryIndex > 0 ? entries[entryIndex - 1] : null
  const older = entryIndex >= 0 && entryIndex < entries.length - 1 ? entries[entryIndex + 1] : null

  return (
    <div className="pb-28 md:pb-0">
      <Link to="/learn" className="link-draw font-mono text-[11px] tracking-[0.16em] text-gold">
        ← {copy.back}
      </Link>

      {knownSubject && knownDate ? (
        <nav className="mt-5 grid grid-cols-4 border border-line" aria-label={copy.title}>
          {SUBJECTS.map((item) => (
            <NavLink
              key={item}
              to={`/learn/${item}/${date}`}
              className={({ isActive }) =>
                `flex min-h-12 items-center justify-center px-1 py-3 text-center font-display text-sm leading-tight sm:text-lg sm:leading-none ${
                  isActive ? 'bg-ink text-page' : 'text-dim'
                }`
              }
            >
              {copy.subjects[item]}
            </NavLink>
          ))}
        </nav>
      ) : null}

      {status === 'loading' ? <StatusLine>{copy.loading}</StatusLine> : null}
      {status === 'error' ? <StatusLine>{copy.loadFail}</StatusLine> : null}
      {status === 'missing' ? <StatusLine>{knownSubject ? copy.notFound : copy.badSubject}</StatusLine> : null}

      {status === 'ready' && lesson ? (
        <>
          <header className="mt-8">
            <p className="font-mono text-[11px] tracking-[0.16em] text-gold">
              {lesson.day ? fill(copy.dayN, { n: lesson.day }) : copy.subjects[subject]}
              {lesson.minutes ? ` · ${fill(copy.minutes, { n: lesson.minutes })}` : ''}
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight md:text-6xl">{lesson.title}</h1>
            <p className="mt-3 text-sm text-dim">{formatLearnDate(date, lang)}</p>
          </header>

          <div className="mt-8">
            {subject === 'business' ? (
              <BusinessLesson lesson={lesson} />
            ) : subject === 'grow' ? (
              <GrowLesson lesson={lesson} />
            ) : (
              <LanguageLesson key={`${subject}-${date}`} subject={subject} lesson={lesson} />
            )}
          </div>

          {older || newer ? (
            <nav className="mt-12 flex items-center justify-between gap-4 border-t border-line pt-5 font-display text-xl">
              {older ? (
                <Link to={`/learn/${subject}/${older.date}`} className="link-draw">
                  ← {formatShortDate(older.date, lang)}
                </Link>
              ) : (
                <span />
              )}
              {newer ? (
                <Link to={`/learn/${subject}/${newer.date}`} className="link-draw">
                  {formatShortDate(newer.date, lang)} →
                </Link>
              ) : null}
            </nav>
          ) : null}
        </>
      ) : null}
    </div>
  )
}
