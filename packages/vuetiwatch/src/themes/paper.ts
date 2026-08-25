import { bars, fields } from '../util/defaults.js'
import { defineTheme } from '../util/defineTheme.js'

/**
 * Editorial and flat: warm paper background, ink-black primary, hairline
 * borders instead of shadows, serif headings. The furthest a light theme
 * gets from Material without changing a single component.
 */
export const paper = defineTheme({
  name: 'paper',
  meta: {
    title: 'Paper',
    description: 'Flat editorial look — warm paper, ink accents, borders instead of elevation.',
    dark: false,
    swatch: ['#FAF8F2', '#FFFFFF', '#1A1A1A', '#8A6A3B'],
    fonts: ['Source Serif 4'],
  },
  theme: {
    dark: false,
    colors: {
      background: '#FAF8F2',
      surface: '#FFFFFF',
      'surface-bright': '#FFFFFF',
      'surface-light': '#F1EEE4',
      'surface-variant': '#2B2724',
      'on-surface-variant': '#FAF8F2',
      primary: '#1A1A1A',
      'primary-darken-1': '#000000',
      secondary: '#8A6A3B',
      'secondary-darken-1': '#6B5029',
      error: '#A32E2E',
      info: '#2E5A8A',
      success: '#3E7A4E',
      warning: '#B07A1E',
      'on-surface': '#14110E',
      'on-background': '#14110E',
    },
    variables: {
      'border-color': '#14110E',
      'border-opacity': 0.2,
      'high-emphasis-opacity': 0.92,
      'medium-emphasis-opacity': 0.66,
      'hover-opacity': 0.05,
      'font-body': "system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif",
      'font-heading': "'Source Serif 4', 'Iowan Old Style', Georgia, 'Times New Roman', serif",
      'vw-radius': '2px',
      'vw-radius-lg': '2px',
      'vw-radius-chip': '2px',
      'vw-border-width': '1px',
      'vw-btn-transform': 'none',
      'vw-btn-tracking': '0',
      'vw-btn-weight': '600',
    },
  },
  defaults: {
    VBtn: { variant: 'outlined' },
    VCard: { variant: 'outlined' },
    VAlert: { variant: 'outlined' },
    VChip: { variant: 'outlined' },
    VSheet: { border: true },
    VNavigationDrawer: { border: 'e' },
    ...fields({ variant: 'outlined' }),
    ...bars({ flat: true, border: 'b' }),
  },
})

export default paper
