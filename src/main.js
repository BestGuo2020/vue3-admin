import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import Particles from 'particles.vue3'

import 'animate.css'

const app = createApp(App)

app.use(router)
app.use(Particles)
app.mount('#app')
