export default {
  kicker: 'SNIPPETS  ·  HAND TOOLS',
  title: 'Utility drawer',
  lead: 'Small tools that interviews and tickets reopen. Check edges before you paste: regexes age, algorithms fear empty strings.',
  sections: [
    {
      id: 'gn',
      title: 'Thousands separators',
      blocks: [
        { type: 'code', lang: 'js', code: `str.replace(/(\\d)(?=(?:\\d{3})+$)/g, '$1,')
Number(str).toLocaleString()` },
        'toLocaleString handles fractions. Intl.NumberFormat also knows currency.',
      ],
    },
    {
      id: 'yyh',
      title: 'Phone, extension, filled arrays',
      blocks: [
        {
          type: 'code',
          lang: 'ts',
          code: `function getExt(name: string) {
  return name.slice(name.lastIndexOf('.'))
}
const filled = (n: number) => Array.from({ length: n }, (_, i) => i)`,
        },
      ],
    },
    {
      id: 'lxzc',
      title: 'Longest common substring',
      blocks: [
        'Slide the shortest string from full length down; test each window with includes.',
        {
          type: 'code',
          lang: 'js',
          code: `function findLongestCommonStr(s1, s2) {
  const short = s1.length > s2.length ? s2 : s1
  const long = s1.length > s2.length ? s1 : s2
  for (let len = short.length; len > 0; len--) {
    for (let i = 0; i <= short.length - len; i++) {
      const slice = short.slice(i, i + len)
      if (long.includes(slice)) return slice
    }
  }
  return ''
}`,
        },
      ],
    },
    {
      id: 'debounce',
      title: 'Debounce and throttle',
      blocks: [
        { type: 'callout', text: 'Debounce waits for quiet. Throttle keeps a beat. Search vs infinite scroll.' },
        {
          type: 'code',
          lang: 'js',
          code: `function debounce(fn, wait = 300) {
  let timer
  const wrapped = (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), wait)
  }
  wrapped.cancel = () => clearTimeout(timer)
  return wrapped
}`,
        },
        'Memoize in React and cancel on unmount. Lodash leading/trailing options are worth a look before you rewrite.',
      ],
    },
    {
      id: 'clone',
      title: 'structuredClone',
      blocks: [
        'Clones Date, Map, Set, ArrayBuffer, and cycles. Drops functions, DOM, Symbol keys. The same algorithm as Worker postMessage.',
      ],
    },
    {
      id: 'url-qs',
      title: 'URLSearchParams',
      blocks: [
        {
          type: 'code',
          lang: 'js',
          code: `const q = new URLSearchParams(location.search)
q.get('tab')
q.set('tab', 'js')
history.replaceState(null, '', '?' + q.toString())`,
        },
      ],
    },
    {
      id: 'sleep',
      title: 'sleep, once, range',
      blocks: [
        {
          type: 'code',
          lang: 'js',
          code: `const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
function once(fn) {
  let done = false, value
  return (...args) => (done ? value : ((done = true), (value = fn(...args))))
}
const range = (n) => [...Array(n).keys()]`,
        },
      ],
    },
    {
      id: 'zzwen',
      title: 'Find Chinese in VS Code',
      blocks: [{ type: 'code', lang: 'regexp', code: `(".*[\\u4E00-\\u9FA5]+)|([\\u4E00-\\u9FA5]+.*")` }],
    },
  ],
}
