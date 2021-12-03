<template>
	<view>
		<page ref="page"></page>
		<view v-if="data.show">
			<dx-tabs-scroll :tabs="[
				{value: 0,name: '在线职位'},
				{value: 1,name: '待发布'},
				{value: 2,name: '已下架'},
			]" :height="52" borderColor="#409eff" :curSize="16" curColor="#000" curBold="bold" :nameSize="15" nameColor="#333"></dx-tabs-scroll>
			<view v-if="data.data.lists.data"><recruitLists :data="data.data.lists.data" :type="2"></recruitLists></view>
			<view class="fs-14 fc-9 ptb80 text-center" v-if="data.data.lists.data.length == 0">
				您还没发布职位<br>点击「发布职位」，更多人才等您选~
			</view>
			<dx-float-group>
				<dx-float-btn type="primary" icon="dxi-icon dxi-icon-edit2" @click="linkTo('/pages/merchant/recruit/created_edit/edit',1)"></dx-float-btn>
			</dx-float-group>
			<!-- <dxftButton type="primary" size="lg" @click="linkTo('/pages/merchant/recruit/created_edit/edit',1)">发布</dxftButton> -->
		</view>
	</view>
</template>

<script>
	import recruitLists from '@/components/recruitLists'
	import dxftButton from "doxinui/components/button/footer-button"
	import dxFloatGroup from "doxinui/components/zhu/floatGroup"
	import dxFloatBtn from "doxinui/components/zhu/floatBtn"
	import tytLoadmore from "@/components/tytrock/components/loadmore"
	import dxTabsScroll from "doxinui/components/tabs/tabs_scroll"
	export default {
		components:{dxftButton,recruitLists,dxFloatGroup,dxFloatBtn,tytLoadmore,dxTabsScroll},
		data() {
			return {
				formAction: '/api/company/recruits2?type=my',
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
			if(!uni.getStorageSync('sysCompany')) return this.linkTo('/pages/merchant/login/index');
			this.ajax();
		},
		onShow(){
			if(!uni.getStorageSync('sysCompany')) return this.linkTo('/pages/merchant/login/index');
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