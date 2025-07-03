import { createApp } from 'vue'
import App from './App.vue'
import { vuetify } from './plugins/vuetify'
import './assets/styles/app.css'

createApp(App)
  .use(vuetify)
  .mount('#app')
