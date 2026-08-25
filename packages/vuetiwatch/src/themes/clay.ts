import { bars, checkboxes, combine, fields } from '../util/defaults.js'
import { defineTheme } from '../util/defineTheme.js'

/**
 * Claymorphism — neumorphism's louder descendant. Where `morph` hides its
 * surfaces in the background, this one lifts bright white shapes off a
 * saturated ground and gives them three shadows: an outer drop, a light
 * rim, and an inner one that makes them look inflated rather than cut out.
 */
export const clay = defineTheme({
  name: 'clay',
  meta: {
    title: 'Clay',
    description: 'Inflated pastel shapes with a triple shadow. Tactile and toy-like.',
    dark: false,
    swatch: ['#EDE7FF', '#FFFFFF', '#6C5CE7', '#FF7BA9'],
    fonts: ['Quicksand'],
  },
  theme: {
    dark: false,
    colors: {
      background: '#EDE7FF',
      surface: '#FFFFFF',
      'surface-bright': '#FFFFFF',
      'surface-light': '#E1D8FF',
      'surface-variant': '#3D3355',
      'on-surface-variant': '#EDE7FF',
      primary: '#6C5CE7',
      'primary-darken-1': '#5546C4',
      secondary: '#FF7BA9',
      'secondary-darken-1': '#E05A8A',
      error: '#FF6B6B',
      info: '#4EC5F1',
      success: '#2ECC71',
      warning: '#FDCB6E',
      'on-surface': '#3D3355',
      'on-background': '#3D3355',
      'on-warning': '#3D2E00',
    },
    variables: {
      'border-color': '#6C5CE7',
      'border-opacity': 0.001,
      'shadow-color': '#5A46B0',
      'high-emphasis-opacity': 0.9,
      'medium-emphasis-opacity': 0.62,
      'hover-opacity': 0.05,
      'font-body': "'Quicksand', 'Nunito', system-ui, sans-serif",
      'vw-radius': '20px',
      'vw-radius-lg': '28px',
      'vw-radius-chip': '999px',
      'vw-border-width': '0px',
      'vw-btn-transform': 'none',
      'vw-btn-tracking': '0',
      'vw-btn-weight': '700',
    },
  },
  defaults: combine(
    {
      VBtn: { variant: 'flat', size: 'large' },
      VCard: { variant: 'flat' },
      VAlert: { variant: 'flat' },
      VChip: { variant: 'flat' },
      VSwitch: { inset: true },
      VSlider: { thumbSize: 24, trackSize: 10 },
    },
    fields({ variant: 'solo', flat: true }),
    bars({ flat: true }),
    checkboxes({ trueIcon: 'mdi-check-circle', falseIcon: 'mdi-circle-outline' }),
  ),
})

export default clay
