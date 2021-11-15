<template>
	<view>
		<page ref="page"></page>
		<view v-if="data.show">
			<couponLists myclass="bg-f" :data="data.data.lists.data" :type="3"></couponLists>
		</view>
	</view>
</template>

<script>
	import couponLists from '@/components/couponLists'
	export default {
		components:{couponLists},
		data() {
			return {
				formAction: '/api/company/coupons',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				couponLists:[{
					name:'寳之林古典红木珍藏馆8.8折优惠券',
					cover:'/static/images/news/02.jpg',
					getCoupon:{
						logo_url:'/static/images/news/01.jpg',
						abstract: '林古典红木珍藏馆8.8折优惠券'
					},
					merchant_names:'456在线',
					created_at:'2021-08-21 17:44:33',
					
				},{
					name:'日与夜．烧烤．鸡子煲9折优惠券',
					cover:'/static/images/news/03.jpg',
					getCoupon:{
						logo_url:'/static/images/news/02.jpg',
						abstract: '日与夜．烧烤．鸡子煲 9折优惠券'
					},
					merchant_names:'456在线',
					created_at:'2021-08-21 17:20:56',
					
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