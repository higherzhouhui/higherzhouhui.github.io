export default {
  kicker: 'MARKUP  ·  STRUCTURE FIRST',
  title: 'HTML5 语义化与新能力',
  lead: '语义化不是为了好看，是为了让浏览器、爬虫、读屏器和现在的模型，都站在同一张结构图上。正确的标签做正确的事。',
  sections: [
    {
      id: 'gn',
      title: '概念',
      blocks: [
        { type: 'callout', text: 'AI 时代的 HTML 仍是骨架：模型生成的页面若语义混乱，无障碍、SEO 与后续自动化都会一起塌。' },
        'HTML5 的语义化，指合理使用语义标签来搭建页面结构。没有 CSS 时，结构本身也该能被读懂。',
      ],
    },
    {
      id: 'yyh',
      title: '语义化标签',
      blocks: [
        { type: 'ul', items: ['header', 'nav', 'main', 'article', 'section', 'aside', 'footer'] },
        { type: 'h', text: '优点' },
        {
          type: 'ol',
          items: [
            '即便没有样式，页面仍呈现清晰骨架',
            '代码易读，便于协作与维护',
            '读屏等设备可按语义朗读',
            '搜索引擎会给不同标签不同权重（SEO）',
          ],
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
            '语义化标签',
            '音视频 API（audio / video）',
            'canvas / WebGL',
            '拖放 API',
            'History API',
            'requestAnimationFrame',
            'Geolocation',
            'WebSocket（全双工，见 JS 笔记）',
            'Web 存储：localStorage、sessionStorage',
            '表单控件：date、email、url、search 等',
          ],
        },
        { type: 'callout', text: '今天这些能力被封装进框架，但面试与排障时仍要能落到原生标签与浏览器 API。' },
      ],
    },
  ],
}
