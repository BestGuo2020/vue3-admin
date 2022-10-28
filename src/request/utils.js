import request from './index'

/**
 * 发送 post 请求
 * @param url 路径
 * @param data 数据
 * @returns Promise
 */
export function post(url, data) {
  return request.post(url, data)
}

/**
 * 发送 get 请求
 * @param url 路径
 * @param data 数据
 * @returns Promise
 */
export function get(url, data) {
  return request.get(url, data)
}
