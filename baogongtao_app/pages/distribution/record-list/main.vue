<template>
	<view :class="status==0?'height100':''">
		<page :parentData="data" :formAction="formAction"></page>
		<view><!-- v-if="data.show" -->
			<dx-tabs :tabs="[
				{value: 0,name: '达人提现'},
				{value: 1,name: '提现记录'}
			]" v-model="status" selectedColor="#C4A064" sliderBgColor="#C4A064" :height="100" :size="32" :selectedSize="32"></dx-tabs>
			<block v-if="status == 0">
				<view class="count bg-f text-center fs-14 pt20 pb40">
					<view class="txt">可提现金额</view>
					<view class="Arial fw-bold mtb8">￥<text class="fs-28">0.00</text></view>
					<dx-button type="primary" myclass="plr60" round txtColor="#623d04" @click="goto('/pages/distribution/domoney/main',1)">提现</dx-button>
				</view>
				<view class="explain bg-f p15">
					<view class="tit fs-16 mb12">提现说明</view>
					<view class="content fc-9 fs-14 lh-1_7">
						<view>1.申请提现后，可在【已提现金额】查看提现记录，预计3个工作日到账</view>
						<view>2.提交提现申请后可在【微信】-【我的】-【钱包】-【零钱】-【收支明细】中查询收入到账情况。</view>
						<view>3.提现时金额必须大于5元才可提现。</view>
						<view>4.订单交易完成后的第二天0点即可提现。</view>
					</view>
				</view>
			</block>
			<view class="mt8" v-if="status == 1">
				<view class="dis-record-list plr15 ptb10 mb8 bg-f" v-for="item in lists">
					<view class="group fs-15 flex-between">
						<view>提现</view>
						<view class="Arial">-{{item.amount}}</view>
					</view>
					<view class="group fc-9 fs-13 flex-between">
						<view class="Arial">{{item.created_at}}</view>
						<view>{{item.getStatus}}</view>
					</view>
				</view>
			</view>
			
			<hasMore :parentData="data" source="nodata" message="暂无提现记录"></hasMore>
		</view>
	</view>
</template>

<script>
	import dxTabs from "doxinui/components/tabs/tabs"
	export default {
		components:{dxTabs},
		data() {
			return {
				formAction: '/shop/dis/come-out-infos',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				status: 0,
				lists:[
					{amount:100.00,created_at:'2021-11-14 18:33:56',getStatus:'审核中'}
				]
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
			//this.ajax();
		},
		methods: {
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
<style>
@import "./index.css";
</style>