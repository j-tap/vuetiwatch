// Flattens the authored stylesheets (CSS nesting, @import) into browser-ready
// files. Run by `npm run build`, after `build:types` — it reads the compiled
// registry so the theme list baked into the stylesheet can never drift from
// the one the package exports.
//
// Two shapes are published: one combined file, and the core layer plus each
// theme separately, so an app that ships three themes need not carry fourteen.
import { mkdir, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import browserslist from 'browserslist'
import { browserslistToTargets, bundle, transform } from 'lightningcss'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = resolve(root, 'dist')
const targets = browserslistToTargets(browserslist())

// `src/registry.ts` only ever imports types from Vuetify, so the compiled
// module loads in plain Node with no peer dependency present.
const { themeList } = await import(pathToFileURL(resolve(outDir, 'registry.js')).href)

// A theme with `meta.stock` renders as stock Vuetify, so the core layer has
// to miss it by class and by attribute both — see the head of core.css.
const themed = themeList.filter(theme => !theme.meta.stock)
const stock = themeList.filter(theme => theme.meta.stock)
const themeClasses = themed.map(theme => theme.name).join(', .v-theme--')
const stockAttrs = stock.map(theme => `[data-vuetiwatch="${theme.name}"]`).join(', ')

const expand = code => code
  .toString()
  // With no stock theme the guard is dropped rather than left empty, which
  // would be a parse error.
  .replaceAll(':not(VUETIWATCH_STOCK)', stockAttrs ? `:not(${stockAttrs})` : '')
  .replaceAll('VUETIWATCH_THEMES', themeClasses)

/** Resolve and parse one import graph; minify from that result, not a second pass. */
const build = filename => {
  const code = bundle({ filename, targets, errorRecovery: false }).code

  return {
    readable: expand(code),
    minified: expand(transform({ filename, code, targets, minify: true }).code),
  }
}

const write = async (name, { readable, minified }) => {
  await writeFile(resolve(outDir, `${name}.css`), readable)
  await writeFile(resolve(outDir, `${name}.min.css`), minified)
}

await mkdir(resolve(outDir, 'styles'), { recursive: true })

// The whole set, for apps that want a picker over everything.
await write('styles', build(resolve(root, 'src/styles/index.css')))

// The pieces. `core` is required; each theme layer is optional and only
// exists for themes that need more than their `ThemeDefinition` can express.
const parts = [
  ['styles/core', resolve(root, 'src/styles/core.css')],
  ...themeList
    .map(theme => [`styles/${theme.name}`, resolve(root, `src/styles/themes/${theme.name}.css`)])
    .filter(([, file]) => existsSync(file)),
]

await Promise.all(parts.map(([name, file]) => write(name, build(file))))

console.log(`✔ dist/styles.css and ${parts.length} pieces (${themeList.length} themes)`)
