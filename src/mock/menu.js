/**
 * 模拟后台返回的菜单数据
 *
 * sign：菜单标识，对应 componentsDefine 中的 key 值
 * title：菜单标题
 * path：路径名称
 * icon：css 图标样式，当前后台使用 font-awesome6
 * fullpath：完整的路径
 * children：子菜单
 */
const menus = [
  {
    id: 1,
    sign: 'root',
    title: '主页',
    path: '/',
    icon: 'fa-solid fa-house',
    fullpath: '/',
    children: [
      {
        id: 2,
        sign: 'dashboard',
        title: '仪表板',
        icon: 'fa-solid fa-gauge',
        path: 'dashboard',
        fullpath: '/dashboard',
      },
    ],
  },
  {
    id: 3,
    sign: 'root',
    title: '系统设置',
    path: '/system',
    icon: 'fa-solid fa-gears',
    fullpath: '/system',
    children: [
      {
        id: 4,
        sign: 'user',
        icon: 'fa-regular fa-user',
        title: '用户管理',
        path: 'user',
        fullpath: '/system/user',
      },
      {
        id: 5,
        sign: 'role',
        icon: 'fa-regular fa-circle',
        path: 'role',
        title: '角色管理',
        fullpath: '/system/role',
      },
      {
        id: 6,
        sign: 'power',
        icon: 'fa-regular fa-circle',
        path: 'power',
        title: '菜单管理',
        fullpath: '/system/power',
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
