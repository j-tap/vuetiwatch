import { bars, controls, fields, icons, tables } from '../util/defaults.js'
import { defineTheme } from '../util/defineTheme.js'

/**
 * The admin-panel theme: muted slate blues, tight radii, compact density
 * everywhere, cards outlined rather than raised. Built for tables and
 * forms that need to fit a lot on one screen.
 */
export const slate = defineTheme({
  name: 'slate',
  meta: {
    title: 'Slate',
    description: 'Dense corporate dashboard — muted slate blue, compact density, tight radii.',
    dark: false,
    iconStyle: 'filled',
    swatch: ['#F4F6F8', '#FFFFFF', '#2C5282', '#4A6FA5'],
    fonts: ['Inter'],
  },
  theme: {
    dark: false,
    colors: {
      background: '#F4F6F8',
      surface: '#FFFFFF',
      'surface-bright': '#FFFFFF',
      'surface-light': '#EAEEF3',
      'surface-variant': '#33415C',
      'on-surface-variant': '#EAEEF3',
      primary: '#2C5282',
      'primary-darken-1': '#1F3C63',
      secondary: '#4A6FA5',
      'secondary-darken-1': '#375684',
      error: '#C53030',
      info: '#2B6CB0',
      success: '#2F855A',
      warning: '#B7791F',
      'on-surface': '#1A202C',
      'on-background': '#1A202C',
    },
    variables: {
      'border-color': '#1A202C',
      'border-opacity': 0.14,
      'shadow-color': '#1A202C',
      'high-emphasis-opacity': 0.9,
      'medium-emphasis-opacity': 0.62,
      'hover-opacity': 0.05,
      'font-body': "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
      'vw-radius': '3px',
      'vw-radius-lg': '4px',
      'vw-radius-thumb': '3px',
      'vw-radius-chip': '3px',
      'vw-border-width': '1px',
      'vw-btn-transform': 'none',
      'vw-btn-tracking': '0.01em',
      'vw-btn-weight': '600',
      'vw-list-bar': '3px',
      'vw-list-bar-color': 'rgb(var(--v-theme-primary))',
      'vw-tab-slider-height': '3px',

      // Dashboard: short, unremarkable, out of the way of the data.
      'vw-motion-duration': '120ms',
      'vw-press-scale': '0.98',
      'vw-pop-scale': '1.12',
      'vw-pop-duration': '160ms',
      'vw-focus-ring': '2px solid rgb(var(--v-theme-primary))',

      // Dense and structural: a 2px rule and a square dot.
      'vw-timeline-line': 'rgba(var(--v-theme-primary), 0.35)',
      'vw-timeline-line-width': '2px',
      'vw-radius-dot': '3px',
    },
  },
  defaults: [
    {
      // No `density` on the button: Vuetify subtracts it from the size
      // height, and a comfortable `x-small` ends up shorter than its own
      // label. Everything else in the theme stays compact.
      VBtn: { variant: 'flat' },
      VCard: { variant: 'outlined' },
      VAlert: { variant: 'tonal', density: 'compact' },
      VChip: { variant: 'tonal', size: 'small' },
      VNavigationDrawer: { border: 'e' },
    },
    fields({ variant: 'outlined', density: 'compact' }),
    controls({ density: 'compact' }),
    tables('compact'),
    bars({ flat: true, border: 'b' }),
    {
      // Small, square and out of the way — controls should not outweigh the
      // data they sit next to.
      VSwitch: { inset: 'square' },
      VSlider: { thumbSize: 14, trackSize: 2 },
    },
    icons({
      // Solid triangles: they read at a glance and take less room than a
      // chevron, which matters in a dense table.
      dropdown: 'mdi-menu-down',
      collapse: 'mdi-menu-up',
      checkboxOn: 'mdi-checkbox-marked',
      checkboxOff: 'mdi-checkbox-blank-outline',
      sortAsc: 'mdi-menu-up',
      sortDesc: 'mdi-menu-down',
    }),
  ],
})
