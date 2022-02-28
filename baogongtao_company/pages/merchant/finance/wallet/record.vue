<template>
	<view>
		<!-- <page :parentData="data" :formAction="formAction"></page> -->
		<view class="pb60">
			<view class="recordL">
				<view class="record-list plr15 ptb10 bd-be bg-f fs-16" v-for="item in recordL">
					<view class="group flex-between">
						<view>提现</view>
						<view class="Arial">-{{item.amount}}</view>
					</view>
					<view class="group fc-9 flex-between fs-14">
						<view class="Arial">{{item.created_at}}</view>
						<view class="">{{item.getStatus}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import dxftButton from "doxinui/components/button/footer-button"
	export default {
		components:{dxftButton},
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				recordL:[
					{amount: "10.00",getStatus: "审核通过",created_at: "2021-01-08 11:00:14",},
					{amount: "2000.00",getStatus: "审核通过",created_at: "2021-01-04 16:36:14",}
				]
			}
		},
		methods: {
			ajax() {
				this.getAjaxForApp(this, {
				
				}).then(msg => {
					
				});
			}
		},
		onLoad(options) {
			//this.ajax();
			
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onShareAppMessage() {
			return this.shareSource(this, '商城');
		},
	}
</script>
<style scoped lang="scss">
@import './index.scss';
</style>