<template>
	<view>
		<page ref="page"></page>
		<view>
			<view class="bg-f">
				<weui-input v-model="formData.title" label="标题" name="title" placeholder="请输入求职标题" type="text" datatype="require"></weui-input>
				<weui-input v-model="formData.name" label="姓名" name="name" placeholder="请输入您的姓名" type="text" datatype="require"></weui-input>
				<weui-input v-model="formData.phone" label="联系电话" name="phone" placeholder="请输入联系电话" type="number" datatype="require"></weui-input>
				<weui-input v-model="formData.content" placeholder="请输入求职信息" type="textarea" name="content" datatype="require"></weui-input>
			</view>
		</view>
		<view class="p20">
			<form-submit :formData="formData" :vaildate="vaildate" @callBack="submit"></form-submit>
		</view>
	</view>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import { job, jobStore } from "@/api/user";
import weuiInput from "@/components/tytrock/components/weui-input.vue";
import formSubmit from "@/components/tytrock/components/form-submit.vue";
export default {
	components: {
		weuiInput,
		formSubmit
	},
	data() {
		return {
			sysUser: uni.getStorageSync('sysUser'),
			vaildate: {},
			formData: {title:'',name:'',phone:'',content: ''}
		}
	},
	onShow(){
		this.formData.name = this.sysUser.name;
		this.formData.phone = this.sysUser.phone;
		
		this.pageLoading(this);
		job({}).then(res=>{
			this.pageLoading(this,false);
			if(res.data.data){
				this.formData.name = res.data.data.name;
				this.formData.phone = res.data.data.phone;
				this.formData.title = res.data.data.title;
				this.formData.content = res.data.data.content;
			}
		})
	},
	methods: {
		...mapMutations(['setUserInfo']),
		submit(){
			//return ;
			//if(!this.formData.hr_info) return this.msgToast('请输入求职信息');
			this.submitLoading(this);
			jobStore(this.formData).then((res)=>{
				this.submitLoading(this,false);
				this.tytMessage(this,'success',res.msg)
				setTimeout(()=>{uni.navigateBack()},1000)
			})
		}
	}
}
</script>