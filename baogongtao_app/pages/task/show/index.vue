<template>
	<view>
		<page ref="page"></page>
		<view v-if="taskData.id"></view>
			<task-show :data="taskData" v-if="taskData.id"></task-show>
			<view class="ftip" v-if="taskData.openStatus==0">该任务于{{ taskData.open_started_date }}开始报名</view>
			<view v-if="taskUser.id">
				<dx-footer-button type="primary">已报名</dx-footer-button>
			</view>
			<view v-else>
				<dx-footer-button type="primary" @click="applyAction" v-if="taskData.openStatus==1">立即申请</dx-footer-button>
				<dx-footer-button v-else-if="taskData.openStatus==0">报名未开始</dx-footer-button>
				<dx-footer-button v-else-if="taskData.openStatus==2">报名已结束</dx-footer-button>
			</view>
		</view>
	</view>
</template>

<script>
import { detail, user } from "@/api/task";
import taskShow from '@/components/taskShow';
import dxButton from 'doxinui/components/button/button';
import dxFooterButton from 'doxinui/components/button/footer-button.vue'
export default {
	components: { taskShow, dxButton, dxFooterButton },
	data() {
		return {
			sysUser: {},
			task_id: '',
			taskData: {},
			taskUser: {},
		}
	},
	onLoad(options) {
		this.task_id = options.id;
	},
	onShow(){
		this.sysUser = uni.getStorageSync('sysUser');
		if(this.sysUser.id){
			user({task_id:this.task_id,user_id:this.sysUser.user_id}).then(res=>{
				this.taskUser = res.data.data;
				this.getDetail();
			})
		}else this.getDetail();
	},
	methods: {
		getDetail(reload=0){
			if(!reload) this.pageLoading(this);
			detail({id:this.task_id}).then(res=>{
				this.taskData = res.data.data;
				if(reload) uni.stopPullDownRefresh();
				else this.pageLoading(this, false);
			})
		},
		applyAction(){
			if(!this.sysUser.id) return this.linkTo('/pages/user/login/index/index',1);
			else if(this.sysUser.status != 1){
				return this.msgConfirm('申请任务前需先进行实名认证','去认证','取消').then(res=>{
					this.linkTo('/pages/user/authenticate/index',1);
				}).then(res=>{})
			}
			else return this.linkTo('/pages/task/show/apply?id=' + this.taskData.id,1)
		}
	},
	onPullDownRefresh(){
		this.getDetail(1);
	}
}
</script>

<style>

.ftip{position: fixed;bottom: 100upx;left: 0;right: 0;background: rgba(254,148,19,0.5);height: 50upx;line-height: 50upx;text-align: center;color: #fe5817;}

/* 产品底部 */
#footer{height: 100upx;position: fixed;left: 0;bottom: 0;width: 100%;background: #fff;z-index:99;display: flex;}
#footer:before{content: '';position: absolute;top: 0;right: 0;left: 0;border-top: 1upx solid #eaeef1;-webkit-transform: scaleY(0.5);-ms-transform: scaleY(0.5);transform: scaleY(0.5);}
#footer .left{display: flex;}
#footer .left .btn-item{padding: 8upx 0;margin: 0;width: 92upx;text-align: center;background: transparent;}
#footer .left .iconfont{height: 52upx;line-height: 56upx;font-size: 40upx;color: #666;}
#footer .left .txt{height: 32upx;line-height: 32upx;font-size: 24upx;color: #666;}

#footer .right{line-height: 100upx;display: flex;flex: 1;overflow: hidden;}
#footer .right myform{width: 100%;}
#footer .right .r-nav{width: 100%;padding: 10upx 6upx;}
#footer .right .r-item{text-align: center;font-size: 28upx;color: #fff;height: 80upx;line-height: 80upx;border-radius: 40upx;}
#footer .right .r-item-yellow{background-color: #FEAE1B;} 
#footer .right .r-item-red{background-color: #FF4949;}
#footer .right .r-item-default{background-color: #eee;color: #999;}
</style>