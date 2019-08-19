import axios from 'axios'
// 请求拦截
var server = axios.create({
  baseURL: process.env.BASE_API
})

// 响应拦截

export default server
