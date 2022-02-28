<template>
	<view>
		<!-- <page :parentData="data" :formAction="formAction"></page> -->
		<view>
			<view class="count-header main-bg fc-white">
				<view class="c-balance">
					<view class="name fs-16">我的余额（元）</view>
					<view class="count-num Arial">10.00</view>
				</view>
				<view class="record" @click="goto('/pages/merchant/finance/wallet/record',1)">明细</view>
			</view>
			<view class="block-sec">
				<dx-list-cell arrow name="提现" iconName="dxi-icon dxi-icon-wallet" :iconSize="18" iconColor="#415161"
				 @click="goto('/pages/merchant/finance/wallet/domoney',1)"></dx-list-cell>
			</view>
		</view>
	</view>
</template>

<script>
	import dxListCell from "doxinui/components/list-cell/list-cell"
	export default {
		components:{dxListCell},
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				lists:[{
					order_no:'d20210312160',
					created_at: "2021-01-24 22:28:16",
					amount: "20000.00",
					source:'套餐扣次订单',
					getOrder:{
						product_str: "123礼乐桶装水",
						num: 1
					}
				}]
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