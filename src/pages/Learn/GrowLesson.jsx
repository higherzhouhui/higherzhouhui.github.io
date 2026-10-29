import { useI18n } from '../../i18n/I18nProvider.jsx'

function Label({ index, children }) {
  return (
    <p className="font-mono text-[11px] tracking-[0.18em] text-gold">
      {String(index).padStart(2, '0')} {children}
    </p>
  )
}

export default function GrowLesson({ lesson }) {
  const { t } = useI18n()
  const copy = t.learn
  const quote = lesson.quote ?? {}
  const study = lesson.lesson ?? {}
  const steps = (study.do ?? []).filter(Boolean)
  let index = 0

  return (
    <div>
      {quote.text ? (
        <section className="border border-line bg-elevated p-5 md:p-7">
          <Label index={++index}>{copy.quote}</Label>
          <blockquote className="mt-4 font-display text-3xl font-bold leading-snug md:text-4xl">{quote.text}</blockquote>
          {quote.source ? <p className="mt-4 font-mono text-xs tracking-wide text-dim">{quote.source}</p> : null}
          {quote.why ? (
            <div className="mt-5 border-t border-line pt-4">
              <p className="font-mono text-[11px] tracking-[0.18em] text-gold">{copy.quoteWhy}</p>
              <p className="mt-2 max-w-2xl text-base leading-7">{quote.why}</p>
            </div>
          ) : null}
        </section>
      ) : null}

      {study.title || study.story || study.principle || steps.length > 0 || study.reflect ? (
        <div className="mt-8">
          {study.title ? <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">{study.title}</h2> : null}
          <div className={`grid gap-3 ${study.title ? 'mt-4' : ''}`}>
            {study.story ? (
              <section className="border border-line p-5">
                <Label index={++index}>{copy.story}</Label>
                <p className="mt-3 text-lg leading-8">{study.story}</p>
              </section>
            ) : null}
            {study.principle ? (
              <section className="border border-line p-5">
                <Label index={++index}>{copy.principle}</Label>
                <p className="mt-3 font-display text-2xl font-bold leading-snug">{study.principle}</p>
              </section>
            ) : null}
            {steps.length > 0 ? (
              <section className="border border-line p-5">
                <Label index={++index}>{copy.doToday}</Label>
                <ol className="mt-4 space-y-4">
                  {steps.map((item, stepIndex) => (
                    <li key={`${stepIndex}-${item}`} className="text-lg leading-8">
                      <span className="mr-2 font-mono text-xs text-gold">{String(stepIndex + 1).padStart(2, '0')}</span>
                      {item}
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}
            {study.reflect ? (
              <section className="border border-line bg-elevated p-5">
                <Label index={++index}>{copy.reflect}</Label>
                <p className="mt-3 font-display text-2xl font-bold leading-snug">{study.reflect}</p>
              </section>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}
