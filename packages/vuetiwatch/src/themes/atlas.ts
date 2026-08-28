import type { VuetiwatchAccent, VuetiwatchDefaults } from '../types.js'
import { bars, controls, fields, icons, tables } from '../util/defaults.js'
import { defineTheme } from '../util/defineTheme.js'

/**
 * The admin theme, and the first one here that comes as a family: `atlas`,
 * `atlasDark` and `atlasSepia` share every measurement and differ only in
 * ground, so an app can offer all three and change nothing but the name.
 *
 * It is built for the screen a person keeps open all day. Where `slate`
 * packs a dashboard tight and `graphite` states a product's opinion, this
 * one gets out of the way: comfortable density rather than compact, one
 * low-chroma accent, hairlines instead of shadows, and no capitals, glow or
 * texture anywhere. Nothing on the screen competes with the data on it.
 *
 * Exported alongside the theme are the parts the other two variants reuse —
 * they are the family, not three lookalikes maintained in parallel.
 */

/**
 * The accents the family offers, one row per preset and one column per
 * ground. A light ground needs a deep accent to carry a white label; a dark
 * one needs a light accent and a dark label — the Material 3 pairing — so
 * the same preset is a different hex in each variant, and the id is what
 * ties them together when someone switches.
 *
 * Every value here is measured: filled controls clear 4.5:1 in all three.
 */
const ACCENTS = [
  { id: 'ocean', title: 'Ocean', light: ['#1F6689', '#18516D'], dark: ['#79B4D6', '#5E97B8'], sepia: ['#2F6580', '#255066'] },
  { id: 'indigo', title: 'Indigo', light: ['#3F4E8C', '#323E70'], dark: ['#93A4E8', '#7688D1'], sepia: ['#46508A', '#37406E'] },
  { id: 'eucalyptus', title: 'Eucalyptus', light: ['#2F6B5B', '#245448'], dark: ['#6FB39B', '#57957F'], sepia: ['#3F6B57', '#325544'] },
  { id: 'plum', title: 'Plum', light: ['#6B3F63', '#55324F'], dark: ['#C596BC', '#A87A9F'], sepia: ['#6B4560', '#56374D'] },
  { id: 'clay', title: 'Clay', light: ['#8A5B2B', '#6E4822'], dark: ['#D9A272', '#BC855A'], sepia: ['#8A5B34', '#6E4829'] },
] as const

/** The accent list for one ground, in the shape `meta.accents` expects. */
export const atlasAccents = (tone: 'light' | 'dark' | 'sepia'): VuetiwatchAccent[] =>
  ACCENTS.map(accent => {
    const [primary, darken] = accent[tone]

    return {
      id: accent.id,
      title: accent.title,
      colors: {
        primary,
        'primary-darken-1': darken,
        // On a dark ground the accent is the light thing on screen, so its
        // label is the ground itself rather than white.
        ...(tone === 'dark' ? { 'on-primary': '#15191B' } : {}),
      },
    }
  })

/** Geometry, type and motion. Identical across the family. */
export const atlasVariables = {
  'high-emphasis-opacity': 0.88,
  'medium-emphasis-opacity': 0.6,
  'hover-opacity': 0.04,
  'font-body': "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
  // Six, not eight: a corner any softer starts reading as a marketing page
  // rather than as a tool. Panels get a little more, controls a little less.
  'vw-radius': '6px',
  'vw-radius-lg': '10px',
  'vw-radius-chip': '4px',
  'vw-radius-thumb': '50%',
  'vw-border-width': '1px',
  // A field's outline is how you find the field: 0.5 puts it just past 3:1
  // on all three grounds, where Vuetify's 0.38 leaves it at about 2.3.
  'vw-field-border-opacity': '0.5',
  'vw-btn-transform': 'none',
  'vw-btn-tracking': '0',
  'vw-btn-weight': '500',
  'vw-heading-weight': '600',
  'vw-heading-tracking': '-0.01em',
  // Column headers are labels, not announcements: weight and a little
  // tracking, no capitals. Three themes here already shout in their tables.
  'vw-th-weight': '500',
  'vw-th-tracking': '0.03em',
  // An admin screen is mostly figures, and figures only line up in a column
  // when every digit is the same width.
  'vw-numeric': 'tabular-nums',
  'vw-tab-slider-height': '2px',
  'vw-list-bar': '2px',
  'vw-list-bar-color': 'rgb(var(--v-theme-primary))',
  // Quiet, quick, and no overshoot — the motion of something you look at
  // for eight hours rather than something you show off.
  'vw-motion-duration': '160ms',
  'vw-motion-ease': 'cubic-bezier(0.2, 0, 0.2, 1)',
  'vw-press-scale': '0.99',
  'vw-hover-lift': '1px',
  'vw-pop-scale': '1.08',
  'vw-pop-duration': '180ms',
  'vw-theme-transition': '320ms',
} as const

