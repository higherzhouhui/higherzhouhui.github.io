export default {
  kicker: 'VIEW  ·  UNIDIRECTIONAL',
  title: 'React: function views and interruptible render',
  lead: 'React owns the view. State flows down, events flow up. Hooks give functions memory; Fiber lets an update yield.',
  sections: [
    {
      id: 'r1',
      title: 'What it is',
      blocks: ['An open-source UI library: everything is a component. Not MVVM — no two-way bind, a one-way data flow.'],
    },
    {
      id: 'hooks',
      title: 'Hooks tradeoffs',
      blocks: [
        { type: 'ul', items: ['Related logic lives in one effect', 'Custom hooks beat stacked HOCs', 'No class this'] },
        { type: 'ul', items: ['Not every lifecycle is covered', 'Split effects by duty', 'Classes remain valid for hard cases'] },
      ],
    },
    {
      id: 'r2',
      title: 'Class vs function',
      blocks: ['A function component is props in, UI out. After Hooks it has state, but each render is still a call. Classes construct instances. Hooks are the recommended path.'],
    },
    {
      id: 'r3',
      title: 'Core hooks',
      blocks: [
        { type: 'ul', items: ['useState', 'useEffect', 'useLayoutEffect', 'useMemo', 'useCallback', 'useRef', 'useContext / useReducer'] },
        { type: 'callout', text: 'useLayoutEffect blocks paint — prefer useEffect.' },
      ],
    },
    {
      id: 'r4',
      title: 'Communication',
      blocks: [{ type: 'ol', items: ['Parent → child: props', 'Child → parent: callbacks', 'Deep: Context', 'Siblings: lift state, pub/sub, Redux'] }],
    },
    {
      id: 'redux',
      title: 'Redux',
      blocks: ['Actions describe events, dispatch reaches the store, reducers compute the next state. Use it for shared, debuggable state.'],
    },
    {
      id: 'r5',
      title: 'setState timing',
      blocks: ['Batched (async-looking) inside React events; often sync inside setTimeout or native listeners. Batching is the real rule.'],
    },
    {
      id: 'r6',
      title: 'Lifecycle',
      blocks: [
        { type: 'ul', items: ['Mount: constructor → gDSFP → render → didMount', 'Update: gDSFP → shouldUpdate → render → snapshot → didUpdate', 'Unmount: willUnmount'] },
      ],
    },
    {
      id: 'r7',
      title: 'Fiber',
      blocks: ['Long sync work drops frames. Fiber turns recursive diff into a linked list that can yield: input can interrupt a large reconcilation. Commit stays atomic.'],
    },
    {
      id: 'r8',
      title: 'Portals and lazy',
      blocks: ['Portals mount outside the parent DOM (modals). Large routes use React.lazy + Suspense. Events still delegate — stop bubbling on the synthetic event.'],
    },
    {
      id: 'concurrent',
      title: 'Concurrent render and startTransition',
      blocks: [
        { type: 'callout', text: 'React 18 splits urgent updates from interruptible ones. Typing is urgent; filtering a huge list can sit in startTransition.' },
        'useTransition returns [isPending, startTransition]. useDeferredValue lags a value by a frame. Suspense may show fallback more than once.',
        'The scheduler used to slice work with MessageChannel. You still owe INP: long tasks must be split.',
      ],
    },
    {
      id: 'keys',
      title: 'key is identity',
      blocks: [
        'key tells the reconciler “this is the same item”. Index keys mis-attach state when the list inserts or sorts. Changing a key remounts: state, effects, and focus reset. That is a feature for forms.',
      ],
    },
    {
      id: 'batch18',
      title: 'Batching in React 18',
      blocks: [
        'Before 18, timeouts and native listeners often flushed once per setState. 18 batches by default. Need a frame in between? flushSync. Functional updates still compose in order.',
      ],
    },
    {
      id: 'memo',
      title: 'When memo pays',
      blocks: [
        'React.memo shallow-compares props. useMemo caches work; useCallback keeps a function identity so memo children do not churn. Profile first. A fresh Context object busts every consumer — split or memo the value.',
      ],
    },
    {
      id: 'error-b',
      title: 'Error boundaries and Strict Mode',
      blocks: [
        'Boundaries are class-only and miss event handlers and async. Strict Mode double-invokes effects in dev so subscriptions are repeatable. Do not disable it — fix the cleanup.',
      ],
    },
    {
      id: 'rsc',
      title: 'RSC vs this static host',
      blocks: [
        'App Router defaults to Server Components. Push "use client" to the leaves. GitHub Pages cannot run that runtime; this site stays a CSR SPA. Stream HTML on a Node host when you need it.',
      ],
    },
  ],
}
