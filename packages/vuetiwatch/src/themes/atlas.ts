import type { VuetiwatchAccent, VuetiwatchDefaults } from '../types.js'
import { bars, controls, fields, icons, overlays, ripple, tables } from '../util/defaults.js'
import { defineTheme } from '../util/defineTheme.js'

/**
 * The admin theme, and the first one here that comes as a family: `atlas`,
 * `atlasDark` and `atlasSepia` share every measurement and differ only in
 * ground, so an app can offer all three and change nothing but the name.
 *
 * It is built for the screen a person keeps open all day. Where `slate`
 * packs a dashboard tight and `graphite` states a product's opinion, this
 * one gets out of the way: comfortable density rather than compact, one
 * low-chroma accent, hairlines instead of shadows, and no capitals, glow or
 * texture anywhere. Nothing on the screen competes with the data on it.
 *
 * Exported alongside the theme are the parts the other two variants reuse —
 * they are the family, not three lookalikes maintained in parallel.
 */

/**
 * The accents the family offers, one row per preset and one column per
 * ground. A light ground needs a deep accent to carry a white label; a dark
 * one needs a light accent and a dark label — the Material 3 pairing — so
 * the same preset is a different hex in each variant, and the id is what
 * ties them together when someone switches.
 *
 * Every value here is measured: filled controls clear 4.5:1 in all three.
 */
const ACCENTS = [
  { id: 'cobalt', title: 'Cobalt', light: ['#0059FF', '#0047CC'], dark: ['#3382FF', '#2A6BD6'], sepia: ['#1150E0', '#0E41B4'] },
  { id: 'indigo', title: 'Indigo', light: ['#3F4E8C', '#323E70'], dark: ['#93A4E8', '#7688D1'], sepia: ['#46508A', '#37406E'] },
  { id: 'eucalyptus', title: 'Eucalyptus', light: ['#2F6B5B', '#245448'], dark: ['#6FB39B', '#57957F'], sepia: ['#3F6B57', '#325544'] },
  { id: 'plum', title: 'Plum', light: ['#6B3F63', '#55324F'], dark: ['#C596BC', '#A87A9F'], sepia: ['#6B4560', '#56374D'] },
  { id: 'clay', title: 'Clay', light: ['#8A5B2B', '#6E4822'], dark: ['#D9A272', '#BC855A'], sepia: ['#8A5B34', '#6E4829'] },
] as const

/** The accent list for one ground, in the shape `meta.accents` expects. */
export const atlasAccents = (tone: 'light' | 'dark' | 'sepia'): VuetiwatchAccent[] =>
  ACCENTS.map(accent => {
    const [primary, darken] = accent[tone]

    return {
      id: accent.id,
      title: accent.title,
      colors: {
        primary,
        'primary-darken-1': darken,
        // On a dark ground the accent is the light thing on screen, so its
        // label is the ground itself rather than white.
        ...(tone === 'dark' ? { 'on-primary': '#15191B' } : {}),
      },
    }
  })