/** Component defaults. Identical across the family. */
export const atlasDefaults: VuetiwatchDefaults[] = [
  {
    VBtn: { variant: 'flat' },
    VCard: { variant: 'outlined' },
    VAlert: { variant: 'tonal', density: 'compact' },
    VChip: { variant: 'tonal', size: 'small' },
    VNavigationDrawer: { border: 'e' },
    // A row that lights under the cursor is the cheapest way to keep a
    // place in a table of a hundred lines.
    VDataTable: { hover: true },
    /**
     * The picker's 70px header repeats the date it is already showing —
     * it exists for the full-screen dialog on a phone. In a form beside a
     * labelled field it is a third of the control's height saying nothing.
     */
    VDatePicker: { hideHeader: true },
    VTimePicker: { hideHeader: true },
    // The one field the `fields()` helper does not reach: it takes density
    // like the rest, and at the default it draws 48px boxes.
    VOtpInput: { density: 'compact' },
    /**
     * A segmented control is one object, not a row of raised buttons: a
     * hairline box with the chosen segment filled. Vuetify's default leaves
     * each button floating on its own elevation.
     */
    VBtnToggle: { variant: 'outlined', divided: true, density: 'compact' },
  },
  // Compact throughout: an admin screen is a working surface, and a field
  // at Vuetify's default height is a third taller than the row it sits in.
  fields({ variant: 'outlined', density: 'compact' }),
  controls({ density: 'compact' }),
  tables('compact'),
  bars({ flat: true, border: 'b', height: 56 }),
  {
    // Not inset: the pill is 52×32 where the plain switch is 36×14, and on
    // a row of settings that difference is the whole line height.
    VSwitch: { inset: false },
    VSlider: { thumbSize: 14, trackSize: 3 },
  },
  icons({
    dropdown: 'mdi-chevron-down',
    collapse: 'mdi-chevron-up',
    checkboxOn: 'mdi-checkbox-marked-outline',
    checkboxOff: 'mdi-checkbox-blank-outline',
    sortAsc: 'mdi-arrow-up',
    sortDesc: 'mdi-arrow-down',
    next: 'mdi-chevron-right',
    prev: 'mdi-chevron-left',
    first: 'mdi-page-first',
    last: 'mdi-page-last',
    clear: 'mdi-close',
    close: 'mdi-close',
  }),
]

export const atlas = defineTheme({
  name: 'atlas',
  meta: {
    title: 'Atlas',
    description: 'Calm admin light — soft neutrals, one cool accent, hairlines instead of shadows.',
    dark: false,
    iconStyle: 'outline',
    family: 'atlas',
    variant: 'Light',
    accents: atlasAccents('light'),
    swatch: ['#F1F3F0', '#FFFFFF', '#1F6689', '#4C5C68'],
    fonts: ['Inter'],
  },
  theme: {
    dark: false,
    colors: {
      background: '#F1F3F0',
      surface: '#FFFFFF',
      'surface-bright': '#FFFFFF',
      'surface-light': '#EDEFEC',
      'surface-variant': '#2E3A34',
      'on-surface-variant': '#F1F3F0',
      primary: '#1F6689',
      'primary-darken-1': '#18516D',
      secondary: '#4C5C68',
      'secondary-darken-1': '#3B4752',
      error: '#B3261E',
      info: '#2A6F97',
      success: '#2E6B4F',
      warning: '#8A6A16',
      'on-surface': '#1D2422',
      'on-background': '#1D2422',
    },
    variables: {
      'border-color': '#1D2422',
      'border-opacity': 0.12,
      'shadow-color': '#1D2422',
      'vw-overlay-border': '1px solid rgba(var(--v-border-color), 0.1)',
      'vw-overlay-shadow': '0 8px 28px rgba(var(--v-shadow-color), 0.1)',
      ...atlasVariables,
    },
  },
  defaults: atlasDefaults,
})
