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
    {
      id: 'webpack',
      title: 'Webpack skeleton',
      blocks: [
        { type: 'ul', items: ['entry', 'output', 'module.rules', 'resolve', 'plugins', 'devServer'] },
        'Loaders transform files; plugins hook the compiler. New work prefers Vite; interviews still ask the split.',
      ],
    },
    {
      id: 'gha',
      title: 'GitHub Actions',
      blocks: [
        { type: 'callout', text: 'From myBlog: push main, install, build, publish. This site is that chain.' },
        'Switch Pages to GitHub Actions in repo settings. Servers still need keys and Nginx.',
      ],
    },
    {
      id: 'prisma',
      title: 'Prisma',
      blocks: ['One schema, a typed client, replayable migrations. Never point the browser at the database.'],
    },
    {
      id: 'micro',
      title: 'Microfrontends',
      blocks: ['iframe isolates hard. Runtime assemblers and Module Federation have other costs. Dedup, style isolation, teardown are the real work.'],
    },
    {
      id: 'ssl',
      title: 'TLS with acme.sh',
      blocks: ['Install, HTTP or DNS challenge, copy into Nginx, renew on cron.'],
    },
  ],
}
