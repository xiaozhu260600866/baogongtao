<template>
	<view>
		<page ref="page"></page>
		<view v-if="sysCompany.id">
			<view class="Uinfo main-bg pt20 pb40 plr20">
				<view class="header-img pr15">
					<image class="img" :src="avatarUrl" mode="aspectFill" />
				</view>
				<view class="info">
					<view class="fs-20 fc-white mb5">{{ sysCompany.name }}</view>
				</view>
				<view class="logout" @click="logOut">退出</view>
			</view>
			
			<view class="ulist-group first-list">
				<tui-list-view class="tui-list-view">
					<!-- <tui-list-cell @click="navTo('/pages/user/info/basic/index')" :arrow="true" class="tui-list">
						<span class="iconfont icon-user-detail"></span>
						<text class="tui-list-cell-name">个人资料</text>
					</tui-list-cell> -->
					<!-- <tui-list-cell @click="navTo('/pages/company/transfer/lists')" :arrow="true" class="tui-list">
						<span class="iconfont icon-user-zz"></span>
						<view class="tui-list-cell-name">转账凭证</view>
					</tui-list-cell> -->
					<tui-list-cell @click="navTo('/pages/company/worker/lists')" :arrow="true" class="tui-list">
						<span class="iconfont icon-user-zz"></span>
						<view class="tui-list-cell-name">我的用工</view>
					</tui-list-cell>
					<tui-list-cell @click="navTo('/pages/company/worker/transactions')" :arrow="true" class="tui-list">
						<span class="iconfont icon-user-agreement"></span>
						<view class="tui-list-cell-name">工资发放记录</view>
					</tui-list-cell>
				</tui-list-view>
			</view>
		</view>
	</view>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import {userinfo, action, logout} from "@/api/user";
import tuiListView from "@/components/ThorUI/list-view/list-view"
import tuiListCell from "@/components/ThorUI/list-cell/list-cell"
import tuiTag from "@/components/ThorUI/tag/tag"
export default {
	components: {
		tuiListView,
		tuiListCell,
		tuiTag
	},
	data() {
		return {
			sysCompany: uni.getStorageSync('sysCompany'),
			wxUser: uni.getStorageSync('wxUser'),
			avatarUrl: '',
			unsign: 0,
		}
	},
	onLoad() {
		
	},
	onShow(){
		if(!uni.getStorageSync('sysCompany')) return this.linkTo('/pages/company/login/index');
		if(uni.getStorageSync('token')){
			//this.pageLoading(this);
			userinfo({token:uni.getStorageSync('token')}).then((res)=>{
				this.sysCompany = res.data.company;
				this.avatarUrl = this.sysCompany.logoMinUrl;
				let userInfo = {
					data: res.data.company
				}
				this.setCompanyInfo(userInfo);
				
			})
		}else{
			this.avatarUrl = this.wxUser?this.wxUser.avatarUrl:'/static/images/head.png'
		}
		
	},
	methods: {
		...mapMutations(['setCompanyInfo','logout']),
		navTo(url,type=1){
			if(this.sysCompany.id) return this.linkTo(url,type)
			else return this.msgToast('请先登录');
		},
		logOut(){
			logout().then(res=>{
				this.logout();
				this.linkTo('/pages/company/login/index');
			})
		}
	}
}
</script>

<style>
@import "./index.css";
</style>