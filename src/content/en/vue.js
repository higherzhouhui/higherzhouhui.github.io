export default {
  kicker: 'Data',
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
    {
      id: 'composition',
      title: 'Why Composition API splits logic',
      blocks: [
        'Options API slices by data/methods/computed. setup groups by feature: useUser() brings state, fetch, and cleanup home.',
        { type: 'ul', items: ['ref unwraps in templates; .value in script', 'reactive objects lose the proxy if you destructure — toRefs', 'computed is a cached derivation', 'watch is precise; watchEffect runs immediately'] },
        'Lifecycles become onMounted / onUnmounted. Composables replace mixin name clashes.',
      ],
    },
    {
      id: 'pinia',
      title: 'Why Pinia replaced Vuex',
      blocks: [
        'No mutations layer. Actions may be async. Stores are typed modules, composed instead of nested namespaces. Call useStore() after pinia is installed. SSR needs a fresh pinia per request.',
      ],
    },
    {
      id: 'teleport',
      title: 'Teleport, Suspense, builtins',
      blocks: [
        'Teleport to="body" escapes overflow:hidden — same job as Portals. Suspense waits on async setup. KeepAlive caches instances (activated / deactivated). Transition owns class timing; do not fight it in JS hooks.',
      ],
    },
    {
      id: 'v3diff',
      title: 'Vue 2 → 3 traps',
      blocks: [
        { type: 'ul', items: ['filters gone', 'v-model is modelValue / update:modelValue', '$listeners merged into $attrs', 'unmounted', 'app.use / app.component', 'keyCode modifiers removed'] },
        '@vue/compat can mix versions; do not keep the compat layer forever.',
      ],
    },
    {
      id: 'slots',
      title: 'Slots and scoped slots',
      blocks: [
        'Default, named, and scoped (child passes data out). #header="{ user }" is sugar. Table cell templates are the textbook case. Prefer emit over stuffing callbacks into slots.',
      ],
    },
  ],
}
