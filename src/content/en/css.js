export default {
  kicker: 'LAYOUT  ·  PAINT',
  title: 'CSS selectors, boxes, layout',
  lead: 'A stylesheet is a protocol of space. Priority and the box model come before centering, BFC, and mobile fit. Generative UI still gets those two layers wrong.',
  sections: [
    {
      id: 'xy',
      title: 'Selectors and specificity',
      blocks: [
        { type: 'ol', items: ['id', 'class', 'attribute', 'pseudo-class', 'element', 'sibling / child / descendant', 'universal'] },
        { type: 'callout', text: '!important > inline > ID > class/attr/pseudo > element > universal > inherit > UA.' },
      ],
    },
    {
      id: 'jy',
      title: 'Progressive enhancement vs graceful degradation',
      blocks: [
        'Enhancement starts simple, then adds. Degradation ships the full experience, then patches older clients.',
      ],
    },
    {
      id: 'new',
      title: 'CSS3 notes',
      blocks: [{ type: 'ul', items: ['transition / animation', 'transform', ':nth-of-type', 'shadows', 'flex / grid', 'media queries', 'filter'] }],
    },
    {
      id: 'position',
      title: 'position',
      blocks: [
        { type: 'ul', items: ['static', 'relative keeps space', 'absolute vs nearest positioned ancestor', 'fixed vs viewport', 'sticky switches after a threshold'] },
      ],
    },
    {
      id: 'box',
      title: 'Box model',
      blocks: ['In the standard model width is content. In the IE model it includes padding and border. border-box is stabler for components.'],
    },
    {
      id: 'bfc',
      title: 'BFC',
      blocks: [
        'A BFC is an isolated formatting context. Create it with the root, floats, abspos, flex/inline-block, or overflow other than visible.',
      ],
    },
    {
      id: 'czjz',
      title: 'Centering',
      blocks: [{ type: 'ul', items: ['inline: text-align', 'fixed width: margin auto', 'unknown width: transform', 'flex: justify/align or margin auto'] }],
    },
    {
      id: 'hide',
      title: 'Hiding',
      blocks: [{ type: 'ul', items: ['opacity: 0 still clickable', 'visibility: hidden keeps space', 'display: none drops from layout'] }],
    },
    {
      id: 'sjfh',
      title: 'CSS triangles',
      blocks: [{ type: 'code', lang: 'css', code: `div::after {
  content: '';
  width: 0;
  height: 0;
  border: 100px solid transparent;
  border-top-color: #ff0;
}` }],
    },
    {
      id: 'ymbj',
      title: 'Layout systems',
      blocks: ['Flex for one-dimensional flow, rem for proportional scaling, percent relative to the parent — padding even on the Y axis often uses parent width.'],
    },
    {
      id: 'clear',
      title: 'Clearing floats',
      blocks: [{ type: 'ul', items: ['extra clearing node', 'overflow on parent', '::after { clear:both }'] }],
    },
    {
      id: 'sass',
      title: 'Preprocessors',
      blocks: ['Sass uses $, Less uses @, Stylus is looser. Nesting, mixins, and inheritance are shared; Stylus adds loops and branches.'],
    },
    {
      id: 'loading',
      title: 'A CSS loader',
      blocks: [
        {
          type: 'code',
          lang: 'css',
          code: `.loading {
  width: 30px; height: 30px;
  border: 2px solid var(--gold);
  border-top-color: transparent;
  border-radius: 100%;
  animation: spin 0.75s linear infinite;
}`,
        },
      ],
    },
    {
      id: 'flex-deep',
      title: 'Flexbox: the axis that matters',
      blocks: [
        { type: 'callout', text: 'From CSS-Tricks’ Flexbox guide: name the main axis before you split leftover space.' },
        'flex-direction sets the main axis. justify-content is main; align-items is cross; align-self overrides one item. align-content only matters after wrap.',
        { type: 'ul', items: ['grow / shrink / basis', 'min-width: auto blocks shrink — set min-width: 0 on overflowing children', 'gap beats margin hacks'] },
        'Nav bars are flex. Magazines are grid. Nest them; do not fake twelve columns in flex.',
      ],
    },
    {
      id: 'grid',
      title: 'Grid: tracks, areas, minmax',
      blocks: [
        'fr shares leftover space. repeat(auto-fit, minmax(16rem, 1fr)) is the shortest responsive card wall. Named areas make header/nav/main/footer readable. grid-column: 1 / -1 spans the row. subgrid inherits parent tracks.',
      ],
    },
    {
      id: 'cq',
      title: 'Container queries',
      blocks: [
        { type: 'callout', text: 'web.dev: query the component, not only the viewport.' },
        'container-type: inline-size on the parent; @container (min-width: 24rem) on children. A card can change layout when it moves from sidebar to main. cqw / cqi units are relative to the container. Pair with :has().',
      ],
    },
    {
      id: 'content-vis',
      title: 'content-visibility and contain',
      blocks: [
        'Skip off-screen work with content-visibility: auto; set contain-intrinsic-size so the scrollbar stays honest. contain tells the engine changes stay inside. Animate transform/opacity. will-change is a scalpel.',
      ],
    },
    {
      id: 'stacking',
      title: 'Stacking contexts',
      blocks: [
        'z-index only compares inside one context. Positioned z-index, opacity < 1, transform, filter, isolation: isolate all create one. A modal “under” something usually has an isolating ancestor. Walk up; do not sprinkle 99999.',
      ],
    },
    {
      id: 'logical',
      title: 'Logical properties, :has, :focus-visible',
      blocks: [
        'margin-inline-start survives RTL. :focus-visible shows rings for keyboards, not every click. :has(> img) is the parent selector CSS waited for. color-scheme and light-dark() can sit beside html[data-theme].',
      ],
    },
  ],
}
