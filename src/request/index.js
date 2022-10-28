import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 1000,
})

// 响应拦截器处理
instance.interceptors.response.use(
  (config) => {
    console.log('收到的响应拦截', config)
    // 正常请求
    if (config.status === 200) {
      return config.data
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance
