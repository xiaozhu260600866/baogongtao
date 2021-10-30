<template>
	<view>
		<page ref="page"></page>
		<view v-if="sysStaff.id">
			<view class="Uinfo main-bg pt20 pb40 plr20">
				<view class="header-img pr15">
					<image class="img" :src="avatarUrl" mode="aspectFill" />
				</view>
				<view class="info">
					<view class="fs-20 fc-white mb5">{{ sysStaff.name }}</view>
				</view>
			</view>
			
			<view class="ulist-group first-list">
				<tui-list-view class="tui-list-view">
					<tui-list-cell @click="navTo('/pages/staff/sign/lists')" :arrow="true" class="tui-list">
						<span class="iconfont icon-user-zz"></span>
						<view class="tui-list-cell-name">我的合同</view>
					</tui-list-cell>
					<tui-list-cell @click="navTo('/pages/user/wallet/index',2)" :arrow="true" class="tui-list">
						<span class="iconfont icon-user-detail"></span>
						<text class="tui-list-cell-name">我的钱包</text>
					</tui-list-cell>
				</tui-list-view>
			</view>
		</view>
	</view>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import {userinfo, action} from "@/api/user";
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
			sysStaff: uni.getStorageSync('sysStaff'),
			wxUser: uni.getStorageSync('wxUser'),
			avatarUrl: '',
			sign: '',
		}
	},
	watch:{
		sign(val){
			if(val == 0){
				this.msgConfirm('您有合同待签署','前往签署','取消').then(res=>{
					this.linkTo('/pages/staff/sign/lists',1)
				})
			}
		}
	},
	onLoad() {
		
	},
	onShow(){
		if(!this.sysStaff.id) return this.linkTo('/pages/user/login/index/index');
		this.avatarUrl = this.wxUser?this.wxUser.avatarUrl:'/static/images/head.png'
		if(uni.getStorageSync('token')){
			//this.pageLoading(this);
			userinfo({token:uni.getStorageSync('token')}).then((res)=>{
				this.sysStaff = res.data.staff;
				let userInfo = {
					data: res.data.staff
				}
				this.setStaffInfo(userInfo);
				this.sign = res.data.sign;
				
			})
		}
		
	},
	methods: {
		...mapMutations(['setStaffInfo']),
		navTo(url,type=1){
			if(this.sysStaff.id) return this.linkTo(url,type)
			else return this.msgToast('请先登录');
		}
	}
}
</script>

<style>
@import "./index.css";
</style>