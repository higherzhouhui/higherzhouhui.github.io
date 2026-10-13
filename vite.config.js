import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { cpSync, createReadStream, existsSync, statSync } from 'node:fs'
import { extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const rootDir = fileURLToPath(new URL('.', import.meta.url))
const diaryDir = resolve(rootDir, 'diary')

function diaryStatic() {
  const mime = {
    '.json': 'application/json; charset=utf-8',
    '.md': 'text/markdown; charset=utf-8',
  }
  return {
    name: 'diary-static',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = req.url?.split('?')[0] ?? ''
        if (!pathname.startsWith('/diary/')) return next()
        const rel = decodeURIComponent(pathname.slice('/diary/'.length))
        if (!rel) return next()
        const file = join(diaryDir, rel)
        if (!file.startsWith(diaryDir) || !existsSync(file) || !statSync(file).isFile()) return next()
        res.setHeader('Content-Type', mime[extname(file)] || 'application/octet-stream')
        createReadStream(file).pipe(res)
      })
    },
    closeBundle() {
      if (!existsSync(diaryDir)) return
      cpSync(diaryDir, resolve(rootDir, 'dist/diary'), { recursive: true })
    },
  }
}

export default defineConfig({
  appType: 'spa',
  plugins: [react(), tailwindcss(), diaryStatic()],
  base: '/',
  server: {
    watch: {
      ignored: ['**/archive/**'],
    },
  },
})
