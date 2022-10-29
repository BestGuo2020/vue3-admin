const users = []

for (let i = 0; i < 20; i++) {
  users.push({
    id: 1000 + i,
    username: 'zhangsan' + i,
    password: '*',
    gender: 1,
    enabled: true,
    createTime: '2022-10-29 11:00:00',
  })
}

export default [
  {
    url: '/api/user/find',
    method: 'get',
    response: (req) => {
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
]
