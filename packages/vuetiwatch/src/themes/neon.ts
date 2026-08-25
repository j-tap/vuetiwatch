import { bars, combine, fields, icons, tables } from '../util/defaults.js'
import { defineTheme } from '../util/defineTheme.js'

/**
 * Near-black ground, saturated cyan and magenta, zero radius, and glow
 * instead of elevation. The loudest theme in the set and the deliberate
 * opposite of `soft`.
 */
export const neon = defineTheme({
  name: 'neon',
  meta: {
    title: 'Neon',
    description: 'Terminal black with cyan and magenta glow. Sharp corners, monospace headings.',
    dark: true,
    iconStyle: 'outline',
    swatch: ['#05060A', '#0B0E16', '#00F0FF', '#FF2FD0'],
    fonts: ['JetBrains Mono', 'Inter'],
  },
  theme: {
    dark: true,
    colors: {
      background: '#05060A',
      surface: '#0B0E16',
      'surface-bright': '#161B29',
      'surface-light': '#11151F',
      'surface-variant': '#C9D3E6',
      'on-surface-variant': '#05060A',
      primary: '#00F0FF',
      'primary-darken-1': '#00BFCC',
      secondary: '#FF2FD0',
      'secondary-darken-1': '#CC1FA6',
      error: '#FF3B5C',
      info: '#00F0FF',
      success: '#29FF9B',
      warning: '#FFD23F',
      'on-surface': '#D7E3F4',
      'on-background': '#D7E3F4',
      'on-primary': '#05060A',
      'on-secondary': '#05060A',
      'on-success': '#05060A',
      'on-warning': '#05060A',
    },
    variables: {
      'border-color': '#00F0FF',
      'border-opacity': 0.28,
      'shadow-color': '#00F0FF',
      'high-emphasis-opacity': 0.94,
      'medium-emphasis-opacity': 0.66,
      'hover-opacity': 0.12,
      'font-body': "'Inter', system-ui, sans-serif",
      'font-heading': "'JetBrains Mono', 'IBM Plex Mono', ui-monospace, monospace",
      'vw-radius': '0px',
      'vw-radius-lg': '0px',
      'vw-radius-thumb': '0px',
      'vw-radius-chip': '0px',
      'vw-border-width': '1px',
      'vw-btn-transform': 'uppercase',
      'vw-btn-tracking': '0.12em',
      'vw-btn-weight': '600',
    },
  },
  defaults: combine(
    {
      VBtn: { variant: 'outlined' },
      VCard: { variant: 'outlined' },
      VAlert: { variant: 'outlined' },
      VChip: { variant: 'outlined' },
      VSheet: { border: true },
      VNavigationDrawer: { border: 'e' },
    },
    fields({ variant: 'outlined', density: 'compact' }),
    tables('compact'),
    bars({ flat: true, border: 'b' }),
    {
      // Nothing filled and nothing round: a square switch, a square slider
      // thumb, and a checkbox that stays hollow when checked.
      VSwitch: { inset: 'square' },
      VSlider: { thumbSize: 14, trackSize: 2 },
    },
    icons({
      // Nothing is filled in this theme, glyphs included.
      dropdown: 'mdi-menu-down',
      collapse: 'mdi-menu-up',
      checkboxOn: 'mdi-checkbox-marked-outline',
      checkboxOff: 'mdi-checkbox-blank-outline',
      ratingFull: 'mdi-star',
      ratingEmpty: 'mdi-star-outline',
      sortAsc: 'mdi-chevron-up',
      sortDesc: 'mdi-chevron-down',
      close: 'mdi-close',
    }),
  ),
})

export default neon
