import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { SUBJECTS, fetchLearnIndex, fill, formatLearnDate, formatShortDate, shanghaiToday } from './learn.js'

export default function LearnHub() {
  const { t, lang } = useI18n()
  const copy = t.learn
  const today = shanghaiToday()
  const [status, setStatus] = useState('loading')
  const [entries, setEntries] = useState([])

  useEffect(() => {
    document.title = `${copy.title} · ${t.brand}`
  }, [copy.title, t.brand])

  useEffect(() => {
    let cancelled = false
    fetchLearnIndex()
      .then((index) => {
        if (cancelled) return
        setEntries(index.entries)
        setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [])

  const todayEntry = entries.find((entry) => entry.date === today)
  const earlier = entries.filter((entry) => entry.date !== today)

  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">{copy.kicker}</p>
      <h1 className="mt-3 font-display text-5xl font-bold leading-none md:text-7xl">{copy.title}</h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-dim md:text-lg md:leading-8">{copy.lead}</p>

      <div className="mt-8 flex items-end justify-between gap-4 border-y border-line py-4">
        <div>
          <p className="font-mono text-[11px] tracking-[0.16em] text-gold">{copy.today}</p>
          <p className="mt-1 font-display text-2xl font-bold leading-tight md:text-3xl">{formatLearnDate(today, lang)}</p>
        </div>
        {todayEntry?.day ? (
          <p className="font-mono text-xs text-dim">{fill(copy.dayN, { n: todayEntry.day })}</p>
        ) : null}
      </div>

      {status === 'loading' ? <p className="py-16 text-center text-dim">{copy.loading}</p> : null}
      {status === 'error' ? <p className="py-16 text-center text-dim">{copy.loadFail}</p> : null}

      {status === 'ready' ? (
        <>
          {!todayEntry ? <p className="mt-4 text-sm text-dim">{copy.missingToday}</p> : null}
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {SUBJECTS.map((subject, index) => {
              const meta = todayEntry?.subjects?.[subject]
              return (
                <Link
                  key={subject}
                  to={`/learn/${subject}/${today}`}
                  className="group flex min-h-28 items-center gap-4 border border-line p-5 transition duration-300 hover:bg-ink hover:text-page"
                >
                  <span className="font-mono text-xs text-gold">{String(index + 1).padStart(2, '0')}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-3xl font-bold leading-none">{copy.subjects[subject]}</span>
                    <span className="mt-2 block text-sm leading-6 text-dim group-hover:text-page group-hover:opacity-80">
                      {meta?.title || copy.subjectLead[subject]}
                      {meta?.minutes ? ` · ${fill(copy.minutes, { n: meta.minutes })}` : ''}
                    </span>
                  </span>
                  <span aria-hidden className="font-display text-2xl">
                    →
                  </span>
                </Link>
              )
            })}
          </div>

          {earlier.length > 0 ? (
            <section className="mt-14">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">{copy.archive}</h2>
              <div className="mt-4 divide-y divide-line border-y border-line">
                {earlier.map((entry) => (
                  <article key={entry.date} className="py-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-2xl font-bold">{formatShortDate(entry.date, lang)}</h3>
                      {entry.day ? <span className="font-mono text-xs text-dim">{fill(copy.dayN, { n: entry.day })}</span> : null}
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {SUBJECTS.map((subject) => (
                        <Link
                          key={subject}
                          to={`/learn/${subject}/${entry.date}`}
                          className="border border-line px-2 py-3 text-center text-sm"
                        >
                          {entry.subjects?.[subject]?.title || copy.subjects[subject]}
                        </Link>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}
        </>
      ) : null}
    </div>
  )
}
