<template>
	<view>
		<page ref="page"></page>
		<view class="sign_results">
			<view class="icon"><text class="dxi-icon dxi-icon-success"></text></view>
			<view class="txt">外出打卡成功</view>
			<view class="results-info">
				<view class="row">
					<view class="llabel">时间</view>
					<view class="rvalue Arial">09:31</view>
				</view>
				<view class="row">
					<view class="llabel">位置</view>
					<view class="rvalue">北郊蓬江区人民政府(建设二路东)</view>
				</view>
				<view class="row">
					<view class="llabel">备注</view>
					<view class="rvalue">备注内容</view>
				</view>
				<view class="row">
					<view class="llabel">图片</view>
					<view class="rvalue">
						<image class="img" :src="remarkImg" mode="aspectFill" @click="previewImage(remarkImg)"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				remarkImg:'../../../static/images/news/03.jpg',
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
@import "../index.scss";
</style>