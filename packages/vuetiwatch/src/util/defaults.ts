import type { VuetiwatchDefaults } from '../types.js'
import { mergeDeep } from './merge.js'

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

/**
 * Layers default sets over each other so helpers compose without a later
 * component key wiping an earlier one — `{ VSwitch: { density } }` followed
 * by `{ VSwitch: { inset } }` keeps both.
 */
export const combine = (...parts: VuetiwatchDefaults[]): VuetiwatchDefaults =>
  parts.reduce<VuetiwatchDefaults>(
    (acc, part) => mergeDeep(acc as Record<string, any>, part as Record<string, any>),
    {},
  )

/**
 * Glyphs a theme can swap.
 *
 * Vuetify's icon *set* (`mdi`, `fa`, a custom SVG set) is global
 * configuration and is not reactive, so it cannot vary per theme. Which
 * glyph a component reaches for is an ordinary prop, though, and props go
 * through defaults like everything else — so a theme can pick outlines
 * where it is thin, solids where it is loud, and circles where it is round.
 *
 * Names must exist in whatever set the app installed; a missing one renders
 * as blank. Everything here is left undefined by default, so a theme states
 * only what it changes.
 */
export interface VuetiwatchIcons {
  /** Opens a select menu, an expansion panel or a list group. */
  dropdown?: string
  /** Closes the same. */
  collapse?: string
  next?: string
  prev?: string
  first?: string
  last?: string
  checkboxOn?: string
  checkboxOff?: string
  radioOn?: string
  radioOff?: string
  ratingFull?: string
  ratingEmpty?: string
  /** The clear affordance inside a field. */
  clear?: string
  /** Dismisses a chip or an alert. */
  close?: string
  sortAsc?: string
  sortDesc?: string
  /** Separates breadcrumb items; a plain string, not an icon name. */
  breadcrumbDivider?: string
}

/** Drops the keys a theme left unset, so they fall through to Vuetify's own. */
const compact = (props: Props): Props | null => {
  const out = Object.fromEntries(
    Object.entries(props).filter(([, value]) => value !== undefined),
  )

  return Object.keys(out).length ? out : null
}

/** Spreads one semantic icon set across every component that draws it. */
export function icons (set: VuetiwatchIcons): VuetiwatchDefaults {
  const menu = compact({ menuIcon: set.dropdown })
  const disclosure = compact({ expandIcon: set.dropdown, collapseIcon: set.collapse })
  const paging = compact({
    nextIcon: set.next,
    prevIcon: set.prev,
    firstIcon: set.first,
    lastIcon: set.last,
  })
  const checkbox = compact({ trueIcon: set.checkboxOn, falseIcon: set.checkboxOff })
  const radio = compact({ trueIcon: set.radioOn, falseIcon: set.radioOff })
  const clear = compact({ clearIcon: set.clear })
  const close = compact({ closeIcon: set.close })

  const entries: Array<[string, Props | null]> = [
    ...FIELD_COMPONENTS.map(name => [name, clear] as [string, Props | null]),
    ...['VSelect', 'VAutocomplete', 'VCombobox'].map(
      name => [name, menu] as [string, Props | null],
    ),
    ['VExpansionPanelTitle', disclosure],
    ['VList', disclosure],
    ['VPagination', paging],
    ['VSlideGroup', compact({ nextIcon: set.next, prevIcon: set.prev })],
    ['VCheckbox', checkbox],
    ['VCheckboxBtn', checkbox],
    ['VRadio', radio],
    ['VRating', compact({ fullIcon: set.ratingFull, emptyIcon: set.ratingEmpty })],
    ['VChip', close],
    ['VAlert', close],
    ['VBreadcrumbs', compact({ divider: set.breadcrumbDivider })],
    ['VDataTable', compact({
      nextIcon: set.next,
      prevIcon: set.prev,
      firstIcon: set.first,
      lastIcon: set.last,
      sortAscIcon: set.sortAsc,
      sortDescIcon: set.sortDesc,
    })],
  ]

  return Object.fromEntries(
    entries.filter((entry): entry is [string, Props] => entry[1] !== null),
  )
}
