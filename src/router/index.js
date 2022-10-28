import { createRouter, createWebHashHistory } from 'vue-router'
import generateRoutes from './routeGenerate'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比
})

const routes = [
  {
    component: () => import('@/views/login/Login'),
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
    },
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  ...generateRoutes,
]

const router = createRouter({
  history: createWebHashHistory('/'),
  routes,
})

router.beforeEach((to, from, next) => {
  // 设置浏览器 title
  document.title = to.meta.title
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
