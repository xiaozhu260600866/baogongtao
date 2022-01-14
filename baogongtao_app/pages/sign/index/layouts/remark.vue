<template>
	<view>
		<page ref="page"></page>
		<view class="remark">
			<weui-input v-model="ruleform.remark" placeholder="请填写备注信息" type="textarea" name="remark"></weui-input>
		</view>
		<dxftButton type="primary" size="lg" round @click="goto('/pages/sign/index/index',1)">确认</dxftButton>
	</view>
</template>

<script>
	import dxftButton from "doxinui/components/button/footer-button"
	export default {
		components: {dxftButton},
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
.remark{
	background: #fff
	::v-deep .dx-cell{
		padding: 30rpx!important;
		&::after{display: none;}
		.dx-text{min-height: 400rpx;height: 400rpx;}
	}
}
</style>