<template>
	<view>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<view class="buy-body" v-if="data.show">
			<div id="address" class="bg-f">
		
				
				
				<div class="pro-info bgf mb8" v-for="item in ruleform.products">
					<div class="cart-tb p10">
						<div class="pro-img pr10">
							<image :src="item.getProduct.firstCover" />
						</div>
						<div class="pro-name">
							<div class="name lh20 fs14 nowrap">{{item.getProduct.name}}</div>
							<div class="mark">
								<p class="nowrap fs12" v-if="item.is_info">{{item.attribute}}</p>
							</div>
							<div class="group lh20">
								<p class="num fs12">数量：<span class="Arial">{{item.num}}</span></p>
								<p class="price fs14" valign="center">￥{{item.amount}}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="mode" class="bgf mb10" style="background: white;">
				<weui-input v-model="ruleform.shipping" name="shipping" label="送货方式" changeField="value" type="select" dataKey="shipping"
				 :disabled="ruleform.status >=3 ? true :false" ></weui-input>
				<weui-input v-model="ruleform.addr_name" label="姓名" errorMessage="姓名" type="text" name="addr_name" datatype="require"></weui-input>
				<weui-input v-model="ruleform.addr_phone" label="联系电话" type="text" name="addr_phone" datatype="require|phone"></weui-input>
				<!-- 班级改为选择形式，类似于送货方式 -->
				
				
				<!-- 班级改为选择形式，类似于送货方式 -->
				<dx-address v-model="ruleform.addr_address" datatype="require" ref="address" v-if="ruleform.shipping == 1"></dx-address>
			</div>
			
			<div id="mode" class="bgf mb10" style="background: white;">
			<!-- 	<weui-input v-model="ruleform.shipping" name="shipping" label="送货方式" changeField="value" type="select" dataKey="shipping"
				 :disabled="ruleform.status >=3 ? true :false"></weui-input> -->
				<weui-input v-model="ruleform.pay_method" name="pay_method" label="付款方式" changeField="value" type="select" dataKey="pay_methods"
				 :disabled="ruleform.status >=3 ? true :false"></weui-input>
				<!-- <weui-input v-model.lazy="ruleform.myAccount" myclass="text" :disabled="ruleform.status >=3 ? true :false" label="余额"
				 type="text" name="name" v-if="ruleform.pay_method == 2"></weui-input>
				<div class="weui-cell weui-cell_input bd-be plr10" v-if="data.coupons && data.coupons.length == 0">
					<div class="weui-cell__hd"><label class="fs14">优惠券</label></div>
					<div class="weui-cell__bd text-right fc-6"><label class="fs14">暂无</label></div>
				</div>
				<weui-input v-model="ruleform.coupon_value" name="coupon_value" datatype="require" label="优惠券" changeField="value"
				 type="select" :data="data.coupons" v-if="data.coupons && data.coupons.length > 0" :disabled="ruleform.status >=3 ? true :false"
				 @callback="couponCallBack"></weui-input> -->
				<weui-input v-model="ruleform.remark" label="买家留言" type="text" name="remark" placeholder="点击给商家留言"></weui-input>
			</div>
			<div id="calculation" class="bgf" style="background: white;">
				<div class="list-group">
					<p class="txt">商品金额</p>
					<p class="fs16 price">￥{{ruleform.amount}}</p>
				</div>
				<div class="list-group" v-if="ruleform.shipping == 1">
					<p class="txt">运费</p>
					<p class="fs16 price">+ ￥{{ ruleform.yunfei }}</p>
				</div>
				<!-- <div class="list-group" v-if="ruleform.coupon_value">
					<p class="txt">优惠券</p>
					<p class="fs16 price">- ￥{{ ruleform.coupon_value }}</p>
				</div>
				<div class="list-group" v-if="ruleform.levAmount">
					<p class="txt">会员优惠</p>
					<p class="fs16 price">- ￥{{ ruleform.levAmount }}</p>
				</div>
				<div class="list-group" v-if="ruleform.pay_method == 2">
					<p class="txt">余额</p>
					<p class="fs16 price">- ￥{{ wallet }}</p>
				</div>
				<div class="list-group" v-if="ruleform.pay_method == 2">
					<p class="txt">余额优惠</p>
					<p class="fs16 price">- ￥{{ data.accountAmount }}</p>
				</div> -->
			</div>
			<view id="footer" v-if="ruleform.status == 0 || ruleform.status == 1">
				<div @submit="submit" report-submit="true" class="w-b100">
					<view class="f_left float_l">
						小计：
						<span class="fs-24 Arial price">{{ amount.split(".")[0] }}</span>
						<span class="fs-16 Arial price">.{{ amount.split(".")[1] }}</span>
					</view>
					<myform :ruleform="ruleform" :vaildate="vaildate" @callBack="formSubmit" myclass="f_right float_r"></myform>
				</div>
			</view>
			<view id="footer" v-else-if="ruleform.status == 5">
				<view class="f_right float_r w-b100" @click="canReceipt">确认收货</view>
			</view>
			<view id="footer" class="bd-t" v-else-if="ruleform.status >=9">
				<view class="f_right float_r w-b100">再次购买</view>
			</view>
		</view>
	</view>
