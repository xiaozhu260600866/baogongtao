<template>
	<view class="pb50">
		<page ref="page"></page>
		<view class="rule" v-if="step==1">
			
			<view class="tit">实名认证使用协议</view>
			<view class="con"><u-parse :content="rule.content" /></view>
			
			<dx-footer-button type="primary" @click="step=2">我已阅读并同意以上协议</dx-footer-button>
		</view>
		
		<view class="form" v-if="step==2">
			123
		</view>
		
	</view>
</template>

<script>
import { info } from "@/api/base";
import dxFooterButton from '@/components/dxUI/footer-button.vue'
import uParse from '@/components/gaoyia-parse/parse.vue'
export default {
	components: { uParse, dxFooterButton },
	data() {
		return {
			rule: '',
			step: 1,
		}
	},
	onLoad() {
		
	},
	onShow(){
		this.pageLoading(this)
		info({id:1}).then(res=>{
			this.rule = res.data.data;
			this.pageLoading(this,false);
		})
	},
	methods: {
		changeStep(){
			console.log(1)
		}
	}
}
</script>

<style>
@import "./index.css";
</style>