<template>
	<view>
		<page ref="page"></page>
		<view>
			<view class="Wcount main-bg text-center pt40 pb80 fc-white">
				<view class="tips fs-16">账户总资产</view>
				<view class="amount fs-40 Arial lh-1 mt10"><text class="fs-24">￥</text>{{ price }}</view>
			</view>
			<view class="head-count">
				<view class="c-item" @click="goto('/pages/merchant/finance/lists',1)">
					<view class="num">￥0.00</view>
					<view class="name"><text>待结算2</text></view>
				</view>
				<view class="c-item" @click="goto('/pages/merchant/finance/lists',1)">
					<view class="num">￥0.00</view>
					<view class="name"><text>已结算，去提现</text></view>
				</view>
			</view>
			<view class="block-sec">
				<dx-list-cell arrow name="流水详情" iconName="dxi-icon dxi-icon-order" :iconSize="18"
				 @click="goto('/pages/merchant/finance/record',1)"></dx-list-cell>
				<dx-list-cell arrow name="订单详情" iconName="dxi-icon dxi-icon-order2" :iconSize="18"
				 @click="goto('/pages/merchant/finance/lists',1)"></dx-list-cell>
			</view>
		</view>
	</view>
</template>

<script>
	import dxListCell from "doxinui/components/list-cell/list-cell"
	export default {
		components:{dxListCell},
		data() {
			return {
				price: 0.00
			}
		},
		onLoad() {
			
		},
		methods: {
			
		}
	}
</script>
<style lang="scss">
@import "index.scss";
</style>