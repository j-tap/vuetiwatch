import { bars, controls, fields, icons, tables } from '../util/defaults.js'
import { defineTheme } from '../util/defineTheme.js'

/**
 * The product-dark theme every developer tool converged on: near-black,
 * hairline edges, tight radii, and no shadow anywhere. Depth comes from a
 * lighter surface and a one-pixel line, which is why it stays legible on a
 * dense screen where a stack of drop shadows would turn to mud.
 *
 * The accent is the restraint: `primary` is a near-white, so the one filled
 * button on a screen is the brightest thing on it, and indigo sits in
 * `secondary` for the places that want a hue. The status colours stay
 * saturated — they are the only signal that has to survive a glance.
 */
export const graphite = defineTheme({
  name: 'graphite',
  meta: {
    title: 'Graphite',
    description: 'Product dark — near-black, hairline edges, no shadows, mono labels.',
    dark: true,
    iconStyle: 'outline',
    swatch: ['#0A0B0D', '#121417', '#EDEFF2', '#4D64FF'],
    fonts: ['Inter', 'JetBrains Mono'],
  },
  theme: {
    dark: true,
    colors: {
      background: '#0A0B0D',
      surface: '#121417',
      'surface-bright': '#1B1E23',
      'surface-light': '#16191D',
      'surface-variant': '#C3C9D4',
      'on-surface-variant': '#0F1114',
      primary: '#EDEFF2',
      'primary-darken-1': '#C9CDD4',
      secondary: '#4D64FF',
      'secondary-darken-1': '#5D6FE8',
      error: '#F2555A',
      info: '#5AA9F0',
      success: '#3FCF8E',
      warning: '#E8B03D',
      'on-surface': '#E6E9ED',
      'on-background': '#E6E9ED',
      // Vuetify picks the label colour by luminance and settles for
      // about 3:1, which is the bar for large text rather than for a
      // button label. Measured on the filled buttons: info 2.5:1 → 8.4:1, error 3.4:1 → 6.2:1.
      'on-info': '#000000',
      'on-error': '#000000',
    },
    variables: {
      /* A panel standing on its own — a bare list, sheet, banner or table.
         Core owns the selector; this is what it draws with. */
      'vw-panel-border':
        '1px solid rgba(var(--v-border-color), var(--v-border-opacity))',
      'border-color': '#9AA4B5',
      'border-opacity': 0.12,
      'shadow-color': '#000000',
      'high-emphasis-opacity': 0.95,
      'medium-emphasis-opacity': 0.6,
      'hover-opacity': 0.045,
      'font-body': "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
      // Four pixels is the smallest corner that still reads as intentional
      // rather than as an unstyled input.
      'vw-radius': '4px',
      'vw-radius-lg': '8px',
      'vw-radius-chip': '4px',
      'vw-radius-thumb': '2px',
      'vw-border-width': '1px',
      'vw-btn-transform': 'none',
      'vw-btn-tracking': '0',
      'vw-btn-weight': '500',
      // Display sizes set tight, the way a landing page sets them.
      'vw-heading-weight': '600',
      'vw-heading-tracking': '-0.025em',
      // Table headers as labels, not as titles.
      'vw-th-weight': '500',
      'vw-th-tracking': '0.09em',
      'vw-th-transform': 'uppercase',
      // A table of ids, dates and counts is most of what this theme is for.
      'vw-numeric': 'tabular-nums',
      'vw-tab-slider-height': '2px',
      // Floating surfaces are the one place a shadow survives, and only to
      // separate them from the page — the hairline does the describing.
      'vw-overlay-border': '1px solid rgba(var(--v-border-color), 0.18)',
      'vw-overlay-shadow': '0 16px 40px rgba(0, 0, 0, 0.6)',
      // Product UIs colour their links rather than underlining them.
      'vw-link-decoration': 'none',

      // Instant and linear. Easing describes weight, and nothing here has any.
      'vw-motion-duration': '90ms',
      'vw-motion-ease': 'linear',
      'vw-press-scale': '1',
      'vw-pop-scale': '1.1',
      'vw-pop-duration': '140ms',
      'vw-focus-ring': '1px solid rgba(var(--v-theme-primary), 0.85)',
      'vw-theme-transition': '260ms',

      // Hairline and squared off, like every other edge here.
      'vw-timeline-line': 'rgba(var(--v-border-color), 0.35)',
      'vw-timeline-line-width': '1px',
      'vw-radius-dot': '2px',
      'vw-radius-avatar': '4px',
    },
  },
  defaults: [
    {
      // No ripple anywhere: it is a Material animation about the weight of
      // a surface, and nothing in this theme has any.
      // No `density` here on purpose: Vuetify subtracts it from the size
      // height, and a compact `x-small` button ends up shorter than its
      // own label. The tight geometry comes from the radius instead.
      VBtn: { variant: 'flat', ripple: false },
      VCard: { variant: 'outlined' },
      VAlert: { variant: 'outlined', density: 'compact' },
      VChip: { variant: 'outlined', size: 'small', ripple: false },
      VListItem: { ripple: false },
      VTab: { ripple: false },
      // Flush stacked rows rather than floating panels with gaps.
      VExpansionPanels: { variant: 'accordion' },
      VNavigationDrawer: { border: 'e' },
    },
    fields({ variant: 'outlined', density: 'compact' }),
    controls({ density: 'compact' }),
    tables('compact'),
    bars({ flat: true, border: 'b' }),
    {
      // Controls sized down to the text they sit beside, and squared off
      // to the same 4px the fields and buttons use.
      VSwitch: { inset: 'square' },
      VSlider: { thumbSize: 12, trackSize: 3 },
    },
    icons({
      // One weight of line icon throughout; arrows where a direction is
      // meant, chevrons where a disclosure is.
      dropdown: 'mdi-chevron-down',
      collapse: 'mdi-chevron-up',
      checkboxOn: 'mdi-checkbox-marked',
      checkboxOff: 'mdi-checkbox-blank-outline',
      sortAsc: 'mdi-arrow-up',
      sortDesc: 'mdi-arrow-down',
      next: 'mdi-chevron-right',
      prev: 'mdi-chevron-left',
      first: 'mdi-chevron-double-left',
      last: 'mdi-chevron-double-right',
      clear: 'mdi-close',
      close: 'mdi-close',
      breadcrumbDivider: '/',
    }),
  ],
})
