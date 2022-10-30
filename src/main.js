import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import Particles from 'particles.vue3'
import { createPinia } from 'pinia'

import 'animate.css'
import './assets/custom/custom.css'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(Particles)
app.mount('#app')
