// Flattens the authored stylesheets (CSS nesting, @import) into a single
// browser-ready file, plus a minified twin. Run by `npm run build`.
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import browserslist from 'browserslist'
import { browserslistToTargets, bundle } from 'lightningcss'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const entry = resolve(root, 'src/styles/index.css')
const outDir = resolve(root, 'dist')
const targets = browserslistToTargets(browserslist())

const build = minify =>
  bundle({ filename: entry, targets, minify, errorRecovery: false }).code

await mkdir(outDir, { recursive: true })
await Promise.all([
  writeFile(resolve(outDir, 'styles.css'), build(false)),
  writeFile(resolve(outDir, 'styles.min.css'), build(true)),
])

console.log('✔ dist/styles.css, dist/styles.min.css')
