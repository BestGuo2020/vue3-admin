import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './routeGenerate'

const router = createRouter({
  history: createWebHashHistory('/'),
  routes,
})

export default router
