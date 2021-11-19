<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<view class="flex-between lh-40 plr15 main-bg fs-14 fc-white">
				<view>{{data.query.dis_type == 0 ? '分销' : '业务'}}订单<text class="Arial">({{ data.listsNum }})</text></view>
				<view><text class="Arial">+{{ data.amount }}</text>元</view>
			</view>
			<view class="msc_tabs">
				<scroll-view scroll-x="true" v-if="data.query.dis_type == 0">
					<view :class="['liNav',data.query.status == -1 ? 'cur' :'']" @click="changeStatus(-1)">全部</view>
					<view :class="['liNav',data.query.status == 5 ? 'cur' :'']" @click="changeStatus(5)">一级待入帐</view>
					<view :class="['liNav',data.query.status == 6 ? 'cur' :'']" @click="changeStatus(6)">一级已入账</view>
					<view :class="['liNav',data.query.status == 7 ? 'cur' :'']" @click="changeStatus(7)">二级待入帐</view>
					<view :class="['liNav',data.query.status == 8 ? 'cur' :'']" @click="changeStatus(8)">二级已入账</view>
				</scroll-view>
				<view class="between" v-else-if="data.query.dis_type == 1">
					<view :class="['liNav',data.query.status == -1 ? 'cur' :'']" @click="changeStatus(-1)">全部</view>
					<view :class="['liNav',data.query.status == 5 ? 'cur' :'']" @click="changeStatus(5)">待入帐</view>
					<view :class="['liNav',data.query.status == 6 ? 'cur' :'']" @click="changeStatus(6)">已入账</view>
				</view>
			</view>
			<!-- <meiTime ref="meiTime"  :data="[
				{label:'今天',value:'today'},
				{label:'本周',value:'thisweek'},
				{label:'本月',value:'thismonth'}
			]" :query="data.query"></meiTime> -->
			<view class="order-list" v-for="(item,key) in data.lists.data" v-if="listsShow">
				<view v-if="item.getOrder && item.getOrder.getUser">
					<view class="title plr15 ptb10 bd-be fs-15">
						<image class="head mr10" :src="item.getOrder.getUser.headerPic" />
						<view class="name">{{item.getOrder.getUser.userInfo.name ? item.getOrder.getUser.userInfo.name : item.getOrder.getUser.nickname}}</view>
						<view class="num">收益：<text class="price">{{item.amount}}</text></view>
					</view>
					<view class="pro-info fs-14 plr15">
						<view class="fs-15 ptb10" v-if="item.getOrder.product_str">{{item.getOrder.product_str.split(',')[0]}}</view>
						<view class="fs-15 ptb10" v-ele>优惠券核销</view>
						<view class="row">
							<view class="">分销员</view>
							<view class="Arial">{{item.getDis.name}}</view>
						</view>
						<view class="row fs-12 fc-9">
							<view>订单编号：<text class="Arial">{{item.order_no}}</text></view>
							<view>下单时间：<text class="Arial">{{item.created_at}}</text></view>
						</view>
					</view>
				</view>
				<view v-if="item.source == '456充值'">
					<view class="title plr15 ptb10 bd-be fs-15">
						<view class="name">456充值</view>
						<view class="num">收益：<text class="price">{{item.amount}}</text></view>
					</view>
					<view class="pro-info plr15">
						<view class="row fs-12 fc-9">
							<view>订单编号：<text class="Arial">{{item.order_no}}</text></view>
							<view>下单时间：<text class="Arial">{{item.created_at}}</text></view>
						</view>
					</view>
				</view>
			</view>
			<hasMore :parentData="data" source="nodata"></hasMore>
		</view>
	</view>
</template>

<script>
	import "./index.css";
	export default {
		computed: {
			
		},
		data() {
			return {
				formAction: '/shop/dis/order-lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				listsShow: true,
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
			changeStatus(status) {
				this.data.query.status = status;
				this.listsShow = false;
				this.ajax();
			},
			ajax() {
				this.getAjax(this).then(msg => {
					this.listsShow = true;
				});
			}
		}
	}
</script>
