<template>
	<view class="pb50">
		<page ref="page"></page>
		<task-show :data="taskData" v-if="taskData.id"></task-show>
		<view class="rule">
			
			<view class="tit">申请任务须知</view>
			<view class="con"><u-parse :content="rule.content" /></view>
			
			<dx-footer-button type="primary" :loading="btnLoading" @click="apply">已阅读并同意以上须知，立即申请</dx-footer-button>
		</view>
	</view>
</template>

<script>
import { info } from "@/api/base";
import { detail, apply } from "@/api/task";
import dxFooterButton from 'doxinui/components/button/footer-button.vue'
import uParse from '@/components/gaoyia-parse/parse.vue'
import taskShow from '@/components/taskShow';
export default {
	components: { uParse, dxFooterButton, taskShow },
	data() {
		return {
			task_id: '',
			taskData: {},
			rule: '',
			btnLoading: false
		}
	},
	onLoad(options) {
		this.task_id = options.id;
	},
	onShow(){
		this.pageLoading(this)
		detail({id:this.task_id}).then(res=>{
			this.taskData = res.data.data;
			info({id:2}).then(res=>{
				this.rule = res.data.data;
				this.pageLoading(this,false);
			})
		})
		
	},
	methods: {
		apply(){
			this.btnLoading = true;
			this.submitLoading(this);
			apply({task_id:this.taskData.id}).then(res=>{
				this.submitLoading(this,false);
				if(res.code == 0){
					this.tytMessage(this,'success',res.msg)
					this.timeoutLinkTo(this,'/pages/task/show/apply_success?id=' + res.data.data.id);
				}else{
					this.msgError(res.msg);
					this.btnLoading = false;
				}
			})
		}
	},
}	
</script>

<style>
.rule .tit{text-align: center;font-size: 32upx;font-weight: bold;margin-top: 30upx;}
.rule .con{padding: 30upx;}
</style>
