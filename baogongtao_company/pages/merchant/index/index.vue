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
			<view class="tips flex-between fs-15 plr10 ptb8 block-sec">
				<view class="txt fc-6">您的企业信息未完善，请尽快完善</view>
				<view class="go fw-bold main-color" @click="goto('/pages/merchant/info/license',1)">去完善</view>
			</view>
			<view class="block-sec">
				<view class="block-title">
					<view class="name">我的记录</view>
				</view>
				<dx-nav-class :data="[
					{url:'/pages/merchant/recruit/apply/index',type:1,cover:'https://www.baogongtao.com/images/wap/A01.jpg',name:'应聘记录'},
					{url:'/pages/merchant/coupon/lists/cancel',type:1,cover:'https://www.baogongtao.com/images/wap/A02.jpg',name:'核销记录'},
				]" @click="checkAuth" :num="4" :nameSize="15" :namePTop="10"></dx-nav-class>
			</view>
			<view class="block-sec">
				<view class="block-title">
					<view class="name">常用工具</view>
				</view>
				<dx-nav-class :data="[
					{url:'/pages/merchant/recruit/created_edit/lists',type:1,cover:'https://www.baogongtao.com/images/wap/B01.jpg',name:'发布招聘'},
					{url:'/pages/merchant/coupon/created_edit/lists',type:1,cover:'https://www.baogongtao.com/images/wap/B02.jpg',name:'发布优惠券'},
					{url:'/pages/merchant/coupon/cancel/cancel',type:1,cover:'https://www.baogongtao.com/images/wap/B03.jpg',name:'核销优惠券'},
					{url:'/pages/merchant/worker/lists',type:1,cover:'https://www.baogongtao.com/images/wap/B05.jpg',name:'我的用工'},
					{url:'/pages/company/worker/transactions',type:1,cover:'https://www.baogongtao.com/images/wap/B06.jpg',name:'工资发放记录'},
					{url:'/pages/merchant/company/index',type:1,cover:'https://www.baogongtao.com/images/wap/B07.jpg',name:'企业展示'},
				]" @click="checkAuth" :num="4" :nameSize="15" :namePTop="10"></dx-nav-class>
			</view>
			<!-- {url:'/pages/merchant/info/index',type:1,cover:'https://www.baogongtao.com/images/wap/B04.jpg',name:'我的资料'}, -->
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
			if(!uni.getStorageSync('sysCompany')) return this.linkTo('/pages/merchant/login/index');
			if(uni.getStorageSync('token')){
				//this.pageLoading(this);
				userinfo({token:uni.getStorageSync('token')}).then((res)=>{
					this.sysCompany = res.data.company;
					this.avatarUrl = this.sysCompany.logoMinUrl;
					let userInfo = {
						data: res.data.company
					}
					//this.setCompanyInfo(userInfo);
					
				})
			}else{
				this.avatarUrl = this.wxUser?this.wxUser.avatarUrl:'/static/images/head.png'
			}
		},
		onShow(){
			
			
		},
		methods: {
			scan(){
				uni.scanCode({
				    success: res=> {
						console.log(res)
						this.scanOrder(res.result);
				    },
					fail: res => {
						console.log(res)
					}
				});
			},
			scanOrder(code){
				this.postAjax("/api/company/coupon-order-cancel",{code:code,token:uni.getStorageSync('token')}).then(msg=>{
					if(msg.data.status == 2){
						this.ajax();

					}
				})
			},
			checkAuth(v){
				if(v.name == '核销优惠券'){
					return this.scan();
				}else{
					return this.linkTo(v.url,v.type);
				}
				
			},
		}
	}
</script>
<style lang="scss">
@import "index.scss";
</style>