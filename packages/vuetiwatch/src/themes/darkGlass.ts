import { bars, combine, fields, icons } from '../util/defaults.js'
import { defineTheme } from '../util/defineTheme.js'

/**
 * Translucent dark surfaces over a deep violet ground, with backdrop blur
 * and a hairline top highlight. Needs a busy background behind `v-app`
 * to really sing.
 */
export const darkGlass = defineTheme({
  name: 'darkGlass',
  meta: {
    title: 'Dark Glass',
    description: 'Frosted translucent surfaces on a deep violet ground.',
    dark: true,
    iconStyle: 'filled',
    swatch: ['#0E0B18', '#191428', '#7C4DFF', '#4FC3F7'],
    fonts: ['Inter'],
  },
  theme: {
    dark: true,
    colors: {
      background: '#0E0B18',
      surface: '#191428',
      'surface-bright': '#2A2340',
      'surface-light': '#241D38',
      'surface-variant': '#C6BEDE',
      'on-surface-variant': '#14101F',
      primary: '#7C4DFF',
      'primary-darken-1': '#5E35D6',
      secondary: '#4FC3F7',
      'secondary-darken-1': '#2FA3D8',
      error: '#FF5370',
      info: '#4FC3F7',
      success: '#00E676',
      warning: '#FFB74D',
      'on-surface': '#ECE8F5',
      'on-background': '#F3F0FA',
    },
    variables: {
      'border-color': '#B9A9FF',
      'border-opacity': 0.16,
      'shadow-color': '#000000',
      'high-emphasis-opacity': 0.95,
      'medium-emphasis-opacity': 0.72,
      'hover-opacity': 0.08,
      'font-body': "'Inter', system-ui, sans-serif",
      'vw-radius': '12px',
      'vw-radius-lg': '18px',
      'vw-radius-chip': '999px',
      'vw-btn-transform': 'none',
      'vw-btn-tracking': '0.01em',
      'vw-btn-weight': '600',
    },
  },
  defaults: combine(
    {
      VBtn: { variant: 'flat' },
      VCard: { variant: 'elevated', elevation: 0 },
      VAlert: { variant: 'tonal' },
      VChip: { variant: 'tonal' },
    },
    fields({ variant: 'solo-filled', flat: true }),
    bars({ flat: true }),
    {
      VSwitch: { inset: true },
      VSlider: { thumbSize: 18, trackSize: 4 },
    },
    icons({
      dropdown: 'mdi-chevron-down',
      collapse: 'mdi-chevron-up',
      checkboxOn: 'mdi-check-circle',
      checkboxOff: 'mdi-circle-outline',
      ratingFull: 'mdi-star',
      ratingEmpty: 'mdi-star-outline',
    }),
  ),
})

export default darkGlass
