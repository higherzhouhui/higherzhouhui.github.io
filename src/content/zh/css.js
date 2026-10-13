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
    {
      id: 'flex-deep',
      title: 'Flexbox 真正要记的轴',
      blocks: [
        { type: 'callout', text: '参考 CSS-Tricks《A Complete Guide to Flexbox》：先定主轴，再谈分配剩余空间。' },
        'flex-direction 决定主轴。justify-content 管主轴，align-items 管交叉轴，align-self 覆盖单个项目。flex-wrap: wrap 之后，align-content 才有意义——它管多行之间的空隙。',
        { type: 'ul', items: ['flex-grow：剩余空间怎么分', 'flex-shrink：不够时谁被挤', 'flex-basis：分配前的初始主尺寸，auto 常看 width/height', 'min-width: auto 会挡住收缩，溢出时给子项 min-width: 0', 'gap 比 margin 更干净'] },
        {
          type: 'code',
          lang: 'css',
          code: `.row {
  display: flex;
  gap: 12px;
  align-items: center;
}
.row > .grow { flex: 1 1 0; min-width: 0; }`,
        },
        '口诀：一行导航用 flex；二维杂志排版用 grid。两者可以嵌套，不要用 flex 硬模拟十二栅。',
      ],
    },
    {
      id: 'grid',
      title: 'Grid：轨道、区域、minmax',
      blocks: [
        'grid-template-columns: 200px 1fr 1fr 定义三条轨道。fr 是剩余空间的份。repeat(auto-fit, minmax(16rem, 1fr)) 是响应式卡片墙的最短写法。',
        'grid-template-areas 用名字拼版面，header / nav / main / footer 一眼能读。子项 grid-column: 1 / -1 拉满整行。subgrid（逐步可用）让子网格继承父轨道，对齐跨组件的列。',
        {
          type: 'code',
          lang: 'css',
          code: `.page {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-areas:
    "nav main"
    "nav footer";
}
@media (max-width: 800px) {
  .page { grid-template-columns: 1fr; grid-template-areas: "nav" "main" "footer"; }
}`,
        },
      ],
    },
    {
      id: 'cq',
      title: '容器查询，不再只问视口',
      blocks: [
        { type: 'callout', text: 'web.dev 把 container queries 当作组件级响应式：卡片在侧栏里该变窄，不该问整窗宽度。' },
        '给容器 container-type: inline-size（或 container-name），子元素用 @container (min-width: 24rem)。组件从侧栏拖到主栏，自己换布局，媒体查询做不到这一点。',
        {
          type: 'code',
          lang: 'css',
          code: `.card-wrap { container-type: inline-size; }
@container (min-width: 28rem) {
  .card { display: grid; grid-template-columns: 120px 1fr; }
}`,
        },
        'cqw / cqi 单位相对容器而非视口。和 :has() 搭配，父级可以根据「内部有没有图」换排版。',
      ],
    },
    {
      id: 'content-vis',
      title: 'content-visibility 与 contain',
      blocks: [
        '长列表里屏幕外的块不必算样式和布局。content-visibility: auto 让浏览器跳过屏幕外渲染，记得配 contain-intrinsic-size 以免滚动条乱跳。',
        'contain: layout style paint 告诉引擎「这里的变化出不去」。动画优先 transform / opacity，它们走合成线程，不触发重排。will-change 只给真正会变的元素，滥用会吃内存。',
      ],
    },
    {
      id: 'stacking',
      title: '层叠上下文',
      blocks: [
        'z-index 只在同一个层叠上下文里比大小。position 非 static 且 z-index 非 auto、opacity < 1、transform、filter、isolation: isolate 都会开新上下文。模态框被挡住，多半是祖先已经新开了一层。',
        '调试：从目标往上找「谁建立了上下文」，而不是给元素加 z-index: 99999。',
      ],
    },
    {
      id: 'logical',
      title: '逻辑属性与 :has / :focus-visible',
      blocks: [
        'margin-inline-start 比 margin-left 更适合 RTL。inset: 0 是上下左右归零。:focus-visible 让键盘看见焦点、鼠标点击不必画圈。:has(> img) 让父级根据子树选择自己——这是 CSS 等了很久的父选择器。',
        'color-scheme 与 light-dark() 让原生控件跟随主题。本站三套主题走的是 html[data-theme] 变量，和这套原生能力可以并存。',
      ],
    },
  ],
}
