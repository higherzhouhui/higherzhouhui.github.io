import { execSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const destDir = join(root, 'src', 'legacy')
mkdirSync(destDir, { recursive: true })

function extract(html) {
  const styles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)]
    .map((match) => match[1])
    .join('\n')
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)
  let body = bodyMatch ? bodyMatch[1] : html
  body = body.replace(/<script[\s\S]*?<\/script>/gi, '')
  body = body.replace(/<link[^>]*>/gi, '')
  const styleTag = styles.trim() ? `<style>\n${styles.trim()}\n</style>\n` : ''
  return `${styleTag}${body.trim()}\n`
}

function writeLegacy(name, html) {
  const dest = join(destDir, name)
  writeFileSync(dest, extract(html), 'utf8')
  console.log('wrote', dest)
}

const pages = [
  ['ihtml.html', 'pages/ihtml.html'],
  ['ijs.html', 'pages/ijs.html'],
  ['icss.html', 'pages/icss.html'],
  ['ireact.html', 'pages/ireact.html'],
  ['ivue.html', 'pages/ivue.html'],
  ['api.html', 'pages/api.html'],
  ['searchWork.html', 'pages/searchWork.html'],
  ['workhelp.html', 'pages/workhelp.html'],
  ['engineering.html', 'pages/engineering.html'],
  ['cssanimation.html', 'pages/cssanimation.html'],
  ['waterCss.html', 'pages/cssanimation/waterCss.html'],
]

for (const [name, rel] of pages) {
  writeLegacy(name, readFileSync(join(root, rel), 'utf8'))
}

const homeHtml = execSync('git show HEAD:index.html', {
  cwd: root,
  encoding: 'utf8',
  maxBuffer: 10 * 1024 * 1024,
})
writeLegacy('home.html', homeHtml)
