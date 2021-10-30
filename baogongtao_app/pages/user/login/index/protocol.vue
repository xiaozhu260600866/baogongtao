<template>
	<view>
		<page ref="page"></page>
		<view class="con p20 bg-f"><u-parse :content="rule.content" /></view>
	</view>
</template>

<script>
import { info } from "@/api/base";
import uParse from '@/components/gaoyia-parse/parse.vue'
export default {
	components: { uParse },
	data() {
		return {
			rule: '',
		}
	},
	onLoad() {
		
	},
	onShow(){
		this.pageLoading(this)
		info({id:4}).then(res=>{
			this.rule = res.data.data;
			this.pageLoading(this,false);
		})
	},
	methods: {
	}
}
</script>

<style>
</style>
