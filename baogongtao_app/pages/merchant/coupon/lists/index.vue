<template>
	<view>
		<page ref="page"></page>
		<view v-if="data.show">
			<view class="banner bg-f">
				<dxSwiper :data="sliders" :imageField="coverUrl" indicatorDotsActColor="#1e97ff"></dxSwiper>
			</view>
			<dx-nav-class :data="navs" @click="checkAuth" myclass="mb10" :num="4" :nameSize="15" :namePTop="10" :imgR="20"></dx-nav-class>
			<couponLists myclass="bg-f" :data="data.data.lists.data" :type="3"></couponLists>
		</view>
	</view>
</template>

<script>
	import { multipleAttributes, multiplePosters } from "@/api/base";
	import couponLists from '@/components/couponLists'
	import dxSwiper from "@/components/swiper/swiper"
	import dxNavClass from "doxinui/components/nav-class/nav-class"
		export default {
			components:{couponLists,dxSwiper,dxNavClass},
			data() {
				return {
					formAction: '/api/company/coupons?shop_status=1',
					mpType: 'page', //用来分清父和子组件
					data: this.formatData(this),
					getSiteName: this.getSiteName(),
					navs:[],
					sliders:[
						{coverUrl:'https://www.baogongtao.com/upload/images/poster/qaM33EeDK6.jpg'},
					],
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
			onReachBottom() {
				this.hasMore(this);
			},
			onPullDownRefresh() {
				this.data.nextPage = 1;
				this.ajax();
			},
			onShareAppMessage() {
				return this.shareSource(this, '包工淘');
			},
			onLoad() {
				multiplePosters({types:"10,11,7",nums:"5,4,1"}).then((res)=>{
					this.sliders = res.data.data[11];
					this.navs = res.data.data[10];
					if(this.navs.length){
						this.navs.forEach(v=>{
							this.$set(v,"cover",v.coverMinUrl);
						})
					}
					
					
					
				});
				this.ajax();
			},
			methods: {
				checkAuth(v){
					return this.linkTo(v.url,v.type);
				},
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