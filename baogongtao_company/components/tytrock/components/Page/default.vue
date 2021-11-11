<template>
	<section>
		<slot name="content" />
		<pageHead v-if="pageHeadShow" ref="pageHead" :pageHeadData="pageHeadData"></pageHead>
		<div class="float-group" :style="Fbottom" v-if="parentData.show" style="position: fixed;z-index:15;right: 15px;bottom: 120px;">
			<slot name="floatBtn" />
		</div>
		
		<tyt-toast :visible="toastVisible" :content="toastText"></tyt-toast>
		<page-loading :visible="pageLoading"></page-loading>
		<tui-loading :visible="submitLoading" :text="submitLoadingText"></tui-loading>
		<tyt-message ref="message"></tyt-message>
	</section>
</template>
<script type="text/javascript">

import pageHead from "./header";
import tytToast from "@/components/tytrock/components/Page/toast";
import pageLoading from "@/components/tytrock/components/Page/loading";
import tuiLoading from "@/components/ThorUI/loading/loading";
import tytMessage from "@/components/tytrock/components/message";
import { sysConfig,wechatUser } from "@/api/base";

import {mapState, mapMutations, mapActions} from 'vuex'
import {miniOpenid} from "@/api/base";
export default {
	components: {
		tytToast,
		pageLoading,
		tuiLoading,
		pageHead,
		tytMessage
	},
	props: {
		mustOpenid:{
			type:Boolean,
			default:true
		},
		pageHeadShow:{
			type:Boolean,
			default:false
		},
		parentData:{
			type:Object,
			default:{}
		},
		Fbottom:{
			type:String,
			default:''
		},
		pageHeadData:{
			type:Object,
			default:{}
		}
	},
	data() {
		return {
			pageLoading:false,
			submitLoading:false,
			submitLoadingText:'操作中...',
			toastVisible:false,
			toastText:''
		}
	},
	watch: {
	},
	onLoad(){
		
	},
	methods: {
		...mapMutations(['login','setUserInfo','setStaffInfo','setExamine','setSysConfig']),
		openMessage(type, message, options) {
			this.$refs["message"].open({
				type,
				message: message,
				...options,
			});
		},
	},
	created() {
		
		sysConfig({}).then((res)=>{
			//this.$parent.examining = false;
			//console.log('examining')
			if(this.$parent.ex != undefined) this.$parent.ex = res.data.data.examining=="1"?true:false;
			if(this.$parent.examining != undefined) this.$parent.examining = res.data.data.examining=="1"?true:false;
			this.setExamine(this.examining);
			if(this.$parent.sysConfig != undefined) this.$parent.sysConfig = res.data.data;
			this.setSysConfig(res.data.data);
		})
		//更新wechat_users
		if(uni.getStorageSync('wxUser') && uni.getStorageSync('openid')){
			let wxUser = uni.getStorageSync('wxUser');
			wxUser.openid = uni.getStorageSync('openid');
			wechatUser(wxUser);	
		}
		
		if(this.mustOpenid){
			if(!uni.getStorageSync('openid')){
				let that = this;
				uni.login({
					success: function (loginRes) {
						if (loginRes.code) {
							miniOpenid({code:loginRes.code}).then(res=>{
								console.log(res)
								uni.setStorageSync('openid',res.data.openid)
								if(res.data.wechatUser){
									uni.setStorageSync("wxUser", res.data.wechatUser);
								}
								if(res.data.user){
									let state = {
										token:res.data.token,
										isLogin: true
									};
									that.login(state);
									
									if(res.data.user.role == 12){
										let userInfo = {
											data: res.data.worker
										}
										that.setUserInfo(userInfo);
									}else if(res.data.user.role == 6){
										let userInfo = {
											data: res.data.staff
										}
										that.setStaffInfo(userInfo);
									}
									
								}
							})
						}
					},
				})
			}
		}
	}
}
</script>

<style>
</style>
