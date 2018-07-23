import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

axios.defaults.retry = 2
axios.defaults.retryDelay = 2000

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      Message({
        message: res.info,
        type: 'error',
        duration: 5 * 1000
      })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 403 || res.code === 401) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  err => {
    var config = err.config
    // If config does not exist or the retry option is not set, reject
    if (!config || !config.retry) return Promise.reject(err)
    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0
    // Check if we've maxed out the total number of retries
    if (config.__retryCount >= config.retry) {
      Message({
        message: err.message,
        type: 'error',
        duration: 5 * 1000
      })
      // Reject with the error
      return Promise.reject(err)
    }
    // Increase the retry count
    config.__retryCount += 1
    // Create new promise to handle exponential backoff
    var backoff = new Promise(function(resolve) {
      setTimeout(function() {
        resolve()
      }, config.retryDelay || 1)
    })
    // Return the promise in which recalls axios to retry the request
    return backoff.then(function() {
      return axios(config)
    })
  }
)

export default service
