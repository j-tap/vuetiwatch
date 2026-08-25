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

/** The subset of those that opens a menu, and so draws a dropdown glyph. */
const MENU_COMPONENTS = [
  'VSelect',
  'VAutocomplete',
  'VCombobox',
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

/** Surfaces that share the `variant` prop with cards. */
const SURFACE_COMPONENTS = [
  'VCard',
  'VAlert',
  'VChip',
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

/** Applies the same props to cards, alerts and chips. */
export const surfaces = (props: Props): VuetiwatchDefaults =>
  spread(SURFACE_COMPONENTS, props)

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
  parts.reduce<VuetiwatchDefaults>((acc, part) => mergeDeep(acc, part), {})

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

/** Spreads one semantic icon set across every component that draws it. */
export function icons (set: VuetiwatchIcons): VuetiwatchDefaults {
  const out: Record<string, Props> = {}

  /**
   * Merges rather than assigns, because a component can draw more than one
   * of these glyphs — a select carries both `menuIcon` and `clearIcon`, and
   * assigning would drop whichever came first. Props the theme left unset
   * are skipped so they fall through to Vuetify's own.
   */
  const put = (names: readonly string[], props: Props) => {
    const given = Object.entries(props).filter(([, value]) => value !== undefined)

    if (!given.length) return

    for (const name of names) {
      out[name] = { ...out[name], ...Object.fromEntries(given) }
    }
  }

  const paging = {
    nextIcon: set.next,
    prevIcon: set.prev,
    firstIcon: set.first,
    lastIcon: set.last,
  }

  put(FIELD_COMPONENTS, { clearIcon: set.clear })
  put(MENU_COMPONENTS, { menuIcon: set.dropdown })
  put(['VExpansionPanelTitle', 'VList'], {
    expandIcon: set.dropdown,
    collapseIcon: set.collapse,
  })
  put(['VPagination', 'VDataTable'], paging)
  put(['VDataTable'], { sortAscIcon: set.sortAsc, sortDescIcon: set.sortDesc })
  put(['VSlideGroup'], { nextIcon: set.next, prevIcon: set.prev })
  put(['VCheckbox', 'VCheckboxBtn'], {
    trueIcon: set.checkboxOn,
    falseIcon: set.checkboxOff,
  })
  put(['VRadio'], { trueIcon: set.radioOn, falseIcon: set.radioOff })
  put(['VRating'], { fullIcon: set.ratingFull, emptyIcon: set.ratingEmpty })
  put(['VChip', 'VAlert'], { closeIcon: set.close })
  put(['VBreadcrumbs'], { divider: set.breadcrumbDivider })

  return out
}
