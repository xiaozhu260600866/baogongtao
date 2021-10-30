<template>
	<view>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<section v-if="show">
			<div id="address" class="block-sec" v-if="ruleform.shipping !=2 && ruleform.online == 1">
				<block v-if="!address">
					<div class="add-add p15" @click="createAddress">
						<p class="add-icon iconfont icon-count-plus mr10"></p>
						<p class="add-txt fs-15">新增收货地址</p>
						<p class="iconfont icon-right fs-12 fc-9"></p>
					</div>
				</block>
				<block v-else>
					<div class="add-info flex-middle" @click="addressLists">
						<div class="licon pl15">
							<span class="iconfont icon-location fs-18 fc-7"></span>
						</div>
						<div class="info ptb10 plr15 flex1">
							<p class="name fs-15">
								<span>{{address.name}}</span>
								<span class="Arial pl10">{{address.phone}}</span>
							</p>
							<div class="add-detail fs-14 fc-6">
								<p class="label">地址：</p>
								<p class="name">{{ address.province }} {{ address.city }} {{ address.area }} {{ address.address }}</p>
							</div>
						</div>
					</div>
				</block>
				<div class="pay_line" v-if="ruleform.shipping !=2 && ruleform.online == 1">
					<image src="https://boss.doxinsoft.com/images/site/share-tip.png"></image>
				</div>
			</div>

			<div class="block-sec no" v-if="ruleform.online == 0 || ruleform.shipping == 2">
				<weui-input v-model="ruleform.addr_name" label="姓名" type="text" :disabled="ruleform.status >=3 ? true :false" name="addr_name" datatype="require"></weui-input>
				<weui-input v-model="ruleform.addr_phone" label="电话" type="text" :disabled="ruleform.status >=3 ? true :false" name="addr_phone" datatype="require|phone"></weui-input>
			</div>
			<div class="pro-info block-sec" v-for="item in ruleform.products" @click="goto('/pages/shop/product/show/index?id='+item.getProduct.id,1)">
				<div class="cart-tb p10">
					<div class="pro-img pr10">
						<image :src="item.getProduct.firstCover" />
					</div>
					<div class="pro-name">
						<div class="name lh20 fs-14 nowrap">{{item.getProduct.name}}</div>
						<div class="mark">
							<p class="nowrap fs-12" v-if="item.is_info">{{item.attribute}}</p>
						</div>
						<div class="group lh20">
							<p class="num fs-12">数量 × <span class="Arial">{{item.num}}</span></p>
							<p class="price fs-14" valign="center">￥{{item.amount}}</p>
						</div>
					</div>
				</div>
			</div>
			<div id="mode" class="block-sec">
				<!-- 如果是虚拟订单 -->
				<weui-input v-model="ruleform.shipping" name="shipping" label="送货方式" changeField="value" type="select" dataKey="shipping"
				 :disabled="ruleform.status >=3 ? true :false" v-if="ruleform.online == 1"></weui-input>
				<weui-input v-model="ruleform.pay_method" name="pay_method" label="付款方式" changeField="value" type="select" dataKey="pay_methods"
				 :disabled="ruleform.status >=3 ? true :false"></weui-input>
				<weui-input v-model.lazy="ruleform.myAccount" myclass="text" :disabled="true" label="余额"
				 type="text" name="name" v-if="ruleform.pay_method == 2 && ruleform.status < 3"></weui-input>
				<div class="weui-cell weui-cell_input bd-be plr10" v-if="data.coupons && data.coupons.length == 0">
					<div class="weui-cell__hd"><label class="fs-14">优惠券</label></div>
					<div class="weui-cell__bd text-right fc-6"><label class="fs-14">暂无</label></div>
				</div>
				<weui-input v-model="ruleform.coupon_value" name="coupon_value" label="优惠券" changeField="value"
				 type="select" dataKey="coupons" v-if="data.coupons && data.coupons.length > 0" :disabled="ruleform.status >=3 ? true :false"
				 @callback="couponCallBack"></weui-input>
				 <weui-input v-model="ruleform.remark" :disabled="ruleform.status >=3 ? true :false" label="买家留言" type="text" name="remark"
				  placeholder="点击给卖家留言"></weui-input>
			</div>
			<div id="calculation" class="block-sec">
				<div class="list-group">
					<p class="txt">商品金额</p>
					<p class="fs-16 price">￥{{ruleform.amount}}</p>
				</div>
				<div class="list-group" v-if="ruleform.shipping == 1">
					<p class="txt">运费</p>
					<p class="fs-16 price">+ ￥{{ ruleform.yunfei }}</p>
				</div>
				<div class="list-group" v-if="ruleform.coupon_value">
					<p class="txt">优惠券</p>
					<p class="fs-16 price">- ￥{{ ruleform.coupon_value }}</p>
				</div>
				<div class="list-group" v-if="ruleform.levAmount">
					<p class="txt">会员优惠</p>
					<p class="fs-16 price">- ￥{{ ruleform.levAmount }}</p>
				</div>
				<div class="list-group" v-if="data.bargainPrice">
					<p class="txt">砍价</p>
					<p class="fs-16 price">- ￥{{ data.bargainPrice }}</p>
				</div>
				<div class="list-group" v-if="ruleform.pay_method == 2">
					<p class="txt">余额支付</p>
					<p class="fs-16 price">- ￥{{ wallet }}</p>
				</div>
				<div class="list-group" v-if="ruleform.status != 1">
					<p class="txt">实付款</p>
					<p class="fs-16 price">￥{{ amount }}</p>
				</div>
			</div>
			<div class="block-sec no">
				<weui-input label="订单编号" v-model="ruleform.order_no" type="txt" name="name"></weui-input>
				<weui-input label="订单日期" v-model="ruleform.created_at" type="txt" name="name"></weui-input>
			</div>
			<view id="order-footer">
				<div class="lprice fs-14 pl10">
					<view>实付款：<span class="fs-14 Arial price">￥</span><span class="fs-20 Arial price">{{ amount }}</span></view>
				</div>
				<div class="rbtn">
					<div class="btn-item">
						<myform :ruleform="ruleform" :vaildate="vaildate" @callBack="formSubmit" myclass="btn-nav gobuy" title="提交订单"></myform>
					</div>
				</div>
			</view>
		</section>
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
				coupons: [],
				show: false,
				address: {},
				pay_methods: [{
						label: '微信支付',
						value: 1
					},
					// {
					// 	label: '余额支付',
					// 	value: 2
					// },
				],
				shipping: [{
						label: '邮寄',
						value: 1
					},
					{
						label: '到店自提',
						value: 2
					},
					// {
					// 	label: '上门服务',
					// 	value: 4
					// },
				],
				address_id: 0,
				order_no: 0,
				merchant: "",
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
			}
		},

		computed: {
			amount() {
				//如果是微信支付
				let accountAmount = parseFloat(this.data.accountAmount);
				let coupon_value = parseFloat(this.ruleform.coupon_value);
				let bargainPrice = parseFloat(this.data.bargainPrice);
				this.ruleform.amount = parseFloat(this.ruleform.amount);
				let order_amount = this.ruleform.amount;
				if (this.ruleform.shipping == 1) {
					order_amount += parseFloat(this.ruleform.yunfei);
				}

				/*如果有优惠券*/
				if (coupon_value) {
					order_amount -= coupon_value;
				}
				//如果 有砍价
				if (bargainPrice) {
					order_amount -= bargainPrice;
				}

				/*如果余额支付*/
				if (this.ruleform.pay_method == 2) {
					order_amount -= accountAmount;
				}
				if (this.ruleform.levAmount) {
					order_amount -= this.ruleform.levAmount;
				}


				console.log(order_amount);
				return order_amount < 0 ? 0 : order_amount.toFixed(2);
			},
			wallet() {
				let coupon_value = parseFloat(this.ruleform.coupon_value);
				let bargainPrice = parseFloat(this.data.bargainPrice);
				let accountAmount = parseFloat(this.data.accountAmount);

				this.ruleform.amount = parseFloat(this.ruleform.amount);
				let order_amount = this.ruleform.amount;
				if (this.ruleform.shipping == 1) {
					order_amount += parseFloat(this.ruleform.yunfei);
				}

				if (coupon_value) {
					order_amount -= coupon_value;
				}
				//如果 有砍价
				if (bargainPrice) {
					order_amount -= bargainPrice;
				}
				if (this.ruleform.levAmount) {
					order_amount -= this.ruleform.levAmount;
				}
				if (order_amount > accountAmount) order_amount -= accountAmount;
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
			this.getStorage("merchant").then(msg => {
				this.merchant = msg;
			});
			this.ajax();
		},
		onLoad(options) {
			this.getStorage("merchant").then(msg => {
				this.merchant = msg;
			});
			this.ajax();
		},
		methods: {
			couponCallBack(res) {
				this.ruleform.coupon_userid = res.id;
			},
			ajax() {
				this.getAjax(this).then(msg => {
					this.address = msg.address;
					this.ruleform = msg.detail;
					if (this.address && !this.ruleform.addr_name) {
						this.ruleform.addr_name = this.address.name;
						this.ruleform.addr_phone = this.address.phone;
						this.ruleform.addr_address = this.address.address;
					}
					this.ruleform.myAccount = msg.user.amount;
					this.ruleform.levAmount = msg.levAmount;
					this.ruleform.coupon_value = this.ruleform.coupon_value != "0.00" ? this.ruleform.coupon_value : '';
					this.show = true;
					this.coupons = this.data.coupons;
					if(this.ruleform.status  < 3 ){
						this.setTitle("订单提交");	
					}else{
						this.setTitle("订单详情");
					}
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
						this.goto("/pages/shop/user/address/create_edit/index", 1);
					}
				});
			},
			formSubmit() {
				let ruleform = this.ruleform;
				if (ruleform.shipping != 2 && ruleform.online == 1) {
					if (!this.address || !this.address.id) {
						uni.showToast({
							title: '请填写收货地址',
							duration: 500
						})
						setTimeout(() => {
							this.createAddress();
						}, 500)
						return false;
					}
					ruleform.address_id = this.address.id;

				}

				ruleform.distribution_id = this.merchant.id;
				if (ruleform.coupon_value) {
					this.data.coupons.forEach((v, i) => {
						if (v.checked) {
							this.ruleform.coupon_userid = v.id;
						}
					});
				}

				this.postAjax(this.formAction, ruleform).then(msg => {
					if (msg.data.status == 2) {
						uni.setStorageSync('refreshUrl',"/pages/shop/index/index");
						if (this.amount == 0) {
							if(ruleform.is_group){
								this.goto('/pages/shop/group/group/index?order_no=' + ruleform.order_no);
								return false;
							}else{
								this.goto("/pages/shop/order/payed/index?order_no=" + ruleform.order_no);
								return false;
							}
							
						}
						if (ruleform.pay_method == 2 && parseFloat(ruleform.myAccount) >= ruleform.amount) {
							this.goto("/pages/shop/order/payed/index?order_no=" + ruleform.order_no);
							return false;
						}
						if (this.data.source == 'wap') {
							let url = this.getSiteName + '/h5/#/pages/order/pay_center/index?order_no=' + ruleform.order_no;
							let arg = url.split("#")[1];
							window.location.href = this.getSiteName + "/getWechatOpenId?arg=" + arg + "&toUrl=" + url;
						} else {
							this.goto("/pages/shop/order/pay_center/index?order_no=" + ruleform.order_no);
						}

					}
				});

			},
			changeOrder() {
				this.getConfirm("您确认要取消订单吗？", () => {
					this.postAjax("/shop/user/change-order-status", {
						id: this.ruleform.id,
						status: 0
					}).then(msg => {
						if (msg.data.status == 2) {
							this.ajax();
						}
					});
				});
			},
			addressLists() {
				if (this.ruleform.status >= 3) {
					return false;
				}
				uni.setStorageSync('order_no', this.ruleform.order_no);
				this.goto('/pages/shop/user/address/lists/index?order_no=' + this.ruleform.order_no);
			},
			canReceipt() {
				this.receipt("确认收货吗");
			},
			receipt(title) {
				this.getConfirm(title, msg => {
					this.postAjax("/shop/user/change-order-status", this.ruleform).then(msg => {
						if (msg.data.status == 2) {
							this.goto("/pages/shop/order/lists/index?historyUrl=del&status=" + msg.data.detail.status);
						}
					});
				});

			}
		}
	}
</script>
