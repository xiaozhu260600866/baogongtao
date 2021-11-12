<template>
	<view>
		<page ref="page"></page>
		<view>
			<dx-tabs :tabs="[
				{value: 0,name: '待使用'},
				{value: 1,name: '已使用'},
			]" selectedColor="#55b4f6" sliderBgColor="#55b4f6"  v-model="status" @change="ajax" :height="100" :size="32" :selectedSize="32"></dx-tabs>
			<couponLists myclass="bg-f" :data="data.lists.data" :type="2"></couponLists>
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
				formAction: '/api/company/coupon-orderLists?company_id='+uni.getStorageSync('sysCompany').id,
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),	
				couponLists:[],
				status:0
			}
		},
		onLoad() {
			this.ajax();
		},
		methods: {
			ajax() {
				this.getAjax(this,{token:uni.getStorageSync('token'),status:this.status}).then(msg => {
					
				});
			}
		}
	}
</script>
<style lang="scss">
@import "index.scss";
</style>