import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
// import Vue from 'vue'
// eslint-disable-next-line no-unused-vars
let HTTP = {}

const baseURL = {
  TEST: 'http://20211129Mock.com/',
  production: 'http://106.52.170.16:8090/',
  xueMing: 'http://192.168.43.156:8090/'
}
const instance = axios.create({
  baseURL: baseURL.production,
  timeout: 10000
})
// const test = null
instance.interceptors.request.use(
  config => {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo')) || ''
    const token = userInfo.token || ''
    if (token) {
      config.headers.token = token // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    // console.log(error) // for debug
    Promise.reject(error)
  }
)
instance.interceptors.response.use(function (response) {
  if (response.data.code === 401) {
    Message({
      showClose: true,
      message: response.data.message + '请重新登录',
      type: 'error'
    })
    router.push('/login')
  } else {
    // 对响应数据做点什么
    return response
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
HTTP = {
  install: function (Vue) {
    Vue.prototype.$http = instance
  },
  instance
}
// Vue.prototype.$http = instance

export default instance
