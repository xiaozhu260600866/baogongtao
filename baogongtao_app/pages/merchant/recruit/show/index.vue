<template>
	<view class="pb60">
		<page ref="page"></page>
		<view class="bg-f" v-if="data.show">
			<block v-if="applySuccess == false">

				<!-- <view class="banner">
					<image class="flex w-b100" src="/static/images/news/03.jpg" mode="widthFix"></image>
				</view> -->
				<view class="recruit-info">
					<view class="top lh-1 flex-between flex-middle">
						<view class="name fs-26 fw-bold mr15">{{detail.job_position}}</view>
						<view class="flex1 salary fs-18 main-color Arial text-right">{{detail.salary}}</view>
					</view>
					<view class="tag flex-middle flex-wrap lh-1 mt15 fs-14">
						<view class="item">
							<text class="icon iconfont icon-location-o"></text>
							<text class="txt">{{detail.work_place}}</text>
						</view>
						<view class="item">
							<text class="icon iconfont icon-recruit-experience"></text>
							<text class="txt">工作经验{{detail.experience}}</text>
						</view>
						<view class="item">
							<text class="icon iconfont icon-recruit-education"></text>
							<text class="txt">{{detail.education}}</text>
						</view>
					</view>
					<view class="condition">
						<view class="lab" v-for="item in getTag(v)">{{item}}</view>
					</view>
				</view>
				<view class="charger-info flex-middle">
					<image class="head" :src="detail.get_company.logoMinUrl" mode="aspectFill"></image>
					<view class="left flex1 ml10 lh-1">
						<view class="flex-end">
							<view class="fs-16 fw-bold">{{detail.get_company.charger_name}}</view>
							<view class="fs-15 fc-3 mt8 pl10" v-if="detail.get_company.get_user.get_user_info.position">
								{{detail.get_company.get_user.get_user_info.position}}
							</view>
						</view>

						<view class="fs-15 fc-3 mt8" v-if="detail.get_company.charger_phone">
							{{detail.get_company.charger_phone}}</view>
					</view>
				</view>
				<view class="company-info">
					<view class="title fs-18 pb15 fw-bold">职位详情</view>
					<view class="con fs-15 fc-6">
						<view class="content" v-if="detail.job_remark">{{detail.job_remark}}</view>
						<view class="content" v-else>暂无</view>
					</view>
				</view>
				<view class="company-info">
					<view class="title fs-18 pb15 fw-bold">公司信息</view>
					<view class="lists">
						<view class="item">
							<text class="icon iconfont icon-merchant fs-16"></text>
							<text class="txt">{{detail.get_company.name}}</text>
						</view>
						<view class="item" v-if="detail.work_place">
							<text class="icon iconfont icon-location-o fs-16"></text>
							<text class="txt">{{detail.work_place}}</text>
						</view>
						<view class="item">
							<text class="icon dxi-icon dxi-icon-user"></text>
							<text class="txt">{{detail.contact_name}}</text>
						</view>
						<view class="item" @click="phone(detail.contact_phone)">
							<text class="icon dxi-icon dxi-icon-tel2"></text>
							<text class="txt">{{detail.contact_phone}}</text>
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
						<button class="btn-item" hover-class="none" @click="goto('/pages/index/index',2)">
							<view class="icon dxi-icon dxi-icon-home4"></view>
							<view class="txt">首页</view>
						</button>
						<button class="btn-item" hover-class="none" @click="$refs.shareShow.shareBtn = true">
							<view class="icon dxi-icon dxi-icon-share2 fs-17"></view>
							<view class="txt">分享</view>
						</button>
						<button class="btn-item" hover-class="none" @click="collect=!collect">
							<view :class="['icon dxi-icon',collect==false?'dxi-icon-star':'dxi-icon-star-fill']"></view>
							<view class="txt">收藏</view>
						</button>
					</view>
					<view class="right flex1 w-b100 pr15" @click="checkTo()">
						<view class="r-nav">
							<view class="r-item r-item-primary">申请报名</view>
						</view>
					</view>
				</view>
			</block>
			<!-- 如果未有简历 -->
			<!-- <dx-diag title="登录或注册简历" :titBold="false" :bottomOFF="false" ref="loginDiag">
				<myform :ruleform="ruleform" :vaildate="vaildate" :append="true"  @callBack="wechatInfoCallBack">
					<view slot="content">
						<dx-button type="primary" size="lg" myclass="mt15 mlr5" icon="dxi-icon dxi-icon-wechat" block>微信账号快速登录</dx-button>
					</view>
				</myform>
			</dx-diag> -->




			<!-- 如果已有简历 -->
			<dx-results txt="申请成功" @click="goto('/pages/index/index',2)" v-if="applySuccess"></dx-results>
		</view>
		<shareResume ref="shareShow" :data="detail" :qrcodeFilePath="qrcodeFilePath" :dis="dis"></shareResume>
		<dx-diag title="包工淘，精准招聘" :bottomOFF="false" ref="wechatAuth" @callBack="goto('/pages/index/index',2)">
			<view class="fs-16 pb15 pt10 text-center fc-3">一键授权，查看当前信息</view>
			<myform :ruleform="ruleform" :vaildate="vaildate" :append="true" @callBack="wechatInfoCallBack">
				<view slot="content">
					<dx-button type="primary" size="lg" myclass="mt15 mlr15" block>确认</dx-button>
				</view>
			</myform>
		</dx-diag>
	</view>
