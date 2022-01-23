<!-- 引用
<page :formAction='formAction'  :ajaxOnload="true"  ref="page" :data="data" @ajaxCallBack="ajax">
   <div slot="content" >
    <div v-if="data.show">
      内容
    </div>
   </div>
</page>
 -->
<template>
  <section>
    <slot name="content" />
    <pageHead v-if="pageHeadShow" ref="pageHead" :page-head-data="pageHeadData" />
    <div v-if="parentData.show" class="float-group" :style="Fbottom">
      <slot name="floatBtn" />
      <backToIndex :myclass="backToIndexClass" />
    </div>
  </section>
</template>
<style>
	.float-group{position: fixed;right: 15px;bottom: 120px;z-index: 15;}
</style>
<script type="text/javascript">
const source = uni.getStorageSync('source')

import pageHead from './pageHead'
import backToIndex from './backToIndex'

export default {
	components: {
		backToIndex,
		pageHead
	},
	props: ['ajaxOnload', 'pageHeadShow', 'parentData', 'ruleform', 'vaildate', 'otherData', 'ajaxTimeOut', 'formAction', 'fbottom',
		'backToIndexClass', 'pageHeadData', 'zIndex'
	],
	data() {
		return {
			getSiteName: this.getSiteName(),
			wx: {}
		}
	},
	watch: {
		// 如果路由有变化，会再次执行该方法
		// "$route": "share"
	},
	mounted(options) {
		clearInterval(this.timer)
		this.getStorage('city').then(msg => {
	        	if (msg.errMsg && !this.getParent(this).$mp.query.city) {
	        		uni.setStorageSync('city', '江门')
	        	} else {
	        		if (this.getParent(this).$mp.query.city) {
						uni.setStorageSync('city', this.getParent(this).$mp.query.city)
					} else {
						uni.setStorageSync('city', msg)
					}
	        	}
	     })

		const openid = uni.getStorageSync('openid')
		if (!openid) {
			this.timer = setInterval(() => {
				const openid = uni.getStorageSync('openid')
				if (openid) {
					clearInterval(this.timer)
					this.getParent(this).ajax()
				}
			}, 100)
		}
		// 如果是手机版就引入jssdk
		if (this.parentData.source == 'wap') {
			this.wx = require('xiaozhu/weixin-js-sdk')
			this.wx.ready(() => {
				this.wx.hideMenuItems({
					menuList: [
						'menuItem:copyUrl' // 复制链接
						// 'menuItem:share:appMessage', // 发送给朋友
						// 'menuItem:share:timeline', // 发送给朋友圈
					],
					success: function(res) {
						// alert('已隐藏“阅读模式”，“分享到朋友圈”，“复制链接”等按钮');
					},
					fail: function(res) {
						alert(JSON.stringify(res))
					}
				})
			})
			const jsdk = uni.getStorageSync('jsdk')

				const _url = location.href.split('#')[0]
				this.postAjax('/js-sdk', {
					url: _url
				}).then(msg => {
					const url = window.location.href
					if (url.indexOf('192.168') != -1) {

					} else {
						const json = JSON.parse(msg.data.js)
						uni.setStorageSync('jsdk', json)
						this.wx.config(json)
						// this.share();
					}
				})
		}
	},
	methods: {
		share(title, logo, desc) {
			setTimeout(() => {
				const distribution = uni.getStorageSync('distribution')

				var args = new Object()
				var url1 = window.location.href
				var url1 = url1.substr(url1.indexOf('?') + 1)
				var pairs = url1.split('&') // 在逗号处断开
				for (var i = 0; i < pairs.length; i++) {
				    const pos = pairs[i].indexOf('=') // 查找name=value
				    if (pos == -1) { // 如果没有找到就跳过
				        continue
				    }
				    var argname = pairs[i].substring(0, pos) // 提取name
				    var value = pairs[i].substring(pos + 1) // 提取value
					if (argname != 'openid' && argname != 'nickname' && argname != 'source' && argname != 'headimgurl') {
						 args[argname] = unescape(value) // 存为属性
					}
				}
				 var pages = getCurrentPages()// 页面指针数组
				 var prepage = pages[pages.length - 1]// 上一页面指针
				 var pages = '/' + prepage.route + '&'
				for (const key1 in args) {
					pages += key1 + '=' + args[key1] + '&'
				}

				 const source = this.getSiteName + '/h5/'
				var url = this.getSiteName + '/openid?page=' + pages + '&source=' + source
				// let site_name = this.getSiteName;
				//
				//  let url = "";
				//  let arg = window.location.href.split("#")[1];
				//  arg = arg.split("?");
				//  let page =arg[0];
				//  let scope = arg.length >= 1 ? arg[1] : '';
				//  if(scope){
				//
				//  }else{
				//  	url = site_name+'/openid?page='+page+'&source='+source;
				//  }
				console.log(url)

				/* if (url.indexOf('?') != -1) {
						url+="&shareSource=share";
					}else{
						url+="?shareSource=share";
				}*/
				if (distribution) {
					if (url.indexOf('?') != -1) {
						url += '&distribution=' + distribution
					} else {
						url += '?distribution=' + distribution
					}
				}
				this.wx.ready(() => {
					this.wx.showMenuItems({
						menuList: [
							'menuItem:copyUrl', // 复制链接,
							'menuItem:share:appMessage', // 发送给朋友
							'menuItem:share:timeline' // 发送给朋友圈
						],
						success: function(res) {
							// alert('已隐藏“阅读模式”，“分享到朋友圈”，“复制链接”等按钮');
						},
						fail: function(res) {
							alert(JSON.stringify(res))
						}
					})
					// alert("2");
					this.wx.onMenuShareAppMessage({
						title: title,

						imgUrl: logo,
						desc: desc
					})
					this.wx.onMenuShareTimeline({
						title: title,

						imgUrl: logo,
						desc: desc
					})
				})
			}, 100)
		}
	}
}
</script>
