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
    {
      id: 'perf',
      title: '性能指标',
      blocks: [
        { type: 'callout', text: '从 myBlog《前端性能优化》：FCP / LCP / CLS / INP 仍是 2026 的共同语言。' },
        { type: 'ul', items: ['FP / FCP：首次有像素、有内容', 'LCP：最大内容绘制', 'CLS：布局漂移', 'INP：交互延迟'] },
        '拆包、现代图片、缓存头、关键 CSS、SSR/流式、少长任务。模型生成的页最容易在 LCP 与 CLS 翻车。',
      ],
    },
    {
      id: 'preflight',
      title: 'CORS 预检到底在问什么',
      blocks: [
        '简单请求（GET/POST + 有限头）直接发出，响应里没有 Access-Control-Allow-Origin 就让前端读失败。非简单请求（PUT、JSON Content-Type、自定义头）先发 OPTIONS 预检：浏览器问「方法、头、是否带 cookie 允许吗」。',
        { type: 'ul', items: ['Allow-Origin 不能在带 cookie 时用 *', 'Allow-Credentials: true 才让 credentials 过去', 'Allow-Headers / Allow-Methods 要覆盖实际请求', 'Max-Age 缓存预检，别让每个 API 都 OPTIONS 一次'] },
        'JSONP 只适合 GET 且把信任交给对方脚本，2026 不该再当方案。开发用 Vite proxy 把跨域藏进同源。',
      ],
    },
    {
      id: 'http2',
      title: 'HTTP/2 与 HTTP/3',
      blocks: [
        'HTTP/2 多路复用：一条 TCP 上同时跑多个流，队头阻塞从「应用层」挪到「丢包时的 TCP」。头部用 HPACK 压缩。服务端推送实际很少有人用对。',
        'HTTP/3 跑在 QUIC（UDP）上，握手与丢包恢复更快，弱网更稳。对前端的直接变化：雪碧图、合并文件的收益下降，但压缩与缓存头依然重要。',
      ],
    },
    {
      id: 'inp',
      title: 'INP 替换 FID',
      blocks: [
        { type: 'callout', text: 'web.dev：INP 观察页面生命周期里最差的那几次交互，不只是第一次。点击、敲键、tap 都算。' },
        '拆分长任务（>50ms）、让输入处理走紧急更新、避免主线程上的大 JSON.parse、用 startTransition 把非紧急渲染让路。INP 差的页，用户会觉得「点了没反应」。',
        '量测：Web Vitals 扩展、web-vitals JS 库、CrUX。实验室 Lighthouse 是参考，线上 RUM 才是判决。',
      ],
    },
    {
      id: 'csp',
      title: 'CSP 与可信类型',
      blocks: [
        'Content-Security-Policy 白名单脚本来源，script-src \'self\' 加上 nonce 或 strict-dynamic。禁止 eval 和内联脚本，XSS 的载荷会先被策略挡住。',
        'report-uri / report-to 收集违规。Trusted Types 让 innerHTML 只能吃经过策略消毒的对象。CSP 配错会把你自己的站点打挂，先 report-only 再 enforce。',
      ],
    },
    {
      id: 'samesite',
      title: 'SameSite Cookie 与第三方',
      blocks: [
        'SameSite=Lax 是常见默认：顶级导航带 cookie，跨站 POST 与 iframe 不带。Strict 更狠。None 必须 Secure，否则会被拒。',
        '第三方 cookie 在陆续退场。登录态用第一方 + 后端 session / 短 JWT；跨站嵌入用 Storage Access API 或干脆别依赖隐式身份。',
      ],
    },
    {
      id: 'sw',
      title: 'Service Worker 面试怎么说',
      blocks: [
        '独立线程、先安装再激活、fetch 事件里决定缓存策略：Cache First 适合静态资源，Network First 适合 API，Stale-While-Revalidate 适合能容忍片刻旧数据的列表。',
        '更新要用 skipWaiting 与 clients.claim 讲清楚代价：可能让用户同时跑两版。PWA 的 manifest 与 SW 是两件事，别混着背。',
      ],
    },
  ],
}
