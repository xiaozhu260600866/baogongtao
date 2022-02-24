<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<section class="container" v-if="data.show">
			<div class="payed-content">
				<div class="con" v-if="detail.payed_at">
					<p class="iconfont icon-pay-yes"></p>
					<p class="content">支付成功</p>
				</div>
				<div class="con" v-if="!detail.payed_at">
					<p class="iconfont icon-pay-no"></p>
					<p class="content">支付失败</p>
				</div>
			</div>
			<div class="button">
				<a hover-class="none" class="dx-btn dx-btn-red dx-btn-big fc-white w-b100" @click="goto('/pages/index/index',2)">返回</a>
			</div>
		</section>
	</view>
</template>

<script>
	import "./index.css";
	export default {
		data() {
			return {
				 formAction: '/shop/order/payed',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				detail:{},
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
		onShareAppMessage() {
			this.shareSource(this, '商城');
		},
		onLoad(options) {
			this.ajax();
		},
		methods: {
			ajax() {
				this.getAjax(this).then(msg => {
					this.detail = msg.detail;
				});
			}
		}
	}
</script>
