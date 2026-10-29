import { useEffect } from 'react'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { collectLines, lessonLang } from './learn.js'
import { useSpeech } from './useSpeech.js'

function SpeakRow({ id, text, roman, meaning, kind, lang, active, speakLabel, playingLabel, onSpeak }) {
  const playing = active === id
  const foreignClass =
    kind === 'thai'
      ? 'font-thai text-[2rem] font-medium leading-tight md:text-[2.5rem]'
      : kind === 'say'
        ? 'font-latin text-[1.45rem] italic leading-snug md:text-[1.75rem]'
        : 'font-latin text-[2.6rem] leading-none md:text-5xl'

  return (
    <div
      id={`line-${id}`}
      className={`flex scroll-my-28 border-l-[3px] ${playing ? 'border-gold bg-elevated' : 'border-transparent'}`}
    >
      <button type="button" onClick={() => onSpeak(text, lang, id)} className="min-h-16 flex-1 px-4 py-4 text-left">
        <span className={`block break-words ${foreignClass}`}>{text}</span>
        {roman ? <span className="mt-1 block font-mono text-sm tracking-wide text-dim">{roman}</span> : null}
        {meaning ? <span className="mt-1 block text-sm leading-6 text-dim">{meaning}</span> : null}
        {playing ? <span className="mt-2 block font-mono text-[10px] tracking-[0.16em] text-gold">{playingLabel}</span> : null}
      </button>
      <button
        type="button"
        aria-label={speakLabel}
        aria-pressed={playing}
        onClick={() => onSpeak(text, lang, id)}
        className="grid w-16 shrink-0 place-items-center"
      >
        <span
          aria-hidden
          className={`grid h-12 w-12 place-items-center rounded-full border text-xl ${
            playing ? 'border-gold text-gold' : 'border-line'
          }`}
        >
          🔊
        </span>
      </button>
    </div>
  )
}

function Block({ children }) {
  return <article className="overflow-hidden border border-line">{children}</article>
}

