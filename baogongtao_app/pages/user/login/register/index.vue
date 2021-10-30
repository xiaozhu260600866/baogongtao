<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<image class="register-bg" src="../../../../static/register-bg.jpg"></image>
		<view>
			<view class="write-area">
				<!-- 上传头像 -->
				<view class="write-group" v-if="type == 0">
					<view class="item-title">上传头像</view>
					<view class="item-remarks">诚信交友，建议上传真实照片作为头像</view>
					<view class="write-con">
						<view class="upload-head">
							<image class="img" src="../../../../static/register-head.jpg"></image>
							<span class="iconfont icon-camera"></span>
						</view>
					</view>
					<view class="write-btn">
						<view class="dx-btn dx-btn-lg dx-btn-red" @click="type = 1">下一步</view>
					</view>
				</view>
				
				<!-- 基本资料 -->
				<view class="write-group" v-if="type == 1">
					<view class="item-title">基本资料</view>
					<view class="item-remarks">完善资料为您匹配最合适的人</view>
					<view class="write-con">
						<view class="write-input">
							<weui-input v-model="ruleform.city" label="所在城市" type="select" name="city"></weui-input>
						</view>
						<view class="write-input">
							<weui-input v-model="ruleform.date" label="出生日期" type="select" name="date"></weui-input>
						</view>
						<view class="write-input">
							<weui-input v-model="ruleform.height" label="身高" type="select" name="height" dataKey="heightArr"  changeField="label"></weui-input>
						</view>
						<view class="write-input">
							<weui-input v-model="ruleform.education" label="学历" type="select" name="education"></weui-input>
						</view>
						<view class="write-input">
							<weui-input v-model="ruleform.wages" label="月薪" type="select" name="wages"></weui-input>
						</view>
					</view>
					<view class="write-btn">
						<view class="dx-btn dx-btn-lg dx-btn-red" @click="type = 2">下一步</view>
					</view>
				</view>
				<!-- 婚姻情况 -->
				<view class="write-group" v-if="type == 2">
					<view class="item-title">婚姻情况</view>
					<view class="item-remarks">完善资料为您匹配最合适的人</view>
					<view class="write-con">
						<view class="marry-status">
							<view :class="['nav-tabs',marryStaus == 0 ? 'cur' : '']" @click="marryStaus = 0">未婚</view>
							<view :class="['nav-tabs',marryStaus == 1 ? 'cur' : '']" @click="marryStaus = 1">离异</view>
							<view :class="['nav-tabs',marryStaus == 2 ? 'cur' : '']" @click="marryStaus = 2">丧偶</view>
						</view>
					</view>
					<view class="write-btn">
						<view class="dx-btn dx-btn-lg dx-btn-red" @click="type = 3">下一步</view>
					</view>
				</view>
				
				<!-- 设置密码 -->
				<view class="write-group" v-if="type == 3">
					<view class="item-title">设置密码</view>
					<view class="item-remarks">设置密码开启您的幸福之旅</view>
					<view class="item-ignore">跳过</view>
					<view class="write-con">
						<view class="write-input mb50">
							<weui-input v-model="ruleform.passwrod" placeholder="请输入密码" type="text" name="passwrod"></weui-input>
						</view>
					</view>
					<view class="write-btn">
						<view class="dx-btn dx-btn-lg dx-btn-red" @click="goto('/pages/user/index/index',2)">提交</view>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import "./index.css";
	export default {
		data() {
			return {
				type: 0,
				ruleform: {},
				heightArr: [
					{label: '100cm'},
					{label: '101cm'},
					{label: '102cm'},
				],
				marryStaus: 0,
			}
		},
		onLoad() {
			
		},
		methods: {
		}
	}
</script>
