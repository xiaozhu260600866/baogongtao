<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="head-info">
				<view class="sign-top fc-white">
					<view class="s-item">
						<view class="h-name fs-15 pb5">连续签到</view>
						<view class="h-num fs-16"><text class="Arial">{{ continuity }}</text>天</view>
					</view>
					<view class="s-info s-item">
						<view class="header-img">
							<image :src="data.getUser.avatarUrl" mode="widthFix" />
						</view>
						<view class="ptb5 fs-14 lh-20">
							<view>{{data.getUser.nickName}}</view>
							<view>我的积分：<text class="Arial">{{ data.user.integral }}</text>积分</view>
						</view>
						<button hover-class="none" class="sign-btn" @click="sigin">{{ data.siginToday ? '已签到' :'签到' }}</button>
					</view>
					<view class="s-item">
						<view class="h-name fs-15 pb5">总签到</view>
						<view class="h-num fs-16"><text class="Arial">{{ data.siginCount }}</text>天</view>
					</view>
				</view>
			</view>
			<view class="mt8 bg-f">
				<view class="ptb5 bd-be plr15 month">
					<selectSimple :data="yearArr" v-model="ruleform.selectDate" @callBack="selectRes"></selectSimple>
				</view>
				<view class="calendar ptb10" v-if="selectIng">
					<view class="cale-box">
						<view :class="['day ptb3 plr8 fs-15 fc-3 Arial',v.sigined ? 'cur' : ''] " v-for="v in days">{{ v.name}}</view>
					</view>
				</view>
			</view>
			<view class="runing">
				<view class="flex-center plr15 lh-50">
					<view class="fs-15 fc-6">
						<text>连续签到</text>
						<text class="Arial">{{ data.siteConfig.sigin_day }}</text>
						<text>天，送</text>
						<text class="Arial">{{ data.siteConfig.sigin }}</text>
						<text>积分</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import selectSimple from "xiaozhu/uniapp/components/selectSimple";
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
			//this.ajax();
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
<style lang="scss">
@import "./index.scss";
</style>