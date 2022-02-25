<template>
	<dx-diag title="请填写物流信息" :titBold="false" :open="express" @callBack="express = false" myclass="expressDiag">
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
	props: ['express','ruleform'],
	data() {
		return {
			express: false,
			mpType: 'page',
			ruleform:{}
		}
	},
	methods: {
		
	}
}

</script>
<style lang="scss">

</style>