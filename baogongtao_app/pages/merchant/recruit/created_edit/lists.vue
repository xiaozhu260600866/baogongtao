<template>
	<view>
		<page ref="page"></page>
		<view>
			<recruitLists :data="jobsLists" :type="2"></recruitLists>
			<dxftButton type="primary" size="lg" @click="linkTo('/pages/merchant/recruit/created_edit/edit',1)">发布</dxftButton>
		</view>
	</view>
</template>

<script>
	import recruitLists from '@/components/recruitLists'
	import dxftButton from "doxinui/components/button/footer-button"
	export default {
		components:{dxftButton,recruitLists},
		data() {
			return {
				formAction: '/api/company/recruits',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
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
				}]
			}
		},
		onLoad() {
			this.ajax();
		},
		methods: {
			ajax() {
				this.getAjax(this).then(msg => {
					
				});
			}
		}
	}
</script>
<style lang="scss">
@import "index.scss";
</style>