import router from '.'
import Layout from '../views/layout/Layout.vue'

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

export async function generateRoutes() {
  const data = [
    {
      component: Layout,
      path: '/',
      meta: {
        title: '仪表板',
        icon: 'fa-solid fa-gauge',
      },
      children: [
        {
          path: 'dashboard',
          meta: {
            title: '仪表板',
          },
          component: () => import('@/views/dashboard/Index'),
        },
      ],
    },
    {
      component: Layout,
      path: '/system',
      meta: {
        title: '系统设置',
        icon: 'fa-solid fa-gears',
      },
      children: [
        {
          path: 'user',
          meta: {
            title: '用户管理',
          },
          component: () => import('@/views/system/user/Index'),
        },
        {
          path: 'role',
          meta: {
            title: '角色管理',
          },
          component: () => import('@/views/system/role/Index'),
        },
        {
          path: 'power',
          meta: {
            title: '权限管理',
          },
          component: () => import('@/views/system/menu/Index'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
    },
  ]

  return Promise.resolve(data)
}
