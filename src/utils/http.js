/**
 * 封装客户端http请求axios常用函数
 */
import axios from 'axios'
import config from '../../config'
// import store from '../store/index'

import { Toast, Indicator } from 'mint-ui'
// import router from '../router'
import transfer from './transfer'

axios.interceptors.request.use((config) => {
  if (window.navigator.onLine !== true) {
    Toast('请检查当前网络')
    return
  }
  if (config.loading && config.loading.show) {
    if (config.loading.type === 'mini') {
      Indicator.open()
    } else Indicator.open({
      text: config.loading.text || ''
    })
  }
  return config
}, (error) => {
  Toast({message: '请求超时,请稍后再试', position: 'bottom'})
  console.warn(error)
  return Promise.reject(error)
})

axios.interceptors.response.use(async (response) => {
  setTimeout(() => {Indicator.close()}, 500)
  let json = response.data
  try {
    if (typeof json.code == 'undefined') {
      return response
    } else {
      if (json.code !== 200 && json.error_code) {
        await transfer.$emit('resErr', json)
      } else if (json.code !== 200) {
        Toast({message: json.datas.error, position: 'bottom'})
      }
    }
  } catch (e) {}
  return response
}, (error) => {
  if (window.navigator.onLine !== true) {
    Toast('请检查当前网络')
    return
  }
  Indicator.close()
  if (!error.response) {
    Toast('请求超时,请稍后再试')
  }
  return Promise.reject(error)
})

const baseURL = (process.env.NODE_ENV === 'production' ? config.build.httpUrl : config.dev.httpUrl)
export default {
  get (url, params = {}, loading) {
    let key = window.localStorage.getItem('USERINFO_KEY')
    if (key) {
      params.key = key
    }
    Object.assign(params, url)
    return axios({
      method: 'get',
      url: baseURL,
      params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded '
      },
      timeout: 30000,
      loading
    }).then((res) => {
      return res.data
    })
  },
  post (url, data = {}, fn, loading) {
    let getUrl = ''
    let formData = new FormData()
    let key = window.localStorage.getItem('USERINFO_KEY')
    // 这个判断是为了区分图片上传做的处理
    if (typeof (url) === 'string') {
      getUrl = url
      for (let i in data) {
        formData.append(i, data[i])
      }
    } else {
      if (data.get) {
        Object.assign(url, data.get)
      }

      for (let i in url) {
        getUrl += `&${i}=${url[i]}`
      }

      getUrl = baseURL + getUrl.replace(/&/, '?')
      if (data.post) {
        for (let i in data.post) {
          formData.append(i, data.post[i])
        }
      }
      if (key) {
        formData.append('key', key)
      }
    }
    return axios({
      method: 'post',
      url: getUrl,
      data: formData,
      timeout: 30000,
      loading,
      onUploadProgress: progressEvent => {
        let complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
        typeof fn === 'function' && fn(complete)
      },
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': '*/*'

      }
    }).then((res) => {
      return res.data
    })
  }
}
