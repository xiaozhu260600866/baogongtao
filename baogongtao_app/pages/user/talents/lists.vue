<template>
	<view>
		<page ref="page"></page>
		<view v-if="data.show">
			<view class="jobs_lists" :class="type == 1?'mt12':''">
				<view class="jobs_item p15 bg-f mb8" v-for="(v,key) in data.lists.data">
					<view class="box" @click="linkTo('/pages/merchant/recruit/show/index?id='+v.id,1)">
						<view class="flex-between fs-17 fw-bold">
							<view class="position fc-3">{{v.get_recruit.job_position}}</view>
							<view class="main-color Arial">{{v.get_recruit.salary}}</view>
						</view>
						<view class="info fs-15 flex-middle lh-1 mt8 fc-6" v-if="v.get_recruit">
							<view class="tag mr10">{{v.get_recruit.name}}</view>
							<!-- <view class="tag mr10 Arial">{{v.get_recruit.people_num}}人</view>
							<view class="tag mr10">{{v.get_recruit.status}}</view> -->
						</view>
						<view class="condition">
							<view class="lab" v-for="item in getTag(v)">{{item}}</view>
						</view>
						<view class="userInfo mt10 flex-middle fs-14" v-if="v.get_company">
							<image class="head" :src="v.get_company.logoMinUrl" mode="aspectFill"></image>
							<view class="left flex1 ml10 flex-middle">
								<view class="name">{{v.get_company.charger_name ? v.get_company.charger_name :'暂无' }}</view>
								<view class="dot mlr5"></view>
								<view class="position">{{v.get_company.position ? v.get_company.position :'暂无' }}</view>
							</view>
							<view class="place fc-b" v-if="v.get_company.province">{{v.get_company.city}} {{v.get_company.area}}</view>
						</view>
					</view>
					<view class="flex-right pt10 bd-te mt10">
						<view class="ml10 plr20" v-if="v.recruited == 1">已录取</view>
					<!-- 	<dx-button myclass="ml10 plr20" size="small" round @click="del(v)" v-if="v.recruited == 0">取消应聘</dx-button>
						<dx-button myclass="ml10 plr20" size="small" round @click="del(v)" >已录取</dx-button> -->
					</view>
				</view>
			</view>
			<view class="p50 fs-14 fc-9 text-center" v-if="data.data.lists.data.length == 0">暂无记录</view>
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
				// arr.push(v.salary)
				arr.push(v.get_recruit.education)
				let tag = v.get_recruit.job_tab ? v.get_recruit.job_tab.split(",") :[ ];
				if(tag.length){
					tag.forEach(e=>{
						arr.push(e)
					})	
				}
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