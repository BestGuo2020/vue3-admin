import { defineStore } from 'pinia'
import { get } from '../request/utils'

export const useMainStore = defineStore('main', () => {
  let userInfo = ref({}) // 用户信息
  let routeLoaded = ref(false) // 路由是否加载完成

  function getUserInfo() {
    get('/api/userinfo', {}).then(res => {
      console.log(res)
      if (res.code === 0) {
        userInfo.value = res.data
      }
    })
  }

  return { userInfo, routeLoaded, getUserInfo }
})
