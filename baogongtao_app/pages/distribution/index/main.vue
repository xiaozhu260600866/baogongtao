<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<section v-if="data.show">
			<view class="dis-header main-bg">
				<view class="head-img">
					<img class="img" :src="data.distribution.getCover">
				</view>
				<view class="dis-info fc-white">
					<view class="name fs-18">{{ data.distribution.name}}</view>
					<view class="phone fs-16 mt10 Arial">{{ data.distribution.phone}}</view>
				</view>
			</view>
			<view class="sup-sec">
				<view class="sec-group" @click="goto('/pages/distribution/team/main',1)">
					<view class="icon"><text class="nav iconfont icon-dis-team"></text></view>
					<view class="name">我的团队</view>
				</view>
				<view class="sec-group" @click="goto('/pages/distribution/client/main',1)">
					<view class="icon"><text class="nav dxi-icon dxi-icon-user-fill1"></text></view>
					<view class="name">我的客户</view>
				</view>
				<view class="sec-group" @click="goto('/pages/distribution/qrcode/main',1)">
					<view class="icon"><text class="nav dxi-icon dxi-icon-qrcode2 fs-22"></text></view>
					<view class="name">我的二维码</view>
				</view>
			</view>
		</section>
	</view>
</template>

<script>
	import selectSimple from "xiaozhu/wechatapp/components/selectSimple";
	export default {
		data() {
			return {
				formAction: '/api/dis/index',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				selectType: 'toDay',
				getSiteName: this.getSiteName(),
			}
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onLoad(options) {
			this.ajax();
		},
		components: {
			selectSimple
		},
		methods: {
			ajax() {
				this.getAjax(this,{token:uni.getStorageSync('token')}).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
<style>
@import "./index.css";
</style>