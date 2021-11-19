<template>
	<view>
		<page ref="page"></page>
		<view>
			<dx-tabs :tabs="[
				{value: 0,name: '待使用'},
				{value: 1,name: '已使用'},
				{value: 2,name: '已过期'},
				{value: 12,name: '全部'}]" @change="ajax" v-model="data.query.status" selectedColor="#1e97ff" sliderBgColor="#1e97ff" :selectedSize="32" :size="32" :height="92"></dx-tabs>
			<couponLists myclass="bg-f" :data="data.lists.data" :type="1"></couponLists>
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
				formAction: '/api/company/coupon-orderLists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				status: 0,
				couponLists:[]
			}
		},
		onLoad() {
			this.ajax();
		},
		methods: {
			ajax() {
				this.getAjax(this,{token:uni.getStorageSync('token'),type:'my'}).then(msg => {
					
				});
			}
		}
	}
</script>
<style lang="scss">
@import "index.scss";
</style>