<template>
	<view>
		<page ref="page"></page>
		<view>
			<dx-tabs :tabs="[
				{value: 0,name: '待使用'},
				{value: 1,name: '已使用'},
				{value: 2,name: '已过期'},
				{value: 12,name: '全部'}]" @change="ajax" v-model="status" selectedColor="#57C734" sliderBgColor="#57C734" :selectedSize="32" :size="32" :height="92"></dx-tabs>
			<couponLists myclass="bg-f" :data="couponLists" :type="1"></couponLists>
		</view>
	</view>
</template>

<script>
	import couponLists from '@/components/couponLists'
	import dxTabs from "doxinui/components/tabs/tabs"
	export default {
		components:{couponLists,dxTabs},
		data() {
			return {
				status: 0,
				couponLists:[{
					name:'寳之林古典红木珍藏馆8.8折优惠券',
					cover:'/static/images/news/02.jpg',
					getCoupon:{
						logo_url:'/static/images/news/01.jpg',
						abstract: '林古典红木珍藏馆8.8折优惠券'
					},
					merchant_names:'456在线',
					created_at:'2021-08-21 17:44:33',
					start_at: '2021-10-01',
					end_at:'2021-10-31',
					status: 0,
				},{
					name:'日与夜．烧烤．鸡子煲9折优惠券',
					cover:'/static/images/news/03.jpg',
					getCoupon:{
						logo_url:'/static/images/news/02.jpg',
						abstract: '日与夜．烧烤．鸡子煲 9折优惠券'
					},
					merchant_names:'456在线',
					created_at:'2021-08-21 17:20:56',
					start_at: '2021-10-01',
					end_at:'2021-10-31',
					status: 1,
				},{
					name:'日与夜．烧烤．鸡子煲9折优惠券',
					cover:'/static/images/news/01.jpg',
					getCoupon:{
						logo_url:'/static/images/news/02.jpg',
						abstract: '日与夜．烧烤．鸡子煲 9折优惠券'
					},
					merchant_names:'456在线',
					created_at:'2021-08-21 17:20:56',
					start_at: '2021-10-01',
					end_at:'2021-10-31',
					status: 2,
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