<template>
	<view class="pb60">
		<view class="sign-box" v-if="show">
			<view v-if="loginDiv">
				<dx-button type="primary" size="lg" round open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
					一键授权登录</dx-button>
			</view>
			<view v-else>
				<view id="location" class="sign-item mb0">
					<map style="width: 100%;" :latitude="ruleform.location_x" :longitude="ruleform.location_y"
						:enable-zoom="false" :enable-scroll="false"></map>
				</view>
				<view class="sign-item">
					<view class="title pt15 plr15 lh-1">上传图片</view>
					<weui-input v-model="ruleform.cover" type="upload" upurl='sign' allowUpLoadNum="4" name="cover"
						datatype="array" :sourceType="1"></weui-input>
				</view>
				<view class="sign-item">
					<weui-input v-model="ruleform.remark" placeholder="请填写备注信息" type="textarea" name="remark">
					</weui-input>
				</view>
				<!-- <view id="sign">
				<image class="w-b100" src="/static/image/square.png" mode="widthFix"></image>
				<view id="con">
					<view id="timer">{{ timeHour }}<text :class="[timePointer?'fc-white':'']">:</text>{{ timeMinute }}</view>
					<view class="txt">{{ locationStatus?'打卡':'定位中...' }}</view>
				</view>
			</view> -->
				<button  @click="goto('/pages/sign/lists/index',1)">打卡记录</button>

				<dxftButton type="primary" size="lg" round @click="signIn()">打卡</dxftButton>
				<!-- <dxftButton type="primary" size="lg" round @click="goto('/pages/sign/lists/index',1)">打卡记录</dxftButton> -->
			</view>
		</view>
	</view>
</template>

<script>
	import dxListMsg from "doxinui/components/list-cell/list-msg"
	import dxftButton from "doxinui/components/button/footer-button"
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	import {
		userinfo,
		action,
		logout
	} from "@/api/user";
	export default {
		components: {
			dxListMsg,
			dxftButton
		},
		data() {
			return {
				formAction: '/api/user/signIn',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform: {
					location_x: '',
					location_y: '',
					address: '',
					city: '',
					type: 0
				},
				timeHour: '',
				timeMinute: '',
				show: false,
				loginDiv: false,
				timePointer: true,
				locationStatus: false,
				amS: 2,
				amX: 3,
				pmS: 1,
				pmX: 1,
			}
		},

		onLoad(options) {
			wx.getLocation({
				type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
				altitude: true,
				success: res => {
					console.log(res);
					this.getThisAddress(res, false);
				},
				fail: res => {
			
				},
				cancel: res => {
			
				}
			});
			if(!uni.getStorageSync('sysStaff')){
				this.loginDiv = true;
				this.show = true;
			}else{
				userinfo({
					token: uni.getStorageSync('token')
				}).then((res) => {
					if (res.data.user.role != 6) {
						this.loginDiv = true;
					} else {
						this.loginDiv = false;
					}
					this.show = true;
				
				})
			}
			
			//this.ajax();
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		methods: {
			...mapMutations(['login', 'setUserInfo', 'setStaffInfo']),
			getPhoneNumber(e) {
				this.getAuthPhoneNumber(e, msg => {
					this.ruleform.phone = msg.data.phoneNumber;
					this.postAjax("/api/auth/loginForStaff", this.ruleform).then(res => {
						if (res.data.code == 0) {
							console.log("token", res.data.data.token)
							let state = {
								token: res.data.data.token,
								isLogin: true
							};
							this.login(state);
							this.loginDiv = false;
							let userInfo = {
								data: res.data.data.staff
							}
							this.setStaffInfo(userInfo);
						}
					})
				}, () => {

				});
			},
			signIn(type) {
				if (this.ruleform.cover.length == 0) {
					return this.getError("必须上传图片");
				}
				this.ruleform.type = type;
				this.ruleform.token = uni.getStorageSync('token');
				this.postAjax(this.formAction, this.ruleform).then(msg => {
					if(msg.data.status == 2){
						this.ruleform.cover = [];
						this.ruleform.remark = "";
					}
					
				})
			},
			getThisAddress(res) {
				uni.request({
					url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + res.latitude + ',' + res.longitude +
						'&key=' +
						'LT6BZ-ZAOC6-KUFSB-MR4F4-OOMX5-S6BTW&get_poi=1',
					success: res2 => {
						this.ruleform.location_x = res.latitude;
						this.ruleform.location_y = res.longitude;
						this.ruleform.address = res2.data.result.address;
						this.ruleform.city = res2.data.result.address_component.city;
						console.log(res2.data.result.address_component.city)
					}
				});
			},
			timer() {
				let now = new Date();
				let hours = now.getHours();
				if (hours < 10) {
					hours = '0' + hours;
				}
				let minutes = now.getMinutes();
				if (minutes < 10) {
					minutes = '0' + minutes;
				}
				let seconds = now.getSeconds();
				if (seconds < 10) {
					seconds = '0' + seconds;
				}
				this.timeHour = hours;
				this.timeMinute = minutes;
				this.timePointer = !this.timePointer;

			},
			ajax() {

				this.getAjax(this).then(msg => {
					let morningData = [];
					let afterroomData = [];



					

				});
			}
		}
	}
</script>
<style scoped="" lang="scss">
	@import "./index.scss";
</style>
