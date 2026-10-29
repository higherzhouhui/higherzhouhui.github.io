import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { cpSync, createReadStream, existsSync, statSync } from 'node:fs'
import { extname, isAbsolute, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const rootDir = fileURLToPath(new URL('.', import.meta.url))
const diaryDir = resolve(rootDir, 'diary')
const learnDir = resolve(rootDir, 'learn')

function staticTree(name, urlPrefix, sourceDir, distName) {
  const mime = {
    '.json': 'application/json; charset=utf-8',
    '.md': 'text/markdown; charset=utf-8',
  }
  return {
    name,
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = req.url?.split('?')[0] ?? ''
        if (!pathname.startsWith(urlPrefix)) return next()
        let rel = ''
        try {
          rel = decodeURIComponent(pathname.slice(urlPrefix.length))
        } catch {
          return next()
        }
        if (!rel || rel.includes('\0')) return next()
        const file = join(sourceDir, rel)
        const fromRoot = relative(sourceDir, file)
        if (!fromRoot || fromRoot.startsWith('..') || isAbsolute(fromRoot)) return next()
        if (!existsSync(file) || !statSync(file).isFile()) return next()
        res.setHeader('Content-Type', mime[extname(file)] || 'application/octet-stream')
        createReadStream(file).pipe(res)
      })
    },
    closeBundle() {
      if (!existsSync(sourceDir)) return
      cpSync(sourceDir, resolve(rootDir, distName), { recursive: true })
    },
  }
}

function diaryStatic() {
  return staticTree('diary-static', '/diary/', diaryDir, 'dist/diary')
}

function learnStatic() {
  return staticTree('learn-static', '/learn/', learnDir, 'dist/learn')
}

export default defineConfig({
  appType: 'spa',
  plugins: [react(), tailwindcss(), diaryStatic(), learnStatic()],
  base: '/',
  server: {
    watch: {
      ignored: ['**/archive/**'],
    },
  },
})
