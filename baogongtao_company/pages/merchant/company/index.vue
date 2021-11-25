<template>
	<view>
		<page ref="page"></page>
		<view class="container">
			<view class="company-info">
				<view class="head">
					<image class="img" src="/static/images/news.jpg"></image>
				</view>
				<view class="info">
					<view class="name">{{detail.company_name}}</view>
					<view class="tag">
						<view class="item">{{detail.city}}</view>
						<view class="item Arial">{{detail.scale?detail.scale:'暂无'}}</view>
						<view class="item">{{detail.industry?detail.industry:'暂无'}}</view>
					</view>
				</view>
			</view>
			<view class="banner">
				<dx-swiper :data="[
				　　{cover: '/static/images/news.jpg'},
				　　{cover: '/static/images/news.jpg'}
				]"></dx-swiper>
			</view>
			<view class="address">
				<view class="icon dxi-icon dxi-icon-location-fill"></view>
				<view class="txt nowrap">{{detail.address?detail.address:'暂无'}}</view>
				<view class="icon dxi-icon dxi-icon-right2"></view>
			</view>
			<view class="company-intro">
				<view class="item">
					<view class="title">公司介绍</view>
					<view class="content" v-if="detail.company_remark">{{detail.company_remark}}</view>
					<view class="content" v-else>暂无</view>
				</view>
				<view class="item">
					<view class="title">公司风采</view>
					<dx-images :data="detail.team" bgColor="transparent" :imgR="6" v-if="detail.team.length"></dx-images>
					<view class="content" v-else>暂无</view>
				</view>
			</view>
			<view class="company-edit" @click="goto('/pages/merchant/info/index',1)">
				<view class="dxi-icon dxi-icon-edit2 fs-20 fc-white"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import dxImages from "doxinui/components/images/images"
	import dxSwiper from "doxinui/components/swiper/swiper"
	export default {
		components:{dxImages,dxSwiper},
		data() {
			return {
				detail:{
					company_name:'广盈科技',
					city:'江门',
					scale: '20-50人',
					industry:'机械/仪器仪表',
					address:'广东省江门市蓬江区建设路82号老广新意(新之城店)',
					company_remark:'广盈科技',
					team:[{img:'/static/images/news.jpg'}]
				}
			}
		},
		onLoad() {
			
		},
		methods: {
			
		}
	}
</script>
<style lang="scss">
@import "index.scss";
</style>