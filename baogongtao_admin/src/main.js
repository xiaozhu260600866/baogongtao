import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import '@/styles/custom.scss'
import '@/styles/iconfont.css'

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// xiaozhu start
var rootElement = document.body

var newElement = document.createElement('div')

newElement.id = 'share-overlay'

// var newElementHtmlContent = document.createTextNode(share);
rootElement.appendChild(newElement)
var loading = '<div id="loadingToast" class="weui_loading_toast" style="display:none;">'
    loading += ' <div class="weui_mask_transparent"></div>'
    loading += ' <div class="weui_toast">'
    loading += ' <div class="weui_loading">'
    loading += ' <div class="weui_loading_leaf weui_loading_leaf_0"></div>'
    loading += '  <div class="weui_loading_leaf weui_loading_leaf_1"></div>'
    loading += ' <div class="weui_loading_leaf weui_loading_leaf_2"></div>'
    loading += ' <div class="weui_loading_leaf weui_loading_leaf_3"></div>'
    loading += '  <div class="weui_loading_leaf weui_loading_leaf_4"></div>'
    loading += ' <div class="weui_loading_leaf weui_loading_leaf_5"></div>'
    loading += ' <div class="weui_loading_leaf weui_loading_leaf_6"></div>'
    loading += '  <div class="weui_loading_leaf weui_loading_leaf_7"></div>'
    loading += ' <div class="weui_loading_leaf weui_loading_leaf_8"></div>'
    loading += '<div class="weui_loading_leaf weui_loading_leaf_9"></div>'
    loading += ' <div class="weui_loading_leaf weui_loading_leaf_10"></div>'
    loading += '<div class="weui_loading_leaf weui_loading_leaf_11"></div>'
    loading += '</div>'
    loading += '<p class="weui_toast_content">数据加载中</p>'
    loading += '</div>'
    loading += '</div>'
 $('body').append(loading)
import globalJs from './components/xiaozhu/js/global.js' // 引入自定义方法
Vue.use(globalJs)
import './components/xiaozhu/wechatapp/css/flex.css'
import './utils/weui.css' // 引入自定义方法
import message from './components/xiaozhu/vue/packages/admin/message.js' // 引入自定义方法
Vue.use(message)
import myfunxiaozhu from './components/xiaozhu/vue/packages/admin/myfun.js' // 引入自定义方法
Vue.use(myfunxiaozhu)
import axios from 'axios'
Vue.prototype.$http = axios
import ajax from './components/xiaozhu/vue/packages/admin/ajax.js' // 引入自定义方法
Vue.use(ajax)
const domain = document.domain
if (domain == 'localhost' || domain == '192.168.1.107') {
    localStorage.setItem('siteName', 'https://www.baogongtao.com')
} else {
    localStorage.setItem('siteName', 'https://' + domain)
}
import myupload from './components/xiaozhu/vue/components/admin/uploadPic.vue'
Vue.component(
    'my-upload',
    myupload
)

// xiaozhu end

Vue.config.productionTip = false

import tytrock from '@/components/Tytrock/components' // 引入自定义组件
Vue.use(tytrock)

import myfun from './utils/myfun.js' // 引入自定义方法
Vue.use(myfun)

import tytFun from '@/components/Tytrock/js/fun.js' // 引入自定义方法
Vue.use(tytFun)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
