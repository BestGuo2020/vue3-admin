import login from './login'
import role from './role'

export default [
  ...login,
  ...role,
  // 模拟获取用户信息
  {
    url: '/api/userinfo',
    method: 'get',
    response: req => {
      if (req.headers.token) {
        return {
          code: 0,
          msg: '',
          data: {
            username: 'admin',
            roles: ['admin'],
            avatar: 'https://avatars.githubusercontent.com/u/45250038?v=4',
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
  // 模拟加载图表数据
  {
    url: '/api/getflowdata',
    method: 'get',
    response: req => {
      if (req.headers.token) {
        return {
          // prettier-ignore
          xdata: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45'],
          series: [
            {
              name: '今日流量',
              type: 'line',
              smooth: true,
              // prettier-ignore
              data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
            },
            {
              name: '昨日流量',
              type: 'line',
              smooth: true,
              // prettier-ignore
              data: [200, 160, 150, 160, 170, 200, 400, 380, 350, 290, 280, 290, 300, 400, 500, 650, 700, 600, 500, 450],
            },
          ],
        }
      }
      return {
        code: -1,
        msg: '认证失效了，请重新登录',
      }
    },
  },
]
