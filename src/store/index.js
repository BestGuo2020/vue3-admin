import { defineStore } from 'pinia'
import { get } from '../request/utils'

export const useMainStore = defineStore('main', () => {
  let userInfo = ref({}) // 用户信息
  let routeLoaded = ref(false) // 路由是否加载完成
  let role = ref(localStorage.getItem('role')) // 当前的角色
  let removeRouteList = ref([]) // 路由添加之后的回调

  function getUserInfo() {
    get('/api/userinfo', {}).then(res => {
      if (res.code === 0) {
        userInfo.value = res.data
        role.value = res.data.roles[0].sign
        // 保存角色信息
        localStorage.setItem('role', res.data.roles[0].sign)
      }
    })
  }

  function logout() {
    return get('/api/logout', {})
  }

  return { userInfo, routeLoaded, getUserInfo, role, logout, removeRouteList }
})
