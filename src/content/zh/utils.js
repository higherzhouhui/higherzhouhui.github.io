export default {
  kicker: 'SNIPPETS  ·  HAND TOOLS',
  title: '常用函数抽屉',
  lead: '面试与业务里反复打开的小工具。复制前先看边界：正则会过时，算法要测空串。',
  sections: [
    {
      id: 'gn',
      title: '千分位',
      blocks: [
        { type: 'code', lang: 'js', code: `str.replace(/(\\d)(?=(?:\\d{3})+$)/g, '$1,')
Number(str).toLocaleString()` },
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
  return /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-9])|(18[0-9])|166|198|199|191|(147))\\d{8}$/.test(phone)
}
function getExt(name: string) {
  return name.slice(name.lastIndexOf('.'))
}
const filled = (n: number) => Array(n).fill(n)`,
        },
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
      const slice = short.substr(i, len)
      if (long.indexOf(slice) >= 0) return slice
    }
  }
  return ''
}`,
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
