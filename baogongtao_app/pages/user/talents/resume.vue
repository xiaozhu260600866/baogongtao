<template>
	<view>
		<page ref="page"></page>
		<view class="pb70 resume">
			<view class="step1 bg-f" v-if="step == 1">
				<view class="dx-cell upload-head">
					<view class="dx-cell_hd flex1">
						<view class="dx-label fs-15">头像</view>
						<view class="fs-18 fc-8 mt10">真实的头像更能吸引HR的关注</view>
					</view>
					<view class="dx-cell_bd">
						<image class="img" :src="avatarUrl?avatarUrl:'https://www.baogongtao.com/images/user.png'" mode="aspectFill"
						 @click="uploadAvatar"></image>
						<view style="height: 1upx;overflow:hidden;width: 100rpx;">
							<avatar @upload="avatarUploaded" ref="avatar"></avatar>
						</view>
					</view>
				</view>
				<weui-input v-model="ruleform.phone" label="手机" placeholder="请一键授权手机号" type="txt" name="phone" datatype="require"
				 :disabled="false" block></weui-input>
				<weui-input v-model="ruleform.name" label="姓名" placeholder="请填写真实姓名或填写如：王先生" type="text" name="name"
				 datatype="require" block></weui-input>
				<weui-input v-model="ruleform.sex" label="性别" name="sex" changeField="value" type="radio" dataKey="sexsArr"
				 :radioType="true" block></weui-input>
				<weui-input v-model="ruleform.birthday" label="出生年月" type="date" name="birthday" datatype="require" emptyValue block></weui-input>
				<weui-input v-model="ruleform.education" label="最低学历" type="select" name="education" dataKey="educationArr"
				 changeField="value" block></weui-input>
				<!-- <weui-input v-model="ruleform.experience" label="工作经验" type="text" placeholder="请填写工作年份如：5年" name="experience" block></weui-input> -->
				<weui-input v-model="ruleform.experience" label="工作经验" name="experience" changeField="value" type="select" dataKey="experienceYear"
				 datatype="require" placeholder="请选择工作年份如：5年" block></weui-input>
				<dxftButton type="primary" size="lg" ></dxftButton>
			</view>
			<view class="stpe2 bg-f">
				<view class="fs-16 fc-9 plr15 ptb10">完善的简介更容易获得HR青睐！</view>
				<weui-input v-model="ruleform.position" label="期望职位" name="position" type="manyselect" dataKey="positionData" changeField="value"
				 datatype="require" block></weui-input>
				<weui-input v-model="ruleform.industry" label="期望行业" name="industry" type="manyselect" dataKey="industryData" changeField="value"
				 datatype="require" block></weui-input>
				<dx-address v-model="ruleform.address" datatype="require" ref="address" :addressHidden="true" :emptyValue="true" block></dx-address>
				<weui-input v-model="ruleform.salary" label="薪资要求" name="salary" changeField="value" type="manyselect" dataKey="emolumentArr"
				 datatype="require" block splitWord="-"></weui-input>
				<weui-input v-model="ruleform.apply_status" label="求职状态" name="apply_status" type="select" changeField="value"
				 dataKey="applyStatusArr" datatype="require" block></weui-input>
				<weui-input v-model="ruleform.remark" myclass="textarea" label="个人简介(选填)" placeholder="让HR快速了解你" type="textarea"
				 name="remark" block></weui-input>
				<dxftButton type="primary" size="lg" @click="submit(2)">提交</dxftButton>
			</view>
		</view>
	</view>
</template>

<script>
	import dxftButton from "doxinui/components/button/footer-button"
	import {mapState, mapMutations, mapActions} from 'vuex'
	import { loginSentMsg, login, userinfo } from "@/api/user";
	import {
		attributes
	} from "@/api/base";
	import avatar from "@/components/yq-avatar/yq-avatar.vue";
	export default {
		components: {
			dxftButton,
			avatar
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
					sex: 1,
					status: 1,
					avatar:''
				},
				experienceYear: [
					{label: '1年',value: "1年"},
					{label: '2年',value: "2年"},
					{label: '3年',value: "3年"},
					{label: '4年',value: "4年"},
					{label: '5年',value: "5年"},
					{label: '6年',value: "6年"},
					{label: '7年',value: "7年"},
					{label: '8年',value: "8年"},
					{label: '9年',value: "9年"},
					{label: '10年',value: "10年"},
					{label: '10年以上',value: "10年以上"}
				],
				sexsArr: [{label: '男',value: 1
					},
					{label: '女',value: 2
					}
				],
				statusArr: [{
						label: '职场人',
						value: 1
					},
					{
						label: '学生',
						value: 2
					}
				],
				industryData: [],
				applyStatusArr: [{
						label: '离职-随时到岗',
						value: '离职-随时到岗'
					},
					{
						label: '在职-月内到岗',
						value: '在职-月内到岗'
					},
					{
						label: '在职-考虑机会',
						value: '在职-考虑机会'
					},
					{
						label: '在职-暂不考虑',
						value: '在职-暂不考虑'
					},
				],
				educationArr: [
				],
				emolumentArr: [
				],
				positionData: [
				]
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
			
			attributes({
				type: 9,
				source: 'app'
			}).then(res => {
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
			userinfo({token:uni.getStorageSync('token')}).then((res)=>{
				this.ruleform = res.data.user.get_user_info;
				this.avatarUrl = this.ruleform.avatarUrl

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
							this.postAjax("/api/auth/user/update", this.ruleform).then(msg => {
								if (msg.data.code == 0) {
								 return this.goto("/pages/user/index/index",2);
								}
						    });
							
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
