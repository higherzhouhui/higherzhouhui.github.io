export default {
  kicker: '运行时',
  title: 'JavaScript 运行时笔记',
  lead: '生成代码很容易，解释一段闭包与一次事件循环更难。把类型、拷贝、this 与异步放回栈和堆上理解。',
  sections: [
    {
      id: 'leixing',
      title: '八种数据类型',
      blocks: [
        { type: 'callout', text: '基本类型存在栈上，引用类型把指针放在栈、实体放在堆。这是浅拷贝陷阱的物理原因。' },
        { type: 'h', text: '基本类型' },
        { type: 'ul', items: ['Number', 'String', 'Boolean', 'Symbol', 'BigInt', 'null', 'undefined'] },
        { type: 'h', text: '引用类型' },
        { type: 'ul', items: ['Object', 'Function', 'Array', 'Date', 'RegExp', 'Map'] },
        'Symbol 适合作为不对外暴露的键；BigInt 用于超过 2^53 的整数，避免和 Number 互转丢精度。',
      ],
    },
    {
      id: 'kaobei',
      title: '浅拷贝与深拷贝',
      blocks: [
        'B 复制了 A。改 A 时若 B 跟着变，是浅拷贝；B 不变，是深拷贝。',
        { type: 'h', text: '常见做法' },
        { type: 'ul', items: ['直接赋值是浅拷贝', 'JSON.parse(JSON.stringify()) 丢函数与循环引用', '展开运算只处理第一层', '递归拷贝才能覆盖嵌套对象'] },
        {
          type: 'code',
          lang: 'js',
          code: `function deepCopy(obj) {
  const next = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    next[key] = typeof obj[key] === 'object' && obj[key] ? deepCopy(obj[key]) : obj[key]
  }
  return next
}`,
        },
      ],
    },
    {
      id: 'var',
      title: 'var / let / const',
      blocks: [
        { type: 'ul', items: ['var 无块作用域，可提升，可重复声明，并映射到 window', 'let / const 块级作用域，暂时性死区，不可重复声明', 'const 必须初始化，绑定不可改（对象内容仍可变）'] },
      ],
    },
    {
      id: 'zyy',
      title: '作用域与作用域链',
      blocks: [
        '作用域是变量可访问的范围。当前上下文找不到，就沿上层一直找到全局，这条查找路径就是作用域链。最大用途是隔离同名变量。',
      ],
    },
    {
      id: 'bb',
      title: '闭包',
      blocks: [
        '函数执行形成私有上下文。若内部变量被外部占用，上下文不销毁，从而保存并保护私有变量。',
        { type: 'ul', items: ['优点：延长局部变量生命周期、封装私有状态', '缺点：过多闭包会占内存，可能泄漏'] },
        { type: 'callout', text: '事件回调、定时器、请求 then、函数工厂，日常代码几乎都是闭包。' },
      ],
    },
    {
      id: 'this',
      title: 'this 的指向',
      blocks: [
        {
          type: 'ol',
          items: [
            '普通调用指向 window（模块/严格模式除外）',
            'new 调用指向新实例',
            '对象方法指向该对象',
            '箭头函数捕获上层 this',
            'call / apply / bind 显式指定',
            'setTimeout 回调默认指向 window',
          ],
        },
      ],
    },
    {
      id: 'call',
      title: 'call / apply / bind',
      blocks: [
        '三者都改 this。call 接参数列表，apply 接数组，bind 返回待执行的新函数。',
      ],
    },
    {
      id: 'jiantou',
      title: '箭头函数',
      blocks: [
        { type: 'ul', items: ['没有自己的 this / arguments / prototype', '不能 new', '不绑定 Arguments，用 rest 代替'] },
      ],
    },
    {
      id: 'yuanxing',
      title: '原型与原型链',
      blocks: [
        '每个函数有 prototype，每个实例有 __proto__，实例的 __proto__ 指向构造函数的 prototype。沿 __proto__ 走到 Object.prototype 为 null，形成原型链。',
        { type: 'h', text: 'new 做了什么' },
        { type: 'ol', items: ['创建空对象', '把原型指到 Fn.prototype', '用 this 执行构造函数', '引用类型则返回该对象，否则返回新对象'] },
      ],
    },
    {
      id: 'event',
      title: 'Event Loop',
      blocks: [
        '同步入栈执行；异步进入宏任务或微任务队列。微任务（Promise.then、queueMicrotask）优先于宏任务（setTimeout、I/O）。一次循环：清空微任务 → 取一个宏任务 → 再清空微任务。',
        { type: 'callout', text: '浏览器与 Node 的阶段划分不同，但「微任务插在宏任务之间」这条直觉两边都成立。' },
      ],
    },
    {
      id: 'async',
      title: 'setTimeout / Promise / async-await',
      blocks: [
        'Promise 执行器是同步的，then 才是微任务。async 函数遇到 await 会先交出线程，等 Promise 完成后以微任务恢复。',
        {
          type: 'code',
          lang: 'js',
          code: `console.log('start')
Promise.resolve().then(() => console.log('micro'))
setTimeout(() => console.log('macro'))
console.log('end')
// start → end → micro → macro`,
        },
      ],
    },
    {
      id: 'jieliu',
      title: '节流与防抖',
      blocks: [
        '节流：间隔内只认第一次（滚动加载、连点）。防抖：停下来才执行最后一次（输入搜索、resize）。',
      ],
    },
    {
      id: 'arraymethod',
      title: '数组常用方法',
      blocks: [
        { type: 'ul', items: ['forEach 遍历', 'map 映射新数组', 'push / pop 尾部增删', 'shift / unshift 头部增删', 'splice 删除或替换', 'reverse 反转'] },
        '去重可用 Set + Array.from，或 filter + indexOf。',
        { type: 'h', text: '再记一批面试爱问的' },
        { type: 'ul', items: ['filter / find / some / every', 'reduce 折叠', 'slice 浅拷贝片段、splice 改原数组', 'includes / indexOf', 'flat / flatMap', 'sort 默认按字符串，数字要自己写比较器'] },
      ],
    },
    {
      id: 'ws',
      title: 'WebSocket',
      blocks: [
        { type: 'callout', text: '从 myBlog《十分钟学会 WebSocket》迁入：直播与协同不能只靠轮询。' },
        '握手是一次 HTTP Upgrade，101 之后变成全双工帧。比短轮询少延迟、少报文头。生产要心跳、退避重连，并把二进制与 JSON 分开。',
        {
          type: 'code',
          lang: 'js',
          code: `const ws = new WebSocket('wss://example.com/live')
ws.onopen = () => ws.send('hello')
ws.onmessage = (e) => console.log(e.data)`,
        },
      ],
    },
    {
      id: 'jsons',
      title: 'JSON.stringify 的隐藏参数',
      blocks: [
        '第二参可以是白名单或 replacer，第三参是缩进。对象上的 toJSON 会被调用。循环引用会抛错。',
        {
          type: 'code',
          lang: 'js',
          code: `JSON.stringify(user, ['id', 'name'], 2)
JSON.stringify(data, (k, v) => (k === 'password' ? undefined : v))`,
        },
      ],
    },
    {
      id: 'loop-deep',
      title: '事件循环再走一圈',
      blocks: [
        { type: 'callout', text: '参考 javascript.info《Event loop》：一次 macrotask 结束后，引擎会把微任务队列抽干，再去做渲染或下一宏任务。' },
        '浏览器主线程同时跑 JS、样式计算、布局和绘制。宏任务来源包括 script、setTimeout、setInterval、I/O、UI 事件。微任务来源是 Promise.then / catch / finally、queueMicrotask、MutationObserver。',
        'queueMicrotask(fn) 比 Promise.resolve().then(fn) 更直白：不造多余 Promise。await 之后的代码也是微任务。如果微任务里再 enqueue 微任务，本轮会一直跑到队列空——这就是「饿死渲染」的常见写法。',
        {
          type: 'code',
          lang: 'js',
          code: `queueMicrotask(() => console.log('micro 1'))
Promise.resolve().then(() => {
  console.log('micro 2')
  queueMicrotask(() => console.log('micro 3'))
})
setTimeout(() => console.log('macro'))
// micro 1 → micro 2 → micro 3 → macro`,
        },
        'Node 的 phases（timers、poll、check）更细，但面试用「宏任务之间夹一层微任务」足够。requestAnimationFrame 挂在绘制前，不要把它和 setTimeout(0) 当成一回事。',
      ],
    },
    {
      id: 'weakmap',
      title: 'WeakMap / WeakSet / WeakRef',
      blocks: [
        'Map 的键会挡住 GC。WeakMap 的键必须是对象，且是弱引用：对象没人要时，条目一起走。适合在 DOM 节点上挂私有元数据，组件卸掉节点时不必手动 delete。',
        { type: 'ul', items: ['WeakMap：对象 → 任意值，不可枚举、没有 size', 'WeakSet：只存对象弱引用', 'WeakRef：显式弱引用，deref() 可能得到 undefined', 'FinalizationRegistry：对象被收时跑回调，不要当析构函数用'] },
        {
          type: 'code',
          lang: 'js',
          code: `const meta = new WeakMap()
export function tag(el, info) {
  meta.set(el, info)
}
export function read(el) {
  return meta.get(el)
}`,
        },
      ],
    },
    {
      id: 'abort',
      title: 'AbortController 取消 fetch',
      blocks: [
        '搜索框每敲一次就发请求，上一次必须能停。AbortController 给出 signal，传给 fetch；abort() 之后该请求以 AbortError 失败。React 18 的 effect 清理函数里 abort，是避免竞态的标准姿势。',
        {
          type: 'code',
          lang: 'js',
          code: `const ac = new AbortController()
fetch('/api/search?q=' + q, { signal: ac.signal })
  .then((r) => r.json())
  .catch((err) => {
    if (err.name === 'AbortError') return
    throw err
  })
// 下一次输入：ac.abort()`,
        },
        '同一个 signal 可以挂到多个 fetch 和 addEventListener 上，组件卸载时一次 abort 清干净。超时用 AbortSignal.timeout(ms)（较新浏览器）或自己 setTimeout 调 abort。',
      ],
    },
    {
      id: 'fetch-http',
      title: 'fetch 比看起来多几层',
      blocks: [
        { type: 'ul', items: ['默认不带 cookie：要 credentials: "include"', '跨域预检由 CORS 决定，不是 fetch 自己的锅', 'response.ok 只看 200–299，4xx 不会进 catch', 'body 只能读一次，要克隆用 response.clone()', '流式用 response.body.getReader()'] },
        {
          type: 'code',
          lang: 'js',
          code: `const res = await fetch('/api/me', { credentials: 'include' })
if (!res.ok) throw new Error(res.status)
const data = await res.json()`,
        },
        '上传进度仍要 XMLHttpRequest 或底层 ReadableStream；fetch 目前对上传进度支持不齐。错误分类：网络失败进 catch，业务失败看 status。',
      ],
    },
    {
      id: 'proxy',
      title: 'Proxy 与 Reflect',
      blocks: [
        'Proxy 拦 get / set / has / deleteProperty / apply。Vue 3 的响应式就是在这层做依赖收集。Reflect 提供与拦截器同名的默认行为，return Reflect.set(...) 能把赋值结果和 this 传对。',
        {
          type: 'code',
          lang: 'js',
          code: `const state = new Proxy({ n: 0 }, {
  get(t, k, r) {
    track(k)
    return Reflect.get(t, k, r)
  },
  set(t, k, v, r) {
    const ok = Reflect.set(t, k, v, r)
    trigger(k)
    return ok
  },
})`,
        },
        '陷阱：for...in 不会触发 get；数组 length 与索引是两套键；代理不等于原对象（=== 为 false），Map 里当键会分家。',
      ],
    },
    {
      id: 'iterator',
      title: '迭代器、生成器与 for await',
      blocks: [
        '可迭代对象实现 [Symbol.iterator]()，返回 { next() { return { value, done } } }。for...of、展开、Array.from 都认这个协议。生成器函数 function* 自动交出迭代器，yield 暂停。',
        '异步迭代器用 [Symbol.asyncIterator] 和 for await...of，适合一行行读流。别在生成器里混用太多副作用，它首先是控制流工具。',
      ],
    },
    {
      id: 'esm-cjs',
      title: 'ESM 在运行时的形状',
      blocks: [
        'import 是静态的、提升的、只读绑定（live binding：导出方改值，导入方下一拍能看到）。import() 才是动态、返回 Promise。CommonJS 的 module.exports 是值拷贝快照。',
        { type: 'ul', items: ['循环依赖时 ESM 先执行依赖图，TDZ 仍会炸', '默认导出是名叫 default 的绑定', 'Node 里 .mjs / "type": "module" 才按 ESM 解析', 'tree-shaking 依赖静态结构，别写成 import(\'./mod\') 再取属性还指望摇掉'] },
      ],
    },
  ],
}
