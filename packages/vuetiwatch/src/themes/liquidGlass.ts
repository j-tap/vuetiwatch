import { bars, combine, controls, fields, icons, tables } from '../util/defaults.js'
import { defineTheme } from '../util/defineTheme.js'

/**
 * Glass that refracts rather than merely blurs, after Apple's iOS 26
 * language.
 *
 * Four things carry it, and dropping any one is what makes an imitation
 * read as generic frosting:
 *
 *   - Capsules. Every control is fully rounded; it is the shape cue people
 *     recognise before they register anything else.
 *   - SF. `-apple-system` comes first in the stack, so the theme renders in
 *     the real typeface on Apple hardware and falls back to Inter elsewhere.
 *   - Light-mode system colours. `#007AFF` and friends — the `#0A84FF` set
 *     belongs to dark mode and reads far too electric on a light ground.
 *   - A calm ground. The stylesheet washes `v-app` in two adjacent hues,
 *     because translucency over nothing is just grey, and translucency over
 *     a rainbow is a mess.
 */
export const liquidGlass = defineTheme({
  name: 'liquidGlass',
  meta: {
    title: 'Liquid Glass',
    description: 'Capsule controls and refracting panes over a calm wash, after iOS 26.',
    dark: false,
    swatch: ['#F2F2F7', '#FFFFFF', '#007AFF', '#5856D6'],
    fonts: ['Inter'],
  },
  theme: {
    dark: false,
    colors: {
      // systemGroupedBackground over systemBackground, as iOS pairs them.
      background: '#F2F2F7',
      surface: '#FFFFFF',
      'surface-bright': '#FFFFFF',
      'surface-light': '#F7F7FA',
      'surface-variant': '#3A3A3C',
      'on-surface-variant': '#F2F2F7',
      primary: '#007AFF',
      'primary-darken-1': '#0062CC',
      secondary: '#5856D6',
      'secondary-darken-1': '#4341B5',
      error: '#FF3B30',
      info: '#007AFF',
      success: '#34C759',
      warning: '#FF9500',
      'on-surface': '#1C1C1E',
      'on-background': '#1C1C1E',
      'on-success': '#06140A',
      'on-warning': '#1A1004',
    },
    variables: {
      'border-color': '#3A3A3C',
      // iOS separators are hairlines, not borders.
      'border-opacity': 0.1,
      'shadow-color': '#1B3A6B',
      'high-emphasis-opacity': 0.92,
      'medium-emphasis-opacity': 0.6,
      'hover-opacity': 0.04,
      'font-body': "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', system-ui, sans-serif",
      'font-heading': "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', system-ui, sans-serif",
      'vw-radius': '12px',
      // Capsule controls, but through the variable rather than the
      // `rounded` prop — that would leak into button groups and split a
      // segmented control back into separate pills.
      'vw-radius-btn': '999px',
      'vw-radius-lg': '22px',
      'vw-radius-chip': '999px',
      'vw-border-width': '1px',
      'vw-btn-transform': 'none',
      'vw-btn-tracking': '0',
      'vw-btn-weight': '590',
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
    controls({ density: 'comfortable' }),
    tables('comfortable'),
    bars({ flat: true }),
    icons({
      // Chevrons everywhere, as SF does, and the clear affordance is the
      // filled circle iOS puts inside a field.
      dropdown: 'mdi-chevron-down',
      collapse: 'mdi-chevron-up',
      next: 'mdi-chevron-right',
      prev: 'mdi-chevron-left',
      checkboxOn: 'mdi-check-circle',
      checkboxOff: 'mdi-circle-outline',
      ratingFull: 'mdi-star',
      ratingEmpty: 'mdi-star-outline',
      clear: 'mdi-close-circle',
      close: 'mdi-close-circle',
      sortAsc: 'mdi-chevron-up',
      sortDesc: 'mdi-chevron-down',
    }),
  ),
})

export default liquidGlass
