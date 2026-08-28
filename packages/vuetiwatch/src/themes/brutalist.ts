import { bars, fields, icons } from '../util/defaults.js'
import { defineTheme } from '../util/defineTheme.js'

/**
 * Neobrutalism: thick black rules, an acid accent, and a hard offset shadow
 * with no blur at all — the shadow is a second shape, not a light effect.
 * Nothing is rounded and nothing is subtle.
 *
 * Not to be confused with `paper`, which is also flat and bordered but
 * hairline-thin and quiet; this one is the same idea shouted.
 */
export const brutalist = defineTheme({
  name: 'brutalist',
  meta: {
    title: 'Brutalist',
    description: 'Thick black rules, acid lime and hard unblurred shadows. Loud on purpose.',
    dark: false,
    iconStyle: 'filled',
    swatch: ['#FFFDF0', '#FFFFFF', '#0A0A0A', '#C4F82A'],
    fonts: ['Space Grotesk'],
  },
  theme: {
    dark: false,
    colors: {
      background: '#FFFDF0',
      surface: '#FFFFFF',
      'surface-bright': '#FFFFFF',
      'surface-light': '#F3EFDC',
      'surface-variant': '#0A0A0A',
      'on-surface-variant': '#FFFDF0',
      primary: '#0A0A0A',
      'primary-darken-1': '#000000',
      secondary: '#C4F82A',
      'secondary-darken-1': '#A5D617',
      error: '#FF4D3D',
      info: '#3D7BFF',
      success: '#00C853',
      warning: '#FFB300',
      'on-surface': '#0A0A0A',
      'on-background': '#0A0A0A',
      'on-secondary': '#0A0A0A',
      'on-warning': '#0A0A0A',
      'on-success': '#0A0A0A',
    },
    variables: {
      'border-color': '#0A0A0A',
      'border-opacity': 1,
      'shadow-color': '#0A0A0A',
      'high-emphasis-opacity': 1,
      'medium-emphasis-opacity': 0.75,
      'hover-opacity': 0.08,
      'font-body': "'Space Grotesk', 'Arial Black', system-ui, sans-serif",
      'vw-radius': '0px',
      'vw-radius-lg': '0px',
      'vw-radius-thumb': '0px',
      'vw-radius-chip': '0px',
      // Nothing here is round, the icon buttons included.
      'vw-radius-icon-btn': '0px',
      'vw-border-width': '3px',
      'vw-btn-transform': 'uppercase',
      'vw-btn-tracking': '0.04em',
      'vw-btn-weight': '700',
      // Lime marks the current page: darkening it would sink the number
      // into its own highlight.
      'vw-pagination-active-color': 'rgb(var(--v-theme-secondary))',
      'vw-pagination-active-opacity': '1',
      'vw-heading-weight': '700',
      'vw-heading-tracking': '-0.02em',
      'vw-tab-slider-height': '4px',

      // Two frames, no curve. The press is the theme's own slide into its
      // shadow, so the shared squash stays out of its way.
      'vw-motion-duration': '80ms',
      'vw-motion-ease': 'steps(2, end)',
      'vw-press-scale': '1',
      'vw-pop-scale': '1.3',
      'vw-pop-duration': '100ms',
      'vw-focus-ring': '3px solid rgb(var(--v-shadow-color))',
      'vw-focus-offset': '3px',
      'vw-theme-transition': '200ms',

      // A structural beam, and the dot is a square like everything else.
      'vw-timeline-line': 'rgb(var(--v-shadow-color))',
      'vw-timeline-line-width': '4px',
      'vw-radius-dot': '0px',
      'vw-radius-avatar': '0px',
    },
  },
  defaults: [
    {
      VBtn: { variant: 'flat' },
      VCard: { variant: 'outlined' },
      VAlert: { variant: 'outlined' },
      VChip: { variant: 'outlined' },
      VSheet: { border: true },
      VNavigationDrawer: { border: 'e' },
      VSwitch: { inset: 'square' },
      // Lime is this theme's "active" colour — it already marks the table
      // heads and the current page, so the slider joins them.
      VSlider: { thumbSize: 18, trackSize: 6, color: 'secondary' },
      VRangeSlider: { color: 'secondary' },
    },
    fields({ variant: 'outlined' }),
    bars({ flat: true, border: 'b' }),
    icons({
      // Solid and blunt: filled boxes, bold arrows, a thick cross.
      dropdown: 'mdi-menu-down',
      collapse: 'mdi-menu-up',
      next: 'mdi-arrow-right-bold',
      prev: 'mdi-arrow-left-bold',
      first: 'mdi-page-first',
      last: 'mdi-page-last',
      checkboxOn: 'mdi-checkbox-marked',
      checkboxOff: 'mdi-checkbox-blank-outline',
      ratingFull: 'mdi-star',
      ratingEmpty: 'mdi-star-outline',
      sortAsc: 'mdi-menu-up',
      sortDesc: 'mdi-menu-down',
      close: 'mdi-close-thick',
    }),
  ],
})
