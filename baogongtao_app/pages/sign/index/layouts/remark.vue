<template>
	<view>
		<page ref="page"></page>
		<view class="remark">
			<weui-input v-model="ruleform.remark" placeholder="请填写备注信息" type="textarea" name="remark"
				datatype="require"></weui-input>
			<weui-input v-model="ruleform.cover" type="upload" upurl='sign' allowUpLoadNum="4" name="cover"
				datatype="array" :sourceType="1" errorMessage="图片必填"></weui-input>
		</view>
		<dxftButton type="primary" size="lg" round @click="submit">确认</dxftButton>
	</view>
</template>

<script>
	import dxftButton from "doxinui/components/button/footer-button"
	export default {
		components: {
			dxftButton
		},
		data() {
			return {
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform: {
					location_x: '',
					location_y: '',
					address: '',
					city: '',
					type: 0
				},
				vaildate:{}
			}
		},
		onLoad() {

		},
		methods: {
			submit() {
				this.vaildForm(this, res => {
					if (res) {
						uni.setStorageSync('remark', this.ruleform.remark);
						uni.setStorageSync('cover', this.ruleform.cover);
						this.back();
					}
				})
			}
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
	.remark {
		background: #fff::v-deep .dx-cell {
			padding: 30rpx !important;

			&::after {
				display: none;
			}

			.dx-text {
				min-height: 400rpx;
				height: 400rpx;
			}
		}
	}
</style>
