export default {
  kicker: 'MVVM  ·  REACTIVE',
  title: 'Vue: a reactive bridge',
  lead: 'The model is a plain object, the view is UI, the ViewModel welds them. Change data, change the view — that certainty is what Vue sells.',
  sections: [
    {
      id: 'r1',
      title: 'MVVM',
      blocks: ['Low coupling, reusable view logic, split design and data work. Vue folds the controller into a ViewModel and drives the DOM from state.'],
    },
    {
      id: 'r2',
      title: 'Reactivity',
      blocks: ['Vue 2 hijacks getters with defineProperty. Costs: deep recursion, missing add/delete, array methods need wrappers. Vue 3 uses Proxy and drops most of that.'],
    },
    {
      id: 'r3',
      title: 'Lifecycle',
      blocks: [
        { type: 'ul', items: ['created: data ready, requests ok', 'mounted: DOM and refs', 'updated: after patch', 'unmounted: clear timers'] },
        'Parent created → child created → child mounted → parent mounted; teardown reverses.',
      ],
    },
    {
      id: 'r4',
      title: 'computed vs watch',
      blocks: ['Prefer computed for cached derivations. Watch is for async or expensive work after a change.'],
    },
    {
      id: 'r5',
      title: 'Why data is a function',
      blocks: ['Each instance needs a fresh object. A shared data object would leak state across copies.'],
    },
    {
      id: 'r6',
      title: 'v-for and v-if',
      blocks: ['Priority flipped from Vue 2 to 3. Filter in computed instead of mixing the two. key makes diff a map, not reuse-in-place.'],
    },
    {
      id: 'r8',
      title: 'Talking between components',
      blocks: [{ type: 'ul', items: ['props / emit', 'provide / inject', 'event bus', 'Vuex / Pinia', '$attrs'] }],
    },
    {
      id: 'r9',
      title: 'nextTick and keep-alive',
      blocks: ['DOM updates are queued. nextTick reads after the flush, preferring microtasks. keep-alive caches vnodes with include / exclude / max.'],
    },
    {
      id: 'r15',
      title: 'Vuex',
      blocks: ['State, getters, synchronous mutations, async actions, modules — a bus for large apps.'],
    },
    {
      id: 'eco',
      title: 'A 2024 Vue toolchain',
      blocks: [
        { type: 'ul', items: ['pnpm', 'Vite', 'TypeScript', 'Pinia', 'Vant / Element Plus', 'UnoCSS'] },
        'Templates earn their keep by welding file routes, auto-import, PWA, and vw layout first.',
      ],
    },
  ],
}