/** Geometry, type and motion. Identical across the family. */
export const atlasVariables = {
  'high-emphasis-opacity': 0.88,
  'medium-emphasis-opacity': 0.6,
  'hover-opacity': 0.04,
  'font-body': "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
  // Eight and ten, which is where the admin frameworks people actually
  // like have settled: tight enough to read as a tool, round enough not to
  // look like a spreadsheet.
  'vw-radius': '8px',
  'vw-radius-lg': '10px',
  'vw-radius-chip': '6px',
  'vw-radius-thumb': '50%',
  'vw-border-width': '1px',
  // A field's outline is how you find the field: 0.5 puts it just past 3:1
  // on all three grounds, where Vuetify's 0.38 leaves it at about 2.3.
  'vw-field-border-opacity': '0.5',
  'vw-btn-transform': 'none',
  'vw-btn-tracking': '0',
  'vw-btn-weight': '500',
  'vw-heading-weight': '600',
  'vw-heading-tracking': '-0.025em',
  // Column headers are labels, not announcements: weight and a little
  // tracking, no capitals. Three themes here already shout in their tables.
  'vw-th-weight': '500',
  'vw-th-tracking': '0.03em',
  // An admin screen is mostly figures, and figures only line up in a column
  // when every digit is the same width.
  'vw-numeric': 'tabular-nums',
  'vw-tab-slider-height': '2px',
  'vw-list-bar': '2px',
  'vw-list-bar-color': 'rgb(var(--v-theme-primary))',
  // Quiet, quick, and no overshoot — the motion of something you look at
  // for eight hours rather than something you show off.
  'vw-motion-duration': '160ms',
  'vw-motion-ease': 'cubic-bezier(0.2, 0, 0.2, 1)',
  'vw-press-scale': '0.99',
  'vw-hover-lift': '1px',
  'vw-pop-scale': '1.08',
  'vw-pop-duration': '180ms',
  'vw-theme-transition': '320ms',
  /**
   * Overlays move at the same speed as everything else, which Vuetify's
   * own 300ms fade does not. A menu opened two hundred times a day is the
   * one surface where the difference between 140ms and 300ms stops being
   * taste and becomes lag; the exit is quicker still, because a panel on
   * its way out is already answered and only has to get off the screen.
   */
  'vw-overlay-duration': '140ms',
  'vw-overlay-exit': '100ms',

  /**
   * Keyboard focus, four times the hover it has to be told apart from.
   * Vuetify's 0.12 against a 0.04 hover is a difference you have to look
   * for, and the person driving an admin panel from the keyboard is the
   * one who cannot afford to.
   */
  'focus-opacity': 0.16,
  /**
   * The tonal fill under chips and alerts — this theme's whole status
   * vocabulary, and it carries it at `size="small"` and `density="compact"`
   * where Vuetify's 0.12 thins out to nearly nothing.
   */
  'activated-opacity': 0.14,
  /**
   * A form here disables half its fields depending on the other half, so
   * "off" has to stay readable rather than dissolve. Vuetify's 0.38 puts a
   * label under 3:1 on this ground; 0.45 keeps it legible and still
   * unmistakably inactive.
   */
  'disabled-opacity': 0.45,
  /**
   * A table waiting on its data is an everyday sight here, not an edge
   * case. Vuetify derives the block from `border-opacity`, which at 0.22
   * draws a row of grey slabs heavier than the data they stand in for.
   */
  'vw-skeleton-opacity': '0.09',
} as const

/** Component defaults. Identical across the family. */
export const atlasDefaults: VuetiwatchDefaults[] = [
  {
    VBtn: { variant: 'flat' },
    VCard: { variant: 'outlined' },
    VAlert: { variant: 'tonal', density: 'compact' },
    VChip: { variant: 'tonal', size: 'small' },
    VNavigationDrawer: { border: 'e' },
    // A row that lights under the cursor is the cheapest way to keep a
    // place in a table of a hundred lines.
    VDataTable: { hover: true },
    /**
     * The picker's 70px header repeats the date it is already showing —
     * it exists for the full-screen dialog on a phone. In a form beside a
     * labelled field it is a third of the control's height saying nothing.
     */
    VDatePicker: { hideHeader: true },
    VTimePicker: { hideHeader: true },
    // Vuetify draws the empty-state glyph at 96px, which is a poster on a
    // panel this size. Enough to read as an illustration, not as a banner.
    VEmptyState: { size: 56 },
    /**
     * A segmented control is one object, not a row of raised buttons: a
     * hairline box with the chosen segment filled. Vuetify's default leaves
     * each button floating on its own elevation.
     */
    VBtnToggle: { variant: 'outlined', divided: true, density: 'compact' },
    // Flush stacked rows rather than floating panels with gaps: a settings
    // page is a list of settings, not a deck of cards.
    VExpansionPanels: { variant: 'accordion' },
    /**
     * Half the controls on a console are icon-only, so a tooltip fires
     * every time the cursor crosses the toolbar on its way somewhere else.
     * A short wait means the tip appears when it was wanted and stays out
     * of the way when it was not.
     */
    VTooltip: { openDelay: 400 },
  },
  /**
   * Nothing travels. A dropdown you open all day should not slide into
   * place before it can be read, a dialog holds a form you start filling
   * the moment it lands, and a tooltip that scales is a word changing size
   * while you read it. Fading is the only motion here that does not ask to
   * be waited out — and at 140ms it is barely motion at all.
   */
  overlays({
    dialog: 'fade-transition',
    menu: 'fade-transition',
    tooltip: 'fade-transition',
  }),
  /**
   * No ripple. It is an animation about the weight of a surface, and this
   * theme draws none — but the real cost is that it puts 300ms of spreading
   * ink between a click and the look of an answer, on the screen where that
   * click gets repeated all day.
   */
  ripple(false),
  // Compact throughout: an admin screen is a working surface, and a field
  // at Vuetify's default height is a third taller than the row it sits in.
  fields({ variant: 'outlined', density: 'compact' }),
  controls({ density: 'compact' }),
  tables('compact'),
  bars({ flat: true, border: 'b', height: 56 }),
  {
    // Not inset: the pill is 52×32 where the plain switch is 36×14, and on
    // a row of settings that difference is the whole line height.
    VSwitch: { inset: false },
    VSlider: { thumbSize: 14, trackSize: 3 },
  },
  icons({
    dropdown: 'mdi-chevron-down',
    collapse: 'mdi-chevron-up',
    checkboxOn: 'mdi-checkbox-marked-outline',
    checkboxOff: 'mdi-checkbox-blank-outline',
    sortAsc: 'mdi-arrow-up',
    sortDesc: 'mdi-arrow-down',
    next: 'mdi-chevron-right',
    prev: 'mdi-chevron-left',
    first: 'mdi-page-first',
    last: 'mdi-page-last',
    clear: 'mdi-close',
    close: 'mdi-close',
  }),
]

