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
  ],
}
