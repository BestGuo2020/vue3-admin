import axios from 'axios'
import router from '../router'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 1000,
})

// 请求前的拦截处理
instance.interceptors.request.use(config => {
  // 协带 token
  config.headers.token = localStorage.getItem('token')
  return config
})

// 响应拦截器处理
instance.interceptors.response.use(
  config => {
    // 正常请求
    if (config.status === 200) {
      // 判断登录状态是否过期
      if (config.data.code === -1) {
        ElMessage({
          message: '登录状态过期，请重新登录！',
          type: 'error',
          onClose: () => {
            console.log(router.currentRoute.value.path)
            localStorage.removeItem('token')
            router.push({
              path: '/login',
              query: {
                redirect: router.currentRoute.value.path,
              },
            })
          },
        })
        return null
      }
      return config.data
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default instance
