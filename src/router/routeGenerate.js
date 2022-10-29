import Layout from '../views/layout/Layout.vue'
import { get } from '@/request/utils'
import { components } from './componentsDefine'

// 设置白名单路径
export const whitelist = ['/login', '/404']

// 自有的路径
export const routes = [
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
  {
    component: () => import('@/views/errorPage/404'),
    path: '/404',
    meta: {
      title: '404错误',
    },
  },
]

function handle(menu) {
  const generate = []
  menu.forEach((item) => {
    const i = {
      component: components[item.sign],
      path: item.path,
      meta: {
        title: item.title,
        icon: item.icon,
      },
      children: [],
    }
    if (item.children) {
      i.children = handle(item.children)
    }
    generate.push(i)
  })
  return generate
}

export async function generateRoutes() {
  const res = await get('/api/menu')
  if (res.code === 0) {
    const menu = res.data
    const data = handle(menu)
    return Promise.resolve(data)
  }

  return Promise.reject(new Error(res.msg))
}
