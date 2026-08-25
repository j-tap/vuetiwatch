import { createVuetify } from 'vuetify'
import { vuetiwatchThemes } from 'vuetiwatch'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
// The layer that carries radius, borders and per-theme surface treatment.
import 'vuetiwatch/styles.css'

export const vuetify = createVuetify({
  theme: {
    defaultTheme: 'classic',
    themes: vuetiwatchThemes,
    transition: true,
  },
})
