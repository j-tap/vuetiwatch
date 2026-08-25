import { createApp } from 'vue'
import { createVuetiwatch } from 'vuetiwatch'

import App from './App.vue'
import { vuetify } from './plugins/vuetify'
import './assets/styles/app.css'

createApp(App)
  .use(vuetify)
  // Swaps Vuetify's global component defaults whenever the theme changes.
  .use(createVuetiwatch(vuetify))
  .mount('#app')
