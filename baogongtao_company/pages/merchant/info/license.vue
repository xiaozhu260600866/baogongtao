<template>
	<view>
		<page ref="page"></page>
		<view>
			<weui-input v-model="ruleform.license" label="企业营业执照" type="upload" upurl='article' allowUpLoadNum="1" name="license" block></weui-input>
			<view class="explain p15">
				<view class="fs-15">营业执照示例图:<text class="fc-7 fs-14">(图片最大不超过10M)</text></view>
				<image class="mt15" src="/static/images/explain-license.jpg" mode="widthFix" style="width: 240rpx;"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mpType: 'page',
				ruleform:{},
			}
		},
		onLoad() {
			
		},
		methods: {
			
		}
	}
</script>
<style lang="scss">
page{background: $color-white;}
@import "index.scss";
</style>