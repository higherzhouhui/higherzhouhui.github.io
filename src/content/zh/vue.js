export default {
  kicker: 'MVVM  ·  REACTIVE',
  title: 'Vue：数据驱动的桥梁',
  lead: 'Model 是普通对象，View 是 UI，ViewModel 把两边焊在一起。改数据即改视图——这是 Vue 一直在卖的确定性。',
  sections: [
    {
      id: 'r1',
      title: '什么是 MVVM',
      blocks: [
        '低耦合、可复用、可让设计与逻辑分头进行。Vue 把 Controller 收成 ViewModel，走数据驱动而不是手改 DOM。',
      ],
    },
    {
      id: 'r2',
      title: '响应式原理与缺陷',
      blocks: [
        'Vue2：Object.defineProperty 劫持 getter/setter + 发布订阅。缺陷：递归开销、无法侦测新增/删除、数组下标方法要靠包装。Vue3 改用 Proxy，这些问题被收掉一截。',
      ],
    },
    {
      id: 'r3',
      title: '生命周期',
      blocks: [
        { type: 'ul', items: ['beforeCreate / created：实例与数据', 'beforeMount / mounted：上 DOM，可发请求、拿 ref', 'beforeUpdate / updated：数据变后的重渲染', 'beforeUnmount / unmounted：清定时器与订阅'] },
        '父子顺序：父 created → 子 created → 子 mounted → 父 mounted；销毁相反。',
      ],
    },
    {
      id: 'r4',
      title: 'computed 与 watch',
      blocks: [
        '能用 computed 就用 computed——有缓存。watch 适合数据变化后做异步或重操作。购物车合计偏 computed，搜索输入偏 watch。',
      ],
    },
    {
      id: 'r5',
      title: 'data 为何是函数',
      blocks: ['组件会多次实例化。若 data 是对象，引用共享会串状态。函数每次返回新对象。'],
    },
    {
      id: 'r6',
      title: 'v-for 与 v-if',
      blocks: [
        'Vue2 里 v-for 优先；Vue3 里 v-if 优先。同一节点混用语义含糊，先用计算属性过滤再渲染。key 让 diff 走映射而不是就地复用。',
      ],
    },
    {
      id: 'r8',
      title: '组件通信',
      blocks: [
        { type: 'ul', items: ['props / emit', 'provide / inject', 'Event Bus', 'Vuex / Pinia', '$attrs'] },
      ],
    },
    {
      id: 'r9',
      title: 'nextTick 与 keep-alive',
      blocks: [
        '更新 DOM 是异步排队的，nextTick 在本轮更新后读到新 DOM，内部优先 Promise 微任务。keep-alive 按 vnode 缓存实例，include / exclude / max（LRU）。',
      ],
    },
    {
      id: 'r15',
      title: 'Vuex',
      blocks: ['State、Getter、Mutation（同步唯一改状态）、Action（可异步）、Module。大型应用的公共数据总线。'],
    },
  ],
}
