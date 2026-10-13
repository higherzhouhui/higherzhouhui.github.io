export default {
  kicker: 'LAYOUT  ·  PAINT',
  title: 'CSS 选择、盒子与布局',
  lead: '样式表是空间协议。先搞清优先级和盒子，再谈居中、BFC 与移动端适配。生成式 UI 仍会写错这两层。',
  sections: [
    {
      id: 'xy',
      title: '选择器与优先级',
      blocks: [
        { type: 'ol', items: ['id', 'class', '属性', '伪类', '标签', '相邻 / 子 / 后代', '通配符'] },
        { type: 'callout', text: '!important > 行内 > ID > class/属性/伪类 > 元素 > 通配符 > 继承 > UA 默认。' },
      ],
    },
    {
      id: 'jy',
      title: '渐进增强与优雅降级',
      blocks: [
        '渐进增强：先服务低版本，再给新浏览器加料。优雅降级：先做完整体验，再向下兼容。',
        '写 transition 时，增强派先写前缀再写标准；降级派相反。',
      ],
    },
    {
      id: 'new',
      title: 'CSS3 印象',
      blocks: [
        { type: 'ul', items: ['transition / animation', 'transform', ':nth-of-type', 'text-shadow / box-shadow', 'flex / grid / 多列', '媒体查询', 'filter'] },
      ],
    },
    {
      id: 'position',
      title: 'position',
      blocks: [
        { type: 'ul', items: ['static 文档流', 'relative 占位并可偏移', 'absolute 相对最近定位祖先，脱离文档流', 'fixed 相对视口', 'sticky 阈值前 relative、之后 fixed'] },
      ],
    },
    {
      id: 'box',
      title: '盒子模型与 box-sizing',
      blocks: [
        '标准盒：width 只算 content。IE 盒：width 含 padding + border。border-box 让「设定宽高即边框盒」，组件里更稳。',
      ],
    },
    {
      id: 'bfc',
      title: 'BFC',
      blocks: [
        '块级格式化上下文是独立渲染区。创建方式：根元素、float、绝对定位、flex/inline-block、overflow 非 visible。',
        { type: 'ul', items: ['内部盒子垂直排列', '同一 BFC 的相邻 margin 会折叠', '计算高度时浮动也计入', '不与 float 重叠'] },
      ],
    },
    {
      id: 'czjz',
      title: '水平垂直居中',
      blocks: [
        { type: 'ul', items: ['行内：text-align: center', '定宽块：margin: 0 auto', '未知宽：absolute + transform', 'flex：justify-content / align-items 或子项 margin: auto'] },
      ],
    },
    {
      id: 'hide',
      title: '隐藏元素',
      blocks: [
        { type: 'ul', items: ['opacity: 0 仍占位、仍可点', 'visibility: hidden 占位、不可点（重绘）', 'display: none 不占位（回流 + 重绘）'] },
      ],
    },
    {
      id: 'sjfh',
      title: 'CSS 三角',
      blocks: [
        { type: 'code', lang: 'css', code: `div::after {
  content: '';
  width: 0;
  height: 0;
  border: 100px solid transparent;
  border-top-color: #ff0;
}` },
        '口诀：宽高皆零，三面透明。',
      ],
    },
    {
      id: 'ymbj',
      title: '页面布局',
      blocks: [
        { type: 'h', text: 'Flex' },
        '主轴用 flex-direction，对齐用 justify-content / align-items。项目用 flex-grow / shrink / basis。',
        { type: 'h', text: 'Rem 与百分比' },
        'Rem 相对 html 字号，本质是按宽度等比。百分比相对父级，padding 即使垂直也常相对父 width。',
      ],
    },
    {
      id: 'clear',
      title: '清除浮动',
      blocks: [
        { type: 'ul', items: ['额外空标签 clear: both', '父级 overflow / 定高', '父级 ::after { content:""; display:block; clear:both }'] },
      ],
    },
    {
      id: 'sass',
      title: '预处理器',
      blocks: [
        'Sass 变量 $，Less 变量 @，Stylus 更自由。三者都有嵌套、运算、混入与继承；Stylus 还有循环与判断。',
      ],
    },
    {
      id: 'loading',
      title: '纯 CSS Loading',
      blocks: [
        { type: 'callout', text: '从 myBlog 的 117 个 Loading 里抽出最小单元：圆环 + @keyframes。' },
        {
          type: 'code',
          lang: 'css',
          code: `.loading {
  width: 30px; height: 30px;
  border: 2px solid var(--gold);
  border-top-color: transparent;
  border-radius: 100%;
  animation: spin 0.75s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }`,
        },
      ],
    },
  ],
}
