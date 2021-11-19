<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<cashLists :data="data.couponLists.data" :type="3" :myclass="['bus-coupon',data.couponLists.data.length > 3?'pb50':'']"></cashLists>
			<!-- <hasMore :parentData="data" source="nodata" message="暂无免费券"></hasMore> -->
		</view>
	</view>
</template>

<script>

	import dxNavClass from "doxinui/components/nav-class/nav-class"
	import cashLists from "@/components/cashLists.vue"
	export default {
		components:{dxNavClass,cashLists},
		data() {
			return {
				formAction: '/shop/user',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{},
				vaildate:{},
				cashLists:[
					{
						cover:'k7ymNQP51P.jpg',
						name:'桶装水5桶1',
						getCoupon:{
							abstract:''
						},
						created_at:'2021-07-21 09:40:55',
						isEx:'0'
					},
					{
						cover:'k7ymNQP51P.jpg',
						name:'桶装水5桶2',
						getCoupon:{
							abstract:''
						},
						created_at:'2021-07-21 09:40:55',
						isEx:'1'
					},
					{
						cover:'k7ymNQP51P.jpg',
						name:'桶装水5桶3',
						getCoupon:{
							abstract:''
						},
						created_at:'2021-07-21 09:40:55',
						isEx:'1'
					},
					{
						cover:'k7ymNQP51P.jpg',
						name:'桶装水5桶4',
						getCoupon:{
							abstract:''
						},
						created_at:'2021-07-21 09:40:55',
						isEx:'0'
					}
				]
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
			if (this.data.dis) this.data.query.distribution = this.data.dis.id;
			return this.shareSource(this, '456在线','1');
		},
		onLoad(options) {
			wx.removeStorageSync('order_no');			wx.removeStorageSync('package');
			this.getMyAddress(this,msg=>{
				this.ajax();
			})
		},
		onShow(){
			this.onShow(this);
		},
		methods: {
			checkAuth(v){
				return this.goto(v.url,v.type);
			},
			text(){
				
					this.ajax()
					this.ajax()
				
			},
			toMerchant(){
				uni.navigateToMiniProgram({
					appId: 'wxb135e689e76457d2',
					path: 'pages/index/main',
					extraData: {
						'data1': 'test'
					},
					success(res) {
					// 打开成功
					}
				})
			},
			toZtd(){
				uni.navigateToMiniProgram({
				  appId: 'wxa6cfc3a417501b21',
				  path: 'pages/ztd/index/main',
				  extraData: {
				    'data1': 'test'
				  },
				  success(res) {
				    // 打开成功
				  }
				})
			},
			toManager(){
				uni.navigateToMiniProgram({
				  appId: 'wxf15d3bf6eb13b8dd',
				  path: 'pages/manager/index/main',
				  extraData: {
				    'data1': 'test'
				  },
				  success(res) {
				    // 打开成功
				  }
				})
			},
			
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			}
		},
		components: {}
	}
</script>

<style>
</style>