export const atlas = defineTheme({
  name: 'atlas',
  meta: {
    title: 'Atlas',
    description: 'Console light — a white page, hairline panels and one blue that means "do it".',
    dark: false,
    iconStyle: 'outline',
    family: 'atlas',
    variant: 'Light',
    accents: atlasAccents('light'),
    swatch: ['#FDFDFF', '#FFFFFF', '#0059FF', '#57647B'],
    fonts: ['Inter'],
  },
  theme: {
    dark: false,
    colors: {
      /**
       * The ground is white, not grey. Consoles built this decade separate
       * a panel from the page with a line, not with a tint — the tint is
       * saved for the bands inside a panel, which is what `surface-light`
       * is here: table headers, filled rows, the sidebar.
       */
      background: '#FDFDFF',
      surface: '#FFFFFF',
      'surface-bright': '#FFFFFF',
      // The reference uses this tint at a third of its strength — `bg-muted/30`
      // — so the bands read as a change of paper, not as a coloured stripe.
      'surface-light': '#F5F8FD',
      'surface-variant': '#0B101C',
      'on-surface-variant': '#FDFDFF',
      primary: '#0059FF',
      'primary-darken-1': '#0047CC',
      secondary: '#57647B',
      'secondary-darken-1': '#45505F',
      error: '#D91326',
      info: '#0369A1',
      success: '#15803D',
      warning: '#B45309',
      'on-surface': '#0B101C',
      'on-background': '#0B101C',
    },
    variables: {
      /**
       * A cool grey line rather than ink at low alpha: ink fades to a
       * neutral grey, and every line here should carry the same blue cast
       * as the surfaces it separates. At 0.22 it lands on #DFE3EB, a shade
       * off the panel it edges.
       */
      'border-color': '#6E82A6',
      'border-opacity': 0.22,
      'shadow-color': '#0B101C',
      'vw-overlay-border': '1px solid rgba(var(--v-border-color), 0.1)',
      'vw-overlay-shadow': '0 8px 28px rgba(var(--v-shadow-color), 0.1)',
      /**
       * Ids, tokens and shortcuts are what an admin panel is full of, and
       * Vuetify draws both on a grey that belongs to no theme. They take
       * the same tinted band the table headers and filled rows use, so a
       * key cap reads as part of the panel rather than pasted onto it.
       */
      'theme-code': '#F5F8FD',
      'theme-on-code': '#0B101C',
      'theme-kbd': '#F5F8FD',
      'theme-on-kbd': '#0B101C',
      ...atlasVariables,
    },
  },
  defaults: atlasDefaults,
})
