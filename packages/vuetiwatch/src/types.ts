import type { createVuetify, ThemeDefinition } from 'vuetify'

/** Global component defaults, same shape as `createVuetify({ defaults })`. */
export type VuetiwatchDefaults = NonNullable<
  NonNullable<Parameters<typeof createVuetify>[0]>['defaults']
>

export interface VuetiwatchMeta {
  /** Human readable name, for theme pickers. */
  title: string
  /** One line pitch — what the theme feels like. */
  description: string
  /** `true` when the theme is a dark variant. */
  dark: boolean
  /** Preview swatch: background, surface, primary, secondary. */
  swatch: [string, string, string, string]
  /**
   * Web fonts the theme expects. The package never loads them for you —
   * add them yourself (Google Fonts, Fontsource, self-hosted) for the full
   * look, or skip it and fall back to the system stack.
   */
  fonts: string[]
}

export interface VuetiwatchTheme<Name extends string = string> {
  /** Key used in `createVuetify({ theme: { themes } })`. */
  name: Name
  meta: VuetiwatchMeta
  /** Colors and CSS variables, passed straight to Vuetify. */
  theme: ThemeDefinition
  /** Component defaults applied while this theme is active. */
  defaults: VuetiwatchDefaults
}
