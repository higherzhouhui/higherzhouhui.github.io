export default {
  kicker: 'ENDPOINTS  ·  TOOLING',
  title: '常用 API 与工具址',
  lead: '把经常随手查的接口放在同一面墙上。有些地址会过期，把它们当成索引而不是契约。',
  sections: [
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
        { type: 'ul', items: ['Etherscan https://etherscan.io/', 'Rinkeby faucet https://rinkebyfaucet.com/', 'OpenSea https://opensea.io/', '以太坊中文资料 https://www.bookstack.cn/'] },
        { type: 'callout', text: '测试网水龙头会更迭。链上阅读比链上冲动更值钱。' },
      ],
    },
  ],
}
