import 'es6-promise/auto'
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import creeatStore from './store'
import { sync } from 'vuex-router-sync'
import http from './utils/http'
// 最新手淘适配移动端方案
import 'amfe-flexible'
import FastClick from 'fastclick'

Vue.config.productionTip = false
// 注册组件
import DsUi from './components/index.js'

Vue.prototype.$http = http
Vue.use(DsUi)
Vue.use(Vuex)
// import $ from 'jquery'
const store = creeatStore()
sync(store, router)

const vm = {
  el: '#app',
  router,
  store,
  render: h => h(App)
}

// 区分开发环境 如果$prod为true 就代表在手机上面运行
window.$prod = process.env.NODE_ENV === 'production'
// 判断客服窗口是否显示
window.MEIQIAOFF = true
// // 解决移动端浏览器 300 毫秒点击延迟问题
if ($prod) {
  window.document.addEventListener('DOMContentLoaded', () => {
    FastClick.attach(document.body)
  }, false)
}
//
if ($prod) {
  window.document.addEventListener('plusready', () => {
//     // 扩展API加载完毕后 实例化全局VUE
    new Vue(vm)
    let exitAppTicker = 0
    // 监听安卓物理返回事件
    plus.key.addEventListener('backbutton', () => {
      if (!window.$intercept) {
        let currentPtah = router.history.current.fullPath
        const filterPaths = ['/index', '/buyDrill', '/sellDrill', '/college', '/profile']
        // console.log(window.MEIQIAOFF, '1')
        if (window.MEIQIAOFF) {
          if (filterPaths.indexOf(currentPtah) !== -1) {
            // console.log(window.MEIQIAOFF, '3')
            if (exitAppTicker === 0) {
              exitAppTicker++
              plus.nativeUI.toast('再点一次退出')
              setTimeout(() => {
                exitAppTicker = 0
              }, 2000)
            } else if (exitAppTicker === 1) {
              //退出app
              plus.runtime.quit()
            }
          } else {
            router.goBack()
          }

        } else {
          _MEIQIA('hidePanel')
          console.log(window.MEIQIAOFF, '2')
          return
        }

      }
    })
  }, false)
} else {
  new Vue(vm)
}




