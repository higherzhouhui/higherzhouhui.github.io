export default {
  kicker: 'RUNTIME  ·  SINGLE THREAD',
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
      ],
    },
  ],
}
