import { bars, combine, fields } from '../util/defaults.js'
import { defineTheme } from '../util/defineTheme.js'

/**
 * Glass that refracts rather than merely blurs, after Apple's iOS 26
 * language: a bright translucent surface, oversaturated so colour bends
 * through it, and specular rims — light along the top edge, a shadow along
 * the bottom — that read as thickness.
 *
 * The stylesheet gives `v-app` a gradient ground, because translucency with
 * nothing behind it is just grey.
 */
export const liquidGlass = defineTheme({
  name: 'liquidGlass',
  meta: {
    title: 'Liquid Glass',
    description: 'Bright refracting glass with specular rims, over a gradient ground.',
    dark: false,
    swatch: ['#EAF0FA', '#FFFFFF', '#0A84FF', '#FF375F'],
    fonts: ['Inter'],
  },
  theme: {
    dark: false,
    colors: {
      background: '#EAF0FA',
      surface: '#FFFFFF',
      'surface-bright': '#FFFFFF',
      'surface-light': '#F2F6FC',
      'surface-variant': '#3A3A3C',
      'on-surface-variant': '#F2F6FC',
      primary: '#0A84FF',
      'primary-darken-1': '#0060DF',
      secondary: '#FF375F',
      'secondary-darken-1': '#D81E45',
      error: '#FF3B30',
      info: '#0A84FF',
      success: '#30D158',
      warning: '#FF9F0A',
      'on-surface': '#1C1C1E',
      'on-background': '#1C1C1E',
      'on-success': '#04140A',
      'on-warning': '#1A1004',
    },
    variables: {
      'border-color': '#FFFFFF',
      'border-opacity': 0.6,
      'shadow-color': '#1B3A6B',
      'high-emphasis-opacity': 0.92,
      'medium-emphasis-opacity': 0.62,
      'hover-opacity': 0.05,
      'font-body': "'Inter', -apple-system, system-ui, sans-serif",
      'vw-radius': '14px',
      'vw-radius-lg': '24px',
      'vw-radius-chip': '999px',
      'vw-border-width': '1px',
      'vw-btn-transform': 'none',
      'vw-btn-tracking': '0',
      'vw-btn-weight': '600',
    },
  },
  defaults: combine(
    {
      VBtn: { variant: 'flat' },
      VCard: { variant: 'elevated', elevation: 0 },
      VAlert: { variant: 'tonal' },
      VChip: { variant: 'tonal' },
      VSwitch: { inset: true },
      VSlider: { thumbSize: 22, trackSize: 6 },
    },
    fields({ variant: 'solo-filled', flat: true }),
    bars({ flat: true }),
  ),
})

export default liquidGlass
