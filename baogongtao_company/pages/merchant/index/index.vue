<template>
	<view>
		<page ref="page"></page>
		<view>
			<view class="Huser main-bg">
				<view class="con">
					<view class="head" @click="goto('/pages/user/info/index',1)">
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
			<view class="tips flex-between fs-15 plr10 ptb8 block-sec" v-if="sysCompany.license">
				<view class="txt fc-6">您的企业信息未完善，请尽快完善</view>
				<view class="go fw-bold main-color" @click="goto('/pages/merchant/info/license',1)">去完善</view>
			</view>
			
			<view class="bg-f">
				<dx-list-cell arrow name="简历管理" iconName="iconfont icon-user-apply" :iconSize="18"
				 @click="goto('/pages/merchant/recruit/apply/index',1)"></dx-list-cell>
				<dx-list-cell arrow name="优惠券管理" iconName="iconfont icon-user-coupon" :iconSize="18"
				 @click="goto('/pages/merchant/coupon/created_edit/lists',1)"></dx-list-cell>
				<dx-list-cell arrow name="核销信息" iconName="iconfont icon-user-cancel" :iconSize="18"
				 @click="goto('/pages/merchant/coupon/lists/cancel',1)"></dx-list-cell>
				<dx-list-cell arrow name="用工管理" iconName="iconfont icon-user-worker" :iconSize="18"
				 @click="goto('/pages/merchant/worker/lists',1)"></dx-list-cell>
				<dx-list-cell arrow name="工资发放" iconName="iconfont icon-user-transactions" :iconSize="18"
				 @click="goto('/pages/merchant/worker/transactions',1)"></dx-list-cell>
				<dx-list-cell arrow name="企业展示" iconName="iconfont icon-user-company" :iconSize="18"
				 @click="goto('/pages/merchant/company/index',1)"></dx-list-cell>
				<dx-list-cell arrow name="扫一扫" iconName="iconfont icon-user-scan" :iconSize="18"
				 @click="goto('/pages/merchant/coupon/cancel/cancel',1)"></dx-list-cell>
			</view>
			
			
			<!-- <view class="block-sec">
				<dx-nav-class :data="[
					{url:'/pages/merchant/recruit/created_edit/lists',type:1,icon:'iconfont icon-user-recruit',name:'招聘管理'},
					{url:'/pages/merchant/recruit/apply/index',type:1,icon:'iconfont icon-user-apply',name:'简历管理'},
					{url:'/pages/merchant/coupon/created_edit/lists',type:1,icon:'iconfont icon-user-coupon',name:'优惠券管理'},
					{url:'/pages/merchant/coupon/lists/cancel',type:1,icon:'iconfont icon-user-cancel',name:'核销信息'},
					{url:'/pages/merchant/worker/lists',type:1,icon:'iconfont icon-user-worker',name:'用工管理'},
					{url:'/pages/merchant/worker/transactions',type:1,icon:'iconfont icon-user-transactions',name:'工资发放'},
					{url:'/pages/merchant/company/index',type:1,icon:'iconfont icon-user-company',name:'企业展示'},
					{url:'/pages/merchant/coupon/cancel/cancel',type:1,icon:'iconfont icon-user-scan',name:'扫一扫'},
				]" @click="checkAuth" :num="4" :nameSize="15" :namePTop="10" :iconSize="30" iconColor="#666"></dx-nav-class>
			</view> -->
			<!-- {url:'/pages/merchant/info/index',type:1,cover:'https://www.baogongtao.com/images/wap/B04.jpg',name:'我的资料'}, -->
		</view>
	</view>
</template>

<script>
	import {mapState, mapMutations, mapActions} from 'vuex'
	import {userinfo, action, logout} from "@/api/user";
	import dxNavClass from "doxinui/components/nav-class/nav-class"
	import dxListCell from "doxinui/components/list-cell/list-cell"
	export default {
		components:{dxNavClass,dxListCell},
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