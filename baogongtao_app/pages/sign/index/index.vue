<template>
	<view class="pb60">
		<view class="sign-box" v-if="show">
			<view class="plr20" v-if="loginDiv">
				<view class="head">
					<image class="img" :src="wechatUser ? wechatUser.avatarUrl :'/static/images/news/01.jpg'"></image>
				</view>
				<dx-button type="primary" size="lg" block round open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">一键授权登录</dx-button>
			</view>
			<view class="sign_info" v-else>
				<view class="map-item">
					<map class="map" :latitude="ruleform.location_x" :longitude="ruleform.location_y" :enable-zoom="false" :enable-scroll="false"></map>
				</view>
				<view class="location-info">
					<view class="headPic">
					
						<image class="img" :src="wechatUser ? wechatUser.avatarUrl :'/static/images/news/01.jpg'"></image>
					</view>
					<view class="area">{{ruleform.area}}</view>
					<view class="address">{{ruleform.address}}</view>
					
				</view>
				<!-- 如果是外出:start -->
				<view class="sign_write" v-if="goout">
					<view class="remark text-center fs-15 ptb10 lh-1" @click="goto('/pages/sign/index/layouts/remark',1)">添加备注...</view>
				
				</view>
				<!-- 如果是外出:end -->
				<view class="sign_time" :class="[data.count < 2?'mt80':'']" @click="signIn()">
					<view class="time">
						<text class="Arial">{{data.h}}</text>
						<text class="plr3">:</text>
						<text class="Arial">{{data.m}}</text>
					</view>
					<view class="txt">
						<!-- 如果是外出 -->
						<view v-if="goout">第<text class="plr2 Arial">{{data.count +1 }}</text>次外出</view>
						<!-- 如果是上下班 -->
						<view v-else-if="data.count < 2">{{up?'上':'下'}}班打卡</view>
					</view>
				</view>
				<view class="sign_record" @click="goto('/pages/sign/lists/index',1)">打卡记录</view>
			</view>
			<view class="sign_results" v-if="singResults">
				<view class="icon"><text class="dxi-icon dxi-icon-success"></text></view>
				<view class="txt">
					<!-- 如果是外出 -->
					<text v-if="goout">外出打卡成功</text>
					<!-- 如果是上下班 -->
					<text v-else>{{singResultData.type == 0?'上':'下'}}班打卡成功</text>
				</view>
				<view class="results-info">
					<view class="row">
						<view class="llabel">时间</view>
						<view class="rvalue Arial">{{data.h}}:{{data.m}}</view>
					</view>
					<view class="row">
						<view class="llabel">位置</view>
						<view class="rvalue">{{ruleform.area}}</view>
					</view>
					<view class="row">
						<view class="llabel">公司</view>
						<view class="rvalue">{{singResultData.getWork.companyName}}</view>
					</view>
					<!-- 如果是外出:start -->
					<block v-if="goout">
						<view class="row">
							<view class="llabel">备注</view>
							<view class="rvalue">{{singResultData.remark}}</view>
						</view>
						<view class="row">
							<view class="llabel">图片</view>
							<view class="rvalue">
								<image class="img" :src="getSiteName + '/upload/images/sign/300_'+singResultData.cover" mode="aspectFill" @click="previewImage(getSiteName + '/upload/images/sign/'+singResultData.cover)"></image>
							</view>
						</view>
					</block>
					<!-- 如果是外出:end -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import dxftButton from "doxinui/components/button/footer-button"
	import {mapState,mapMutations,mapActions} from 'vuex'
	import {userinfo,action,logout} from "@/api/user";
	export default {
		components: {dxftButton},
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
					type: 0,
					cover:"",
					remark:""
				},
				timeHour: '',
				timeMinute: '',
				show: false,
				loginDiv: false,
				timePointer: true,
				locationStatus: false,
				wechatUser: uni.getStorageSync('wxUser'),
				amS: 2,
				amX: 3,
				pmS: 1,
				pmX: 1,
				remarkImg:'../../../static/images/news/03.jpg',
				singResults:false,
				goout:true,
				singResultData:{},
				up:true,
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
			if(!uni.getStorageSync('sysUser')){
				this.loginDiv = true;
				this.show = true;
			}else{
				userinfo({
					token: uni.getStorageSync('token')
				}).then((res) => {
					if (!res.data.worker.company_id) {
						this.loginDiv = true;
					} else {
						this.loginDiv = false;
					}
					this.$set(this.ruleform,"sign_type",res.data.worker.sign_type);
					
				})
				this.ajax();
			}
			
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onShow(){
			if(uni.getStorageSync('remark')){
				this.ruleform.remark = uni.getStorageSync('remark');
				this.ruleform.cover = uni.getStorageSync('cover');
				uni.removeStorageSync('remark');
				uni.removeStorageSync('cover');
			};
		},
		methods: {
			...mapMutations(['login', 'setUserInfo', 'setStaffInfo']),
			getPhoneNumber(e) {
				this.getAuthPhoneNumber(e, msg => {
					this.ruleform.phone = msg.data.phoneNumber;
					this.postAjax("/api/auth/loginForWorker", this.ruleform).then(res => {
						if (res.data.code == 0) {
							console.log("token", res.data.data.token)
							let state = {
								token: res.data.data.token,
								isLogin: true
							};
							this.login(state);
							this.loginDiv = false;
							let userInfo = {
								data: res.data.data.worker
							}
							this.setUserInfo(userInfo);
							this.ajax();
						}
					})
				}, () => {

				});
			},
			signIn(type) {
				
				if (this.ruleform.sign_type == 1 && this.ruleform.cover.length == 0) {
					return this.getError("请拍照上传打卡图片");
				}
				this.ruleform.type = type;
				this.ruleform.token = uni.getStorageSync('token');
				this.postAjax(this.formAction, this.ruleform).then(msg => {
					if(msg.data.status == 2){
						this.singResults = true;
						this.singResultData = msg.data.signData;
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
						this.ruleform.area = res2.data.result.formatted_addresses.rough;
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
			previewImage:function(url){
				uni.previewImage({
					urls: [url]
				})
			},
			ajax() {
				
				this.getAjax(this,{token: uni.getStorageSync('token')}).then(msg => {
					let morningData = [];
					let afterroomData = [];
					this.goout = msg.goout;
					this.up = msg.up;
					this.show = true;
				});
			}
		}
	}
</script>
<style lang="scss">
page{background-color: #fff;}
@import "./index.scss";
</style>
