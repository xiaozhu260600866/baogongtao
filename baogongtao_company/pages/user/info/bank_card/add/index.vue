<template>
	<view>
		<page ref="page"></page>
		<view class="pb50">
			<view class="bg-f">
				<weui-input v-model="formData.name" label="持卡人" type="text" name="name" disabled="disabled"></weui-input>
				<weui-input v-model="formData.bank" label="开户行" placeholder="请选择开户行" type="select" name="bank" dataKey="banks" selectLabel="name" changeField="name" datatype="require"></weui-input>
				<weui-input v-model="formData.carno" label="卡号" placeholder="请填写银行卡号" type="text" name="carno" datatype="require"></weui-input>
			</view>
		</view>
		<view class="p20">
			<form-submit :vaildate="vaildate" :formData="formData" @callBack="submit"></form-submit>
		</view>
	</view>
</template>

<script>
import { bankcard, bankcardStore } from "@/api/user";
import { attributes } from "@/api/base";
import formSubmit from "@/components/tytrock/components/form-submit.vue";
import weuiInput from "@/components/tytrock/components/weui-input.vue";
export default {
	components:{
		formSubmit,
		weuiInput
	},
	data() {
		return {
			sysUser: uni.getStorageSync('sysUser'),
			formData:{name:'',bank:'',carno:''},
			banks: [],
			vaildate: {}
		}
	},
	onLoad() {
		
	},
	onShow(){
		this.formData.name = this.sysUser.name;
		this.pageLoading(this);
		attributes({type:3}).then(res=>{
			this.banks = res.data.lists;
			bankcard({}).then(res=>{
				this.pageLoading(this,false);
				if(res.data.data){
					this.formData.bank = res.data.data.bank;
					this.formData.carno = res.data.data.carno;
				}
			})
		})
	},
	methods: {
		submit: function(e) {
			this.submitLoading(this);
			bankcardStore(this.formData).then((res)=>{
				let userInfo = {
					data: res.data.worker
				}
				this.submitLoading(this,false);
				this.tytMessage(this,'success',res.msg)
				setTimeout(()=>{uni.navigateBack()},1000)
			})
			
		}
	}
}
</script>
