import { bars, fields, icons, overlays, ripple, surfaces, tables } from '../util/defaults.js'
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
      // Vuetify picks the label colour by luminance and settles for
      // about 3:1, which is the bar for large text rather than for a
      // button label. Measured on the filled buttons: error 3.5:1 → 6:1.
      'on-error': '#000000',
      'on-primary': '#05060A',
      'on-secondary': '#05060A',
      'on-success': '#05060A',
      'on-warning': '#05060A',
    },
    variables: {
      /* A panel standing on its own — a bare list, sheet, banner or table.
         Core owns the selector; this is what it draws with. */
      'vw-panel-border':
        'var(--v-vw-border-width) solid rgba(var(--v-theme-primary), 0.35)',
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
      // A terminal has no round corners, not even on an icon button.
      'vw-radius-icon-btn': '0px',
      'vw-border-width': '1px',
      'vw-btn-transform': 'uppercase',
      'vw-btn-tracking': '0.12em',
      'vw-btn-weight': '600',
      'vw-heading-tracking': '0.04em',
      'vw-heading-transform': 'uppercase',
      'vw-list-bar': '2px',
      'vw-list-bar-color': 'rgb(var(--v-theme-primary))',
      'vw-tab-slider-height': '3px',

      // A terminal repaints; it does not ease.
      'vw-motion-duration': '110ms',
      'vw-motion-ease': 'linear',
      'vw-press-scale': '0.98',
      'vw-pop-scale': '1.2',
      'vw-pop-duration': '150ms',
      'vw-focus-ring': '2px solid rgb(var(--v-theme-secondary))',
      'vw-theme-transition': '180ms',

      // A terminal repaints; the linear easing above comes along through
      // `--v-vw-motion-ease`, so nothing here accelerates.
      'vw-overlay-duration': '110ms',
      'vw-overlay-exit': '80ms',
      /**
       * Phosphor, not ink: a lit state on this ground has to be visibly
       * lit, and Vuetify's 0.12 disappears into the black.
       */
      'focus-opacity': 0.24,
      'activated-opacity': 0.25,
      // The one theme where a code block is the native register.
      'theme-code': '#04121A',
      'theme-on-code': '#00F0FF',
      'theme-kbd': '#04121A',
      'theme-on-kbd': '#00F0FF',
      // A tab is a label on a terminal chrome, set with the same wide
      // tracking the buttons use and a size that keeps it on one line.
      'vw-tab-size': '0.8125rem',

      /**
       * A terminal selects with a solid block and inverts the glyphs under
       * it, which is also the only way cyan text stays readable once a
       * cyan tint is laid over it.
       */
      'vw-selection-fill': 'rgb(var(--v-theme-primary))',
      'vw-selection-color': 'rgb(var(--v-theme-background))',

      // A lit filament; the glow is in the stylesheet.
      'vw-timeline-line': 'rgb(var(--v-theme-secondary))',
      'vw-timeline-line-width': '2px',
      'vw-radius-dot': '0px',
      'vw-radius-avatar': '0px',
    },
  },
  defaults: [
    {
      VBtn: { variant: 'outlined' },
      VSheet: { border: true },
      VNavigationDrawer: { border: 'e' },
    },
    surfaces({ variant: 'outlined' }),
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
    // A screen repaints: the panel lights up where it stands rather than
    // travelling to get there.
    overlays({
      dialog: 'fade-transition',
      menu: 'fade-transition',
      tooltip: 'fade-transition',
    }),
    // Nothing in a terminal ripples.
    ripple(false),
  ],
})
