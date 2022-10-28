import Layout from '../views/layout/Layout.vue'

const generateRoutes = [
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
        component: () => import('@/views/user/Index'),
      },
      {
        path: 'role',
        meta: {
          title: '角色管理',
        },
        component: () => import('@/views/role/Index'),
      },
      {
        path: 'power',
        meta: {
          title: '权限管理',
        },
        component: () => import('@/views/menu/Index'),
      },
    ],
  },
]

export default generateRoutes
