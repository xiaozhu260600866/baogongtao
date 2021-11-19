<template>
	<view class="jobs_lists">
		<view class="jobs_item p15 bg-f mb8" v-for="(v,key) in data" v-if="v.get_company">
			<view @click="linkTo('/pages/merchant/recruit/show/index?id='+v.id,1)">
				<view class="flex-between fs-17 fw-bold">
					<view class="position fc-3">{{v.job_position}}</view>
					<view class="main-color Arial">{{v.salary}}</view>
				</view>
				<view class="info fs-15 flex-middle lh-1 mt8 fc-6" v-if="v.get_company">
					<view class="tag mr10">{{v.get_company.name}}</view>
					<!-- <view class="tag mr10 Arial">{{v.get_company.people_num}}人</view>
					<view class="tag mr10">{{v.get_company.status}}</view> -->
				</view>
				<view class="condition">
					<view class="lab" v-for="item in getTag(v)">{{item}}</view>
				</view>
				<view class="userInfo mt10 flex-middle fs-14" v-if="v.get_company">
					<image class="head" :src="v.get_company.logoMinUrl" mode="aspectFill"></image>
					<view class="left flex1 ml10">
						<view class="name">{{v.get_company.charger_name}} {{v.get_company.position}}</view>
					</view>
					<view class="place fc-b">{{v.work_place}}</view>
				</view>
			</view><!-- 
			<view class="edit-nav" v-if="type == 2">
				<dx-button myclass="plr30" type="primary" size="medium" round @click="linkTo('/pages/merchant/recruit/created_edit/edit?id='+v.id,1)">编辑</dx-button>
				<dx-button myclass="ml10 plr30" size="medium" round @click="del(v)">删除</dx-button>
			</view> -->
		</view>
	</view>
</template>
<script>
import dxButton from "doxinui/components/button/button"
export default {
	components: {dxButton},
	props: ['data','type'],
	data() {
		return {
			type: 2,
		}
	},
	methods: {
		del(v){
			this.getConfirm("是否删除？",msg=>{
				
				this.postAjax("/api/company/recruit-del",{id:v.id,token:uni.getStorageSync('token')}).then(msg=>{
					 this.getParent(this).ajax();
				});
			})
		},
		getTag(v){
			let arr = [];
			arr.push(v.salary)
			arr.push(v.education)
			arr.push(v.home_date)
			return arr;
		}
	}
}

</script>
<style lang="scss">
.jobs_item{
	.condition{
		display: flex;flex-wrap: wrap;margin: 30rpx 0;
		.lab{background-color: #f5f5f5;padding: 0 16rpx;line-height: 48rpx;color: #666;font-size: 28rpx;margin-right: 12rpx;border-radius: 8rpx;}
	}
	.userInfo{
		.head{width: 60rpx;height: 60rpx;display: flex;border-radius: 50%;background-color: #eee;}
	}
	.edit-nav{display: flex;justify-content: flex-end;border-top: 1rpx #eee solid;padding-top: 20rpx;}
}
</style>