import { bars, fields, icons, surfaces } from '../util/defaults.js'
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
    },
    variables: {
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
  ],
})
