import apiEn from './en/api.js'
import cssEn from './en/css.js'
import engineeringEn from './en/engineering.js'
import homeEn from './en/home.js'
import htmlEn from './en/html.js'
import interviewEn from './en/interview.js'
import jsEn from './en/js.js'
import notesEn from './en/notes.js'
import reactEn from './en/react.js'
import utilsEn from './en/utils.js'
import vueEn from './en/vue.js'
import apiZh from './zh/api.js'
import cssZh from './zh/css.js'
import engineeringZh from './zh/engineering.js'
import homeZh from './zh/home.js'
import htmlZh from './zh/html.js'
import interviewZh from './zh/interview.js'
import jsZh from './zh/js.js'
import notesZh from './zh/notes.js'
import reactZh from './zh/react.js'
import utilsZh from './zh/utils.js'
import vueZh from './zh/vue.js'

const catalog = {
  zh: {
    home: homeZh,
    html: htmlZh,
    js: jsZh,
    css: cssZh,
    react: reactZh,
    vue: vueZh,
    api: apiZh,
    interview: interviewZh,
    utils: utilsZh,
    engineering: engineeringZh,
    notes: notesZh,
  },
  en: {
    home: homeEn,
    html: htmlEn,
    js: jsEn,
    css: cssEn,
    react: reactEn,
    vue: vueEn,
    api: apiEn,
    interview: interviewEn,
    utils: utilsEn,
    engineering: engineeringEn,
    notes: notesEn,
  },
}

export function getHome(lang) {
  return catalog[lang].home
}

export function getArticle(lang, pageKey) {
  return catalog[lang][pageKey]
}
