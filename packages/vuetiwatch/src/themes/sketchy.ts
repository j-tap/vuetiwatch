import { bars, fields, icons, overlays, ripple, surfaces } from '../util/defaults.js'
import { defineTheme } from '../util/defineTheme.js'

/**
 * A hand-drawn look for mockups and wireframes, after Bootswatch's Sketchy.
 *
 * The whole effect rests on one trick: an asymmetric `border-radius` with
 * wildly different horizontal and vertical radii reads as a wobbly pen
 * stroke. Vuetify passes `variables` through verbatim, so the full
 * multi-value syntax rides in on the same `--v-vw-radius` every other theme
 * uses — no new plumbing.
 */
export const sketchy = defineTheme({
  name: 'sketchy',
  meta: {
    title: 'Sketchy',
    description: 'Hand-drawn wobble and pencil greys — for mockups, wireframes and mirth.',
    dark: false,
    iconStyle: 'outline',
    swatch: ['#FFFEF7', '#FFFFFF', '#333333', '#7A6A55'],
    fonts: ['Neucha', 'Cabin Sketch'],
  },
  theme: {
    dark: false,
    colors: {
      background: '#FFFEF7',
      surface: '#FFFFFF',
      'surface-bright': '#FFFFFF',
      'surface-light': '#F5F2E8',
      'surface-variant': '#333333',
      'on-surface-variant': '#FFFEF7',
      primary: '#333333',
      'primary-darken-1': '#111111',
      secondary: '#7A6A55',
      'secondary-darken-1': '#5C4F3E',
      error: '#C0392B',
      info: '#2E6DA4',
      success: '#3D8B54',
      warning: '#C98A15',
      'on-surface': '#2B2B2B',
      'on-background': '#2B2B2B',
      // Vuetify picks the label colour by luminance and settles for
      // about 3:1, which is the bar for large text rather than for a
      // button label. Measured on the filled buttons: success 4.2:1 → 5:1, warning 2.9:1 → 4.8:1.
      'on-success': '#000000',
      'on-warning': '#2B2B2B',
    },
    variables: {
      /* A panel standing on its own — a bare list, sheet, banner or table.
         Core owns the selector; this is what it draws with. */
      'vw-panel-border':
        'var(--v-vw-border-width) solid rgba(var(--v-border-color), 0.7)',
      'border-color': '#2B2B2B',
      'border-opacity': 0.85,
      'high-emphasis-opacity': 0.95,
      'medium-emphasis-opacity': 0.7,
      'hover-opacity': 0.06,
      'font-body': "'Neucha', 'Comic Sans MS', cursive, sans-serif",
      'font-heading': "'Cabin Sketch', 'Neucha', cursive",
      // Two wobbles, each scaled to its element: a 255px radius on a 36px
      // button gets clamped back into a pill, so buttons get a smaller one
      // and only cards are big enough to carry the full stroke.
      'vw-radius': '22px 5px 20px 6px / 6px 20px 5px 22px',
      'vw-radius-lg': '255px 15px 225px 15px / 15px 225px 15px 255px',
      'vw-radius-thumb': '7px 2px 6px 3px / 3px 6px 2px 7px',
      'vw-radius-chip': '18px 42px 18px 42px / 42px 18px 42px 18px',
      'vw-border-width': '2px',
      'vw-btn-transform': 'none',
      'vw-btn-tracking': '0.02em',
      'vw-btn-weight': '400',
      'vw-tab-slider-height': '3px',

      // Drawn frame by frame, like the rest of it.
      'vw-motion-duration': '120ms',
      'vw-motion-ease': 'steps(2, end)',
      'vw-press-scale': '0.97',
      'vw-pop-scale': '1.25',
      'vw-pop-duration': '200ms',

      /**
       * Overlays opt out of the stepped easing above.
       *
       * Two frames read as a drawn line on a control the size of a button;
       * on a panel the size of the screen the hold between them reads as a
       * dropped frame, which is the same thing that made `brutalist` look
       * like it had hung. The steps stay where they are small enough to be
       * charm — the press, the hover, the icon pop.
       */
      'vw-overlay-duration': '140ms',
      'vw-overlay-exit': '100ms',
      'vw-overlay-ease': 'ease-out',
      // Marker on paper: a state is a scribble over the shape, not a tint.
      'focus-opacity': 0.2,
      'activated-opacity': 0.15,

      // Pencil in `primary`, so the highlighter is the second colour and
      // drawn heavier than elsewhere — a marker, not a tint.
      'vw-selection-fill': 'rgba(var(--v-theme-secondary), 0.35)',

      // Dashes of uneven length, as if drawn in one pass.
      'vw-timeline-line': 'repeating-linear-gradient(to bottom, rgba(var(--v-border-color), 0.7) 0 7px, transparent 7px 11px, rgba(var(--v-border-color), 0.7) 11px 15px, transparent 15px 23px)',
      'vw-timeline-line-width': '2px',
    },
  },
  defaults: [
    {
      VBtn: { variant: 'outlined' },
      VSheet: { border: true },
      VNavigationDrawer: { border: 'e' },
      VSwitch: { inset: 'square' },
      VSlider: { thumbSize: 18, trackSize: 4 },
    },
    surfaces({ variant: 'outlined' }),
    fields({ variant: 'outlined' }),
    bars({ flat: true, border: 'b' }),
    icons({
      // A drawn box with a marker tick scrawled over it, rather than the
      // tidy printed checkbox.
      dropdown: 'mdi-chevron-down',
      collapse: 'mdi-chevron-up',
      checkboxOn: 'mdi-check-bold',
      checkboxOff: 'mdi-square-outline',
      ratingFull: 'mdi-star',
      ratingEmpty: 'mdi-star-outline',
      close: 'mdi-close-thick',
    }),
    // Two frames, like everything else here: the panel is drawn in.
    overlays({
      dialog: 'scale-transition',
      menu: 'fade-transition',
      tooltip: 'fade-transition',
    }),
    // Nothing in a pencil mock-up ripples.
    ripple(false),
  ],
})
