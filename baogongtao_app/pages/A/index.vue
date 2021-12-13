<template>
	<view>
		<page ref="page"></page>
		<view>
			333
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
@import "index.scss";
</style>