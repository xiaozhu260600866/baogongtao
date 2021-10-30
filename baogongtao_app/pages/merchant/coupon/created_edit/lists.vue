<template>
	<view>
		<page ref="page"></page>
		<view>
			<couponLists myclass="edit" :data="couponLists" :type="3" edit></couponLists>
			<dxftButton type="primary" size="lg" @click="linkTo('/pages/merchant/coupon/created_edit/edit',1)">发布</dxftButton>
		</view>
	</view>
</template>

<script>
	import dxftButton from "doxinui/components/button/footer-button"
	import couponLists from '@/components/couponLists'
	export default {
		components:{dxftButton,couponLists},
		data() {
			return {
				couponLists:[{
					name:'寳之林古典红木珍藏馆8.8折优惠券',
					cover:'/static/images/news/02.jpg',
					getCoupon:{
						logo_url:'/static/images/news/01.jpg',
						abstract: '林古典红木珍藏馆8.8折优惠券'
					},
					created_at:'2021-08-21 17:44:33',
					location:'1.2',
					
				},{
					name:'日与夜．烧烤．鸡子煲9折优惠券',
					cover:'/static/images/news/03.jpg',
					getCoupon:{
						logo_url:'/static/images/news/02.jpg',
						abstract: '日与夜．烧烤．鸡子煲 9折优惠券'
					},
					created_at:'2021-08-21 17:20:56',
					location:'0.5',
					
				}]
			}
		},
		onLoad() {
			
		},
		methods: {
			
		}
	}
</script>
<style lang="scss">
@import "index.scss";
</style>