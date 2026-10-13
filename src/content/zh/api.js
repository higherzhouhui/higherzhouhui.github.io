export default {
  kicker: 'ENDPOINTS  ·  TOOLING',
  title: '常用 API 与工具址',
  lead: '把经常随手查的接口放在同一面墙上。有些地址会过期，把它们当成索引而不是契约。',
  sections: [
    {
      id: 'docs',
      title: '每天打开的文档',
      blocks: [
        { type: 'ul', items: ['MDN Web Docs https://developer.mozilla.org/', 'Can I use https://caniuse.com/', 'TC39 proposals https://github.com/tc39/proposals', 'WinterCG / WHATWG 标准入口 https://spec.whatwg.org/'] },
        { type: 'callout', text: '先 MDN 再博客。博客负责直觉，MDN 负责边界。' },
      ],
    },
    {
      id: 'vitals',
      title: '性能与兼容',
      blocks: [
        { type: 'ul', items: ['web-vitals 库 https://github.com/GoogleChrome/web-vitals', 'PageSpeed / CrUX https://pagespeed.web.dev/', 'HTTP Archive https://httparchive.org/', 'Web Almanac 年度报告'] },
        'INP / LCP / CLS 的现场数字比实验室打分更接近用户。把 RUM 接到真实路由，而不是只跑首页。',
      ],
    },
    {
      id: 'cdn',
      title: 'CDN 与包',
      blocks: [
        { type: 'ul', items: ['unpkg https://unpkg.com/', 'jsDelivr https://www.jsdelivr.com/', 'esm.sh https://esm.sh/', 'npm 包页 https://www.npmjs.com/'] },
        '生产尽量锁版本号，不要用 @latest。esm.sh 适合在演示页里直接 import 一个 ESM 包，正式构建仍走自己的打包器。',
      ],
    },
    {
      id: 'ip',
      title: 'IP 与 OSS',
      blocks: [
        { type: 'p', text: '搜狐 IP：http://pv.sohu.com/cityjson?ie=utf-8' },
        { type: 'p', text: '阿里云 OSS 裁剪文档：https://help.aliyun.com/document_detail/44693.html' },
      ],
    },
    {
      id: 'tianqi',
      title: '天气',
      blocks: [
        '城市 ID：http://mat1.gtimg.com/weather/index2014/wtData_v2.js',
        '按 ID 取天气：http://wthrcdn.etouch.cn/WeatherApi?citykey={cityID}',
        '这类免费接口随时会挂，新项目改走和风 / Open-Meteo，并准备好降级文案。',
      ],
    },
    {
      id: 'gupiao',
      title: '行情',
      blocks: [
        { type: 'ul', items: ['上证 http://qt.gtimg.cn/q=s_sh000001', '道琼斯 http://qt.gtimg.cn/q=s_usDJI', '恒生 http://qt.gtimg.cn/q=s_r_hkHSI', '个股 http://sqt.gtimg.cn/q={代码}'] },
        { type: 'callout', text: '腾讯行情串里 1 是名称、3 是现价、4 昨收、31 涨跌……把字段表当作解码器。' },
      ],
    },
    {
      id: 'bizhi',
      title: '壁纸与转码',
      blocks: [
        'Bing 日图：http://cn.bing.com/iod/1366/1024/{seed}',
        '图片转 Base64：https://c.runoob.com/front-end/59/',
      ],
    },
    {
      id: 'web3',
      title: 'Web3 入口',
      blocks: [
        { type: 'ul', items: ['Etherscan https://etherscan.io/', 'Sepolia faucet（测试网会更迭）', 'OpenSea https://opensea.io/', '以太坊中文资料 https://www.bookstack.cn/'] },
        { type: 'callout', text: '测试网水龙头会更迭。链上阅读比链上冲动更值钱。' },
      ],
    },
    {
      id: 'ai-tools',
      title: '模型时代仍要的人肉索引',
      blocks: [
        { type: 'ul', items: ['React 文档 https://react.dev/', 'Vue 文档 https://vuejs.org/', 'Node API https://nodejs.org/docs/', 'Vite https://vite.dev/', 'WCAG 速查 https://www.w3.org/WAI/WCAG22/quickref/'] },
        '模型会编造不存在的 API。把官方文档放进上下文，比再问一轮更便宜。',
      ],
    },
  ],
}
