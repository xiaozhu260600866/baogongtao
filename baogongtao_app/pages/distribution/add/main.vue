<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="dis-add">
				<view class="tips">填写真实信息，成为我们的合作伙伴！</view>
				<view class="item inputG">
					<input type="text" placeholder="请填写您的姓名" class="input" v-model.lazy="ruleform.name" />
				</view>
			<!-- 	<view class="item">
					<input type="number" placeholder="请填写您的手机号码" class="input" v-model.lazy="ruleform.phone" />
				</view> -->
				<weui-input v-model="ruleform.phone" placeholder="请一键授权手机号" type="text" myclass="inputG" name="phone" datatype="require" :disabled="false">
					<view slot="right" class="sq-nav">
						<button type="primary" size="mini" class="plr5" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">一键授权</button>
					</view>
				</weui-input>
				<view class="item">
					<myform :ruleform="ruleform" :vaildate="vaildate" :append="true"  @callBack="formSubmit()">
						<view slot="content">
							<dx-button type="primary" size="lg" myclass="mt15 mlr5" icon="dxi-icon dxi-icon-wechat" block>提交</dx-button>
						</view>
					</myform>
				</view>
			</view>
		</view>
	</view>
</template>
<style>
@import "./index.css";
</style>
<script>
	import {userinfo} from "@/api/user";
	import {mapState, mapMutations, mapActions} from 'vuex'
	import {
		sysConfig,
		wechatUser
	} from "@/api/base";
	export default {
		components: {},
		data() {
			return {
				formAction: '/api/dis/login',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform: {
					phone: '',
					name: '',
					city2: '',
				},
				vaildate: {
					/*验证规则，目前支前有，require|phone|integer|price*/
					phone: {
						name: '电话',
						vaild: 'require|phone',
						errorMessage: '电话'
					},
					name: {
						name: '姓名',
						vaild: 'require',
						errorMessage: '姓名'
					},
				},


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
			this.shareSource(this, '商城');
		},
		onLoad(options) {
			
			userinfo({token:uni.getStorageSync('token')}).then((res)=>{
				this.ruleform = res.data.user;
				this.ruleform.phone = this.ruleform.username;
				
			})
			
		},
		methods: {
			getPhoneNumber(e) {
				this.getAuthPhoneNumber(e, msg => {
					this.ruleform.phone = msg.data.phoneNumber;
				}, () => {
			
				});
			},
			...mapMutations(['login','setUserInfo','setStaffInfo']),
			formSubmit: function(e) {
				if(uni.getStorageSync('distribution')){
					this.ruleform.distribution = uni.getStorageSync('distribution')
				}
				if (uni.getStorageSync('userInfo') && uni.getStorageSync('openid')) {
					let wxUser = uni.getStorageSync('userInfo');
					wxUser.openid = uni.getStorageSync('openid');
					wechatUser(wxUser).then(msg111=>{
						this.vaildForm(this, res => {
							if (res) {
								
								this.ruleform.token = uni.getStorageSync("token");
								this.postAjax(this.formAction, this.ruleform).then(msg => {
									if (msg.data.status == 2) {
										userinfo({
											token: msg.data.jwt_token
										}).then((res) => {
											let userInfo = {
												data: res.data.worker
											}
											this.setUserInfo(userInfo);
											uni.setStorageSync("token",msg.data.jwt_token);
											this.goto('/pages/distribution/index/main');
										})
									}
								});
							}
						});
						
					});
				}
				
				
			},
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
