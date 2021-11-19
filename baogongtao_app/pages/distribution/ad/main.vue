<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<div class="page-brandlists" v-if="data.show && data.ad">
			<view class="block-sec">
				<view class="plr15 ptb10 fs-16">广告位一</view>
				<view class="flex-center pb10"><image class="w-b50 flex bdr6" :src="getSiteName+'/upload/images/disAd/800_'+ data.ad.poster_cover" mode="widthFix" @click="previewImage(data.ad.poster_cover,'disAd')"></image></view>
			</view>
			<view class="block-sec">
				<view class="plr15 ptb10 fs-16">广告位二</view>
				<view class="flex-center pb10"><image class="w-b50 flex bdr6" :src="getSiteName+'/upload/images/disAd/800_'+ data.ad.poster_cover2" mode="widthFix" @click="previewImage(data.ad.poster_cover2,'disAd')"></image></view>
			</view>
		</div>
	</view>
</template>

<script>
	import "./index.css";
	export default {
		data() {
			return {
				formAction: '/shop/dis/ad',
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
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
