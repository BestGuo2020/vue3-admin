import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    userInfo: {}, // 用户信息
    routeLoaded: false, // 路由是否加载完成
  }),
})
