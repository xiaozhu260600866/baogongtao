<template>
	<view>
		<page ref="page"></page>
		<task-show :data="taskData" status v-if="taskData.id"></task-show>
	</view>
</template>

<script>
import { detail } from "@/api/task";
import taskShow from '@/components/taskShow';
export default {
	components: { taskShow },
	data() {
		return {
			task_id: '',
			taskData: {},
		}
	},
	onLoad(options) {
		this.task_id = options.id;
	},
	onShow(){
		this.getDetail();
	},
	methods: {
		getDetail(){
			this.pageLoading(this);
			detail({id:this.task_id}).then(res=>{
				this.taskData = res.data.data;
				this.pageLoading(this, false);
			})
		}
	}
}
</script>

<style>

</style>