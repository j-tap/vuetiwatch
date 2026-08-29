import { bars, fields, icons } from '../util/defaults.js'
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
      // Vuetify picks the label colour by luminance and settles for
      // about 3:1, which is the bar for large text rather than for a
      // button label. Measured on the filled buttons: error 3.1:1 → 6.7:1.
      'on-error': '#000000',
    },
    variables: {
      /* A panel standing on its own — a bare list, sheet, banner or table.
         Core owns the selector; this is what it draws with. */
      'vw-panel-fill': 'rgba(var(--v-theme-surface), 0.62)',
      'vw-panel-filter': 'blur(18px) saturate(160%)',
      'vw-panel-border':
        '1px solid rgba(var(--v-border-color), var(--v-border-opacity))',
      'border-color': '#B9A9FF',
      'border-opacity': 0.16,
      'shadow-color': '#000000',
      // The frost rule below owns the colour; core's default would paint
      // an opaque surface under it and the sheet would stop being glass.
      'vw-outlined-fill': 'rgba(var(--v-theme-surface), 0.62)',
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

      // Sheets of glass slide rather than snap.
      'vw-motion-duration': '260ms',
      'vw-press-scale': '0.97',
      'vw-hover-lift': '2px',
      'vw-pop-scale': '1.18',
      'vw-pop-duration': '240ms',

      // Violet through the glass.
      'vw-timeline-line': 'rgba(var(--v-theme-primary), 0.45)',
      'vw-timeline-line-width': '2px',
    },
  },
  defaults: [
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
  ],
})
