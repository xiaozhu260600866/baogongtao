<template>
	<view>
		<page ref="page"></page>
		<view v-if="data.show">
			<view class="jobs_lists" :class="type == 1?'mt12':''">
				<view class="jobs_item p15 bg-f mb8" v-for="(v,key) in data.data.lists.data">
					<view @click="linkTo('/pages/merchant/recruit/show/index?id='+v.id,1)">
						<view class="flex-between fs-17 fw-bold">
							<view class="position">{{v.get_recruit.job_position}}</view>
							<view class="main-color Arial">{{v.get_recruit.salary}}</view>
						</view>
						<view class="info fs-15 flex-middle lh-1 mt8 fc-6" v-if="type == 1">
							<view class="tag mr10">{{v.get_company.name}}</view>
						<!-- 	<view class="tag mr10 Arial">{{v.get_company.people_num}}人</view>
							<view class="tag mr10">{{v.get_company.status}}</view> -->
						</view>
						<view class="condition">
							<view class="lab" v-for="item in getTag(v.get_recruit)">{{item}}</view>
						</view>
					</view>
					<dx-button myclass="plr30" type="primary" size="medium" round @click="linkTo('/pages/merchant/recruit/record/index?id='+v.id+'&recruit_id='+v.recruit_id,1)">编辑</dx-button>
					<dx-button myclass="ml10 plr30" size="medium" round @click="del(v)">删除</dx-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import dxButton from "doxinui/components/button/button"
	import recruitLists from '@/components/recruitLists'
	export default {
		components:{recruitLists,dxButton},
		data() {
			return {
				formAction: '/api/company/recruit-records',
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
		onLoad(options) {
			
			this.ajax();
		},
		methods: {
			del(v){
				this.getConfirm("是否删除？",msg=>{
					
					this.postAjax("/api/company/recruit-record-del",{id:v.id,token:uni.getStorageSync('token')}).then(msg=>{
						 this.ajax();
					});
				})
			},
			getTag(v){
				let arr = [];
				arr.push(v.salary)
				arr.push(v.education)
				arr.push(v.home_date)
				return arr;
			},
			ajax() {
				this.getAjax(this,{token:uni.getStorageSync('token'),type:'my'}).then(msg => {
					
				});
			},
		}
	}
</script>
<style lang="scss">
@import "index.scss";
</style>