import { bars, controls, fields, icons, overlays, ripple, tables } from '../util/defaults.js'
import { defineTheme } from '../util/defineTheme.js'

/**
 * Restraint as decoration: hairline rules, wide letter-spacing, small caps
 * on anything interactive, and a single muted gold. The only theme here
 * whose character is carried almost entirely by typography and spacing
 * rather than colour or shape.
 */
export const lux = defineTheme({
  name: 'lux',
  meta: {
    title: 'Lux',
    description: 'Editorial luxury — hairline rules, wide tracking, small caps and muted gold.',
    dark: false,
    iconStyle: 'outline',
    swatch: ['#FFFFFF', '#FAFAFA', '#1A1A1A', '#88733F'],
    fonts: ['Jost'],
  },
  theme: {
    dark: false,
    colors: {
      background: '#FFFFFF',
      surface: '#FFFFFF',
      'surface-bright': '#FFFFFF',
      'surface-light': '#F7F7F5',
      'surface-variant': '#1A1A1A',
      'on-surface-variant': '#FFFFFF',
      primary: '#1A1A1A',
      'primary-darken-1': '#000000',
      secondary: '#88733F',
      'secondary-darken-1': '#8F7A45',
      error: '#96322A',
      info: '#3D5A73',
      success: '#4A6B4F',
      /**
       * Deepened rather than re-inked. Vuetify picks the label colour by
       * APCA and settles for about 3:1 on WCAG, which is the bar for large
       * text rather than for a button label — so this theme states `on-*`
       * wherever the automatic pick falls short.
       *
       * Warning is the case where doing that made things worse. The ochre
       * sat where WCAG wanted black and APCA wanted white by a wide margin
       * (73 to 37), and the forced dark label did not even clear 4.5:1
       * (4.49:1). Taking 9 per cent of lightness out of the hue satisfies both:
       * white now reads 4.56:1 on the filled button, APCA 79, and the colour
       * as text on the surface goes from 3.88:1 — under the bar it was
       * being held to elsewhere — to 4.56:1. The label is left to the
       * automatic pick, which is white.
       */
      warning: '#996E1B',
      'on-surface': '#1A1A1A',
      'on-background': '#1A1A1A',
    },
    variables: {
      /* A panel standing on its own — a bare list, sheet, banner or table.
         Core owns the selector; this is what it draws with. */
      'vw-panel-border':
        'var(--v-vw-border-width) solid rgba(var(--v-border-color), var(--v-border-opacity))',
      'border-color': '#1A1A1A',
      'border-opacity': 0.14,
      'high-emphasis-opacity': 0.88,
      'medium-emphasis-opacity': 0.55,
      'hover-opacity': 0.03,
      'font-body': "'Jost', 'Futura', system-ui, sans-serif",
      'vw-radius': '0px',
      'vw-radius-lg': '0px',
      'vw-radius-thumb': '0px',
      'vw-radius-chip': '0px',
      'vw-border-width': '1px',
      'vw-btn-transform': 'uppercase',
      'vw-btn-tracking': '0.2em',
      'vw-btn-weight': '400',
      'vw-heading-weight': '300',
      'vw-heading-tracking': '0.06em',
      'vw-heading-transform': 'uppercase',
      'vw-list-bar': '2px',
      'vw-list-bar-color': 'rgb(var(--v-theme-secondary))',
      'vw-tab-slider-height': '1px',

      // Expensive things move slowly and stop exactly where they meant to.
      'vw-motion-duration': '240ms',
      'vw-motion-ease': 'cubic-bezier(0.2, 0, 0, 1)',
      'vw-press-scale': '0.995',
      'vw-hover-lift': '2px',
      'vw-pop-scale': '1.08',
      'vw-pop-duration': '220ms',
      'vw-focus-ring': '1px solid rgb(var(--v-theme-primary))',
      'vw-theme-transition': '520ms',

      // The same unhurried curve the rest of the theme moves on.
      'vw-overlay-duration': '240ms',
      'vw-overlay-exit': '180ms',
      // Restraint applies to states too: an outline and a hairline of
      // wash, never a block of colour.
      'focus-opacity': 0.12,
      'activated-opacity': 0.08,
      'disabled-opacity': 0.35,
      /**
       * A tab is a label in this theme, set at the same size as the caps on
       * the buttons rather than at Vuetify's body-sized default — the wide
       * tracking below needs the smaller size to stay a line and not a
       * heading.
       */
      'vw-tab-size': '0.75rem',
      /**
       * Initials set small inside a generous circle: the air around a mark
       * is the whole point of the register this theme is written in.
       */
      'vw-avatar-ratio': '0.34',

      // Ink again in `primary`, so the highlight is the theme's gold —
      // the one flourish it allows itself, spent where a reader drags.
      'vw-selection-fill': 'rgba(var(--v-theme-secondary), 0.25)',

      // A gold hairline; the dot stays a circle.
      'vw-timeline-line': 'rgba(var(--v-theme-primary), 0.55)',
      'vw-timeline-line-width': '1px',
    },
  },
  defaults: [
    {
      VBtn: { variant: 'outlined', size: 'large' },
      VCard: { variant: 'outlined' },
      VAlert: { variant: 'outlined' },
      VChip: { variant: 'outlined' },
      VNavigationDrawer: { border: 'e' },
      VSwitch: { inset: 'square' },
      VSlider: { thumbSize: 12, trackSize: 1 },
    },
    fields({ variant: 'underlined' }),
    controls({ density: 'comfortable' }),
    tables('comfortable'),
    bars({ flat: true, border: 'b' }),
    icons({
      dropdown: 'mdi-chevron-down',
      collapse: 'mdi-chevron-up',
      checkboxOn: 'mdi-checkbox-marked-outline',
      checkboxOff: 'mdi-checkbox-blank-outline',
      ratingFull: 'mdi-star',
      ratingEmpty: 'mdi-star-outline',
      sortAsc: 'mdi-arrow-up',
      sortDesc: 'mdi-arrow-down',
      close: 'mdi-close',
      // An em dash rather than a slash — the one flourish the theme allows.
      breadcrumbDivider: '—',
    }),
    // Expensive things do not bounce. They fade, slowly, and stop.
    overlays({
      dialog: 'fade-transition',
      menu: 'fade-transition',
      tooltip: 'fade-transition',
    }),
    // Material's ink blot is the loudest thing this theme could do.
    ripple(false),
  ],
})
