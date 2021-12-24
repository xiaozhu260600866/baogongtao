<template>
	<view>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<view class="pb60">
			<view id="address" class="bg-f plr15 mb8">
				<block v-if="!address">
					<view class="add-add ptb15" @click="createAddress">
						<view class="add-icon dxi-icon dxi-icon-add mr10"></view>
						<view class="add-txt fs-15">新增收货地址</view>
						<view class="iconfont icon-right fs-12 fc-9"></view>
					</view>
				</block>
				<block v-else>
					<view class="add-info" @click="addressLists">
						<view class="info ptb10">
							<view class="name fs-15">
								<text>{{address.name}}</text>
								<text class="Arial pl10">{{address.phone}}</text>
							</view>
							<view class="add-detail fs-14 fc-6">
								<text class="label">地址：</text>
								<text class="name">{{ address.province }} {{ address.city }} {{ address.area }} {{ address.address }}</text>
							</view>
						</view>
						<view class="iconfont icon-right fs-12 fc-9 pl15"></view>
					</view>
				</block>
				<view class="pay_line">
					<image class="img" src="https://boss.doxinsoft.com/images/site/share-tip.png"></image>
				</view>
			</view>

			<view class="pro-info mb8 bg-f">
				<view class="integral_pro p15 flex" v-if="detail.products">
					<view class="pro_img pr15">
						<image class="img" :src="detail.products.firstCover" />
					</view>
					<view class="flex1">
						<view class="txt wrap2 fs-15 lh-1_5">{{ detail.products.name }}</view>
					</view>
				</view>
			</view>

			<view class="bg-f mb8">
				<weui-input v-model="ruleform.shipping" name="shipping" datatype="require" label="送货方式" changeField="value" type="select"
				 :dataKey="'shippingData'" :disabled="ruleform.status >=3 ? true :false"></weui-input>
				<weui-input v-model="ruleform.remark" label="买家留言" type="text" name="remark" placeholder="点击给商家留言"></weui-input>
			</view>
			
			
			<view id="footer" v-if="ruleform.status == 1">
				<form @submit="submit" report-submit="true" class="w-b100">
					<view class="flex">
						<view class="f_left fs-16">应付 <text class="price fs-22 plr3">{{ruleform.integral}}</text> 积分</view>
						<view class="f_right" @click="submit"><view class="nav-btn red-btn">提交订单</view></view>
					</view>
				</form>
			</view>
			<view id="footer" v-else-if="ruleform.status == 3 || ruleform.status == 5">
				<view class="f_left price"></view>
				<view class="f_right" @click="canReceipt"><view class="nav-btn red-btn">确认收货</view></view>
			</view>
			<view id="footer" v-else>
				<view class="f_left price"></view>
				<view class="f_right" bindtap="canReceipt"><view class="nav-btn">完成</view></view>
			</view>
			<dx-results txt="兑换成功" @click="goto('/pages/integral/lists/main',1)" btntxt="返回" v-if="showResults"></dx-results>
		</view>
	</view>
</template>

<script>
	import dxResults from "doxinui/components/results/results"
	export default {
		components:{dxResults},
		data() {
			return {
				formAction: '/shop/integral/detail',
				shippingData:[
					{label:'邮寄',value:1},
					{label:'自提',value:2},
					{label:'物流',value:3},
				],
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				address: {
					name:'东信科技-梅',
					phone: '13380951183',
					province: '广东省',
					city: '江门市',
					area: '蓬江区',
					address: '建设路82号',
				},
				detail:{
					products:{
						firstCover:'https://www.baogongtao.com/images/wap/banner01.jpg',
						name:'新鲜红富士苹果水果冰糖心5斤好吃的一整箱陕西平果生鲜萍果 5斤装（净重5斤）',
					},
				},
				ruleform: {
					status: 1,
					integral: 1500,
				},
				showResults: false,
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
			if (options.order_no) {
				this.order_no = options.order_no;
				if (options.address_id) {
					this.formAction += "&address_id=" + options.address_id + "&order_no=" + options.order_no;
				} else {
					this.formAction += "?order_no=" + options.order_no;
				}
			}
			//this.ajax();
		},

		methods: {
			submit(e) {
				if (!this.address || !this.address.id) {
					this.getError("请填写收货地址");
					setTimeout(() => {
						this.createAddress();
					}, 500)
					return false;
				}
				let ruleform = this.ruleform;
				ruleform.address_id = this.address.id;
				this.showResults = true;
				this.receipt("确认兑换吗");
			},
			radioChange(event) {
				this.ruleform.shipping = event.mp.detail.value;
			},
			addressLists() {
				if (this.ruleform.status >= 3) {
					return false;
				}
				uni.setStorageSync('order_no', this.ruleform.order_no);
				this.goto('/pages/user/address/lists/main?order_no=' + this.ruleform.order_no);
			},
			ajax() {
				this.getAjax(this).then(msg => {
					this.address = msg.address;
					this.ruleform = msg.detail;
				});
			},
			canReceipt() {
				this.receipt("确认收货吗");
			},
			receipt(title) {
				uni.showModal({
					title: '提示',
					content: title,
					success: res => {
						if (res.confirm) {
							this.postAjax("/shop/integral/change-integral-status", this.ruleform).then(msg => {
								if (msg.data.status == 2) {
									this.goto("/pages/user/integral/order/lists/main?historyUrl=del&status=" + msg.data.detail.status);
								}
							});
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},
			createAddress() {
				if (this.ruleform.status >= 3) {
					return false;
				}
				uni.setStorageSync('order_no', this.ruleform.order_no);
				this.$refs.page.createAddress(res => {
					if (res) {
						this.ajax();
					} else {
						this.goto("/pages/user/address/create_edit/main", 1);
					}
				});
			},
		}
	}
</script>
<style lang="scss">
@import "./index.scss";
</style>