<template>
	<view>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<view v-if="data.show">
			<view class="text-center ptb10">
				<view class="pay_id fs-15">订单编号<text class="Arial">{{detail.order_no}}</text></view>
				<view class="pay_price Arial">￥{{ data.amount }}</view>
			</view>
			<view class="pay_info bg-f">
				<view class="list-group bd-be flex-between ptb10 plr15">
					<view class="txt_l fs-14 fc-9">收款号</view>
					<view class="txt_r fs-14">{{siteConfig.web_name}}</view>
				</view>
				<view class="list-group flex-between ptb10 plr15">
					<view class="txt_l fs-14 fc-9">支付项目</view>
					<view class="txt_r fs-14">{{siteConfig.web_name}}订单支付</view>
				</view>
			</view>
			<form @submit="data.source == 'wap' ? formSubmitForH5():formSubmitForApp($event)" bindreset="formReset" report-submit="true">
				<view class="m20">
					<button hover-class="none" class="dx-btn dx-btn-big dx-btn-red w-b100" formType="submit">立即支付</button>
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
				let formId = e.mp.detail.formId;
				this.formId(formId).then(msg => {
					this.payUniapp(this.config,msg=>{
						wx.requestSubscribeMessage({
						  tmplIds: this.data.templates_array,
						  success (res) { 
							  console.log(res);
						  },
						  fail(res){
							 console.log(res); 
						  }
						})
						
						this.goto(this.returnUrl);
					});
				});
			},
			ajax() {
				this.getAjax(this).then(msg => {
					this.detail = msg.detail;
					this.siteConfig = msg.siteConfig;
					this.config = msg.config;
					if (this.detail.is_group) {
						this.returnUrl = '/pages/shop/group/group/index?order_no=' + this.detail.order_no;
					} else {
						this.returnUrl = '/pages/shop/order/payed/index?order_no=' + this.detail.order_no;
					}
				});
			}
		},
		
	}

</script>
