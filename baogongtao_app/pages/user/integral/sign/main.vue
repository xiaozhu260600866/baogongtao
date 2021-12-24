<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<div v-if="data.show">
			<div class="head-info">
				<div class="sign-top">
					<div class="s-item">
						<div class="h-name fs-15 fc-white pb5">连续签到</div>
						<div class="h-num fs-16 fc-white"><span class="Arial">{{ continuity }}</span>天</div>
					</div>
					<div class="s-info s-item">
						<div class="header-img">
							<image :src="data.getUser.avatarUrl" mode="widthFix" />
						</div>
						<div class="ptb5">
							<p class="fs-14 lh-20 fc-white">{{data.getUser.nickName}}</p>
							<p class="fs-14 lh-20 fc-white">我的积分：<span class="Arial">{{ data.user.integral }}</span>积分</p>
						</div>
						<button hover-class="none" class="sign-btn" @click="sigin">{{ data.siginToday ? '已签到' :'签到' }}</button>
					</div>
					<div class="s-item">
						<div class="h-name fs-15 fc-white pb5">总签到</div>
						<div class="h-num fs-16 fc-white"><span class="Arial">{{ data.siginCount }}</span>天</div>
					</div>
				</div>
			</div>
			<div class="mt8 bg-f">
				<!-- 	<p class="plr15 ptb12 lh-20 bd-be fs-15">2019年5月</p> -->
				<div class="ptb5 bd-be plr15 month">
					<selectSimple :data="yearArr" v-model="ruleform.selectDate" @callBack="selectRes"></selectSimple>
				</div>
				<div class="calendar ptb10" v-if="selectIng">
					<div class="cale-box">
						<p :class="['day ptb3 plr8 fs-15 fc-3 Arial',v.sigined ? 'cur' : ''] " v-for="v in days">{{ v.name}}</p>
					</div>
				</div>
			</div>
			<div class="runing">
				<div class="flex-center plr15 lh-50">
					<p class="fs-15 fc-6">
						<text>连续签到</text>
						<text class="Arial">{{ data.siteConfig.sigin_day }}</text>
						<text>天，送</text>
						<text class="Arial">{{ data.siteConfig.sigin }}</text>
						<text>积分</text>
					</p>
				</div>
				<!-- <div class="run-box">
					<div class="add-cale flex">
						<div :class="['run-item  bg-f mlr10 ptb5',continuity >= data.siteConfig.sigin_day ? 'cur' :'']">
							<p class="fc-6 lh-20 fs-15 Arial">+{{ data.siteConfig.sigin }}</p>
							<p class="fc-6 lh-20 fs-15">积分</p>
						</div>

					</div>
					<div class="progress flex mtb5">
						<p :class="['run-item plr10', continuity >= data.siteConfig.sigin_day ? 'cur' :'']"><span class="circular"></span></p>
						<p class="run-item plr10"><span class="circular"></span></p>
					</div>
					<div class="status flex">
						<div :class="['run-item mlr10 ptb5', continuity >= data.siteConfig.sigin_day ? 'cur' :'']">
							<p class="fc-6 lh-20 mb5 fs-15 Arial">{{ data.siteConfig.sigin_day }}天</p>
							<p class="nav fc-6 lh-24 fs-14">{{ continuity >= data.siteConfig.sigin_day ? '已达到' :'未达到' }}</p>
						</div>

					</div>
				</div> -->
			</div>
		</div>
	</view>
</template>

<script>
	import selectSimple from "xiaozhu/uniapp/components/selectSimple";
	
	import "./index.css";
	export default {
		components:{
			 selectSimple
		},
		data() {
			return {
				formAction: '/shop/user/sigin',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				days: [],
				continuity: 0,
				selectIng: true,
				ruleform: {
					selectDate: ''
				},
				yearArr: []
			}
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onShareAppMessage() {
			return this.shareSource(this, '商城');
		},
		onLoad(options) {
			let days = new Date();
			let year = days.getFullYear();
			let month = days.getMonth() + 1;

			let monthsCount = 13; //统计13个月
			let dateArr = [];
			for (let i = monthsCount; i >= 0; i--) {
				if (i != monthsCount) month--;
				if (month == 0) {
					month = 12;
					year--;
				}
				if (month < 10) {
					this.yearArr.push({
						label: year + '年0' + month + '月',
						value: year + '/' + month
					});
				} else {
					this.yearArr.push({
						label: year + '年' + month + '月',
						value: year + '/' + month
					});
				}
			}
			this.ajax();
		},
		methods: {
			sigin() {
				if (this.data.siginToday == 0) {
					this.postAjax(this.formAction, {
						count: this.continuity
					}).then(msg=>{
						if (msg.data.status == 2) {
							this.ajax();
						}
					});
				}

			},
			selectRes(res) {
				this.selectIng = false;
				this.setDate(res.value);
				this.data.query.yearMonth = res.value;
				this.ruleform.selectDate = res.value;
				this.ajax();
			},
			ajax() {
				this.getAjax(this).then(msg => {
					this.selectIng = true;
					if (!this.ruleform.selectDate) this.ruleform.selectDate = this.yearArr[0].value;
					this.setDate(this.ruleform.selectDate);
				});
			},
			setDate(dateAndMonth) {
				console.log('aceffff');
				let daysCount = parseInt(this.getCountDays(dateAndMonth));
				//this.getError(daysCount+'');
				this.days = [];
				for (var i = 1; i <= daysCount; i++) {
					if (this.in_array(i, this.data.singinRes.record)) {
						this.days.push({
							name: i,
							sigined: true
						});
					} else {
						this.days.push({
							name: i,
							sigined: false
						});
					}
				}
				//判断连续签到的日期
				let continuity = 0;
				this.days.forEach((v, i) => {

					if (v.name != this.data.toDay) {

						if (this.days[i + 1] && i != this.days.length - 2 && this.data.toDay > v.name) {
							if (v.sigined && this.days[i + 1].name == this.data.toDay) {
								continuity++;
							} else {
								if (v.sigined && this.days[i + 1].sigined) {
									continuity++;
								} else {
									continuity = 0;
								}
							}

						}
						if (i == this.days.length - 2 && this.days[i - 1] && this.data.toDay > v.name) {
							if (v.sigined && this.days[i - 1].sigined) {
								continuity++;
							} else {
								continuity = 0;
							}
						}
					}
					console.log(v.name);
					if (v.name == this.data.toDay && v.sigined) {
						console.log('aceffff');
						continuity++;
					}
					if (continuity == 0 && this.data.yesterday && v.sigined) {
						console.log('ees');
						continuity++;
					}

				});
				this.continuity = continuity;
				/*if(continuity){
					continuity+=1;
					this.continuity =continuity;
				}*/
			}
		},
		
	}
</script>
