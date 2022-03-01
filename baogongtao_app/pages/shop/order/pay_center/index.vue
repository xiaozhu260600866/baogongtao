<template>
	<view>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<view v-if="data.show">
			<view class="order_no">订单编号<span>{{detail.order_no}}</span></view>
			<view id="pay_price"><span class="fs-20">￥</span>{{ data.amount }}</view>
			<view id="pay_info">
				<view class="list-group">
					<view class="txt_l">收款方</view>
					<view class="txt_r">包工淘</view>
				</view>
			</view>
			<form @submit="data.source == 'wap' ? formSubmitForH5():formSubmitForApp($event)" bindreset="formReset" report-submit="true">
				<view class="m20">
					<button hover-class="none" class="dx-btn dx-btn-big dx-btn-green w-b100" formType="submit">立即支付</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import "./index.css";
	export default {
		data() {
			return {
				formAction: '/shop/order/ready-pay',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				detail: {},
				returnUrl:'',
				siteConfig: {},
				config: {},
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
			formSubmitForH5(e){
				this.payUniapp(this.config,msg=>{
					this.goto(this.returnUrl);
				});
			},
			formSubmitForApp(e) {
				//调起微信支付
				this.payUniapp(this.config,msg=>{
					this.goto(this.returnUrl);
				});
			},
			ajax() {
				this.getAjax(this).then(msg => {
					this.detail = msg.detail;
					this.siteConfig = msg.siteConfig;
					this.config = msg.config;
					if (this.detail.is_group) {
						this.returnUrl = '/pages/group/group/index?order_no=' + this.detail.order_no;
					} else {
						this.returnUrl = '/pages/shop/order/payed/index?order_no=' + this.detail.order_no;
					}
				});
			}
		},
		
	}

</script>
