<template>
	<view class="merchant">
		<view class="merchant-item" v-for="v in data" @click="linkTo('/pages/merchant/show/index?id='+v.id,1)">
			<view class="info-left mr10">
				<image class="img" mode="aspectFill" :src="v.logoMinUrl"></image>
			</view>
			<view class="info-con">
				<view class="CItem fs-16 nowrap lh-20 fw-bold">{{ v.name}}</view>
				<view class="labelG flex-wrap mt5" v-if="v.industry">
					<view class="class-label" v-for="item in v.industry.split(',')">{{item}}</view>
				</view>
				<!-- <view class="Cmark fs-15 fc-3 wrap2" v-if="v.remark_company">{{v.remark_company}}</view> -->
			</view>
			<view class="num fs-13 fc-9">
				<view class="p fs-12">距离</view>
				<view class="p distance Arial">2km</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	components: {},
	props: ['data'],
	data() {
		return {
		}
	},
	methods: {
		
	}
}

</script>
<style lang="scss">
.merchant{
	background-color: #fff;
	.merchant-item {display: flex;align-items: center;position: relative;padding: 24rpx 0;margin: 0 30rpx;border-bottom: 1rpx #eee solid;}
	.merchant-item .info-left .img {width: 200rpx;height: 200rpx;display: flex;border-radius: 12rpx;}
	.merchant-item .info-con {flex: 1;min-height: 200rpx;width: 100%;overflow: hidden;}
	.merchant-item .info-con .Cmark {margin-top: 10rpx;line-height: 36rpx;}
	.merchant-item .info-con .people {line-height: 32rpx;}
	.merchant-item .labelG .class-label{font-size: 24rpx;padding: 0 8rpx;border-radius: 8rpx;height: 40rpx;line-height: 40rpx;margin: 16rpx 20rpx 0 0;background-color: #f5f5f5;color: #666;}
	.merchant-item .num {text-align: right;line-height: 40rpx;width: 80rpx;margin-left: 20rpx;}
	.merchant-item .num .p {height: 40rpx;line-height: 40rpx;}
}
</style>