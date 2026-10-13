export default {
  kicker: 'SNIPPETS  ·  HAND TOOLS',
  title: 'Utility drawer',
  lead: 'Small tools that interviews and tickets reopen. Check edges before you paste: regexes age, algorithms fear empty strings.',
  sections: [
    {
      id: 'gn',
      title: 'Thousands separators',
      blocks: [{ type: 'code', lang: 'js', code: `str.replace(/(\\d)(?=(?:\\d{3})+$)/g, '$1,')
Number(str).toLocaleString()` }],
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
const filled = (n: number) => Array(n).fill(n)`,
        },
      ],
    },
    {
      id: 'lxzc',
      title: 'Longest common substring',
      blocks: [
        'Slide the shortest string from full length down; indexOf each window in the longer one.',
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
      title: 'Find Chinese in VS Code',
      blocks: [{ type: 'code', lang: 'regexp', code: `(".*[\\u4E00-\\u9FA5]+)|([\\u4E00-\\u9FA5]+.*")` }],
    },
  ],
}
