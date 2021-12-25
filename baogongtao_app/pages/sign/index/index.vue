<template>
	<view class="pb60">
		<page :parentData="data" :formAction="formAction"></page>
		<view class="sign-box">
			<view id="location" class="sign-item mb0">
				<map style="width: 100%;" :latitude="ruleform.location_x" :longitude="ruleform.location_y" :enable-zoom="false" :enable-scroll="false" ></map>
			</view>
			<view class="sign-item">
				<view class="title pt15 plr15 lh-1">上传图片</view>
				<weui-input v-model="ruleform.cover" type="upload" upurl='sign' allowUpLoadNum="4" name="cover" datatype="array" :sourceType="1"></weui-input>
			</view>
			<view class="sign-item">
				<weui-input v-model="ruleform.remark" placeholder="请填写备注信息" type="textarea" name="remark"></weui-input>
			</view>
			<!-- <view id="sign">
				<image class="w-b100" src="/static/image/square.png" mode="widthFix"></image>
				<view id="con">
					<view id="timer">{{ timeHour }}<text :class="[timePointer?'fc-white':'']">:</text>{{ timeMinute }}</view>
					<view class="txt">{{ locationStatus?'打卡':'定位中...' }}</view>
				</view>
			</view> -->
			<view class="sign-item sign-time">
				<view class="title pt15 plr15 lh-1 fs-17 fw-bold">上午打卡</view>
				
				<dxListMsg name="上班" content="07:00" conColor="#636363" :conSize="14" borderColor="#e9e9e9">
					<view slot="right" class="slot-right">
						<view class="left">
							<view class="address fs-14 fc-7" v-if="data.signinData.amS == 2 || data.signinData.amS == 3 ">
								<text class="dxi-icon dxi-icon-location pr5 fs-12"></text>
								<text class="txt">{{data.signinData.amSAddress}}</text>
							</view>
							<view class="status fc-red fs-14" v-if="data.signinData.amS == 3">迟到</view>
						</view>
						<view class="right">
							<dx-button type="primary" size="medium" btnBg="#5585F1" btnBd="#5585F1" v-if="data.signinData.amS == 0" @click="signIn(0)">签到</dx-button>
							<dx-button myclass="dxi-btn-time" btnBg="#FAFAFA" btnBd="#E7E8EA" size="medium" v-if="data.signinData.amS == 2 || data.signinData.amS == 3 ">{{data.signinData.amSCTime}}</dx-button>
							<!-- <view class="fc-green fs-16" v-if="data.signinData.amS  == 2">签到成功</view>
							<view class="fc-red fs-16" v-if="data.signinData.amS  == 3">您已迟到<span class="Arial">{{data.signinData.amSTime }}</span></view> -->
						</view>
					</view>
				</dxListMsg>
				<dxListMsg name="下班" content="12:00" conColor="#636363" :conSize="14" noborder>
					<view slot="right" class="slot-right">
						<view class="left">
							<view class="address fs-14 fc-7" v-if="data.signinData.amX == 2 || data.signinData.amX == 3">
								<text class="dxi-icon dxi-icon-location pr5 fs-12"></text>
								<text class="txt">{{data.signinData.amXAddress}}</text>
							</view>
							<view class="status fc-red fs-14" v-if="data.signinData.amX == 3">早退</view>
						</view>
						<view class="right">
							<dx-button btnBg="#FAFAFA" btnBd="#E7E8EA" size="medium" hollow v-if="data.signinData.amX == 0" @click="signIn(1)">签退</dx-button>
							<dx-button myclass="dxi-btn-time" btnBg="#FAFAFA" btnBd="#E7E8EA" size="medium" v-if="data.signinData.amX == 2 || data.signinData.amX == 3">{{data.signinData.amXCTime}}</dx-button>
							<!-- <view class="fc-green fs-16" v-if="data.signinData.amX == 2">签退成功</view>
							<view class="fc-red fs-16" v-if="data.signinData.amX == 3">您已早退<span class="Arial">{{data.signinData.amXTime}}</span></view> -->
						</view>
					</view>
				</dxListMsg>
			</view>
			<view class="sign-item sign-time">
				<view class="title pt15 plr15 lh-1 fs-17 fw-bold">下午打卡</view>
				<dxListMsg name="上班" content="14:00" conColor="#636363" :conSize="14" borderColor="#e9e9e9">
					<view slot="right" class="slot-right">
						<view class="left">
							<view class="address fs-14 fc-7" v-if="data.signinData.pmS == 2 || data.signinData.pmS == 3">
								<text class="dxi-icon dxi-icon-location pr5 fs-12"></text>
								<text class="txt">{{data.signinData.pmSAddress}}</text>
							</view>
							<view class="status fc-red fs-14" v-if="data.signinData.pmS == 3">迟到</view>
						</view>
						<view class="right">
							<dx-button type="primary" size="medium" btnBg="#5585F1" btnBd="#5585F1" v-if="data.signinData.pmS == 0" @click="signIn(0)">签到</dx-button>
							<dx-button myclass="dxi-btn-time" btnBg="#FAFAFA" btnBd="#E7E8EA" size="medium" v-if="data.signinData.pmS == 2 || data.signinData.pmS == 3">{{data.signinData.pmSCTime}}</dx-button>
							<!-- <view class="fc-green fs-16" v-else-if="data.signinData.pmS == 2">签到成功</view>
							<view class="fc-red fs-16" v-else-if="data.signinData.pmS == 3">您已迟到<span class="Arial">{{data.signinData.pmSTime}}</span></view> -->
						</view>
					</view>
				</dxListMsg>
				<dxListMsg name="下班" content="18:00" conColor="#636363" :conSize="14" noborder>
					<view slot="right" class="slot-right">
						<view class="left">
							<view class="address fs-14 fc-7" v-if="data.signinData.pmX == 2 ||data.signinData.pmX == 3">
								<text class="dxi-icon dxi-icon-location pr5 fs-12"></text>
								<text class="txt">{{data.signinData.pmXAddress}}</text>
							</view>
							<view class="status fc-red fs-14" v-if="data.signinData.pmX == 3">早退</view>
						</view>
						<view class="right">
							<dx-button btnBg="#FAFAFA" btnBd="#E7E8EA" size="medium" hollow v-if="data.signinData.pmX == 0" @click="signIn(1)">签退</dx-button>
							<dx-button myclass="dxi-btn-time" btnBg="#FAFAFA" btnBd="#E7E8EA" size="medium" v-if="data.signinData.pmX == 2 ||data.signinData.pmX == 3">{{data.signinData.pmXCTime}}</dx-button>
							<!-- <view class="fc-green fs-16" v-if="data.signinData.pmX == 2">签退成功</view>
							<view class="fc-red fs-16" v-if="data.signinData.pmX == 3">您已早退<span class="Arial">{{data.signinData.pmXTime}}</span></view> -->
						</view>
					</view>
				</dxListMsg>
			</view>
			<dxftButton type="primary" size="lg" round @click="goto('/pages/sign/lists/index',1)">打卡记录</dxftButton>
		</view>
	</view>
