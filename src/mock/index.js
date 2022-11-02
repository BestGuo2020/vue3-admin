import login from './login'
import role from './role'

export default [
  ...login,
  ...role,
  // 模拟获取用户信息
  {
    url: '/api/userinfo',
    method: 'post',
    response: req => {
      if (req.headers.token) {
        return {
          code: 0,
          msg: '',
          data: {
            username: 'admin',
            roles: ['admin'],
            header: 'https://avatars.githubusercontent.com/u/45250038?v=4',
            token: 'bestguo2020',
          },
        }
      }
      return {
        code: -1,
        msg: '认证失效了，请重新登录',
      }
    },
  },
]
