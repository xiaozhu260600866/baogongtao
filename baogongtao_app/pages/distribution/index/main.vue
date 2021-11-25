<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<view class="dis-header">
				<view class="head-img">
					<img class="img" :src="data.distribution.getCover">
				</view>
				<view class="dis-info">
					<view class="name fs-18">{{ data.distribution.name}}</view>
					<!-- <view class="phone fs-16 mt10 Arial">{{ data.distribution.phone}}</view> -->
				</view>
			</view>
			<view class="dis-count">
				<view class="top flex-between flex-middle plr12" @click="goto('/pages/distribution/record-list/main',1)">
					<view class="left text-center">
						<view class="txt">可提现金额(元)</view>
						<view class="num fs-24 ">0</view>
					</view>
					<view class="right">
						<dx-button type="primary" myclass="plr25" size="small" txtColor="#623d04" round>去提现</dx-button>
					</view>
				</view>
				<view class="bottom flex-middle plr12 ptb20 fs-13">
					<view class="row w-b65">
						<text class="txt">累计收益(含未到账)</text>
						<text class="num pl5 fs-20">{{toFixed(0)}}</text>
					</view>
					<view class="row w-b35">
						<text class="txt">累计订单</text>
						<text class="num pl5 fs-20">0</text>
					</view>
				</view>
			</view>
			<view class="sup-sec">
				<view class="sec-group" @click="goto('/pages/distribution/team/main',1)">
					<view class="icon"><text class="nav iconfont icon-dis-team"></text></view>
					<view class="name">我的团队</view>
				</view>
				<view class="sec-group" @click="goto('/pages/distribution/client/main',1)">
					<view class="icon"><text class="nav dxi-icon dxi-icon-user-fill1"></text></view>
					<view class="name">我的客户</view>
				</view>
				<view class="sec-group" @click="goto('/pages/distribution/qrcode/main',1)">
					<view class="icon"><text class="nav dxi-icon dxi-icon-qrcode2 fs-22"></text></view>
					<view class="name">我的二维码</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import selectSimple from "xiaozhu/wechatapp/components/selectSimple";
	export default {
		data() {
			return {
				formAction: '/api/dis/index',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				selectType: 'toDay',
				getSiteName: this.getSiteName(),
			}
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onLoad(options) {
			this.ajax();
		},
		components: {
			selectSimple
		},
		methods: {
			ajax() {
				this.getAjax(this,{token:uni.getStorageSync('token')}).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
<style>
@import "./index.css";
</style>