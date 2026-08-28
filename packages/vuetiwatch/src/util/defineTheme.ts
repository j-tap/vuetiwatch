import type { ThemeDefinition } from 'vuetify'
import type { VuetiwatchDefaults, VuetiwatchMeta, VuetiwatchTheme } from '../types.js'
import { combine } from './defaults.js'

/**
 * Applied under every theme's own defaults.
 *
 * A control with no `color` falls back to `surface-variant`, which reads as
 * dead grey whatever the palette — and on a date picker Vuetify then writes
 * `on-surface` over that grey rather than `on-surface-variant`, so the
 * selected day comes out near-black on dark grey at about 1.6:1. The
 * controls whose whole job is to show a value are coloured here once, and a
 * theme overrides this the way it overrides anything else.
 */
const baseDefaults: VuetiwatchDefaults = {
  VSlider: { color: 'primary' },
  VRangeSlider: { color: 'primary' },
  VDatePicker: { color: 'primary' },
}

export interface DefineThemeOptions<Name extends string = string> {
  name: Name
  meta: VuetiwatchMeta
  /**
   * Colors and CSS variables. Only what the theme actually changes: Vuetify
   * merges every theme over its own `light` or `dark` before use, picking
   * the one matching `dark`, so anything left out is inherited rather than
   * missing.
   */
  theme: ThemeDefinition
  /**
   * Component defaults, as one object or as layers to fold together —
   * `combine()` is applied for you, so helpers compose without a later
   * component key wiping an earlier one.
   */
  defaults?: VuetiwatchDefaults | VuetiwatchDefaults[]
}

export function defineTheme<const Name extends string> (
  options: DefineThemeOptions<Name>,
): VuetiwatchTheme<Name> {
  const layers = options.defaults
    ? [options.defaults].flat()
    : []

  return {
    name: options.name,
    meta: options.meta,
    theme: options.theme,
    // A theme that declared itself stock gets nothing at all — not even the
    // base layer above. It is the control, and a control with one prop set
    // is not a control.
    defaults: options.meta.stock ? combine(...layers) : combine(baseDefaults, ...layers),
  }
}
