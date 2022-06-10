import axios from 'axios'
import Vue from 'vue'
import { getLocalStorageWithExpiry } from '@/utils/localStorage'

const apiCaller = axios.create({
  baseURL: process.env.VUE_APP_API_DOMAIN,
  // timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
// req
apiCaller.interceptors.request.use(function (config) {
  const token = getLocalStorageWithExpiry('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// res
apiCaller.interceptors.response.use(null, async function (error) {
  if (error.response) {
    if (error.response.data.message === 'Header authorization not provided') {
      window.location.reload()
    }
    if (error.response.data.error != null && error.response.data.error[0].message !== null) {
      Vue.prototype.$message.error(error.response.data.error[0].message)
    } else if (error.response.data != null && error.response.data.message != null) {
      Vue.prototype.$message.error(error.response.data.message)
    }
  }
  return Promise.reject(error)
})
export default apiCaller
