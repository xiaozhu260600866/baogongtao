<template>
	<view>
		<page ref="page"></page>
		<view class="text-center">
			<view class="icon ptb50">
				<image class="img" src="http://bgt.doxinsoft.com/images/wap/register-success.jpg" mode="widthFix" style="width: 400rpx;"></image>
			</view>
			<view class="tips fs-17 fw-bold fc-3 lh-1_6">
				恭喜您成为包工淘<br>第<text class="Arial fc-red fs-40">36959</text>个企业
			</view>
			<dx-button type="primary" size="lg" myclass="plr60 mt20" round @click="goto('/pages/merchant/index/index',1)">完成</dx-button>
		</view> 
	</view>
</template>

<script>
	import dxButton from "doxinui/components/button/button"　
	export default {
		components:{dxButton},
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
<style lang="scss">
@import "index.scss";
</style>