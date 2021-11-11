<template>
	<view>
		<page ref="page"></page>
		<view>
			<dx-tabs :tabs="[
				{value: 0,name: '待使用',num:6},
				{value: 1,name: '已使用',num:3},
			]" selectedColor="#55b4f6" sliderBgColor="#55b4f6" @change="ajax" :height="100" :size="32" :selectedSize="32"></dx-tabs>
			<couponLists myclass="bg-f" :data="couponLists" :type="2"></couponLists>
		</view>
	</view>
</template>

<script>
	import dxTabs from "doxinui/components/tabs/tabs"
	import couponLists from '@/components/couponLists'
	export default {
		components:{couponLists,dxTabs},
		data() {
			return {
				couponLists:[{
					created_at:'2021-06-16 12:36:44',
					updated_at:'2021-06-16 18:55:13',
					name:'100元现金券',
					getCoupon:{
						logo_url:'/static/images/news/01.jpg',
						abstract:'100元现金券'
					},
					getUser:{
						nickname:'东信梅',
					},
					status: 0,
				},{
					created_at:'2021-06-16 12:36:44',
					updated_at:'2021-07-02 18:14:28',
					name:'100元现金券',
					getCoupon:{
						logo_url:'/static/images/news/02.jpg',
						abstract:'100元现金券'
					},
					getUser:{
						nickname:'东信梅',
					},
					status: 1,
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