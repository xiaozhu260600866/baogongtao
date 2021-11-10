<template>
	<view class="merchant">
		<view class="merchant-item" v-for="v in data" @click="linkTo('/pages/merchant/show/index',1)">
			<view class="info-left mr10">
				<image class="img" mode="aspectFill" :src="v.logoMinUrl"></image>
			</view>
			<view class="info-con">
				<view class="CItem fs-16 nowrap lh-20 fw-bold">{{ v.name}}</view>
				<view class="Cmark fs-15 fc-3 wrap2" ></view>
				<view class="CItem fs-13 nowrap lh-20 mt5 fc-6"></view>
				<view class="labelG flex mt5" v-if="v.industry">
					<view class="class-label main-bg" v-for="item in v.industry.split(',')">{{item}}</view>
				</view>
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
	.merchant-item .info-con {width: 100%;flex: 1;overflow: hidden;}
	.merchant-item .info-con .CItem {width: 100%;}
	.merchant-item .info-con .Cmark {margin-top: 10rpx;line-height: 36rpx;width: 100%;}
	.merchant-item .info-con .people {width: 100%;line-height: 32rpx;}
	.merchant-item .labelG .class-label{font-size: 24upx;color: #fff;padding: 0 8upx;border-radius: 8upx;height: 40upx;line-height: 40upx;margin-right: 20upx;}
	.merchant-item .num {text-align: right;line-height: 40rpx;width: 80rpx;margin-left: 20rpx;}
	.merchant-item .num .p {height: 40rpx;line-height: 40rpx;}
}
</style>