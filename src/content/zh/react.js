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
  ],
}
