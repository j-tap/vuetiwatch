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
  'VNumberInput',
] as const

/**
 * The same list plus the one field that takes `variant` and `density` but
 * none of the icons: the OTP input has no clear button to name.
 *
 * Both exist because a theme states its input style once. A field left out
 * of it does not fall back to something neutral — it keeps Vuetify's filled
 * variant and stands out as the one control the theme forgot.
 */
const FIELD_STYLED = [...FIELD_COMPONENTS, 'VOtpInput'] as const

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

/**
 * Everything that draws a Material ripple.
 *
 * Longer than it looks, because a defaults key is matched by component
 * name and several of these only look like a `VBtn`. The tab, the app-bar
 * nav icon and the fab each declare their own prop set and hand it to a
 * `VBtn` themselves, so a `VBtn` default never reaches them; the checkbox,
 * the radio and the switch all reach one `VSelectionControl` underneath
 * but arrive there under three different names. A theme that turned the
 * ripple off on buttons alone would still get one from the hamburger and
 * from every tick box on the screen.
 */
const RIPPLE_COMPONENTS = [
  'VBtn',
  'VTab',
  'VAppBarNavIcon',
  'VFab',
  'VChip',
  'VCard',
  'VListItem',
  'VExpansionPanelTitle',
  'VStepperItem',
  'VRating',
  'VCheckbox',
  'VCheckboxBtn',
  'VRadio',
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
  spread(FIELD_STYLED, props)

/** Applies the same props to checkboxes, radio groups and switches. */
export const controls = (props: Props): VuetiwatchDefaults =>
  spread(CONTROL_COMPONENTS, props)

/** Applies the same props to app bars and toolbars. */
export const bars = (props: Props): VuetiwatchDefaults =>
  spread(BAR_COMPONENTS, props)

/** Applies the same props to cards, alerts and chips. */
export const surfaces = (props: Props): VuetiwatchDefaults =>
  spread(SURFACE_COMPONENTS, props)

/**
 * Turns the Material ripple off — or back on — everywhere one is drawn.
 *
 * The ripple is an animation about the weight of a surface, so a theme
 * with no weight to describe is better off without it: it delays the
 * moment a control looks like it answered, which on a screen someone
 * works in all day is the one thing motion must never do.
 */
export const ripple = (on: boolean): VuetiwatchDefaults =>
  spread(RIPPLE_COMPONENTS, { ripple: on })

/**
 * How each floating surface arrives.
 *
 * Vuetify names its transitions and resolves them from a string, so this
 * is an ordinary prop like any other — which is what lets a theme own its
 * overlays as well as its colours. `false` means no animation at all: the
 * surface is simply there, which is the honest answer for a theme that
 * draws no depth to move through.
 *
 * `menu` reaches the select, the autocomplete and the combobox as well,
 * but not by one route: autocomplete and combobox let the `VMenu` they
 * render take the global default, while `VSelect` declares a `transition`
 * prop of its own and hands it down, which shadows that default entirely.
 * So the select is named here too, and a theme still states its menus once.
 */
export interface VuetiwatchOverlays {
  /** A modal. Vuetify's own is `dialog-transition`. */
  dialog?: string | false
  /** A dropdown, a select's list, a context menu. */
  menu?: string | false
  /** A tooltip. Vuetify scales it in and fades it out. */
  tooltip?: string | false
  /** A snackbar. */
  snackbar?: string | false
}

export function overlays (set: VuetiwatchOverlays): VuetiwatchDefaults {
  const byComponent = {
    VDialog: set.dialog,
    VMenu: set.menu,
    // Shadows the `VMenu` default above rather than inheriting it.
    VSelect: set.menu,
    VTooltip: set.tooltip,
    VSnackbar: set.snackbar,
  }

  return Object.fromEntries(
    Object.entries(byComponent)
      .filter(([, transition]) => transition !== undefined)
      .map(([name, transition]) => [name, { transition }]),
  )
}

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
