import type { VuetiwatchDefaults } from '../types.js'

type Props = Record<string, unknown>

/** Every component that renders a `v-field` and shares its `variant` prop. */
const FIELD_COMPONENTS = [
  'VTextField',
  'VTextarea',
  'VSelect',
  'VAutocomplete',
  'VCombobox',
  'VFileInput',
] as const

/** Selection controls that share the `density` prop. */
const CONTROL_COMPONENTS = [
  'VCheckbox',
  'VRadioGroup',
  'VSwitch',
] as const

/** Containers that share the `flat` / `border` props. */
const BAR_COMPONENTS = [
  'VAppBar',
  'VToolbar',
] as const

const spread = (names: readonly string[], props: Props): VuetiwatchDefaults =>
  Object.fromEntries(names.map(name => [name, props]))

/**
 * Applies the same props to every field-based input, so a theme states its
 * input style once instead of six times.
 */
export const fields = (props: Props): VuetiwatchDefaults =>
  spread(FIELD_COMPONENTS, props)

/** Applies the same props to checkboxes, radio groups and switches. */
export const controls = (props: Props): VuetiwatchDefaults =>
  spread(CONTROL_COMPONENTS, props)

/** Applies the same props to app bars and toolbars. */
export const bars = (props: Props): VuetiwatchDefaults =>
  spread(BAR_COMPONENTS, props)

/** Applies the same `density` to lists and both table components. */
export const tables = (density: 'default' | 'comfortable' | 'compact'): VuetiwatchDefaults => ({
  VList: { density },
  VTable: { density },
  VDataTable: { density },
})
