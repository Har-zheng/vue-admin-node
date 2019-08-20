import axios from 'axios'
import {
  Loading, Message
} from 'element-ui'
import router from '../router'

let loadingInstance
function startLoading() {
  loadingInstance = Loading.service({
    lock: true,
    text: '拼命加载中.......',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
function endLoading() {
  loadingInstance.close()
}

var $axios = axios

// 请求拦截
$axios.interceptors.request.use(config => {
  if (localStorage.getItem('eletoken')) {
    config.headers.Authorization = localStorage.getItem('eletoken')
  }
  startLoading()
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截

$axios.interceptors.response.use(response => {
  endLoading()
  return response
}, error => {
  endLoading()
  Message.error(error.response.data)
  const { status } = error.response
  if (status === 401) {
    Message.error('token 失效请重新登录!')
    localStorage.removeItem('eletoken')
    router.push('/login')
  }
  return Promise.reject(error)
})

export default $axios
