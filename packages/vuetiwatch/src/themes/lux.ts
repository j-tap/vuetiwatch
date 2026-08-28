import { bars, controls, fields, icons, tables } from '../util/defaults.js'
import { defineTheme } from '../util/defineTheme.js'

/**
 * Restraint as decoration: hairline rules, wide letter-spacing, small caps
 * on anything interactive, and a single muted gold. The only theme here
 * whose character is carried almost entirely by typography and spacing
 * rather than colour or shape.
 */
export const lux = defineTheme({
  name: 'lux',
  meta: {
    title: 'Lux',
    description: 'Editorial luxury — hairline rules, wide tracking, small caps and muted gold.',
    dark: false,
    iconStyle: 'outline',
    swatch: ['#FFFFFF', '#FAFAFA', '#1A1A1A', '#B39A5B'],
    fonts: ['Jost'],
  },
  theme: {
    dark: false,
    colors: {
      background: '#FFFFFF',
      surface: '#FFFFFF',
      'surface-bright': '#FFFFFF',
      'surface-light': '#F7F7F5',
      'surface-variant': '#1A1A1A',
      'on-surface-variant': '#FFFFFF',
      primary: '#1A1A1A',
      'primary-darken-1': '#000000',
      secondary: '#B39A5B',
      'secondary-darken-1': '#8F7A45',
      error: '#96322A',
      info: '#3D5A73',
      success: '#4A6B4F',
      warning: '#A8791E',
      'on-surface': '#1A1A1A',
      'on-background': '#1A1A1A',
    },
    variables: {
      'border-color': '#1A1A1A',
      'border-opacity': 0.14,
      'high-emphasis-opacity': 0.88,
      'medium-emphasis-opacity': 0.55,
      'hover-opacity': 0.03,
      'font-body': "'Jost', 'Futura', system-ui, sans-serif",
      'vw-radius': '0px',
      'vw-radius-lg': '0px',
      'vw-radius-thumb': '0px',
      'vw-radius-chip': '0px',
      'vw-border-width': '1px',
      'vw-btn-transform': 'uppercase',
      'vw-btn-tracking': '0.2em',
      'vw-btn-weight': '400',
      'vw-heading-weight': '300',
      'vw-heading-tracking': '0.06em',
      'vw-heading-transform': 'uppercase',
      'vw-list-bar': '2px',
      'vw-list-bar-color': 'rgb(var(--v-theme-secondary))',
      'vw-tab-slider-height': '1px',

      // Expensive things move slowly and stop exactly where they meant to.
      'vw-motion-duration': '240ms',
      'vw-motion-ease': 'cubic-bezier(0.2, 0, 0, 1)',
      'vw-press-scale': '0.995',
      'vw-hover-lift': '2px',
      'vw-pop-scale': '1.08',
      'vw-pop-duration': '220ms',
      'vw-focus-ring': '1px solid rgb(var(--v-theme-primary))',
      'vw-theme-transition': '520ms',

      // A gold hairline; the dot stays a circle.
      'vw-timeline-line': 'rgba(var(--v-theme-primary), 0.55)',
      'vw-timeline-line-width': '1px',
    },
  },
  defaults: [
    {
      VBtn: { variant: 'outlined', size: 'large' },
      VCard: { variant: 'outlined' },
      VAlert: { variant: 'outlined' },
      VChip: { variant: 'outlined' },
      VNavigationDrawer: { border: 'e' },
      VSwitch: { inset: 'square' },
      VSlider: { thumbSize: 12, trackSize: 1 },
    },
    fields({ variant: 'underlined' }),
    controls({ density: 'comfortable' }),
    tables('comfortable'),
    bars({ flat: true, border: 'b' }),
    icons({
      dropdown: 'mdi-chevron-down',
      collapse: 'mdi-chevron-up',
      checkboxOn: 'mdi-checkbox-marked-outline',
      checkboxOff: 'mdi-checkbox-blank-outline',
      ratingFull: 'mdi-star',
      ratingEmpty: 'mdi-star-outline',
      sortAsc: 'mdi-arrow-up',
      sortDesc: 'mdi-arrow-down',
      close: 'mdi-close',
      // An em dash rather than a slash — the one flourish the theme allows.
      breadcrumbDivider: '—',
    }),
  ],
})
