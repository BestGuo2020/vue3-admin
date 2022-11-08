import { defineStore } from 'pinia'
import { get } from '../request/utils'

export const useMainStore = defineStore('main', () => {
  let userInfo = ref({}) // 用户信息
  let routeLoaded = ref(false) // 路由是否加载完成
  let role = ref({})

  function getUserInfo() {
    get('/api/userinfo', {}).then(res => {
      console.log(res)
      if (res.code === 0) {
        userInfo.value = res.data
        role.value = res.data.roles[0]
        // 保存角色信息
        localStorage.setItem('role', res.data.roles[0])
      }
    })
  }

  return { userInfo, routeLoaded, getUserInfo, role }
})
