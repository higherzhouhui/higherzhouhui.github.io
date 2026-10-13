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
        'HTML5 semantics means building structure with the right tags. Even without CSS, the outline should be readable. Parsing grows both a DOM and an accessibility tree; screen readers walk the latter.',
      ],
    },
    {
      id: 'yyh',
      title: 'Semantic tags',
      blocks: [
        { type: 'ul', items: ['header → banner (document level)', 'nav → navigation', 'main → one per page', 'article as a unit', 'section becomes a region only when named', 'aside → complementary', 'footer → contentinfo (document level)'] },
        { type: 'callout', text: 'From web.dev: landmarks are scarce on purpose. Too many navs become noise.' },
      ],
    },
    {
      id: 'heading',
      title: 'Heading outline',
      blocks: [
        'h1–h6 is the skeleton. Users of assistive tech often explore a new page by jumping headings. Do not skip levels for visual size — CSS handles size, headings handle structure.',
      ],
    },
    {
      id: 'skip',
      title: 'Skip links and aria-current',
      blocks: [
        'Put a “skip to content” link first in the body. Hide it visually, show it on focus. Mark the current nav item with aria-current="page". Name multiple navs; do not repeat the word “navigation” in the label.',
      ],
    },
    {
      id: 'form',
      title: 'Forms as interaction semantics',
      blocks: [
        'Every control needs a real label. Placeholders are not labels. Pair errors with aria-describedby. Prefer the dialog element over a homemade modal.',
      ],
    },
    {
      id: 'media',
      title: 'Pictures and media',
      blocks: [
        'alt is required: empty for decoration, a sentence for information. Use picture / srcset instead of one 4K file.',
        {
          type: 'code',
          lang: 'html',
          code: `<picture>
  <source type="image/avif" srcset="hero.avif" />
  <img src="hero.jpg" alt="Night console" width="1200" height="630" />
</picture>`,
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
            'Landmarks',
            'Audio / video',
            'canvas / WebGL',
            'Drag and drop',
            'History API',
            'rAF',
            'Geolocation',
            'WebSocket',
            'Web storage',
            'Form types',
            'dialog / template / slot',
            'details / summary',
          ],
        },
      ],
    },
  ],
}
