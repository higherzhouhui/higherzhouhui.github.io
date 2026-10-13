export default {
  kicker: 'MODULES  ·  PIPELINES',
  title: 'Frontend engineering',
  lead: 'Module specs decide how files meet. Vite and GitHub Actions only pushed those specs onto a conveyor.',
  sections: [
    {
      id: 'gn',
      title: 'AMD / CMD / CommonJS',
      blocks: [
        { type: 'callout', text: 'ES modules plus a bundler are the 2026 default. Interviews still want: servers may block, browsers must prefetch.' },
        'CommonJS is sync (Node). AMD preloads asynchronously. CMD prefers nearby deps and lazy run. Disk can wait; the network cannot.',
        'ESM static import enables tree-shaking. Vite turns the graph into browser code. npm run build in CI is the last station.',
      ],
    },
  ],
}
