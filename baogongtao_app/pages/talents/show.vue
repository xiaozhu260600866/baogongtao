<template>
	<view>
		<page ref="page"></page>
		<view class="pb30" v-if="data.show">
			<view class="talents-info">
				<view class="head">
					<image class="img" :src="avatarUrl?avatarUrl:userInfo.avatarUrl"></image>
					<view class="sex">
						<view class="item man" v-if="ruleform.sex == 1"><text class="iconfont icon-man"></text></view>
						<view class="item women" v-if="ruleform.sex == 2"><text class="iconfont icon-women"></text></view>
					</view>
				</view>
				<view class="info">
					<view class="name">{{ruleform.name}}</view>
					<view class="tag">
						<view class="item">{{ruleform.experience?ruleform.experience+'工作经验':'经验不限'}}</view>
						<view class="item">{{ruleform.birthday?ruleform.birthday:'暂无'}}</view>
						<view class="item">{{ruleform.education?ruleform.education:'暂无'}}</view>
					</view>
				</view>
			</view>
			<view class="talents-item">
				<view class="item-name">求职意向</view>
				<view class="item-con">
					<view class="fs-15 fw-bold">
						<text v-if="ruleform.industry">{{ruleform.industry}}</text>
						<text class="pl10" v-if="ruleform.salary">{{ruleform.salary}}</text>
					</view>
					<view class="fs-14 fc-6 mt5">
						<text v-if="ruleform.address">{{ruleform.address}}</text>
						<text class="pl10" v-if="ruleform.position">{{ruleform.position}}</text>
					</view>
					<view v-if="!ruleform.industry && !ruleform.salary && !ruleform.address && !ruleform.position">暂无</view>
				</view>
			</view>
			<view class="talents-item">
				<view class="item-name">求职状态</view>
				<view class="item-con">
					<view v-if="ruleform.apply_status">{{ruleform.apply_status}}</view>
					<view v-else>暂无</view>
				</view>
			</view>
			<view class="talents-item">
				<view class="item-name">薪资要求</view>
				<view class="item-con">
					<view v-if="ruleform.salary">{{ruleform.salary}}</view>
					<view v-else>暂无</view>
				</view>
			</view>
			<view class="talents-item">
				<view class="item-name">个人职业标签</view>
				<view class="item-con">
					<view v-if="profession_tag.length">
						<dx-tag myclass="mr10 mb10" hollow v-for="item in profession_tag">{{item}}</dx-tag>
					</view>
					<view v-else>暂无</view>
				</view>
			</view>
			<view class="talents-item">
				<view class="item-name">个人简介</view>
				<view class="item-con">
					<view v-if="ruleform.remark">{{ruleform.remark}}</view>
					<view v-else>暂无</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import dxftButton from "doxinui/components/button/footer-button"
import {userinfo} from "@/api/user";
import {attributes,wechatUser } from "@/api/base";
import avatar from "@/components/yq-avatar/yq-avatar.vue";
import dxTag from "doxinui/components/tag/tag"
export default {
	components: {dxftButton,avatar,dxTag},
		data() {
			return {
				sysUser: uni.getStorageSync('sysUser'),
				userInfo: uni.getStorageSync('wxUser'),
				formAction: '/api/user/detail',
				vaildate: {},
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				avatarUrl:'',
				ruleform:{
					sex: 1,
					status: 1,
				},

			}
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onShareAppMessage() {
			this.shareSource(this, '商城');
		},
		onLoad(options) {
			
			this.ajax();
		},
		methods: {
			ajax() {
				this.getAjax(this,{token:uni.getStorageSync('token')}).then(msg => {
					this.ruleform = msg.data.data.get_user_info;
					this.avatarUrl = this.ruleform.avatarUrl ? this.ruleform.avatarUrl : msg.data.data.wechat_user.avatarUrl
				});
			}
		}
	}
</script>
<style lang="scss">
page{background-color: #fff;}
@import "index.scss";
</style>