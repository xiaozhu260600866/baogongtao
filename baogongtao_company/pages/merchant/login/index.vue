<template>
	<view class="container">
		<page ref="page"></page>
		<view class="tui-bg-box">
			<image src="/static/images/login/bg_login.png" class="tui-bg-img"></image>
			<image :src="wxUser.avatarUrl" class="tui-photo"></image>
			<view class="tui-login-name">{{wxUser.nickName}}</view>
		</view>
		<form @submit="formLogin">
			<view class="tui-login-from pt0">
				<view class="logo">
					<image class="img" src="https://www.baogongtao.com/images/logo.jpg"></image>
				</view>
				<view class="tui-line-cell">
					<tui-icon name="people" size="20" color='#5677fc'></tui-icon>
					<input placeholder-class="phcolor" class="tui-input" name="mobile" placeholder="请输入登录账号" v-model="username" type="text" />
				</view>
				<view class="tui-line-cell tui-top28 mb20">
					<tui-icon name="pwd" size="20" color='#5677fc'></tui-icon>
					<input type="password" placeholder-class="phcolor" class="tui-input" name="smsCode" placeholder="请输入登录密码" maxlength="6" v-model="password" />
				</view>
				<form-submit className="tui-btn-submit" :vaildate="false" @callBack="submit" name="登录"></form-submit>

				<view class="tui-protocol" hover-class="opcity" :hover-stay-time="150">点击"登录"即表示已同意
					<text class="tui-protocol-red" @tap="protocol">《用户协议》</text>
				</view>
				
				<view class="fs-12 text-center mt5 fc-3" @click="$refs.registerDiag.thisDiag = true">立即注册</view>
			</view>
		</form>
		<dx-diag :tbPadding="25" :lrPadding="30" ref="registerDiag">
			<dx-button type="success" size="lg" icon="dxi-icon dxi-icon-wechat-circle" block @click="goto('/pages/merchant/login/register',1)">微信快捷登录</dx-button>
			<view class="msg flex-middle fs-13 fc-6 mt10">
				<radio class="mr5" style="zoom: 75%;" checked="true" />
				<view>同意<text class="main-color">《隐私政策》</text>和<text class="main-color">《使用协议》</text></view>
			</view>
		</dx-diag>
	</view>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import { loginCompany, userinfo } from "@/api/user";
import tuiIcon from "@/components/ThorUI/icon/icon"
import tuiButton from "@/components/ThorUI/button/button"
import formSubmit from "@/components/tytrock/components/form-submit.vue";
import dxDiag from "doxinui/components/diag/diag"
import dxButton from "doxinui/components/button/button"　
export default {
	components: {tuiIcon,tuiButton,formSubmit,dxDiag,dxButton},
	data() {
		return {
			wxUser:uni.getStorageSync('wxUser'),
			getSiteName: this.getSiteName(),
			username: "",
			password: '',
		}
	},
	onLoad() {
		
	},
	methods: {
		...mapMutations(['login','setCompanyInfo']),
		protocol(){
			this.linkTo('/pages/user/login/index/protocol',1);
		},
		submit(){
			if (this.isNullOrEmpty(this.username)) {
				return this.msgToast('请输入登录账号');
			}else if (this.isNullOrEmpty(this.password)) {
				return this.msgToast('请输入登录密码');
			}
			
			let postData = {
				username:this.username,
				password:this.password
			};
			
			this.submitLoading = true;
			loginCompany(postData).then(res=>{
				console.log(res);
				if(res.code == 0){
					let state = {
						token:res.data.token,
						isLogin: true
					};
					this.login(state);
					userinfo({token:res.data.token}).then((res)=>{
						let userInfo = {
							data: res.data.company
						}
						this.setCompanyInfo(userInfo);
						this.submitLoading = false;
						this.msgSuccess('登录成功');
						return this.timeoutLinkTo(this,'/pages/merchant/index/index');
						//setTimeout(()=>{uni.navigateBack()},1000)
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
.logo{display: flex;justify-content: center;margin-bottom: 60rpx;}
.logo .img{width: 200rpx;height: 200rpx;border-radius: 8rpx;display: flex;box-shadow: 0 0 12rpx rgba(0,0,0,0.15);}
</style>