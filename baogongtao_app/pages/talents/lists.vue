<template>
	<view>
		<page ref="page"></page>
		<view v-if="data.show">
		<!-- <view class="title">PHP开发工程师</view> -->
			<view class="talents">
				<view class="talents-lists bg-f p15 mb8" v-for="item in data.data.lists.data" @click="goto('/pages/talents/show',1)">
					<view class="info flex-between">
						<view class="left">
							<view class="name fs-18 fw-bold fc-3">{{item.name}}</view>
							<view class="labG">
								<view class="lab Arial" v-if="item.get_user_info.experience">{{item.get_user_info.experience}}</view>
								<view class="lab" v-if="item.get_user_info.education">{{item.get_user_info.education}}</view>
								<view class="lab" v-if="item.get_user_info.salary">{{item.get_user_info.salary}}</view>
							</view>
						</view>
						<view class="right">
							<image class="head" :src="item.get_wechat_user.avatarUrl" mode="aspectFill"></image>
						</view>
					</view>
					<view class="con flex-middle fs-15 fc-3 pt10">
						<!-- <view class="company">{{item.get_user_info.company_name}}</view>
						<view class="dot"></view> -->
						<view class="position">{{item.get_user_info.industry}}</view>
					</view>
				
					<view class="pt10" v-if="item.get_user_info.tags">
						<view v-if="item.get_user_info.tags.split(',').length">
						<dx-tag type="info" myclass="mr10 mb10" plain tagBg="#f4f4f4" tagBd="#f7f7f7" txtColor="#666" padding="0 16rpx" v-for="v in item.get_user_info.tags.split(',')">{{v}}</dx-tag></view>
					</view>
					<view class="intro text-justify wrap2 fs-14 fc-6 " :class="item.get_user_info.tags?'':'pt10'" v-if="item.get_user_info.remark">{{item.get_user_info.remark}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import dxTag from "doxinui/components/tag/tag"
	export default {
		components:{dxTag},
		data() {
			return {
				formAction: '/api/user/lists?role=12&industry_not_null=1',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				talents:[{
					name:'梁先生',
					year:7,
					education:'大专',
					money: '6~11K',
					headerPic: '/static/images/logo.png',
					company:'东信',
					position:'php',
					intro:'PHP+MySQL，thinkPHP框架，ECShop商城开源系统，dedecms内容管理系统，WordPress博客系统，WordPress博客系统'
				},{
					name:'梁先生',
					year:7,
					education:'大专',
					money: '6~11K',
					headerPic: '/static/images/logo.png',
					company:'东信',
					position:'php',
					intro:'PHP+MySQL，thinkPHP框架，ECShop商城开源系统，dedecms内容管理系统，WordPress博客系统，WordPress博客系统'
				}]
			}
		},
		onLoad() {
			this.ajax();
		},
		methods: {
			ajax() {
				this.getAjax(this,{token:uni.getStorageSync('token')}).then(msg => {
					
				});
			}
		}
	}
</script>
<style lang="scss">
@import "index.scss";
</style>