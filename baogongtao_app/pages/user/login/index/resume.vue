<template>
	<view>
		<page ref="page"></page>
		<view class="pb70 resume">
			<view class="step1 bg-f" v-if="step == 1">
				<view class="tips lh-1 fs-14 plr15 ptb20 lh-1">
					<view class="fs-24 fw-bold mb15">填写基本信息</view>
					<view class="fs-17">快速创建简历，包工淘帮你升职加薪！</view>
				</view>
				<view class="dx-cell upload-head">
					<view class="dx-cell_hd flex1">
						<view class="dx-label fs-14">头像</view>
						<view class="fs-16 fc-8 mt10">真实的头像更能吸引HR的关注</view>
					</view>
					<view class="dx-cell_bd">
						<image class="img" :src="avatarUrl?avatarUrl:userInfo.avatarUrl" mode="aspectFill" @click="uploadAvatar" v-if="avatarUrl || userInfo.avatarUrl"></image>
						<image class="img" src="https://www.baogongtao.com/images/user.png" mode="aspectFill" @click="uploadAvatar" v-else></image>
						<view style="height: 1upx;overflow:hidden;width: 100rpx;">
							<avatar @upload="avatarUploaded" ref="avatar"></avatar>
						</view>
					</view>
				</view>
				<weui-input v-model="ruleform.phone" label="手机" placeholder="请一键授权手机号" type="text" name="phone" datatype="require"
				 :disabled="false" block>
					<view slot="right" class="sq-nav">
						<button type="primary" size="mini" class="plr5" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">一键授权</button>
					</view>
				</weui-input>
				<weui-input v-model="ruleform.name" label="姓名" placeholder="请填写真实姓名" type="text" name="name"
				 datatype="require" block></weui-input>
				<weui-input v-model="ruleform.sex" label="性别" name="sex" changeField="value" type="radio" dataKey="sexsArr" datatype="require"
				 :radioType="true" myclass="sex" right></weui-input>
				<weui-input v-model="ruleform.birthday" startDate="1920-01-01" label="出生年月" type="date" name="birthday" datatype="require"
				 emptyValue block></weui-input>
				<weui-input v-model="ruleform.education" label="最高学历" type="select" name="education" dataKey="educationArr"
				 changeField="value" block></weui-input>
				<weui-input v-model="ruleform.experience" label="工作经验" name="experience" changeField="value" type="select" dataKey="experienceYear"
				 datatype="require" placeholder="请选择工作年份如：5年" block></weui-input>
				<dxftButton type="primary" size="lg" round myclass="big-btn" @click="submit(1)">下一步</dxftButton>
			</view>
			<view class="stpe2 bg-f" v-if="step == 2">
				<!-- <view class="tips flex-between flex-middle lh-1 fs-14 fc-red plr15 ptb12">
					<view>距离调薪职位又近了一步哦！</view>
					<view class="dxi-icon dxi-icon-off fs-12"></view>
				</view> -->
				<view class="fs-16 fc-9 plr15 ptb10">完善的简介更容易获得HR青睐！</view>
				<weui-input v-model="ruleform.position" label="期望职位" splitWord="/" name="position" type="manyselect" dataKey="positionData" changeField="value"
				 datatype="require" block></weui-input>
				<weui-input v-model="ruleform.industry" label="期望行业" splitWord="/" name="industry" type="manyselect" dataKey="industryData" changeField="value"
				 datatype="require" block></weui-input>
				<dx-address v-model="ruleform.address" labeltxt="工作城市" :emptyValue="true" datatype="require" ref="address" :addressHidden="true" 
				 block></dx-address>
				<weui-input v-model="ruleform.salary" label="薪资要求" name="salary" changeField="value" type="manyselect" dataKey="emolumentArr"
				 datatype="require" block splitWord="-"></weui-input>
				<weui-input v-model="ruleform.apply_status" label="求职状态" name="apply_status" type="select" changeField="value"
				 dataKey="applyStatusArr" datatype="require" block></weui-input>
				<weui-input v-model="ruleform.remark" myclass="textarea" label="个人简介" placeholder="我主要负责***工作，取得***结果；具体工作为：1、负责***；2、参与***；3、完成***" type="textarea" name="remark" block></weui-input>
				<dxftButton type="primary" size="lg" myclass="big-btn" round @click="submit(2)">提交</dxftButton>
			</view>
			<view v-if="step == 3">
				<dx-results txt="简历提交完成" @click="goto('/pages/user/index/index',2)" ></dx-results>
			</view>
		</view>
	</view>
</template>

<script>
	import dxftButton from "doxinui/components/button/footer-button"
	import {mapState, mapMutations, mapActions} from 'vuex'
	import { loginSentMsg, login, userinfo } from "@/api/user";
	import dxResults from "doxinui/components/results/results"
	import {
		attributes,wechatUser
	} from "@/api/base";
	import avatar from "@/components/yq-avatar/yq-avatar.vue";
	export default {
		components: {
			dxftButton,
			avatar,
			dxResults
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
			userinfo({token:uni.getStorageSync('token')}).then((res)=>{
				this.ruleform = res.data.user.get_user_info;

			})
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
											this.getSuccess('简历提交完成');
											 setTimeout(()=>{
													return this.linkTo("/pages/user/index/index", 2);
											 },1000)
										
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
	@import "index.scss";
	@import "xiaozhu/css/dx-input.css";
</style>
