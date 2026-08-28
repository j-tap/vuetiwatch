import type { ThemeDefinition } from 'vuetify'
import type { VuetiwatchDefaults, VuetiwatchMeta, VuetiwatchTheme } from './types.js'
import {
  atlas,
  atlasDark,
  atlasSepia,
  aurora,
  brutalist,
  calm,
  candy,
  classic,
  clay,
  darkGlass,
  graphite,
  liquidGlass,
  lux,
  morph,
  neon,
  paper,
  sketchy,
  slate,
  soft,
} from './themes/index.js'

/**
 * Every theme in the package, in the order a picker should show them:
 * the everyday ones first, then the niche ones.
 */
export const themeList = [
  classic,
  paper,
  slate,
  graphite,
  atlas,
  atlasDark,
  atlasSepia,
  calm,
  lux,
  soft,
  candy,
  clay,
  morph,
  sketchy,
  brutalist,
  liquidGlass,
  darkGlass,
  aurora,
  neon,
] as const satisfies readonly VuetiwatchTheme[]

export type VuetiwatchThemeName = (typeof themeList)[number]['name']

type ByName<T> = Record<VuetiwatchThemeName, T>

const themes = {} as ByName<ThemeDefinition>
const defaults = {} as ByName<VuetiwatchDefaults>
const meta = {} as ByName<VuetiwatchMeta>

for (const theme of themeList) {
  const name = theme.name as VuetiwatchThemeName

  themes[name] = theme.theme
  defaults[name] = theme.defaults
  meta[name] = theme.meta
}

/** Ready for `createVuetify({ theme: { themes: vuetiwatchThemes } })`. */
export const vuetiwatchThemes: ByName<ThemeDefinition> = themes

/** Per-theme component defaults, applied for you by `createVuetiwatch()`. */
export const vuetiwatchDefaults: ByName<VuetiwatchDefaults> = defaults

/** Titles, descriptions and preview swatches, for building a theme picker. */
export const vuetiwatchMeta: ByName<VuetiwatchMeta> = meta
