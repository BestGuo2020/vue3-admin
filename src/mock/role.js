const roles = [
  {
    id: '1',
    name: 'admin',
    description: '系统管理员',
    enable: true,
    createTime: 1664003003622,
    updateTime: '',
  },
  {
    id: '1573568998539284481',
    name: 'guest',
    description: '来宾用户',
    enable: true,
    createTime: 1664003059435,
    updateTime: 1664436821902,
  },
  {
    id: '1575388269632405506',
    name: 'friend',
    description: '朋友关系',
    enable: false,
    createTime: 1664436807432,
    updateTime: 1664436807432,
  },
  {
    id: '1575388644108255233',
    name: 'relative',
    description: '亲戚',
    enable: false,
    createTime: '1664436896713',
    updateTime: '1664436896713',
  },
]

export default [
  {
    url: '/api/role/find',
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
        count: roles.length,
        data: roles.slice(page, pageSize),
      }
    },
  },
]
