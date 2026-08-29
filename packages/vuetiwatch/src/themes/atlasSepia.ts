import { atlasAccents, atlasDefaults, atlasVariables } from './atlas.js'
import { defineTheme } from '../util/defineTheme.js'

/**
 * The third ground: warm paper rather than white or grey.
 *
 * Neither light nor dark mode helps the person who finds a white panel too
 * bright and a dark one too flat. Dropping the blue out of the ground and
 * the ink lowers the glare without lowering the contrast — the text still
 * carries better than 12:1 — and the accent turns a shade warmer to sit on
 * it. It is the same panel, lit by a lamp instead of a window.
 */
export const atlasSepia = defineTheme({
  name: 'atlasSepia',
  meta: {
    title: 'Atlas Sepia',
    description: 'Warm paper and brown ink — the same panel, easier on tired eyes.',
    dark: false,
    iconStyle: 'outline',
    family: 'atlas',
    variant: 'Sepia',
    accents: atlasAccents('sepia'),
    swatch: ['#F7F3EC', '#FFFDF9', '#1150E0', '#7A6A52'],
    fonts: ['Inter'],
  },
  theme: {
    dark: false,
    colors: {
      background: '#F7F3EC',
      surface: '#FFFDF9',
      'surface-bright': '#FFFFFC',
      'surface-light': '#F4EEE3',
      'surface-variant': '#241E16',
      'on-surface-variant': '#F7F3EC',
      // Ink-blue on warm paper: the family's accent, in the register the
      // ground is written in.
      primary: '#1150E0',
      'primary-darken-1': '#0E41B4',
      secondary: '#7A6A52',
      'secondary-darken-1': '#615341',
      error: '#A83A2C',
      info: '#356B86',
      success: '#3B6B4A',
      warning: '#8A6118',
      'on-surface': '#241E16',
      'on-background': '#241E16',
    },
    variables: {
      // The same idea as the light variant, in the warm register: the line
      // lands on #E0D7C8 rather than on a grey.
      'border-color': '#8A7A63',
      'border-opacity': 0.28,
      'shadow-color': '#3B332A',
      'vw-overlay-border': '1px solid rgba(var(--v-border-color), 0.12)',
      'vw-overlay-shadow': '0 8px 28px rgba(var(--v-shadow-color), 0.14)',
      // The same tinted band as the light variant, in the warm register.
      'theme-code': '#F4EEE3',
      'theme-on-code': '#241E16',
      'theme-kbd': '#F4EEE3',
      'theme-on-kbd': '#241E16',
      ...atlasVariables,
    },
  },
  defaults: atlasDefaults,
})
