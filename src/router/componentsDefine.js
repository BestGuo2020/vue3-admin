import Layout from '../views/layout/Layout.vue'
/**
 * 用于放置组件，key与后端标识对应
 */
export const components = {
  // 根组件，也就是整个后台框架页
  root: Layout,
  // 仪表板
  dashboard: () => import('@/views/dashboard/Index'),
  // 系统管理
  user: () => import('@/views/system/user/Index'),
  role: () => import('@/views/system/role/Index'),
  power: () => import('@/views/system/menu/Index'),
  // 编辑器
  editor: () => import('@/views/third-component/editor/Index'),
}
