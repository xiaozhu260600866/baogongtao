<template>
	<view>
		<page ref="page"></page>
		<view v-if="data.show">
			<merchantLists :data="data.lists.data" ></merchantLists>
		</view>
	</view>
</template>

<script>
	import merchantLists from '@/components/merchantLists'
	export default {
		components:{merchantLists},
		data() {
			return {
				formAction: '/api/company/getLists?limit=15',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
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
			this.ajax();
		},
		methods: {
			ajax() {
				this.getAjax(this,{token:uni.getStorageSync('token')}).then(msg => {
					
				});
			}
		}
	}
</script>
<style lang="scss">
@import "index.scss";
</style>