import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:1023/',
  timeout: 1000,
});

// 响应拦截器处理
instance.interceptors.response.use(config => {
  console.log("请求拦截", config);
  // 正常请求
  if(config.status === 200) {
    return config.data;
  }
  return config;
}, error => {
  return Promise.reject(error);
})

export default instance