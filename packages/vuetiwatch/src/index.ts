export {
  aurora,
  brutalist,
  calm,
  classic,
  clay,
  darkGlass,
  liquidGlass,
  lux,
  morph,
  neon,
  paper,
  sketchy,
  slate,
  soft,
} from './themes/index.js'
export {
  themeList,
  vuetiwatchDefaults,
  vuetiwatchMeta,
  vuetiwatchThemes,
} from './registry.js'
export { createVuetiwatch } from './plugin.js'
export { defineTheme } from './util/defineTheme.js'
export { bars, combine, controls, fields, icons, tables } from './util/defaults.js'

export type { VuetiwatchOptions } from './plugin.js'
export type { VuetiwatchThemeName } from './registry.js'
export type { DefineThemeOptions } from './util/defineTheme.js'
export type { VuetiwatchIcons } from './util/defaults.js'
export type {
  VuetiwatchDefaults,
  VuetiwatchMeta,
  VuetiwatchTheme,
} from './types.js'
