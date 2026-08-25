import { bars, checkboxes, combine, fields } from '../util/defaults.js'
import { defineTheme } from '../util/defineTheme.js'

/**
 * Pastel and generous: large radii, diffuse coloured shadows, a rounded
 * grotesque. Reads friendly rather than corporate — consumer apps,
 * onboarding, anything that should not feel like a dashboard.
 */
export const soft = defineTheme({
  name: 'soft',
  meta: {
    title: 'Soft',
    description: 'Pastel palette, large radii and diffuse shadows. Friendly and unhurried.',
    dark: false,
    swatch: ['#F7F5FF', '#FFFFFF', '#7C6CF0', '#F08CA8'],
    fonts: ['Nunito'],
  },
  theme: {
    dark: false,
    colors: {
      background: '#F7F5FF',
      surface: '#FFFFFF',
      'surface-bright': '#FFFFFF',
      'surface-light': '#EAE3FF',
      'surface-variant': '#4A4458',
      'on-surface-variant': '#F7F5FF',
      primary: '#7C6CF0',
      'primary-darken-1': '#5F4DE0',
      secondary: '#F08CA8',
      'secondary-darken-1': '#DB6C8B',
      error: '#F0736E',
      info: '#58B7E8',
      success: '#4FC38A',
      warning: '#F5B851',
      'on-surface': '#2E2A3B',
      'on-background': '#2E2A3B',
    },
    variables: {
      'border-color': '#5F4DE0',
      'border-opacity': 0.1,
      'shadow-color': '#4A3F8C',
      'high-emphasis-opacity': 0.88,
      'medium-emphasis-opacity': 0.62,
      'hover-opacity': 0.06,
      'font-body': "'Nunito', 'Quicksand', system-ui, sans-serif",
      'vw-radius': '14px',
      'vw-radius-lg': '22px',
      'vw-radius-chip': '999px',
      'vw-btn-transform': 'none',
      'vw-btn-tracking': '0',
      'vw-btn-weight': '700',
    },
  },
  defaults: combine(
    {
      VBtn: { variant: 'flat' },
      VCard: { variant: 'elevated', elevation: 0 },
      VAlert: { variant: 'tonal' },
      VChip: { variant: 'tonal' },
    },
    fields({ variant: 'solo-filled' }),
    bars({ flat: true }),
    {
      // Everything here rounds off: an inset pill switch, a fat slider, a
      // pill behind the active tab instead of an underline, round tick boxes.
      VSwitch: { inset: true },
      VSlider: { thumbSize: 22, trackSize: 8 },
      // `VTabs` owns its own inset radius, so the theme sets it here
      // rather than through the shared `--v-vw-radius`.
      VTabs: { inset: true, insetRadius: 12 },
    },
    checkboxes({ trueIcon: 'mdi-check-circle', falseIcon: 'mdi-circle-outline' }),
  ),
})

export default soft
