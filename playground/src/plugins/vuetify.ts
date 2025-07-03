import { createVuetify } from 'vuetify'
import { vuetiwatchThemes } from 'vuetiwatch'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

export const vuetify = createVuetify({
  theme: {
    defaultTheme: 'classic',
    themes: vuetiwatchThemes,
  },
})
