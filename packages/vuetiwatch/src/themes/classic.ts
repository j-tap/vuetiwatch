import { defineTheme } from '../util/defineTheme.js'

/**
 * Stock Vuetify, untouched. The reference point every other theme is a
 * departure from — and the safe choice when you want Material Design.
 */
export const classic = defineTheme({
  name: 'classic',
  meta: {
    title: 'Classic',
    description: 'Vuetify as it ships. Material Design, Roboto, familiar elevation.',
    dark: false,
    iconStyle: 'filled',
    swatch: ['#FFFFFF', '#EEEEEE', '#1867C0', '#48A9A6'],
    fonts: ['Roboto'],
  },
  theme: {
    dark: false,
    variables: {
      'font-body': "'Roboto', system-ui, sans-serif",
      'vw-radius': '4px',
      'vw-radius-lg': '4px',
    },
  },
})

export default classic
