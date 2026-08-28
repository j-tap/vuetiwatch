import { atlasAccents, atlasDefaults, atlasVariables } from './atlas.js'
import { defineTheme } from '../util/defineTheme.js'

/**
 * `atlas` after dark: the same measurements, the same accent hue lifted to
 * where it reads on a dark ground, and a background that is grey rather
 * than black — a panel someone stares at all evening should not be a hole
 * with text floating in it.
 */
export const atlasDark = defineTheme({
  name: 'atlasDark',
  meta: {
    title: 'Atlas Dark',
    description: 'The same calm admin panel after dark — soft greys, never pure black.',
    dark: true,
    iconStyle: 'outline',
    family: 'atlas',
    variant: 'Dark',
    accents: atlasAccents('dark'),
    swatch: ['#15191B', '#1B2023', '#79B4D6', '#8FA3AD'],
    fonts: ['Inter'],
  },
  theme: {
    dark: true,
    colors: {
      background: '#15191B',
      surface: '#1B2023',
      'surface-bright': '#232A2D',
      'surface-light': '#1F262A',
      'surface-variant': '#C9D3CE',
      'on-surface-variant': '#15191B',
      primary: '#79B4D6',
      'primary-darken-1': '#5E97B8',
      secondary: '#8FA3AD',
      'secondary-darken-1': '#74868F',
      error: '#E88B84',
      info: '#7FB4D6',
      success: '#7CC49F',
      warning: '#D8B061',
      'on-surface': '#E4E9E7',
      'on-background': '#E4E9E7',
      /**
       * A dark theme's accents are the light thing on the screen, so their
       * labels are the ground colour rather than white — the Material 3
       * convention, and the only option that clears 4.5:1 here. Vuetify's
       * automatic pick lands on white at about 2.5:1.
       */
      'on-primary': '#15191B',
      'on-secondary': '#15191B',
      'on-error': '#15191B',
    },
    variables: {
      'border-color': '#B9C6C0',
      'border-opacity': 0.14,
      'shadow-color': '#000000',
      'vw-overlay-border': '1px solid rgba(var(--v-border-color), 0.16)',
      'vw-overlay-shadow': '0 12px 32px rgba(0, 0, 0, 0.5)',
      ...atlasVariables,
    },
  },
  defaults: atlasDefaults,
})
