import Layout from '@/views/layout/Layout'

const generateRoutes = [
  {
    component: Layout,
    path: '/',
    name: '仪表板',
    children: [
      {
        path: 'dashboard',
        name: '仪表板',
        component: () => import("@/views/dashboard/Index"),
      }
    ]
  },
  {
    component: Layout,
    path: '/system',
    name: '系统设置',
    children: [
      {
        path: 'user',
        name: '用户管理',
        component: () => import("@/views/user/Index"),
      },
      {
        path: 'role',
        name: '角色管理',
        component: () => import("@/views/role/Index"),
      },
      {
        path: 'power',
        name: '权限管理',
        component: () => import("@/views/menu/Index"),
      }
    ]
  },
]

export default generateRoutes;