import { bars, controls, fields, icons, tables } from '../util/defaults.js'
import { defineTheme } from '../util/defineTheme.js'

/**
 * The counter-trend: an interface that does not compete for attention.
 * Desaturated naturals, contrast held deliberately low, no shadows and no
 * fills — separation comes from space, and colour is spent only on things
 * you can act on.
 *
 * The discipline is subtractive, so resist adding accents here; every one
 * of them costs the theme its point.
 */
export const calm = defineTheme({
  name: 'calm',
  meta: {
    title: 'Calm',
    description: 'Low contrast, desaturated naturals and a lot of air. Nothing competes for attention.',
    dark: false,
    iconStyle: 'outline',
    swatch: ['#FAFAF7', '#FFFFFF', '#6B7A6B', '#86725F'],
    fonts: ['Inter'],
  },
  theme: {
    dark: false,
    colors: {
      background: '#FAFAF7',
      surface: '#FFFFFF',
      'surface-bright': '#FFFFFF',
      'surface-light': '#F2F1EC',
      'surface-variant': '#4A4A44',
      'on-surface-variant': '#FAFAF7',
      primary: '#6B7A6B',
      'primary-darken-1': '#556355',
      secondary: '#86725F',
      'secondary-darken-1': '#8B7A69',
      error: '#A86B63',
      info: '#6B7A8A',
      success: '#6B8A6B',
      warning: '#A89464',
      'on-surface': '#3A3A36',
      'on-background': '#3A3A36',
      // Vuetify picks the label colour by luminance and settles for
      // about 3:1, which is the bar for large text rather than for a
      // button label. Measured on the filled buttons: success 3.8:1 → 5.5:1, info 4.4:1 → 4.8:1, warning 3:1 → 7.1:1, error 4.2:1 → 4.9:1.
      'on-success': '#000000',
      'on-info': '#000000',
      'on-warning': '#000000',
      'on-error': '#000000',
    },
    variables: {
      /* A panel standing on its own — a bare list, sheet, banner or table.
         Core owns the selector; this is what it draws with. */
      'vw-panel-border':
        'var(--v-vw-border-width) solid rgba(var(--v-border-color), var(--v-border-opacity))',
      'border-color': '#3A3A36',
      'border-opacity': 0.09,
      'high-emphasis-opacity': 0.78,
      'medium-emphasis-opacity': 0.5,
      'hover-opacity': 0.03,
      'font-body': "'Inter', system-ui, sans-serif",
      'vw-radius': '8px',
      'vw-radius-lg': '12px',
      'vw-radius-chip': '8px',
      'vw-border-width': '1px',
      'vw-btn-transform': 'none',
      'vw-btn-tracking': '0.01em',
      'vw-btn-weight': '500',
      'vw-heading-weight': '500',
      'vw-heading-tracking': '-0.01em',
      'vw-tab-slider-height': '2px',

      // Slow enough that nothing ever catches the eye.
      'vw-motion-duration': '320ms',
      'vw-press-scale': '0.99',
      'vw-hover-lift': '2px',
      'vw-pop-scale': '1.08',
      'vw-pop-duration': '280ms',
      'vw-theme-transition': '560ms',

      // Barely there, like everything else in this theme.
      'vw-timeline-line': 'rgba(var(--v-border-color), 0.5)',
      'vw-timeline-line-width': '1px',
    },
  },
  defaults: [
    {
      VBtn: { variant: 'text' },
      VCard: { variant: 'flat' },
      VAlert: { variant: 'text' },
      VChip: { variant: 'text' },
      VNavigationDrawer: { border: 'e' },
      VSwitch: { inset: true },
      VSlider: { thumbSize: 14, trackSize: 2 },
    },
    fields({ variant: 'underlined' }),
    controls({ density: 'comfortable' }),
    tables('comfortable'),
    bars({ flat: true }),
    icons({
      // Hollow throughout, and the rating is dots rather than stars: a row
      // of filled stars is the loudest thing a quiet page could carry.
      dropdown: 'mdi-chevron-down',
      collapse: 'mdi-chevron-up',
      checkboxOn: 'mdi-check-circle-outline',
      checkboxOff: 'mdi-circle-outline',
      ratingFull: 'mdi-circle',
      ratingEmpty: 'mdi-circle-outline',
      close: 'mdi-close',
    }),
  ],
})