</template>

<script>
	import dxDiag from "doxinui/components/diag/diag"
	import dxResults from "doxinui/components/results/results"
	import shareResume from "@/components/poster/shareResume"
	export default {
		components: {
			dxDiag,
			dxResults,
			shareResume
		},
		data() {
			return {
				formAction: '/api/company/recruit-store',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				detail: {},
				ruleform: {},
				qrcodeFilePath: '',
				company: {

				},
				intro: {
					info: '公司位于广东中山市火炬高新技术产业开发区内，公司成立于1998年7月2日，1998年12月28日于中山市火炬开发区举行破土典礼，兴建厂房，1999年11月1日顺利完成厂房、写字楼及宿舍的兴建及机器设备的进口与安装，并正式开始量产。本公司是由西萨摩亚富理东公司投资，注册资本1100万美元，总投资1800美元。产品包括桌上型计算机机壳及笔记型电脑前组装（为宏碁计算机公司配套产品），具有精密模具、塑料成型、五金冲压、烤漆及组立等专业制造能力',
					money: '五金部:20元/小时;涂装、注塑、组装:17元/小时;夜班补贴10元/晚',
					require: '16-48周岁，男女不限;主要生产笔记本电脑外壳。',
					condition: '可凭厂牌于厂内超市每日消费25块钱（月底工资扣)。',
					prepare: '携带本人身份证原件，需要体检，体检费40元，做满7天报销。',
					address: '江门市蓬江区建设路82号金山大厦之二10楼1001室'
				},
				collect: false,
				type: 1,
				dis: '',
				applySuccess: false,
			}
		},
		onLoad() {
			
			this.ajax();
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onShareAppMessage() {
			return this.shareSource(this, '包工淘');
		},
		methods: {
			getTag(v){
				let arr = [];
				// arr.push(v.salary)
				let tag = this.detail.job_tab ? this.detail.job_tab.split(",") :[ ];
				if(tag.length){
					tag.forEach(e=>{
						arr.push(e)
					})	
				}
				return arr;
			},
			wechatInfoCallBack(userInfo) {
				if( uni.getStorageSync("userInfo")){
					this.$refs.wechatAuth.thisDiag = false;
					this.ajax();
				}
			},
			checkTo() {
				if (this.type == 1) {
					this.ruleform.token = uni.getStorageSync('token');
					this.ruleform.company_id = this.detail.get_company.id;
					this.ruleform.recruit_id = this.detail.id;
					this.vaildForm(this, res => {
						if (res) {
							this.postAjax("/api/company/recruit-record-store", this.ruleform).then(msg => {
								if (msg.data.code == 0) {
									return this.applySuccess = true;
								}
							});
						}

					})

					// return this.linkTo("/pages/merchant/recruit/record/index?recruit_id="+this.data.data.data.id,1);

				} else {
					return this.$refs.loginDiag.thisDiag = true;
				}
			},
			ajax() {
				let data = {};
				if (uni.getStorageSync("token")) {
					data.token = uni.getStorageSync("token");
				}
				this.getAjax(this, data).then(msg => {
					this.detail = msg.data.data;
					this.qrcodeFilePath = msg.data.path
					this.dis = msg.data.dis;
					if (!uni.getStorageSync('userInfo')) {
						console.log(this.$refs)
						this.$refs.wechatAuth.thisDiag = true;
					} 
				});
			}
		}
	}
</script>
<style lang="scss">
	@import "index.scss";
</style>
