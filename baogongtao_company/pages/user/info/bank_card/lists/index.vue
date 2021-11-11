<template>
	<view>
		<view class="bank">
			<!-- <view class="bank_list">
				<view class="bank_name">兴业银行</view>
				<view class="bank_id">
					<text>···</text>
					<text>···</text>
					<text>···</text>
					<text>5571</text>
				</view>
			</view>
			<view class="bank_list">
				<view class="bank_name">兴业银行</view>
				<view class="bank_id">
					<text>···</text>
					<text>···</text>
					<text>···</text>
					<text>5571</text>
				</view>
			</view> -->
			<view class="bank_list bank_add" @click="linkTo('/pages/user/info/bank_card/add/index',1)">
				<text class="iconfont icon-add fs-18 pr10"></text>
				<text class="name">添加银行卡</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		}
	},
	onLoad() {
		
	},
	methods: {
	}
}
</script>

<style>
@import "./index.css";
</style>