<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="record plr15 ptb10 mb8 bg-f flex-between flex-middle" v-for="(item,key) in data.lists.data">
			<view class="group">
				<view class="fs-15">{{item.type == 0 ? '签到' :'商城购物'}}</view>
				<view class="Arial fs-12 fc-9">{{item.created_at}}</view>
			</view>
			<view class="Arial fs-18" :class="[item.type == 0?'fc-green':'fc-red']">{{item.type == 0 ? '+' :'-'}}{{item.integral}}</view>
		</view>
		<hasMore :parentData="data"></hasMore>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formAction: '/api/user/integral-lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				lists:[{
					source:'商品兑换',
					created_at:'2021-12-13 15:33:26',
					type: 1,
					integral:1500
				},{
					source:'签到',
					created_at:'2021-12-13 08:33:26',
					type: 0,
					integral:10
				}]
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
			this.ajax();
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