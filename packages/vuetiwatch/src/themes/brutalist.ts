import { bars, combine, fields } from '../util/defaults.js'
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
      'vw-radius-chip': '0px',
      'vw-border-width': '3px',
      'vw-btn-transform': 'uppercase',
      'vw-btn-tracking': '0.04em',
      'vw-btn-weight': '700',
    },
  },
  defaults: combine(
    {
      VBtn: { variant: 'flat' },
      VCard: { variant: 'outlined' },
      VAlert: { variant: 'outlined' },
      VChip: { variant: 'outlined' },
      VSheet: { border: true },
      VNavigationDrawer: { border: 'e' },
      VSwitch: { inset: 'square' },
      VSlider: { thumbSize: 18, trackSize: 6 },
    },
    fields({ variant: 'outlined' }),
    bars({ flat: true, border: 'b' }),
  ),
})

export default brutalist
