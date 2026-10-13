export default {
  kicker: 'ENDPOINTS  ·  TOOLING',
  title: 'APIs and tool shelves',
  lead: 'A wall of endpoints I reach for. Some URLs rot — treat them as an index, not a contract.',
  sections: [
    {
      id: 'docs',
      title: 'Docs opened daily',
      blocks: [
        { type: 'ul', items: ['MDN https://developer.mozilla.org/', 'Can I use https://caniuse.com/', 'TC39 proposals', 'WHATWG specs https://spec.whatwg.org/'] },
        { type: 'callout', text: 'MDN for edges, blogs for intuition — in that order.' },
      ],
    },
    {
      id: 'vitals',
      title: 'Performance and support',
      blocks: [
        { type: 'ul', items: ['web-vitals https://github.com/GoogleChrome/web-vitals', 'PageSpeed / CrUX', 'HTTP Archive', 'Web Almanac'] },
        'Field INP/LCP/CLS beats a lab score. Wire RUM to real routes, not only the home page.',
      ],
    },
    {
      id: 'cdn',
      title: 'CDNs and packages',
      blocks: [
        { type: 'ul', items: ['unpkg', 'jsDelivr', 'esm.sh', 'npmjs.com'] },
        'Pin versions in production. esm.sh is for demos; real builds still go through your bundler.',
      ],
    },
    {
      id: 'ip',
      title: 'IP and OSS',
      blocks: [
        { type: 'p', text: 'Sohu IP: http://pv.sohu.com/cityjson?ie=utf-8' },
        { type: 'p', text: 'Aliyun OSS crop docs: https://help.aliyun.com/document_detail/44693.html' },
      ],
    },
    {
      id: 'tianqi',
      title: 'Weather',
      blocks: [
        'City IDs: http://mat1.gtimg.com/weather/index2014/wtData_v2.js',
        'Forecast: http://wthrcdn.etouch.cn/WeatherApi?citykey={cityID}',
        'These free endpoints die without notice. Newer work uses Open-Meteo and a fallback string.',
      ],
    },
    {
      id: 'gupiao',
      title: 'Quotes',
      blocks: [
        { type: 'ul', items: ['SSE http://qt.gtimg.cn/q=s_sh000001', 'Dow http://qt.gtimg.cn/q=s_usDJI', 'HSI http://qt.gtimg.cn/q=s_r_hkHSI', 'Symbol http://sqt.gtimg.cn/q={code}'] },
      ],
    },
    {
      id: 'bizhi',
      title: 'Wallpaper',
      blocks: ['Bing daily: http://cn.bing.com/iod/1366/1024/{seed}', 'Base64 helper: https://c.runoob.com/front-end/59/'],
    },
    {
      id: 'web3',
      title: 'Web3 doors',
      blocks: [
        { type: 'ul', items: ['Etherscan', 'Sepolia faucet (they move)', 'OpenSea', 'Ethereum bookstack'] },
        { type: 'callout', text: 'Faucets move. Reading the chain beats rushing it.' },
      ],
    },
    {
      id: 'ai-tools',
      title: 'Human indexes in the model era',
      blocks: [
        { type: 'ul', items: ['react.dev', 'vuejs.org', 'nodejs.org/docs', 'vite.dev', 'WCAG 2.2 quickref'] },
        'Models invent APIs. Grounding in official docs is cheaper than another prompt.',
      ],
    },
  ],
}
