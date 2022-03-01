<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<dx-tabs-scroll :tabs="[
				{value: 12,name: '全部'},
				{value: 1,name: '待付款'},
				{value: 3,name: '待发货'},
				{value: 5,name: '待收货'},
				{value: 9,name: '待评价'},
				{value: 10,name: '已完成'},
			]" v-model="data.query.status" @change="change" :height="50" :nameSize="15" curColor="#1e97ff" borderColor="#1e97ff"></dx-tabs-scroll>
			<view class="order_lists">
				<view class="order_item block-sec" v-for="parent in data.lists.data">
					<view class="order_t ">
						<view class="left">
							<view class="p">订单编号：<text class="Arial">{{parent.created_at}}</text></view>
							<view class="p">下单日期：<text class="Arial">{{parent.order_no}}</text></view>
						</view>
						<view class="state fs-14">{{parent.status_message}}</view>
						<!-- <view class="del">
							<view class="del-icon dxi-icon dxi-icon-del" @click="delOrder(parent)"></view>
						</view> -->
					</view>
					<orderPro :data="parent.products"></orderPro>
					<view class="order_count">共<text class="Arial plr3">{{parent.num}}</text>件商品
						实付：￥<text class="Arial fs-16 fc-red">{{ parent.amount}}</text>
					</view>
					<view class="btn-group">
						<view class="btn-item">
							<view class="btn-nav obtn" @click="goto('/pages/shop/order/buy/index?order_no='+parent.order_no)">订单详情</view>
						</view>
						<!-- 待支付 取消订单&去支付-->
						<!-- <view class="btn-item">
							<view class="btn-nav">取消订单</view>
							<view class="btn-nav">去支付</view>
						</view> -->
						<!-- 待发货 -->
						<!-- <view class="btn-item" v-if="parent.status == 2">
							<view class="btn-nav" @click="goto('/pages/shop/order/buy/index?order_no='+parent.order_no)">订单详情</view>
							<view class="btn-nav">确认收货</view>
						</view> -->
					</view>
				</view>
			</view>
			
			<hasMore :parentData="data" source="order" tips="暂无订单"></hasMore>
		</view>
	</view>
</template>

<script>
	import dxTabsScroll from "doxinui/components/tabs/tabs_scroll"
	import orderPro from "@/components/orderPro"
	export default {
		components:{dxTabsScroll,orderPro},
		data() {
			return {
				formAction: '/shop/user/order-lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				status: 12
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
		onShow(){
			this.ajax();
		},
		onLoad(options) {
			this.ajax();
		},
		methods: {
			receipt(title,item) {
				this.getConfirm(title,msg=>{
					this.postAjax("/user/change-order-status", {id:item.id,status:9}).then(msg=>{
						if (msg.data.status == 2) {
							this.ajax();
						}
					});
				});
			},
			canReceipt(item){
				this.receipt("确认收货吗",item);
			},
			changeOrder(item) {
				this.getConfirm("您确认要取消订单吗？", () => {
					this.postAjax("/shop/user/change-order-status", {
						id: item.id,
						status: 0
					}).then(msg => {
						if (msg.data.status == 2) {
							this.data.nextPage = 1;
							this.ajax();
						}
					});
				});
			},
			changeStatus(status) {
				this.data.query.status = status;
				this.data.nextPage = 1;
				this.ajax();
			},
			change() {
				this.data.nextPage = 1;
				this.ajax();
			},
			ajax() {
				this.getAjax(this,{token:uni.getStorageSync('token')}).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
<style>
@import url("index.css");
</style>