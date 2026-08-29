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
    description: 'The same console after dark — deep navy, a lit blue, lines you can find.',
    dark: true,
    iconStyle: 'outline',
    family: 'atlas',
    variant: 'Dark',
    accents: atlasAccents('dark'),
    swatch: ['#040817', '#070E21', '#3382FF', '#838FA8'],
    fonts: ['Inter'],
  },
  theme: {
    dark: true,
    colors: {
      background: '#040817',
      surface: '#070E21',
      'surface-bright': '#101830',
      'surface-light': '#151E35',
      'surface-variant': '#CBD5E1',
      'on-surface-variant': '#040817',
      primary: '#3382FF',
      'primary-darken-1': '#2A6BD6',
      secondary: '#838FA8',
      'secondary-darken-1': '#6B778F',
      error: '#F94144',
      info: '#7DD3FC',
      success: '#4ADE80',
      warning: '#FBBF24',
      'on-surface': '#EEF2F9',
      'on-background': '#EEF2F9',
      /**
       * A dark theme's accents are the light thing on the screen, so their
       * labels are the ground colour rather than white — the Material 3
       * convention, and the only option that clears 4.5:1 here. Vuetify's
       * automatic pick lands on white at about 2.5:1.
       */
      'on-primary': '#040817',
      'on-secondary': '#040817',
      'on-error': '#040817',
    },
    variables: {
      // Lands on #1F283E over the panel — the line is visible without
      // becoming a grid.
      'border-color': '#8FA0C4',
      'border-opacity': 0.18,
      'shadow-color': '#000000',
      'vw-overlay-border': '1px solid rgba(var(--v-border-color), 0.16)',
      'vw-overlay-shadow': '0 12px 32px rgba(0, 0, 0, 0.5)',
      // The same tinted band as the light variant, in this ground's register.
      'theme-code': '#151E35',
      'theme-on-code': '#EEF2F9',
      'theme-kbd': '#151E35',
      'theme-on-kbd': '#EEF2F9',
      ...atlasVariables,
    },
  },
  defaults: atlasDefaults,
})
