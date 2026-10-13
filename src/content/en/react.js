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
  ],
}
