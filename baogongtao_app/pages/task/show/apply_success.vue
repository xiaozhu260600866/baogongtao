<template>
	<view>
		<page ref="page"></page>
		<view class="tui-bg"></view>
		<view class="tui-content" v-if="taskUser.id">
			<view class="tui-form">
				<image src="/static/images/success.png" class="tui-icon"></image>
				<view class="tui-title">报名成功</view>
				<view class="tui-sub-title"></view>
				<view class="tui-btn-box">
					<dx-button type="success" width="240rpx" height="70rpx" :size="28" plain shape="circle" @click="linkTo('/pages/index/index',2)">返回首页</dx-button>
					<dx-button type="primary" width="240rpx" height="70rpx" :size="28" shape="circle" @click="linkTo('/pages/task/show/index?id=' + taskUser.task_id,1)">返回任务详情</dx-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { user } from "@/api/task";
import dxButton from "doxinui/components/button/button"
export default {
	components: {
		dxButton
	},
	data() {
		return {
			id: '',
			taskUser: {},
		}
	},
	onLoad(options){
		this.id = options.id;
	},
	onShow(){
		this.getData();
	},
	methods: {
		getData(){
			user({id:this.id}).then(res=>{
				this.taskUser = res.data.data;
			})
		}
	}
}
</script>

<style>
.tui-bg {
	width: 100%;
	height: 260rpx;
	background: linear-gradient(180deg, #55b4f6, #75b4f6);
	border-bottom-left-radius: 42rpx;
}

.tui-content {
	padding: 0 35rpx;
	box-sizing: border-box;
}

.tui-form {
	background: #fff;
	height: 500rpx;
	box-shadow: 0 10rpx 14rpx 0 rgba(0, 0, 0, 0.08);
	border-radius: 10rpx;
	margin-top: -160rpx;
	position: relative;
	z-index: 10;
	display: flex;
	align-items: center;
	flex-direction: column;
}

.tui-icon {
	width: 100rpx;
	height: 100rpx;
	display: block;
	margin-top: 60rpx;
}

.tui-title {
	font-size: 42rpx;
	line-height: 42rpx;
	padding-top: 28rpx;
}

.tui-sub-title {
	color: #666666;
	font-size: 28rpx;
	line-height: 28rpx;
	padding-top: 20rpx;
}

.tui-btn-box {
	width: 580rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-top: 88rpx;
}

.tui-tips {
	font-size: 26rpx;
	padding: 48rpx 90rpx;
	box-sizing: border-box;
	text-align: justify;
	line-height: 48rpx;
}

.tui-grey {
	color: #666;
}

.tui-light-grey {
	color: #888;
}
</style>
