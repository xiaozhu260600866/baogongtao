<template>
	<view>
		<page ref="page"></page>
		<view v-if="show">
			<view class="head-info main-bg">
				<!-- <view class="head-bg">
					<image class="img w-b100 flex" mode="widthFix" src="/static/images/user-bg.jpg"></image>
				</view> -->
				<view class="utop">
					<view class="uinfo" @click="$refs.loginDiag.thisDiag = true" v-if="!userInfo.nickName">
						<view class="header-img nouser">
							<image class="img" src="https://bgt.doxinsoft.com/images/user-w.png" />
						</view>
						<view class="fc-white lh-1_5 pl15">
							<view class="fs-22">未登录/注册</view>
							<view class="fs-12">点击头像可登录/注册</view>
						</view>
					</view>
					
					<view class="uinfo" v-else>
						<view class="header-img">
							<image class="img" :src="userInfo.avatarUrl" />
						</view>
						<view class="pl15 fc-white right info">
							<view class="fc-white lh-24 fs-15">
								<view class="group">
									<view>{{userInfo.nickName}}</view>
								</view>
								<!-- <view>电话号码：<text class="Arial">13318639080</text></view> -->
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="ugorup-box head-count">
				<view class="c-item" >
					<view class="num">100.01<text class="unit">元</text></view>
					<view class="name">余额</view>
				</view>
				<view class="c-item" >
					<view class="num">669<text class="unit"></text></view>
					<view class="name">积分</view>
				</view>
			</view> -->
			<!-- <view class="ugorup-box">
				<view class="black-title">
					<view class="name">我的订单</view>
					<view class="all fs-13 fc-6">查看全部
						<text class="iconfont icon-right more fs-13"></text>
					</view>
				</view>
				<dx-nav-class :data="[
					{url:'/pages/order/lists/main?historyUrl=del&status=1',type: 1,cover:'https://456.doxinsoft.com//images/wap/order-icon01.png',
					name:'待付款',number:orders1},
					{url:'/pages/order/lists/main?historyUrl=del&status=3',type: 1,cover:'https://456.doxinsoft.com//images/wap/order-icon02.png',
					name:'待发货',number:orders3},
					{url:'/pages/order/lists/main?historyUrl=del&status=5',type: 1,cover:'https://456.doxinsoft.com//images/wap/order-icon03.png',
					name:'待收货',number:orders5},
					{url:'/pages/order/lists/main?historyUrl=del&status=9',type: 1,cover:'https://456.doxinsoft.com//images/wap/order-icon04.png',
					name:'待评价',number:orders9},
					{url:'/pages/order/service/main?historyUrl=del&status=10',type: 1,cover:'https://456.doxinsoft.com//images/wap/order-icon05.png',
					name:'售后',number:orders10}
				]" @click="checkAuth" isAuth myclass="bdr12" :num="5" :imgWidth="30" :imgHeight="30" :imgR="0" :nameSize="13" :namePTop="5"></dx-nav-class>
			</view> -->
		<!-- 	{url:'',type: 1,icon:'dxi-icon dxi-icon-user3',name:'分享达人'}, -->
			<view class="ugorup-box" >
				<view class="black-title">
					<view class="name">常用服务</view>
				</view>
				<dx-nav-class :data="menuArr" @click="checkAuth" isAuth myclass="bdr12" :num="4" :iconSize="24" :nameSize="14" :namePTop="10"></dx-nav-class>
			</view>
			<dx-diag title="登录或注册" :titBold="false" :bottomOFF="false" ref="loginDiag">
				<myform :ruleform="ruleform" :vaildate="vaildate" :append="true"  @callBack="wechatInfoCallBack">
					<view slot="content">
						<dx-button type="primary" size="lg" myclass="mt15 mlr5" icon="dxi-icon dxi-icon-wechat" block>微信账号快速登录</dx-button>
					</view>
				</myform>
			</dx-diag>
		</view>
	</view>
</template>

<script>
	import dxNavClass from "doxinui/components/nav-class/nav-class"
	import { recruits as recruitList } from "@/api/company";
	import {userinfo, action, logout} from "@/api/user";
	import dxDiag from "doxinui/components/diag/diag"
	export default {
		components:{dxNavClass,dxDiag},
		data() {
			return {
				ruleform:{},
				vaildate:{},
				menuArr:[
					
				],
				orders1:'',
				orders3:'',
				orders5:'',
				orders9:'',
				orders10:'',
				userInfo:{},
				
				pushing:0,
				show:true,
			}
		},
		onLoad() {
			if(uni.getStorageSync('sysUser')){
				userinfo({token:uni.getStorageSync('token')}).then((res)=>{
					this.pushing = res.data.push;
					if(this.pushing){
						this.menuArr = [
							{url:'/pages/user/coupon/lists/index',type: 1,icon:'dxi-icon dxi-icon-coupon',name:'我的优惠券'}
							
						]
					}else{
						let disUrl = res.data.dis ? '/pages/distribution/index/main' :'/pages/distribution/add/main'
						this.menuArr = [
							{url:disUrl,type: 1,icon:'iconfont icon-user-dis',name:'分享达人'},
							{url:'/pages/merchant/index/index',type: 1,icon:'iconfont icon-user-compnay',name:'企业中心'},
							{url:'/pages/user/coupon/lists/index',type: 1,icon:'dxi-icon dxi-icon-coupon',name:'我的优惠券'},
							{url:'/pages/user/talents/resume',type: 1,icon:'dxi-icon dxi-icon-order2',name:'我的简历'},
							{url:'/pages/user/talents/lists',type: 1,icon:'iconfont icon-user-talents',name:'我的应聘'},
							
						]
					}
					this.show = true;
					
				})
			}else{
				recruits({token:uni.getStorageSync('token')}).then((res)=>{
					this.pushing = res.data.push;
					if(this.pushing){
						this.menuArr = [
							{url:'/pages/user/coupon/lists/index',type: 1,icon:'dxi-icon dxi-icon-coupon',name:'我的优惠券'}
							
						]
					}else{
						let disUrl = res.data.dis ? '/pages/distribution/index/main' :'/pages/distribution/add/main'
						this.menuArr = [
							{url:disUrl,type: 1,icon:'iconfont icon-user-dis',name:'分享达人'},
							{url:'/pages/merchant/index/index',type: 1,icon:'iconfont icon-user-compnay',name:'企业中心'},
							{url:'/pages/user/coupon/lists/index',type: 1,icon:'dxi-icon dxi-icon-coupon',name:'我的优惠券'},
							{url:'/pages/user/talents/resume',type: 1,icon:'dxi-icon dxi-icon-order2',name:'我的简历'},
							{url:'/pages/user/talents/lists',type: 1,icon:'iconfont icon-user-talents',name:'我的应聘'},
							
						]
					}
					this.show = true;
					
				})
					this.show = true;
			}
			
			
			this.userInfo = uni.getStorageSync("wxUser");
		},
		methods: {
			
			wechatInfoCallBack(userInfo){
				this.userInfo = userInfo;
				return this.linkTo("/pages/user/login/index/index",0);
			},
			checkAuth(v){
				if(v.name == '企业中心'){
					uni.navigateToMiniProgram({
						appId: 'wx8aafd3339235cd5e',
						path: 'pages/merchant/index/index',
						extraData: {
							'data1': 'test'
						},
						success(res) {
						// 打开成功
						}
					})
					return false;
				}else{
						return this.checkUser(v.url);
				}
			
			},
		}
	}
</script>
<style lang="scss">
@import "index.css";
</style>