import { copyFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')
copyFileSync(join(dist, 'index.html'), join(dist, '404.html'))
console.log('copied dist/index.html -> dist/404.html')
