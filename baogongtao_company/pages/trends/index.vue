<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<trendsLists :data='data'></trendsLists>
		</view>
	</view>
</template>

<script>
	import "./index.css";
	import trendsLists from '@/components/trendsLists';
	export default {
		components:{
			trendsLists
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
