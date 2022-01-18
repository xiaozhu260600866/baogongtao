<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="top flex-between flex-middle bg-f p12">
				<view class="fs-14 fc-7">通过你的链接购买的人成为客户<br>客户在平台下单均会获得奖励</view>
				<view class="fs-16">客户：<text class="Arial">{{ data.clientNum }}</text>人</view>
			</view>
			<view class="client-group">
				<view class="client-item block-sec flex-middle" v-for="item in data.lists.data">
					<image class="head mr10" :src="item.avatarUrl"></image>
					<view class="info flex1 fs-13 fc-7 lh-1_6">
						<view class="fs-16 fw-bold fc-black" v-if="item.user">{{item.user.name ? item.user.name :'游客'}}</view>
						<view class="fs-16 fw-bold fc-black" v-else>{{item.nickName ? item.nickName :'游客'}}</view>
						<view class="mt3">加入时间：<text class="Arial">{{item.created_at}}</text></view>
					</view>
				</view>
			</view>
			<!-- <view class="plr15 lh-40 main-bg fs-16 fc-white text-right">我的客户：<span class="Arial">{{ data.clientNum }}</span>人</view>
			<view class="client-list flex p10 bg-f mb8" v-for="item in data.lists.data">
				<view class="l-img pr10">
					<image class="img" :src="item.pic" />
				</view>
				<view class="r-infor flex1">
					<p class="p lh-24 fs-15">微信呢称：{{item.nickname ? item.nickname :'游客'}}</p>
					<p class="p lh-24 fs-15" v-if="item.phone">电话号码：{{item.phone}}</p>
					<p class="fc-9 lh-20 fs-12">关注时间：{{item.created_at}}</p>
				</view>
			</view> -->
		</view>
		<view class="pageview"></view>
		<hasMore :parentData="data"></hasMore>
	</view>
</template>

<script>
	import "./index.css";
	export default {
		data() {
			return {
				formAction: '/api/dis/client',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				lists:[{
					headerPic:'http://thirdwx.qlogo.cn/mmopen/vi_32/kzrmgBsECQibKiblwAxN7h9sY9YGlJEzibO4AShmpUzgAYvoNtC6XiaibwCuuZrDbM0TSWhzBhC79uYEwIwhJ3ibZX6Q/132',
					name:'东信科技-梅',
					created_at:'2021-11-24 09:10',
				},{
					headerPic:'https://thirdwx.qlogo.cn/mmopen/vi_32/ricBHcHiaUya3OQNGBOI4u9wzEGtwV9MibOrLeZcgtbiaSP5S4ic7dsTCWF7iajM4jjib2T79OhpkC3AAIs8YajD7gWoQ/132',
					name:'小朱',
					created_at:'2021-10-05 13:23',
				}]
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
					console.log(this.data);
				});
			}
		}
	}
</script>
