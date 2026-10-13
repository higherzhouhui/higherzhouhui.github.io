export default {
  kicker: 'MODULES  ·  PIPELINES',
  title: '前端工程化',
  lead: '模块规范决定文件如何相遇。今天的 Vite 与 GitHub Actions，不过是把那些规范推进了流水线。',
  sections: [
    {
      id: 'gn',
      title: 'AMD / CMD / CommonJS',
      blocks: [
        { type: 'callout', text: '2026 年默认是 ES Modules + 打包器。面试仍要说清：服务端可同步，浏览器必须预加载。' },
        'CommonJS 面向服务端（Node require，同步）。AMD（RequireJS）浏览器异步预加载。CMD（SeaJS）则偏就近依赖、延迟执行。本质差异来自 I/O：磁盘可以等，网速不能。',
        'ESM 用静态 import，便于 tree-shaking；构建期再被 Vite / webpack 收成浏览器能跑的图。CI 里 npm run build 推静态资源，正是这条链的末端。',
      ],
    },
    {
      id: 'webpack',
      title: 'Webpack 配置骨架',
      blocks: [
        { type: 'ul', items: ['entry：依赖图入口', 'output：目录与文件名', 'module.rules：loader 转译', 'resolve：别名与扩展名', 'plugins：HTML 注入、拆包', 'devServer：热更新与代理'] },
        'loader 转文件，plugin 钩生命周期。新项目默认 Vite，面试仍问这一对分工。',
      ],
    },
    {
      id: 'gha',
      title: 'GitHub Actions 一键部署',
      blocks: [
        { type: 'callout', text: '从 myBlog：push main 即安装、构建、覆盖静态目录。本站 Pages 走同一条链。' },
        '工作流捕获 push，跑 npm ci 与 npm run build，再用 upload-pages-artifact 发布。仓库 Settings → Pages 来源选 GitHub Actions。服务器侧另配公钥与 Nginx。',
      ],
    },
    {
      id: 'prisma',
      title: 'Prisma',
      blocks: [
        '一份 schema 生成类型安全客户端和可回放迁移。浏览器绝不直连数据库。npx prisma init → migrate dev → generate。',
      ],
    },
    {
      id: 'micro',
      title: '微前端',
      blocks: [
        'iframe 隔离强、通信贵、重复加载。运行时方案（qiankun / single-spa）与模块联邦各有代价。真正要做的是依赖去重、样式隔离、子应用卸载。',
      ],
    },
    {
      id: 'ssl',
      title: 'TLS 与 acme.sh',
      blocks: [
        '免费证书走 ACME：安装 acme.sh，HTTP 或 DNS 验证，copy 到 Nginx，cron 续期。没有 TLS，浏览器会先把用户吓走。',
      ],
    },
    {
      id: 'treeshake',
      title: 'Tree-shaking 真正的前提',
      blocks: [
        '打包器只能摇掉「静态可证明用不到」的导出。副作用、动态 import 路径、CommonJS 的 module.exports 都会挡住。库的 package.json 里 sideEffects: false 是对打包器的承诺，乱标会摇坏 CSS 和 polyfill。',
        { type: 'ul', items: ['用 ESM 具名导出，避免 export default { a, b } 再整包引入', 'lodash-es 代替 lodash', '图表、编辑器、PDF 走路由级拆包', '分析用 rollup-plugin-visualizer 或 vite-bundle-visualizer'] },
      ],
    },
    {
      id: 'sourcemap',
      title: 'Source map：生产开还是关',
      blocks: [
        '开发必须开。生产若把 .map 放到公网，等于把源码送给所有人；可以 hidden-source-map 上传到错误监控（Sentry）而不下发给浏览器。',
        'cheap-module-source-map 快但不含列信息。排查压缩后的报错，没有 map 就是在读乱码。',
      ],
    },
    {
      id: 'pnpm',
      title: 'pnpm 为什么省磁盘',
      blocks: [
        '内容寻址存储 + 硬链接，同一个包版本全机器只落一份。node_modules 是非扁平的符号链接，幽灵依赖（没声明却 require 到）会直接失败——这是优点。',
        'monorepo 用 pnpm-workspace.yaml。overrides 统一传递依赖版本。lockfile 进仓库，CI 用 pnpm i --frozen-lockfile。',
      ],
    },
    {
      id: 'split',
      title: '拆包策略',
      blocks: [
        'Vite 生产走 Rollup：manualChunks 把 react / vue 等框架拆成长期缓存的 vendor。路由懒加载让首屏不付隐藏页的账。动态 import() 的路径必须可静态分析，否则拆不出文件。',
        'HTTP/2 多路复用后，「拆得太碎」会变负优化：请求多、压缩字典散。目标是「变更率不同的东西分开」，不是文件数量最大化。',
      ],
    },
    {
      id: 'vite-vs',
      title: 'Vite 相对 webpack 的分界',
      blocks: [
        '开发：原生 ESM + 按需编译，冷启动不扫全图。生产：Rollup 出优化包。webpack 仍强在复杂 module federation、冷门 loader、以及历史项目。',
        '本站用 Vite 7：GitHub Actions 只跑 npm run build，产物是静态文件。不要把 Node 中间件寄托在 Pages 上。',
      ],
    },
    {
      id: 'monorepo',
      title: 'Monorepo 最小纪律',
      blocks: [
        '包边界按发布单元切，而不是按文件夹好看。内部包用 workspace: 协议。CI 用受影响图（pnpm --filter ...[origin/main]）只测改动。版本策略：独立 version 或统一 version，选一个写进 README。',
        '不要把应用和可发布组件库的 tsconfig 搅在一起。应用可以松，库必须生成 d.ts。',
      ],
    },
  ],
}
