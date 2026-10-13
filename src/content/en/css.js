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
  ],
}
