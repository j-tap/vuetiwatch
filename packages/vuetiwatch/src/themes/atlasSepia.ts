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
    swatch: ['#F3EDE3', '#FBF7F0', '#2F6580', '#8A6E4B'],
    fonts: ['Inter'],
  },
  theme: {
    dark: false,
    colors: {
      background: '#F3EDE3',
      surface: '#FBF7F0',
      'surface-bright': '#FFFDF8',
      'surface-light': '#EAE1D3',
      'surface-variant': '#3B332A',
      'on-surface-variant': '#F3EDE3',
      primary: '#2F6580',
      'primary-darken-1': '#255066',
      secondary: '#8A6E4B',
      'secondary-darken-1': '#6F573A',
      error: '#A83A2C',
      info: '#356B86',
      success: '#3B6B4A',
      warning: '#8A6118',
      'on-surface': '#322C24',
      'on-background': '#322C24',
    },
    variables: {
      'border-color': '#322C24',
      'border-opacity': 0.16,
      'shadow-color': '#3B332A',
      'vw-overlay-border': '1px solid rgba(var(--v-border-color), 0.12)',
      'vw-overlay-shadow': '0 8px 28px rgba(var(--v-shadow-color), 0.14)',
      ...atlasVariables,
    },
  },
  defaults: atlasDefaults,
})
