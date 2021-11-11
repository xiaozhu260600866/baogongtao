<template>
	<view>
		<page ref="page"></page>
		<view v-if="pageShow">
			<view class="Uinfo main-bg pt20 pb40 plr20">
				<view class="header-img pr15">
					<image class="img" :src="avatarUrl" mode="aspectFill" />
				</view>
				<view class="info" v-if="!sysUser.id">
					<tyt-navigator :wxAuth="true" @callBack="linkTo('/pages/user/login/index/index',1)">
						<view slot="content">
							<view class="fs-20 fc-white mb5 text-left">请点击登录</view>
						</view>
					</tyt-navigator>
				</view>
				<view class="info" v-else>
					<view class="fs-20 fc-white mb5">{{ sysUser.showName }}</view>
					<view @click="linkTo('/pages/user/authenticate/index',1)"><dx-tag :plain="true" size="small" type="danger" v-if="sysUser.status==0">您的账号未实名认证，点此进行实名认证</dx-tag></view>
				</view>
			</view>
			
			<view class="ulist-group first-list">
				<tui-list-view class="tui-list-view">
					<tui-list-cell @click="navTo('/pages/user/info/basic/index')" :arrow="true" class="tui-list">
						<span class="iconfont icon-user-detail"></span>
						<text class="tui-list-cell-name">个人资料</text>
					</tui-list-cell>
					<tui-list-cell @click="navTo('/pages/user/task/lists')" :arrow="true" class="tui-list">
						<span class="iconfont icon-user-zz"></span>
						<view class="tui-list-cell-name">我的任务</view>
					</tui-list-cell>
					<!-- <tui-list-cell @click="navTo('/pages/user/sign/lists')" :arrow="true" class="tui-list">
						<span class="iconfont icon-user-agreement"></span>
						<view class="tui-list-cell-name">我的签约</view>
						<dx-tag size="small" type="danger" round class="tui-right" v-if="sign<=0">1</dx-tag>
					</tui-list-cell> -->
					<tui-list-cell  @click="navTo('/pages/user/task/apply')" :arrow="true" last="true" class="tui-list">
						<span class="iconfont icon-user-order"></span>
						<view class="tui-list-cell-name">我的报名</view>
					</tui-list-cell>
					<tui-list-cell  @click="navTo('/pages/user/hr/setting')" :arrow="true" last="true" class="tui-list" v-if="!examining">
						<span class="iconfont icon-user-msg"></span>
						<view class="tui-list-cell-name">求职信息</view>
					</tui-list-cell>
				</tui-list-view>
			</view>
			
			<view class="ulist-group">
				<tui-list-view class="tui-list-view">
					<tui-list-cell  @click="navTo('/pages/user/wallet/index',2)" :arrow="true" class="tui-list">
						<span class="iconfont icon-user-wallet"></span>
						<view class="tui-list-cell-name">我的钱包</view>
					</tui-list-cell>
				</tui-list-view>
				<!-- <tui-list-cell @click="navTo('/pages/user/info/bank_card/add/index',1)" :arrow="true" last="true" class="tui-list">
					<span class="iconfont icon-user-bankcard"></span>
					<view class="tui-list-cell-name">我的银行卡</view>
				</tui-list-cell> -->
			</view>
			
			<!-- <view class="ulist-group">
				<view class="weui-cell" @click="goto('/pages/user/info/bank_card/lists/index',1)">
					<view class="weui-cell__hd">
						<span class="iconfont icon-user-bankcard"></span>
					</view>
					<view class="weui-cell__bd">我的银行卡</view>
					<view class="weui-cell__ft iconfont icon-n-right"></view>
				</view>
				<view class="weui-cell">
					<view class="weui-cell__hd">
						<span class="iconfont icon-user-order"></span>
					</view>
					<view class="weui-cell__bd">接单设置</view>
					<view class="weui-cell__ft iconfont icon-n-right"></view>
				</view>
			</view>
			<view class="ulist-group">
				<view class="weui-cell">
					<view class="weui-cell__hd">
						<span class="iconfont icon-user-msg"></span>
					</view>
					<view class="weui-cell__bd">我的消息</view>
					<view class="weui-cell__ft iconfont icon-n-right"></view>
				</view>
		
				<view class="weui-cell">
					<view class="weui-cell__hd">
						<span class="iconfont icon-user-share"></span>
					</view>
					<view class="weui-cell__bd">分享小程序</view>
					<view class="weui-cell__ft iconfont icon-n-right"></view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import {userinfo, action} from "@/api/user";
import tuiListView from "@/components/ThorUI/list-view/list-view"
import tuiListCell from "@/components/ThorUI/list-cell/list-cell"
import dxTag from "doxinui/components/tag/tag"
export default {
	components: {
		tuiListView,
		tuiListCell,
		dxTag
	},
	data() {
		return {
			pageShow: false,
			sysUser: uni.getStorageSync('sysUser'),
			sysStaff: uni.getStorageSync('sysStaff'),
			wxUser: uni.getStorageSync('wxUser'),
			avatarUrl: '',
			sign: '',
			examining: true
		}
	},
	watch:{
		sign(val){
			if(val == -1){
				this.msgConfirm('您有合同待签约','前往签约','取消').then(res=>{
					this.linkTo('/pages/user/sign/show')
				})
			}else if(val == 0){
				this.msgConfirm('您有签约信息已过期，请前往续签','前往续签','取消').then(res=>{
					this.linkTo('/pages/user/sign/lists')
				})
			}
		}
	},
	onLoad() {
		
	},
	onShow(){
		if(this.sysStaff.id){
			if(this.sysStaff.sign_status != 1) return this.linkTo('/pages/staff/sign/lists',1);
			return this.linkTo('/pages/user/wallet/index',2);
		}
		if(uni.getStorageSync('token')){
			//this.pageLoading(this);
			userinfo({token:uni.getStorageSync('token')}).then((res)=>{
				if(res.code == 0){
					this.pageShow = true;
					if(res.data.user.role == 12){
						this.sysUser = res.data.worker;
						this.avatarUrl = this.sysUser.avatarUrl;
						console.log(this.sysUser);
						let userInfo = {
							data: res.data.worker
						}
						this.setUserInfo(userInfo);
						uni.setStorageSync('sign',res.data.sign);
						this.sign = res.data.sign;
						//this.pageLoading(this,false);
						/*
						if(this.sign > 0){
							this.msgConfirm('您有合同待签约','前往签约','取消').then(res=>{
								this.linkTo('/pages/user/sign/lists',1)
							})
						}
						*/
					}else this.avatarUrl = this.wxUser?this.wxUser.avatarUrl:'/static/images/head.png';
				}
				
				
			}).catch((err)=>{
				this.logout();
				this.linkTo('/pages/user/login/index/index')
			})
		}else{
			this.pageShow = true;
			this.avatarUrl = this.wxUser?this.wxUser.avatarUrl:'/static/images/head.png'
		}
		
	},
	methods: {
		...mapMutations(['setUserInfo','logout']),
		navTo(url,type=1){
			if(this.sysUser.id){
				if(this.sysUser.status == 0){
					this.msgConfirm('要继续操作，请先实名认证','实名认证','取消').then(res=>{
						this.linkTo('/pages/user/authenticate/index',1)
					})
				}
				else return this.linkTo(url,type)
			}
			else return this.msgToast('请先登录');
		}
	}
}
</script>

<style>
@import "./index.css";
</style>