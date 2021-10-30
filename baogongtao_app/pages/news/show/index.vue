<template>
	<view>
		<view class="bg-f">
			<view class="p15 fs-18 lh-24">{{ detail.title }}</view>
			<view class="mark fc-9 fs-12 flex-between flex-middle plr15 pb15">
				<view class="date">{{ detail.published_date }}</view>
				<!-- <view class="hos">华顺口腔诊所</view> -->
			</view>
			<view class="content fs-15 plr15 pb15" v-if="detail.id">
				<u-parse :content="detail.content" />
			</view>
		</view>
	</view>
</template>

<script>
import "@/components/gaoyia-parse/parse.css";
import { detail } from "@/api/news";
import uParse from '@/components/gaoyia-parse/parse.vue'
export default {
	components: { uParse },
	data() {
		return {
			detail: {}
		}
	},
	onLoad(option) {
		detail({id:option.id}).then((res)=>{
			this.detail = res.data.data
		})
	},
	methods: {

	}
}
</script>

<style>
@import "./index.css";
</style>