</template>

<script>
	import dxListMsg from "doxinui/components/list-cell/list-msg"
	import dxftButton from "doxinui/components/button/footer-button"
	export default {
		components:{dxListMsg,dxftButton},
		data() {
			return {
				formAction: '/staff/signData',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{location_x:'',location_y:'',address:'',city:'',type:0},
				timeHour: '',
				timeMinute: '',
				timePointer: true,
				locationStatus: false,
				amS: 2,
				amX: 3,
				pmS: 1,
				pmX: 1,
			}
		},
		
		onLoad(options) {
			this.ajax();
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		methods: {
			signIn(type){
				if(this.ruleform.cover.length == 0){
					return this.getError("必须上传图片");
				}
				this.ruleform.type = type;
				this.postAjax(this.formAction,this.ruleform).then(msg=>{
					this.ruleform.cover = [];
					this.ruleform.remark = "";
					this.ajax();
				})  
			},
			getThisAddress(res) {
				uni.request({
					url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + res.latitude + ',' + res.longitude + '&key=' +
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
			timer(){
				let now=new Date();
				let hours=now.getHours();
				if(hours<10){
					hours='0'+hours;
				}
				let minutes=now.getMinutes();
				if(minutes<10){
					minutes='0'+minutes;
				}
				let seconds=now.getSeconds();
				if(seconds<10){
					seconds='0'+seconds;
				}
				this.timeHour = hours;
				this.timeMinute = minutes;
				this.timePointer = !this.timePointer;
				
			},
			ajax() {
				
				this.getAjax(this).then(msg => {
					let morningData = [];
					let afterroomData = [];
					
				
					
					wx.getLocation({
						type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
						altitude:true,
						success: res => {
							console.log(res);
							this.getThisAddress(res, false);
						},
						fail: res => {
					
						},
						cancel: res => {
					
						}
					});
				
				});
			}
		}
	}
</script>
<style scoped="" lang="scss">
@import "./index.scss";
</style>