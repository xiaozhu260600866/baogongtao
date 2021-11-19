<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<div class="page-brandlists">
			<div class="plr15 lh-40 main-bg fs-16 fc-white text-right">我的客户：<span class="Arial">{{ data.clientNum }}</span>人</div>
			<div class="client-list flex p10 bg-f mb8" v-for="item in data.lists.data">
				<div class="l-img pr10">
					<image class="img" :src="item.pic" />
				</div>
				<div class="r-infor flex1">
					<p class="p lh-24 fs-15">微信呢称：{{item.nickname ? item.nickname :'游客'}}</p>
					<p class="p lh-24 fs-15" v-if="item.phone">电话号码：{{item.phone}}</p>
					<p class="fc-9 lh-20 fs-12">关注时间：{{item.created_at}}</p>
				</div>
			</div>
		</div>
		<div class="pageview"></div>
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
