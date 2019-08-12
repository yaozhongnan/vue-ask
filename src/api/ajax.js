import axios from 'axios'
import qs from 'qs'
import { getLocalStorage } from '@/assets/js/common'

const axios_instance = axios.create({
  // transformRequest: [function (data) {
  //   return qs.stringify(data)
  // }],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// 在所以请求发送之前，检测是否存在 token，如果存在则放到请求头中
axios_instance.interceptors.request.use(config => {
  let token = getLocalStorage('token', 'string')
  if (token) {
    config.headers.Authorization = token;
  }
  return config
})

export default function ajax(url, data = {}, type = 'get') {

  return new Promise( (resolve, reject) => {
    let promise = null
    type = type.toUpperCase()
    // 请求类型为 get
    if (type === 'GET') {
      let dataStr = ''
      Object.keys(data).forEach((item) => {
        dataStr += `${item}=${data[item]}&`
      })
      if (dataStr) {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url += `?${dataStr}`
      }
      promise = axios_instance.get(url)
    }

    // 请求类型为 post
    if (type === 'POST') {
      data = qs.stringify(data)
      promise = axios_instance.post(url, data)
    }
    
    promise.then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })

  })
}
