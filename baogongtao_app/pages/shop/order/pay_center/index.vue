<template>
	<view>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<view v-if="data.show">
			<view id="pay_price">￥{{ data.amount }}</view>
			<view id="pay_info">
				<view class="list-group">
					<view class="txt_l">{{detail.shipping == 2 ? '提货人' : '收货人'}}</view>
					<view class="txt_r">{{detail.addr_name}}<text class="Arial pl5">{{detail.addr_phone}}</text></view>
				</view>
				<div v-if="detail.shipping == 2">
					<view class="list-group">
						<view class="txt_l">提货地址</view>
						<view class="txt_r">{{detail.addr_address}}</view>
					</view>
					
				</div>
				<div v-else>
					
				</div>
				<view class="list-group">
					<view class="txt_l">订单号</view>
					<view class="txt_r Arial">{{detail.order_no}}</view>
				</view>
				<view class="list-group">
					<view class="txt_l">收款号</view>
					<view class="txt_r">包工淘</view>
				</view>
				<view class="list-group">
					<view class="txt_l">支付项目</view>
					<view class="txt_r">订单支付</view>
				</view>
			</view>
			<form @submit="data.source == 'wap' ? formSubmitForH5():formSubmitForApp($event)" bindreset="formReset" report-submit="true">
				<button id="pay_submit" formType="submit">立即支付</button>
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
