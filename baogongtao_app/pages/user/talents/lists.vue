<template>
	<view>
		<page ref="page"></page>
		<view>
			<recruitLists :data="jobsLists" :type="1"></recruitLists>
		</view>
	</view>
</template>

<script>
	import recruitLists from '@/components/recruitLists'
	export default {
		components:{recruitLists},
		data() {
			return {
				jobsLists:[{
					name:'PHP开发工程师',
					city:'江门',
					company:{
						name:'江门市东信科技有限公司',
						people_num: '1-50',
						status:'已上市'
					},
					work_place:'新会',
					salary: '10-15K',
					condititon:['1-3年','本科','周末双休','钣金工艺'],
					userInfo:{
						headerPic:'/static/images/logo.png',
						name:'林生',
						position:'经理',
					}
				},{
					name:'PHP开发工程师',
					city:'江门',
					company:{
						name:'江门市东信科技有限公司',
						people_num: '1-50',
						status:'已上市'
					},
					work_place:'新会',
					salary: '10-15K',
					condititon:['1-3年','本科','周末双休','钣金工艺'],
					userInfo:{
						headerPic:'/static/images/logo.png',
						name:'林生',
						position:'经理',
					}
				}]
			}
		},
		onLoad() {
			
		},
		methods: {
			
		}
	}
</script>
<style lang="scss">
@import "index.scss";
</style>