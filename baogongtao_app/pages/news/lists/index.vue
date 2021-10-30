<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<newsLists :data='data'></newsLists>
		</view>
	</view>
</template>

<script>
	import "./index.css";
	import newsLists from '@/components/newsLists';
	export default {
		components:{
			newsLists
		},
		data() {
			return {
			}
		},
		onLoad() {
			
		},
		methods: {
		}
	}
</script>