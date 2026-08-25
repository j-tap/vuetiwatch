import { bars, fields, icons } from '../util/defaults.js'
import { defineTheme } from '../util/defineTheme.js'

/**
 * Neumorphism: surfaces are the same colour as the page, and the only thing
 * separating them is a pair of shadows — dark bottom-right, light top-left,
 * as if the whole interface were pressed out of one sheet.
 *
 * `surface` deliberately equals `background`. Anything that reintroduces
 * contrast between them breaks the illusion.
 */
export const morph = defineTheme({
  name: 'morph',
  meta: {
    title: 'Morph',
    description: 'Neumorphic — one continuous surface, shaped only by light and shadow.',
    dark: false,
    iconStyle: 'filled',
    swatch: ['#E4EBF5', '#E4EBF5', '#5A7DE0', '#8894AA'],
    fonts: ['Nunito'],
  },
  theme: {
    dark: false,
    colors: {
      background: '#E4EBF5',
      surface: '#E4EBF5',
      'surface-bright': '#EEF3FA',
      'surface-light': '#DAE2EE',
      'surface-variant': '#4A5568',
      'on-surface-variant': '#E4EBF5',
      primary: '#5A7DE0',
      'primary-darken-1': '#4763BC',
      secondary: '#8894AA',
      'secondary-darken-1': '#6D798F',
      error: '#E06C75',
      info: '#5A9FE0',
      success: '#5AC08C',
      warning: '#E0A85A',
      'on-surface': '#4A5568',
      'on-background': '#4A5568',
    },
    variables: {
      'border-color': '#9AA7BC',
      'border-opacity': 0.001,
      'shadow-color': '#A3B1C6',
      'high-emphasis-opacity': 0.85,
      'medium-emphasis-opacity': 0.6,
      'hover-opacity': 0.03,
      'font-body': "'Nunito', system-ui, sans-serif",
      'vw-radius': '12px',
      'vw-radius-lg': '20px',
      'vw-radius-chip': '999px',
      // Borders would flatten the relief the shadows are building.
      'vw-border-width': '0px',
      'vw-btn-transform': 'none',
      'vw-btn-tracking': '0.01em',
      'vw-btn-weight': '700',
      'vw-tab-slider-height': '4px',
    },
  },
  defaults: [
    {
      VBtn: { variant: 'flat' },
      VCard: { variant: 'flat' },
      VAlert: { variant: 'flat' },
      VChip: { variant: 'flat' },
      VSwitch: { inset: true },
      VSlider: { thumbSize: 20, trackSize: 6 },
    },
    fields({ variant: 'solo', flat: true }),
    bars({ flat: true }),
    icons({
      // Everything round, to match surfaces that have no edges at all.
      dropdown: 'mdi-chevron-down',
      collapse: 'mdi-chevron-up',
      checkboxOn: 'mdi-check-circle',
      checkboxOff: 'mdi-circle-outline',
      ratingFull: 'mdi-circle',
      ratingEmpty: 'mdi-circle-outline',
    }),
  ],
})
