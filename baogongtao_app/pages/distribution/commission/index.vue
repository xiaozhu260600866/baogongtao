<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<div v-if="data.show">
			<div class="cm-head ptb25 text-center main-bg">
				<p class="num fc-white fs-24 lh-30">{{ data.ordered }}</p>
				<p class="txt fc-white fs-14 lh-18">累计佣金(元)</p>
				<p class="cash-btn fs13 fc-white" @click="goto('/pages/distribution/record-list/main')">提现明细</p>
			</div>
			<div class="cm-list">
				<div class="mb8 bg-f">
					<div class="weui-cell">
						<div class="weui-cell__hd">
							<span class="fs-15 fc-6">可提现佣金</span>
						</div>
						<div class="weui-cell__bd fs-15 fc-orange text-right">
							<span class="Arial">{{ data.dis.amount }}</span>元
						</div>
					</div>
				</div>
				<div class="mb8 bg-f">
					<div class="weui-cell">
						<div class="weui-cell__hd">
							<span class="fs-15 fc-6">成功提现佣金</span>
						</div>
						<div class="weui-cell__bd fs-15 fc-3 text-right">
							<span class="Arial">{{ data.outed }}</span>元
						</div>
					</div>
					<div class="weui-cell">
						<div class="weui-cell__hd">
							<span class="fs-15 fc-6">提现审核中佣金</span>
						</div>
						<div class="weui-cell__bd fs-15 fc-3 text-right">
							<span class="Arial">{{ data.auditIng }}</span>元
						</div>
					</div>
				</div>
				<div class="mb8 bg-f">
					<div class="weui-cell">
						<div class="weui-cell__hd">
							<span class="fs-15 fc-6">未结算佣金</span>
						</div>
						<div class="weui-cell__bd fs-15 fc-3 text-right">
							<span class="Arial">{{ data.orderIng }}</span>元
						</div>
					</div>
				</div>
				<div class="mb8 bg-f">
					<div class="weui-cell">
						<div class="weui-cell__hd">
							<span class="fs-15 fc-3">用户需知</span>
						</div>
						<div class="weui-cell__bd fs-12 fc-9 text-right">
							<span class="iconfont icon-bottom"></span>
						</div>
					</div>
					<div class="p15 pt0">
						<p class="fs-14 fc-6 lh-20">买家确认收货后，立即获得分销佣金</p>
						<p class="fs-14 fc-6 lh-20">注意：可用佣金满<span class="fc-orange Arial plr3">{{ data.withdraw_amount }}元</span>后才能提现</p>
					</div>
				</div>
			</div>
			<!-- <div id="footer-btn" @click="goto('/pages/distribution/domoney/main',1)">
				<button hover-class="none" class="f-dx-btn dx-btn-success" form-type="submit">我要提现</button>
			</div> -->
			<dxftButton type="success" size="lg" @click="goto('/pages/distribution/domoney/main',1)">我要提现</dxftButton>
		</div>
	</view>
</template>

<script>
	import "./index.css";
	import dxftButton from "doxinui/components/button/footer-button"
	export default {
		components:{dxftButton},
		data() {
			return {
				formAction: '/shop/dis/do-money',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
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
					console.log(this.data);
				});
			}
		}
	}
</script>
