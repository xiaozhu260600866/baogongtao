<template>
	<view class="pb60">
		<page ref="page"></page>
		<view class="bg-f" v-if="data.show">
			<!-- <view class="banner">
				<image class="flex w-b100" src="/static/images/news/03.jpg" mode="widthFix"></image>
			</view> -->
			<view class="recruit-info">
				<view class="top lh-1 flex-between flex-middle">
					<view class="name fs-26 fw-bold flex1 mr15">{{detail.job_position}}</view>
					<view class="salary fs-18 main-color Arial">{{detail.salary}}</view>
				</view>
				<view class="tag flex-middle lh-1 mt20 fs-14">
					<view class="item">
						<text class="icon iconfont icon-location-o"></text>
						<text class="txt">{{detail.work_place}}</text>
					</view>
					<view class="item">
						<text class="icon iconfont icon-recruit-experience"></text>
						<text class="txt">{{detail.experience}}</text>
					</view>
					<view class="item">
						<text class="icon iconfont icon-recruit-education"></text>
						<text class="txt">{{detail.education}}</text>
					</view>
				</view>
			</view>
			<view class="charger-info flex-middle">
				<image class="head" :src="detail.get_company.logoMinUrl" mode="aspectFill"></image>
				<view class="left flex1 ml10 lh-1">
					<view class="fs-16 fw-bold">{{detail.get_company.charger_name}}</view>
					<view class="fs-15 fc-3 mt8" v-if="detail.get_company.position">{{detail.get_company.position}}</view>
				</view>
			</view>
			<view class="company-info">
				<view class="title fs-18 pb15 fw-bold">职位详情</view>
				<view class="con fs-15 fc-6">
					<view class="name">公司简介：</view>
					<view class="content">{{detail.get_company.remark_company}}</view>
				</view>
			</view>
			<view class="company-info">
				<view class="title fs-18 pb15 fw-bold">公司信息</view>
				<view class="lists">
					<view class="item">
						<text class="icon iconfont icon-merchant"></text>
						<text class="txt">{{detail.get_company.name}}</text>
					</view>
					<view class="item">
						<text class="icon iconfont icon-location-o"></text>
						<text class="txt">{{detail.get_company.address}}</text>
					</view>
				</view>
			</view>
			<!-- <view class="info plr15">
				<view class="name fw-bold fs-17 pt20 pb10">{{detail.get_company.name}}</view>
				<view class="info-lists">
					<view class="row cell" v-if="detail.get_company.address">
						<view class="icon dxi-icon dxi-icon-location fs-16"></view>
						<view class="txt">工作地点：{{detail.get_company.address}}</view>
					</view>
					<view class="row cell" v-if="detail.salary_date">
						<view class="icon dxi-icon dxi-icon-time fs-14"></view>
						<view class="txt">发薪日期：{{detail.salary_date}}</view>
					</view>
					<view class="row">
						<view class="cell">
							<view class="icon iconfont icon-merchant"></view>
							<view class="txt">{{company.type}}</view>
						</view>
						<view class="cell">
							<view class="icon iconfont icon-people"></view>
							<view class="txt Arial ">{{company.people_num}}人</view>
						</view>
					</view>
				</view>
				<view class="intro">
					<view class="intro-item" v-if="detail.get_company.remark_company">
						<view class="title">企业简介</view>
						<view class="content">{{detail.get_company.remark_company}}</view>
					</view>
					<view class="intro-item" v-if="detail.work_hour">
						<view class="title">拿多少钱</view>
						<view class="content">{{detail.work_hour}}</view>
					</view>
					<view class="intro-item" v-if="detail.need">
						<view class="title">有啥要求</view>
						<view class="content">{{detail.need}}</view>
					</view>
					<view class="intro-item" v-if="detail.live">
						<view class="title">吃住咋样</view>
						<view class="content">{{detail.live}}</view>
					</view>
					<view class="intro-item" v-if="detail.interview">
						<view class="title">面试准备</view>
						<view class="content">{{detail.interview}}</view>
					</view>
					<view class="intro-item" v-if="detail.get_company.address">
						<view class="title">工厂地址</view>
						<view class="content">{{detail.get_company.address}}</view>
					</view>
				</view>
			</view> -->
			<view id="show_footer">
				<view class="left plr8">
					<!-- <button class="btn-item" hover-class="none" @click="goto('/pages/index/main',2)">
						<view class="icon dxi-icon dxi-icon-home4"></view>
						<view class="txt">首页</view>
					</button> -->
					<button class="btn-item" hover-class="none" open-type="share">
						<view class="icon dxi-icon dxi-icon-share2 fs-17"></view>
						<view class="txt">分享</view>
					</button>
					<button class="btn-item" hover-class="none" @click="collect=!collect">
						<view :class="['icon dxi-icon',collect==false?'dxi-icon-star':'dxi-icon-star-fill']"></view>
						<view class="txt">收藏</view>
					</button>
				</view>
				<view class="right flex1 w-b100 pr15" @click="checkUser('/pages/merchant/recruit/record/index?recruit_id='+data.data.data.id)">
					<view class="r-nav">
						<view class="r-item r-item-primary">申请报名</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formAction: '/api/company/recruit-store',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				detail:{},
				company:{
					name:'江门市东信科技有限公司',
					address:'江门市蓬江区建设路82号金山大厦之二10楼1001室',
					time:'企业代发',
					type:'私营企业',
					people_num:'5-50'
				},
				intro:{
					info:'公司位于广东中山市火炬高新技术产业开发区内，公司成立于1998年7月2日，1998年12月28日于中山市火炬开发区举行破土典礼，兴建厂房，1999年11月1日顺利完成厂房、写字楼及宿舍的兴建及机器设备的进口与安装，并正式开始量产。本公司是由西萨摩亚富理东公司投资，注册资本1100万美元，总投资1800美元。产品包括桌上型计算机机壳及笔记型电脑前组装（为宏碁计算机公司配套产品），具有精密模具、塑料成型、五金冲压、烤漆及组立等专业制造能力',
					money:'五金部:20元/小时;涂装、注塑、组装:17元/小时;夜班补贴10元/晚',
					require:'16-48周岁，男女不限;主要生产笔记本电脑外壳。',
					condition:'可凭厂牌于厂内超市每日消费25块钱（月底工资扣)。',
					prepare:'携带本人身份证原件，需要体检，体检费40元，做满7天报销。',
					address:'江门市蓬江区建设路82号金山大厦之二10楼1001室'
				},
				collect: false,
			}
		},
		onLoad() {
			this.ajax();
		},
		methods: {
			ajax() {
				this.getAjax(this).then(msg => {
					this.detail = msg.data.data;
				});
			}
		}
	}
</script>
<style lang="scss">
@import "index.scss";
</style>