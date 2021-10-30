<template>
	<view>
		<page ref="page"></page>
		<view>
			<view class="Huser main-bg">
				<view class="con">
					<view class="head">
						<image class="img" src="/static/images/logo.png"></image>
					</view>
					<view class="info">
						<view class="school fs-18">江门市东信科技有限公司</view>
						<view class="row fs-16">
							<view class="name">简里</view>
							<view class="phone Arial">13380951183</view>
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
				]" @click="checkAuth" :num="4" :nameSize="15" :namePTop="10"></dx-nav-class>
			</view>
		</view>
	</view>
</template>

<script>
import dxNavClass from "doxinui/components/nav-class/nav-class"
	export default {
		components:{dxNavClass},
		data() {
			return {
			}
		},
		onLoad() {
			
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