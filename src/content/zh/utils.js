export default {
  kicker: '手头',
  title: '常用函数抽屉',
  lead: '面试与业务里反复打开的小工具。复制前先看边界：正则会过时，算法要测空串。',
  sections: [
    {
      id: 'gn',
      title: '千分位',
      blocks: [
        { type: 'code', lang: 'js', code: `str.replace(/(\\d)(?=(?:\\d{3})+$)/g, '$1,')
Number(str).toLocaleString()` },
        '有小数时 toLocaleString 更稳。正则那条默认只管整数。Intl.NumberFormat 能同时处理货币与本地习惯。',
      ],
    },
    {
      id: 'yyh',
      title: '手机号、扩展名、定长数组',
      blocks: [
        {
          type: 'code',
          lang: 'ts',
          code: `function validPhone(phone: string) {
  return /^1[3-9]\\d{9}$/.test(phone)
}
function getExt(name: string) {
  return name.slice(name.lastIndexOf('.'))
}
const filled = (n: number) => Array.from({ length: n }, (_, i) => i)`,
        },
        '号段表每年都在变，生产校验以服务端为准。Array(n).fill(n) 会得到 n 个相同的 n，要序列用 Array.from。',
      ],
    },
    {
      id: 'lxzc',
      title: '最长连续公共子串',
      blocks: [
        '从短串的最大窗口往下切，每段拿去长串 indexOf，命中即返回。先长大窗口再左移起点。',
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
      title: '防抖与节流手写',
      blocks: [
        { type: 'callout', text: '防抖等尘埃落定；节流按节拍放行。搜索框用防抖，滚动加载用节流。' },
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
}

function throttle(fn, wait = 200) {
  let last = 0
  let timer
  return function (...args) {
    const now = Date.now()
    const remain = wait - (now - last)
    if (remain <= 0) {
      clearTimeout(timer)
      last = now
      fn.apply(this, args)
    } else if (!timer) {
      timer = setTimeout(() => {
        last = Date.now()
        timer = null
        fn.apply(this, args)
      }, remain)
    }
  }
}`,
        },
        'React 里把防抖函数放进 useMemo，卸载时 cancel，避免 setState 在已卸载组件上跑。lodash 的 trailing / leading 选项值得看一眼再决定是否自研。',
      ],
    },
    {
      id: 'clone',
      title: 'structuredClone 与拷贝边界',
      blocks: [
        'structuredClone 能拷 Date、Map、Set、ArrayBuffer、循环引用，仍丢函数、DOM、Symbol 作键。JSON 法更窄。有原型方法的对象被拷成纯数据。',
        {
          type: 'code',
          lang: 'js',
          code: `const copy = structuredClone(state)
const json = JSON.parse(JSON.stringify(state))`,
        },
        'MessageChannel 的结构化克隆算法与 Worker postMessage 是同一套。需要保留 class 实例时，自己写 toJSON / 静态 from。',
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
        '别用正则拆 query。重复键 getAll。空格编码是 + 还是 %20，以 URLSearchParams 的行为为准，不要混手写 encodeURIComponent。',
      ],
    },
    {
      id: 'sleep',
      title: 'sleep、once、range',
      blocks: [
        {
          type: 'code',
          lang: 'js',
          code: `const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function once(fn) {
  let done = false
  let value
  return (...args) => {
    if (!done) {
      done = true
      value = fn(...args)
    }
    return value
  }
}

const range = (n) => [...Array(n).keys()]`,
        },
      ],
    },
    {
      id: 'zzwen',
      title: 'VS Code 搜中文',
      blocks: [{ type: 'code', lang: 'regexp', code: `(".*[\\u4E00-\\u9FA5]+)|([\\u4E00-\\u9FA5]+.*")` }],
    },
  ],
}
