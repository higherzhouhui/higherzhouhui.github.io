import { useI18n } from '../../i18n/I18nProvider.jsx'

const FIELDS = ['background', 'howMoney', 'keyCosts', 'keyRisks']

export default function BusinessLesson({ lesson }) {
  const { t } = useI18n()
  const copy = t.learn
  const study = lesson.case ?? {}
  const cards = FIELDS.filter((key) => study[key])
  const questions = (study.questions ?? []).filter(Boolean)

  return (
    <div className="grid gap-3">
      {cards.map((key, index) => (
        <section key={key} className="border border-line p-5">
          <p className="font-mono text-[11px] tracking-[0.18em] text-gold">
            {String(index + 1).padStart(2, '0')} {copy[key]}
          </p>
          <p className="mt-3 text-lg leading-8">{study[key]}</p>
        </section>
      ))}
      {questions.length > 0 ? (
        <section className="border border-line bg-elevated p-5">
          <p className="font-mono text-[11px] tracking-[0.18em] text-gold">
            {String(cards.length + 1).padStart(2, '0')} {copy.questions}
          </p>
          <ol className="mt-4 space-y-4">
            {questions.map((question) => (
              <li key={question} className="font-display text-2xl font-bold leading-snug">
                {question}
              </li>
            ))}
          </ol>
        </section>
      ) : null}
    </div>
  )
}
