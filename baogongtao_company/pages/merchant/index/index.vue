<template>
	<view>
		<page ref="page"></page>
		<view>
			<view class="Huser main-bg">
				<view class="con">
					<view class="head">
						<image class="img" :src="avatarUrl"></image>
					</view>
					<view class="info">
						<view class="school fs-18">{{sysCompany.name}}</view>
						<view class="row fs-16">
							<view class="name">{{sysCompany.charger_name}}</view>
							<view class="phone Arial">{{sysCompany.charger_phone}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="block-sec">
				<view class="block-title">
					<view class="name">我的记录</view>
				</view>
				<dx-nav-class :data="[
					{url:'/pages/merchant/recruit/apply/index',type:1,cover:'/static/images/logo.png',name:'应聘记录'},
					{url:'/pages/merchant/coupon/lists/cancel',type:1,cover:'/static/images/logo.png',name:'核销记录'},
				]" @click="checkAuth" :num="4" :nameSize="15" :namePTop="10"></dx-nav-class>
			</view>
			<view class="block-sec">
				<view class="block-title">
					<view class="name">常用工具</view>
				</view>
				<dx-nav-class :data="[
					{url:'/pages/merchant/recruit/created_edit/lists',type:1,cover:'/static/images/logo.png',name:'发布招聘'},
					{url:'/pages/merchant/coupon/created_edit/lists',type:1,cover:'/static/images/logo.png',name:'发布优惠券'},
					{url:'/pages/merchant/coupon/cancel/cancel',type:1,cover:'/static/images/logo.png',name:'核销优惠券'},
					{url:'/pages/merchant/info/index',type:1,cover:'/static/images/logo.png',name:'我的资料'},
					{url:'/pages/merchant/worker/lists',type:1,cover:'/static/images/logo.png',name:'我的用工'},
					{url:'/pages/company/worker/transactions',type:1,cover:'/static/images/logo.png',name:'工资发放记录'},
				]" @click="checkAuth" :num="4" :nameSize="15" :namePTop="10"></dx-nav-class>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState, mapMutations, mapActions} from 'vuex'
	import {userinfo, action, logout} from "@/api/user";
import dxNavClass from "doxinui/components/nav-class/nav-class"
	export default {
		components:{dxNavClass},
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
			if(!uni.getStorageSync('sysCompany')) return this.linkTo('/pages/merchant/login/index');
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
			checkAuth(v){
				return this.linkTo(v.url,v.type);
			},
		}
	}
</script>
<style lang="scss">
@import "index.scss";
</style>