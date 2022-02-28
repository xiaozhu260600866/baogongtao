<template>
	<view>
		<!-- <page :parentData="data" :formAction="formAction"></page> -->
		<view>
			<view class="con-money p15 pb0 bg-f mb8">
				<view class="fs-16 fc-6 pb15">可提现金额（<text class="Arial">￥160072.55</text>）</view>
				<view class="m-input flex lh-50 pb15">
					<text class="fs-20 pr5">￥</text>
					<view class="flex1">
						<weui-input v-model="ruleform.amount" myclass="input fs-20 w-b100" placeholder="请输入提现金额" type="text" name="amount"></weui-input>
					</view>
				</view>
			</view>
			<dx-button myclass="m20 mb0" type="primary" size="lg" @click="formSubmit" block>提交</dx-button>
			<view class="fs-14 fc-6 text-center pt10">注意：提现金额满<text class="fc-orange Arial plr3">10元</text>后才能提现</view>
		</view>
	</view>
</template>

<script>
	import dxButton from "doxinui/components/button/button"　
	export default {
		components:{dxButton},
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{
					amount: 0.00
				}
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