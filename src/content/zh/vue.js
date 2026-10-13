export default {
  kicker: '数据',
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
    {
      id: 'eco',
      title: '2024 生态怎么配',
      blocks: [
        { type: 'callout', text: '从 myBlog《Vue 生态工具推荐》：把选择钉死，才把时间还给业务。' },
        { type: 'ul', items: ['pnpm', 'Vite', 'TypeScript', 'Pinia', 'Vant / Element Plus', 'UnoCSS'] },
        '移动端模板（vue3-vant-mobile 一类）的价值是文件路由、自动引入、PWA、vw 适配先焊好。',
      ],
    },
    {
      id: 'composition',
      title: 'Composition API 为什么能拆逻辑',
      blocks: [
        'Options API 按 data / methods / computed 切片，相关逻辑被拆到文件四面。setup（或 <script setup>）按功能组织：一个 useUser() 把状态、请求、清理带回来。',
        { type: 'ul', items: ['ref 包值类型，模板自动解包，脚本里用 .value', 'reactive 包对象，注意解构会丢代理，用 toRefs', 'computed 只读派生', 'watch / watchEffect：前者精确，后者立即跑并自动收集'] },
        {
          type: 'code',
          lang: 'js',
          code: `export function useSearch(source) {
  const q = ref('')
  const list = computed(() => source.value.filter((x) => x.includes(q.value)))
  return { q, list }
}`,
        },
        '生命周期在 setup 里变成 onMounted / onUnmounted。mixins 的命名冲突被 composable 的返回值取代。',
      ],
    },
    {
      id: 'pinia',
      title: 'Pinia 替换 Vuex 的理由',
      blocks: [
        '没有 mutations 层，action 可同步可异步。store 是一个用 setup 或 option 写的模块，TypeScript 推断友好。没有命名空间嵌套，靠多个 store 组合。',
        '组件里 const cart = useCartStore()，在 setup 外调用要等 pinia 安装完成。热更新时状态可保留。SSR 要为每次请求 createPinia，避免单例串台。',
      ],
    },
    {
      id: 'teleport',
      title: 'Teleport、Suspense 与内置组件',
      blocks: [
        'Teleport to="body" 把弹层从 overflow:hidden 的祖先里救出来，和 React Portal 同类。Suspense 等异步 setup 或异步组件，#fallback 槽位放骨架屏。',
        'KeepAlive 缓存的是实例，activated / deactivated 代替再次 mounted。Transition 只负责 CSS 类名时序，不要在 JS 钩子里和 CSS 抢同一属性。',
      ],
    },
    {
      id: 'v3diff',
      title: 'Vue 2 → 3 容易踩的坑',
      blocks: [
        { type: 'ul', items: ['过滤器没了，改 computed 或方法', 'v-model 默认 prop 从 value 变成 modelValue，事件 update:modelValue', '$listeners 并进 $attrs', '销毁钩子改名 unmounted', '全局 API 变成 app.use / app.component', 'keyCode 修饰符移除'] },
        'Vue 2 的 defineProperty 拦不住新增字段，Vue 3 Proxy 可以。从 2 迁 3 用 @vue/compat 能混跑，但不要把兼容层当永久方案。',
      ],
    },
    {
      id: 'slots',
      title: '插槽与作用域插槽',
      blocks: [
        '默认插槽、具名插槽、作用域插槽（子组件把数据回传给插槽内容）。#header="{ user }" 是 v-slot:header 的糖。渲染函数里用 slots.default?.()。',
        '别用插槽当「低配作用域」去传回调，能 emit 就 emit。表格列自定义是作用域插槽的典型场景。',
      ],
    },
  ],
}