export default function LanguageLesson({ subject, lesson }) {
  const { t } = useI18n()
  const copy = t.learn
  const lang = lessonLang(subject, lesson)
  const lines = collectLines(subject, lesson)
  const speech = useSpeech({ unsupported: copy.unsupported, speakFail: copy.speakFail })
  const { activeId, playingAll, toast, speak, playAll, stop } = speech

  useEffect(() => () => stop(), [stop])

  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return undefined
    const previous = footer.style.paddingBottom
    footer.style.paddingBottom = '6rem'
    return () => {
      footer.style.paddingBottom = previous
    }
  }, [])

  useEffect(() => {
    if (!activeId || !playingAll) return
    const node = document.getElementById(`line-${activeId}`)
    if (!node) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    node.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' })
  }, [activeId, playingAll])

  const onPlayAll = () => {
    if (playingAll) {
      stop()
      return
    }
    playAll(lines, lang)
  }

  return (
    <div>
      <p className="max-w-xl text-base leading-7 text-dim">{copy.listen}</p>
      {subject === 'thai' && lesson.tip ? (
        <p className="mt-5 border-l-[3px] border-gold pl-4 text-base leading-7">{lesson.tip}</p>
      ) : null}

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-page/95 px-5 py-3 backdrop-blur-md md:static md:z-auto md:mt-6 md:border-0 md:bg-transparent md:px-0 md:py-0">
        <div className="pb-[max(0px,env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={onPlayAll}
            disabled={lines.length === 0}
            aria-pressed={playingAll}
            className="flex min-h-12 w-full items-center justify-center border border-ink bg-ink px-6 font-display text-lg text-page disabled:opacity-40 md:w-auto"
          >
            {playingAll ? copy.stop : copy.playAll}
          </button>
        </div>
      </div>

      {subject === 'english' ? (
        <div className="mt-8 grid gap-8">
          {(lesson.words ?? []).length > 0 ? (
            <section className="grid gap-3">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">{copy.words}</h2>
              {(lesson.words ?? []).map((word, index) => (
                <Block key={`${word.term}-${index}`}>
                  <SpeakRow
                    id={`word-${index}`}
                    text={word.term}
                    meaning={word.meaning}
                    kind="word"
                    lang={lang}
                    active={activeId}
                    speakLabel={`${copy.speak} ${word.speak || word.term}`}
                    playingLabel={copy.playing}
                    onSpeak={() => speak(word.speak || word.term, lang, `word-${index}`)}
                  />
                  {word.example ? (
                    <div className="border-t border-line">
                      <SpeakRow
                        id={`word-${index}-ex`}
                        text={word.example}
                        kind="say"
                        lang={lang}
                        active={activeId}
                        speakLabel={`${copy.speak} ${word.example}`}
                        playingLabel={copy.playing}
                        onSpeak={() => speak(word.example, lang, `word-${index}-ex`)}
                      />
                    </div>
                  ) : null}
                </Block>
              ))}
            </section>
          ) : null}

          {(lesson.sentences ?? []).length > 0 ? (
            <section className="grid gap-3">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">{copy.sentences}</h2>
              {(lesson.sentences ?? []).map((sentence, index) => (
                <Block key={`${sentence.en}-${index}`}>
                  <SpeakRow
                    id={`sentence-${index}`}
                    text={sentence.en}
                    meaning={sentence.zh}
                    kind="say"
                    lang={lang}
                    active={activeId}
                    speakLabel={`${copy.speak} ${sentence.speak || sentence.en}`}
                    playingLabel={copy.playing}
                    onSpeak={() => speak(sentence.speak || sentence.en, lang, `sentence-${index}`)}
                  />
                </Block>
              ))}
            </section>
          ) : null}
        </div>
      ) : (
        <div className="mt-8 grid gap-8">
          {(lesson.items ?? []).length > 0 ? (
            <section className="grid gap-3">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">{copy.items}</h2>
              {(lesson.items ?? []).map((item, index) => (
                <Block key={`${item.th}-${index}`}>
                  <SpeakRow
                    id={`item-${index}`}
                    text={item.th}
                    roman={item.roman}
                    meaning={item.zh}
                    kind="thai"
                    lang={lang}
                    active={activeId}
                    speakLabel={`${copy.speak} ${item.speak || item.th}`}
                    playingLabel={copy.playing}
                    onSpeak={() => speak(item.speak || item.th, lang, `item-${index}`)}
                  />
                </Block>
              ))}
            </section>
          ) : null}

          {(lesson.scenes ?? []).length > 0 ? (
            <section className="grid gap-3">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">{copy.scenes}</h2>
              {(lesson.scenes ?? []).map((scene, index) => (
                <Block key={`${scene.th}-${index}`}>
                  <SpeakRow
                    id={`scene-${index}`}
                    text={scene.th}
                    roman={scene.roman}
                    meaning={scene.zh}
                    kind="thai"
                    lang={lang}
                    active={activeId}
                    speakLabel={`${copy.speak} ${scene.speak || scene.th}`}
                    playingLabel={copy.playing}
                    onSpeak={() => speak(scene.speak || scene.th, lang, `scene-${index}`)}
                  />
                </Block>
              ))}
            </section>
          ) : null}
        </div>
      )}

      {lesson.task ? (
        <aside className="mt-8 border border-gold bg-elevated p-5">
          <p className="font-mono text-[11px] tracking-[0.18em] text-gold">{copy.task}</p>
          <p className="mt-3 font-display text-2xl font-bold leading-snug">{lesson.task}</p>
        </aside>
      ) : null}

      {toast ? (
        <div
          role="status"
          className="fixed left-1/2 top-20 z-50 w-[min(22rem,calc(100%-2.5rem))] -translate-x-1/2 border border-line bg-elevated px-4 py-3 text-center text-sm leading-6"
        >
          {toast}
        </div>
      ) : null}
    </div>
  )
}