</template>
<script>
	import "./index.css";
	export default {
		data() {
			return {
				formAction: '/shop/order/detail',
				mpType: 'page', //用来分清父和子组件
				ruleform: {},
				vaildate: {},
				class:[],
				address: {},
				shipping: [{
						label: '邮寄',
						value: 1
					},
					{
						label: '自提',
						value: 2
					}
				],
				pay_methods: [{
						label: '微信支付',
						value: 1
					},
					
				],
				address_id: 0,
				order_no: 0,
				school: "",
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
			}
		},
		computed: {
			amount() {
				//如果是微信支付
				let accountAmount = parseFloat(this.data.accountAmount);
				let coupon_value = parseFloat(this.ruleform.coupon_value);
				this.ruleform.amount = parseFloat(this.ruleform.amount);
				let order_amount = this.ruleform.amount;
				if (this.ruleform.shipping == 1) {
					order_amount += parseFloat(this.ruleform.yunfei);
				}
				/*如果有优惠券*/
				if (coupon_value) {
					order_amount -= coupon_value;
				}

				/*如果余额支付*/
				if (this.ruleform.pay_method == 2) {
					order_amount -= this.ruleform.myAccount;
					order_amount -= accountAmount;
				}
				if (this.ruleform.levAmount) {
					order_amount -= this.ruleform.levAmount;
				}



				return order_amount < 0 ? 0 : order_amount.toFixed(2);
			},
			wallet() {
				let coupon_value = parseFloat(this.ruleform.coupon_value);
				let accountAmount = parseFloat(this.data.accountAmount);
				this.ruleform.amount = parseFloat(this.ruleform.amount);
				let order_amount = this.ruleform.amount;
				if (this.ruleform.shipping == 1) {
					order_amount += parseFloat(this.ruleform.yunfei);
				}
				if (coupon_value) {
					order_amount -= coupon_value;
				}
				if (this.ruleform.levAmount) {
					order_amount -= this.ruleform.levAmount;
				}
				order_amount -= accountAmount;
				/*如果余额支付*/
				if (this.ruleform.pay_method == 2) {
					let res = this.ruleform.myAccount - order_amount;
					if (res > 0) {
						return order_amount;
					} else {
						return this.ruleform.myAccount;
					}
					return order_amount;
				} else {
					return 0;
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
		onShow() {
			
			
			this.ajax();
		},
		onLoad(options) {
			// this.getStorage("school").then(msg => {
			// 	this.school = msg;
			// 	this.getClass(this.school.id);
			// });
			this.ajax();
		},
		methods: {
			
			ajax() {
				this.getAjax(this).then(msg => {
					this.address = msg.address;
					this.ruleform = msg.detail;
					if (this.address) {
						this.ruleform.addr_name = this.address.name;
						this.ruleform.addr_phone = this.address.phone;
						this.ruleform.addr_address = this.address.address;
					}
					if(this.ruleform.school_id){
						this.school = this.ruleform.getSchool;
						this.getClass(this.school.id);
					}else{
						this.getStorage("school").then(msg => {
							this.school = msg;
							this.getClass(this.school.id);
						});
					}
					this.ruleform.myAccount = msg.user.amount;
					this.ruleform.levAmount = msg.levAmount;
					this.ruleform.coupon_value = this.ruleform.coupon_value != "0.00" ? this.ruleform.coupon_value : '';
				});

			},
			createAddress() {
				if (this.ruleform.status >= 3) {
					return false;
				}
				uni.setStorageSync('order_no', this.ruleform.order_no);
				this.createAddressUniapp(res => {
					if (res) {
						this.ajax();
					} else {
						this.goto("/pages/user/address/create_edit/index", 1);
					}
				});
			},
			formSubmit() {
				let ruleform = this.ruleform;
				this.postAjax(this.formAction, ruleform).then(msg => {
					if (msg.data.status == 2) {
						if (this.amount == 0) {
							this.goto('/pages/order/lists/index?status=3',1);
							return false;
						}
					
						return this.goto("/pages/shop/order/pay_center/index?order_no=" + ruleform.order_no,1);

					}
				});

			},
			addressLists() {
				if (this.ruleform.status >= 3) {
					return false;
				}
				uni.setStorageSync('order_no', this.ruleform.order_no);
				this.goto('/pages/user/address/lists/index?order_no=' + this.ruleform.order_no);
			},
			canReceipt() {
				this.receipt("确认收货吗");
			},
			receipt(title) {
				this.getConfirm(title,msg=>{
					this.postAjax("/user/change-order-status", this.ruleform).then(msg=>{
						if (msg.data.status == 2) {
							this.goto("/pages/order/lists/index?historyUrl=del&status=" + msg.data.detail.status);
						}
					});
				});
			}
		}
	}
</script>
