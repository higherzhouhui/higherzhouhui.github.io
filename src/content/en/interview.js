export default {
  kicker: 'PROTOCOL  ·  BROWSER',
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
  ],
}
