
<!--
调用方法

 <div class="float-group" style="bottom: 25px;" @click="goto('/pages/shop/appointment/main',1)">
	<floatBtn type="0" icon="icon-pro-cart"></floatBtn>
</div>
 -->

<template>
  <view>
    <button class="float-nav" :class="[shadow?'navShadow':'',myclass?myclass:'']" hover-class="none" :open-type="openType">
      <view class="nav-box" :class="[icon&&!title?'one-icon':'',!icon&&title?'one-name':'']">
        <p v-if="icon" :class="['nav-icon','iconfont',icon,[iSize?iSize:'fs-24']]" />
        <p v-if="title" class="nav-name" :class="nSize?nSize:[!icon?'fs-13':'fs-10']" :style="{padding:!icon?nPadding:''}">{{ title }}</p>
      </view>
    </button>
  </view>
</template>
<script type="text/javascript">
export default {
	props: {
		shadow: {
			type: Boolean,
			default: false
		},
		myclass: {
			type: String,
			default: ''
		},
		icon: {
			type: String,
			default: ''
		},
		iSize: {
			type: String,
			default: ''
		},
		nSize: {
			type: String,
			default: ''
		},
		title: {
			type: String,
			default: ''
		},
		openType: {
			type: String,
			default: ''
		},
		nPadding: {
			type: String,
			default: '0 16rpx'
		}
	},
	data() {
		return {
			source: ''
		}
	},
	methods: {

	},
	onLoad() {

	}
}
</script>
<style type="text/css" scoped="">

		/* 浮动按钮 */
		/* --图文-- */
	.float-nav{width: 50px;height: 50px;border-radius:50%;text-align: center;padding: 0;margin: 15px 0;border: 1px #ccc solid;background: #fff;}
	.float-nav.navShadow{box-shadow: 0 0 20upx 0 hsla(0, 6%, 58%, .2);-webkit-box-shadow: 0 0 20upx 0 hsla(0, 6%, 58%, .2);-moz-box-shadow: 0 0 20upx 0 hsla(0, 6%, 58%, .2);}
	.float-nav .nav-box{width: 50px;height: 50px;border-radius:50%;position: relative;}
	.float-nav .nav-icon{height: 28px;line-height: 34px;font-size: 22px;color: #516171;width: 100%;}
	.float-nav .nav-box .num{width: 16px;height: 16px;line-height: 16px;text-align: center;border-radius: 50%;background: #f1392f;color: #fff;font-size: 10px;position: absolute;top: 3px;right: 3px;}
	.float-nav .nav-name{height: 20px;line-height: 16px;color: #444;width: 100%;}
		/* --单图-- */
	.float-nav .one-icon{position: relative;}
	.float-nav .one-icon .iconfont{line-height: 50px;height: 50px;font-size: 26px;}
	.float-nav .one-icon .num{top: 5px;right: 5px;}
		/* --单文字-- */
	.float-nav .one-name .nav-name{height: 50px;line-height: 18px;display: flex;align-items: center;justify-content: center;}
		/* --橙底白字-- */
	.float-nav-orange{background-color: #ff721f;border-color: #ff721f;}
	.float-nav-orange .nav-icon{color: #fff;}
	.float-nav-orange .nav-name{color: #fff;}
		/* --白底橙字-- */
	.float-nav-w-orange{background-color: #fff;border-color: #fff;}
	.float-nav-w-orange .nav-icon{color: #ff721f;}
	.float-nav-w-orange .nav-name{color: #444;}
		/* --绿底白字-- */
	.float-nav-green{background-color: #13cc0c;border-color: #13cc0c;}
	.float-nav-green .nav-icon{color: #fff;}
	.float-nav-green .nav-name{color: #fff;}
		/* --白底绿字-- */
	.float-nav-w-green{background-color: #fff;border-color: #fff;}
	.float-nav-w-green .nav-icon{color: #13cc0c;}
	.float-nav-w-green .nav-name{color: #444;}
		/* --蓝底白字-- */
	.float-nav-blue{background-color: #3c84d9;border-color: #3c84d9;}
	.float-nav-blue .nav-icon{color: #fff;}
	.float-nav-blue .nav-name{color: #fff;}
		/* --白底蓝字-- */
	.float-nav-w-blue{background-color: #fff;border-color: #fff;}
	.float-nav-w-blue .nav-icon{color: #3c84d9;}
	.float-nav-w-blue .nav-name{color: #444;}
		/* --红底白字-- */
	.float-nav-red{background-color: #fe4543;border-color: #fe4543;}
	.float-nav-red .nav-icon{color: #fff;}
	.float-nav-red .nav-name{color: #fff;}
		/* --白底红字-- */
	.float-nav-w-red{background-color: #fff;border-color: #fff;}
	.float-nav-w-red .nav-icon{color: #fe4543;}
	.float-nav-w-red .nav-name{color: #444;}
</style>
