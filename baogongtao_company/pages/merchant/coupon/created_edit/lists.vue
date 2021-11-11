<template>
	<view>
		<page ref="page"></page>
		<view v-if="data.show">
			<couponLists myclass="edit" :data="data.data.lists.data" :type="3" edit></couponLists>
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
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				formAction: '/api/company/coupons',
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
			this.ajax();
		},
		methods: {
			ajax() {
				this.getAjax(this).then(msg => {
					
				});
			}
		}
	}
</script>
<style lang="scss">
@import "index.scss";
</style>