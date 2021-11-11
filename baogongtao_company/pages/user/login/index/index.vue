<template>
	<view class="container">
		<page ref="page"></page>
		<view class="tui-bg-box">
			<image src="/static/images/login/bg_login.png" class="tui-bg-img"></image>
			<image :src="wxUser.avatarUrl" class="tui-photo"></image>
			<view class="tui-login-name">{{wxUser.nickName}}</view>
		</view>
		<form @submit="formLogin">
			<view class="tui-login-from">
				<view class="tui-line-cell">
					<tui-icon name="mobile" size="20" color='#5677fc'></tui-icon>
					<input placeholder-class="phcolor" class="tui-input" name="mobile" placeholder="请输入手机号码" maxlength="11" v-model="phone"
					 type="number" />
				</view>
				<view class="tui-line-cell tui-top28 mb20">
					<tui-icon name="pwd" size="20" color='#5677fc'></tui-icon>
					<input placeholder-class="phcolor" class="tui-input" name="smsCode" placeholder="请输入验证码" maxlength="6" v-model="smsCode" />
					<tui-button size="mini" :type="type" shape="circle" :plain="true" :disabled="disabled" @click="sendMsg">{{btnText}}</tui-button>
				</view>
				<form-submit className="tui-btn-submit" :vaildate="false" @callBack="submit" name="登录"></form-submit>

				<view class="tui-protocol" hover-class="opcity" :hover-stay-time="150">点击"登录"即表示已同意
					<text class="tui-protocol-red" @tap="protocol">《用户协议》</text>及<text class="tui-protocol-red" @tap="privacy">《隐私政策》</text>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import { loginSentMsg, login, userinfo } from "@/api/user";
import tuiIcon from "@/components/ThorUI/icon/icon"
import tuiButton from "@/components/ThorUI/button/button"
import formSubmit from "@/components/tytrock/components/form-submit.vue";
export default {
	components: {
		tuiIcon,
		tuiButton,
		formSubmit
	},
	data() {
		return {
			wxUser:uni.getStorageSync('wxUser'),
			btnText: "获取验证码",
			disabled: false,
			type: "primary",
			phone: "",
			smsCode: '',
			code: ""
		}
	},
	onLoad() {
		
	},
	methods: {
		...mapMutations(['login','setUserInfo','setStaffInfo']),
		sendMsg() {
			if (this.isNullOrEmpty(this.phone)) {
				this.msgToast('请输入手机号码');
				return
			} else if (!this.verifyMobile(this.phone)) {
				this.msgToast('请输入正确的手机号码');
				return
			}
			this.disabled = true;
			this.btnText = "请稍候...";
			this.type = "gray"
		
			setTimeout(() => {
				this.doLoop(60)
			}, 500)
		},
		doLoop(seconds) {
			loginSentMsg({phone:this.phone}).then(res=>{
				if(res.code == 0){
					//this.code = res.data;
					this.tytMessage(this,'success','短信验证码已发送到手机，请查收')
					seconds = seconds ? seconds : 60;
					this.btnText = seconds + "s后重新获取";
					let countdown = setInterval(() => {
						if (seconds > 0) {
							this.btnText = seconds + "s后重新获取"
								--seconds;
						} else {
							this.btnText = "获取验证码";
							this.disabled = false;
							this.type = "primary";
							clearInterval(countdown);
						}
					}, 1000);
				}else{
					this.msgToast(res.message)
				}
			})
		},
		protocol(){
			this.linkTo('/pages/user/login/index/protocol',1);
		},
		privacy(){
			this.linkTo('/pages/info/info?id=7',1);
		},
		submit(){
			if (this.isNullOrEmpty(this.smsCode)) {
				return this.msgToast('请输入短信验证码');
			}else if (this.isNullOrEmpty(this.phone)) {
				return this.msgToast('请输入手机号码');
			}else if (!this.verifyMobile(this.phone)) {
				return this.msgToast('请输入正确的手机号码');
			}
			
			/*
			if(this.smsCode != this.code){
				this.msgToast('验证码不正确或已失效，请检查重新输入或重新获取');
				return
			}
			*/
			
			let postData = {
				phone:this.phone,
				code:this.smsCode
			};
			
			this.submitLoading = true;
			login(postData).then(res=>{
				if(res.code == 0){
					let state = {
						token:res.data.token,
						isLogin: true
					};
					this.login(state);
					userinfo({token:res.data.token}).then((res)=>{
						this.submitLoading = false;
						if(res.data.role == 12){
							let userInfo = {
								data: res.data.worker
							}
							this.setUserInfo(userInfo);
							this.msgSuccess('登录成功');
							//if(userInfo.data.status!=1) return this.timeoutLinkTo(this,'/pages/user/authenticate/index');
						   //return this.timeoutLinkTo(this,'/pages/user/authenticate/index');
						   return this.linkTo("/pages/user/index/index",2);
						}else if(res.data.role == 6){
							let userInfo = {
								data: res.data.staff
							}
							this.setStaffInfo(userInfo);
							this.msgSuccess('登录成功');
							if(userInfo.data.sign!=1) return this.timeoutLinkTo(this,'/pages/staff/sign/lists');
							return this.timeoutLinkTo(this,'/pages/user/wallet/index',2);
							//setTimeout(()=>{uni.navigateBack()},1000)
						}else{
							return this.msgError('登录失败！');
						}
						setTimeout(()=>{uni.navigateBack()},1000)
					})
				}else{
					this.submitLoading = false;
					this.msgToast(res.msg)
				}
			})
		}
	}
}
</script>

<style>
@import "./index.css";
</style>