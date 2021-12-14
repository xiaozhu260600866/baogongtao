<template>
	<view>
		<page ref="page"></page>
		<view v-if="data.show">
			<view class="banner bg-f">
				<dxSwiper :data="sliders" :imageField="coverUrl" indicatorDotsActColor="#1e97ff"></dxSwiper>
			</view>
			<dx-nav-class :data="navs" @click="checkAuth" myclass="mb10" :num="4" :nameSize="15" :namePTop="10" :imgR="20"></dx-nav-class>
			<merchantLists :data="data.lists.data" ></merchantLists>
		</view>
	</view>
</template>

<script>
	import { multipleAttributes, multiplePosters } from "@/api/base";
	import merchantLists from '@/components/merchantLists'
	import dxSwiper from "@/components/swiper/swiper"
	import dxNavClass from "doxinui/components/nav-class/nav-class"
	export default {
		components:{merchantLists,dxSwiper,dxNavClass},
		data() {
			return {
				formAction: '/api/company/getLists?limit=15&shop_status=1',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				sliders:[
				],
				navs:[],
				merchant:[
					{
						headerPic:'/static/images/news/01.jpg',
						userInfo:{
							company_name:'大号干货店',
							remark:'经营南北干货，参茸海味,食疗食材',
							address:'天龙一街(江门市蓬江区)美食',
							getIndustry:['零食商超','干货'],
						}
					}
				]
			}
		},
		onLoad() {
			multiplePosters({types:"12,13,7",nums:"5,4,1"}).then((res)=>{
				this.sliders = res.data.data[12];
				this.navs = res.data.data[13];
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
				this.getAjax(this,{token:uni.getStorageSync('token')}).then(msg => {
					
				});
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
	}
</script>
<style lang="scss">
@import "index.scss";
</style>