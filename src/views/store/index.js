import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      userInfo: {},
      token: null,
    }
  },
})
