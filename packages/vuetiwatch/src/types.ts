import type { createVuetify, ThemeDefinition } from 'vuetify'

/** Global component defaults, same shape as `createVuetify({ defaults })`. */
export type VuetiwatchDefaults = NonNullable<
  NonNullable<Parameters<typeof createVuetify>[0]>['defaults']
>

/**
 * A named set of colours a theme offers as an alternative to its own.
 *
 * Presets rather than a colour picker on purpose: an accent has to clear
 * contrast against the theme's ground, and a slider hands that problem to
 * whoever drags it. Each entry here is measured.
 */
export interface VuetiwatchAccent {
  /** Shared across a family, so the choice survives a light/dark switch. */
  id: string
  title: string
  /** Written over the theme's own colours — `primary` and its companions. */
  colors: Record<string, string>
}

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
   * How the theme would like *content* icons drawn — the ones an app passes
   * itself, like a mailbox or a dashboard.
   *
   * Vuetify only lets a theme choose the glyphs of controls it renders
   * (a checkbox tick, a sort arrow); anything an app passes as a literal
   * name is its own content, and a theme has no business overriding it.
   * So the theme states a preference here and an app may follow it — see
   * the playground's navigation demo.
   */
  iconStyle: 'outline' | 'filled'
  /**
   * Themes that are one design on different grounds — `atlas`, `atlasDark`
   * and `atlasSepia` all carry `family: 'atlas'`.
   *
   * It exists so an app can offer the choice: `useVuetiwatch().siblings`
   * returns the variants of whatever is running, which is everything a
   * light/dark switch needs. Vuetify's own `ThemeDefinition` is one mode by
   * definition, so a pair of registered themes is how the switch is built.
   */
  family?: string
  /** This variant's name within its family — 'Light', 'Dark', 'Sepia'. */
  variant?: string
  /**
   * Alternative accents, applied through `useVuetiwatch().setAccent()`.
   * The first is the theme's own, so a picker can show it selected.
   */
  accents?: VuetiwatchAccent[]
  /**
   * Opts the theme out of the Vuetiwatch core stylesheet, so it renders as
   * stock Vuetify and nothing in this package reaches it.
   *
   * Only `classic` sets it. The set needs one theme that is the control —
   * a reference point you can switch to and see exactly what the others
   * added — and that only means something if it is untouched.
   */
  stock?: boolean
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
