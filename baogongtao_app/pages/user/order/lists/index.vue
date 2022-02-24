<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<div v-if="data.show">
			<div class="order-class bd-b bgf">
				<p :class="['nav-tab',data.query.status == 12 ? 'selected' :'']" @click="changeStatus(12)">全部</p>
				<p :class="['nav-tab',data.query.status == 1 ? 'selected' :'']" @click="changeStatus(1)">待付款</p>
				<p :class="['nav-tab',data.query.status == 3 ? 'selected' :'']" @click="changeStatus(3)">待提货</p>
			<!-- 	<p :class="['nav-tab',data.query.status == 5 ? 'selected' :'']" @click="changeStatus(5)">待提货</p> -->
				<p :class="['nav-tab',data.query.status == 9 ? 'selected' :'']" @click="changeStatus(9)">已提货</p>
				
				<!-- <p :class="['nav-tab',status == 10 ? 'selected' :'']" @click="changeStatus(10)">售后</p> -->
			
			</div>
			<div class="pro_info m10 bdr6" v-for="(parent,key) in data.lists.data">
				<div class="order_date plr10 bd-be">
					<p class="time fs-14">
						<span>订单号：</span>
						<span class="Arial">{{parent.order_no}}</span>
					</p>
					<p class="state fs-color fs-12">{{parent.status_message}}</p>
				</div>
				<div  @click="goto('/pages/order/buy/index?order_no='+parent.order_no)"class="order_info p10" v-for="(son,key2) in parent.products"
				 v-if="son.getProduct">
					<div class="pro_img">
						<img class="img" :src="son.getProduct.firstCover" />
					</div>
					<div class="pro_info w-b100 flex-wrap">
						<div class="txt fs-14 nowrap w-b100">
							{{son.getProduct.name}}
							<p class="nowrap fs-12" v-if="son.is_info">{{son.attribute}}</p>
						</div>
						<div class="lh-16 flex-between w-b100">
							<p class="num fs-12 fc-6">数量：<span class="Arial">{{son.num}}</span></p>
						</div>
					</div>
				</div>
				<div class="order_count fs-14 bd-be plr10">共
					<span class="Arial">{{parent.num}}</span>件商品 需付款：
					<span class="price">￥{{parent.amount}}</span>
				</div>
				<div class="od-lists">
					
					<div class="od-row">
						<div class="llabel">下单时间</div>
						<div class="rvalue Arial">{{parent.created_at}}</div>
					</div>
				</div>
				<div class="btn-group ptb8 plr15">
					<div class="btn-item">
						<div class="btn-nav" @click="goto('/pages/shop/order/buy/index?order_no='+parent.order_no)">订单详情</div>
					</div>
					<!-- <div class="btn-item" v-if="parent.status >=9">
						<div class="btn-nav" @click="goto('/pages/order/evaluate/index?order_no='+parent.order_no,1)"
						 v-if="parent.status >=9 && parent.suggestStatus == 0">评价</div>
						<div class="btn-nav" @click="goto('/pages/order/evaluate/index?order_no='+parent.order_no,1)"
						 v-if="parent.status >=9 && parent.suggestStatus == 2">评价完成</div>
					</div>
					<div class="btn-item" @click="changeOrder(parent)" v-if="parent.status < 3 ">
						<p class="btn-nav">取消订单</p>
					</div>
					<div class="btn-item" @click="canReceipt(parent)" v-if="parent.status  == 5 ">
						<p class="btn-nav">确认收货</p>
					</div> -->
				</div>
			</div>
			<hasMore :parentData="data" source="order"></hasMore>
		</div>
	</view>
</template>

<script>
	import "./index.css";
	export default {
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
			ajax() {
				this.getAjax(this,{token:uni.getStorageSync('token')}).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
