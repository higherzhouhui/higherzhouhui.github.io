export default {
  kicker: '笔记',
  title: '写给还要翻回来的自己',
  lead: '从旧博客迁过来，又改过一遍。框架会过期，握手、性能和部署不会。不写课程腔。',
  sections: [
    {
      id: 'ws',
      title: '十分钟学会 WebSocket',
      blocks: [
        { type: 'callout', text: 'HTTP 是一问一答；WebSocket 是同一条 TCP 上的全双工。直播、行情、协同编辑都靠它让服务器先开口。' },
        '握手仍走一次特殊 HTTP：客户端带 Upgrade: websocket，服务端 101 Switching Protocols 之后，这条连接就不再是请求/响应。之后帧头很小，延迟低于反复建连的短轮询。',
        { type: 'ul', items: ['双向：服务端可主动推', '低延迟：长连接省掉反复握手', '更小的头：比 HTTP 报文轻', '跨域：协议层即可，不必先绕 CORS 复杂配置'] },
        {
          type: 'code',
          lang: 'js',
          code: `const ws = new WebSocket('wss://example.com/live')
ws.onopen = () => ws.send(JSON.stringify({ type: 'hello' }))
ws.onmessage = (event) => console.log(JSON.parse(event.data))
ws.onclose = () => setTimeout(reconnect, 1200)`,
        },
        '生产里记得心跳、指数退避重连、以及把二进制帧和 JSON 文本分开。AI 生成的聊天窗口若只用 fetch 轮询，成本会先把带宽吃掉。',
      ],
    },
    {
      id: 'fw2024',
      title: '2024 仍值得看的 Web 框架',
      blocks: [
        'HTMX 把浏览器能力交还给 HTML，用超媒体驱动状态，适合少写 JS 的后台。Wasp 宣称全栈开箱即用。Astro 默认少发 JS。Next 与 Nuxt 仍是内容站与控制台的主航道。',
        { type: 'callout', text: '选框架先看约束：要 SEO 与流式渲染走 RSC/SSR；要岛屿架构走 Astro；要少 JS 走 HTMX。' },
        '名单会换，判断标准稳定：构建速度、默认性能、生态是否愿意为你付维修成本。',
      ],
    },
    {
      id: 'vueeco',
      title: 'Vue 生态怎么配一套',
      blocks: [
        { type: 'ul', items: ['包管理：pnpm 最快也最省磁盘，monorepo 友好', '构建：Vite，原生 ESM 启动，生产走 Rollup', '语言：TypeScript', '状态：Pinia', '组件库：移动端 Vant，桌面 Element Plus / Naive', 'CSS：UnoCSS 或原子化 + 设计 token'] },
        '从零启动最怕「选择的悖论」。把行业标准钉死，剩下的时间才属于业务。vue3-vant-mobile 一类模板的价值，是把文件路由、自动引入、PWA、vw 适配先焊好。',
      ],
    },
    {
      id: 'prisma',
      title: '前端全栈为什么要会 Prisma',
      blocks: [
        'Prisma 用一份 schema 生成类型安全客户端，避开手写 CRUD 和「运行时才发现列名写错」。迁移系统让结构变更可回放。',
        {
          type: 'code',
          lang: 'bash',
          code: `npm install prisma
npx prisma init
# .env 里写 DATABASE_URL
npx prisma migrate dev --name init
npx prisma generate`,
        },
        { type: 'callout', text: 'Next / Node 侧用 Prisma，浏览器侧永远不要直连数据库。类型安全停在服务端边界。' },
      ],
    },
    {
      id: 'map',
      title: '把前端知识画成图谱',
      blocks: [
        '领域太大，只能靠图谱复盘：JavaScript Guidebook（ES / DOM / BOM / 网络 / 模式）、React / Vue / Webpack / CSS / Node / DevOps。先有骨架，再往节点上挂文章。',
        '本站栏目就是一张压缩过的图谱。AI 可以补叶子，根还得自己记得住。',
      ],
    },
    {
      id: 'micro',
      title: '深入浅出微前端',
      blocks: [
        '微前端把巨石拆成可独立发布的子应用。iframe 能隔离，但通信、性能、样式和路由都别扭，所以不是默认方案。',
        { type: 'ul', items: ['iframe：隔离强，交互贵，加载重复', 'single-spa / qiankun：运行时组装，主应用管路由与沙箱', '模块联邦：构建期共享依赖，运行时拉远程容器', 'Web Components：自定义元素做边界'] },
        '真正要解决的是：公共依赖去重、样式隔离、子应用卸载、权限与埋点统一。没有这些，拆分只是把混乱分布式化。',
      ],
    },
    {
      id: 'json',
      title: 'JSON.stringify 不止调试',
      blocks: [
        '第二个参数可以是白名单数组或 replacer；第三个参数是缩进。toJSON 方法会在序列化时被调用。循环引用会抛错，需要自己破环。',
        {
          type: 'code',
          lang: 'js',
          code: `JSON.stringify(user, ['id', 'name'], 2)
JSON.stringify(payload, (key, value) => (key === 'password' ? undefined : value), 2)`,
        },
      ],
    },
    {
      id: 'arr28',
      title: '数组方法小抄（面试会默写）',
      blocks: [
        { type: 'ul', items: ['映射：map / flatMap / fill', '筛选：filter / find / findIndex / some / every', '折叠：reduce / reduceRight', '增删：push pop shift unshift splice', '截取：slice concat', '检索：includes indexOf lastIndexOf', '排序：sort reverse', '迭代：forEach entries keys values', '扁平：flat / flatMap', '转换：join Array.from Array.isArray'] },
        '至少能讲清 map 与 forEach 的差别：一个返回新数组，一个只做事。sort 默认按字符串比较，数字要自己写 comparator。',
      ],
    },
    {
      id: 'perf',
      title: '前端性能：从 FP 到 LCP',
      blocks: [
        '优化是为了体验、收录和账单。关键指标：FP / FCP（首次有内容）、LCP（最大内容）、CLS（布局漂移）、INP（交互延迟）。',
        { type: 'ol', items: ['压缩与拆包，tree-shaking', '图片：现代格式、尺寸、懒加载', '缓存：HTTP 头 + CDN + Service Worker', '关键 CSS 内联，其余异步', 'SSR / 流式渲染缩短 LCP', '防抖节流，减少主线程长任务'] },
        { type: 'callout', text: 'Core Web Vitals 仍是 2026 搜索与转化的共同语言。模型生成的页面最容易在 LCP 和 CLS 上翻车。' },
      ],
    },
    {
      id: 'gha',
      title: 'git push 一键部署',
      blocks: [
        '从「把文件夹丢给 Apache」到 Jenkins，再到 GitHub Actions：push main → npm ci → npm run build → 发布 Pages 或覆盖服务器目录。',
        '本站就是这条链。仓库 Settings 里 Pages 来源选 GitHub Actions，工作流第一次跑之前要切一次。公钥、nginx 反代、钉钉机器人是服务器侧的另一半。',
      ],
    },
    {
      id: 'webpack',
      title: 'Webpack 配置骨架',
      blocks: [
        { type: 'ul', items: ['entry：依赖图从哪开始', 'output：path / filename / publicPath', 'module.rules：loader 处理 css、ts、图片', 'resolve：别名与扩展名', 'plugins：HTML 注入、拆包、环境变量', 'devServer：热更新与代理'] },
        '今天新项目默认 Vite，但面试仍会问 loader 与 plugin 的分工：loader 转文件，plugin 钩生命周期。',
      ],
    },
    {
      id: 'tg',
      title: 'Telegram Mini App',
      blocks: [
        '比起浏览器 Dapp，TG 小程序钱包交互更短，背靠十亿月活。BOT + TON 让初级市场和早鸟项目能在聊天里完成。',
        '技术栈常见 React/Vue + Telegram WebApp SDK + Node。注意 initData 校验必须在服务端做，前端传来的用户身份不可信。',
      ],
    },
    {
      id: 'loading',
      title: '纯 CSS Loading 的最小单元',
      blocks: [
        '117 个特效的公约数是：一个元素 + border/gradient + @keyframes。下面是最常见的圆环。',
        {
          type: 'code',
          lang: 'css',
          code: `.loading {
  width: 30px;
  height: 30px;
  border: 2px solid var(--gold);
  border-top-color: transparent;
  border-radius: 100%;
  animation: circle 0.75s linear infinite;
}
@keyframes circle {
  to { transform: rotate(360deg); }
}`,
        },
      ],
    },
    {
      id: 'ssl',
      title: '免费 SSL：acme.sh',
      blocks: [
        { type: 'ol', items: ['curl https://get.acme.sh | sh', 'HTTP 或 DNS 验证域名', '把证书 copy 到 nginx', 'cron 自动续期'] },
        '浏览器「连接不安全」会直接杀掉转化。证书不是装饰，是 TLS 握手的门票。',
      ],
    },
    {
      id: 'leave',
      title: 'HR 爱听的离职理由',
      blocks: [
        '别说工资低、领导傻、被裁。改成：寻求更大业务半径、更完整的技术栈、更健康的节奏。事实可以真，句式要对面试官的风险模型友好。',
      ],
    },
    {
      id: 'age30',
      title: '30+ 程序员的出路',
      blocks: [
        '没有更好资源时，认真保持技术能力仍是概率最高的路。转产品并不等于轻松；转管理要看坑位。外包不是羞辱，是现金流。把广度换成可被验证的深度：性能、工程化、带人交付。',
      ],
    },
    {
      id: 'workmean',
      title: '工作的意义',
      blocks: [
        '先换面包，再换意义。格雷伯说富裕国家里大量「狗屁工作」脱离真实需要。远程、坐班、兼职、自研产品只是容器——要问的是：这活是否在减少真实摩擦。',
      ],
    },
    {
      id: 'loop-note',
      title: '把事件循环讲给下一班的自己',
      blocks: [
        { type: 'callout', text: 'javascript.info 把循环画成「执行一宏 → 抽干微任务 → 渲染」。面试时用这张图，比背 Node 十个 phase 更不容易忘。' },
        'setTimeout(0) 不是立刻。await 后面那一行是微任务。微任务套微任务会饿死绘制——动画卡顿时先查这里。queueMicrotask 比空 Promise 更直白。',
      ],
    },
    {
      id: 'flex-note',
      title: 'Flex 溢出时先给 min-width: 0',
      blocks: [
        'CSS-Tricks 指南里最贵的一行不是 justify-content，而是子项默认 min-width: auto。文字和代码块不肯收缩，整行就被撑破。给 flex 子项 min-width: 0 或 overflow: hidden，再谈省略号。',
        '一行用 flex，两维用 grid，容器变宽用 @container。三种工具叠在一起，比一份 800 行媒体查询好维护。',
      ],
    },
    {
      id: 'inp-note',
      title: 'INP：点下去到下一帧',
      blocks: [
        'FID 只看第一次；INP 看整页最差的几次交互。50ms 以上的长任务要切开。输入框的 setState 不要跟过滤一万行抢同一优先级——startTransition 就是干这个的。',
        '实验室绿分、真实用户红，以 RUM 为准。web-vitals 库三行就能上报。',
      ],
    },
    {
      id: 'cq-note',
      title: '容器查询让组件自己长大',
      blocks: [
        '卡片在侧栏是纵向，在主栏是横向，这不该问 window.innerWidth。container-type: inline-size 后，@container 按组件宽度换布局。设计系统一旦组件化，这是媒体查询做不到的一层。',
      ],
    },
    {
      id: 'abort-note',
      title: '每次搜索都要能反悔',
      blocks: [
        'AbortController 是 fetch 的刹车。React effect 的 return 里 abort，Strict Mode 双调用也不会把旧请求的结果写进新 state。超时用 AbortSignal.timeout 或自己的 timer。',
      ],
    },
    {
      id: 'csp-note',
      title: 'CSP 比转义多一层闸',
      blocks: [
        '转义防的是「字符变成代码」；CSP 防的是「就算变成代码也加载不了」。nonce + strict-dynamic 是现在比较可维护的 script-src。先 report-only，再 enforce，否则第一次上线会把统计脚本一起打死。',
      ],
    },
    {
      id: 'comp-note',
      title: 'Composable 是 Vue 的自定义 Hook',
      blocks: [
        'useXxx 返回状态与方法，单元测试不必挂组件。Pinia 的 store 其实就是带 devtools 的 composable。别把 API 请求写进组件 options 的四面八方，收到一个模块里。',
      ],
    },
    {
      id: 'a11y-note',
      title: '无障碍不是加分项',
      blocks: [
        'web.dev 语义文的结论很硬：地标、标题层级、label、跳过链接，是读屏用户的导航。Lighthouse 的 a11y 项能抓到一半低级错误。键盘走一遍主流程，比再画一个主题更接近「这个站能用」。',
      ],
    },
  ],
}
