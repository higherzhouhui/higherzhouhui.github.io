export default {
  kicker: 'VIEW  ·  UNIDIRECTIONAL',
  title: 'React：函数视图与可中断渲染',
  lead: 'React 只管 View。状态向下流，事件向上报。Hooks 让函数组件拥有记忆，Fiber 让那次更新可以被打断。',
  sections: [
    {
      id: 'r1',
      title: '它是什么',
      blocks: [
        'Facebook 开源的 UI 库，一切皆组件。不是 MVVM：没有双向绑定，推崇纯组件与单向数据流。',
      ],
    },
    {
      id: 'hooks',
      title: 'Hooks 的取舍',
      blocks: [
        { type: 'h', text: '优点' },
        { type: 'ul', items: ['相关逻辑可聚在一个 useEffect', '自定义 Hook 复用状态，不必叠 HOC', '没有 class 的 this'] },
        { type: 'h', text: '限制' },
        { type: 'ul', items: ['覆盖不了 getSnapshotBeforeUpdate 等全部生命周期', '依赖项要拆细，职责单一', '极复杂场景仍可用 class'] },
      ],
    },
    {
      id: 'r2',
      title: 'Class 与函数组件',
      blocks: [
        '函数组件更接近「给定 props 得到 UI」。Hooks 之后它有了状态，但每次渲染仍是一次函数调用；class 则 new 出实例。官方更推荐钩子。',
      ],
    },
    {
      id: 'r3',
      title: '常用钩子',
      blocks: [
        { type: 'ul', items: ['useState 状态', 'useEffect 副作用（布局后异步）', 'useLayoutEffect 布局后同步', 'useMemo 记忆值', 'useCallback 记忆函数', 'useRef 保存引用', 'useContext / useReducer'] },
        { type: 'callout', text: 'useLayoutEffect 会挡住绘制，优先用 useEffect。' },
      ],
    },
    {
      id: 'r4',
      title: '组件通信',
      blocks: [
        { type: 'ol', items: ['父→子：props', '子→父：回调', '跨层：Context', '非嵌套：状态提升、发布订阅、Redux'] },
      ],
    },
    {
      id: 'redux',
      title: 'Redux',
      blocks: [
        'Action 描述发生了什么，dispatch 送进 store，reducer 纯函数算出下一状态。适合跨页共享、需要时间旅行调试的状态。',
      ],
    },
    {
      id: 'r5',
      title: 'setState 同步还是异步',
      blocks: [
        '在 React 合成事件与生命周期里批量、表现为异步；在 setTimeout 或原生 DOM 监听里往往同步。以是否处于 React 批处理为准。',
      ],
    },
    {
      id: 'r6',
      title: '生命周期',
      blocks: [
        { type: 'ul', items: ['挂载：constructor → getDerivedStateFromProps → render → componentDidMount', '更新：gDSFP → shouldComponentUpdate → render → getSnapshotBeforeUpdate → componentDidUpdate', '卸载：componentWillUnmount'] },
      ],
    },
    {
      id: 'r7',
      title: 'Fiber',
      blocks: [
        '长任务堵住主线程就会掉帧。Fiber 把递归 diff 改成链表可中断工作：高优先级（输入）可打断低优先级（大列表 diff）。提交阶段仍一次性、不可打断。',
      ],
    },
    {
      id: 'r8',
      title: 'Portals 与懒加载',
      blocks: [
        'Portals 把子树挂到父级 DOM 之外，适合模态框。大模块与路由用 React.lazy + Suspense。事件在 React 18 仍走委托，阻止冒泡要用合成事件 API。',
      ],
    },
    {
      id: 'concurrent',
      title: '并发渲染与 startTransition',
      blocks: [
        { type: 'callout', text: 'React 18 把更新分成紧急与可中断。输入框的 setState 是紧急的；过滤大列表可以包进 startTransition，让输入先上屏。' },
        'useTransition 返回 [isPending, startTransition]。useDeferredValue 把「跟着输入但可落后一帧」的值交给列表。Suspense 在并发模式下可以重复显示 fallback，而不是一次挂死。',
        {
          type: 'code',
          lang: 'jsx',
          code: `const [q, setQ] = useState('')
const [isPending, startTransition] = useTransition()
function onChange(e) {
  const next = e.target.value
  setQ(next)
  startTransition(() => setList(filterHuge(next)))
}`,
        },
        '调度底层曾用 MessageChannel 把工作切片交回主线程。你不必手写调度器，但要知道：长任务仍会卡住 INP，该拆的还是得拆。',
      ],
    },
    {
      id: 'keys',
      title: 'key 不是给警告用的',
      blocks: [
        'key 告诉 reconciler「这是同一身份」。用 index 当 key，插入/删除会错位，受控 input 会把值贴到错误的行。列表会排序、过滤，就用稳定 id。',
        'key 变化 = 卸载旧实例、挂载新实例：state、effects、DOM 焦点全丢。想重置表单，改 key 比手写一堆 setState 更干净。',
      ],
    },
    {
      id: 'batch18',
      title: 'React 18 的批处理',
      blocks: [
        '18 之前，事件处理器里多个 setState 会合并，setTimeout / Promise / 原生监听里往往各刷一次。18 起默认全部自动批处理。需要中间画出一帧，用 flushSync。',
        '函数式更新 setN(n => n + 1) 在批里仍按顺序叠。对象 state 记得展开，否则丢字段。',
      ],
    },
    {
      id: 'memo',
      title: 'memo / useMemo / useCallback 什么时候才赚',
      blocks: [
        'React.memo 浅比较 props。子树很重、父级又频繁 render 时才包。useMemo 缓存计算，useCallback 缓存函数引用——为的是让 memo 子组件看到「同一个函数」。',
        '过早记忆会让依赖数组变成新的bug源。先用 Profiler 看是谁在空转，再决定包哪一层。Context 值每次都是新对象，会击穿下面所有消费者：把 value 拆小，或 memo 住。',
      ],
    },
    {
      id: 'error-b',
      title: 'Error Boundary 与严格模式',
      blocks: [
        '错误边界只能用 class 的 getDerivedStateFromError / componentDidCatch，抓住渲染期错误，抓不住事件处理器和异步。开发环境 Strict Mode 会故意双调用 effect，逼你写出可重复的订阅与清理。',
        '生产包不会双调用。看到 effect 跑两次就去修清理函数，而不是关掉严格模式。',
      ],
    },
    {
      id: 'rsc',
      title: 'RSC 与「客户端组件」边界',
      blocks: [
        'Next App Router 默认服务端组件：能 await 数据、不把实现打进浏览器包。需要 onClick / useState 的叶子加 "use client"。边界要尽量靠下，避免整页变成客户端。',
        'GitHub Pages 这种纯静态站发不了 RSC 运行时。本站仍是 CSR SPA，用静态生成换零服务器。该用流式 HTML 的项目，另开 Node 宿主。',
      ],
    },
  ],
}
