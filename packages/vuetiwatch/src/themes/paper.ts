import { bars, fields, icons, surfaces } from '../util/defaults.js'
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
    iconStyle: 'outline',
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
      'vw-radius-thumb': '2px',
      'vw-radius-chip': '2px',
      'vw-border-width': '1px',
      'vw-btn-transform': 'none',
      'vw-btn-tracking': '0',
      'vw-btn-weight': '600',
      'vw-heading-tracking': '-0.01em',
      'vw-tab-slider-height': '3px',

      // Editorial: quick and flat, nothing bounces off the page.
      'vw-motion-duration': '140ms',
      'vw-motion-ease': 'ease-out',
      'vw-press-scale': '0.99',
      'vw-pop-scale': '1.1',
      'vw-pop-duration': '180ms',

      // A line of ink dots, the way a printed rule breaks up.
      'vw-timeline-line': 'repeating-linear-gradient(to bottom, rgba(var(--v-border-color), 0.55) 0 2px, transparent 2px 6px)',
      'vw-timeline-line-width': '1px',
    },
  },
  defaults: [
    {
      VBtn: { variant: 'outlined' },
      VSheet: { border: true },
      VNavigationDrawer: { border: 'e' },
    },
    surfaces({ variant: 'outlined' }),
    fields({ variant: 'outlined' }),
    bars({ flat: true, border: 'b' }),
    {
      // Square hardware rather than Material pills — the switch and the
      // slider should read as parts of a printed form.
      VSwitch: { inset: 'square' },
      VSlider: { thumbSize: 14, trackSize: 2 },
    },
    icons({
      // Outlines throughout: this theme draws with hairlines, and a solid
      // glyph would be the heaviest mark on the page.
      dropdown: 'mdi-chevron-down',
      collapse: 'mdi-chevron-up',
      checkboxOn: 'mdi-checkbox-marked-outline',
      checkboxOff: 'mdi-checkbox-blank-outline',
      ratingFull: 'mdi-star',
      ratingEmpty: 'mdi-star-outline',
      sortAsc: 'mdi-arrow-up',
      sortDesc: 'mdi-arrow-down',
      close: 'mdi-close',
    }),
  ],
})
