export default {
  kicker: 'FIELD NOTES  ·  FROM MYBLOG',
  title: 'Field notes: from WebSocket to a remote life',
  lead: 'Twenty dispatches migrated from myBlog. Frameworks expire; handshakes, vitals, and pipelines do not. One console, still growing.',
  sections: [
    {
      id: 'ws',
      title: 'WebSocket in ten minutes',
      blocks: [
        { type: 'callout', text: 'HTTP is question and answer. WebSocket is full-duplex on one TCP socket so the server can speak first.' },
        'The handshake is a special HTTP Upgrade. After 101 Switching Protocols, frames stay tiny and you skip reconnect tax.',
        { type: 'ul', items: ['Bidirectional push', 'Lower latency via a long-lived socket', 'Smaller headers', 'Cross-origin at the protocol layer'] },
        {
          type: 'code',
          lang: 'js',
          code: `const ws = new WebSocket('wss://example.com/live')
ws.onopen = () => ws.send(JSON.stringify({ type: 'hello' }))
ws.onmessage = (event) => console.log(JSON.parse(event.data))`,
        },
      ],
    },
    {
      id: 'fw2024',
      title: 'Web frameworks that still earn attention',
      blocks: [
        'HTMX returns power to HTML. Wasp wants a full stack out of the box. Astro ships little JS by default. Next and Nuxt remain the highways for content and consoles.',
        { type: 'callout', text: 'Pick by constraint: SEO/streaming → SSR/RSC; islands → Astro; little JS → HTMX.' },
      ],
    },
    {
      id: 'vueeco',
      title: 'A sane Vue toolchain',
      blocks: [
        { type: 'ul', items: ['pnpm for installs', 'Vite for build', 'TypeScript', 'Pinia', 'Vant / Element Plus', 'UnoCSS or tokens'] },
        'Templates such as vue3-vant-mobile earn their keep by welding file routes, auto-import, PWA, and vw layout before you write business code.',
      ],
    },
    {
      id: 'prisma',
      title: 'Prisma for frontend-full-stack',
      blocks: [
        'One schema, a typed client, migrations you can replay. Never point the browser at the database.',
        {
          type: 'code',
          lang: 'bash',
          code: `npx prisma init
npx prisma migrate dev --name init
npx prisma generate`,
        },
      ],
    },
    {
      id: 'map',
      title: 'Draw a knowledge graph',
      blocks: [
        'The field is too large to memorize as a list. Keep a graph: ES/DOM/network, React/Vue, bundlers, CSS, Node, DevOps. This site is a compressed map. Models fill leaves; you keep the roots.',
      ],
    },
    {
      id: 'micro',
      title: 'Microfrontends without the folklore',
      blocks: [
        { type: 'ul', items: ['iframe isolates hard and talks poorly', 'single-spa / qiankun assemble at runtime', 'Module Federation shares deps', 'Web Components as a boundary'] },
        'The real work is deduping deps, style isolation, teardown, and one pipeline for auth and analytics.',
      ],
    },
    {
      id: 'json',
      title: 'JSON.stringify beyond debugging',
      blocks: [
        'The second argument is a whitelist or replacer; the third is indent. toJSON is honored. Cycles throw — break them yourself.',
        {
          type: 'code',
          lang: 'js',
          code: `JSON.stringify(user, ['id', 'name'], 2)
JSON.stringify(payload, (key, value) => (key === 'password' ? undefined : value), 2)`,
        },
      ],
    },
    {
      id: 'arr28',
      title: 'Array methods you should be able to recite',
      blocks: [
        { type: 'ul', items: ['map flatMap fill', 'filter find some every', 'reduce', 'push pop splice slice', 'includes indexOf', 'sort reverse', 'flat join Array.from'] },
        'map returns; forEach just works. sort compares as strings unless you pass a comparator.',
      ],
    },
    {
      id: 'perf',
      title: 'Performance: FP to LCP',
      blocks: [
        { type: 'ol', items: ['Split and compress', 'Modern images, lazy-load', 'Cache headers, CDN, SW', 'Critical CSS', 'SSR / streaming for LCP', 'Debounce long tasks'] },
        { type: 'callout', text: 'Core Web Vitals are still the shared language of search and conversion in 2026.' },
      ],
    },
    {
      id: 'gha',
      title: 'Deploy on git push',
      blocks: [
        'From dropping folders on Apache, through Jenkins, to GitHub Actions: push main, npm ci, build, publish. This site is that chain. Switch Pages to GitHub Actions once in repo settings.',
      ],
    },
    {
      id: 'webpack',
      title: 'Webpack skeleton',
      blocks: [
        { type: 'ul', items: ['entry', 'output', 'module.rules', 'resolve', 'plugins', 'devServer'] },
        'Loaders transform files; plugins hook the compiler. New work prefers Vite; interviews still ask this split.',
      ],
    },
    {
      id: 'tg',
      title: 'Telegram Mini Apps',
      blocks: [
        'Shorter wallet paths than browser Dapps, sitting on a billion monthly users. Validate initData on the server. Never trust identity from the client.',
      ],
    },
    {
      id: 'loading',
      title: 'The smallest CSS loader',
      blocks: [
        {
          type: 'code',
          lang: 'css',
          code: `.loading {
  width: 30px;
  height: 30px;
  border: 2px solid var(--gold);
  border-top-color: transparent;
  border-radius: 100%;
  animation: circle 0.75s linear infinite;
}`,
        },
      ],
    },
    {
      id: 'ssl',
      title: 'Free TLS with acme.sh',
      blocks: [
        { type: 'ol', items: ['Install acme.sh', 'HTTP or DNS challenge', 'Copy certs into nginx', 'Renew on cron'] },
      ],
    },
    {
      id: 'leave',
      title: 'Exit stories HR can hear',
      blocks: [
        'Do not lead with low pay, a foolish boss, or a layoff. Frame a larger radius, a fuller stack, a healthier pace. Facts can be true; the sentence must fit their risk model.',
      ],
    },
    {
      id: 'age30',
      title: 'Paths after 30',
      blocks: [
        'Without a better network, keeping a sharp craft is still the highest-probability move. Product is not easier. Management needs a seat. Depth that can be verified beats vague breadth.',
      ],
    },
    {
      id: 'workmean',
      title: 'What work is for',
      blocks: [
        'Bread first, meaning second. Graeber’s “bullshit jobs” are labor detached from real need. Remote, office, side gigs, own products are containers. Ask whether the work removes real friction.',
      ],
    },
  ],
}
