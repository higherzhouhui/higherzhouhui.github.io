export default {
  kicker: 'MARKUP  ·  STRUCTURE FIRST',
  title: 'HTML5 semantics and new power',
  lead: 'Semantics is not decoration. It lets browsers, crawlers, screen readers, and models share one structural map. The right tag for the right job.',
  sections: [
    {
      id: 'gn',
      title: 'Idea',
      blocks: [
        { type: 'callout', text: 'In the AI era HTML is still the skeleton: messy semantics collapses a11y, SEO, and later automation together.' },
        'HTML5 semantics means building structure with the right tags. Even without CSS, the outline should be readable.',
      ],
    },
    {
      id: 'yyh',
      title: 'Semantic tags',
      blocks: [
        { type: 'ul', items: ['header', 'nav', 'main', 'article', 'section', 'aside', 'footer'] },
        { type: 'h', text: 'Why it matters' },
        {
          type: 'ol',
          items: [
            'The page still shows a skeleton without CSS',
            'Code is easier to read and maintain',
            'Assistive tech can speak by meaning',
            'Search engines weight tags differently (SEO)',
          ],
        },
      ],
    },
    {
      id: 'new',
      title: 'HTML5 features',
      blocks: [
        {
          type: 'ol',
          items: [
            'Semantic tags',
            'Audio / video APIs',
            'canvas / WebGL',
            'Drag and drop',
            'History API',
            'requestAnimationFrame',
            'Geolocation',
            'WebSocket',
            'Web storage: localStorage, sessionStorage',
            'Form controls: date, email, url, search',
          ],
        },
        { type: 'callout', text: 'Frameworks wrap these APIs now, but interviews and debugging still land on native tags.' },
      ],
    },
  ],
}
