export default {
  kicker: 'ENDPOINTS  ·  TOOLING',
  title: 'APIs and tool shelves',
  lead: 'A wall of endpoints I reach for. Some URLs rot — treat them as an index, not a contract.',
  sections: [
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
      blocks: ['City IDs: http://mat1.gtimg.com/weather/index2014/wtData_v2.js', 'Forecast: http://wthrcdn.etouch.cn/WeatherApi?citykey={cityID}'],
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
        { type: 'ul', items: ['Etherscan', 'Rinkeby faucet', 'OpenSea', 'Ethereum bookstack'] },
        { type: 'callout', text: 'Faucets move. Reading the chain beats rushing it.' },
      ],
    },
  ],
}
