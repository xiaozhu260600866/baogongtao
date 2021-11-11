<template>
	<view>
		<page ref="page"></page>
		<view>
			<view class="head-info main-bg">
				<view class="utop">
					<view class="uinfo" v-if="!userInfo.nickName">
						<view class="header-img">
							<image class="img" src="https://456.doxinsoft.com/images/nouser01.png" />
						</view>
						<myform :ruleform="ruleform" :vaildate="vaildate" :append="true"  @callBack="wechatInfoCallBack">
							<view slot="content">
								<view class="login-nav pl20 pr15 lh-28 fc-white fs-14 mlr15 bdr14">立即登录<text class="iconfont icon-right fs-10 fc-white pl3"></text></view>
							</view>
						</myform>
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
			
			<view class="ugorup-box">
				<dx-nav-class :data="[
					{url:'',type: 1,icon:'dxi-icon dxi-icon-user3',name:'VIP中心'},
					{url:'/pages/merchant/index/index',type: 1,icon:'dxi-icon dxi-icon-shop3',name:'商家中心'},
					{url:'/pages/user/coupon/lists/index',type: 1,icon:'dxi-icon dxi-icon-coupon',name:'我的优惠券'},
					{url:'/pages/user/talents/resume',type: 1,icon:'dxi-icon dxi-icon-order2',name:'我的简历'},
					{url:'/pages/user/talents/lists',type: 1,icon:'dxi-icon dxi-icon-message2',name:'我的应聘'},
				]" @click="checkAuth" isAuth myclass="bdr12" :num="4" :iconSize="24" :nameSize="14" :namePTop="10"></dx-nav-class>
			</view>
		</view>
	</view>
</template>

<script>
	import dxNavClass from "doxinui/components/nav-class/nav-class"
		import {userinfo} from "@/api/user";
	export default {
		components:{dxNavClass},
		data() {
			return {
				ruleform:{},
				vaildate:{},
				orders1:'',
				orders3:'',
				orders5:'',
				orders9:'',
				orders10:'',
				userInfo:{}
			}
		},
		onLoad() {
			userinfo({token:uni.getStorageSync('token')}).then((res)=>{
				
				
			})
			this.userInfo = uni.getStorageSync("wxUser");
		},
		methods: {
			
			wechatInfoCallBack(userInfo){
				this.userInfo = userInfo;
				return this.linkTo("/pages/user/login/index/index",0);
			},
			checkAuth(v){
				return this.checkUser(v.url);
			},
		}
	}
</script>
<style lang="scss">
@import "index.css";
</style>