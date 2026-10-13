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
  ],
}
