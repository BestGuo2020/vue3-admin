export default [
  {
    url: '/api/login',
    method: 'post',
    response: (req) => {
      let { username, password } = req.body
      if (username === 'admin' && password === '123456') {
        return {
          code: 0,
          msg: '登录成功！',
          data: {
            username,
            roles: ['admin'],
            header: 'https://avatars.githubusercontent.com/u/45250038?v=4',
            token: 'bestguo2020',
          },
        }
      }
      return {
        code: 1,
        msg: '登录失败，请确认用户名或密码是否正确！',
      }
    },
  },
]
