export default {
  kicker: 'Notes',
  title: 'For the self who comes back',
  lead: 'Migrated from the old blog and rewritten. Frameworks expire. Handshakes, vitals, and deploys do not. No syllabus voice.',
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
    {
      id: 'loop-note',
      title: 'Explain the event loop to next-year you',
      blocks: [
        { type: 'callout', text: 'javascript.info draws one picture: run a macro, drain micros, then render. That sketch survives interviews better than Node’s ten phases.' },
        'setTimeout(0) is not now. The line after await is a microtask. Nested micros starve paint. queueMicrotask is clearer than an empty Promise.',
      ],
    },
    {
      id: 'flex-note',
      title: 'When flex overflows, set min-width: 0',
      blocks: [
        'The expensive line in the CSS-Tricks guide is not justify-content — it is the default min-width: auto. Text and code blocks refuse to shrink. Set min-width: 0, then ellipsis.',
        'One axis: flex. Two axes: grid. Growing components: @container. Three tools beat 800 lines of media queries.',
      ],
    },
    {
      id: 'inp-note',
      title: 'INP: from tap to the next frame',
      blocks: [
        'FID watched the first input. INP watches the worst interactions on the page. Split 50ms tasks. Do not let filtering ten thousand rows share priority with the caret — that is startTransition.',
        'Green lab, red field: trust RUM. web-vitals reports in a few lines.',
      ],
    },
    {
      id: 'cq-note',
      title: 'Container queries let components grow up',
      blocks: [
        'A card stacked in the sidebar and split in the main column should not ask window.innerWidth. container-type: inline-size, then @container. Design systems that are actually componentized need this layer.',
      ],
    },
    {
      id: 'abort-note',
      title: 'Every search must be able to recant',
      blocks: [
        'AbortController is the brake on fetch. Abort in the React effect cleanup so Strict Mode’s double invoke cannot write a stale result. Time out with AbortSignal.timeout or your own timer.',
      ],
    },
    {
      id: 'csp-note',
      title: 'CSP is a second gate beyond escaping',
      blocks: [
        'Escaping stops characters becoming code. CSP stops code from loading even if it appears. nonce + strict-dynamic is a maintainable script-src. Report-only first, or analytics dies on day one.',
      ],
    },
    {
      id: 'comp-note',
      title: 'Composables are Vue’s custom hooks',
      blocks: [
        'useXxx returns state and methods; tests need no mount. A Pinia store is a composable with devtools. Do not scatter fetches across options fields — one module.',
      ],
    },
    {
      id: 'a11y-note',
      title: 'Accessibility is not extra credit',
      blocks: [
        'web.dev’s semantic HTML piece is blunt: landmarks, heading levels, labels, skip links are how screen-reader users navigate. Lighthouse catches half the cheap mistakes. Tab through the main flow once.',
      ],
    },
  ],
}
