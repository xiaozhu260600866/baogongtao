<template>
	<view>
		<page ref="page"></page>
		<view class="container">
			<view class="company-info">
				<view class="head">
					<image class="img" :src="ruleform.logoMinUrl"></image>
				</view>
				<view class="info">
					<view class="name">{{ruleform.name}}</view>
					<view class="tag">
						<view class="item" v-if="ruleform.city">{{ruleform.city}}</view>
						<view class="item Arial">{{ruleform.scale?ruleform.scale:'暂无'}}</view>
						<view class="item">{{ruleform.industry?ruleform.industry:'暂无'}}</view>
					</view>
				</view>
			</view>
			<view class="banner" v-if="sliders">
				<dxSwiper :data="sliders"></dxSwiper>
			</view>
			<view class="address">
				<view class="icon dxi-icon dxi-icon-location-fill"></view>
				<view class="txt nowrap">{{ruleform.address?ruleform.address:'暂无'}}</view>
				<view class="icon dxi-icon dxi-icon-right2"></view>
			</view>
			<view class="company-intro">
				<view class="item">
					<view class="title">公司介绍</view>
					<view class="content" v-if="ruleform.remark_company">{{ruleform.remark_company}}</view>
					<view class="content" v-else>暂无</view>
				</view>
				<view class="item">
					<view class="title">公司风采</view>
					<dx-images :data="remark_pic_company" bgColor="transparent" :imgR="6" v-if="remark_pic_company.length"></dx-images>
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
	import xiaozhuSwiper from "xiaozhu/uniapp/components/swiper"
	import {userinfo, action, logout,sliders} from "@/api/user";
	export default {
		components:{dxImages,dxSwiper,xiaozhuSwiper},
		data() {
			return {
				formAction: '/api/company/store',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{
					remark_company:'',
					remark_pic_company:[],
				},
				remark_pic_company:[],
				detail:{
					company_name:'广盈科技',
					city:'江门',
					scale: '20-50人',
					industry:'机械/仪器仪表',
					address:'广东省江门市蓬江区建设路82号老广新意(新之城店)',
					company_remark:'广盈科技',
					team:[{img:'/static/images/news.jpg'}]
				},
				sliders:[]
			}
		},
		onLoad() {
			userinfo({token:uni.getStorageSync('token')}).then((res)=>{
				this.ruleform =res.data.company;
				this.ruleform.license =  this.ruleform.license ? this.ruleform.license.split(",") : [],
				// this.ruleform.cover = this.ruleform.cover ? this.ruleform.cover.split(",") : [];
				this.ruleform.logo = this.ruleform.logo ? this.ruleform.logo.split(",") : [];
				this.ruleform.remark_pic_company = this.ruleform.remark_pic_company ? this.ruleform.remark_pic_company.split(",") : [];
				if(this.ruleform.remark_pic_company.length){
					this.ruleform.remark_pic_company.forEach(v=>{
						this.remark_pic_company.push({img:this.getSiteName + '/upload/images/logo/'+v});
					})
				}
				if(this.ruleform.cover.length){
					this.ruleform.cover.split(",").forEach(v=>{
						this.sliders.push({cover:this.getSiteName + '/upload/images/logo/800_'+v});
					})
				}
			})
		},
		methods: {
			
		}
	}
</script>
<style lang="scss">
@import "index.scss";
</style>