// Flattens the authored stylesheets (CSS nesting, @import) into a single
// browser-ready file, plus a minified twin. Run by `npm run build`, after
// `build:types` — it reads the compiled registry so the theme list baked
// into the stylesheet can never drift from the one the package exports.
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import browserslist from 'browserslist'
import { browserslistToTargets, bundle, transform } from 'lightningcss'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const entry = resolve(root, 'src/styles/index.css')
const outDir = resolve(root, 'dist')
const targets = browserslistToTargets(browserslist())

// `src/registry.ts` only ever imports types from Vuetify, so the compiled
// module loads in plain Node with no peer dependency present.
const { themeList } = await import(pathToFileURL(resolve(outDir, 'registry.js')).href)
const themeClasses = themeList.map(theme => theme.name).join(', .v-theme--')

// Resolve and parse the import graph once; the minified twin is a
// transform of that result rather than a second full bundle.
const bundled = bundle({ filename: entry, targets, errorRecovery: false }).code
const expand = code => code.toString().replaceAll('VUETIWATCH_THEMES', themeClasses)

const readable = expand(bundled)
const minified = expand(
  transform({ filename: 'styles.css', code: bundled, targets, minify: true }).code,
)

await mkdir(outDir, { recursive: true })
await Promise.all([
  writeFile(resolve(outDir, 'styles.css'), readable),
  writeFile(resolve(outDir, 'styles.min.css'), minified),
])

console.log(`✔ dist/styles.css, dist/styles.min.css (${themeList.length} themes)`)
