// Measures the label on every filled control, in every theme, against both
// models a label has to satisfy: WCAG 2's 4.5:1 ratio and the APCA pick
// Vuetify itself makes. Run by `npm run audit`, after `build:types` — it
// reads the compiled registry, so it can only ever report on what the
// package actually ships.
//
// Two things are checked, and they fail for different reasons:
//
//   - a filled control whose label misses 4.5:1, which is the promise the
//     README makes for everything except `classic` and the exceptions below;
//   - an `on-*` a theme states by hand that is worse than the colour Vuetify
//     would have picked on its own — the failure mode that is invisible in
//     review, because the theme looks deliberate either way.
//
// Exit code 1 on anything unexplained. Declared exceptions are printed but
// do not fail: the point is to catch the next regression, not to re-argue a
// decision that was made on purpose and written down.
import { resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { APCAcontrast } from 'vuetify/lib/util/color/APCA.js'
import { parseColor } from 'vuetify/lib/util/colorUtils.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const { themeList } = await import(pathToFileURL(resolve(root, 'dist/registry.js')).href)

/**
 * Contrast a theme is allowed to miss, and why.
 *
 * An entry here is a design decision that outranks the measurement, so it
 * carries its reason in the file rather than in a commit message — a later
 * reader has to be able to tell it from an oversight. Anything not listed is
 * a regression.
 */
const ALLOWED = {
  soft: {
    keys: ['secondary', 'error', 'info', 'success', 'warning'],
    why: 'the soft theme — white labels on a pastel palette, by design. '
      + 'Earning 4.5:1 would mean darkening the hues by about a third, which '
      + 'is the one thing this theme cannot give up. See themes/soft.ts.',
  },
}

const KEYS = ['primary', 'secondary', 'error', 'info', 'success', 'warning']

const lin = c => (c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
const luma = hex => {
  const n = parseInt(hex.slice(1), 16)

  return 0.2126 * lin(n >> 16 & 255) + 0.7152 * lin(n >> 8 & 255) + 0.0722 * lin(n & 255)
}
const wcag = (a, b) => {
  const [hi, lo] = [luma(a), luma(b)].sort((x, y) => y - x)

  return (hi + 0.05) / (lo + 0.05)
}
const apca = (fg, bg) => Math.abs(APCAcontrast(parseColor(fg), parseColor(bg)))

/** What Vuetify writes when a theme states nothing — `hasLightForeground`. */
const auto = bg => apca('#FFFFFF', bg) > Math.min(apca('#000000', bg), 50) ? '#FFFFFF' : '#000000'

const thin = []
const worse = []
const excused = []

for (const theme of themeList) {
  // `classic` is stock Vuetify, including its contrast — that is the point of it.
  if (theme.meta.stock) continue

  const colors = theme.theme.colors ?? {}

  for (const key of KEYS) {
    const bg = colors[key]

    if (!bg) continue

    const stated = colors[`on-${key}`]
    const ink = stated ?? auto(bg)
    const other = luma(ink) > 0.5 ? '#000000' : '#FFFFFF'
    const allowed = ALLOWED[theme.name]?.keys.includes(key)
    const row = {
      where: `${theme.name}.${key}`,
      bg,
      ink,
      wcag: wcag(ink, bg),
      wcagOther: wcag(other, bg),
      apca: apca(ink, bg),
      apcaOther: apca(other, bg),
    }

    if (row.wcag < 4.5) (allowed ? excused : thin).push(row)

    /**
     * Only counted when the theme asked for it: an automatic pick that comes
     * out poorly is a palette problem, and it is already caught above.
     * The two margins keep a tie from reading as a regression — a hue sitting
     * on the crossover measures the same either way, and which side of it a
     * theme lands on is then a choice rather than a mistake.
     */
    if (stated && ink.toUpperCase() !== auto(bg) && !allowed
      && row.apca < row.apcaOther - 10 && row.wcag < row.wcagOther + 0.25) worse.push(row)
  }
}

const show = row =>
  `  ${row.where.padEnd(20)} ${row.bg} ink ${row.ink}  `
  + `WCAG ${row.wcag.toFixed(2)} (other ${row.wcagOther.toFixed(2)})  `
  + `APCA ${row.apca.toFixed(0)} (other ${row.apcaOther.toFixed(0)})`

if (excused.length) {
  console.log('Stated exceptions:')
  for (const [name, { why }] of Object.entries(ALLOWED)) console.log(`  ${name}: ${why}`)
  console.log(excused.map(show).join('\n'), '\n')
}

if (thin.length) {
  console.log('Filled controls under WCAG 4.5:1:')
  console.log(thin.map(show).join('\n'), '\n')
}

if (worse.length) {
  console.log('Stated `on-*` that loses to the automatic pick:')
  console.log(worse.map(show).join('\n'), '\n')
}

if (thin.length || worse.length) {
  console.error(`✖ ${thin.length + worse.length} unexplained; add a reason to ALLOWED or fix the colour`)
  process.exit(1)
}

console.log(`✔ labels measured across ${themeList.length} themes, ${excused.length} stated exceptions`)
