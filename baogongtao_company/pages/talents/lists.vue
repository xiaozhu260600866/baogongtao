<template>
	<view>
		<page ref="page"></page>
		<view>
			<recruitLists :data="jobsLists"></recruitLists>
		</view>
	</view>
</template>

<script>
	import recruitLists from '@/components/recruitLists'
	import { recruits as recruitList } from "@/api/company";
	
	export default {
		components:{
			recruitLists
		},
		data() {
			return {
				jobsLists:[],
				talents:[{
					name:'梁先生',
					year:7,
					education:'大专',
					money: '6~11K',
					headerPic: '/static/images/logo.png',
					company:'东信',
					position:'php',
					intro:'PHP+MySQL，thinkPHP框架，ECShop商城开源系统，dedecms内容管理系统，WordPress博客系统，WordPress博客系统'
				},{
					name:'梁先生',
					year:7,
					education:'大专',
					money: '6~11K',
					headerPic: '/static/images/logo.png',
					company:'东信',
					position:'php',
					intro:'PHP+MySQL，thinkPHP框架，ECShop商城开源系统，dedecms内容管理系统，WordPress博客系统，WordPress博客系统'
				}]
			}
		},
		onLoad() {
				this.getRecruitLists();
		},
		methods: {
			getRecruitLists(){
				recruitList({}).then(msg=>{
					this.jobsLists = msg.data.lists.data;
				});
			},
		}
	}
</script>
<style lang="scss">
@import "index.scss";
</style>