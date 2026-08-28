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
    swatch: ['#FAFAF7', '#FFFFFF', '#6B7A6B', '#A89684'],
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
      secondary: '#A89684',
      'secondary-darken-1': '#8B7A69',
      error: '#A86B63',
      info: '#6B7A8A',
      success: '#6B8A6B',
      warning: '#A89464',
      'on-surface': '#3A3A36',
      'on-background': '#3A3A36',
    },
    variables: {
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
