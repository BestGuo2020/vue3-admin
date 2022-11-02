import dayjs from 'dayjs'

let users = []

for (let i = 0; i < 5; i++) {
  users.push({
    id: '1000' + i,
    username: 'zhangsan' + i,
    password: '*',
    gender: 1,
    enabled: true,
    address: `x省y市z小区第${i + 100}号`,
    phone: 13766660004 + i,
    createTime: '2022-10-29 11:00:00',
  })
}

export default [
  {
    url: '/api/user/find',
    method: 'get',
    response: req => {
      // 模拟的分页采用 slice 方法分页，仅供参考，真正的后端应采用 limit 来进行分页
      let page = parseInt(req.query.page)
      let pageSize = parseInt(req.query.pageSize)

      // 处理成按照 slice 的方式来切割数据
      page = (page - 1) * pageSize
      pageSize = page + pageSize

      console.log(page, pageSize)

      return {
        count: users.length,
        data: users.slice(page, pageSize),
      }
    },
  },
  {
    url: '/api/user/add',
    method: 'post',
    response: req => {
      if (!req.headers.token || req.headers.token !== 'bestguo2020') {
        return { code: -1 }
      }

      let data = req.body
      data.id = new Date().getTime()
      data.createTime = dayjs(data.id).format('YYYY-MM-DD HH:mm:ss')
      users.push(data)

      return {
        code: 0,
        msg: '添加成功！',
      }
    },
  },
  {
    url: '/api/user/edit',
    method: 'post',
    response: req => {
      if (!req.headers.token || req.headers.token !== 'bestguo2020') {
        return { code: -1 }
      }

      let data = req.body

      console.log(data)
      users = users.map(item => {
        if (item.id === data.id) {
          return data
        }
        return item
      })

      return {
        code: 0,
        msg: '修改成功！',
      }
    },
  },
  {
    url: '/api/user/remove',
    method: 'get',
    response: req => {
      if (!req.headers.token || req.headers.token !== 'bestguo2020') {
        return { code: -1 }
      }

      users = users.filter(item => req.query.id !== item.id)
      return {
        code: 0,
        msg: '删除成功！',
      }
    },
  },
  {
    url: '/api/user/removes',
    method: 'post',
    response: req => {
      if (!req.headers.token || req.headers.token !== 'bestguo2020') {
        return { code: -1 }
      }
      users = users.filter(item => req.body.ids.indexOf(item.id) === -1)
      return {
        code: 0,
        msg: '删除成功！',
      }
    },
  },
]
