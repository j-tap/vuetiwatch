import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vuetify from 'vite-plugin-vuetify'

import { seo } from './vite-plugins/seo'

export default defineConfig({
  /**
   * A GitHub Pages project site is served from a subdirectory, so the build
   * needs to know its prefix. Netlify, Vercel and Cloudflare serve from the
   * root, where the default is right — hence the env var rather than a
   * hardcoded path.
   */
  base: process.env.BASE_PATH ?? '/',
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
    // Canonical and Open Graph URLs have to be absolute, which `base` — a
    // path — cannot give. Override it when deploying anywhere else.
    seo(process.env.SITE_URL ?? 'https://j-tap.github.io/vuetiwatch/'),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // The linked package ships ESM only; pre-bundling it would hide rebuilds.
  optimizeDeps: {
    exclude: ['vuetiwatch'],
  },
})
