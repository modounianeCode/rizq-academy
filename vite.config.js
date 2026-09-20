import react from '@vitejs/plugin-react'
import { existsSync, copyFileSync } from 'node:fs'
import { defineConfig } from 'vite'

function spaFallback() {
  let outDir
  return {
    name: 'spa-fallback',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
    },
    closeBundle() {
      const index = `${outDir}/index.html`
      if (existsSync(index)) copyFileSync(index, `${outDir}/404.html`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), spaFallback()],
})
