import { bars, fields, icons, overlays } from '../util/defaults.js'
import { defineTheme } from '../util/defineTheme.js'

/**
 * Pastel and generous: large radii, diffuse coloured shadows, a rounded
 * grotesque. Reads friendly rather than corporate — consumer apps,
 * onboarding, anything that should not feel like a dashboard.
 */
export const soft = defineTheme({
  name: 'soft',
  meta: {
    title: 'Soft',
    description: 'Pastel palette, large radii and diffuse shadows. Friendly and unhurried.',
    dark: false,
    iconStyle: 'filled',
    swatch: ['#F7F5FF', '#FFFFFF', '#705EEF', '#F08CA8'],
    fonts: ['Nunito'],
  },
  theme: {
    dark: false,
    colors: {
      background: '#F7F5FF',
      surface: '#FFFFFF',
      'surface-bright': '#FFFFFF',
      'surface-light': '#EAE3FF',
      'surface-variant': '#4A4458',
      'on-surface-variant': '#F7F5FF',
      primary: '#705EEF',
      'primary-darken-1': '#5F4DE0',
      secondary: '#F08CA8',
      'secondary-darken-1': '#DB6C8B',
      error: '#F0736E',
      info: '#58B7E8',
      success: '#4FC38A',
      warning: '#F5B851',
      'on-surface': '#2E2A3B',
      'on-background': '#2E2A3B',
      /**
       * The one stated exception in the package, and it is deliberate.
       *
       * White on these pastels does not clear WCAG's 4.5:1 for a button
       * label: secondary 2.33:1, error 2.84:1, info 2.25:1, success 2.21:1,
       * warning 1.77:1. The dark ink that white replaced carried 4.89:1 to
       * 11.86:1, and APCA agrees with WCAG on every one of them — so this
       * is not a case of the two models disagreeing and a hue needing a few
       * points of lightness, which is how every other theme here resolves
       * it. The only arrangement that gets white over the bar takes these
       * hues down 23 to 39 per cent, and a pastel darkened by a third is
       * not a pastel: it would be a different theme wearing this one's name.
       *
       * So the trade is made the other way round, once, in the theme whose
       * whole proposition is softness — and it is a trade, not an oversight.
       * A screen that has to be read by everyone should reach for a theme
       * that measures; `atlas` and `graphite` exist for that, and `soft` is
       * for the onboarding flow and the marketing page where the palette is
       * the point. The README says as much next to the claim it qualifies.
       *
       * `primary` is not listed because it needs no help: at #705EEF white
       * already reads 4.63:1 and is the automatic pick.
       */
      'on-secondary': '#FFFFFF',
      'on-error': '#FFFFFF',
      'on-info': '#FFFFFF',
      'on-success': '#FFFFFF',
      'on-warning': '#FFFFFF',
    },
    variables: {
      /* A panel standing on its own — a bare list, sheet, banner or table.
         Core owns the selector; this is what it draws with. */
      'vw-panel-shadow':
        '0 2px 4px rgba(var(--v-theme-primary), 0.06), 0 12px 28px rgba(var(--v-theme-primary), 0.1)',
      'border-color': '#5F4DE0',
      'border-opacity': 0.1,
      'shadow-color': '#4A3F8C',
      'high-emphasis-opacity': 0.88,
      'medium-emphasis-opacity': 0.62,
      'hover-opacity': 0.06,
      'font-body': "'Nunito', 'Quicksand', system-ui, sans-serif",
      'vw-radius': '14px',
      'vw-radius-lg': '22px',
      'vw-radius-chip': '999px',
      'vw-btn-transform': 'none',
      'vw-btn-tracking': '0',
      'vw-btn-weight': '700',

      // Unhurried, with a little give.
      'vw-motion-duration': '250ms',
      'vw-press-scale': '0.97',
      'vw-hover-lift': '2px',
      'vw-pop-scale': '1.22',
      'vw-pop-duration': '260ms',

      // Unhurried here as well, with the exit a touch quicker so a
      // dismissed panel does not linger.
      'vw-overlay-duration': '250ms',
      'vw-overlay-exit': '180ms',
      // Tonal fills are this theme's colour, so they are drawn to be seen.
      'focus-opacity': 0.14,
      'activated-opacity': 0.14,
      // Bigger initials inside the circle, to match everything else here.
      'vw-avatar-ratio': '0.44',

      // Thick and pastel, matching the radii.
      'vw-timeline-line': 'rgba(var(--v-theme-primary), 0.25)',
      'vw-timeline-line-width': '5px',
    },
  },
  defaults: [
    {
      VBtn: { variant: 'flat' },
      VCard: { variant: 'elevated', elevation: 0 },
      VAlert: { variant: 'tonal' },
      VChip: { variant: 'tonal' },
    },
    fields({ variant: 'solo-filled' }),
    bars({ flat: true }),
    {
      // Everything here rounds off: an inset pill switch, a fat slider, a
      // pill behind the active tab instead of an underline, round tick boxes.
      VSwitch: { inset: true },
      VSlider: { thumbSize: 22, trackSize: 8 },
      // `VTabs` owns its own inset radius, so the theme sets it here
      // rather than through the shared `--v-vw-radius`.
      VTabs: { inset: true, insetRadius: 12 },
    },
    icons({
      // Round and filled, down to hearts instead of stars.
      dropdown: 'mdi-chevron-down',
      collapse: 'mdi-chevron-up',
      checkboxOn: 'mdi-check-circle',
      checkboxOff: 'mdi-circle-outline',
      ratingFull: 'mdi-heart',
      ratingEmpty: 'mdi-heart-outline',
      close: 'mdi-close-circle',
    }),
    /**
     * Friendly rather than efficient: a dialog swells into place, a menu
     * drops from the control that opened it. The ripple stays — this is one
     * of the themes with a surface soft enough to justify it.
     */
    overlays({
      dialog: 'scale-transition',
      menu: 'slide-y-transition',
      tooltip: 'scale-transition',
    }),
  ],
})
