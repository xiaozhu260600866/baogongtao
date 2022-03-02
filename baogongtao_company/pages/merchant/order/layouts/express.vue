<template>
	<dx-diag title="请填写物流信息" :titBold="false" :open="express" @callBack="express = false" myclass="expressDiag">
		<view class="express">
			<weui-input v-model="ruleform.express_name" label="快递" name="express_name" changeField="value" type="select" dataKey="expressArr"
			 left datatype="require"></weui-input>
			<weui-input v-model="ruleform.express_no" label="单号" type="text" name="express_no" datatype="require"></weui-input>
		</view>
		<view class="btn">
			<dx-button type="primary" size="lg" block @click="submit">确认</dx-button>
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
		ajax(ruleform){
			this.ruleform = ruleform;
			this.express = true;
		},
		submit(){
			if(!this.ruleform.express_name){
				return this.getError("请输入快递号");
			}
			if(!this.ruleform.express_no){
				return this.getError("请输入单号");
			}
			this.ruleform.type = 2;
			this.postAjax("/admin/shop/order/modify",this.ruleform).then(msg=>{
				if(msg.data.status == 2){
					this.getParent(this).ajax();
				}
			})
			
		}
	}
}

</script>
<style lang="scss">

</style>