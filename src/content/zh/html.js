export default {
  kicker: '标记',
  title: 'HTML5 语义化与新能力',
  lead: '语义化不是为了好看，是为了让浏览器、爬虫、读屏器和现在的模型，都站在同一张结构图上。正确的标签做正确的事。',
  sections: [
    {
      id: 'gn',
      title: '概念',
      blocks: [
        { type: 'callout', text: 'AI 时代的 HTML 仍是骨架：模型生成的页面若语义混乱，无障碍、SEO 与后续自动化都会一起塌。' },
        'HTML5 的语义化，指合理使用语义标签来搭建页面结构。没有 CSS 时，结构本身也该能被读懂。浏览器解析标签时会同时长出 DOM 和可访问性树（AOM）；读屏走的是后者。',
      ],
    },
    {
      id: 'yyh',
      title: '语义化标签',
      blocks: [
        { type: 'ul', items: ['header → banner（仅页面级）', 'nav → navigation', 'main → main，一页一个', 'article 独立成篇', 'section 需有标题才像 region', 'aside → complementary', 'footer → contentinfo（仅页面级）'] },
        { type: 'h', text: '优点' },
        {
          type: 'ol',
          items: [
            '即便没有样式，页面仍呈现清晰骨架',
            '代码易读，便于协作与维护',
            '读屏可按地标跳跃，而不是线性扫完全文',
            '搜索引擎会给不同标签不同权重（SEO）',
          ],
        },
        { type: 'callout', text: '参考 web.dev《Semantic HTML》：地标宁缺毋滥。套太多 nav/section，读屏会变成噪音。' },
      ],
    },
    {
      id: 'heading',
      title: '标题层级',
      blocks: [
        'h1–h6 是页面的骨架。读屏用户进入陌生页，最常用的导航方式就是跳标题。不要为了视觉大小跳级（h1 后面直接 h4），视觉用 CSS，结构用标题。',
        { type: 'ul', items: ['一页一个清晰的主标题', '子节用连续层级', 'section 几乎都该有标题', 'Lighthouse 会查 “Headings don\'t skip levels”'] },
      ],
    },
    {
      id: 'skip',
      title: '跳过导航与 aria-current',
      blocks: [
        '键盘用户每次进页都要 Tab 一遍顶栏。在 body 最前放一条「跳到正文」的链接，默认视觉隐藏、聚焦时出现，href 指向 main 的 id。',
        '全站导航要稳定；当前页的链接加上 aria-current="page"。多个 nav 用 aria-label 区分「主导航 / 页内目录 / 面包屑」，不要在 label 里再写一遍「导航」——角色已经声明过了。',
      ],
    },
    {
      id: 'form',
      title: '表单是交互的语义',
      blocks: [
        '每个控件都要有可点击的 label（for / id 配对）。placeholder 不是标签。必填用 required 再配可见说明，不要只靠颜色。错误信息用 aria-describedby 挂到控件上。',
        { type: 'ul', items: ['button 默认 submit，纯动作写成 type="button"', 'fieldset + legend 给单选分组', 'autocomplete 让浏览器填得准', 'dialog 元素自带焦点陷阱，优先于手写模态'] },
      ],
    },
    {
      id: 'media',
      title: '图片与多媒体',
      blocks: [
        'img 必须有 alt：装饰图用空 alt，信息图写一句人话。响应式用 picture / srcset / sizes，而不是只丢一张 4K。video/audio 提供控件和字幕轨道。',
        {
          type: 'code',
          lang: 'html',
          code: `<picture>
  <source type="image/avif" srcset="hero.avif" />
  <source type="image/webp" srcset="hero.webp" />
  <img src="hero.jpg" alt="控制台夜景" width="1200" height="630" />
</picture>`,
        },
      ],
    },
    {
      id: 'new',
      title: 'HTML5 新特性',
      blocks: [
        {
          type: 'ol',
          items: [
            '语义化标签与地标',
            '音视频 API（audio / video）',
            'canvas / WebGL',
            '拖放 API',
            'History API（pushState，SPA 的地基）',
            'requestAnimationFrame',
            'Geolocation',
            'WebSocket（全双工，见 JS 笔记）',
            'Web 存储：localStorage、sessionStorage',
            '表单控件：date、email、url、search 等',
            'dialog / template / slot',
            'details / summary 做无 JS 折叠',
          ],
        },
        { type: 'callout', text: '今天这些能力被封装进框架，但面试与排障时仍要能落到原生标签与浏览器 API。' },
      ],
    },
  ],
}
