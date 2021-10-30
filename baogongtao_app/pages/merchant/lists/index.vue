<template>
	<view>
		<page ref="page"></page>
		<view>
			<merchantLists :data="merchant"></merchantLists>
		</view>
	</view>
</template>

<script>
	import merchantLists from '@/components/merchantLists'
	export default {
		components:{merchantLists},
		data() {
			return {
				merchant:[
					{
						headerPic:'/static/images/news/01.jpg',
						userInfo:{
							company_name:'大号干货店',
							remark:'经营南北干货，参茸海味,食疗食材',
							address:'天龙一街(江门市蓬江区)美食',
							getIndustry:['零食商超','干货'],
						}
					}
				]
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