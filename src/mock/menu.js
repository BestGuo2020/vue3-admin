/**
 * 模拟后台返回的菜单数据
 *
 * sign：菜单标识，对应 componentsDefine 中的 key 值
 * title：菜单标题
 * path：路径名称
 * icon：css 图标样式，当前后台使用 font-awesome6
 * type：类别（1-菜单、2-后端 url）
 * fullpath：完整的路径
 * children：子菜单
 * enabled：启用
 */
const menus = [
  {
    id: 1,
    sign: 'root',
    title: '主页',
    path: '/',
    icon: 'fa-solid fa-house',
    type: 1,
    fullpath: '/',
    enabled: true,
    children: [
      {
        id: 2,
        sign: 'dashboard',
        title: '仪表板',
        icon: 'fa-solid fa-gauge',
        type: 1,
        path: 'dashboard',
        fullpath: '/dashboard',
        enabled: true,
      },
    ],
  },
  {
    id: 3,
    sign: 'root',
    title: '系统设置',
    path: '/system',
    icon: 'fa-solid fa-gears',
    type: 1,
    fullpath: '/system',
    enabled: true,
    children: [
      {
        id: 4,
        sign: 'user',
        icon: 'fa-regular fa-user',
        type: 1,
        title: '用户管理',
        path: 'user',
        fullpath: '/system/user',
        enabled: true,
      },
      {
        id: 5,
        sign: 'role',
        icon: 'fa-regular fa-circle',
        type: 1,
        path: 'role',
        title: '角色管理',
        fullpath: '/system/role',
        enabled: true,
      },
      {
        id: 6,
        sign: 'power',
        icon: 'fa-regular fa-circle',
        type: 1,
        path: 'power',
        title: '权限管理',
        fullpath: '/system/power',
        enabled: true,
      },
    ],
  },
]

export default [
  {
    url: '/api/menu',
    method: 'get',
    response: req => {
      if (req.headers.token) {
        return {
          code: 0,
          data: menus,
        }
      }
      return {
        code: -1,
        msg: '认证失效了，请重新登录',
      }
    },
  },
]
