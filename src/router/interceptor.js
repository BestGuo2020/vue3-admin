import { generateRoutes, whitelist } from './routeGenerate'
import { useMainStore } from '../store'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import router from './index'

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比
})

router.beforeEach((to, from, next) => {
  const mainStore = useMainStore()

  NProgress.start()
  // 设置浏览器 title
  document.title = to.meta.title
  // 获取 token
  const token = localStorage.getItem('token')
  // token 有没有
  if (token) {
    // 路由信息是否加载完成
    if (mainStore.routeLoaded) {
      // 但是还在登录页，直接跳回主页
      if (to.path === '/login') {
        next({ path: '/', replace: true })
      } else {
        next()
      }
    } else {
      // 没有就获取路由数据并动态添加，并设置为加载完成
      generateRoutes().then(res => {
        res.forEach(item => {
          // 将添加后的路由回调存到数组中，方便退出登录时清空
          mainStore.removeRouteList.push(router.addRoute(item))
        })
        mainStore.routeLoaded = true
        next({ ...to, replace: true })
      })
    }
    // 获取用户信息
    mainStore.getUserInfo()
  } else {
    // token 没有，就找找白名单中的
    if (whitelist.indexOf(to.path) !== -1) {
      next()
    } else {
      // 白名单中还没有，默认跳到登录页
      next({ path: '/login' })
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
