<template>
	<view>
		<page ref="page"></page>
		<view class="pb70 resume">
			<view class="tips lh-1 fs-14 plr15 ptb20 lh-1">
				<view class="fs-24 fw-bold mb15">在线注册</view>
			</view>
			<weui-input v-model="ruleform.phone" label="手机" placeholder="请一键授权手机号" type="text" name="phone" datatype="require"
			 :disabled="false">
				<view slot="right" class="sq-nav">
					<button type="primary" size="mini" class="plr5" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">一键授权</button>
				</view>
			</weui-input>
			<weui-input v-model="ruleform.name" label="姓名" placeholder="请填写真实姓名" type="text" name="name"
			 datatype="require"></weui-input>
			<dx-button type="primary" size="lg" myclass="big-btn m20" block round @click="submit(2)">提交</dx-button>
			<dx-diag :bottomOFF="false" ref="successDiag">
				<view class="content text-center fs-18 fw-bold ptb30">恭喜你，成为包工淘注册会员</view>
				<view class="btn flex-center">
					<dx-button myclass="mlr10" @click="goto('/pages/index/index',2)">返回</dx-button>
					<dx-button myclass="mlr10" block type="primary" @click="goto('/pages/user/login/index/resume',1)">注册简历</dx-button>
				</view>
			</dx-diag>
		</view>
	</view>
</template>

<script>
	import dxftButton from "doxinui/components/button/footer-button"
	import {mapState, mapMutations, mapActions} from 'vuex'
	import { loginSentMsg, login, userinfo } from "@/api/user";
	import dxResults from "doxinui/components/results/results"
	import dxDiag from "doxinui/components/diag/diag"
	import {
		attributes,wechatUser
	} from "@/api/base";
	import avatar from "@/components/yq-avatar/yq-avatar.vue";
	export default {
		components: {
			dxftButton,
			avatar,
			dxResults,
			dxDiag
		},
		data() {
			return {
				sysUser: uni.getStorageSync('sysUser'),
				vaildate: {},
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				step: 1,
				avatarUrl: '',
				ruleform: {
					sex: 0,
					status: 1,
					avatar:'',
					address:'广东省江门市蓬江区'
				},
				sexsArr: [
					{label: '男',value: 1},
					{label: '女',value: 2}
				],
				experienceYear: [
				],
				statusArr: [
					{label: '职场人',value: 1},
					{label: '学生',value: 2}
				],
				industryData: [],
				applyStatusArr: [
					{label: '离职-随时到岗',value: '离职-随时到岗'},
					{label: '在职-月内到岗',value: '在职-月内到岗'},
					{label: '在职-考虑机会',value: '在职-考虑机会'},
					{label: '在职-暂不考虑',value: '在职-暂不考虑'},
				],
				educationArr: [],
				emolumentArr: [],
				positionData: [],
				userInfo:{},
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
			
			attributes({type: 9,source: 'app'}).then(res => {
				this.industryData = res.data.lists;
			})
			attributes({type:13,source:'app'}).then(res => {
				this.educationArr = res.data.lists;
			})
			attributes({type:12,source:'app'}).then(res => {
				this.emolumentArr = res.data.lists;
			})
			attributes({type:10,source:'app'}).then(res => {
				this.positionData = res.data.lists;
			})
			attributes({type:11,source:'app'}).then(res => {
				this.experienceYear = res.data.lists;
			})
			wechatUser().then(res=>{
				this.userInfo = uni.getStorageSync('userInfo')
			})
			// userinfo({token:uni.getStorageSync('token')}).then((res)=>{
			// 	this.ruleform = res.data.user.get_user_info;

			// })
			//this.ajax();
		},
		methods: {
				...mapMutations(['login','setUserInfo','setStaffInfo']),
			getPhoneNumber(e) {
				this.getAuthPhoneNumber(e, msg => {
					this.ruleform.phone = msg.data.phoneNumber;
				}, () => {

				});
			},
			uploadAvatar() {
				this.$refs.avatar.fChooseImg(0, {
					selWidth: "300upx",
					selHeight: "300upx",
					expWidth: '260upx',
					expHeight: '260upx',
					canRotate: 'false'
				});
			},
			avatarUploaded(rsp) {
				//console.log(rsp)

				uni.uploadFile({
					url: this.$store.state.apiInterfaceUrl + '/base/upload',
					filePath: rsp.path,
					name: 'file',
					formData: {
						pathname: 'user',
						type: 'image'
					},
					success: (uploadFileRes) => {
						let dataObj = JSON.parse(uploadFileRes.data);
						console.log(dataObj);
						if (dataObj.code != 0) {
							return this.msgError(dataObj.msg);
						}
						this.ruleform.avatarUrl = dataObj.data.filePath;
						this.avatarUrl = rsp.path; //更新头像方式一
						//rsp.avatar.imgSrc = rsp.path; //更新头像方式二
					}
				});
			},
			submit(step) {
				this.ruleform.token = uni.getStorageSync('token');
				if(uni.getStorageSync('distribution')){
					this.ruleform.distribution = uni.getStorageSync('distribution')
				}
				this.vaildForm(this, res => {
					if (res) {
						if (step == 2) {
							login(this.ruleform).then(res => {
								if (res.code == 0) {
									let state = {
										token: res.data.token,
										isLogin: true
									};
									this.login(state);
									userinfo({
										token: res.data.token
									}).then((res) => {
										this.submitLoading = false;
										if (res.data.role == 12) {
											let userInfo = {
												data: res.data.worker
											}
											this.setUserInfo(userInfo);
										
											//if(userInfo.data.status!=1) return this.timeoutLinkTo(this,'/pages/user/authenticate/index');
											//return this.timeoutLinkTo(this,'/pages/user/authenticate/index');
											//this.getSuccess('简历提交完成');
											 setTimeout(()=>{
													return this.$refs.successDiag.thisDiag = true;
													//return this.linkTo("/pages/user/index/index", 2);
											 },1000)
											 return ;
										
										} else if (res.data.role == 6) {
											let userInfo = {
												data: res.data.staff
											}
											this.setStaffInfo(userInfo);
											this.msgSuccess('登录成功');
											if (userInfo.data.sign != 1) return this.timeoutLinkTo(
												this, '/pages/staff/sign/lists');
											return this.timeoutLinkTo(this,
												'/pages/user/wallet/index', 2);
											//setTimeout(()=>{uni.navigateBack()},1000)
										} else {
											return this.msgError('登录失败！');
										}
										setTimeout(() => {
											uni.navigateBack()
										}, 1000)
									})
								} else {
									this.submitLoading = false;
									this.msgToast(res.msg)
								}
							})
						} else {
							this.step = 2;
						}

					}

				})
			},
		}
	}
</script>
<style lang="scss">
	page{background-color: #fff;}
	@import "index.scss";
	@import "xiaozhu/css/dx-input.css";
</style>
