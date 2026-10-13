import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  appType: 'spa',
  plugins: [react()],
  base: '/',
  server: {
    watch: {
      ignored: ['**/archive/**'],
    },
  },
})
