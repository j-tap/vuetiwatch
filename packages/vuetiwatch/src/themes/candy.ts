import { bars, controls, fields, icons } from '../util/defaults.js'
import { defineTheme } from '../util/defineTheme.js'

/**
 * The plush theme: a warm cream ground and padded, pillowy shapes that
 * squash under a press rather than click.
 *
 * The palette follows what the research on children's interfaces actually
 * finds, which is not the pastel wash the phrase "for kids" suggests.
 * Children are drawn to high brightness, and the apps they stay in
 * (Duolingo, Khan Academy Kids) run saturated accents rather than pastels.
 * But a screen where everything shouts hides which parts are tappable, so
 * the loud colours are spent only on controls: a light neutral ground, one
 * dominant hue, a small accent — roughly the 60/30/10 the guides recommend.
 * Warm hues test slightly ahead of cool ones, hence raspberry over blue,
 * with mint holding the secondary so the status colours stay apart from it.
 *
 * Body text is a deep plum-brown rather than the palette's own pink: the
 * one thing parents notice is whether they can read the screen, and this
 * carries about 12:1 on the cream.
 */
export const candy = defineTheme({
  name: 'candy',
  meta: {
    title: 'Candy',
    description: 'Plush and pillowy — warm cream, padded shapes, controls that squash.',
    dark: false,
    iconStyle: 'filled',
    swatch: ['#FFF3EC', '#FFFCFA', '#DC2B6B', '#10837C'],
    fonts: ['Baloo 2', 'Varela Round'],
  },
  theme: {
    dark: false,
    colors: {
      background: '#FFF3EC',
      // Off-white rather than white: cloth catches light, gloss reflects it.
      surface: '#FFFCFA',
      'surface-bright': '#FFFFFF',
      'surface-light': '#FFE6EE',
      'surface-variant': '#5A3340',
      'on-surface-variant': '#FFF6F0',
      primary: '#DC2B6B',
      'primary-darken-1': '#C43668',
      secondary: '#10837C',
      'secondary-darken-1': '#0C7C75',
      error: '#E5484D',
      info: '#3B8FE5',
      success: '#2FA96B',
      warning: '#F2A32C',
      'on-surface': '#46262F',
      'on-background': '#46262F',
      // Vuetify picks the label colour by luminance and settles for
      // about 3:1, which is the bar for large text rather than for a
      // button label. Measured on the filled buttons: success 3:1 → 7:1, info 3.4:1 → 6.2:1, error 3.9:1 → 5.4:1.
      'on-success': '#000000',
      'on-info': '#000000',
      'on-error': '#000000',
      'on-warning': '#3B2600',
    },
    variables: {
      'border-color': '#DC2B6B',
      'border-opacity': 0.12,
      'shadow-color': '#C2537E',
      'high-emphasis-opacity': 0.92,
      'medium-emphasis-opacity': 0.66,
      'hover-opacity': 0.07,
      'font-body': "'Varela Round', 'Nunito', system-ui, sans-serif",
      'font-heading': "'Baloo 2', 'Varela Round', system-ui, sans-serif",
      'vw-radius': '20px',
      'vw-radius-lg': '30px',
      // Buttons and chips are lozenges; everything else is generously round.
      'vw-radius-btn': '999px',
      'vw-radius-chip': '999px',
      'vw-radius-thumb': '50%',
      // Outlined variants draw a crayon-thick line rather than a hairline.
      'vw-border-width': '2px',
      'vw-btn-transform': 'none',
      'vw-btn-tracking': '0',
      'vw-btn-weight': '700',
      'vw-heading-weight': '700',
      'vw-heading-tracking': '0',
      'vw-tab-slider-height': '4px',
      'vw-list-bar': '4px',
      'vw-list-bar-color': 'rgb(var(--v-theme-primary))',
      // A wobbly underline reads as drawn by hand rather than by a browser.
      'vw-link-decoration': 'underline wavy',
      'vw-overlay-shadow': '0 18px 44px rgba(var(--v-shadow-color), 0.22)',

      // A spring that overshoots: the press squashes, the pop lands loud.
      'vw-motion-duration': '220ms',
      'vw-motion-ease': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      'vw-press-scale': '0.98',
      'vw-press-shift': '2px',
      'vw-hover-lift': '4px',
      'vw-pop-scale': '1.35',
      'vw-pop-duration': '320ms',
      'vw-focus-ring': '3px solid rgb(var(--v-theme-primary))',
      'vw-focus-offset': '3px',
      'vw-theme-transition': '480ms',

      // A fat ribbon with rounded ends — see the stylesheet.
      'vw-timeline-line': 'rgba(var(--v-theme-primary), 0.3)',
      'vw-timeline-line-width': '6px',
    },
  },
  defaults: [
    {
      // Large by default: the hit area is the accessibility story of a
      // children's app, and a pill that small fingers miss is not cute.
      VBtn: { variant: 'flat', size: 'large' },
      VCard: { variant: 'elevated', elevation: 0 },
      VAlert: { variant: 'tonal' },
      VChip: { variant: 'tonal' },
    },
    fields({ variant: 'solo-filled', flat: true, density: 'comfortable' }),
    controls({ density: 'comfortable' }),
    bars({ flat: true }),
    {
      VSwitch: { inset: true },
      VSlider: { thumbSize: 26, trackSize: 12 },
      // A pill behind the active tab, matching the buttons.
      VTabs: { inset: true, insetRadius: 999 },
    },
    icons({
      // Round, filled and unmistakable — no square boxes anywhere.
      dropdown: 'mdi-chevron-down',
      collapse: 'mdi-chevron-up',
      checkboxOn: 'mdi-checkbox-marked-circle',
      checkboxOff: 'mdi-circle-outline',
      radioOn: 'mdi-circle-slice-8',
      radioOff: 'mdi-circle-outline',
      ratingFull: 'mdi-star',
      ratingEmpty: 'mdi-star-outline',
      clear: 'mdi-close-circle',
      close: 'mdi-close-circle',
      next: 'mdi-chevron-right',
      prev: 'mdi-chevron-left',
      breadcrumbDivider: '•',
    }),
  ],
})
