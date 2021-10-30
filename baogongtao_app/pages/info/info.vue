<template>
	<view>
		<page ref="page"></page>
		<view class="p20 bg-f"><u-parse :content="detailData.content" /></view>
	</view>
</template>

<script>
import { info } from "@/api/base";
import uParse from '@/components/gaoyia-parse/parse.vue'
export default {
	components: { uParse },
	data() {
		return {
			id: '',
			detailData: '',
		}
	},
	onLoad(options) {
		this.pageLoading(this)
		this.id = options.id
		info({id:this.id}).then(res=>{
			this.detailData = res.data.data;
			uni.setNavigationBarTitle({
				title: this.detailData.name
			});
			this.pageLoading(this,false);
		})
	},
	onShow(){
		
	},
	methods: {
	}
}
</script>

<style>
</style>
