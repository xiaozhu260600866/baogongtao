<template>
	<section>
		<view class="page-head flex bg-f" :style="{height:height+'px',paddingTop:top+'px'}">
			<view class="head-icon flex mlr10">
				<p :class="['item', 'iconfont', pageHeadData.icon1.icon, pageHeadData.icon1.fontSize]" @click="goto(pageHeadData.icon1.url,pageHeadData.icon1.urlType)"></p>
				<p :class="['item', 'iconfont', pageHeadData.icon2.icon, pageHeadData.icon2.fontSize]" @click="goto(pageHeadData.icon2.url,pageHeadData.icon2.urlType)"></p>
			</view>
			<view class="head-name flex1">
				<p class="text-center fs-17 namen nowrap">{{pageHeadData.title}}</p>
			</view>
		</view>
	</section>
</template>
<script type="text/javascript">
	export default {
		props: ["pageHeadData"],
		data() {
			return {
				height: 64, //header高度
				top: 0, //标题图标距离顶部距离
			}
		},
		mounted() {
			let obj = {};
			// #ifdef MP-WEIXIN
			obj = wx.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-BAIDU
			obj = swan.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-ALIPAY
			my.hideAddToDesktopMenu();
			// #endif
			uni.getSystemInfo({
				success: (res) => {
					this.width = obj.left || res.windowWidth;
					this.height = obj.top ? (obj.top + obj.height + 8) : (res.statusBarHeight + 44);
					this.top = obj.top ? (obj.top + (obj.height - 32) / 2) : (res.statusBarHeight + 6);
					this.scrollH = res.windowWidth;
					this.getParent(this).data.height = this.height;
				}
			})
			//this.ajax();
		},
		methods: {
			
		}
	}
</script>
<style type="text/css">
.page-head{position: fixed;top: 0;left: 0;width: 100%;z-index: 10;}
.page-head .head-icon{width: 86px;height: 32px;border: 1rpx #e5e5e5 solid;border-radius: 16px;}
.page-head .head-icon .item{width: 42px;line-height: 30px;text-align: center;position: relative;}
.page-head .head-icon .item:first-child:after{content: "";display: block;position: absolute;right: 0;top: 50%;margin-top: -8px;height: 16px;width: 1rpx;background: #e1e1e1;}
.page-head .head-name{text-align: center;padding-right: 106px;}
.page-head .head-name .name{line-height: 32px;}
</style>
