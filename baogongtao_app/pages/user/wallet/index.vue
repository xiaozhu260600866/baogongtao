<template>
	<view>
		<page ref="page"></page>
		<view>
			<view class="Wtop main-bg pt20 pb40 text-center">
				<view class="fs-14 fc-white mb5">累计{{title}}</view>
				<view class="fs-30 lh-34 fc-white Arial">{{ wallet.total?wallet.total:0 }}</view>
			</view>
			<view class="Wcount">
				<view :class="['Wc-sec',listQuery.status==1?'cur':'']" @click="changeStatus(1)">
					<view class="fs-15">待发放</view>
					<view class="fs-18 Arial">{{ wallet.tobe?wallet.tobe:0 }}</view>
				</view>
				<view :class="['Wc-sec',listQuery.status==2?'cur':'']" @click="changeStatus(2)">
					<view class="fs-15">已发放</view>
					<view class="fs-18 Arial">{{ wallet.issued?wallet.issued:0 }}</view>
				</view>
			</view>
			<transaction-lists :data="listsData" :type="type"></transaction-lists>
			<view class="pt20"><tyt-loadmore :visible="listLoadding" :nodata="true" :data="listsData" nullTxt="暂无"></tyt-loadmore></view>
		</view>
	</view>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import { wallet } from "@/api/user";
import { lists } from "@/api/transaction";
import transactionLists from '@/components/transactionLists'
import tytLoadmore from "@/components/tytrock/components/loadmore"
export default {
	components:{
		transactionLists,
		tytLoadmore
	},
	data() {
		return {
			sysUser: {},
			sysStaff: {},
			title: '工资',
			type: 0,
			wallet: {total: 0, tobe: 0, issued: 0},
			listQuery: {status:1, limit:5},
			listsData: [],
			listLoadding: true,
			pullUpOn: true,
			page: 1,
		}
	},
	onLoad(options){
		this.pageLoading(this);
		this.sysUser = uni.getStorageSync('sysUser');
		this.sysStaff = uni.getStorageSync('sysStaff');
		if(options.role == 6){
			if(!this.sysStaff.id) return this.linkTo('/pages/user/login/index/index')
		}
		this.init(1);
	},
	onShow(){
		//uni.showLoading();
		this.sysUser = uni.getStorageSync('sysUser');
		this.sysStaff = uni.getStorageSync('sysStaff');
		if(this.sysStaff.id){
			if(this.sysStaff.sign_status != 1) return this.linkTo('/pages/staff/sign/lists',1);
			uni.hideTabBar();
		}else if(this.sysUser.id) this.title = '个人所得';
		//if(!this.sysUser.id) return this.linkTo('/pages/user/login/index/index',1);
	},
	onHide(){
		if(this.sysStaff.id) uni.showTabBar();
	},
	methods: {
		...mapMutations(['logout']),
		init(reload=0){
			if(this.sysUser.id || this.sysStaff.id){
				let user = this.sysUser.id?this.sysUser:this.sysStaff;
				this.type = this.sysUser.id?2:3;
				this.listQuery.type = this.type;
				this.listQuery.user_id = user.user_id;
				wallet({}).then(res=>{
					//uni.hideLoading();
					if(res.code == 0){
						this.pageLoading(this,false)
						this.wallet = res.data.wallet;
						this.listQuery.user_id = this.sysUser.user_id;
						this.getListsData(reload);
					}else{
						this.logout();
						this.linkTo('/pages/user/login/index/index')
					}
				}).catch((err)=>{
					this.logout();
					this.linkTo('/pages/user/login/index/index')
				})
			}else{
				this.pageLoading(this,false)
				this.listLoadding = false;
				this.pullUpOn = false
			}
		},
		getListsData(reload=0){
			if(reload){
				this.page = 1;
				this.listLoadding = true;
				this.pullUpOn = true;
				this.listsData = [];
			}
			this.listQuery.page = this.page;
			lists(this.listQuery).then((res)=>{
				this.listsData = res.data.lists.data;
				if(this.page == res.data.lists.last_page){
					this.listLoadding = false;
					this.pullUpOn = false
					
					if(reload==1) uni.stopPullDownRefresh();
				}
				this.page = this.page + 1;
			})
		},
		changeStatus(status){
			this.listQuery.status = status;
			this.getListsData(1)
		}
	},
	onReachBottom: function() {
		if (!this.pullUpOn) return;
		this.listLoadding = true;
		this.getListsData();
	},
	onPullDownRefresh(){
		if(!this.sysUser.id && !this.sysStaff) return uni.stopPullDownRefresh();
		this.init(1);
	}
}
</script>

<style>
@import "./index.css"
</style>