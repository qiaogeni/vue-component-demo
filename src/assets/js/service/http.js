import axios from 'axios'
import qs from 'qs'
import Store from '@/assets/js/service/store.js'

// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    if (response.data.code === 301) {
      Store.$Modal.warning({
        title: '提示',
        content: response.data.message
      })
    }
    // 对响应数据做点什么
    return response.data
  },
  function(error) {
    Store.$Message.warning('接口异常')
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
if (process.env.NODE_ENV === 'development') {
  // 开发环境登录鉴权
}

let api = '/conan-holmes/'
export default {
  get(url, params) {
    let config = {}
    config.url = api + url
    config.params = params
    return axios(config)
  },
  send(url, params = {}, method = 'post') {
    let config = {}
    config.url = api + url
    config.method = method
    if (method === 'post') {
      config.data = params
      config.headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
      config.transformRequest = [
        function(data) {
          data = qs.stringify(data)
          return data
        }
      ]
    } else if (method === 'json') {
      config.method = 'post'
      config.data = params
    } else {
      config.params = params
    }
    return axios(config)
  },
  request(config) {
    return axios(config)
  },
  export(url, params) {
    return (window.location.href = url + '?' + qs.stringify(params))
  }
}
