import { bars, fields, icons } from '../util/defaults.js'
import { defineTheme } from '../util/defineTheme.js'

/**
 * The showcase theme: the visual language current AI products landed on —
 * near-black ground, iridescent gradients, light instead of shadow.
 *
 * It is deliberately the loudest theme in the set. Where `neon` is flat and
 * shouting, this one is layered and lit: gradients rather than solid
 * accents, rims rather than borders, glow rather than elevation.
 */
export const aurora = defineTheme({
  name: 'aurora',
  meta: {
    title: 'Aurora',
    description: 'Iridescent gradients on near-black. Built to be looked at — the showcase theme.',
    dark: true,
    iconStyle: 'filled',
    swatch: ['#08080C', '#101018', '#7C5CFF', '#00D4FF'],
    fonts: ['Inter'],
  },
  theme: {
    dark: true,
    colors: {
      background: '#08080C',
      surface: '#101018',
      'surface-bright': '#1B1B28',
      'surface-light': '#16161F',
      'surface-variant': '#C9C6E0',
      'on-surface-variant': '#08080C',
      primary: '#7C5CFF',
      'primary-darken-1': '#5F3FE0',
      secondary: '#00D4FF',
      'secondary-darken-1': '#00A8CC',
      error: '#FF5C7A',
      info: '#00D4FF',
      success: '#3DDC97',
      warning: '#FFB86B',
      'on-surface': '#E8E6F5',
      'on-background': '#F0EEFA',
      'on-secondary': '#04121A',
      'on-success': '#04140D',
      'on-warning': '#1A1004',
    },
    variables: {
      'border-color': '#9B8CFF',
      'border-opacity': 0.14,
      'shadow-color': '#000000',
      'high-emphasis-opacity': 0.96,
      'medium-emphasis-opacity': 0.68,
      'hover-opacity': 0.08,
      'font-body': "'Inter', system-ui, sans-serif",
      'vw-radius': '12px',
      'vw-radius-lg': '18px',
      'vw-radius-chip': '999px',
      'vw-border-width': '1px',
      'vw-btn-transform': 'none',
      'vw-btn-tracking': '0.01em',
      'vw-btn-weight': '600',
      'vw-tab-slider-height': '3px',
      // Shared by every gradient below, so a derived theme restyles the
      // whole surface language by overriding one value.
      'vw-gradient': 'linear-gradient(135deg, #7C5CFF 0%, #00D4FF 55%, #FF5CAA 100%)',

      // The showcase theme, so the motion shows off too.
      'vw-motion-duration': '300ms',
      'vw-press-scale': '0.97',
      'vw-hover-lift': '3px',
      'vw-pop-scale': '1.28',
      'vw-pop-duration': '300ms',
      'vw-theme-transition': '560ms',

      // The line is the theme's own gradient, top to bottom.
      'vw-timeline-line': 'var(--v-vw-gradient)',
      'vw-timeline-line-width': '2px',
    },
  },
  defaults: [
    {
      VBtn: { variant: 'flat' },
      VCard: { variant: 'elevated', elevation: 0 },
      VAlert: { variant: 'tonal' },
      VChip: { variant: 'tonal' },
      VSwitch: { inset: true },
      VSlider: { thumbSize: 18, trackSize: 4 },
    },
    fields({ variant: 'solo-filled', flat: true }),
    bars({ flat: true }),
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
