export default {
  kicker: 'PROTOCOL  ·  BROWSER',
  title: '常问面试题：从电文到像素',
  lead: '把网络、浏览器、TypeScript 摊在一张桌上。AI 能默写答案，面试仍在看你能不能把 304 和三次握手讲成一条因果链。',
  sections: [
    {
      id: 'network',
      title: 'HTTP 与 HTTPS',
      blocks: [
        { type: 'callout', text: '口诀：连接发送加响应，释放解析整过程。明文超文本，安全靠 TLS；证书要钱，端口 443。' },
        'HTTP 是请求/应答的超文本传输。步骤：连上 → 发请求 → 收响应 → 释放 TCP → 渲染。方法：GET 读、POST 传、PUT 更、DELETE 删、HEAD 只要头。',
        'HTTPS = HTTP + TLS。握手：建链、下证书、协商强度、公钥加密会话密钥、私钥解开、此后对称加密通信。',
      ],
    },
    {
      id: 'get',
      title: 'GET 与 POST',
      blocks: [
        { type: 'ol', items: ['回退：GET 无害，POST 可能重放', '缓存：GET 易被缓存', '参数：GET 在 URL，有长度与暴露问题', '语义：GET 读，POST 写'] },
      ],
    },
    {
      id: 'tcp',
      title: 'TCP 握手、挥手、UDP',
      blocks: [
        '三次握手：SYN → SYN+ACK → ACK，之后才有数据。四次挥手因半关闭需要两端各自 FIN/ACK。UDP 无连接、可广播、头更小、更实时、不可靠。',
      ],
    },
    {
      id: 'ky',
      title: '跨域',
      blocks: [
        '协议、域名、端口任一不同即跨域，同源策略护的是浏览器。解法：CORS 头、反向代理、JSONP、postMessage。',
      ],
    },
    {
      id: 'cookie',
      title: 'Cookie / sessionStorage / localStorage',
      blocks: [
        { type: 'ul', items: ['Cookie ≤ 4KB，可随请求走，有过期', 'localStorage 更大、持久', 'sessionStorage 关标签即清'] },
      ],
    },
    {
      id: 'huancun',
      title: '强制缓存与协商缓存',
      blocks: [
        '先看 Expires / Cache-Control（强制）。失效后带 If-None-Match / If-Modified-Since 问服务器，命中 304。ETag 优先于 Last-Modified。',
        { type: 'callout', text: '2026 的 CDN 与 Service Worker 仍建立在这套头语义上。' },
      ],
    },
    {
      id: 'xss',
      title: 'XSS / CSRF / DDoS',
      blocks: [
        'XSS：注入脚本，转义与避免 innerHTML。CSRF：伪造已登录请求，用 CSRF Token 与验证码。DDoS：堆量打满，限频与清洗。',
      ],
    },
    {
      id: 'url',
      title: '从输入 URL 到画面',
      blocks: [
        { type: 'ol', items: ['查 DNS 缓存', '解析域名', 'TCP 三次握手', 'HTTP(S) 请求', '响应', '四次挥手', '构建 DOM / CSSOM / Render Tree', 'Layout → Paint', 'JS 引擎跑脚本'] },
      ],
    },
    {
      id: 'bchonghui',
      title: '重排与重绘',
      blocks: [
        '几何变化触发重排（回流），外观变化触发重绘。重排必重绘。合并样式、避免循环读布局、动画用 transform、提升合成层。',
      ],
    },
    {
      id: 'ljhs',
      title: '垃圾回收与性能',
      blocks: [
        '标记清除为主。泄漏常见于全局变量、闭包、DOM 引用、定时器。优化：合并资源、压缩、缓存、防抖节流、懒加载、少读 DOM。',
      ],
    },
    {
      id: 'typescript1',
      title: 'TypeScript 速记',
      blocks: [
        'TS 是 JS 的超集，编译期抓错。泛型是类型参数；接口约束对象、函数与类；never 表示不可达，void 表示无返回值但仍能结束。',
      ],
    },
  ],
}
