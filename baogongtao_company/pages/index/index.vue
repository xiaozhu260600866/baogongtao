<template>
	<view>
		<page ref="page"></page>
		<view>
			<view class="banner">
				<tyt-swiper :data="sliders" indicatorDotsActColor="#009966"></tyt-swiper>
			</view>
			<!-- <navBtn :data='navs' myclass="pt0 mb10"></navBtn>
			<view class="banner_ad bg-f mb10">
				<image class="w-b100 flex" :src="banners[0].coverUrl" mode="widthFix"></image>
			</view> -->
			<dx-nav-class :data="[
				{url:'/pages/merchant/recruit/lists/index',type:1,cover:'/static/images/logo.png',name:'招聘'},
				{url:'/pages/talents/lists',type:1,cover:'/static/images/logo.png',name:'人才'},
				{url:'/pages/merchant/lists/index',type:1,cover:'/static/images/logo.png',name:'附近商家'},
				{url:'/pages/merchant/coupon/lists/index',type:2,cover:'/static/images/logo.png',name:'优惠券'},
			]" @click="checkAuth" myclass="mtb10" :num="4" :nameSize="15" :namePTop="10"></dx-nav-class>
			<view v-if="!examining">
				<view>
					<view class="mll_tabs">
						<view class="name cur">推荐招聘1</view>
						<!-- <view class="name">指派任务</view> -->
					</view>
				</view>
				<recruitLists :data="jobsLists"></recruitLists>
				<!-- <taskLists :data='taskData'></taskLists> -->
				<view class="pt20"><tyt-loadmore :visible="listLoadding" :nodata="true" :data="taskData" source="task"></tyt-loadmore></view>
			</view>
			<view v-if="examining">
				<newsLists :data='newsData'></newsLists>
			</view>
		</view>
	</view>
</template>

<script>
import { multipleAttributes, multiplePosters } from "@/api/base";
import { lists } from "@/api/task";
import { lists as articleLists } from "@/api/news";
import { recruits as recruitList } from "@/api/company";
import navBtn from '@/components/navBtn';
import taskLists from '@/components/taskLists';
import newsLists from '@/components/newsLists';
import tytSwiper from '@/components/tytrock/components/swiper'
import tytLoadmore from "@/components/tytrock/components/loadmore"
import dxNavClass from "doxinui/components/nav-class/nav-class"
import recruitLists from '@/components/recruitLists'
export default {
	components:{
		navBtn,
		taskLists,
		newsLists,
		tytSwiper,
		tytLoadmore,
		dxNavClass,
		recruitLists
	},
	data() {
		return {
			sliders: [],
			navs: [],
			banners: [],
			taskData: [],
			listQuery: {open: 1, status:3, limit:5},
			listLoadding: true,
			pullUpOn: true,
			page: 1,
			newsData: [],
			examining: true,
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
		this.pageLoading(this);
		multiplePosters({types:"5,6,7",nums:"5,4,1"}).then((res)=>{
			this.sliders = res.data.data[5];
			this.navs = res.data.data[6];
			this.banners = res.data.data[7];
			
			this.pageLoading(this,false);
			this.getTaskLists();
			this.getArticleLists();
			this.getRecruitLists();
		});
	},
	methods: {
		getRecruitLists(){
			recruitList({}).then(msg=>{
				this.jobsLists = msg.data.lists.data;
			});
		},
		checkAuth(v){
			return this.linkTo(v.url,v.type);
		},
		getTaskLists(reload=0){
			if(reload){
				this.page = 1;
				this.listLoadding = true;
				this.pullUpOn = true;
				this.taskData = [];
			}
			this.listQuery.page = this.page;
			lists(this.listQuery).then((res)=>{
				this.taskData = res.data.lists.data;
				if(this.page == res.data.lists.last_page){
					this.listLoadding = false;
					this.pullUpOn = false
					
					if(reload==1) uni.stopPullDownRefresh();
				}
				this.page = this.page + 1;
			})
		},
		getArticleLists(){
			articleLists({status:1,class_id:2,limit:5}).then((res)=>{
				this.newsData = res.data.lists.data;
			})
		},
	},
	onReachBottom: function() {
		if (!this.pullUpOn) return;
		this.listLoadding = true;
		this.getTaskLists();
	},
	onPullDownRefresh(){
		this.getTaskLists(1);
	}
}
</script>

<style>
@import "./index.css";
</style>