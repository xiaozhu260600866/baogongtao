<template>
	<dx-diag title="请填写物流信息" :titBold="false" :open="express">
		<view class="express">
			<weui-input v-model="ruleform.express_name" label="快递" name="express_name" changeField="value" type="select" dataKey="expressArr"
			 left datatype="require"></weui-input>
			<weui-input v-model="ruleform.express_no" label="单号" type="text" name="express_no" datatype="require"></weui-input>
		</view>
		<view class="btn">
			<dx-button type="primary" size="lg" block>确认</dx-button>
		</view>
	</dx-diag>
</template>
<script type="text/javascript">
import dxDiag from "doxinui/components/diag/diag"
import dxButton from "doxinui/components/button/button"　
export default {
	components:{dxDiag,dxButton},
	props: ['express'],
	data() {
		return {
			
		}
	},
	methods: {
		
	}
}

</script>
<style lang="scss">
.express{
	::v-deep .dx-cell{
		border: 1rpx #eee solid;border-radius: 12rpx;margin: 30rpx 0;font-size: 32rpx;
		&::after{display: none;}
		.dx-label{width: 88rpx;}
		.dx-input{font-size: 32rpx;}
	}
}
</style>