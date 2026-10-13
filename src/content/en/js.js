export default {
  kicker: 'RUNTIME  ·  SINGLE THREAD',
  title: 'JavaScript runtime notes',
  lead: 'Generating code is easy; explaining a closure and one event-loop turn is harder. Put types, copies, this, and async back onto stack and heap.',
  sections: [
    {
      id: 'leixing',
      title: 'Eight types',
      blocks: [
        { type: 'callout', text: 'Primitives live on the stack; references store a pointer on the stack and the payload on the heap. That is why shallow copy bites.' },
        { type: 'h', text: 'Primitives' },
        { type: 'ul', items: ['Number', 'String', 'Boolean', 'Symbol', 'BigInt', 'null', 'undefined'] },
        { type: 'h', text: 'References' },
        { type: 'ul', items: ['Object', 'Function', 'Array', 'Date', 'RegExp', 'Map'] },
        'Symbol is a good hidden key. BigInt is for integers beyond 2^53 — do not round-trip with Number.',
      ],
    },
    {
      id: 'kaobei',
      title: 'Shallow vs deep copy',
      blocks: [
        'If B copies A and B changes when A changes, the copy is shallow. If B stays, it is deep.',
        { type: 'ul', items: ['Assignment is shallow', 'JSON clone drops functions and cycles', 'Spread only copies the first layer', 'Recursion covers nested objects'] },
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
        { type: 'ul', items: ['var is function-scoped, hoisted, re-declarable, mapped on window', 'let / const are block-scoped with a TDZ', 'const binds the name; object contents can still mutate'] },
      ],
    },
    {
      id: 'zyy',
      title: 'Scope and the scope chain',
      blocks: [
        'Scope is where a name is visible. Miss it here, walk outward to global — that walk is the scope chain. Its job is isolating homonyms.',
      ],
    },
    {
      id: 'bb',
      title: 'Closures',
      blocks: [
        'A call creates a private context. If something outside still holds inner state, the context stays — saving and protecting those variables.',
        { type: 'ul', items: ['Pros: longer life for locals, private state', 'Cons: too many closures hold memory'] },
      ],
    },
    {
      id: 'this',
      title: 'this',
      blocks: [
        {
          type: 'ol',
          items: [
            'Bare call → window (not in modules / strict)',
            'new → the instance',
            'method → the object',
            'arrow → lexical this',
            'call / apply / bind → explicit',
            'setTimeout callback → window by default',
          ],
        },
      ],
    },
    {
      id: 'call',
      title: 'call / apply / bind',
      blocks: ['All three set this. call takes a list, apply an array, bind returns a later function.'],
    },
    {
      id: 'jiantou',
      title: 'Arrow functions',
      blocks: [{ type: 'ul', items: ['No own this / arguments / prototype', 'Not constructible', 'Use rest instead of arguments'] }],
    },
    {
      id: 'yuanxing',
      title: 'Prototype chain',
      blocks: [
        'Functions have prototype; instances have __proto__ pointing at it. Walk until Object.prototype is null.',
        { type: 'h', text: 'What new does' },
        { type: 'ol', items: ['Create an object', 'Set its prototype', 'Run the constructor with this', 'Return the object unless a reference was returned'] },
      ],
    },
    {
      id: 'event',
      title: 'Event Loop',
      blocks: [
        'Sync work runs on the stack. Async work enters microtasks or macrotasks. Micros (then, queueMicrotask) beat macros (timers, I/O). One turn: drain micros → one macro → drain micros again.',
      ],
    },
    {
      id: 'async',
      title: 'setTimeout / Promise / async-await',
      blocks: [
        'The executor is sync; then is a microtask. await yields, then resumes as a microtask.',
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
      title: 'Throttle and debounce',
      blocks: ['Throttle keeps the first call in a window. Debounce waits for silence, then runs the last call.'],
    },
    {
      id: 'arraymethod',
      title: 'Array methods',
      blocks: [
        { type: 'ul', items: ['forEach', 'map', 'push / pop', 'shift / unshift', 'splice', 'reverse'] },
        'Deduplicate with Set or filter + indexOf.',
        { type: 'ul', items: ['filter / find / some / every', 'reduce', 'slice vs splice', 'flat / flatMap', 'sort needs a numeric comparator'] },
      ],
    },
    {
      id: 'ws',
      title: 'WebSocket',
      blocks: [
        { type: 'callout', text: 'From myBlog: live and collab cannot live on polling alone.' },
        'Upgrade over HTTP, then 101, then full-duplex frames. Add heartbeats and backoff in production.',
      ],
    },
    {
      id: 'jsons',
      title: 'JSON.stringify extras',
      blocks: [
        'Second argument is a whitelist or replacer; third is indent. toJSON is honored; cycles throw.',
      ],
    },
    {
      id: 'loop-deep',
      title: 'The event loop, one more pass',
      blocks: [
        { type: 'callout', text: 'After javascript.info: drain microtasks after every macrotask, then render or the next macro.' },
        'The browser main thread also styles, lays out, and paints. Macrotasks: script, timers, I/O, UI events. Microtasks: Promise then/catch/finally, queueMicrotask, MutationObserver.',
        'queueMicrotask(fn) is clearer than Promise.resolve().then(fn). Code after await is a microtask too. Microtasks that enqueue more microtasks starve paint.',
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
        'Node phases are finer. Interview intuition is enough: micros sit between macros. rAF is before paint — not setTimeout(0).',
      ],
    },
    {
      id: 'weakmap',
      title: 'WeakMap / WeakSet / WeakRef',
      blocks: [
        'Map keys pin objects. WeakMap keys must be objects and are weak: when the object goes, the entry goes. Handy metadata on DOM nodes without manual delete.',
        { type: 'ul', items: ['WeakMap: object → value, not enumerable, no size', 'WeakSet: weak object membership', 'WeakRef: deref() may be undefined', 'FinalizationRegistry: not a destructor'] },
      ],
    },
    {
      id: 'abort',
      title: 'AbortController and fetch',
      blocks: [
        'Each keystroke should cancel the last search. Pass signal to fetch; abort() fails with AbortError. Abort in a React effect cleanup to avoid races.',
        {
          type: 'code',
          lang: 'js',
          code: `const ac = new AbortController()
fetch('/api/search?q=' + q, { signal: ac.signal })
  .then((r) => r.json())
  .catch((err) => {
    if (err.name === 'AbortError') return
    throw err
  })`,
        },
        'One signal can cover several fetches and listeners. AbortSignal.timeout(ms) exists in newer engines.',
      ],
    },
    {
      id: 'fetch-http',
      title: 'fetch has more layers',
      blocks: [
        { type: 'ul', items: ['Cookies need credentials: "include"', 'CORS preflight is not fetch’s fault', 'response.ok is 200–299; 4xx does not reject', 'body is one-shot; clone if you must reread', 'stream with getReader()'] },
        'Upload progress still wants XHR or a ReadableStream. Network failures reject; business failures live in status.',
      ],
    },
    {
      id: 'proxy',
      title: 'Proxy and Reflect',
      blocks: [
        'Proxy traps get/set/has/delete/apply. Vue 3 collects deps here. Reflect mirrors the default operation so this and the boolean result stay correct.',
        'for...in does not hit get. An array’s length and indexes are separate keys. A proxy is not === the target.',
      ],
    },
    {
      id: 'iterator',
      title: 'Iterators, generators, for await',
      blocks: [
        'Iterable means [Symbol.iterator]() returning { next() }. for...of, spread, Array.from all honor it. function* yields an iterator. Async iteration uses for await...of.',
      ],
    },
    {
      id: 'esm-cjs',
      title: 'ESM at runtime',
      blocks: [
        'import is static, hoisted, and a live binding. import() is dynamic and returns a Promise. CJS exports a snapshot.',
        { type: 'ul', items: ['Cycles still hit the TDZ', 'default is a binding named default', 'Node needs .mjs or "type": "module"', 'tree-shaking needs static shape'] },
      ],
    },
  ],
}
