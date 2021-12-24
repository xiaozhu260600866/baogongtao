<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="integral-head main-bg mb8">
				<view class="name fs-18 fc-white">我的积分</view>
				<view class="count-num Arial">{{dat.integral?dat.integral : 0}}</view>
				<view @click="goto('/pages/user/integral/list/main',1)" class="record fs-14 fc-white">明细</view>
			</view>
			<view class="list-group bg-f">
				<view @click="goto('/pages/integral/lists/main',1)" class="list-group-item">
					<image class="img" src="https://boss.doxinsoft.com/images/app/exchange.png" />
					<view class="name">积分商城</view>
					<view class="icon iconfont icon-right"></view>
				</view>
				<view @click="goto('/pages/user/integral/order/lists?status=3&historyUrl=del',1)" class="list-group-item">
					<image class="img" src="https://boss.doxinsoft.com/images/app/orderlist.png" />
					<view class="name">我的订单</view>
					<view class="icon iconfont icon-right"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formAction: '/shop/user',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				dat:{
					integral: 2356,
				}
			}
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onShareAppMessage() {
			this.shareSource(this, '商城');
		},
		onLoad(options) {
			//this.ajax();
		},
		methods: {
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
<style>
@import "./index.css";
</style>