<template>
	<view>
		<page ref="page"></page>
		<view class="pb70">
			<!-- 第一个 -->
			<view class="cert-item block-sec">
				<weui-input v-model="ruleform.certName" label="证书名称" type="text" name="certName" datatype="require"></weui-input>
				<weui-input v-model="ruleform.cert" type="upload" upurl='article' allowUpLoadNum="5" name="cert" tips="上传证书"
				 datatype="require"></weui-input>
			</view>
			<!-- 之后添加的 -->
			<view class="cert-item block-sec">
				<weui-input v-model="ruleform.certName" label="证书名称" type="text" name="certName" datatype="require"></weui-input>
				<weui-input v-model="ruleform.cert" type="upload" upurl='article' allowUpLoadNum="5" name="cert" tips="上传证书"
				 datatype="require"></weui-input>
				<view class="flex-center ptb10">
					<dx-button type="danger" myclass="plr60" round>删除</dx-button>
				</view>
			</view>
			<view class="cert-add flex-center mt15">
				<dx-button type="primary" size="lg" myclass="plr80" round>+ 添加</dx-button>
			</view>
			<dxftButton type="primary" size="lg">提交</dxftButton>
		</view>
	</view>
</template>

<script>
	import dxftButton from "doxinui/components/button/footer-button"
	export default {
		components:{dxftButton},
		data() {
			return {
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{}
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
.cert-item{
	::v-deep .dx-cell{
		font-size: 34rpx;
	}
		
}
</style>