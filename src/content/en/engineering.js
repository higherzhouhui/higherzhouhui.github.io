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
    {
      id: 'treeshake',
      title: 'What tree-shaking needs',
      blocks: [
        'Bundlers drop exports they can prove unused. Side effects, dynamic paths, and CJS block that. sideEffects: false is a promise — lie and you shake out CSS. Prefer named ESM, lodash-es, and route-level splits for heavy widgets.',
      ],
    },
    {
      id: 'sourcemap',
      title: 'Source maps in production',
      blocks: [
        'Always on in dev. Public .map files leak sources. Prefer hidden-source-map uploaded to Sentry. cheap-module maps skip columns. Without a map, minified stacks are noise.',
      ],
    },
    {
      id: 'pnpm',
      title: 'Why pnpm saves disk',
      blocks: [
        'Content-addressable store plus hard links. Phantom deps fail — that is the point. Workspaces in pnpm-workspace.yaml. Commit the lockfile; CI uses --frozen-lockfile.',
      ],
    },
    {
      id: 'split',
      title: 'Code splitting',
      blocks: [
        'manualChunks for stable vendor. Lazy routes so the first paint does not pay for hidden pages. import() paths must be static. HTTP/2 makes “too many tiny files” a pessimization — split by change rate.',
      ],
    },
    {
      id: 'vite-vs',
      title: 'Vite vs webpack',
      blocks: [
        'Dev: native ESM, compile on demand. Prod: Rollup. webpack still wins federation, odd loaders, and history. This site is Vite 7 on GitHub Actions — static files only.',
      ],
    },
    {
      id: 'monorepo',
      title: 'Monorepo hygiene',
      blocks: [
        'Cut packages by publish unit. workspace: protocol internally. CI filters by affected graph. Pick independent or unified versions and write it down. Apps may be loose; libraries must emit d.ts.',
      ],
    },
  ],
}
