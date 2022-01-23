<template>
	<view>
		<page ref="page"></page>
		<view class="pb70 resume">
			<view class="IDcard-item">
				<image class="img" src="/static/images/rzb.jpg"></image>
			</view>
			<view class="IDcard-item">
				<image class="img" src="/static/images/rza.jpg"></image>
			</view>
			<view class="IDcard-info">
				<weui-input v-model="formData.name" label="姓名" type="text" name="name" disabled placeholder=" "></weui-input>
				<weui-input v-model="formData.idcardno" label="身份证号" type="text" name="idcardno" disabled placeholder="440782199605052621"></weui-input>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {name:'', idcardno: '',birthday:'',nation:'',address:'',gender:''},
			}
		},
		onLoad() {
			
		},
		methods: {
			
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onShareAppMessage() {
			return this.shareSource(this, '包工淘');
		},
	}
</script>
<style lang="scss">
page{background: #fff;}
.IDcard-item{
	padding: 30rpx;border: 2rpx #55B4F6 solid;border-radius: 6rpx;width: 532rpx;height: 340rpx;margin: 40rpx auto;
	.img{width: 100%;height: 100%;display: flex;}
}
.IDcard-info{
	margin: 0 auto;width: 532rpx;
	::v-deep .dx-cell{
		border: 1rpx #55B4F6 solid;margin: 24rpx 0;border-radius: 6rpx;padding: 16rpx 24rpx!important;
		&::after{display: none!important;}
		.dx-label{width: 140rpx!important;}
	}
}
</style>