import type { ThemeDefinition } from 'vuetify'
import type { VuetiwatchDefaults, VuetiwatchMeta, VuetiwatchTheme } from './types.js'
import {
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

/**
 * Every theme in the package, in the order a picker should show them:
 * the everyday ones first, then the niche ones.
 */
export const themeList = [
  classic,
  paper,
  slate,
  calm,
  lux,
  soft,
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

const fromList = <T>(pick: (theme: VuetiwatchTheme) => T) =>
  Object.fromEntries(themeList.map(theme => [theme.name, pick(theme)])) as
    Record<VuetiwatchThemeName, T>

/** Ready for `createVuetify({ theme: { themes: vuetiwatchThemes } })`. */
export const vuetiwatchThemes: Record<VuetiwatchThemeName, ThemeDefinition> =
  fromList(theme => theme.theme)

/** Per-theme component defaults, applied for you by `createVuetiwatch()`. */
export const vuetiwatchDefaults: Record<VuetiwatchThemeName, VuetiwatchDefaults> =
  fromList(theme => theme.defaults)

/** Titles, descriptions and preview swatches, for building a theme picker. */
export const vuetiwatchMeta: Record<VuetiwatchThemeName, VuetiwatchMeta> =
  fromList(theme => theme.meta)
