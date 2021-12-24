<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="order-classify bd-b bg-f">
				<view :class="['nav-tab',status == 12 ? 'selected' :'']" @click="changeStatus(12)">全部</view>
				<view :class="['nav-tab',status == 3 ? 'selected' :'']" @click="changeStatus(3)">待发货</view>
				<view :class="['nav-tab',status == 5 ? 'selected' :'']" @click="changeStatus(5)">待收货</view>
				<view :class="['nav-tab',status == 9 ? 'selected' :'']" @click="changeStatus(9)">完成</view>
				<view :class="['nav-tab',status == 0 ? 'selected' :'']" @click="changeStatus(0)">已取消</view>
			</view>
			<view class="pro_info block-sec fs-14" v-for="(item,key) in listsIntegral">
				<view class="order_date p10 bd-be">
					<view class="time">
						<text>下单日期：</text>
						<text class="Arial">{{item.created_at}}</text>
					</view>
				</view>
				<view class="order_info p10 pb5" v-if="item.products">
					<view class="pro_img pr10">
						<image class="img" :src="item.products.firstCover" />
					</view>
					<view class="txt wrap2">{{ item.products.name }}</view>
				</view>
				<view class="order_count bd-be plr10 ptb8">
					共<text class="Arial">1</text>件商品 需付：
					<text class="price">{{item.integral}}</text>积分
				</view>
				<view class="btn-group ptb8 plr10">
					<view class="btn-nav" @click="changeOrder(item)" :data-id="item.id" :data-status="0" v-if="item.status!=0">取消订单</view>
					<view class="btn-nav" @click="goto('/pages/integral/order/buy/main?order_no='+item.order_no)">订单详情</view>
				</view>
			</view>
			<hasMore :parentData="data" source="order"></hasMore>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formAction: '/shop/integral/lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				status: 12,
				getSiteName: this.getSiteName(),
				listsIntegral:[{
					created_at:'2021-12-24 15:22:16',
					products:{
						firstCover:'https://www.baogongtao.com/images/wap/banner01.jpg',
						name:'新鲜红富士苹果水果冰糖心5斤好吃的一整箱陕西平果生鲜萍果 5斤装（净重5斤）',
					},
					integral:1500
				}]
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
			this.status = options.status;
			//this.ajax();
		},
		methods: {
			changeStatus(status) {
				this.status = status;
				this.data.nextPage = 1;
				this.ajax();
			},
			changeOrder(item) {
				this.getConfirm("您确认要取消订单吗？", () => {
					this.postAjax("/shop/integral/change-integral-status", {
						id: item.id,
						status: 0
					}).then(msg=>{
						if (msg.data.status == 2) {
							this.data.nextPage = 1;
							this.ajax();
						}
					});
				});
			},
			ajax() {
				this.getAjax(this,{ status: this.status }).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
<style lang="scss">
@import "./index.scss";
</style>