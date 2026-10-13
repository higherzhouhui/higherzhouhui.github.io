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
  ],
}
