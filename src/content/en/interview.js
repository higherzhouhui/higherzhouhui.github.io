export default {
  kicker: 'Interview',
  title: 'Interview map: from packets to pixels',
  lead: 'Network, browser, TypeScript on one table. Models can recite; interviews still want the causal chain from a handshake to a 304.',
  sections: [
    {
      id: 'network',
      title: 'HTTP and HTTPS',
      blocks: [
        'HTTP is request/response over TCP. Connect, send, respond, release, render. HTTPS adds TLS: certificate, negotiated cipher, session key, then symmetric traffic.',
      ],
    },
    {
      id: 'get',
      title: 'GET vs POST',
      blocks: [{ type: 'ol', items: ['Back button replays POST', 'GET is cacheable', 'GET leaks in the URL', 'GET reads, POST writes'] }],
    },
    {
      id: 'tcp',
      title: 'TCP and UDP',
      blocks: ['Three-way handshake before data. Four-way teardown because of half-close. UDP is connectionless, lighter, and unreliable.'],
    },
    {
      id: 'ky',
      title: 'CORS',
      blocks: ['Different scheme, host, or port. Browsers enforce it. Fix with CORS headers, proxies, JSONP, or postMessage.'],
    },
    {
      id: 'cookie',
      title: 'Web storage',
      blocks: [{ type: 'ul', items: ['Cookie: tiny, optional expiry, sent to servers', 'localStorage: large, durable', 'sessionStorage: dies with the tab'] }],
    },
    {
      id: 'huancun',
      title: 'Caching',
      blocks: ['Freshness via Expires / Cache-Control. Then revalidate with ETag / Last-Modified. 304 means keep the copy. CDNs still speak these headers.'],
    },
    {
      id: 'xss',
      title: 'XSS / CSRF / DDoS',
      blocks: ['XSS: escape and skip innerHTML. CSRF: token plus proof of intent. DDoS: rate limits and scrubbing.'],
    },
    {
      id: 'url',
      title: 'From URL to pixels',
      blocks: [
        { type: 'ol', items: ['DNS', 'TCP', 'HTTP(S)', 'response', 'DOM + CSSOM + render tree', 'layout and paint', 'JS'] },
      ],
    },
    {
      id: 'bchonghui',
      title: 'Reflow and repaint',
      blocks: ['Geometry → reflow; cosmetics → repaint. Reflow implies repaint. Batch styles, avoid layout thrash, animate transforms.'],
    },
    {
      id: 'ljhs',
      title: 'GC and speed',
      blocks: ['Mark-and-sweep. Leaks: globals, closures, DOM handles, timers. Speed: compress, cache, debounce, lazy-load, touch the DOM less.'],
    },
    {
      id: 'typescript1',
      title: 'TypeScript',
      blocks: ['A typed superset. Generics are type parameters. never is unreachable; void is “returns nothing” but still finishes.'],
    },
    {
      id: 'perf',
      title: 'Vitals',
      blocks: [
        { type: 'ul', items: ['FP / FCP', 'LCP', 'CLS', 'INP'] },
        'Split bundles, modern images, cache headers, critical CSS, SSR/streaming. Generated pages fail LCP and CLS first.',
      ],
    },
    {
      id: 'preflight',
      title: 'What a CORS preflight asks',
      blocks: [
        'Simple requests go out; missing Allow-Origin fails the read. PUT, JSON content-type, custom headers send OPTIONS first. Credited requests cannot use *. Cache preflight with Max-Age. JSONP is not a 2026 answer. Hide CORS behind a Vite proxy in dev.',
      ],
    },
    {
      id: 'http2',
      title: 'HTTP/2 and HTTP/3',
      blocks: [
        'HTTP/2 multiplexes streams on one TCP; head-of-line blocking moves to packet loss. HPACK compresses headers. HTTP/3 is QUIC over UDP. Sprites matter less; cache headers still do.',
      ],
    },
    {
      id: 'inp',
      title: 'INP replaced FID',
      blocks: [
        { type: 'callout', text: 'web.dev: INP watches the worst interactions across the page life, not only the first.' },
        'Split tasks over 50ms, keep input urgent, parse JSON off the hot path, yield with startTransition. Measure with web-vitals and CrUX, not only Lighthouse.',
      ],
    },
    {
      id: 'csp',
      title: 'CSP and Trusted Types',
      blocks: [
        'Whitelist script origins with nonce or strict-dynamic. Ban eval and inline. Report-only first. Trusted Types make innerHTML demand a sanitized object.',
      ],
    },
    {
      id: 'samesite',
      title: 'SameSite cookies',
      blocks: [
        'Lax is the usual default: top-level GETs send the cookie, cross-site POST and iframes do not. None requires Secure. Third-party cookies are leaving — first-party sessions beat implicit identity in embeds.',
      ],
    },
    {
      id: 'sw',
      title: 'Service Worker in interviews',
      blocks: [
        'Install, activate, then fetch. Cache First for static, Network First for APIs, Stale-While-Revalidate for lists that can be briefly stale. skipWaiting has a cost. The web app manifest is a separate file.',
      ],
    },
  ],
}
