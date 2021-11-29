import Vue from 'vue'
import App from './App'
import store from './store'

// 强
import myfun from 'xiaozhu/uniapp/js/myfun.js' //引入自定义方法
import filter from 'xiaozhu/uniapp/js/filter.js' //引入自定义方法
import myfun2 from './public/js/myfun.js' //引入自定义方法
import ajax from 'xiaozhu/uniapp/js/ajax.js' //引入自定义方法
import message from 'xiaozhu/uniapp/js/message.js' //引入自定义方法
import date from 'xiaozhu/uniapp/js/date.js' //引入自定义方法
import vaildate from 'xiaozhu/uniapp/js/vaildate.js' //引入自定义方法
Vue.config.productionTip = false
Vue.use(myfun);
Vue.use(ajax);
Vue.use(myfun2);
Vue.use(message);
Vue.use(date);
Vue.use(filter);
Vue.use(vaildate);
import myform from '@/components/xiaozhu/myform.vue'
Vue.component(
	'myform',
	myform
);
let  siteName = 'https://www.baogongtao.com';
uni.setStorageSync('siteName', siteName);
// 强叔

Vue.prototype.$store = store

Vue.config.productionTip = false

//引入自定义方法
import tytFun from '@/components/tytrock/js/fun.js'
Vue.use(tytFun);
import tytMsg from '@/components/tytrock/js/message.js'
Vue.use(tytMsg);

//引入自定义组件
import page from '@/components/tytrock/components/Page/default'
Vue.component(
	'page',
	page
);
import tytNavigator from '@/components/tytrock/components/navigator'
Vue.component(
	'tytNavigator',
	tytNavigator
);

import weui_input from 'xiaozhu/uniapp/components/weui_input'
Vue.component(
	'weui-input',
	weui_input
);
import dxAddress from "xiaozhu/uniapp/components/addressAndCity";
Vue.component(
	'dx-address',
	dxAddress
);

// 强叔
uni.removeStorageSync('jsdk');
uni.removeStorageSync('distribution');
App.mpType = 'app'

import 'doxinui/css/global_upx.css';
import 'doxinui/css/global_icon.css';
import '@/public/css/app.scss';
// import '@/components/tytrock/css/flex.css';
import '@/public/weui/weui.css';
import "@/public/font/iconfont.css";

const app = new Vue({
	...App
})
app.$mount()
